import type { MetadataRoute } from "next";
import { countries } from "@/lib/countries";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/destinations", "/services", "/about", "/contact", "/apply", "/faq", "/visa-guidance", "/privacy-policy", "/terms", "/refund-policy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, priority: p === "" ? 1 : 0.7 })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, priority: 0.8 })),
    ...countries.map((c) => ({ url: `${site.url}/destinations/${c.code}`, priority: c.popular ? 0.8 : 0.6 })),
  ];
}
