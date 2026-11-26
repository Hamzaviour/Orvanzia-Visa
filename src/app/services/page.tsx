import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Process from "@/components/Process";
import { ServiceIcon } from "@/components/Icons";
import { SectionHeading, Stagger, StaggerItem } from "@/components/motion";
import { services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Visa Services – Tourist, Business, Family, Student, Work & Transit",
  description: "Comprehensive visa assistance for UK travellers: tourist, business, family & friends, student, work and transit visas.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our visa services"
        title="Comprehensive Visa Assistance"
        text="Whatever the purpose of your trip, we guide you through the right visa route with a clear, personal process."
        crumbs={[{ label: "Services" }]}
      />
      <section className="section">
        <div className="container-x">
          <Stagger className="grid gap-6 md:grid-cols-2">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full gap-6 rounded-3xl border border-line bg-white p-8 transition duration-500 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(12,31,92,0.5)]"
                >
                  <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-navy-800 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-950">
                    <ServiceIcon name={s.icon} size={28} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{s.title}</h2>
                    <p className="mt-2 text-muted">{s.intro}</p>
                    <span className="mt-4 inline-flex items-center gap-2 font-semibold text-navy-700">
                      Learn more <ArrowRight size={16} className="transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="Simple Steps to Get Your Visa" />
          <Process />
        </div>
      </section>
    </>
  );
}
