import { amenities } from "@/data/content";
import {
  GiVacuumCleaner,
} from "react-icons/gi";
import {
  FaWifi,
  FaCarSide,
  FaSwimmer,
  FaDumbbell,
  FaConciergeBell,
} from "react-icons/fa";

const iconMap = {
  GiVacuumCleaner,
  FaWifi,
  FaCarSide,
  FaSwimmer,
  FaDumbbell,
  FaConciergeBell,
};

export default function Amenities() {
  return (
    <section className="border-b border-black/5 bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Why Guests Choose Us
          </p>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Everything you need, quietly included
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div key={item.title} className="flex items-start gap-5">
                <div className="icon-badge flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-cream">
                  <Icon className="text-2xl text-gold-dark transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
