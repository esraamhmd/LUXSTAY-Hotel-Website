import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import stripe from "@/lib/stripe";
import { sendBookingConfirmationEmail } from "@/lib/email";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "session_id is required." }, { status: 400 });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("GET /api/checkout/confirm: STRIPE_SECRET_KEY is not set.");
      return NextResponse.json(
        { error: "Payments aren't configured yet (missing Stripe secret key)." },
        { status: 500 }
      );
    }

    let session;
    try {
      session = await stripe.checkout.sessions.retrieve(sessionId);
    } catch (stripeErr) {
      console.error("Stripe session retrieve failed:", stripeErr.message);
      return NextResponse.json(
        { error: `Could not verify payment with Stripe: ${stripeErr.message}` },
        { status: 502 }
      );
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Payment not completed.", paymentStatus: session.payment_status },
        { status: 402 }
      );
    }

    const bookingId = session.metadata?.bookingId;
    if (!bookingId) {
      console.error("Stripe session has no bookingId in metadata:", session.id);
      return NextResponse.json(
        { error: "This payment session isn't linked to a booking." },
        { status: 500 }
      );
    }

    const result = await query(
      `UPDATE bookings
       SET payment_status = 'paid', status = 'confirmed'
       WHERE id = $1 AND stripe_session_id = $2
       RETURNING id, full_name, email, check_in, check_out, guests, room_type, status, payment_status, amount_cents, confirmation_email_sent`,
      [bookingId, sessionId]
    );

    if (result.rows.length === 0) {
      console.error(
        `No booking matched id=${bookingId} AND stripe_session_id=${sessionId} — checking if it exists at all...`
      );
      const debugRow = await query(`SELECT id, stripe_session_id, status FROM bookings WHERE id = $1`, [
        bookingId,
      ]);
      console.error("Booking row for that id:", debugRow.rows[0] || "no row found at all");
      return NextResponse.json({ error: "Booking not found for this payment session." }, { status: 404 });
    }

    const booking = result.rows[0];

   
    if (!booking.confirmation_email_sent) {
      try {
        await sendBookingConfirmationEmail(booking);
        await query(`UPDATE bookings SET confirmation_email_sent = TRUE WHERE id = $1`, [booking.id]);
        booking.confirmation_email_sent = true;
      } catch (emailErr) {
     
        console.error(`Booking #${booking.id} confirmed, but confirmation email failed:`, emailErr.message);
      }
    }

    return NextResponse.json({ booking });
  } catch (err) {
    console.error("GET /api/checkout/confirm failed:", err);
    return NextResponse.json(
      { error: err.message || "Could not confirm payment." },
      { status: 500 }
    );
  }
}