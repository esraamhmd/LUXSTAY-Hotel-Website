"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  updateField,
  submitBookingStart,
  submitBookingSuccess,
  submitBookingError,
  resetBooking,
} from "@/store/bookingSlice";
import { rooms } from "@/data/content";
import { computeTotal } from "@/lib/pricing";
import OptimizedImage from "@/components/OptimizedImage";
import api from "@/lib/api";
import {
  FaArrowRight,
  FaCheckCircle,
  FaExclamationCircle,
  FaBed,
  FaUserFriends,
  FaRulerCombined,
} from "react-icons/fa";

const COUNTRIES = [
  "Maldives", "United States", "United Kingdom", "United Arab Emirates",
  "Germany", "France", "Italy", "Spain", "Egypt", "Saudi Arabia",
  "India", "China", "Japan", "Australia", "Canada", "Russia",
  "South Africa", "Brazil", "Singapore", "Other",
];

const ARRIVAL_TIMES = [
  "Before 12:00 PM", "12:00 PM – 3:00 PM", "3:00 PM – 6:00 PM",
  "6:00 PM – 9:00 PM", "After 9:00 PM (late arrival)",
];

export default function BookingPageClient() {
  const dispatch = useDispatch();
  const booking = useSelector((s) => s.booking);
  const searchParams = useSearchParams();

  useEffect(() => {
    const roomParam = searchParams.get("room");
    if (roomParam && rooms.some((r) => r.name === roomParam)) {
      dispatch(updateField({ field: "roomType", value: roomParam }));
    }
  }, [searchParams, dispatch]);

  const selectedRoom = rooms.find((r) => r.name === booking.roomType) || rooms[0];

  const { nights, base, extraGuests, extraGuestFeeTotal, total } = computeTotal(
    selectedRoom,
    booking.checkIn,
    booking.checkOut,
    booking.guests
  );

  const handleChange = (field) => (e) =>
    dispatch(updateField({ field, value: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(submitBookingStart());
    try {
      const res = await api.post("/checkout", {
        fullName: booking.fullName,
        email: booking.email,
        phone: booking.phone,
        country: booking.country,
        checkIn: booking.checkIn,
        checkOut: booking.checkOut,
        guests: Number(booking.guests) || 1,
        roomType: booking.roomType,
        arrivalTime: booking.arrivalTime || null,
        message: booking.message || null,
      });
      // Redirect to Stripe's hosted checkout page to collect payment.
      window.location.href = res.data.url;
    } catch (err) {
      dispatch(submitBookingError(err.response?.data?.error || "Something went wrong."));
    }
  };

  return (
    <section className="bg-cream pb-20 pt-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Reserve Your Stay
          </p>
          <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
            Book Your Room
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.3fr]">
          {/* Room summary card */}
          <div className="h-fit overflow-hidden rounded-lg bg-white shadow-sm">
            <div className="img-zoom relative h-56 w-full">
              <OptimizedImage
                src={selectedRoom.image}
                width={900}
                alt={selectedRoom.imageAlt || selectedRoom.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 480px"
              />
            </div>
            <div className="p-6">
              <h2 className="font-display text-xl font-semibold text-ink">
                {selectedRoom.name}
              </h2>
              <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gold-dark">
                {selectedRoom.view}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate">
                {selectedRoom.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate">
                <span className="flex items-center gap-1.5">
                  <FaRulerCombined className="text-gold-dark" /> {selectedRoom.size}
                </span>
                <span className="flex items-center gap-1.5">
                  <FaUserFriends className="text-gold-dark" /> Up to {selectedRoom.guests} guests
                </span>
                <span className="flex items-center gap-1.5">
                  <FaBed className="text-gold-dark" /> {selectedRoom.beds}
                </span>
              </div>

              <div className="mt-6 space-y-2 border-t border-black/5 pt-5 text-sm">
                <div className="flex justify-between text-slate">
                  <span>${selectedRoom.price} × {nights || 0} night{nights === 1 ? "" : "s"}</span>
                  <span>${base}</span>
                </div>
                {extraGuests > 0 && (
                  <div className="flex justify-between text-slate">
                    <span>
                      +{extraGuests} extra guest{extraGuests > 1 ? "s" : ""} × ${30}/night
                    </span>
                    <span>${extraGuestFeeTotal}</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-black/5 pt-2 font-semibold text-ink">
                  <span>Estimated total</span>
                  <span>${total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-lg bg-white p-7 shadow-sm sm:p-10">
            {booking.status === "submitted" ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <FaCheckCircle className="mb-4 text-4xl text-gold" />
                <h3 className="font-display text-xl font-semibold text-ink">
                  Booking request received
                </h3>
                <p className="mt-2 max-w-xs text-sm text-slate">
                  A confirmation for the {selectedRoom.name} will land in your
                  inbox shortly.
                </p>
                <button
                  onClick={() => dispatch(resetBooking())}
                  className="link-underline mt-6 text-sm font-semibold text-gold-dark transition-colors"
                >
                  Book another stay
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {booking.status === "error" && (
                  <div className="flex items-center gap-2 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <FaExclamationCircle className="shrink-0" />
                    {booking.error || "Something went wrong. Please try again."}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Full Name
                    <input
                      type="text"
                      required
                      value={booking.fullName}
                      onChange={handleChange("fullName")}
                      placeholder="Jane Cooper"
                      className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Email
                    <input
                      type="email"
                      required
                      value={booking.email}
                      onChange={handleChange("email")}
                      placeholder="jane@example.com"
                      className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Phone Number
                    <input
                      type="tel"
                      required
                      value={booking.phone}
                      onChange={handleChange("phone")}
                      placeholder="+1 555 123 4567"
                      className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Country / Nationality
                    <select
                      required
                      value={booking.country}
                      onChange={handleChange("country")}
                      className="rounded border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    >
                      <option value="" disabled>Select country</option>
                      {COUNTRIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Check-in
                    <input
                      type="date"
                      required
                      value={booking.checkIn}
                      onChange={handleChange("checkIn")}
                      className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Check-out
                    <input
                      type="date"
                      required
                      value={booking.checkOut}
                      onChange={handleChange("checkOut")}
                      className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Guests
                    <input
                      type="number"
                      min="1"
                      max={selectedRoom.guests}
                      value={booking.guests}
                      onChange={handleChange("guests")}
                      className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    />
                    <span className="text-xs text-slate">
                      Max {selectedRoom.guests} for this room — extra guests add $30/night each
                    </span>
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Room Type
                    <select
                      value={booking.roomType}
                      onChange={handleChange("roomType")}
                      className="rounded border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    >
                      {rooms.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name} — ${r.price}/night
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="flex flex-col gap-2 text-sm text-ink/70">
                  Estimated Arrival Time
                  <select
                    value={booking.arrivalTime}
                    onChange={handleChange("arrivalTime")}
                    className="rounded border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                  >
                    <option value="">Not sure yet</option>
                    {ARRIVAL_TIMES.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </label>

                <label className="flex flex-col gap-2 text-sm text-ink/70">
                  Special Requests (optional)
                  <textarea
                    rows={4}
                    value={booking.message}
                    onChange={handleChange("message")}
                    placeholder="Airport transfer, dietary needs, celebrating an occasion..."
                    className="resize-none rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                  />
                </label>

                <button
                  type="submit"
                  disabled={booking.status === "submitting"}
                  className="btn-sweep mt-2 flex items-center justify-center gap-2 border border-gold bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition-transform duration-300 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {booking.status === "submitting"
                      ? "Redirecting to payment…"
                      : `Pay $${total} & Confirm`}
                    {booking.status !== "submitting" && <FaArrowRight />}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}