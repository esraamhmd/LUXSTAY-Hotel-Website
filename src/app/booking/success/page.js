import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BookingSuccessClient from "./BookingSuccessClient";

export const metadata = {
  title: "Booking Confirmed — LuxStay",
};

export default function BookingSuccessPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense falback={<div className="pt-40 pb-20 text-center text-sm text-slate">Loading…</div>}>
          <BookingSuccessClient />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}