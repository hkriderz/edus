import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { primaryNav } from "@/config/navigation";
import { faqs } from "@/content/faq";
import { priceRange, pricingTiers } from "@/content/pricing";
import { serviceSlugs, services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { caseStudies, getAdjacentCaseStudies, getCaseStudy, screenshotPaths } from "@/content/work";

describe("content-module invariants", () => {
  it("gives every service a unique slug and sequential index", () => {
    const slugs = services.map((service) => service.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(serviceSlugs).toEqual(slugs);
    expect(services.map((service) => service.index)).toEqual(["01", "02", "03", "04"]);
  });

  it("keeps service slugs aligned with the navigation children", () => {
    const servicesLink = primaryNav.find((link) => link.href === "/services/");
    const navSlugs = (servicesLink?.children ?? []).map((child) =>
      child.href.replace("/services/", "").replace(/\/$/, ""),
    );
    expect(navSlugs).toEqual(serviceSlugs);
  });

  it("publishes exactly one featured pricing tier and a derived price range", () => {
    const featured = pricingTiers.filter((tier) => tier.featured);
    expect(featured).toHaveLength(1);
    expect(featured[0]?.id).toBe("studio");

    const values = pricingTiers.map((tier) => tier.priceValue);
    expect(priceRange).toBe(
      `$${Math.min(...values).toLocaleString("en-US")}-$${Math.max(...values).toLocaleString("en-US")}`,
    );
    expect(priceRange).toBe("$1,200-$2,200");
  });

  it("ships six portfolio projects with complete routes", () => {
    expect(caseStudies).toHaveLength(6);
    expect(caseStudies.map((study) => study.slug)).toEqual([
      "verde-and-vine",
      "northside-barbell",
      "rosalia",
      "meridian-dental",
      "fathom-coffee",
      "near-me-web-designs",
    ]);

    for (const study of caseStudies) {
      expect(study.demoPages.length).toBeGreaterThanOrEqual(3);
      if (study.slug === "near-me-web-designs") {
        expect(study.demoHref).toBe("/archive/near-me-web-designs/");
      } else {
        expect(study.demoHref).toBe(`/demo/${study.slug}/`);
      }
      expect(study.brief.length).toBeGreaterThan(0);
      expect(study.approach).toHaveLength(3);
      expect(study.palette.length).toBeGreaterThanOrEqual(3);
      expect(getCaseStudy(study.slug)).toBe(study);

      const adjacent = getAdjacentCaseStudies(study.slug);
      expect(adjacent.previous).toBeDefined();
      expect(adjacent.next).toBeDefined();
    }
  });

  it("points every case study at raster screenshots that exist on disk", () => {
    for (const study of caseStudies) {
      const paths = screenshotPaths(study.slug);
      expect(paths.home).toBe(`/work/${study.slug}/home.png`);
      expect(paths.detail).toBe(`/work/${study.slug}/detail.png`);

      expect(existsSync(resolve(process.cwd(), "public", paths.home.slice(1)))).toBe(true);
      expect(existsSync(resolve(process.cwd(), "public", paths.detail.slice(1)))).toBe(true);
    }
  });

  it("keeps FAQ questions and testimonial ids unique", () => {
    const questions = faqs.map((item) => item.question);
    expect(new Set(questions).size).toBe(questions.length);

    const ids = testimonials.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
