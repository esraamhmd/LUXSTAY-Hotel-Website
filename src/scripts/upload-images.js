/**
 * Bulk-uploads every image in public/imgs/ to Cloudinary, then prints a
 * filename -> secure_url mapping you can paste into src/data/content.js.
 *
 * Usage:
 *   1. Fill in CLOUDINARY_CLOUD_NAME / CLOUDINARY_API_KEY / CLOUDINARY_API_SECRET
 *      in your .env file.
 *   2. Run:  node scripts/upload-images.js
 */
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const IMAGES_DIR = path.join(process.cwd(), "public", "imgs");
const FOLDER = "luxstay";

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME) {
    console.error(
      "Missing CLOUDINARY_CLOUD_NAME (and API_KEY/API_SECRET) in your .env file."
    );
    process.exit(1);
  }

  if (!fs.existsSync(IMAGES_DIR)) {
    console.error(`No folder found at ${IMAGES_DIR} — nothing to upload.`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(IMAGES_DIR)
    .filter((f) => /\.(png|jpe?g|webp|avif|gif)$/i.test(f));

  if (files.length === 0) {
    console.log("No image files found in public/imgs/.");
    return;
  }

  console.log(`Uploading ${files.length} image(s) to Cloudinary folder "${FOLDER}"...\n`);

  const mapping = {};

  for (const file of files) {
    const filePath = path.join(IMAGES_DIR, file);
    try {
      const result = await cloudinary.uploader.upload(filePath, {
        folder: FOLDER,
        public_id: path.parse(file).name,
        overwrite: true,
      });
      mapping[file] = result.secure_url;
      console.log(`✓ ${file} -> ${result.secure_url}`);
    } catch (err) {
      console.error(`✗ ${file} failed:`, err.message);
    }
  }

  console.log("\n--- Paste-ready mapping (filename -> Cloudinary URL) ---\n");
  console.log(JSON.stringify(mapping, null, 2));
}

main();