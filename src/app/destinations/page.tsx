import type { Metadata } from "next";
import { Suspense } from "react";
import Explore from "@/components/Explore";
import DestinationSearch from "@/components/DestinationSearch";
import { Reveal } from "@/components/motion";
import { countries, photo } from "@/lib/countries";

export const metadata: Metadata = {
  title: "Explore Destinations – Visa Requirements for 196 Countries",
  description: "Explore visa types, indicative processing times and service fees for 196 destinations. Schengen, e-Visa, ETA, visa on arrival and embassy visas.",
  alternates: { canonical: "/destinations" },
};

const collage = ["jp", "it", "ae", "ma", "th", "ch"];

export default function DestinationsPage() {
  const pics = collage.map((c) => countries.find((x) => x.code === c)!);
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 pb-24 pt-16 text-white md:pt-20">
        <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-gold-500/15 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Reveal>
              <span className="eyebrow !text-gold-400">Explore the world</span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-6xl">
                Get your visa for <span className="text-gold-400">196</span> destinations
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-xl text-lg text-white/75">
                Search any country to see the visa type, indicative processing time and our service fee, then apply in minutes.
              </p>
            </Reveal>
            <Reveal delay={0.24} className="relative z-40 mt-8 max-w-xl">
              <DestinationSearch variant="page" />
            </Reveal>
          </div>
          <div className="hidden grid-cols-3 gap-3 lg:grid">
            {pics.map((c, i) => (
              <Reveal key={c.code} delay={0.1 + i * 0.07} className={i % 3 === 1 ? "translate-y-8" : ""}>
                <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo(c, 500)} alt={c.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
                  <span className="absolute bottom-2 left-3 text-sm font-semibold">{c.name}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative -mt-10 pb-24">
        <div className="container-x">
          <Suspense fallback={<div className="h-96" />}>
            <Explore />
          </Suspense>
          <p className="mt-12 text-center text-xs text-muted">
            Visa types, processing times and fees shown are indicative for UK residents and vary by nationality and season. We confirm current
            requirements before you apply.
          </p>
        </div>
      </section>
    </>
  );
}
