"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function VideoSlideshow({ images = [], className = "" }) {
  const [active, setActive] = useState(0);
  const count = images.length;
  const next = count > 0 ? (active + 1) % count : 0;

  useEffect(() => {
    if (count === 0) return;
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % count);
    }, 3500);
    return () => clearInterval(id);
  }, [count]);

  if (count === 0) return null;

  return (
    <div className={`absolute inset-0 overflow-hidden bg-ink ${className}`}>
      {images.map((src, i) => {
        if (i !== active && i !== next) return null;

        return (
          <div
            key={src}
            className={`absolute inset-0 transition-opacity duration-1400 ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <div
              className="h-full w-full animate-kenburns"
              style={{ animationPlayState: i === active ? "running" : "paused" }}
            >
              <Image
                src={src}
                alt={`LuxStay hotel interior — slide ${i + 1} of ${count}`}
                fill
                priority={i === 0}
                className="object-cover"
                sizes="100vw"
              />
            </div>
          </div>
        );
      })}
      <div className="absolute inset-0 bg-linear-to-t from-ink/60 via-transparent to-transparent" />

      <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-1">
        {images.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setActive(i)}
            style={{ minWidth: "44px", minHeight: "44px" }}
            className="flex items-center justify-center"
          >
            <span
              className={`block h-2.5 rounded-full transition-all duration-300 ${
                i === active ? "w-7 bg-gold" : "w-2.5 bg-white/40 hover:bg-white/60"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}