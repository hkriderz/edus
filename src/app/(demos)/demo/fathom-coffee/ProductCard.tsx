import Link from "next/link";
import { formatCents, type Product } from "./data";

/**
 * Product tile. There is no photography anywhere in these demos, so the colour
 * field is derived from the roast itself and the tasting notes do the work a
 * photo normally would.
 */
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col border border-line bg-surface">
      <Link
        href={`/demo/fathom-coffee/shop/${product.slug}/`}
        className="flex flex-1 flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span
          aria-hidden="true"
          className="relative flex aspect-[4/3] items-end justify-start overflow-hidden p-6"
          style={{ background: product.hue }}
        >
          <span
            className="font-display text-[clamp(2rem,4vw,3rem)] leading-none"
            style={{ color: "oklch(97% 0.01 86)" }}
          >
            {product.name}
          </span>
        </span>

        <span className="flex flex-1 flex-col p-6">
          <span className="flex items-start justify-between gap-4">
            <span>
              <span className="block font-display text-lg leading-snug group-hover:text-accent">
                {product.name}
              </span>
              <span className="mt-1 block font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                {product.origin}
              </span>
            </span>
            <span className="shrink-0 font-mono text-sm">
              {formatCents(product.basePriceCents)}
              <span className="block text-right text-[0.625rem] text-ink-faint">250g</span>
            </span>
          </span>

          <span className="mt-5 flex-1 text-sm leading-relaxed text-ink-muted">
            {product.tastingNotes.join(" · ")}
          </span>

          <span className="mt-5 flex items-center gap-3 border-t border-line pt-4 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
            <span>{product.roast} roast</span>
            <span aria-hidden="true">/</span>
            <span>{product.process}</span>
          </span>
        </span>
      </Link>
    </article>
  );
}
