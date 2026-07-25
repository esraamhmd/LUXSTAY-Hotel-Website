"use client";

import { useState } from "react";
import OptimizedImage from "./OptimizedImage";
import { galleryImages } from "@/data/content";
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus } from "react-icons/fa";

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState(null);

  const close = () => setOpenIndex(null);
  const prev = (e) => {
    e?.stopPropagation();
    setOpenIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  };
  const next = (e) => {
    e?.stopPropagation();
    setOpenIndex((i) => (i + 1) % galleryImages.length);
  };

  return (
    <section id="gallery" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mb-12 max-w-xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
            A Look Inside
          </p>
          <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
            Gallery
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {galleryImages.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setOpenIndex(i)}
              className="img-zoom group relative aspect-square overflow-hidden rounded-md"
            >
              <OptimizedImage
                src={img.src}
                width={600}
                alt={img.caption}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 220px"
              />
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 text-xs font-medium text-white">
                  <FaSearchPlus /> {img.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-5"
          onClick={close}
        >
          <button
            className="absolute right-6 top-6 text-2xl text-white/80 transition-colors hover:text-gold"
            onClick={close}
            aria-label="Close"
          >
            <FaTimes />
          </button>
          <button
            className="absolute left-4 text-3xl text-white/70 transition-colors hover:text-gold sm:left-8"
            onClick={prev}
            aria-label="Previous image"
          >
            <FaChevronLeft />
          </button>
          <button
            className="absolute right-4 text-3xl text-white/70 transition-colors hover:text-gold sm:right-8"
            onClick={next}
            aria-label="Next image"
          >
            <FaChevronRight />
          </button>

          <div
            className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <OptimizedImage
              src={galleryImages[openIndex].src}
              width={2000}
              alt={galleryImages[openIndex].caption}
              fill
              priority
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="absolute bottom-6 text-sm text-white/70">
            {galleryImages[openIndex].caption} — {openIndex + 1} / {galleryImages.length}
          </p>
        </div>
      )}
    </section>
  );
}