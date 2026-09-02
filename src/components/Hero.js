import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import VideoSlideshow from "./VideoSlideshow";


export default function Hero({ images = [] }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-ink">
      <VideoSlideshow images={images} />
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/70 to-ink/20" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 pt-28 pb-16 lg:grid-cols-[1.3fr_0.7fr] lg:px-8 lg:pt-24">
        <div>
          <p className="reveal is-visible mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
            Welcome to LuxStay
          </p>
          <h1 className="reveal is-visible font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl md:text-6xl lg:text-[4rem]">
            The Best Hotel <br className="hidden sm:block" />
            Deals in the World
          </h1>
          <p className="reveal is-visible mt-6 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
            Handpicked rooms, quiet service, and honest prices  book directly
            with us and skip the middleman fees.
          </p>

          <div className="reveal is-visible mt-9 flex flex-wrap items-center gap-5">
            <Link
              href="/rooms"
              aria-label="Explore our hotel rooms at LuxStay"
              className="btn-sweep flex items-center gap-2 border border-gold bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink hover:text-white active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Explore Rooms <FaArrowRight aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <div className="reveal is-visible hidden rounded-lg bg-white/10 p-7 backdrop-blur-md ring-1 ring-white/15 lg:block">
          <p className="text-xs uppercase tracking-widest text-gold-light">Since 2011</p>
          <p className="mt-2 font-display text-3xl font-semibold text-white">
            120+ Suites
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/80">
            Across 4 cities, each property built around one idea: a hotel
            should feel calmer than home, not busier.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/15 pt-6">
            <div>
              <p className="font-display text-2xl font-semibold text-gold">4.9</p>
              <p className="text-xs text-white/70">Average rating</p>
            </div>
            <div>
              <p className="font-display text-2xl font-semibold text-gold">18k</p>
              <p className="text-xs text-white/70">Happy guests</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}