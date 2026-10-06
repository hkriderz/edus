import { buildMetadata } from "@/lib/metadata";
import { products } from "../data";
import { ProductCard } from "../ProductCard";

export const metadata = buildMetadata({
  title: "Shop all coffee — Fathom Coffee Roasters (EDUS demo)",
  description:
    "Six single origins and blends with roast level, process, altitude and tasting notes on every tile. A demonstration build by EDUS Media.",
  path: "/demo/fathom-coffee/shop/",
});

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-16 pb-28 sm:px-8">
      <header className="border-b border-line pb-10">
        <p className="eyebrow text-accent">{products.length} coffees &middot; All roasted to order</p>
        <h1 className="optical-left mt-6 text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98] tracking-[-0.03em]">
          Everything we roast.
        </h1>
        <p className="mt-7 max-w-[56ch] text-lg leading-relaxed text-ink-muted">
          Six is a deliberate number. We would rather know all of them properly than list thirty and
          guess. Each page carries the roast level, the process, the altitude and what we paid.
        </p>
      </header>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>

      <section className="mt-16 border border-line bg-surface-raised p-8 sm:p-12">
        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.05] tracking-[-0.025em]">
          Not sure which one?
        </h2>
        <p className="mt-6 max-w-[54ch] leading-relaxed text-ink-muted">
          Tell us how you brew and roughly what you drink now, and we will pick for you. If we get it
          wrong, the next bag is on us &mdash; that is not a marketing line, it has cost us nine bags
          this year and we still think it is the right policy.
        </p>

        <dl className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { term: "Espresso machine", detail: "Ardent, then Blue Batak" },
            { term: "V60 or Chemex", detail: "Cordillera, then Kirinyaga AB" },
            { term: "Cafetière", detail: "Blue Batak, then Kayanza Honey" },
            { term: "Drip machine", detail: "Ardent, then Kayanza Honey" },
          ].map((row) => (
            <div key={row.term} className="border-t border-line-strong pt-5">
              <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                {row.term}
              </dt>
              <dd className="mt-2.5 font-display text-lg leading-snug">{row.detail}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
