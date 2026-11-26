import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Reveal } from "./motion";

export default function PageHero({
  eyebrow,
  title,
  text,
  crumbs = [],
  image,
  children,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  crumbs?: { label: string; href?: string }[];
  image?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-900 py-20 text-white md:py-28">
      {image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      ) : (
        <div className="plane-pattern absolute inset-0 -z-20 opacity-60 invert" />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950/95 via-navy-900/85 to-navy-900/50" />
      <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-gold-500/20 blur-3xl" />
      <div className="container-x">
        <Reveal>
          <nav className="flex flex-wrap items-center gap-1.5 text-sm text-white/60" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight size={14} />
                {c.href ? (
                  <Link href={c.href} className="hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-gold-400">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        </Reveal>
        <Reveal delay={0.05}>
          <span className="eyebrow mt-6 !text-gold-400">{eyebrow}</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-6xl">{title}</h1>
        </Reveal>
        {text && (
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-2xl text-lg text-white/75">{text}</p>
          </Reveal>
        )}
        {children && <Reveal delay={0.25}>{children}</Reveal>}
      </div>
    </section>
  );
}
