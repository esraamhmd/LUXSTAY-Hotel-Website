import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import stripe from "@/lib/stripe";
import { rooms } from "@/data/content";
import { computeTotal, nightsBetween } from "@/lib/pricing";

export async function POST(request) {
  try {
    // Fail fast with a clear message if Stripe isn't configured, instead of
    // a confusing generic error once the SDK call itself blows up.
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

    if (Number(guests) > room.guests) {
      return NextResponse.json(
        { error: `${roomType} sleeps a maximum of ${room.guests} guests.` },
        { status: 400 }
      );
    }

    // --- Reconcile stale, abandoned checkout attempts ---
    // A "pending"/"unpaid" booking older than 30 minutes usually means the
    // guest never finished paying. But if our own confirmation step ever
    // failed right after a real successful payment, the booking would
    // wrongly still show "unpaid" here — so we double-check each one
    // against Stripe before touching it. Paid ones get corrected to
    // confirmed; only genuinely unpaid ones get soft-cancelled (never
    // hard-deleted, so nothing is ever silently lost).
    const stale = await query(
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
            await query(
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
        // Soft-cancel only — frees the room for the overlap check below
        // without ever deleting the record.
        await query(`UPDATE bookings SET status = 'cancelled' WHERE id = $1`, [row.id]);
      }
    }

    // --- Prevent double booking ---
    // Two date ranges [a_start, a_end) and [b_start, b_end) overlap exactly
    // when a_start < b_end AND a_end > b_start. We only block against
    // bookings that aren't cancelled — a cancelled booking frees the room.
    const overlap = await query(
      `SELECT id FROM bookings
       WHERE room_type = $1
         AND status != 'cancelled'
         AND check_in < $3
         AND check_out > $2
       LIMIT 1`,
      [roomType, checkIn, checkOut]
    );

    if (overlap.rows.length > 0) {
      return NextResponse.json(
        {
          error:
            "This room is already booked for part of the selected dates. Please choose different dates.",
        },
        { status: 409 }
      );
    }

    // Same pricing function the booking form uses to display the total —
    // guests beyond the room's base occupancy add a per-night surcharge.
    const { total, base, extraGuests, extraGuestFeeTotal } = computeTotal(
      room,
      checkIn,
      checkOut,
      guests
    );
    const amountCents = Math.round(total * 100);

    // Insert as unpaid/pending — becomes confirmed once Stripe confirms payment.
    const inserted = await query(
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
        guests,
        roomType,
        arrivalTime,
        message,
        amountCents,
      ]
    );
    const bookingId = inserted.rows[0].id;

    const origin =
      request.headers.get("origin") || process.env.APP_URL || "http://localhost:3000";

    const guestFeeNote =
      extraGuests > 0
        ? ` + ${extraGuests} extra guest${extraGuests > 1 ? "s" : ""} ($${extraGuestFeeTotal})`
        : "";

    let session;
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
                description: `Check-in ${checkIn} · Check-out ${checkOut} · ${guests} guest(s)${guestFeeNote}`,
              },
              unit_amount: amountCents,
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/booking?cancelled=1`,
        metadata: { bookingId: String(bookingId) },
        expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes, matches cleanup window
      });
    } catch (stripeErr) {
      // Stripe failed — release the room instead of leaving a phantom
      // "pending" booking that would block these dates forever.
      await query(`DELETE FROM bookings WHERE id = $1`, [bookingId]);
      console.error("Stripe session creation failed:", stripeErr.message);
      return NextResponse.json(
        { error: `Payment setup failed: ${stripeErr.message}` },
        { status: 502 }
      );
    }

    await query(`UPDATE bookings SET stripe_session_id = $1 WHERE id = $2`, [
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