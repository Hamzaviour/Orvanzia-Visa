import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, Clock3, Eye, Headset, Info, ShieldCheck, UserRoundCheck } from "lucide-react";
import Hero from "@/components/Hero";
import FlagMarquee from "@/components/FlagMarquee";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import CountryCard from "@/components/CountryCard";
import { ConsultationForm, EnquiryForm } from "@/components/Forms";
import { ServiceIcon } from "@/components/Icons";
import { Counter, Reveal, SectionHeading, Stagger, StaggerItem, Tilt } from "@/components/motion";
import { popularCountries, countries, photo } from "@/lib/countries";
import { faqs, services } from "@/lib/services";

const trust = [
  { icon: UserRoundCheck, t: "Expert Guidance", d: "Clear, practical guidance from your first question to your final submission." },
  { icon: Clock3, t: "Fast & Efficient", d: "An organised, straightforward process that respects your travel dates." },
  { icon: Eye, t: "Transparent Process", d: "Know exactly what is required and what our service covers before you proceed." },
  { icon: Headset, t: "Dedicated Support", d: "Real human support whenever you need help with your next step." },
];

export default function Home() {
  const paris = countries.find((c) => c.code === "fr")!;
  return (
    <>
      <Hero />
      <FlagMarquee />

      {/* WHY CHOOSE */}
      <section className="section plane-pattern relative">
        <div className="container-x">
          <SectionHeading
            eyebrow="Why choose Orvanzia"
            title="Visa Support You Can Rely On"
            text="Professional guidance designed to make your visa journey easier, clearer and more confident."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trust.map(({ icon: I, t, d }) => (
              <StaggerItem key={t}>
                <Tilt className="group h-full">
                  <div className="relative h-full overflow-hidden rounded-3xl border border-line bg-white p-7 transition duration-500 hover:border-transparent hover:shadow-[0_30px_60px_-30px_rgba(12,31,92,0.5)]">
                    <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-navy-700 to-gold-500 transition duration-500 group-hover:scale-x-100" />
                    <div className="grid h-14 w-14 place-items-center rounded-2xl bg-navy-50 text-navy-800 transition duration-500 group-hover:bg-navy-800 group-hover:text-gold-400">
                      <I size={26} />
                    </div>
                    <h3 className="mt-6 text-xl font-bold">{t}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{d}</p>
                  </div>
                </Tilt>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* POPULAR DESTINATIONS (Atlys style) */}
      <section className="section bg-surface">
        <div className="container-x">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading
              center={false}
              eyebrow="Explore destinations"
              title="Where will your next visa take you?"
              text="Indicative timelines and service fees for the most-requested destinations. Explore all 196 countries."
            />
            <Reveal>
              <Link href="/destinations" className="btn-outline shrink-0">
                View all destinations <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {popularCountries.slice(0, 8).map((c) => (
              <CountryCard key={c.code} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="section relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute -left-40 top-0 h-[500px] w-[500px] rounded-full bg-navy-600/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-gold-500/15 blur-3xl" />
        <div className="container-x relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              light
              center={false}
              eyebrow="Need help with your visa?"
              title="Tell Us About Your Journey"
              text="Have a question or unsure where to start? Send us a few details and our team will guide you towards the right next step."
            />
            <Stagger className="mt-8 space-y-3">
              {["Personalised guidance", "Clear next steps", "Dedicated support"].map((t) => (
                <StaggerItem key={t} className="flex items-center gap-3 text-lg text-white">
                  <CheckCircle2 className="text-gold-400" size={22} /> {t}
                </StaggerItem>
              ))}
            </Stagger>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            eyebrow="Our visa services"
            title="Comprehensive Visa Assistance"
            text="Support for every kind of trip, with a clear process and guidance tailored to your journey."
          />
          <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <StaggerItem key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-white p-8 transition duration-500 hover:-translate-y-1.5 hover:border-navy-800 hover:bg-navy-800"
                >
                  <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-100 text-gold-600 transition duration-500 group-hover:rotate-[-8deg] group-hover:bg-gold-500 group-hover:text-navy-950">
                    <ServiceIcon name={s.icon} size={26} />
                  </div>
                  <h3 className="mt-6 text-2xl font-bold transition group-hover:text-white">{s.title}</h3>
                  <p className="mt-2 flex-1 leading-relaxed text-muted transition group-hover:text-white/75">{s.short}</p>
                  <span className="mt-6 inline-flex items-center gap-2 font-semibold text-navy-700 transition group-hover:text-gold-400">
                    Learn More <ArrowRight size={17} className="transition group-hover:translate-x-1.5" />
                  </span>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* PROCESS */}
      <section className="section plane-pattern bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow="How it works"
            title="Simple Steps to Get Your Visa"
            text="We make the process easier to understand and manage, from your first enquiry to your application."
          />
          <Process />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section overflow-hidden">
        <div className="container-x grid items-center gap-14 lg:grid-cols-2">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-2xl sm:aspect-[5/5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo(paris, 960)} alt="Paris, France" loading="lazy" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/80 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">Orvanzia Visa</p>
                <p className="mt-2 text-3xl font-bold text-white">Your journey matters.</p>
              </div>
            </div>
            <div className="animate-float absolute -right-4 top-10 hidden rounded-2xl bg-white p-4 shadow-2xl sm:block">
              <Image src="/logo.png" alt="" width={569} height={252} className="h-12 w-auto" />
            </div>
            <div className="absolute -bottom-6 left-6 rounded-2xl bg-navy-800 px-6 py-5 text-white shadow-2xl">
              <p className="text-4xl font-extrabold text-gold-400">
                <Counter to={196} />
              </p>
              <p className="text-sm text-white/75">destinations covered</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading
              center={false}
              eyebrow="About Orvanzia"
              title="Your Trusted Partner for a Smoother Visa Journey"
              text="Visa applications can feel confusing and time-consuming. Orvanzia Visa simplifies the experience with clear information, practical guidance and dedicated support, so you can move forward with confidence."
            />
            <Stagger className="mt-8 space-y-4">
              {[
                ["Transparent Process", "Know what to expect at each stage."],
                ["Personalised Guidance", "Advice focused on your travel plans."],
                ["Dedicated Support", "Human assistance when you need it."],
              ].map(([t, d]) => (
                <StaggerItem key={t} className="flex gap-4 rounded-2xl border border-line p-4 transition hover:border-gold-500 hover:bg-gold-100/40">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-800 text-gold-400">
                    <ShieldCheck size={18} />
                  </span>
                  <span>
                    <b className="block text-ink">{t}</b>
                    <span className="text-muted">{d}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <Link href="/about" className="btn-primary mt-8">
                Learn More About Orvanzia <ArrowRight size={17} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-navy-800 py-14 text-white">
        <div className="container-x grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {[
            [196, "", "Destinations"],
            [6, "", "Visa categories"],
            [4, "", "Simple steps"],
            [100, "%", "Transparent fees"],
          ].map(([n, s, l]) => (
            <Reveal key={l as string}>
              <p className="text-4xl font-extrabold text-gold-400 md:text-5xl">
                <Counter to={n as number} suffix={s as string} />
              </p>
              <p className="mt-1 text-sm uppercase tracking-wider text-white/70">{l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONSULTATION */}
      <section id="consultation" className="section bg-surface">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading
              center={false}
              eyebrow="Book a consultation"
              title="Let's Plan Your Visa Journey"
              text="Ready to take the next step? Share your travel details and request a consultation with the Orvanzia team."
            />
            <Stagger className="mt-8 grid gap-3 sm:grid-cols-2">
              {["Personalised guidance", "Document checklist", "Eligibility assessment", "Support through your application"].map((t) => (
                <StaggerItem key={t} className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-sm">
                  <CheckCircle2 className="shrink-0 text-gold-600" size={20} />
                  <span className="font-medium">{t}</span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <p className="mt-6 flex gap-3 rounded-2xl border border-navy-600/20 bg-navy-50 p-4 text-sm text-navy-900">
                <Info size={18} className="mt-0.5 shrink-0" />
                Orvanzia Visa is an independent private consultancy. Visa decisions are made by the relevant authorities.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-3xl bg-white p-6 shadow-[0_30px_80px_-40px_rgba(12,31,92,0.5)] sm:p-9">
              <ConsultationForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              center={false}
              eyebrow="FAQ"
              title="Frequently Asked Questions"
              text="Quick answers to common questions about visa assistance and the application process."
            />
            <Reveal delay={0.2}>
              <Link href="/contact" className="btn-primary mt-8">
                Ask a Question <ArrowRight size={17} />
              </Link>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Faq items={faqs.slice(0, 6)} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
