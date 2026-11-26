"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { MapPin, ShieldCheck } from "lucide-react";
import { Counter } from "./motion";

type Pic = { src: string; alt: string; place: string };

const ease = [0.22, 1, 0.36, 1] as const;

function Photo({ p, className, y, delay = 0 }: { p: Pic; className: string; y: MotionValue<number>; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 40 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, ease, delay }}
      className={`group relative overflow-hidden rounded-[28px] shadow-[0_30px_60px_-30px_rgba(6,18,53,0.7)] ${className}`}
      data-cursor="Explore"
    >
      <motion.div style={{ y }} className="absolute -inset-y-10 inset-x-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover transition duration-[1.4s] group-hover:scale-110" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/70 via-transparent to-transparent" />
      <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
        <MapPin size={12} className="text-gold-400" /> {p.place}
      </span>
    </motion.div>
  );
}

export default function AboutCollage({ pics }: { pics: Pic[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const y2 = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-20, 20]);
  const colY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const [a, b, c, d] = pics;

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[600px] pb-10 pt-6">
      <div className="grid grid-cols-[1.15fr_1fr] gap-4">
        <div className="space-y-4">
          <Photo p={a} y={y1} className="h-[300px] sm:h-[380px]" />
          <Photo p={b} y={y3} className="h-[180px] sm:h-[220px]" delay={0.15} />
        </div>
        <motion.div style={{ y: colY }} className="space-y-4 pt-12">
          <Photo p={c} y={y2} className="h-[200px] sm:h-[240px]" delay={0.1} />
          <Photo p={d} y={y1} className="h-[240px] sm:h-[300px]" delay={0.25} />
        </motion.div>
      </div>

      {/* rotating badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.4 }}
        className="absolute left-1/2 top-1/2 z-10 grid h-32 w-32 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white shadow-2xl ring-8 ring-white/60 sm:h-36 sm:w-36"
      >
        <motion.svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" animate={{ rotate: 360 }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }}>
          <defs>
            <path id="circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
          </defs>
          <text className="fill-navy-800 text-[8.6px] font-bold uppercase tracking-[0.18em]">
            <textPath href="#circle">Your journey matters • Orvanzia Visa •</textPath>
          </text>
        </motion.svg>
        <Image src="/icons/icon-192.png" alt="" width={192} height={192} className="h-12 w-12 rounded-xl sm:h-14 sm:w-14" />
      </motion.div>

      {/* floating stat */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.5 }}
        className="animate-float absolute -left-2 bottom-0 z-10 rounded-2xl bg-navy-800 px-5 py-4 text-white shadow-2xl sm:-left-8"
      >
        <p className="text-3xl font-extrabold text-gold-400">
          <Counter to={196} />
        </p>
        <p className="text-xs uppercase tracking-wider text-white/75">Destinations covered</p>
      </motion.div>

      {/* floating chip */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease, delay: 0.6 }}
        className="absolute -right-2 top-0 z-10 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-2xl sm:-right-6"
        style={{ animation: "float-y 7s ease-in-out infinite 1s" }}
      >
        <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-100 text-gold-600">
          <ShieldCheck size={20} />
        </span>
        <span>
          <b className="block text-sm text-ink">Schengen specialists</b>
          <span className="text-xs text-muted">29 European countries</span>
        </span>
      </motion.div>
    </div>
  );
}
