import Link from "next/link";
import { PageHeader } from "@/components/layout/PageHeader";
import { Container } from "@/components/ui/Container";
import { caseStudies } from "@/content/work";
import { services } from "@/content/services";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Sitemap",
  description:
    `Every page on the EDUS Media website, including all ${caseStudies.length} builds and their individual pages.`,
  path: "/sitemap/",
});

type Group = { heading: string; links: readonly { label: string; href: string }[] };

const groups: readonly Group[] = [
  {
    heading: "Main pages",
    links: [
      { label: "Home", href: "/" },
      { label: "Work", href: "/work/" },
      { label: "Services", href: "/services/" },
      { label: "Pricing", href: "/pricing/" },
      { label: "About", href: "/about/" },
      { label: "Contact", href: "/contact/" },
    ],
  },
  {
    heading: "Services",
    links: services.map((service) => ({
      label: service.name,
      href: `/services/${service.slug}/`,
    })),
  },
  {
    heading: "Case studies",
    links: caseStudies.map((study) => ({
      label: study.brand,
      href: `/work/${study.slug}/`,
    })),
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy/" },
      { label: "Terms of Service", href: "/terms-of-service/" },
      { label: "Sitemap", href: "/sitemap/" },
    ],
  },
];

export default function SitemapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Sitemap"
        crumbs={[{ label: "Home", href: "/" }, { label: "Sitemap" }]}
        title="Every page, in one list."
        lead={`Including each page inside the ${caseStudies.length} builds, so you can jump straight into any of them.`}
      />

      <Container width="wide" className="pb-28">
        <div className="grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {groups.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="eyebrow mb-6">{group.heading}</h2>
              <ul className="space-y-3 border-t border-line pt-6">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline text-sm text-ink-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <h2 className="eyebrow mt-20 mb-6">Sites you can open</h2>
        <div className="grid gap-x-12 gap-y-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {caseStudies.map((study) => (
            <nav key={study.slug} aria-label={`${study.brand} demo`}>
              <h3 className="font-display text-lg font-medium tracking-[-0.02em]">{study.brand}</h3>
              <ul className="mt-4 space-y-2.5">
                {study.demoPages.map((page) => (
                  <li key={page.href}>
                    <Link
                      href={page.href}
                      className="link-underline text-sm text-ink-muted transition-colors hover:text-accent"
                    >
                      {page.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <p className="mt-20 border-t border-line pt-8 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          Machine-readable sitemap:{" "}
          <a href="/sitemap.xml" className="text-accent hover:underline">
            /sitemap.xml
          </a>
        </p>
      </Container>
    </>
  );
}
