import { NextResponse } from "next/server";
import { pool, ensureSchema } from "@/lib/db";
import stripe from "@/lib/stripe";
import { rooms } from "@/data/content";
import { computeTotal, nightsBetween } from "@/lib/pricing";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function POST(request) {
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("POST /api/checkout: STRIPE_SECRET_KEY is not set.");
      return NextResponse.json(
        { error: "Payments aren't configured yet (missing Stripe secret key)." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      fullName,
      email,
      phone,
      country,
      checkIn,
      checkOut,
      guests = 1,
      roomType,
      arrivalTime = null,
      message = null,
    } = body;

    if (!fullName || !email || !phone || !country || !checkIn || !checkOut || !roomType) {
      return NextResponse.json(
        {
          error:
            "fullName, email, phone, country, checkIn, checkOut, and roomType are required.",
        },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!DATE_RE.test(checkIn) || !DATE_RE.test(checkOut)) {
      return NextResponse.json(
        { error: "checkIn and checkOut must be in YYYY-MM-DD format." },
        { status: 400 }
      );
    }

    
    const todayStr = new Date().toISOString().slice(0, 10);
    if (checkIn < todayStr) {
      return NextResponse.json(
        { error: "Check-in date has already passed. Please enter a valid upcoming date." },
        { status: 400 }
      );
    }

    const nights = nightsBetween(checkIn, checkOut);
    if (nights < 1) {
      return NextResponse.json(
        { error: "checkOut must be after checkIn." },
        { status: 400 }
      );
    }

    const room = rooms.find((r) => r.name === roomType);
    if (!room) {
      return NextResponse.json({ error: "Unknown room type." }, { status: 400 });
    }

   
    const guestsNum = Number(guests);
    if (!Number.isInteger(guestsNum) || guestsNum < 1) {
      return NextResponse.json(
        { error: "guests must be a positive whole number." },
        { status: 400 }
      );
    }
    if (guestsNum > room.guests) {
      return NextResponse.json(
        { error: `${roomType} sleeps a maximum of ${room.guests} guests.` },
        { status: 400 }
      );
    }

    await ensureSchema();

    
    const client = await pool.connect();
    let bookingId, session, amountCents, total, base, extraGuests, extraGuestFeeTotal;

    try {
      await client.query("BEGIN");
      await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [roomType]);

      
      const stale = await client.query(
        `SELECT id, stripe_session_id FROM bookings
         WHERE status = 'pending'
           AND payment_status = 'unpaid'
           AND created_at < now() - interval '30 minutes'`
      );

      for (const row of stale.rows) {
        let actuallyPaid = false;
        if (row.stripe_session_id) {
          try {
            const s = await stripe.checkout.sessions.retrieve(row.stripe_session_id);
            if (s.payment_status === "paid") {
              await client.query(
                `UPDATE bookings SET status = 'confirmed', payment_status = 'paid' WHERE id = $1`,
                [row.id]
              );
              actuallyPaid = true;
            }
          } catch (lookupErr) {
            console.error(`Stale-booking Stripe lookup failed for booking ${row.id}:`, lookupErr.message);
          }
        }
        if (!actuallyPaid) {
          await client.query(`UPDATE bookings SET status = 'cancelled' WHERE id = $1`, [row.id]);
        }
      }

      const overlap = await client.query(
        `SELECT id FROM bookings
         WHERE room_type = $1
           AND status != 'cancelled'
           AND check_in < $3
           AND check_out > $2
         LIMIT 1`,
        [roomType, checkIn, checkOut]
      );

      if (overlap.rows.length > 0) {
        await client.query("ROLLBACK");
        return NextResponse.json(
          {
            error:
              "This room is already booked for part of the selected dates. Please choose different dates.",
          },
          { status: 409 }
        );
      }

      ({ total, base, extraGuests, extraGuestFeeTotal } = computeTotal(
        room,
        checkIn,
        checkOut,
        guestsNum
      ));
      amountCents = Math.round(total * 100);

      const inserted = await client.query(
        `INSERT INTO bookings (full_name, email, phone, country, check_in, check_out, guests, room_type, arrival_time, message, amount_cents, status, payment_status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'pending', 'unpaid')
         RETURNING id`,
        [
          fullName,
          email,
          phone,
          country,
          checkIn,
          checkOut,
          guestsNum,
          roomType,
          arrivalTime,
          message,
          amountCents,
        ]
      );
      bookingId = inserted.rows[0].id;

      await client.query("COMMIT");
    } catch (txErr) {
      await client.query("ROLLBACK");
      throw txErr;
    } finally {
      client.release();
    }

    const origin =
      request.headers.get("origin") || process.env.APP_URL || "http://localhost:3000";

    const guestFeeNote =
      extraGuests > 0
        ? ` + ${extraGuests} extra guest${extraGuests > 1 ? "s" : ""} ($${extraGuestFeeTotal})`
        : "";

    try {
      session = await stripe.checkout.sessions.create({
        mode: "payment",
        payment_method_types: ["card"],
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${roomType} — ${nights} night${nights > 1 ? "s" : ""}`,
                description: `Check-in ${checkIn} · Check-out ${checkOut} · ${guestsNum} guest(s)${guestFeeNote}`,
              },
              unit_amount: amountCents,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/booking?cancelled=1`,
        metadata: { bookingId: String(bookingId) },
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
      });
    } catch (stripeErr) {
      await pool.query(`DELETE FROM bookings WHERE id = $1`, [bookingId]);
      console.error("Stripe session creation failed:", stripeErr.message);
      return NextResponse.json(
        { error: `Payment setup failed: ${stripeErr.message}` },
        { status: 502 }
      );
    }

    await pool.query(`UPDATE bookings SET stripe_session_id = $1 WHERE id = $2`, [
      session.id,
      bookingId,
    ]);

    return NextResponse.json(
      { url: session.url, bookingId, total, base, extraGuestFeeTotal },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/checkout failed:", err);
    return NextResponse.json(
      { error: err.message || "Could not start checkout." },
      { status: 500 }
    );
  }
}