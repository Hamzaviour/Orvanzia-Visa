import PageHero from "./PageHero";
import { site } from "@/lib/site";

export default function LegalPage({ title, sections }: { title: string; sections: { h: string; p: string[] }[] }) {
  return (
    <>
      <PageHero eyebrow="Resources" title={title} crumbs={[{ label: title }]} />
      <section className="section">
        <article className="container-x max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.h}>
              <h2 className="text-2xl font-bold">{s.h}</h2>
              {s.p.map((p) => (
                <p key={p} className="mt-3 leading-relaxed text-muted">
                  {p}
                </p>
              ))}
            </div>
          ))}
          <p className="rounded-2xl bg-surface p-5 text-sm text-muted">
            Questions about this page? Email{" "}
            <a className="font-semibold text-navy-700" href={`mailto:${site.email}`}>
              {site.email}
            </a>
            .
          </p>
        </article>
      </section>
    </>
  );
}
