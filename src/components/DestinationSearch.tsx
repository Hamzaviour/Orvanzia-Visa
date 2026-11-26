"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, MapPin, Search } from "lucide-react";
import { countries, flag } from "@/lib/countries";

export default function DestinationSearch({ variant = "hero" }: { variant?: "hero" | "page" }) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return countries.filter((c) => c.popular).slice(0, 6);
    return countries
      .filter((c) => c.name.toLowerCase().includes(s) || c.capital.toLowerCase().includes(s))
      .sort((a, b) => Number(!a.name.toLowerCase().startsWith(s)) - Number(!b.name.toLowerCase().startsWith(s)))
      .slice(0, 7);
  }, [q]);

  const go = (code?: string) => {
    const c = code || results[active]?.code;
    if (c) router.push(`/destinations/${c}`);
    else router.push(`/destinations?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="relative w-full">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          go();
        }}
        className={`flex items-center gap-2 rounded-2xl bg-white p-2 shadow-[0_20px_60px_-20px_rgba(6,18,53,0.6)] ring-1 ${
          focus ? "ring-gold-500" : "ring-black/5"
        } transition`}
      >
        <div className="flex flex-1 items-center gap-3 pl-3">
          <MapPin className="shrink-0 text-gold-600" size={20} />
          <div className="flex-1">
            {variant === "hero" && <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">Where are you going?</span>}
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setActive(0);
              }}
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 150)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, results.length - 1));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                }
              }}
              placeholder="Search 196 countries…"
              className="w-full bg-transparent text-[16px] font-semibold text-ink outline-none placeholder:font-medium placeholder:text-muted/70"
              aria-label="Search destination"
              role="combobox"
              aria-expanded={focus}
              aria-controls="dest-results"
            />
          </div>
        </div>
        <button type="submit" className="btn-primary !rounded-xl !px-5">
          <Search size={18} /> <span className="hidden sm:inline">Check visa</span>
        </button>
      </form>

      <AnimatePresence>
        {focus && results.length > 0 && (
          <motion.ul
            id="dest-results"
            role="listbox"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            data-lenis-prevent
            className="absolute inset-x-0 top-full z-50 mt-2 max-h-[min(300px,45vh)] overflow-y-auto overscroll-contain rounded-2xl border border-line bg-white p-2 text-left shadow-2xl"
          >
            {!q && <li className="sticky -top-2 z-10 -mx-2 -mt-2 bg-white px-5 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-muted">Popular destinations</li>}
            {results.map((c, i) => (
              <li key={c.code} role="option" aria-selected={i === active}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(c.code)}
                  className={`flex w-full min-w-0 items-center gap-3 rounded-xl px-3 py-2 text-left transition ${i === active ? "bg-navy-50" : ""}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={flag(c.code, 40)} alt="" className="h-5 w-7 shrink-0 rounded-sm object-cover shadow-sm" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink">{c.name}</span>
                    <span className="block truncate text-xs text-muted">
                      {c.visa} · ~{c.processingDays} days
                    </span>
                  </span>
                  <ArrowRight size={15} className="shrink-0 text-navy-600" />
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
