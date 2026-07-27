"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { FaCheckCircle, FaTimesCircle, FaSpinner, FaArrowRight } from "react-icons/fa";

export default function BookingSuccessClient() {
  const searchParams = useSearchParams();
  const [state, setState] = useState({ status: "loading", booking: null, error: null });

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) {
      setState({ status: "error", booking: null, error: "Missing session id." });
      return;
    }

    api
      .get("/checkout/confirm", { params: { session_id: sessionId } })
      .then((res) => {
        setState({ status: "success", booking: res.data.booking, error: null });
      })
      .catch((err) => {
        setState({
          status: "error",
          booking: null,
          error: err.response?.data?.error || "Could not confirm payment.",
        });
      });
  }, [searchParams]);

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-cream px-5 pt-24">
      <div className="w-full max-w-md rounded-lg bg-white p-10 text-center shadow-sm">
        {state.status === "loading" && (
          <>
            <FaSpinner className="mx-auto mb-4 animate-spin text-4xl text-gold" />
            <h1 className="font-display text-xl font-semibold text-ink">
              Confirming your payment…
            </h1>
          </>
        )}

        {state.status === "success" && (
          <>
            <FaCheckCircle className="mx-auto mb-4 text-4xl text-gold" />
            <h1 className="font-display text-xl font-semibold text-ink">
              Booking confirmed
            </h1>
            <p className="mt-2 text-sm text-slate">
              Thanks, {state.booking.full_name.split(" ")[0]} - your{" "}
              {state.booking.room_type} is booked for {state.booking.check_in?.slice(0, 10)}{" "}
              through {state.booking.check_out?.slice(0, 10)}. A confirmation has been sent
              to {state.booking.email}.
            </p>
            <Link
              href="/"
              className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark"
            >
              Back to home <FaArrowRight className="text-xs" />
            </Link>
          </>
        )}

        {state.status === "error" && (
          <>
            <FaTimesCircle className="mx-auto mb-4 text-4xl text-red-400" />
            <h1 className="font-display text-xl font-semibold text-ink">
              We couldn't confirm that payment
            </h1>
            <p className="mt-2 text-sm text-slate">{state.error}</p>
            <Link
              href="/booking"
              className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-dark"
            >
              Try again <FaArrowRight className="text-xs" />
            </Link>
          </>
        )}
      </div>
    </section>
  );
}