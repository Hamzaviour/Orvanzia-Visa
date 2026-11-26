import Link from "next/link";
import { Plane } from "lucide-react";
import { countries, flag, shortName } from "@/lib/countries";

export default function FlagMarquee() {
  const list = countries.filter((c) => c.popular || c.visa === "Schengen Visa");
  const row = [...list, ...list];
  return (
    <section aria-label="Popular visa destinations" className="relative overflow-hidden border-y border-white/10 bg-navy-900 py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-navy-900 to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-navy-900 to-transparent sm:w-40" />
      <div className="group flex">
        <div className="animate-marquee flex w-max items-center group-hover:[animation-play-state:paused]">
          {row.map((c, i) => (
            <div key={c.code + i} className="flex shrink-0 items-center" aria-hidden={i >= list.length}>
              <Link
                href={`/destinations/${c.code}`}
                tabIndex={i >= list.length ? -1 : 0}
                className="group/f flex items-center gap-3 rounded-full py-1.5 pl-1.5 pr-4 transition duration-300 hover:bg-white/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flag(c.code, 80)}
                  alt=""
                  loading="lazy"
                  className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-white/25 transition duration-500 group-hover/f:scale-110 group-hover/f:ring-gold-400"
                />
                <span className="whitespace-nowrap text-[17px] font-semibold tracking-tight text-white transition group-hover/f:text-gold-400">
                  {shortName(c)}
                </span>
              </Link>
              <Plane size={13} className="mx-4 shrink-0 rotate-45 text-gold-500/70" aria-hidden />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
