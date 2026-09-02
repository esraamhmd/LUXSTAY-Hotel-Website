import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { rooms } from "@/data/content";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

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

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (!DATE_RE.test(checkIn) || !DATE_RE.test(checkOut)) {
      return NextResponse.json(
        { error: "checkIn and checkOut must be in YYYY-MM-DD format." },
        { status: 400 }
      );
    }

    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    if (isNaN(checkInDate) || isNaN(checkOutDate)) {
      return NextResponse.json({ error: "checkIn/checkOut must be valid dates." }, { status: 400 });
    }

    const todayStr = new Date().toISOString().slice(0, 10);
    if (checkIn < todayStr) {
      return NextResponse.json(
        { error: "Check-in date has already passed. Please enter a valid upcoming date." },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: "checkOut must be after checkIn." },
        { status: 400 }
      );
    }

    const guestsNum = Number(guests);
    if (!Number.isInteger(guestsNum) || guestsNum < 1) {
      return NextResponse.json(
        { error: "guests must be a positive whole number." },
        { status: 400 }
      );
    }

    const room = rooms.find((r) => r.name === roomType);
    if (!room) {
      return NextResponse.json({ error: "Unknown room type." }, { status: 400 });
    }
    if (guestsNum > room.guests) {
      return NextResponse.json(
        { error: `${roomType} sleeps a maximum of ${room.guests} guests.` },
        { status: 400 }
      );
    }

   
    const overlap = await query(
      `SELECT id FROM bookings
       WHERE room_type = $1
         AND status != 'cancelled'
         AND check_in  < $3
         AND check_out > $2
       LIMIT 1`,
      [roomType, checkIn, checkOut]
    );

    if (overlap.rows.length > 0) {
      return NextResponse.json(
        { error: `${roomType} is already booked for the selected dates. Please choose different dates or a different room.` },
        { status: 409 }
      );
    }

    const result = await query(
      `INSERT INTO bookings (full_name, email, check_in, check_out, guests, room_type, message)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, full_name, email, check_in, check_out, guests, room_type, status, created_at`,
      [fullName, email, checkIn, checkOut, guestsNum, roomType, message]
    );

    return NextResponse.json({ booking: result.rows[0] }, { status: 201 });
  } catch (err) {
    console.error("POST /api/bookings failed:", err);
    return NextResponse.json({ error: "Could not save booking." }, { status: 500 });
  }
}