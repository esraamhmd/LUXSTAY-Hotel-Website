"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "@/store/roomsSlice";
import { rooms, roomFilters } from "@/data/content";
import RoomCard from "@/components/RoomCard";

export default function RoomsPageClient() {
  const dispatch = useDispatch();
  const activeFilter = useSelector((s) => s.rooms.activeFilter);
  const searchParams = useSearchParams();

  useEffect(() => {
    const type = searchParams.get("type");
    if (type && roomFilters.includes(type)) {
      dispatch(setFilter(type));
    }
  }, [searchParams, dispatch]);

  const visibleRooms =
    activeFilter === "All Rooms"
      ? rooms
      : rooms.filter((r) => r.category === activeFilter);

  return (
    <section className="bg-cream pb-20 pt-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-4">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Deluxe &amp; Luxury
          </p>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
            Our Luxury Rooms
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate sm:text-base">
            {rooms.length} rooms across four categories — filter below to find
            your fit, then book directly in a couple of clicks.
          </p>
        </div>

        <div className="sticky top-[76px] z-30 -mx-5 mb-10 flex flex-wrap gap-2 bg-cream/95 px-5 py-4 backdrop-blur lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:py-0">
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
              {f !== "All Rooms" && (
                <span className="ml-1.5 text-[10px] opacity-60">
                  ({rooms.filter((r) => r.category === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {visibleRooms.map((room) => (
            <div key={room.id} id={String(room.id)} className="scroll-mt-40">
              <RoomCard room={room} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}