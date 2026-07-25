"use client";

import { useEffect, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import { heroSlideshow } from "@/data/content";

/**
 * Simulates a hotel walkthrough video using a crossfading, slowly-zooming
 * (Ken Burns effect) sequence of real hotel photography — no external
 * video file required, fully self-contained and license-safe.
 *
 * Performance: only the current slide and the next one in line are ever
 * mounted in the DOM (max 2 images loading at once), instead of all slides
 * at once. The very first slide is marked `priority` since it's the page's
 * largest above-the-fold image (the LCP element).
 */
export default function VideoSlideshow({ className = "" }) {
  const [active, setActive] = useState(0);
  const count = heroSlideshow.length;
  const next = (active + 1) % count;

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 3500);
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      {heroSlideshow.map((src, i) => {
        // Only render the active slide and the one that's about to become
        // active — everything else stays out of the DOM entirely so the
        // browser never fetches images the visitor hasn't reached yet.
        if (i !== active && i !== next) return null;

        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="h-full w-full animate-kenburns"
              style={{ animationPlayState: i === active ? "running" : "paused" }}
            >
              <OptimizedImage
                src={src}
                width={2200}
                alt="LuxStay hotel walkthrough"
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />

      {/* progress dots */}
      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
        {heroSlideshow.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === active ? "w-6 bg-gold" : "w-1.5 bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}