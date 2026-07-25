"use client";

import { useState } from "react";
import Link from "next/link";
import MapEmbed from "./MapEmbed";
import api from "@/lib/api";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaArrowRight,
  FaClock,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | submitting | sent | error
  const [error, setError] = useState(null);

  const handleChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    try {
      await api.post("/contact", form);
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setStatus("error");
      setError(err.response?.data?.error || "Something went wrong.");
    }
  };

  return (
    <section id="contact" className="bg-cream py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-14 max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            Get In Touch
          </p>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Questions? Send Us a Message
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-slate sm:text-base">
            This form is for general questions — not a reservation. Already
            know what you want to book?{" "}
            <Link href="/booking" className="link-underline font-semibold text-gold-dark">
              Go straight to the booking page
            </Link>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
          {/* Info column */}
          <div>
            <div className="flex flex-col gap-6">
              <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark">
                  <FaMapMarkerAlt />
                </span>
                <p className="text-sm text-ink/80">
                  Lagoon Villa 12, North Malé Atoll <br /> Maldives
                </p>
              </div>
              <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark">
                  <FaEnvelope />
                </span>
                <p className="text-sm text-ink/80">reservations@luxstay.com</p>
              </div>
              <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark">
                  <FaPhoneAlt />
                </span>
                <p className="text-sm text-ink/80">+960 664 0134</p>
              </div>
              <div className="flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-gold-dark">
                  <FaClock />
                </span>
                <p className="text-sm text-ink/80">
                  Front desk &amp; concierge — open 24 hours
                </p>
              </div>
            </div>

            <Link
              href="/booking"
              className="btn-sweep mt-9 inline-flex items-center gap-2 border border-gold bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition-transform duration-300 hover:text-white active:scale-95"
            >
              <span className="relative z-10 flex items-center gap-2">
                Go To Booking Page <FaArrowRight />
              </span>
            </Link>

            <div className="mt-10">
              <MapEmbed query="4.2117,73.5401" height="h-72" />
            </div>
          </div>

          {/* General inquiry form — separate from the booking form on /booking */}
          <div className="rounded-lg bg-white p-7 shadow-sm sm:p-10">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FaCheckCircle className="mb-4 text-4xl text-gold" />
                <h3 className="font-display text-xl font-semibold text-ink">
                  Message sent
                </h3>
                <p className="mt-2 max-w-xs text-sm text-slate">
                  Our team typically replies within one business day.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="link-underline mt-6 text-sm font-semibold text-gold-dark transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {status === "error" && (
                  <div className="flex items-center gap-2 rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    <FaExclamationCircle className="shrink-0" />
                    {error || "Something went wrong. Please try again."}
                  </div>
                )}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Full Name
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange("name")}
                      placeholder="Jane Cooper"
                      className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    />
                  </label>
                  <label className="flex flex-col gap-2 text-sm text-ink/70">
                    Email
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange("email")}
                      placeholder="jane@example.com"
                      className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                    />
                  </label>
                </div>

                <label className="flex flex-col gap-2 text-sm text-ink/70">
                  Subject
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={handleChange("subject")}
                    placeholder="Question about..."
                    className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                  />
                </label>

                <label className="flex flex-col gap-2 text-sm text-ink/70">
                  Message
                  <textarea
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange("message")}
                    placeholder="How can we help?"
                    className="resize-none rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-sweep mt-2 flex items-center justify-center gap-2 border border-gold bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition-transform duration-300 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {status === "submitting" ? "Sending…" : "Send Message"}
                    {status !== "submitting" && <FaArrowRight />}
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