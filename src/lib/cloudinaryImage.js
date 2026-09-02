
export function cloudinaryUrl(path) {
  if (!path) return path;
 
  if (path.startsWith("http://") || path.startsWith("https://")) return path;

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  if (!cloudName) {
    console.error(
      "cloudinaryUrl(): CLOUDINARY_CLOUD_NAME is not set on the server."
    );
    return path;
  }
  return `https://res.cloudinary.com/${cloudName}/image/upload/${path}`;
}


export function resolveRoomImages(room) {
  return { ...room, image: cloudinaryUrl(room.image) };
}

export function resolveRoomsImages(rooms) {
  return rooms.map(resolveRoomImages);
}


export function resolveGalleryImage(item) {
  return { ...item, src: cloudinaryUrl(item.src) };
}

export function resolveGalleryImages(items) {
  return items.map(resolveGalleryImage);
}


export function resolveHeroSlideshow(paths) {
  return paths.map(cloudinaryUrl);
}


export function resolveTestimonials(testimonials) {
  return testimonials.map((t) => ({ ...t, image: cloudinaryUrl(t.image) }));
}


export function resolveExperiences(experiences) {
  const resolved = {};
  for (const key of Object.keys(experiences)) {
    const exp = experiences[key];
    resolved[key] = {
      ...exp,
      heroImage: cloudinaryUrl(exp.heroImage),
      gallery: (exp.gallery || []).map(cloudinaryUrl),
    };
  }
  return resolved;
}
