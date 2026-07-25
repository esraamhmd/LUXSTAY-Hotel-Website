import Image from "next/image";
import { cld } from "@/lib/cloudinaryUrl";

/**
 * Drop-in replacement for next/image. Pass a `width` hint (the actual pixel
 * width the image renders at, roughly) and Cloudinary URLs will be
 * automatically resized + compressed + served as WebP/AVIF. Non-Cloudinary
 * sources are unaffected.
 */
export default function OptimizedImage({ src, width = 1200, ...props }) {
  return <Image src={cld(src, width)} {...props} />;
}