import OptimizedImage from "./OptimizedImage";
import Link from "next/link";
import { FaArrowRight, FaCheck, FaClock } from "react-icons/fa";

export default function ExperienceDetail({ data }) {
  return (
    <>
      {/* Hero */}
      <section className="relative flex h-[60vh] min-h-[420px] items-end overflow-hidden bg-ink">
        <OptimizedImage
          src={data.heroImage}
          width={2200}
          alt={data.title}
          fill
          priority
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-14 lg:px-8">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
            {data.eyebrow}
          </p>
          <h1 className="font-display text-4xl font-bold text-white sm:text-5xl">
            {data.title}
          </h1>
          <p className="mt-3 max-w-xl text-sm text-white/70 sm:text-base">
            {data.tagline}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-cream py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 lg:grid-cols-[1.4fr_1fr] lg:px-8">
          <div>
            <h2 className="font-display text-2xl font-semibold text-ink">
              About
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate sm:text-base">
              {data.description}
            </p>

            <h3 className="mt-10 font-display text-lg font-semibold text-ink">
              What's Included
            </h3>
            <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
              {data.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-ink/80">
                  <FaCheck className="mt-0.5 shrink-0 text-xs text-gold-dark" /> {f}
                </li>
              ))}
            </ul>

            <h3 className="mt-10 font-display text-lg font-semibold text-ink">
              Gallery
            </h3>
            <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {data.gallery.map((src, i) => (
                <div
                  key={i}
                  className="img-zoom relative aspect-square overflow-hidden rounded-md"
                >
                  <OptimizedImage
                    src={src}
                    width={600}
                    alt={`${data.title} photo ${i + 1}`}
                    fill
                    loading="lazy"
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 200px"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-lg bg-white p-7 shadow-sm">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
              <FaClock className="text-gold-dark" /> Hours
            </h3>
            <ul className="mt-5 flex flex-col gap-3 border-b border-black/5 pb-6 text-sm">
              {data.hours.map((h) => (
                <li key={h.label} className="flex justify-between gap-4">
                  <span className="text-ink/70">{h.label}</span>
                  <span className="text-right font-medium text-ink">{h.time}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-slate">
              Reservations open for guests and walk-ins, subject to availability.
              Staying with us? Add this to your booking request.
            </p>

            <Link
              href="/booking"
              className="btn-sweep mt-6 flex items-center justify-center gap-2 border border-gold bg-gold px-6 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition-transform duration-300 hover:text-white active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Reserve With Booking <FaArrowRight />
              </span>
            </Link>

            <Link
              href="/#contact"
              className="link-underline mt-4 block text-center text-xs font-semibold uppercase tracking-wide text-ink/60 transition-colors hover:text-gold-dark"
            >
              Or ask a question first
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}