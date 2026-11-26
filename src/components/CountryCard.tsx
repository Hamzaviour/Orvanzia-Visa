"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Clock3 } from "lucide-react";
import { type Country, flag, photo } from "@/lib/countries";

const badgeColor: Record<string, string> = {
  "Schengen Visa": "bg-navy-800 text-white",
  "e-Visa": "bg-emerald-600 text-white",
  ETA: "bg-sky-600 text-white",
  "Visa on Arrival": "bg-gold-500 text-navy-950",
  "Embassy Visa": "bg-white text-navy-900",
};

function getByDate(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}

export default function CountryCard({ c, priority = false }: { c: Country; priority?: boolean }) {
  return (
    <motion.div layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.4 }}>
      <Link
        href={`/destinations/${c.code}`}
        data-cursor="View"
        className="group relative block overflow-hidden rounded-3xl bg-navy-900 shadow-[0_18px_40px_-24px_rgba(6,18,53,0.7)] ring-1 ring-black/5"
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo(c, 500)}
            alt={`${c.capital || c.name}, ${c.name}`}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition duration-[1.2s] ease-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/30 to-transparent" />

          <div className="absolute left-4 right-4 top-4 flex items-start justify-between">
            <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow ${badgeColor[c.visa]}`}>{c.visa}</span>
            <span className="grid h-9 w-9 -translate-y-1 place-items-center rounded-full bg-white/90 text-navy-900 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <ArrowUpRight size={17} />
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <div className="flex items-center gap-2.5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={flag(c.code, 40)} alt="" className="h-[18px] w-[26px] rounded-[3px] object-cover ring-1 ring-white/40" />
              <h3 className="text-xl font-bold text-white">{c.name}</h3>
            </div>
            <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/10 px-3.5 py-2.5 text-white backdrop-blur-md">
              <span className="flex items-center gap-1.5 text-[13px]">
                <Clock3 size={14} className="text-gold-400" />
                Get by{" "}
                <b className="font-semibold" suppressHydrationWarning>
                  {getByDate(c.processingDays)}
                </b>
              </span>
              <span className="text-[13px] text-white/80">
                from <b className="text-base font-bold text-gold-400">£{c.serviceFrom}</b>
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
