import type { Metadata } from "next";
import { CheckCircle2, Info } from "lucide-react";
import PageHero from "@/components/PageHero";
import { ConsultationForm } from "@/components/Forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export const metadata: Metadata = {
  title: "Apply Now – Start Your Visa Application",
  description: "Start your visa application with Orvanzia Visa. Share your travel details and book a consultation.",
};

export default function ApplyPage() {
  return (
    <>
      <PageHero
        eyebrow="Apply now"
        title="Start your visa application"
        text="Share your travel details and our team will contact you with a personalised checklist and next steps."
        crumbs={[{ label: "Apply Now" }]}
      />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <Reveal>
              <h2 className="text-3xl font-bold">What happens next?</h2>
            </Reveal>
            <Stagger className="mt-6 space-y-4">
              {[
                ["We review your details", "Our team checks your destination, nationality and travel purpose."],
                ["We contact you", "At your preferred time, to confirm eligibility and fees."],
                ["You get your checklist", "A personalised document list for your application."],
                ["We support your submission", "Forms, appointments and final checks before you submit."],
              ].map(([t, d], i) => (
                <StaggerItem key={t} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-800 text-sm font-bold text-gold-400">{i + 1}</span>
                  <span>
                    <b className="block">{t}</b>
                    <span className="text-muted">{d}</span>
                  </span>
                </StaggerItem>
              ))}
            </Stagger>
            <Reveal delay={0.2}>
              <ul className="mt-8 space-y-2 text-sm text-muted">
                {["No obligation to proceed", "Clear fees before you pay", "Your data handled securely"].map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-gold-600" /> {t}
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex gap-3 rounded-2xl bg-navy-50 p-4 text-sm text-navy-900">
                <Info size={18} className="mt-0.5 shrink-0" />
                Orvanzia Visa is an independent private consultancy. Visa decisions are made by the relevant authorities.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_80px_-40px_rgba(12,31,92,0.5)] sm:p-9">
              <ConsultationForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
