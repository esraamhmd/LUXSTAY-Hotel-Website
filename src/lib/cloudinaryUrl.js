/**
 * Injects Cloudinary's automatic format + quality + resize transformation
 * into a Cloudinary delivery URL, so images are served as smaller, modern
 * formats (WebP/AVIF) sized to what's actually needed on screen — without
 * looking soft or over-compressed.
 *
 * - f_auto      -> best format for the requesting browser (WebP/AVIF/etc)
 * - q_auto:good -> quality-optimized compression that stays visually sharp
 *                  (avoids the over-aggressive default q_auto tier)
 * - dpr_auto    -> automatically serves 2x/3x pixel density for retina
 *                  screens instead of a flat, sometimes blurry width
 *
 * Non-Cloudinary URLs (Unsplash, local /imgs paths) are returned unchanged.
 */
export function cld(url, width = 1200) {
  if (!url || typeof url !== "string") return url;
  if (!url.includes("res.cloudinary.com") || !url.includes("/upload/")) {
    return url;
  }
  return url.replace(
    "/upload/",
    `/upload/f_auto,q_auto:good,dpr_auto,w_${width}/`
  );
}