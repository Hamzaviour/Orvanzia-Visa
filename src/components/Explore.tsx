"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownUp, Search, SlidersHorizontal, X } from "lucide-react";
import { countries, regions, visaKinds } from "@/lib/countries";
import CountryCard from "./CountryCard";

const tabs = [
  { key: "all", label: "All" },
  { key: "popular", label: "Popular" },
  ...visaKinds.map((k) => ({ key: k, label: k })),
];

const PAGE = 24;

export default function Explore() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") || "");
  const [tab, setTab] = useState(params.get("type") || "popular");
  const [region, setRegion] = useState("All");
  const [sort, setSort] = useState<"name" | "fast" | "price">("name");
  const [limit, setLimit] = useState(PAGE);

  useEffect(() => {
    if (params.get("q")) setTab("all");
  }, [params]);

  useEffect(() => setLimit(PAGE), [q, tab, region, sort]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    let l = countries.filter((c) => {
      if (s && !c.name.toLowerCase().includes(s) && !c.capital.toLowerCase().includes(s)) return false;
      if (region !== "All" && c.region !== region) return false;
      if (tab === "popular") return s ? true : c.popular;
      if (tab !== "all" && c.visa !== tab) return false;
      return true;
    });
    l = [...l].sort((a, b) =>
      sort === "fast" ? a.processingDays - b.processingDays : sort === "price" ? a.serviceFrom - b.serviceFrom : a.name.localeCompare(b.name),
    );
    return l;
  }, [q, tab, region, sort]);

  const counts = useMemo(() => {
    const m: Record<string, number> = { all: countries.length, popular: countries.filter((c) => c.popular).length };
    for (const k of visaKinds) m[k] = countries.filter((c) => c.visa === k).length;
    return m;
  }, []);

  return (
    <div>
      {/* controls */}
      <div className="sticky top-16 z-30 -mx-4 border-b border-line bg-white/85 px-4 py-4 backdrop-blur-xl sm:mx-0 sm:rounded-2xl sm:border sm:px-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search a country or city…"
              className="field !rounded-full !pl-11 !pr-10"
              aria-label="Search destinations"
            />
            {q && (
              <button onClick={() => setQ("")} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted hover:bg-surface" aria-label="Clear">
                <X size={16} />
              </button>
            )}
          </div>
          <div className="flex gap-2">
            <label className="relative flex items-center">
              <SlidersHorizontal size={15} className="pointer-events-none absolute left-3.5 text-muted" />
              <select value={region} onChange={(e) => setRegion(e.target.value)} className="field !w-auto !rounded-full !py-2.5 !pl-9 text-sm" aria-label="Region">
                <option>All</option>
                {regions.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </label>
            <label className="relative flex items-center">
              <ArrowDownUp size={15} className="pointer-events-none absolute left-3.5 text-muted" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as typeof sort)}
                className="field !w-auto !rounded-full !py-2.5 !pl-9 text-sm"
                aria-label="Sort"
              >
                <option value="name">A – Z</option>
                <option value="fast">Fastest</option>
                <option value="price">Lowest price</option>
              </select>
            </label>
          </div>
        </div>
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${
                tab === t.key ? "text-white" : "bg-surface text-ink/75 hover:bg-navy-50"
              }`}
            >
              {tab === t.key && <motion.span layoutId="tab-pill" className="absolute inset-0 rounded-full bg-navy-800" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">
                {t.label} <span className={tab === t.key ? "text-gold-400" : "text-muted"}>{counts[t.key]}</span>
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        Showing <b className="text-ink">{Math.min(limit, list.length)}</b> of <b className="text-ink">{list.length}</b> destinations
      </p>

      <motion.div layout className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {list.slice(0, limit).map((c, i) => (
            <CountryCard key={c.code} c={c} priority={i < 8} />
          ))}
        </AnimatePresence>
      </motion.div>

      {list.length === 0 && (
        <div className="py-20 text-center">
          <p className="text-lg font-semibold text-ink">No destinations match your search.</p>
          <button
            onClick={() => {
              setQ("");
              setTab("all");
              setRegion("All");
            }}
            className="mt-3 text-navy-700 underline"
          >
            Reset filters
          </button>
        </div>
      )}

      {limit < list.length && (
        <div className="mt-10 text-center">
          <button onClick={() => setLimit((l) => l + PAGE)} className="btn-outline">
            Show more destinations
          </button>
        </div>
      )}
    </div>
  );
}
