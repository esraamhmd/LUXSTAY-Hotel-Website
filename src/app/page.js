import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Amenities from "@/components/Amenities";
import RoomsSection from "@/components/RoomsSection";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

import { rooms, galleryImages, heroSlideshow, testimonials, experiences } from "@/data/content";
import {
  resolveRoomsImages,
  resolveGalleryImages,
  resolveHeroSlideshow,
  resolveTestimonials,
  resolveExperiences,
} from "@/lib/cloudinaryImage";


export default function Home() {
  const resolvedRooms = resolveRoomsImages(rooms).slice(0, 6); 
  const resolvedGallery = resolveGalleryImages(galleryImages);
  const resolvedHero = resolveHeroSlideshow(heroSlideshow);
  const resolvedTestimonials = resolveTestimonials(testimonials);
  const resolvedExperiences = resolveExperiences(experiences);

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero images={resolvedHero} />
        <Amenities />
        <RoomsSection rooms={resolvedRooms} />
        <Experience experiences={resolvedExperiences} />
        <Gallery images={resolvedGallery} />
        <Reviews testimonials={resolvedTestimonials} />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}