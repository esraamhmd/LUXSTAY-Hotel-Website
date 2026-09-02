"use client";

import { useEffect, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import { cld } from "@/lib/cloudinaryUrl";
import { FaTimes, FaChevronLeft, FaChevronRight, FaSearchPlus, FaSpinner } from "react-icons/fa";

const LIGHTBOX_WIDTH = 1600;

export default function Gallery({ images = [] }) {
  const [openIndex, setOpenIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const close = () => setOpenIndex(null);
  const prev = (e) => {
    e?.stopPropagation();
    setLoaded(false);
    setOpenIndex((i) => (i - 1 + images.length) % images.length);
  };
  const next = (e) => {
    e?.stopPropagation();
    setLoaded(false);
    setOpenIndex((i) => (i + 1) % images.length);
  };

  useEffect(() => {
    if (openIndex === null || images.length === 0) return;
    const neighbours = [
      (openIndex - 1 + images.length) % images.length,
      (openIndex + 1) % images.length,
    ];
    neighbours.forEach((i) => {
      const img = new window.Image();
      img.src = cld(images[i].src, LIGHTBOX_WIDTH);
    });
  }, [openIndex, images]);

  if (images.length === 0) return null;

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
          {images.map((img, i) => (
            <button
              key={img.src}
              onClick={() => {
                setLoaded(false);
                setOpenIndex(i);
              }}
              aria-label={`View photo: ${img.caption}`}
              className="img-zoom group relative aspect-square overflow-hidden rounded-md"
            >
              <OptimizedImage
                src={img.src}
                width={500}
                alt={img.caption}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 768px) 33vw, 220px"
              />
              <div className="absolute inset-0 flex items-end bg-linear-to-t from-ink/70 via-transparent to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="flex items-center gap-1.5 text-xs font-medium text-white">
                  <FaSearchPlus aria-hidden="true" /> {img.caption}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {openIndex !== null && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 p-5"
          onClick={close}
        >
          <button
            className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center text-2xl text-white/80 transition-colors hover:text-gold"
            onClick={close}
            aria-label="Close gallery"
          >
            <FaTimes aria-hidden="true" />
          </button>
          <button
            className="absolute left-2 z-20 flex h-14 w-14 items-center justify-center text-3xl text-white/70 transition-colors hover:text-gold sm:left-6"
            onClick={prev}
            aria-label="Previous image"
          >
            <FaChevronLeft aria-hidden="true" />
          </button>
          <button
            className="absolute right-2 z-20 flex h-14 w-14 items-center justify-center text-3xl text-white/70 transition-colors hover:text-gold sm:right-6"
            onClick={next}
            aria-label="Next image"
          >
            <FaChevronRight aria-hidden="true" />
          </button>

          <div
            className="relative z-10 aspect-video w-full max-w-4xl overflow-hidden rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {!loaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-ink/40">
                <FaSpinner className="animate-spin text-2xl text-white/70" aria-hidden="true" />
              </div>
            )}
            <OptimizedImage
              key={images[openIndex].src}
              src={images[openIndex].src}
              width={LIGHTBOX_WIDTH}
              alt={images[openIndex].caption}
              fill
              priority
              onLoad={() => setLoaded(true)}
              className="object-contain"
              sizes="100vw"
            />
          </div>
          <p className="absolute bottom-6 text-sm text-white/70">
            {images[openIndex].caption} - {openIndex + 1} / {images.length}
          </p>
        </div>
      )}
    </section>
  );
}