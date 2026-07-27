import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import BookingPageClient from "./BookingPageClient";

export const metadata = {
  title: "Book Your Room - LuxStay",
  description: "Reserve your LuxStay room - pick your dates, guests, and room type.",
};

export default function BookingPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="pt-40 pb-20 text-center text-sm text-slate">Loading…</div>}>
          <BookingPageClient />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}