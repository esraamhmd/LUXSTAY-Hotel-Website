"use client";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-ink-2 text-white/80" style={{ contain: "layout", minHeight: "420px" }}>
      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">

          <div>
            <div className="flex items-center gap-2">
              <svg aria-hidden="true" width="26" height="26" viewBox="0 0 30 30" fill="none" className="text-gold">
                <path
                  d="M15 2 3 11v16h8V17h8v10h8V11L15 2Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinejoin="round"
                />
                <circle cx="15" cy="9" r="1.6" fill="currentColor" />
              </svg>
              <span className="font-display text-lg font-semibold text-white">
                LUX<span className="text-gold">STAY</span>
              </span>
            </div>

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              A boutique hotel brand built around quiet luxury and honest,
              direct pricing.
            </p>

            <div className="mt-6 flex gap-3">
              {[
                { Icon: FaTwitter, label: "Twitter", href: "https://twitter.com/" },
                { Icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/" },
                { Icon: FaFacebookF, label: "Facebook", href: "https://www.facebook.com/" },
                { Icon: FaYoutube, label: "YouTube", href: "https://www.youtube.com/" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`LuxStay on ${label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-ink hover:-translate-y-0.5 active:scale-90"
                >
                  <Icon className="text-xs" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-white">
              Information
            </h3>
            <ul className="mt-5 flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                <span>Water Villa 12, Dharavandhoo, Baa Atoll, Maldives</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="shrink-0 text-gold" aria-hidden="true" />
                <span>reservations@luxstay.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="shrink-0 text-gold" aria-hidden="true" />
                <span>+960 664 0134</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-base font-semibold text-white">
              Pages Links
            </h3>
            <ul className="mt-5 flex flex-col gap-3 text-sm">
              {[
                { label: "Our Rooms", href: "/rooms" },
                { label: "Book Now", href: "/booking" },
                { label: "Gallery", href: "/#gallery" },
                { label: "Reviews", href: "/#reviews" },
              ].map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="link-underline text-white/80 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/60 sm:flex-row lg:px-8">
          <p>
            Copyright © {new Date().getFullYear()}{" "}
            <span className="text-gold-light">LuxStay</span>. All rights reserved.
          </p>

          <div className="flex gap-5">
            <a href="/faq" className="hover:text-gold transition-colors py-2">FAQ</a>
            <a href="/terms" className="hover:text-gold transition-colors py-2">Terms of Use</a>
            <a href="/privacy" className="hover:text-gold transition-colors py-2">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}