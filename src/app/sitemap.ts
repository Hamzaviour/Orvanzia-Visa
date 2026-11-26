import type { MetadataRoute } from "next";
import { countries } from "@/lib/countries";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number, MetadataRoute.Sitemap[number]["changeFrequency"]][] = [
    ["", 1, "weekly"],
    ["/destinations", 0.9, "weekly"],
    ["/services", 0.9, "monthly"],
    ["/apply", 0.8, "monthly"],
    ["/contact", 0.8, "monthly"],
    ["/about", 0.7, "monthly"],
    ["/faq", 0.7, "monthly"],
    ["/visa-guidance", 0.7, "monthly"],
    ["/privacy-policy", 0.3, "yearly"],
    ["/terms", 0.3, "yearly"],
    ["/refund-policy", 0.3, "yearly"],
  ];
  return [
    ...pages.map(([p, priority, changeFrequency]) => ({ url: `${site.url}${p}`, lastModified: now, changeFrequency, priority })),
    ...services.map((s) => ({ url: `${site.url}/services/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    ...countries.map((c) => ({
      url: `${site.url}/destinations/${c.code}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.popular ? 0.8 : 0.6,
    })),
  ];
}
