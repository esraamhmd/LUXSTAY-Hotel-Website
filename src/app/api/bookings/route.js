import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      checkIn,
      checkOut,
      guests = 1,
      roomType,
      message = null,
    } = body;

    if (!fullName || !email || !checkIn || !checkOut || !roomType) {
      return NextResponse.json(
        { error: "fullName, email, checkIn, checkOut, and roomType are required." },
        { status: 400 }
      );
    }

    const result = await query(
      `INSERT INTO bookings (full_name, email, check_in, check_out, guests, room_type, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, full_name, email, check_in, check_out, guests, room_type, status, created_at`,
      [fullName, email, checkIn, checkOut, guests, roomType, message]
    );

    return NextResponse.json({ booking: result.rows[0] }, { status: 201 });
  } catch (err) {
    console.error("POST /api/bookings failed:", err);
    return NextResponse.json({ error: "Could not save booking." }, { status: 500 });
  }
}

export async function GET() {
  try {
    const result = await query(
      `SELECT id, full_name, email, check_in, check_out, guests, room_type, status, created_at
       FROM bookings
       ORDER BY created_at DESC
       LIMIT 50`
    );
    return NextResponse.json({ bookings: result.rows });
  } catch (err) {
    console.error("GET /api/bookings failed:", err);
    return NextResponse.json({ error: "Could not fetch bookings." }, { status: 500 });
  }
}