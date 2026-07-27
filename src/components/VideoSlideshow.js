"use client";

import { useEffect, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import { heroSlideshow } from "@/data/content";


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