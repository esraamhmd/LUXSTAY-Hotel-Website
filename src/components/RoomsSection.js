"use client";

import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/store/roomsSlice";
import { rooms, roomFilters } from "@/data/content";
import RoomCard from "./RoomCard";
import { FaArrowRight } from "react-icons/fa";

export default function RoomsSection() {
  const dispatch = useDispatch();
  const activeFilter = useSelector((s) => s.rooms.activeFilter);

  const filtered =
    activeFilter === "All Rooms"
      ? rooms
      : rooms.filter((r) => r.category === activeFilter);

  // Homepage only previews the first 6 — full 40-room catalogue lives on /rooms
  const visibleRooms = filtered.slice(0, 6);

  return (
    <section id="rooms" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              Deluxe &amp; Luxury
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Our Luxury Rooms
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {roomFilters.map((f) => (
              <button
                key={f}
                onClick={() => dispatch(setFilter(f))}
                className={`rounded px-5 py-2.5 text-sm font-medium transition-all duration-300 active:scale-95 ${
                  activeFilter === f
                    ? "bg-gold text-ink"
                    : "bg-white text-ink/70 hover:bg-ink hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link
            href="/rooms"
            className="btn-sweep flex items-center gap-2 border border-ink px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition-transform duration-300 hover:text-white active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              View All {rooms.length} Rooms <FaArrowRight />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}














































































