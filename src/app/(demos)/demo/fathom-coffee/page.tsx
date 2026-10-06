import Link from "next/link";
import { buildMetadata } from "@/lib/metadata";
import { products, subscriptionCadences } from "./data";
import { ProductCard } from "./ProductCard";

export const metadata = buildMetadata({
  title: "Fathom Coffee Roasters (EDUS demo)",
  description:
    "A specialty coffee roastery with a working client-side cart, variant pricing and published sourcing. A demonstration build by EDUS Media.",
  path: "/demo/fathom-coffee/",
});

const featured = products.slice(0, 3);

export default function FathomHomePage() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">Rancho Cucamonga &middot; Since 2016</p>
            <h1 className="optical-left mt-7 text-[clamp(3rem,8.5vw,6.5rem)] font-normal leading-[0.92] tracking-[-0.03em]">
              Coffee worth
              <br />
              the <span className="italic text-accent">fathom</span>.
            </h1>
            <p className="mt-9 max-w-[52ch] text-lg leading-relaxed text-ink-muted">
              Six coffees, roasted twice a week in small batches. We publish what we paid the
              producer for every lot, and if a bag is wrong for how you brew we would rather tell you
              before you buy it than after.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-4">
              <Link
                href="/demo/fathom-coffee/shop/"
                className="bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-accent-contrast transition-colors hover:bg-accent-hover"
              >
                Shop the coffee
              </Link>
              <Link
                href="/demo/fathom-coffee/shop/ardent-house-blend/"
                className="border border-line-strong px-7 py-3.5 font-mono text-xs uppercase tracking-[0.12em] transition-colors hover:border-accent hover:text-accent"
              >
                Start with Ardent
              </Link>
            </div>
          </div>

          {/* Specification panel instead of a hero photograph: the information a
              returning customer actually scans for. */}
          <aside className="lg:col-span-5">
            <div className="border border-line bg-surface-raised p-7">
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                This week&rsquo;s roast
              </h2>
              <dl className="mt-6 divide-y divide-line">
                {[
                  { term: "Roasting", detail: "Tuesday & Friday, 06:00" },
                  { term: "Dispatch", detail: "Same day, before 15:00" },
                  { term: "Freshest lot", detail: "Cordillera, Huila — landed 9 days ago" },
                  { term: "Low stock", detail: "Kirinyaga AB — 14 bags left" },
                  { term: "Free shipping", detail: "Orders over $35" },
                ].map((row) => (
                  <div key={row.term} className="flex justify-between gap-5 py-3.5">
                    <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                      {row.term}
                    </dt>
                    <dd className="text-right text-sm">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.02] tracking-[-0.025em]">
              Start here.
            </h2>
            <Link
              href="/demo/fathom-coffee/shop/"
              className="link-underline font-mono text-xs uppercase tracking-[0.12em] text-ink-muted"
            >
              All {products.length} coffees
            </Link>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-surface-sunken">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.02] tracking-[-0.025em]">
              Subscribe and
              <br />
              stop thinking
              <br />
              about it.
            </h2>
            <p className="mt-7 max-w-[46ch] leading-relaxed text-ink-muted">
              Pick a coffee and a cadence. Skip, pause, swap or cancel from any email we send you
              &mdash; no account, no phone call, no retention offer.
            </p>
          </div>

          <ul className="grid gap-5 lg:col-span-7 sm:grid-cols-3">
            {subscriptionCadences.map((cadence) => (
              <li key={cadence.value} className="border border-line bg-surface p-6">
                <p className="font-display text-xl leading-snug">{cadence.label}</p>
                <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-accent">
                  {cadence.discount}
                </p>
                <p className="mt-5 text-sm leading-relaxed text-ink-muted">
                  Dispatched the first roast day after your renewal, so it never sits in a warehouse.
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <h2 className="text-[clamp(2rem,5vw,3.25rem)] leading-[1.02] tracking-[-0.025em]">
            What we will tell you
            <br />
            that others will not.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                heading: "What we paid",
                body: "Every product page lists the farmgate price we paid and the Fairtrade floor it sits above. Usually by a wide margin, occasionally by less than we would like, and we say which.",
              },
              {
                heading: "When it is the wrong coffee",
                body: "Cordillera is thin as espresso. Kirinyaga divides people. Blue Batak will disappoint you if you want fruit. All of that is on the page, not buried in an FAQ.",
              },
              {
                heading: "How old it is",
                body: "Roast date on the bag, landed date on the site. We do not sell anything roasted more than fourteen days ago; it goes to the café instead.",
              },
            ].map((item) => (
              <article key={item.heading} className="border-t border-line-strong pt-6">
                <h3 className="font-display text-xl leading-snug">{item.heading}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
