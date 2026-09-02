"use client";

import { useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa";

export default function MapEmbed({
  query = "Dharavandhoo, Baa Atoll, Maldives",
  zoom = 13,
  className = "",
  height = "h-96",
}) {
  const [active, setActive] = useState(false);
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=${zoom}&output=embed`;

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-lg ${height} ${className}`}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={() => setActive(true)}
    >
      <iframe
        title="LuxStay location on Google Maps"
        src={src}
        className="h-full w-full border-0 grayscale-[15%] transition-all duration-500 group-hover:grayscale-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        style={{ pointerEvents: active ? "auto" : "none" }}
      />

    
      <div
        className={`map-overlay pointer-events-none absolute inset-0 flex items-center justify-center bg-ink/40 ${
          active ? "opacity-0" : "opacity-100"
        }`}
      >
        <span className="flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink shadow-lg">
          <FaMapMarkedAlt className="text-gold-dark" /> Click or hover to interact
        </span>
      </div>
    </div>
  );
}