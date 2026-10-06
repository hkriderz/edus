import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { buildMetadata } from "@/lib/metadata";
import { getProduct, products } from "../../data";
import { ProductCard } from "../../ProductCard";
import { VariantPicker } from "../../VariantPicker";

type ProductPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return buildMetadata({
      title: "Coffee not found — Fathom Coffee Roasters (EDUS demo)",
      description: "This coffee is no longer listed.",
      path: "/demo/fathom-coffee/shop/",
    });
  }

  return buildMetadata({
    title: `${product.name}, ${product.origin} — Fathom Coffee Roasters (EDUS demo)`,
    description: `${product.tastingNotes.join(", ")}. ${product.roast} roast, ${product.process}. A demonstration build by EDUS Media.`,
    path: `/demo/fathom-coffee/shop/${product.slug}/`,
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) notFound();

  const alsoTry = products.filter((candidate) => candidate.slug !== product.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 pb-28 sm:px-8">
      <nav aria-label="Breadcrumb" className="font-mono text-[0.625rem] uppercase tracking-[0.12em]">
        <ol className="flex flex-wrap items-center gap-2.5 text-ink-faint">
          <li>
            <Link href="/demo/fathom-coffee/" className="hover:text-accent">
              Fathom
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/demo/fathom-coffee/shop/" className="hover:text-accent">
              Shop
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-ink">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <span
            aria-hidden="true"
            className="flex aspect-[5/4] items-end p-8 sm:p-12"
            style={{ background: product.hue }}
          >
            <span
              className="font-display text-[clamp(3rem,9vw,6rem)] leading-[0.9]"
              style={{ color: "oklch(97% 0.01 86)" }}
            >
              {product.name}
            </span>
          </span>

          <h1 className="optical-left mt-10 text-[clamp(2.25rem,5.5vw,3.75rem)] leading-[1] tracking-[-0.03em]">
            {product.name}
          </h1>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-accent">
            {product.origin} &middot; {product.producer}
          </p>

          <p className="mt-8 max-w-[58ch] text-lg leading-relaxed text-ink-muted">
            {product.description}
          </p>

          <h2 className="mt-12 font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
            Specification
          </h2>
          <dl className="mt-5 divide-y divide-line border-y border-line">
            {[
              { term: "Tasting notes", detail: product.tastingNotes.join(" · ") },
              { term: "Roast level", detail: product.roast },
              { term: "Process", detail: product.process },
              { term: "Varietal", detail: product.varietal },
              { term: "Altitude", detail: product.altitude },
            ].map((row) => (
              <div key={row.term} className="flex justify-between gap-6 py-4">
                <dt className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                  {row.term}
                </dt>
                <dd className="text-right text-sm">{row.detail}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-5">
          {/* Sticky on desktop so the price and the add button stay reachable
              while the shopper reads the origin story. */}
          <div className="lg:sticky lg:top-32">
            <VariantPicker product={product} />

            <div className="mt-6 border border-line p-7">
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                What we paid
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-ink-muted">
                We paid <span className="text-ink">$3.85 per pound</span> of green coffee for this
                lot, against a Fairtrade floor of $1.80 and a C-market price of $1.62 on the day of
                contract. The producer was paid in full before the container shipped.
              </p>
            </div>

            <div className="mt-6 border border-line p-7">
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                Brewing
              </h2>
              <dl className="mt-4 space-y-3 text-sm">
                {[
                  { term: "Filter", detail: "60 g/L, 94 °C, 3:00 total" },
                  { term: "Espresso", detail: "18 g in, 40 g out, 28 s" },
                  { term: "Cafetière", detail: "65 g/L, 95 °C, 4:00 then plunge" },
                ].map((row) => (
                  <div key={row.term} className="flex justify-between gap-5">
                    <dt className="text-ink-faint">{row.term}</dt>
                    <dd className="text-right">{row.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <h2 className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.05] tracking-[-0.025em]">
          Also worth a bag.
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {alsoTry.map((candidate) => (
            <ProductCard key={candidate.slug} product={candidate} />
          ))}
        </div>
      </section>
    </div>
  );
}
