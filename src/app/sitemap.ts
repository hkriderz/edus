import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/config/site";
import { services } from "@/content/services";
import { caseStudies } from "@/content/work";

/**
 * Generates /sitemap.xml at build time. Demo pages are included deliberately:
 * they are real, indexable pages that demonstrate the studio's work, and they
 * are each labelled as demonstration builds in their own markup.
 */
// Required under `output: "export"` — metadata routes default to dynamic.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticPages: { path: string; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
    { path: "/", priority: 1, changeFrequency: "monthly" },
    { path: "/work/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/services/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/pricing/", priority: 0.9, changeFrequency: "monthly" },
    { path: "/about/", priority: 0.7, changeFrequency: "yearly" },
    { path: "/contact/", priority: 0.8, changeFrequency: "yearly" },
    { path: "/sitemap/", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy-policy/", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms-of-service/", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),

    ...services.map((service) => ({
      url: absoluteUrl(`/services/${service.slug}/`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),

    ...caseStudies.map((study) => ({
      url: absoluteUrl(`/work/${study.slug}/`),
      lastModified,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),

    ...caseStudies.flatMap((study) =>
      study.demoPages
        .filter((page) => !page.href.startsWith("/archive/"))
        .map((page) => ({
          url: absoluteUrl(page.href),
          lastModified,
          changeFrequency: "yearly" as const,
          priority: 0.5,
        })),
    ),
  ];
}
