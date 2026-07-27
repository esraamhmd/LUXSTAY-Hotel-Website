
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