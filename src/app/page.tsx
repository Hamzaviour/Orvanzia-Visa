import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Eye, Headset, Info, ShieldCheck, UserRoundCheck } from "lucide-react";
import HeroSlider from "@/components/HeroSlider";
import FlagMarquee from "@/components/FlagMarquee";
import Process from "@/components/Process";
import Faq from "@/components/Faq";
import CountryCard from "@/components/CountryCard";
import { ConsultationForm, EnquiryForm } from "@/components/Forms";
import { ServiceIcon } from "@/components/Icons";
import { Counter, Reveal, SectionHeading, Stagger, StaggerItem, Tilt } from "@/components/motion";
import AboutCollage from "@/components/AboutCollage";
import { JsonLd, faqLd } from "@/components/JsonLd";
import { popularCountries, countries, photo, flag } from "@/lib/countries";
import { faqs, services } from "@/lib/services";

const trust = [
  { icon: UserRoundCheck, t: "Expert Guidance", d: "Clear, practical guidance from your first question to your final submission." },
  { icon: Clock3, t: "Fast & Efficient", d: "An organised, straightforward process that respects your travel dates." },
  { icon: Eye, t: "Transparent Process", d: "Know exactly what is required and what our service covers before you proceed." },
  { icon: Headset, t: "Dedicated Support", d: "Real human support whenever you need help with your next step." },
];

export default function Home() {
  const aboutPics = ["fr", "jp", "it", "ae"].map((code) => countries.find((c) => c.code === code)!);
  const aboutFlags = ["gb", "fr", "us", "ae", "jp"];
  return (
    <>
      <JsonLd data={faqLd(faqs)} />
      <HeroSlider />
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
        <div className="container-x grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          <AboutCollage
            pics={aboutPics.map((c) => ({ src: photo(c, 500), alt: `${c.capital}, ${c.name}`, place: c.name }))}
          />
          <div>
            <SectionHeading
              center={false}
              eyebrow="About Orvanzia"
              title="Your Trusted Partner for a Smoother Visa Journey"
              text="Visa applications can feel confusing and time-consuming. Orvanzia Visa simplifies the experience with clear information, practical guidance and dedicated support, so you can move forward with confidence."
            />
            <Stagger className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                [Eye, "Transparent Process", "Know what to expect at each stage."],
                [UserRoundCheck, "Personalised Guidance", "Advice focused on your travel plans."],
                [Headset, "Dedicated Support", "Human assistance when you need it."],
                [ShieldCheck, "Honest Advice", "No false promises, just clear facts."],
              ].map(([I, t, d]) => {
                const Icon = I as typeof Eye;
                return (
                  <StaggerItem
                    key={t as string}
                    className="group rounded-2xl border border-line p-5 transition duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-[0_20px_40px_-25px_rgba(12,31,92,0.5)]"
                  >
                    <span className="grid h-11 w-11 place-items-center rounded-xl bg-navy-800 text-gold-400 transition group-hover:bg-gold-500 group-hover:text-navy-950">
                      <Icon size={20} />
                    </span>
                    <b className="mt-3 block text-ink">{t as string}</b>
                    <span className="text-sm text-muted">{d as string}</span>
                  </StaggerItem>
                );
              })}
            </Stagger>
            <Reveal delay={0.2} className="mt-8 flex flex-wrap items-center gap-6">
              <Link href="/about" className="btn-primary">
                Learn More About Orvanzia <ArrowRight size={17} />
              </Link>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {aboutFlags.map((c) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={c} src={flag(c, 80)} alt="" className="h-9 w-9 rounded-full object-cover ring-2 ring-white" />
                  ))}
                </div>
                <span className="text-sm text-muted">
                  <b className="text-ink">196</b> countries, one team
                </span>
              </div>
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
