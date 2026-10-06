import { ButtonLink } from "@/components/ui/Button";
import { pricingTiers } from "@/content/pricing";
import { cn } from "@/lib/cn";

export function PricingTable({ className }: { className?: string }) {
  return (
    <div
      className={cn("grid gap-px border border-line bg-line lg:grid-cols-3", className)}
      data-reveal-group
    >
      {pricingTiers.map((tier) => (
        <article
          key={tier.id}
          className={cn(
            "flex flex-col p-8 lg:p-10",
            tier.featured ? "bg-surface-invert text-ink-invert" : "bg-surface",
          )}
        >
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-display text-3xl font-medium tracking-[-0.02em]">{tier.name}</h3>
            {tier.featured ? (
              <span className="shrink-0 border border-accent bg-accent px-2.5 py-1 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-accent-contrast">
                Most chosen
              </span>
            ) : null}
          </div>

          <p
            className={cn(
              "mt-6 font-display text-[clamp(2.75rem,5vw,4rem)] font-semibold leading-none tracking-[-0.035em]",
              tier.featured && "text-accent",
            )}
          >
            {tier.price}
          </p>
          <p
            className={cn(
              "mt-3 font-mono text-[0.625rem] uppercase tracking-[0.16em]",
              tier.featured ? "text-ink-invert/55" : "text-ink-faint",
            )}
          >
            {tier.priceNote} &middot; {tier.timeline}
          </p>

          <p
            className={cn(
              "mt-7 text-sm leading-relaxed",
              tier.featured ? "text-ink-invert/80" : "text-ink-muted",
            )}
          >
            {tier.summary}
          </p>

          <p
            className={cn(
              "mt-6 border-t pt-6 text-xs leading-relaxed",
              tier.featured ? "border-ink-invert/20 text-ink-invert/65" : "border-line text-ink-faint",
            )}
          >
            <span className="font-mono uppercase tracking-[0.14em]">Best for</span>
            <br />
            {tier.bestFor}
          </p>

          <ul className="mt-7 flex-1 space-y-3">
            {tier.includes.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-relaxed">
                <span aria-hidden="true" className="mt-0.5 shrink-0 text-accent">
                  &#43;
                </span>
                <span className={tier.featured ? "text-ink-invert/85" : "text-ink-muted"}>
                  {item}
                </span>
              </li>
            ))}
          </ul>

          <ButtonLink
            href={`/contact/?tier=${tier.id}`}
            variant={tier.featured ? "primary" : "outline"}
            className="mt-10 w-full"
          >
            Start with {tier.name}
          </ButtonLink>
        </article>
      ))}
    </div>
  );
}
