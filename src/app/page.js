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

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Amenities />
        <RoomsSection />
        <Experience />
        <Gallery />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}
