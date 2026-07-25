import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

// Uploads a single image file to Cloudinary and returns its secure URL.
// Usage from the client: POST /api/upload with multipart/form-data,
// field name "file". Optionally pass "folder" to organize uploads,
// e.g. "luxstay/rooms", "luxstay/gallery".
export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder") || "luxstay";

    if (!file || typeof file === "string") {
      return NextResponse.json({ error: "No file provided." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder,
      resource_type: "image",
    });

    return NextResponse.json(
      {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("POST /api/upload failed:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}