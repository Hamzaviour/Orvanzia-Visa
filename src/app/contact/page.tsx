import type { Metadata } from "next";
import { Clock3, Mail, MapPin, Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import { EnquiryForm } from "@/components/Forms";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { site, whatsappLink } from "@/lib/site";
import WhatsAppIcon from "@/components/WhatsAppIcon";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Contact Orvanzia Visa for visa assistance from the UK. WhatsApp or call ${site.phone}, or email ${site.email}.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const items = [
    { icon: WhatsAppIcon, t: "WhatsApp", v: "Chat with us instantly", href: whatsappLink(), ext: true },
    { icon: Phone, t: "Call us", v: site.phone, href: `tel:+${site.whatsapp}` },
    { icon: Mail, t: "Email us", v: site.email, href: `mailto:${site.email}` },
    { icon: Clock3, t: "Office hours", v: "Mon – Sat, 9:00 AM – 6:00 PM" },
    { icon: MapPin, t: "Location", v: site.address },
  ];
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="We're here to help"
        text="Have a question about your visa? Send us a message and our team will guide you towards the right next step."
        crumbs={[{ label: "Contact Us" }]}
      />
      <section className="section">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Stagger className="space-y-4">
            {items.map(({ icon: I, t, v, href, ext }: { icon: React.ComponentType<{ size?: number }>; t: string; v: string; href?: string; ext?: boolean }) => (
              <StaggerItem key={t}>
                <a
                  href={href}
                  {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-5 rounded-3xl border border-line p-6 transition hover:border-navy-800 hover:bg-navy-800"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-navy-50 text-navy-800 transition group-hover:bg-gold-500 group-hover:text-navy-950">
                    <I size={24} />
                  </span>
                  <span>
                    <span className="block text-sm text-muted group-hover:text-white/70">{t}</span>
                    <span className="block text-lg font-semibold text-ink group-hover:text-white">{v}</span>
                  </span>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1}>
            <div className="rounded-3xl border border-line bg-white p-6 shadow-[0_30px_80px_-40px_rgba(12,31,92,0.5)] sm:p-9">
              <h2 className="text-2xl font-bold">Send us a message</h2>
              <p className="mb-6 mt-1 text-muted">We usually reply within one working day.</p>
              <EnquiryForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
