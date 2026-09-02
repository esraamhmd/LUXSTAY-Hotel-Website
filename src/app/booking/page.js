import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import BookingPageClient from "./BookingPageClient";
import { rooms } from "@/data/content";
import { resolveRoomsImages } from "@/lib/cloudinaryImage";

export const metadata = {
  title: "Book Your Room - LuxStay",
  description: "Reserve your LuxStay room - pick your dates, guests, and room type.",
};

export default function BookingPage() {
  const resolvedRooms = resolveRoomsImages(rooms);
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="min-h-screen bg-cream pt-36 pb-20" />}>
          <BookingPageClient rooms={resolvedRooms} />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}