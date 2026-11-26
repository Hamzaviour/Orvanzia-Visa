import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, FileCheck2, PhoneCall } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Thank You – We've Received Your Request",
  description: "Thank you for contacting Orvanzia Visa. Our team will be in touch shortly.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/thank-you" },
};

export default function ThankYouPage() {
  return (
    <section className="section plane-pattern relative overflow-hidden">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-gold-500/15 blur-3xl" />
      <div className="container-x relative max-w-3xl text-center">
        <Reveal>
          <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-green-50 text-green-600 ring-8 ring-green-50/60">
            <CheckCircle2 size={52} strokeWidth={1.6} />
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <span className="eyebrow mt-8 justify-center">Request received</span>
        </Reveal>
        <Reveal delay={0.12}>
          <h1 className="mt-3 text-4xl font-extrabold md:text-6xl">Thank you!</h1>
        </Reveal>
        <Reveal delay={0.18}>
          <p className="mx-auto mt-5 max-w-xl text-lg text-muted">
            We&apos;ve received your details. A member of the Orvanzia Visa team will contact you shortly with your next steps.
          </p>
        </Reveal>

        <Stagger className="mt-12 grid gap-4 text-left sm:grid-cols-3">
          {[
            { icon: Clock3, t: "We review", d: "Your destination, nationality and travel plans." },
            { icon: PhoneCall, t: "We contact you", d: "At your preferred time to confirm eligibility." },
            { icon: FileCheck2, t: "Your checklist", d: "A personalised document list for your visa." },
          ].map(({ icon: I, t, d }) => (
            <StaggerItem key={t} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <I className="text-gold-600" size={24} />
              <p className="mt-3 font-bold">{t}</p>
              <p className="text-sm text-muted">{d}</p>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.2}>
          <p className="mt-12 text-muted">Need help sooner?</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn-primary !bg-[#25D366] !text-white">
              <WhatsAppIcon size={18} /> WhatsApp us
            </a>
            <a href={`tel:+${site.whatsapp}`} className="btn-outline">
              Call {site.phone}
            </a>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm font-semibold text-navy-700">
            <Link href="/" className="inline-flex items-center gap-1 hover:underline">
              Back to home <ArrowRight size={15} />
            </Link>
            <Link href="/destinations" className="inline-flex items-center gap-1 hover:underline">
              Explore destinations <ArrowRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
