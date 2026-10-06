import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { services } from "@/content/services";

/**
 * Services as an editorial index: oversized numeral, name, price, each row a
 * full-width link. Reads like a table of contents rather than a card grid.
 */
export function ServicesList() {
  return (
    <Section eyebrow="03 — Services" width="wide" tone="sunken">
      <SectionHeading
        title={
          <>
            Four things we do,
            <br />
            and nothing we do badly.
          </>
        }
        lead="Each service page states what is included, what is deliberately not included, the starting price and the realistic timeline."
      />

      <ul className="mt-16 border-t border-line" data-reveal-group>
        {services.map((service) => (
          <li key={service.slug} className="border-b border-line">
            <Link
              href={`/services/${service.slug}/`}
              className="group grid grid-cols-1 items-baseline gap-4 py-8 transition-colors hover:bg-surface lg:grid-cols-12 lg:gap-8 lg:px-4"
            >
              <span className="font-mono text-xs tracking-[0.18em] text-ink-faint lg:col-span-1">
                {service.index}
              </span>

              <h3 className="font-display text-[clamp(1.75rem,3.4vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.025em] transition-colors group-hover:text-accent lg:col-span-5">
                {service.name}
              </h3>

              <p className="max-w-[46ch] text-sm leading-relaxed text-ink-muted lg:col-span-4">
                {service.summary}
              </p>

              <div className="lg:col-span-2 lg:text-right">
                <span className="block font-mono text-xs uppercase tracking-[0.14em]">
                  From {service.startingAt}
                </span>
                <span className="mt-1.5 block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                  {service.timeline}
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
