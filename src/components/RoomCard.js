"use client";

import Link from "next/link";
import OptimizedImage from "./OptimizedImage";
import {
  FaBed,
  FaUserFriends,
  FaRulerCombined,
  FaArrowRight,
  FaStar,
  FaCheck,
  FaEye,
} from "react-icons/fa";

export default function RoomCard({ room }) {
  return (
    <article className="card-hover group flex flex-col overflow-hidden rounded-lg bg-white shadow-sm">
      <div className="img-zoom relative h-64 w-full shrink-0">
        <OptimizedImage
          src={room.image}
          width={900}
          alt={room.imageAlt || room.name}
          fill
          loading="lazy"
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 400px"
        />
        <span className="absolute left-4 top-4 rounded bg-ink/80 px-3 py-1.5 text-xs font-semibold text-gold backdrop-blur transition-colors duration-300 group-hover:bg-gold group-hover:text-ink">
          ${room.price} / Night
        </span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded bg-white/90 px-2.5 py-1.5 text-xs font-semibold text-ink backdrop-blur">
          <FaStar className="text-gold-dark" /> {room.rating}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-xl font-semibold text-ink">
            {room.name}
          </h3>
        </div>
        <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-dark">
          {room.view}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-slate">
          {room.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate">
          <span className="flex items-center gap-1.5">
            <FaRulerCombined className="text-gold-dark" /> {room.size}
          </span>
          <span className="flex items-center gap-1.5">
            <FaUserFriends className="text-gold-dark" /> {room.guests} Guests
          </span>
          <span className="flex items-center gap-1.5">
            <FaBed className="text-gold-dark" /> {room.beds}
          </span>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-x-3 gap-y-1.5">
          {room.roomAmenities.map((a) => (
            <li key={a} className="flex items-center gap-1.5 text-xs text-ink/70">
              <FaCheck className="shrink-0 text-[10px] text-gold-dark" /> {a}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex items-center justify-between gap-3 border-t border-black/5 pt-4">
          <Link
            href={`/rooms#${room.id}`}
            className="link-underline flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-ink/70 transition-colors hover:text-gold-dark"
          >
            <FaEye className="text-gold-dark" /> Details
          </Link>
          <Link
            href={`/booking?room=${encodeURIComponent(room.name)}`}
            className="btn-sweep flex items-center gap-2 border border-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-gold-dark transition-transform duration-300 hover:text-white active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              Book This Room <FaArrowRight className="text-[10px]" />
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}