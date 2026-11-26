import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Compass, HeartHandshake, Scale, ShieldCheck } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Counter, Reveal, SectionHeading, Stagger, StaggerItem } from "@/components/motion";
import { countries, photo } from "@/lib/countries";

export const metadata: Metadata = {
  title: "About Us",
  description: "Orvanzia Visa is a UK-based private visa consultancy helping travellers apply for visas with clear guidance and dedicated support.",
};

const values = [
  { icon: Compass, t: "Clarity", d: "Plain-English guidance so you always know what's needed and why." },
  { icon: ShieldCheck, t: "Integrity", d: "Honest advice. We never promise outcomes only the authorities can decide." },
  { icon: HeartHandshake, t: "Care", d: "Every trip matters, whether it's a holiday, a family visit or a new job." },
  { icon: Scale, t: "Transparency", d: "Clear service fees agreed up front, separate from government fees." },
];

export default function AboutPage() {
  const img = countries.find((c) => c.code === "ch")!;
  return (
    <>
      <PageHero
        eyebrow="About Orvanzia"
        title="Your Trusted Partner for a Smoother Visa Journey"
        text="We help travellers in the UK navigate visa applications with confidence."
        crumbs={[{ label: "About Us" }]}
      />
      <section className="section">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              center={false}
              eyebrow="Our story"
              title="Making visa applications feel simple"
              text="Visa applications can feel confusing and time-consuming: different rules for every country, long document lists and strict appointment systems. Orvanzia Visa was created to take that stress away."
            />
            <Reveal delay={0.2}>
              <p className="mt-4 text-[17px] leading-relaxed text-muted">
                From understanding your options to organising your application, our team gives you practical, personal guidance at every stage.
                We support tourist, business, family, student, work and transit visas for 196 destinations worldwide.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link href="/contact" className="btn-primary mt-8">
                Talk to our team <ArrowRight size={17} />
              </Link>
            </Reveal>
          </div>
          <Reveal className="relative">
            <div className="aspect-[4/3] overflow-hidden rounded-[32px] shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo(img, 960)} alt="Switzerland" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-4 grid grid-cols-2 gap-4 rounded-2xl bg-navy-800 p-6 text-white shadow-2xl sm:left-8">
              <div>
                <p className="text-3xl font-extrabold text-gold-400">
                  <Counter to={196} />
                </p>
                <p className="text-xs uppercase tracking-wide text-white/70">Destinations</p>
              </div>
              <div>
                <p className="text-3xl font-extrabold text-gold-400">
                  <Counter to={6} />
                </p>
                <p className="text-xs uppercase tracking-wide text-white/70">Visa types</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="section plane-pattern bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="What we stand for" title="Our values" />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map(({ icon: I, t, d }) => (
              <StaggerItem key={t} className="rounded-3xl bg-white p-7 shadow-sm">
                <I className="text-gold-600" size={30} />
                <h3 className="mt-5 text-xl font-bold">{t}</h3>
                <p className="mt-2 text-muted">{d}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
