"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleMobileMenu,
  closeMobileMenu,
  setActiveDropdown,
} from "@/store/uiSlice";
import { navLinks } from "@/data/content";
import { HiMenuAlt3, HiX, HiChevronDown } from "react-icons/hi";
import { FaArrowRight } from "react-icons/fa";

export default function Navbar() {
  const dispatch = useDispatch();
  const mobileMenuOpen = useSelector((s) => s.ui.mobileMenuOpen);
  const activeDropdown = useSelector((s) => s.ui.activeDropdown);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-ink/95 backdrop-blur shadow-lg shadow-black/10" : "bg-ink"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <svg
            width="30"
            height="30"
            viewBox="0 0 30 30"
            fill="none"
            className="text-gold transition-transform duration-300 group-hover:-translate-y-0.5"
          >
            <path
              d="M15 2 3 11v16h8V17h8v10h8V11L15 2Z"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
            <circle cx="15" cy="9" r="1.6" fill="currentColor" />
          </svg>
          <span className="font-display text-xl font-semibold tracking-wide text-white">
            LUX<span className="text-gold">STAY</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li
              key={link.label}
              className="relative"
              onMouseEnter={() =>
                link.dropdown && dispatch(setActiveDropdown(link.label))
              }
              onMouseLeave={() => link.dropdown && dispatch(setActiveDropdown(null))}
            >
              <Link
                href={link.href}
                className="link-underline flex items-center gap-1 text-sm font-medium text-white/90 transition-colors duration-200 hover:text-gold"
              >
                {link.label}
                {link.dropdown && (
                  <HiChevronDown
                    className={`text-xs transition-transform duration-300 ${
                      activeDropdown === link.label ? "rotate-180 text-gold" : ""
                    }`}
                  />
                )}
              </Link>

              {link.dropdown && (
                <div
                  className={`absolute left-1/2 top-full w-56 -translate-x-1/2 pt-4 transition-all duration-300 ${
                    activeDropdown === link.label
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="overflow-hidden rounded-md bg-white shadow-2xl shadow-black/20">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block border-b border-black/5 px-5 py-3 text-sm text-ink/80 transition-colors duration-200 last:border-b-0 hover:bg-cream hover:text-gold-dark hover:pl-6"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

     
        <Link
          href="/booking"
          className="btn-sweep hidden items-center gap-2 border border-gold bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-transform duration-300 lg:flex hover:text-white active:scale-95"
        >
          <span className="relative z-10 flex items-center gap-2">
            Book Now <FaArrowRight />
          </span>
        </Link>

       
        <button
          aria-label="Toggle menu"
          onClick={() => dispatch(toggleMobileMenu())}
          className="text-2xl text-white transition-transform duration-200 active:scale-90 lg:hidden"
        >
          {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

    
      <div
        className={`overflow-hidden transition-[max-height] duration-500 ease-in-out lg:hidden ${
          mobileMenuOpen ? "max-h-[640px]" : "max-h-0"
        }`}
      >
        <div className="flex flex-col gap-1 border-t border-white/10 bg-ink px-5 pb-6 pt-4">
          {navLinks.map((link) => (
            <div key={link.label}>
              <Link
                href={link.href}
                onClick={() => dispatch(closeMobileMenu())}
                className="block py-3 text-sm font-medium text-white/90 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
              {link.dropdown && (
                <div className="ml-3 mb-2 flex flex-col gap-1 border-l border-white/10 pl-4">
                  {link.dropdown.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => dispatch(closeMobileMenu())}
                      className="py-1.5 text-xs text-white/60 transition-colors hover:text-gold"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <Link
            href="/booking"
            onClick={() => dispatch(closeMobileMenu())}
            className="mt-3 inline-flex items-center justify-center gap-2 bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink transition-transform active:scale-95"
          >
            Book Now <FaArrowRight />
          </Link>
        </div>
      </div>
    </header>
  );
}