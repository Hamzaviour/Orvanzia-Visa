import { site } from "@/lib/site";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON; escape "<" so content can never close the script tag
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const orgId = `${site.url}/#organization`;

export const organizationLd = () => ({
  "@context": "https://schema.org",
  "@type": ["TravelAgency", "ProfessionalService"],
  "@id": orgId,
  name: site.name,
  url: site.url,
  logo: `${site.url}/logo-hd.png`,
  image: `${site.url}/opengraph-image.jpg`,
  email: site.email,
  telephone: site.phone,
  description:
    "Private visa consultancy helping UK residents apply for Schengen, USA, Canada and worldwide visas: eligibility checks, document checklists, application and appointment support.",
  areaServed: { "@type": "Country", name: "United Kingdom" },
  address: { "@type": "PostalAddress", addressCountry: "GB" },
  priceRange: "££",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: site.phone,
      email: site.email,
      areaServed: "GB",
      availableLanguage: ["English"],
    },
  ],
  sameAs: [`https://wa.me/${site.whatsapp}`],
});

export const websiteLd = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  publisher: { "@id": orgId },
  inLanguage: "en-GB",
  potentialAction: {
    "@type": "SearchAction",
    target: { "@type": "EntryPoint", urlTemplate: `${site.url}/destinations?q={search_term_string}` },
    "query-input": "required name=search_term_string",
  },
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", path: "/" }, ...items].map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: `${site.url}${it.path}`,
  })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const serviceLd = (name: string, description: string, path: string, extra: Record<string, unknown> = {}) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name,
  description,
  url: `${site.url}${path}`,
  serviceType: "Visa application assistance",
  provider: { "@id": orgId },
  areaServed: { "@type": "Country", name: "United Kingdom" },
  ...extra,
});
