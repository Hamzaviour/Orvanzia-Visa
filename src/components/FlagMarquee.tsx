import Link from "next/link";
import { countries, flag, shortName, type Country } from "@/lib/countries";

function Row({ list, reverse = false }: { list: Country[]; reverse?: boolean }) {
  const row = [...list, ...list];
  return (
    <div className="group flex overflow-hidden">
      <div className={`flex w-max gap-5 ${reverse ? "animate-marquee-rev" : "animate-marquee"} group-hover:[animation-play-state:paused]`}>
        {row.map((c, i) => (
          <Link
            key={c.code + i}
            href={`/destinations/${c.code}`}
            tabIndex={i >= list.length ? -1 : 0}
            aria-hidden={i >= list.length}
            className="group/f flex shrink-0 items-center gap-4 rounded-2xl border border-line bg-white py-3 pl-3 pr-7 shadow-[0_10px_30px_-20px_rgba(12,31,92,0.45)] transition duration-300 hover:-translate-y-1 hover:border-gold-500 hover:shadow-[0_20px_40px_-20px_rgba(201,161,59,0.7)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flag(c.code, 160)}
              alt=""
              loading="lazy"
              className="h-12 w-[72px] shrink-0 rounded-lg object-cover shadow-md ring-1 ring-black/10 transition duration-500 group-hover/f:scale-110 sm:h-14 sm:w-[84px]"
            />
            <span>
              <span className="block whitespace-nowrap text-xl font-bold text-ink sm:text-2xl">{shortName(c)}</span>
              <span className="block whitespace-nowrap text-[11px] font-semibold uppercase tracking-wider text-gold-600">{c.visa}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function FlagMarquee() {
  const pool = countries.filter((c) => c.popular || c.visa === "Schengen Visa");
  const a = pool.filter((_, i) => i % 2 === 0);
  const b = pool.filter((_, i) => i % 2 === 1);
  return (
    <section aria-label="Popular visa destinations" className="relative overflow-hidden bg-surface py-12">
      <p className="mb-8 text-center text-sm font-semibold uppercase tracking-[0.2em] text-muted">
        Visa support for <span className="text-navy-700">196 destinations</span> worldwide
      </p>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent sm:w-48" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent sm:w-48" />
      <div className="space-y-5">
        <Row list={a} />
        <Row list={b} reverse />
      </div>
    </section>
  );
}
