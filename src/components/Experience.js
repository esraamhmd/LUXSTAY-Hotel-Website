import OptimizedImage from "./OptimizedImage";
import Link from "next/link";
import { experiences } from "@/data/content";
import { FaArrowRight } from "react-icons/fa";

const items = [
  { ...experiences.restaurant, reverse: false },
  { ...experiences.spa, reverse: true },
];

export default function Experience() {
  return (
    <section id="experience" className="bg-white py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-20 px-5 lg:px-8">
        {items.map((item) => (
          <div
            key={item.slug}
            className={`grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
              item.reverse ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <Link
              href={`/${item.slug}`}
              className="img-zoom relative block h-72 w-full overflow-hidden rounded-lg sm:h-96 lg:h-[26rem]"
            >
              <OptimizedImage
                src={item.heroImage}
                width={1100}
                alt={item.title}
                fill
                loading="lazy"
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </Link>

            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold-dark">
                {item.eyebrow}
              </p>
              <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
                {item.title}
              </h2>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-slate sm:text-base">
                {item.description}
              </p>
              <Link
                href={`/${item.slug}`}
                className="btn-sweep mt-7 inline-flex items-center gap-2 border border-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-gold-dark transition-transform duration-300 hover:text-white active:scale-95"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Read More <FaArrowRight />
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}