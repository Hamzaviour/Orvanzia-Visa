import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarClock, CheckCircle2, Clock3, FileText, Landmark, PoundSterling, Timer } from "lucide-react";
import PageHero from "@/components/PageHero";
import CountryCard from "@/components/CountryCard";
import { ConsultationForm } from "@/components/Forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { countries, flag, getCountry, photo, requirementsFor } from "@/lib/countries";

export function generateStaticParams() {
  return countries.map((c) => ({ code: c.code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const c = getCountry(code);
  if (!c) return {};
  return {
    title: `${c.name} Visa from the UK – Requirements, Fees & Processing`,
    description: `Apply for your ${c.name} ${c.visa.toLowerCase()} from the UK with Orvanzia Visa. Indicative processing ~${c.processingDays} days. Document checklist, fees and expert support.`,
  };
}

export default async function CountryPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const c = getCountry(code);
  if (!c) notFound();

  const related = countries.filter((x) => x.region === c.region && x.code !== c.code && (x.popular || x.visa === c.visa)).slice(0, 4);
  const facts = [
    { icon: Landmark, k: "Visa type", v: c.visa },
    { icon: Timer, k: "Processing", v: `~${c.processingDays} days` },
    { icon: CalendarClock, k: "Length of stay", v: c.stay },
    { icon: Clock3, k: "Validity", v: c.validity },
    { icon: PoundSterling, k: "Gov. fee (approx.)", v: `£${c.fee}` },
    { icon: FileText, k: "Our service", v: `from £${c.serviceFrom}` },
  ];

  return (
    <>
      <PageHero
        eyebrow={`${c.region} · ${c.visa}`}
        title={`${c.name} Visa`}
        text={`Everything you need to apply for a ${c.name} visa from the UK, with expert guidance from start to finish.`}
        crumbs={[{ label: "Destinations", href: "/destinations" }, { label: c.name }]}
        image={photo(c, 960)}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={flag(c.code, 160)} alt={`Flag of ${c.name}`} className="h-12 w-auto rounded-md shadow-lg ring-2 ring-white/30" />
          <Link href="#apply" className="btn-gold">
            Start Application <ArrowRight size={17} />
          </Link>
        </div>
      </PageHero>

      <section className="relative -mt-12 pb-8">
        <div className="container-x">
          <Stagger className="grid grid-cols-2 gap-3 rounded-3xl border border-line bg-white p-4 shadow-[0_30px_80px_-40px_rgba(12,31,92,0.5)] md:grid-cols-3 lg:grid-cols-6">
            {facts.map(({ icon: I, k, v }) => (
              <StaggerItem key={k} className="rounded-2xl bg-surface p-4">
                <I size={20} className="text-gold-600" />
                <p className="mt-2 text-xs uppercase tracking-wide text-muted">{k}</p>
                <p className="font-bold text-ink">{v}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section !pt-12">
        <div className="container-x grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <h2 className="text-3xl font-bold">Documents checklist</h2>
              <p className="mt-2 text-muted">A typical checklist for UK residents. We tailor it to your nationality and circumstances.</p>
            </Reveal>
            <Stagger className="mt-6 space-y-3">
              {requirementsFor(c).map((r) => (
                <StaggerItem key={r} className="flex gap-3 rounded-2xl border border-line p-4">
                  <CheckCircle2 className="mt-0.5 shrink-0 text-gold-600" size={20} />
                  <span>{r}</span>
                </StaggerItem>
              ))}
            </Stagger>

            <Reveal>
              <h2 className="mt-14 text-3xl font-bold">How we help with your {c.name} visa</h2>
            </Reveal>
            <Stagger className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                ["01", "Eligibility check", `We confirm whether you need a ${c.visa.toLowerCase()} for ${c.name} based on your nationality and UK status.`],
                ["02", "Document review", "Your personalised checklist, plus a review of every document before submission."],
                ["03", "Application & booking", "We complete the forms with you and support your appointment or online submission."],
                ["04", "Ready to travel", "Track your application and get final travel tips once your decision arrives."],
              ].map(([n, t, d]) => (
                <StaggerItem key={n} className="rounded-2xl bg-surface p-6">
                  <span className="text-sm font-bold text-gold-600">{n}</span>
                  <h3 className="mt-1 text-lg font-bold">{t}</h3>
                  <p className="mt-1 text-[15px] text-muted">{d}</p>
                </StaggerItem>
              ))}
            </Stagger>
            <p className="mt-8 text-xs text-muted">
              Processing times and fees are indicative and can change. Government fees are paid to the relevant authority; our service fee is
              separate. We confirm the current figures before you apply.
            </p>
          </div>

          <aside id="apply" className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_80px_-40px_rgba(12,31,92,0.5)] sm:p-8">
              <h2 className="text-2xl font-bold">Apply for your {c.name} visa</h2>
              <p className="mb-6 mt-1 text-sm text-muted">Send your details and our team will contact you with next steps.</p>
              <ConsultationForm destination={c.name} visa="Tourist Visa" />
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-surface">
          <div className="container-x">
            <Reveal>
              <h2 className="text-3xl font-bold">More destinations in {c.region}</h2>
            </Reveal>
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r) => (
                <CountryCard key={r.code} c={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
