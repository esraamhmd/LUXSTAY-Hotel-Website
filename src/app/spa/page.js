import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ExperienceDetail from "@/components/ExperienceDetail";
import { experiences } from "@/data/content";

export const metadata = {
  title: "Spa & Wellness - LuxStay",
  description:
    "LuxStay's spa floor - steam, sauna, massage, and treatments built around locally-sourced ingredients.",
};

export default function SpaPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ExperienceDetail data={experiences.spa} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}