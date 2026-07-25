import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import RoomsPageClient from "./RoomsPageClient";

export const metadata = {
  title: "Rooms — LuxStay",
  description: "Browse all 40 LuxStay rooms across Luxury, Single, Small Suite, and Family categories.",
};

export default function RoomsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<div className="pt-40 pb-20 text-center text-sm text-slate">Loading rooms…</div>}>
          <RoomsPageClient />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}