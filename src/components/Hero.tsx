"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, BadgeCheck, CheckCircle2, Clock3, Globe2 } from "lucide-react";
import DestinationSearch from "./DestinationSearch";

const ease = [0.22, 1, 0.36, 1] as const;
const words = ["Fast,", "Clear", "&", "Stress-Free"];

export default function VideoSlide({ active = true }: { active?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only decode/play the video while this slide is active and the hero is on screen.
  useEffect(() => {
    const v = videoRef.current;
    const el = ref.current;
    if (!v || !el) return;
    let onScreen = true;
    const sync = () => {
      if (active && onScreen) v.play().catch(() => {});
      else v.pause();
    };
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      sync();
    });
    io.observe(el);
    sync();
    return () => io.disconnect();
  }, [active]);

  return (
    <section ref={ref} aria-hidden={!active} inert={!active} className="relative isolate flex min-h-[calc(100svh-112px)] items-center overflow-hidden bg-navy-950 [contain:paint]">
      {/* background video */}
      <div className="absolute inset-0 -z-20">
        <video
          ref={videoRef}
          className="h-full w-full -scale-x-100 object-cover object-[30%_center]"
          muted
          loop
          playsInline
          preload="metadata"
          poster="/video/hero-poster.webp"
          aria-hidden
        >
          <source src="/video/hero.webm" type="video/webm" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/90 via-navy-950/45 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-navy-950/50 to-transparent" />

      <div className="container-x relative grid items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-gold-400/40 bg-navy-950/40 px-4 py-1.5 text-[13px] font-semibold uppercase tracking-[0.14em] text-gold-400"
          >
            <Globe2 size={14} /> Your journey, our expertise
          </motion.span>

          <h2 className="mt-6 text-[42px] font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-[70px]">
            <span className="block overflow-hidden">
              {words.map((w, i) => (
                <motion.span
                  key={w}
                  className="mr-[0.25em] inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.08 }}
                >
                  {w}
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden">
              <motion.span
                className="inline-block bg-gradient-to-r from-gold-400 via-[#f3d98c] to-gold-500 bg-clip-text text-transparent"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease, delay: 0.5 }}
              >
                Visa Services
              </motion.span>
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.7 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-white/80"
          >
            From eligibility checks to document preparation and appointment support, Orvanzia Visa guides UK travellers through every
            step of the visa journey for 196 destinations.
          </motion.p>

          <motion.ul
            initial="h"
            animate="s"
            variants={{ h: {}, s: { transition: { staggerChildren: 0.1, delayChildren: 0.85 } } }}
            className="mt-7 flex flex-wrap gap-x-6 gap-y-3"
          >
            {["Expert Guidance", "Clear Process", "Dedicated Support"].map((t) => (
              <motion.li
                key={t}
                variants={{ h: { opacity: 0, x: -10 }, s: { opacity: 1, x: 0 } }}
                className="flex items-center gap-2 text-[15px] font-medium text-white"
              >
                <CheckCircle2 size={18} className="text-gold-400" /> {t}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 1 }}
            className="mt-9 flex flex-wrap gap-3"
          >
            <Link href="/apply" className="btn-gold">
              Apply for a Visa <ArrowRight size={17} />
            </Link>
            <Link href="/destinations" className="btn-ghost-light">
              Explore Destinations
            </Link>
          </motion.div>
        </div>

        {/* glass search card */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.6 }}
          className="relative z-20"
        >
          <div className="rounded-3xl border border-white/20 bg-navy-950/45 p-6 shadow-2xl sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">Check your visa</p>
            <h2 className="mt-2 text-2xl font-bold text-white">Where are you travelling to?</h2>
            <div className="mt-5">
              <DestinationSearch />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              {[
                { icon: Globe2, k: "196", v: "Destinations" },
                { icon: Clock3, k: "6", v: "Visa types" },
                { icon: BadgeCheck, k: "UK", v: "Based team" },
              ].map(({ icon: I, k, v }) => (
                <div key={v} className="rounded-2xl bg-white/10 px-2 py-3">
                  <I size={18} className="mx-auto text-gold-400" />
                  <p className="mt-1 text-lg font-bold text-white">{k}</p>
                  <p className="text-[11px] uppercase tracking-wide text-white/70">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-white/60 md:flex"
      >
        Scroll
        <span className="flex h-9 w-5 justify-center rounded-full border border-white/40 pt-1.5">
          <motion.span
            className="h-2 w-1 rounded-full bg-gold-400"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </span>
      </motion.div>
    </section>
  );
}
