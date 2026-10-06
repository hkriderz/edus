import { BentoCell, BentoGrid } from "@/components/ui/BentoGrid";
import { Section, SectionHeading } from "@/components/ui/Section";
import { carePlans } from "@/content/pricing";

const firstResponse = carePlans[0]?.firstResponse ?? "4 business hours";

/**
 * The three claims in the studio's positioning, each paired with the mechanism
 * that makes it true. A promise without a mechanism is just copy.
 */
export function StudioPromises() {
  return (
    <Section eyebrow="01 — Why EDUS exists" width="wide">
      <SectionHeading
        title={
          <>
            Three promises, and the
            <br />
            <span className="text-accent">mechanism</span> behind each one.
          </>
        }
        lead="Every studio says it is affordable and supportive. Here is specifically how we make that true, and what we gave up to do it."
      />

      <BentoGrid className="mt-16 border border-line">
        <BentoCell span="hero" tone="invert">
          <p className="eyebrow mb-6 !text-ink-invert/60">Studio quality</p>
          <h3 className="text-title">
            Designed in the browser, built by hand, no page builder anywhere.
          </h3>
          <p className="mt-6 max-w-[52ch] text-sm leading-relaxed text-ink-invert/75">
            Every site is custom markup and CSS on a modern framework. That means it loads in under a
            second on a phone on cellular, it passes an accessibility audit, and nothing on the page
            exists because a template put it there.
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {[
              "Core Web Vitals green at launch",
              "WCAG 2.2 AA pass before handover",
              "Semantic HTML, keyboard operable",
              "No licence fees to keep it online",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-invert/70"
              >
                <span aria-hidden="true" className="text-accent">
                  &#47;&#47;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </BentoCell>

        <BentoCell span="third">
          <p className="eyebrow mb-6">Affordable, specifically</p>
          <h3 className="text-title">No office. No sales team. No account manager.</h3>
          <p className="mt-6 text-sm leading-relaxed text-ink-muted">
            You talk to the person building your site. Removing the layers an agency bills for is
            most of the difference &mdash; reusing a mature internal design system is the rest.
          </p>
          <p className="mt-auto pt-8 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent">
            Prices published on the pricing page
          </p>
        </BentoCell>

        <BentoCell span="third" tone="accent">
          <p className="eyebrow mb-6 !text-accent-contrast/70">Guaranteed support</p>
          <h3 className="text-title">{firstResponse}, written into the agreement.</h3>
          <p className="mt-6 text-sm leading-relaxed text-accent-contrast/85">
            Not a target, not a ticket queue. If we miss the committed response time, that month of
            care is free. A guarantee only means something when failing costs us.
          </p>
          <p className="mt-auto pt-8 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-accent-contrast/70">
            One hour for a site that is down
          </p>
        </BentoCell>

        <BentoCell span="hero">
          <p className="eyebrow mb-6">Community focused</p>
          <h3 className="text-title">
            We scope down to your budget instead of up to our invoice.
          </h3>
          <p className="mt-6 max-w-[58ch] text-sm leading-relaxed text-ink-muted">
            If a three-day fix to your existing site is the honest answer, we will say so and take
            the smaller job. If you are a nonprofit or a first-year business, we will cut scope until
            the number works rather than talk you into financing. We would rather have a neighbour
            who recommends us for a decade than one good quarter.
          </p>
          <ul className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {[
              "Fixed quotes, re-quoted in writing if scope moves",
              "Payment split across three milestones",
              "You hold every credential from day one",
              "We help you migrate out if you ever leave",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-ink-muted"
              >
                <span aria-hidden="true" className="text-accent">
                  &#47;&#47;
                </span>
                {item}
              </li>
            ))}
          </ul>
        </BentoCell>
      </BentoGrid>
    </Section>
  );
}
