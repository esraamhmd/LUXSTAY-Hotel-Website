import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { sendContactAcknowledgementEmail } from "@/lib/email";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  try {
    const body = await request.json();
    const name = body.name?.trim();
    const email = body.email?.trim();
    const subject = body.subject?.trim();
    const message = body.message?.trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "name, email, subject, and message are required." },
        { status: 400 }
      );
    }

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO contact_messages (name, email, subject, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, email, subject, created_at`,
      [name, email, subject, message]
    );

    const savedMessage = result.rows[0];

 
    try {
      await sendContactAcknowledgementEmail(savedMessage);
    } catch (emailErr) {
      console.error(`Contact message #${savedMessage.id} saved, but acknowledgement email failed:`, emailErr.message);
    }

    return NextResponse.json({ message: savedMessage }, { status: 201 });
  } catch (err) {
    console.error("POST /api/contact failed:", err);
    return NextResponse.json({ error: "Could not send message." }, { status: 500 });
  }
}