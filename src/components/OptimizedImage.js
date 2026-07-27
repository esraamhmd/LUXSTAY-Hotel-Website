import Image from "next/image";
import { cld } from "@/lib/cloudinaryUrl";


export default function OptimizedImage({ src, width = 1200, ...props }) {
  return <Image src={cld(src, width)} {...props} />;
}