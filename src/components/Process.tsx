"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BadgeCheck, ClipboardList, FileCheck2, Send } from "lucide-react";

const steps = [
  { icon: ClipboardList, t: "Check Eligibility", d: "Tell us your destination, nationality and travel plans." },
  { icon: FileCheck2, t: "Prepare Documents", d: "We guide you through every document your application needs." },
  { icon: Send, t: "Submit Application", d: "Submit accurately and on time, with appointment support." },
  { icon: BadgeCheck, t: "Get Your Visa", d: "Receive your outcome and get ready for your journey." },
];

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative mt-16">
      <div className="absolute left-[12.5%] right-[12.5%] top-10 hidden h-[2px] bg-line lg:block">
        <motion.div style={{ width }} className="h-full bg-gradient-to-r from-navy-700 to-gold-500" />
      </div>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(({ icon: I, t, d }, i) => (
          <motion.div
            key={t}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="group relative text-center"
          >
            <div className="relative mx-auto grid h-20 w-20 place-items-center rounded-full border-4 border-white bg-navy-800 text-gold-400 shadow-[0_16px_40px_-16px_rgba(12,31,92,0.8)] transition duration-500 group-hover:-translate-y-1 group-hover:bg-gold-500 group-hover:text-navy-950">
              <I size={30} />
              <span className="absolute -right-1 -top-1 grid h-8 w-8 place-items-center rounded-full bg-gold-500 text-xs font-bold text-navy-950 ring-4 ring-white">
                0{i + 1}
              </span>
            </div>
            <h3 className="mt-6 text-xl font-bold text-ink">{t}</h3>
            <p className="mx-auto mt-2 max-w-[240px] text-[15px] leading-relaxed text-muted">{d}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
