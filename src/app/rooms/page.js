import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import RoomsPageClient from "./RoomsPageClient";
import { rooms } from "@/data/content";
import { resolveRoomsImages } from "@/lib/cloudinaryImage";

export const metadata = {
  title: "Rooms - LuxStay",
  description: "Browse all 40 LuxStay rooms across Luxury, Single, Small Suite, and Family categories.",
};

export default function RoomsPage() {
  const resolvedRooms = resolveRoomsImages(rooms);
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-cream pt-36 pb-20" />}>
          <RoomsPageClient rooms={resolvedRooms} />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}