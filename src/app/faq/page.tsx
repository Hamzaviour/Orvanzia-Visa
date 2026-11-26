import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Faq from "@/components/Faq";
import { Reveal } from "@/components/motion";
import { faqs } from "@/lib/services";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about visa assistance, processing times, documents and refusals.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title="Frequently Asked Questions" text="Quick answers about visa assistance and the application process." crumbs={[{ label: "FAQs" }]} />
      <section className="section">
        <div className="container-x max-w-3xl">
          <Reveal>
            <Faq items={faqs} />
          </Reveal>
          <Reveal delay={0.1} className="mt-12 rounded-3xl bg-navy-800 p-8 text-center text-white">
            <h2 className="text-2xl font-bold">Still have a question?</h2>
            <p className="mt-2 text-white/75">Our team is happy to help.</p>
            <Link href="/contact" className="btn-gold mt-6">
              Contact us <ArrowRight size={17} />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
