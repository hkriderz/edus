import { siteConfig, siteLocation, isPlaceholder, absoluteUrl } from "@/config/site";
import { priceRange } from "@/content/pricing";
import { services } from "@/content/services";

/**
 * Serialises a structured-data graph. `</script>` inside the JSON is escaped so
 * content can never break out of the script element.
 */
function JsonLdScript({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

/**
 * Organisation-level structured data. `priceRange` is derived from the published
 * pricing tiers rather than typed by hand, which is what went wrong on the
 * previous site: the JSON-LD advertised $2500-$3500 while the page said $1,200.
 */
export function OrganizationJsonLd() {
  const hasAddress = !isPlaceholder(siteConfig.address.city);

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": absoluteUrl("/#organization"),
        name: siteConfig.name,
        alternateName: siteConfig.shortName,
        slogan: siteConfig.tagline,
        description: siteConfig.description,
        url: siteConfig.url,
        priceRange,
        ...(isPlaceholder(siteConfig.email) ? {} : { email: siteConfig.email }),
        ...(isPlaceholder(siteConfig.phone) ? {} : { telephone: siteConfig.phone }),
        ...(hasAddress
          ? {
              address: {
                "@type": "PostalAddress",
                addressLocality: siteConfig.address.city,
                addressRegion: siteConfig.address.region,
                addressCountry: siteConfig.address.country,
              },
              areaServed: { "@type": "Place", name: siteLocation },
            }
          : {}),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            opens: "09:00",
            closes: "18:00",
          },
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Saturday"],
            opens: "10:00",
            closes: "16:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Web design services",
          itemListElement: services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.summary,
              url: absoluteUrl(`/services/${service.slug}/`),
            },
          })),
        },
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        name: siteConfig.name,
        url: siteConfig.url,
        publisher: { "@id": absoluteUrl("/#organization") },
      }}
    />
  );
}

export function ServiceJsonLd({
  name,
  description,
  path,
  priceFrom,
}: {
  name: string;
  description: string;
  path: string;
  priceFrom: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Service",
        name,
        description,
        url: absoluteUrl(path),
        serviceType: name,
        provider: { "@id": absoluteUrl("/#organization") },
        offers: {
          "@type": "Offer",
          priceCurrency: "USD",
          // Strip formatting so the value is machine-readable.
          price: priceFrom.replace(/[^0-9.]/g, ""),
          availability: "https://schema.org/InStock",
        },
      }}
    />
  );
}

export function FaqJsonLd({ items }: { items: readonly { question: string; answer: string }[] }) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: items.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: readonly { name: string; path: string }[];
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}

export function CreativeWorkJsonLd({
  name,
  description,
  path,
  about,
}: {
  name: string;
  description: string;
  path: string;
  about: string;
}) {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name,
        description,
        url: absoluteUrl(path),
        about,
        creator: { "@id": absoluteUrl("/#organization") },
        // Explicit: these are demonstration builds, not client engagements.
        genre: "Web design demonstration build",
      }}
    />
  );
}
