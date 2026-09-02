import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ExperienceDetail from "@/components/ExperienceDetail";
import { experiences } from "@/data/content";
import { resolveExperiences } from "@/lib/cloudinaryImage";

export const metadata = {
  title: "Spa & Wellness - LuxStay",
  description:
    "LuxStay's spa floor - steam, sauna, massage, and treatments built around locally-sourced ingredients.",
};

export default function SpaPage() {
  const resolved = resolveExperiences(experiences);
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ExperienceDetail data={resolved.spa} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}