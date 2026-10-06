import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { caseStudies } from "@/content/work";
import { pricingTiers } from "@/content/pricing";
import { siteLocation } from "@/config/site";
import { isPlaceholder, siteConfig } from "@/config/site";

/** Splits a headline into per-word spans so each word can react independently. */
function KineticHeadline({ text }: { text: string }) {
  return (
    <span className="kinetic">
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="kinetic-word">
          {word}
          {index < text.split(" ").length - 1 ? "\u00A0" : null}
        </span>
      ))}
    </span>
  );
}

const entryPrice = pricingTiers[0]?.price ?? "";

export function Hero() {
  const stats = [
    { value: String(caseStudies.length), label: "Live demo builds you can click through" },
    { value: entryPrice, label: "Starting price, published not quoted" },
    { value: "4 hrs", label: "Guaranteed first response, in writing" },
    { value: "100%", label: "You own the code, domain and accounts" },
  ];

  const hasLocation = !isPlaceholder(siteConfig.address.city);

  return (
    <section className="relative overflow-hidden pb-16 pt-14 sm:pt-20 lg:pb-24 lg:pt-28">
      {/* Faint structural grid, echoing the hard-ruled layout of the whole site. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, var(--line) 0px, var(--line) 1px, transparent 1px, transparent 12.5%)",
        }}
      />

      <Container width="wide" className="relative">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
          <span className="inline-flex items-center gap-2.5 border border-line-strong px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.16em]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            Taking projects for next month
          </span>
          {hasLocation ? <p className="eyebrow">{siteLocation} &amp; remote</p> : null}
        </div>

        <h1 className="mt-10 text-hero optical-left">
          <KineticHeadline text="Exceptional" />
          <br />
          <span className="text-accent">
            <KineticHeadline text="Designs" />
          </span>{" "}
          <span className="font-light italic">for&nbsp;Us</span>
        </h1>

        <div className="mt-12 grid gap-10 border-t border-line pt-10 lg:grid-cols-12">
          <p className="text-lead max-w-[46ch] text-ink-muted lg:col-span-6">
            EDUS Media is a community-focused web studio. We build the kind of site an agency
            charges five figures for, publish our prices so you never sit through a discovery call
            to learn the budget, and put our support response times in the contract.
          </p>

          <div className="lg:col-span-6 lg:pl-8">
            <p className="text-sm leading-relaxed text-ink-muted">
              Below are {caseStudies.length} complete sites we designed and built, each with its own
              typography, palette and voice. Not screenshots &mdash; working sites you can navigate.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/work/" size="lg">
                See the {caseStudies.length} builds
              </ButtonLink>
              <ButtonLink href="/pricing/" variant="outline" size="lg">
                What it costs
              </ButtonLink>
            </div>
          </div>
        </div>

        <dl
          className="mt-16 grid grid-cols-2 gap-px border border-line bg-line lg:grid-cols-4"
          data-reveal-group
        >
          {stats.map((stat) => (
            <div key={stat.label} className="bg-surface p-6 lg:p-8">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-[clamp(2.25rem,4vw,3.5rem)] font-semibold leading-none tracking-[-0.03em]">
                  {stat.value}
                </span>
                <span className="mt-4 block max-w-[24ch] text-xs leading-relaxed text-ink-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
