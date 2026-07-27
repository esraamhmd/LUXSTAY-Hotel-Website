import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ExperienceDetail from "@/components/ExperienceDetail";
import { experiences } from "@/data/content";

export const metadata = {
  title: "The Ember Room - Restaurant & Bar - LuxStay",
  description:
    "A seasonal, farm-to-table restaurant and bar at LuxStay - breakfast, lunch, dinner, and a late-night bar program.",
};

export default function RestaurantPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <ExperienceDetail data={experiences.restaurant} />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}