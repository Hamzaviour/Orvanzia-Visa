"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, Plane } from "lucide-react";
import VideoSlide from "./Hero";

const ease = [0.22, 1, 0.36, 1] as const;
const DURATIONS = [9000, 7000]; // ms per slide: video, branded image

const landmarks = [
  { src: "/hero/big-ben.jpg", label: "London", cls: "left-[4%] top-[18%] h-[58%] w-[24%] z-20", d: 0.1 },
  { src: "/hero/eiffel-tower.jpg", label: "Paris", cls: "left-[24%] top-[4%] h-[46%] w-[30%] z-10", d: 0.2 },
  { src: "/hero/burj-khalifa.jpg", label: "UAE", cls: "right-[2%] top-[8%] h-[40%] w-[34%] z-10", d: 0.3 },
  { src: "/hero/statue-of-liberty.jpg", label: "New York", cls: "right-[6%] top-[50%] h-[44%] w-[22%] z-20", d: 0.4 },
  { src: "/hero/colosseum.jpg", label: "Rome", cls: "left-[30%] top-[52%] h-[40%] w-[36%] z-30", d: 0.5 },
];

function BrandSlide({ active }: { active: boolean }) {
  return (
    <section
      aria-hidden={!active}
      inert={!active}
      className="relative isolate flex min-h-[calc(100svh-112px)] items-center overflow-hidden bg-gradient-to-br from-[#f4f8ff] via-[#e8f0ff] to-[#cfe0ff]"
    >
      {/* sky decoration */}
      <div className="plane-pattern absolute inset-0 -z-10 opacity-70" />
      <div className="absolute -right-40 -top-40 -z-10 h-[620px] w-[620px] rounded-full border border-navy-600/10" />
      <div className="absolute -right-20 -top-20 -z-10 h-[460px] w-[460px] rounded-full border border-gold-500/20" />
      <div className="absolute -left-32 bottom-0 -z-10 h-80 w-80 rounded-full bg-gold-400/15 blur-3xl" />

      <div className="container-x grid items-center gap-10 py-14 lg:grid-cols-[1fr_1.05fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
            className="eyebrow"
          >
            Your journey, our expertise
          </motion.span>
          <h2 className="mt-5 text-[40px] font-extrabold leading-[1.06] text-ink sm:text-6xl lg:text-[64px]">
            {["The World Is", "Waiting. We'll", "Handle the Visa."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  className={`inline-block ${i === 2 ? "text-navy-700" : ""}`}
                  initial={{ y: "110%" }}
                  animate={active ? { y: 0 } : { y: "110%" }}
                  transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.1 }}
                >
                  {i === 2 ? (
                    <>
                      Handle the <span className="text-gold-600">Visa.</span>
                    </>
                  ) : (
                    line
                  )}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease, delay: 0.55 }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75"
          >
            London to Paris, Dubai, New York and beyond. Orvanzia Visa makes your visa journey simple, clear and stress-free, wherever you
            are heading next.
          </motion.p>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={active ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-3"
          >
            {["Expert Guidance", "Clear Process", "Dedicated Support"].map((t) => (
              <li key={t} className="flex items-center gap-2 font-medium text-ink">
                <CheckCircle2 size={19} className="text-navy-700" /> {t}
              </li>
            ))}
          </motion.ul>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Link href="/apply" className="btn-primary">
              Apply for a Visa <ArrowRight size={17} />
            </Link>
            <Link href="/destinations" className="btn-outline">
              Check Eligibility
            </Link>
          </motion.div>
        </div>

        {/* landmark collage */}
        <div className="relative mx-auto aspect-[1.05] w-full max-w-[620px]">
          <div className="absolute inset-[6%] rounded-full border border-dashed border-navy-600/25" />
          {landmarks.map((l) => (
            <motion.div
              key={l.src}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={active ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.9, ease, delay: l.d }}
              className={`absolute overflow-hidden rounded-[22px] border-4 border-white shadow-[0_24px_50px_-20px_rgba(6,18,53,0.55)] ${l.cls}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.src} alt={l.label} className="h-full w-full object-cover" />
              <span className="absolute bottom-2 left-2 rounded-full bg-navy-900/70 px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur">
                {l.label}
              </span>
            </motion.div>
          ))}

          {/* branded passport */}
          <motion.div
            initial={{ opacity: 0, rotate: -20, x: -40 }}
            animate={active ? { opacity: 1, rotate: -8, x: 0 } : { opacity: 0, rotate: -20, x: -40 }}
            transition={{ duration: 1, ease, delay: 0.65 }}
            className="absolute -left-4 bottom-[-8%] z-40 w-[26%] sm:-left-10"
          >
            <div className="animate-float aspect-[0.7] rounded-xl bg-gradient-to-br from-navy-700 via-navy-800 to-navy-950 p-[8%] text-center shadow-[0_30px_60px_-20px_rgba(6,18,53,0.8)] ring-1 ring-gold-500/40">
              <p className="font-serif text-[clamp(9px,1.3vw,15px)] tracking-[0.2em] text-gold-400">PASSPORT</p>
              <div className="mx-auto mt-[12%] grid aspect-square w-[58%] place-items-center rounded-full border-2 border-gold-400/80">
                <Plane className="h-1/2 w-1/2 -rotate-45 text-gold-400" />
              </div>
              <p className="mt-[12%] text-[clamp(7px,0.9vw,11px)] font-bold tracking-[0.18em] text-gold-400">ORVANZIA VISA</p>
              <p className="mt-0.5 text-[clamp(6px,0.7vw,9px)] tracking-wide text-gold-400/70">Travel · Explore · Arrive</p>
            </div>
          </motion.div>

          {/* luggage tag with real logo */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.9, ease, delay: 0.8 }}
            className="absolute bottom-[-2%] right-[24%] z-40 flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 shadow-2xl ring-1 ring-black/5 backdrop-blur"
          >
            <Image src="/logo.png" alt="Orvanzia Visa" width={569} height={252} className="h-10 w-auto sm:h-12" />
            <span className="hidden border-l border-line pl-3 text-xs leading-tight text-muted sm:block">
              <b className="block text-sm text-ink">196 destinations</b>
              one trusted team
            </span>
          </motion.div>

          {/* flying plane */}
          <motion.div
            initial={{ x: -120, y: 60, opacity: 0 }}
            animate={active ? { x: 0, y: 0, opacity: 1 } : { x: -120, y: 60, opacity: 0 }}
            transition={{ duration: 2.2, ease: "easeOut", delay: 0.3 }}
            className="absolute -top-[4%] right-[30%] z-50"
          >
            <div className="relative">
              <span className="absolute right-6 top-1/2 h-[2px] w-28 -translate-y-1/2 bg-gradient-to-l from-white to-transparent" />
              <Plane className="h-10 w-10 rotate-12 fill-white text-navy-800 drop-shadow-lg" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HeroSlider() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);

  const go = useCallback((i: number) => {
    setSlide((i + DURATIONS.length) % DURATIONS.length);
    setProgressKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(slide + 1), DURATIONS[slide]);
    return () => clearTimeout(t);
  }, [slide, paused, go, progressKey]);

  return (
    <div
      ref={wrap}
      className="relative"
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setPaused(false);
      }}
      aria-roledescription="carousel"
      aria-label="Highlights"
    >
      <div className="grid">
        <motion.div
          className="[grid-area:1/1]"
          animate={{ opacity: slide === 0 ? 1 : 0, scale: slide === 0 ? 1 : 1.04 }}
          transition={{ duration: 1, ease }}
          style={{ pointerEvents: slide === 0 ? "auto" : "none", zIndex: slide === 0 ? 2 : 1 }}
        >
          <VideoSlide active={slide === 0} />
        </motion.div>
        <motion.div
          className="[grid-area:1/1]"
          initial={false}
          animate={{ opacity: slide === 1 ? 1 : 0, scale: slide === 1 ? 1 : 1.04 }}
          transition={{ duration: 1, ease }}
          style={{ pointerEvents: slide === 1 ? "auto" : "none", zIndex: slide === 1 ? 2 : 1 }}
        >
          <BrandSlide active={slide === 1} />
        </motion.div>
      </div>

      {/* controls */}
      <div className="container-x pointer-events-none absolute inset-x-0 bottom-6 z-30 flex items-center gap-3 [&>*]:pointer-events-auto">
        <button
          onClick={() => go(slide - 1)}
          aria-label="Previous slide"
          className={`grid h-10 w-10 place-items-center rounded-full border backdrop-blur transition hover:scale-110 ${
            slide === 0 ? "border-white/40 bg-white/10 text-white" : "border-navy-800/20 bg-white text-navy-800"
          }`}
        >
          <ChevronLeft size={18} />
        </button>
        <div className="flex gap-2">
          {DURATIONS.map((d, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={slide === i}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 ${i === slide ? "w-14" : "w-6"} ${
                slide === 0 ? "bg-white/30" : "bg-navy-800/15"
              }`}
            >
              <AnimatePresence>
                {i === slide && (
                  <motion.span
                    key={progressKey}
                    className="absolute inset-y-0 left-0 rounded-full bg-gold-500"
                    initial={{ width: "0%" }}
                    animate={{ width: paused ? undefined : "100%" }}
                    transition={{ duration: d / 1000, ease: "linear" }}
                  />
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
        <button
          onClick={() => go(slide + 1)}
          aria-label="Next slide"
          className={`grid h-10 w-10 place-items-center rounded-full border backdrop-blur transition hover:scale-110 ${
            slide === 0 ? "border-white/40 bg-white/10 text-white" : "border-navy-800/20 bg-white text-navy-800"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
