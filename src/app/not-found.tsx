import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DestinationSearch from "@/components/DestinationSearch";

export const metadata: Metadata = {
  title: "404 – Page Not Found",
  description: "The page you are looking for could not be found.",
  robots: { index: false, follow: true },
};

const links = [
  ["Explore all destinations", "/destinations"],
  ["Our visa services", "/services"],
  ["Apply for a visa", "/apply"],
  ["Contact us", "/contact"],
];

export default function NotFound() {
  return (
    <section className="section plane-pattern relative overflow-hidden">
      <div className="container-x max-w-2xl text-center">
        <p className="bg-gradient-to-b from-navy-800 to-navy-600 bg-clip-text text-[120px] font-extrabold leading-none text-transparent md:text-[180px]">
          4<span className="text-gold-500">0</span>4
        </p>
        <h1 className="mt-2 text-3xl font-bold md:text-4xl">This page took a different flight</h1>
        <p className="mt-3 text-muted">The page you&apos;re looking for doesn&apos;t exist or has moved. Try searching for your destination instead.</p>
        <div className="relative z-20 mx-auto mt-8 max-w-xl text-left">
          <DestinationSearch variant="page" />
        </div>
        <div className="mt-10 grid gap-3 sm:grid-cols-2">
          {links.map(([l, h]) => (
            <Link
              key={h}
              href={h}
              className="group flex items-center justify-between rounded-2xl border border-line bg-white px-5 py-4 font-semibold text-ink transition hover:border-navy-800 hover:bg-navy-800 hover:text-white"
            >
              {l} <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
        <Link href="/" className="btn-primary mt-10">
          Back to home
        </Link>
      </div>
    </section>
  );
}
