import Link from "next/link";
import { countries, flag } from "@/lib/countries";

export default function FlagMarquee() {
  const list = countries.filter((c) => c.popular || c.visa === "Schengen Visa").slice(0, 40);
  const row = [...list, ...list];
  return (
    <div className="relative overflow-hidden border-y border-line bg-white py-5">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-white to-transparent" />
      <div className="animate-marquee flex w-max gap-3">
        {row.map((c, i) => (
          <Link
            key={c.code + i}
            href={`/destinations/${c.code}`}
            className="flex items-center gap-2.5 rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink/80 transition hover:border-gold-500 hover:bg-gold-100"
            tabIndex={i >= list.length ? -1 : 0}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={flag(c.code, 40)} alt="" loading="lazy" className="h-4 w-6 rounded-sm object-cover" />
            {c.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
