import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      `SELECT id, name, rating, text, image_url, created_at
       FROM comments
       ORDER BY created_at DESC
       LIMIT 50`
    );
    return NextResponse.json({ comments: result.rows });
  } catch (err) {
    console.error("GET /api/comments failed:", err);
    return NextResponse.json({ error: "Could not fetch comments." }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, rating, text, imageUrl = null } = body;

    if (!name || !rating || !text) {
      return NextResponse.json(
        { error: "name, rating, and text are required." },
        { status: 400 }
      );
    }
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: "rating must be between 1 and 5." }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO comments (name, rating, text, image_url)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name, rating, text, image_url, created_at`,
      [name, rating, text, imageUrl]
    );

    return NextResponse.json({ comment: result.rows[0] }, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments failed:", err);
    return NextResponse.json({ error: "Could not save comment." }, { status: 500 });
  }
}