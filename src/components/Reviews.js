"use client";

import { useEffect, useState } from "react";
import OptimizedImage from "./OptimizedImage";
import api from "@/lib/api";
import { testimonials, comments as fallbackComments } from "@/data/content";
import {
  FaQuoteLeft,
  FaStar,
  FaPlus,
  FaTimes,
  FaSpinner,
  FaImage,
} from "react-icons/fa";

export default function Reviews() {
  const [active, setActive] = useState(0);
  const t = testimonials[active];

  const [comments, setComments] = useState(fallbackComments);
  const [loadingComments, setLoadingComments] = useState(true);

  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState({ name: "", rating: 5, text: "" });
  const [imageFile, setImageFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  
  useEffect(() => {
    api
      .get("/comments")
      .then((res) => {
        if (res.data.comments?.length) {
          setComments(
            res.data.comments.map((c) => ({
              name: c.name,
              rating: c.rating,
              text: c.text,
              image: c.image_url || null,
              date: new Date(c.created_at).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              }),
            }))
          );
        }
      })
      .catch(() => {
        
      })
      .finally(() => setLoadingComments(false));
  }, []);

  const handleFormChange = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleAddComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      let imageUrl = null;

      if (imageFile) {
        const fd = new FormData();
        fd.append("file", imageFile);
        fd.append("folder", "luxstay/comments");
        const uploadRes = await api.post("/upload", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        imageUrl = uploadRes.data.url;
      }

      const res = await api.post("/comments", {
        name: form.name,
        rating: Number(form.rating),
        text: form.text,
        imageUrl,
      });

      setComments((prev) => [
        {
          name: res.data.comment.name,
          rating: res.data.comment.rating,
          text: res.data.comment.text,
          image: res.data.comment.image_url || null,
          date: new Date(res.data.comment.created_at).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
          }),
        },
        ...prev,
      ]);
      setForm({ name: "", rating: 5, text: "" });
      setImageFile(null);
      setFormOpen(false);
    } catch (err) {
      setFormError(err.response?.data?.error || "Could not post your review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
      
        <div className="rounded-lg bg-ink px-6 py-14 sm:px-12 lg:px-16">
          <div className="flex flex-col items-center gap-10 lg:flex-row lg:items-center">
            <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full ring-2 ring-gold/40 sm:h-48 sm:w-48">
              <OptimizedImage
                src={t.image}
                width={350}
                alt={t.name}
                fill
                loading="lazy"
                className="object-cover"
              />
            </div>

            <div className="text-center lg:text-left">
              <FaQuoteLeft className="mx-auto mb-4 text-2xl text-gold/60 lg:mx-0" />
              <p className="mx-auto max-w-2xl text-lg leading-relaxed text-white/85 sm:text-xl">
                {t.quote}
              </p>
              <p className="mt-6 font-display text-lg font-semibold text-white">
                {t.name}
              </p>
              <p className="text-sm text-gold-light">{t.role}</p>

              <div className="mt-8 flex justify-center gap-2 lg:justify-start">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Show testimonial ${i + 1}`}
                    onClick={() => setActive(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === active ? "w-7 bg-gold" : "w-2.5 bg-white/25 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      
        <div className="mt-16 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
              Guest Comments
            </p>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              What Our Guests Say
            </h2>
          </div>
          <button
            onClick={() => setFormOpen((v) => !v)}
            className="btn-sweep flex shrink-0 items-center gap-2 border border-gold bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-wide text-ink transition-transform duration-300 hover:text-white active:scale-95"
          >
            <span className="relative z-10 flex items-center gap-2">
              {formOpen ? <FaTimes /> : <FaPlus />}
              {formOpen ? "Cancel" : "Add a Review"}
            </span>
          </button>
        </div>

        {formOpen && (
          <form
            onSubmit={handleAddComment}
            className="mt-8 flex flex-col gap-4 rounded-lg bg-cream p-6 sm:p-8"
          >
            {formError && (
              <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {formError}
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-ink/70">
                Your Name
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={handleFormChange("name")}
                  placeholder="Jane Cooper"
                  className="rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-ink/70">
                Rating
                <select
                  value={form.rating}
                  onChange={handleFormChange("rating")}
                  className="rounded border border-black/10 bg-white px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n} star{n > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="flex flex-col gap-2 text-sm text-ink/70">
              Your Review
              <textarea
                rows={4}
                required
                value={form.text}
                onChange={handleFormChange("text")}
                placeholder="Tell other travelers about your stay..."
                className="resize-none rounded border border-black/10 px-4 py-3 text-sm text-ink outline-none transition-colors focus:border-gold"
              />
            </label>

            <label className="flex items-center gap-3 text-sm text-ink/70">
              <span className="flex items-center gap-2 rounded border border-dashed border-black/20 px-4 py-2.5 transition-colors hover:border-gold">
                <FaImage className="text-gold-dark" />
                {imageFile ? imageFile.name : "Attach a photo (optional)"}
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="btn-sweep mt-2 flex items-center justify-center gap-2 border border-gold bg-gold px-7 py-3.5 text-sm font-semibold uppercase tracking-wide text-ink transition-transform duration-300 hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span className="relative z-10 flex items-center gap-2">
                {submitting && <FaSpinner className="animate-spin" />}
                {submitting ? "Posting…" : "Post Review"}
              </span>
            </button>
          </form>
        )}

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {comments.map((c, i) => (
            <div
              key={`${c.name}-${i}`}
              className="card-hover flex flex-col overflow-hidden rounded-lg bg-white shadow-sm"
            >
              {c.image && (
                <div className="img-zoom relative h-40 w-full">
                  <OptimizedImage
                    src={c.image}
                    width={500}
                    alt={`Photo from ${c.name}'s review`}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              )}
              <div className="flex flex-1 flex-col p-6">
                <FaQuoteLeft className="mb-3 text-lg text-gold/50" />
                <div className="mb-2 flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <FaStar
                      key={s}
                      className={`text-xs ${
                        s < c.rating ? "text-gold" : "text-black/10"
                      }`}
                    />
                  ))}
                </div>
                <p className="flex-1 text-sm leading-relaxed text-slate">{c.text}</p>
                <div className="mt-4 flex items-center justify-between border-t border-black/5 pt-4">
                  <p className="font-display text-sm font-semibold text-ink">
                    {c.name}
                  </p>
                  <p className="text-xs text-slate">{c.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {loadingComments && (
          <p className="mt-4 text-center text-xs text-slate">Loading latest reviews…</p>
        )}
      </div>
    </section>
  );
}