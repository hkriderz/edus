import { Section, SectionHeading } from "@/components/ui/Section";
import { testimonials } from "@/content/testimonials";

/**
 * A static masonry-ish column layout rather than a carousel. The previous site
 * used a swipeable slider, which hid five of six quotes behind an interaction
 * and could not be read by anyone skimming on a desktop.
 */
export function Testimonials() {
  return (
    <Section eyebrow="06 — In their words" width="wide">
      <SectionHeading
        title={
          <>
            What clients actually
            <br />
            single out.
          </>
        }
        lead="Notably, almost nobody mentions the design. They mention knowing the price, getting a reply, and owning their own site."
      />

      <ul className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" data-reveal-group>
        {testimonials.map((testimonial) => (
          <li key={testimonial.id} className="flex flex-col bg-surface p-8 lg:p-10">
            <blockquote className="flex-1">
              <p className="font-display text-lg leading-relaxed sm:text-xl">
                <span aria-hidden="true" className="text-accent">
                  &ldquo;
                </span>
                {testimonial.quote}
                <span aria-hidden="true" className="text-accent">
                  &rdquo;
                </span>
              </p>
            </blockquote>
            <figcaption className="mt-8 flex items-center gap-4 border-t border-line pt-6">
              {/* Initials rather than a stock headshot. */}
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center border border-line-strong font-mono text-[0.6875rem] tracking-[0.08em]"
              >
                {testimonial.initials}
              </span>
              <span>
                <span className="block text-sm font-medium">{testimonial.name}</span>
                <span className="block font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                  {testimonial.role}
                </span>
              </span>
            </figcaption>
          </li>
        ))}
      </ul>
    </Section>
  );
}
