import { Resend } from "resend";


let resend = null;
function getClient() {
  if (!process.env.RESEND_API_KEY) return null;
  if (!resend) resend = new Resend(process.env.RESEND_API_KEY);
  return resend;
}

const FROM = process.env.EMAIL_FROM ;


function escapeHtml(value) {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}


export async function sendBookingConfirmationEmail(booking) {
  const client = getClient();
  if (!client) {
    console.warn(
      `Email not configured (missing RESEND_API_KEY) - skipped confirmation email for booking #${booking.id}.`
    );
    return;
  }

  const nightlyTotal = booking.amount_cents
    ? `$${(booking.amount_cents / 100).toFixed(2)}`
    : null;

  const safeName = escapeHtml(booking.full_name?.split(" ")[0] || "there");
  const safeRoomType = escapeHtml(booking.room_type);
  const safeCheckIn = escapeHtml(String(booking.check_in).slice(0, 10));
  const safeCheckOut = escapeHtml(String(booking.check_out).slice(0, 10));
  const safeGuests = escapeHtml(booking.guests);

  try {
    await client.emails.send({
      from: FROM,
      to: booking.email,
      subject: `Booking confirmed - ${safeRoomType} at LuxStay`,
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #12181C;">Your stay is confirmed</h2>
          <p>Hi ${safeName},</p>
          <p>Thanks for booking with LuxStay - here are your details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 6px 0; color: #6b7280;">Room</td><td style="padding: 6px 0; text-align: right;"><strong>${safeRoomType}</strong></td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Check-in</td><td style="padding: 6px 0; text-align: right;">${safeCheckIn}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Check-out</td><td style="padding: 6px 0; text-align: right;">${safeCheckOut}</td></tr>
            <tr><td style="padding: 6px 0; color: #6b7280;">Guests</td><td style="padding: 6px 0; text-align: right;">${safeGuests}</td></tr>
            ${nightlyTotal ? `<tr><td style="padding: 6px 0; color: #6b7280;">Total paid</td><td style="padding: 6px 0; text-align: right;"><strong>${escapeHtml(nightlyTotal)}</strong></td></tr>` : ""}
          </table>
          <p style="color: #6b7280; font-size: 13px;">Booking reference #${escapeHtml(booking.id)}. If anything here looks wrong, just reply to this email.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error(`Failed to send confirmation email for booking #${booking.id}:`, err.message);
    throw err;
  }
}


export async function sendContactAcknowledgementEmail(contact) {
  const client = getClient();
  if (!client) {
    console.warn("Email not configured (missing RESEND_API_KEY) - skipped contact acknowledgement email.");
    return;
  }

  const safeName = escapeHtml(contact.name?.split(" ")[0] || "there");
  const safeSubject = escapeHtml(contact.subject);

  try {
    await client.emails.send({
      from: FROM,
      to: contact.email,
      subject: "We received your message - LuxStay",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
          <h2 style="color: #12181C;">Thanks for reaching out</h2>
          <p>Hi ${safeName},</p>
          <p>We've received your message about "<strong>${safeSubject}</strong>" and our team will get back to you within one business day.</p>
        </div>
      `,
    });
  } catch (err) {
    console.error("Failed to send contact acknowledgement email:", err.message);
    throw err;
  }
}