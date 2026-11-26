"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, Mail } from "lucide-react";
import { site, whatsappLink } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";

export default function FloatingContact() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {show && (
          <motion.button
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-navy-800 shadow-lg transition hover:-translate-y-1"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
      {site.whatsapp ? (
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp"
          className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-110"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
          <WhatsAppIcon size={28} />
          <span className="pointer-events-none absolute right-full mr-3 hidden whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink shadow-lg group-hover:block">Chat on WhatsApp</span>
        </a>
      ) : (
        <a
          href={`mailto:${site.email}`}
          aria-label="Email Orvanzia Visa"
          className="relative grid h-14 w-14 place-items-center rounded-full bg-navy-800 text-gold-400 shadow-xl ring-4 ring-gold-500/30 transition hover:scale-110"
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-navy-700 opacity-25" />
          <Mail size={24} />
        </a>
      )}
    </div>
  );
}
