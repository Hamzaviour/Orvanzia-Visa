import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

const cols = [
  {
    title: "Quick Links",
    links: [
      ["Home", "/"],
      ["About Us", "/about"],
      ["Services", "/services"],
      ["Destinations", "/destinations"],
      ["Contact Us", "/contact"],
    ],
  },
  {
    title: "Visa Services",
    links: [
      ["Tourist Visa", "/services/tourist-visa"],
      ["Business Visa", "/services/business-visa"],
      ["Family & Friends Visa", "/services/family-visa"],
      ["Student Visa", "/services/student-visa"],
      ["Work Visa", "/services/work-visa"],
      ["Transit Visa", "/services/transit-visa"],
    ],
  },
  {
    title: "Resources",
    links: [
      ["FAQs", "/faq"],
      ["Visa Guidance", "/visa-guidance"],
      ["Privacy Policy", "/privacy-policy"],
      ["Terms & Conditions", "/terms"],
      ["Refund Policy", "/refund-policy"],
    ],
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-gold-500/10 blur-3xl" />
      <div className="container-x relative grid grid-cols-2 gap-x-5 gap-y-7 py-9 sm:grid-cols-4 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr] lg:gap-12 lg:py-16">
        <div className="col-span-2 sm:col-span-4 lg:col-span-1">
          <Image src="/logo-white.png" alt="Orvanzia Visa" width={2276} height={1008} className="h-12 w-auto lg:h-16" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/75 lg:mt-5 lg:text-[15px]">
            Professional visa assistance for travellers from the UK, with clear guidance and dedicated support for 196 destinations.
          </p>
        </div>
        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-[15px] font-semibold text-gold-400">{c.title}</h3>
            <ul className="mt-3 space-y-1.5 lg:mt-5 lg:space-y-3">
              {c.links.map(([l, h]) => (
                <li key={h}>
                  <Link href={h} className="text-[13px] text-white/75 transition hover:pl-1 hover:text-white lg:text-sm">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold text-gold-400">Contact Us</h3>
          <ul className="mt-3 space-y-2 text-[13px] text-white/75 lg:mt-5 lg:space-y-3 lg:text-sm">
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail size={15} className="shrink-0 text-gold-400" /> <span className="break-all">{site.email}</span>
              </a>
            </li>
            {site.phone && (
              <li>
                <a href={`tel:+${site.whatsapp}`} className="flex items-center gap-2 hover:text-white">
                  <Phone size={15} className="text-gold-400" /> {site.phone}
                </a>
              </li>
            )}
            <li>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white">
                <WhatsAppIcon size={15} className="text-gold-400" /> WhatsApp us
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={15} className="text-gold-400" /> {site.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-5 text-[11px] text-white/60 md:flex-row md:items-center md:justify-between md:text-xs">
          <p>© {new Date().getFullYear()} Orvanzia Visa. All Rights Reserved.</p>
          <p className="max-w-3xl md:text-right">{site.disclaimer}</p>
        </div>
      </div>
    </footer>
  );
}
