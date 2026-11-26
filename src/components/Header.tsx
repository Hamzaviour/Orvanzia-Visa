"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { nav, site, whatsappLink } from "@/lib/site";
import WhatsAppIcon from "./WhatsAppIcon";
import SocialIcons from "./SocialIcons";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openSub, setOpenSub] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50">
      {/* top bar */}
      <div
        className={`overflow-hidden bg-navy-900 text-white transition-all duration-500 ${scrolled ? "max-h-0" : "max-h-12"}`}
      >
        <div className="container-x flex h-9 items-center justify-between gap-3 text-xs font-medium">
          <span className="flex min-w-0 items-center gap-2 truncate">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold-400" />
            </span>
            {site.tagline}
          </span>
          <div className="flex items-center gap-4 sm:gap-5">
            <SocialIcons size={13} className="!gap-3" itemClassName="transition hover:text-gold-400" />
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-gold-400">
              <WhatsAppIcon size={13} /> <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <a href={`tel:+${site.whatsapp}`} className="hidden items-center gap-1.5 hover:text-gold-400 md:flex">
              <Phone size={13} /> {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="hidden items-center gap-1.5 hover:text-gold-400 lg:flex">
              <Mail size={13} /> {site.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b transition-all duration-500 ${
          scrolled ? "border-line bg-white/[0.97] shadow-[0_8px_30px_-12px_rgba(11,22,48,0.18)]" : "border-transparent bg-white"
        }`}
      >
        <div className={`container-x flex items-center justify-between transition-all duration-500 ${scrolled ? "h-16" : "h-[76px]"}`}>
          <Link href="/" className="relative shrink-0" aria-label="Orvanzia Visa home">
            <Image
              src="/logo.png"
              alt="Orvanzia Visa"
              width={569}
              height={252}
              priority
              className={`w-auto transition-all duration-500 ${scrolled ? "h-10" : "h-12"}`}
            />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-1 px-3 py-2 text-[14px] font-medium transition-colors ${
                    isActive(item.href) && (item.href !== "/destinations" || item.label === "Destinations")
                      ? "text-navy-700"
                      : "text-ink/80 hover:text-navy-700"
                  }`}
                >
                  {item.label}
                  {item.children && <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />}
                  {isActive(item.href) && (item.href !== "/destinations" || item.label === "Destinations") && (
                    <motion.span layoutId="nav-underline" className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-gold-500" />
                  )}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[0_24px_60px_-20px_rgba(11,22,48,0.35)]">
                      {item.children.map((c) => (
                        <Link
                          key={c.href + c.label}
                          href={c.href}
                          className="group/item flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-ink/85 transition hover:bg-navy-50 hover:text-navy-800"
                        >
                          {c.label}
                          <ArrowRight size={14} className="-translate-x-1 opacity-0 transition group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/apply" className="btn-primary hidden !py-2.5 sm:inline-flex">
              Apply Now <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setOpen((v) => !v)}
              className="grid h-11 w-11 place-items-center rounded-xl border border-line text-navy-800 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-[100px] overflow-y-auto bg-white px-4 pb-10 lg:hidden"
            data-lenis-prevent
          >
            <ul className="divide-y divide-line">
              {nav.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <div className="flex items-center justify-between">
                    <Link href={item.href} className="block py-4 text-lg font-semibold text-ink">
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        className="grid h-10 w-10 place-items-center"
                        onClick={() => setOpenSub(openSub === item.label ? null : item.label)}
                        aria-label={`Toggle ${item.label}`}
                      >
                        <ChevronDown className={`transition ${openSub === item.label ? "rotate-180" : ""}`} size={18} />
                      </button>
                    )}
                  </div>
                  <AnimatePresence initial={false}>
                    {item.children && openSub === item.label && (
                      <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                        <div className="grid grid-cols-2 gap-2 pb-4">
                          {item.children.map((c) => (
                            <Link key={c.href + c.label} href={c.href} className="rounded-lg bg-surface px-3 py-2 text-sm text-ink/80">
                              {c.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              ))}
            </ul>
            <Link href="/apply" className="btn-primary mt-6 w-full">
              Apply Now <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
