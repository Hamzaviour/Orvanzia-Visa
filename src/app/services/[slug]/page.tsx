import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import PageHero from "@/components/PageHero";
import CountryCard from "@/components/CountryCard";
import { ConsultationForm } from "@/components/Forms";
import { ServiceIcon } from "@/components/Icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { getService, services } from "@/lib/services";
import { popularCountries } from "@/lib/countries";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  return s ? { title: `${s.title} Assistance from the UK`, description: s.intro } : {};
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();

  return (
    <>
      <PageHero eyebrow="Visa service" title={s.title} text={s.intro} crumbs={[{ label: "Services", href: "/services" }, { label: s.title }]}>
        <Link href="#book" className="btn-gold mt-8">
          Book a Consultation <ArrowRight size={17} />
        </Link>
      </PageHero>

      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gold-100 text-gold-600">
                <ServiceIcon name={s.icon} size={30} />
              </div>
              <h2 className="mt-6 text-3xl font-bold">What&apos;s included</h2>
            </Reveal>
            <Stagger className="mt-6 grid gap-3 sm:grid-cols-2">
              {s.includes.map((i) => (
                <StaggerItem key={i} className="flex items-start gap-3 rounded-2xl border border-line p-4">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-gold-600" /> {i}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal>
              <h2 className="mt-14 text-3xl font-bold">Ideal for</h2>
            </Reveal>
            <Stagger className="mt-6 flex flex-wrap gap-3">
              {s.idealFor.map((i) => (
                <StaggerItem key={i} className="flex items-center gap-2 rounded-full bg-navy-50 px-5 py-2.5 font-medium text-navy-900">
                  <Sparkles size={15} className="text-gold-600" /> {i}
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal>
              <h2 className="mt-14 text-3xl font-bold">Popular destinations</h2>
            </Reveal>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {popularCountries.slice(0, 4).map((c) => (
                <CountryCard key={c.code} c={c} />
              ))}
            </div>
          </div>

          <aside id="book" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_80px_-40px_rgba(12,31,92,0.5)] sm:p-8">
              <h2 className="text-2xl font-bold">Book a {s.title.toLowerCase()} consultation</h2>
              <p className="mb-6 mt-1 text-sm text-muted">Tell us about your trip and we&apos;ll get back to you.</p>
              <ConsultationForm visa={s.title} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
