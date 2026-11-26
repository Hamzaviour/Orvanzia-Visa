"use client";

import { motion } from "motion/react";
import { site, whatsappLink } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import WhatsAppIcon from "./WhatsAppIcon";

const items = [
  { label: "Instagram", href: site.social.instagram, Icon: InstagramIcon },
  { label: "Facebook", href: site.social.facebook, Icon: FacebookIcon },
  { label: "WhatsApp", href: whatsappLink(), Icon: WhatsAppIcon },
];

/** Vertical social bar pinned to the left edge (desktop / tablet). */
export default function SocialRail() {
  return (
    <motion.aside
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      aria-label="Social links"
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 md:block"
    >
      <div className="relative flex flex-col items-center gap-3 rounded-[22px] border border-white/10 bg-navy-950/90 px-2 py-5 shadow-[0_20px_50px_-15px_rgba(6,18,53,0.7)] ring-1 ring-gold-500/10">
        <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-gold-400 shadow-[0_0_10px_2px_rgba(221,185,90,0.7)]" />
        {items.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href || "#"}
            aria-label={`Orvanzia Visa on ${label}`}
            {...(href ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group relative grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white/80 transition duration-300 hover:-translate-y-0.5 hover:border-gold-500/60 hover:bg-gold-500 hover:text-navy-950"
          >
            <Icon size={19} />
            <span className="pointer-events-none absolute left-full ml-3 whitespace-nowrap rounded-lg bg-navy-950 px-2.5 py-1 text-xs font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
              {label}
            </span>
          </a>
        ))}
        <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-gold-400/80 shadow-[0_0_8px_2px_rgba(221,185,90,0.5)]" />
      </div>
    </motion.aside>
  );
}
