"use client";

import { useState } from "react";
import { useCart } from "./CartContext";
import {
  bagSizes,
  formatCents,
  grinds,
  priceForSize,
  type BagSize,
  type Grind,
  type Product,
} from "./data";

const MAX_QUANTITY = 12;

/**
 * Grind, size and quantity selection with the price recalculating as the
 * shopper changes options — the detail that makes a static demo feel like a real
 * shop. Prices are computed from integer cents so the figure here always matches
 * the cart total exactly.
 */
export function VariantPicker({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [grind, setGrind] = useState<Grind>("Whole bean");
  const [size, setSize] = useState<BagSize>("250g");
  const [quantity, setQuantity] = useState(1);

  const unitCents = priceForSize(product, size);
  const totalCents = unitCents * quantity;

  return (
    <div className="border border-line bg-surface-raised p-7">
      <div className="flex items-baseline justify-between gap-5">
        <p className="font-display text-3xl leading-none" aria-live="polite">
          {formatCents(totalCents)}
        </p>
        <p className="font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
          {formatCents(unitCents)} per {size}
        </p>
      </div>

      <fieldset className="mt-8">
        <legend className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          Bag size
        </legend>
        <div role="radiogroup" aria-label="Bag size" className="mt-3.5 flex flex-wrap gap-2.5">
          {bagSizes.map((option) => {
            const isSelected = option === size;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSize(option)}
                className={
                  isSelected
                    ? "border border-accent bg-accent px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent-contrast"
                    : "border border-line px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors hover:border-line-strong"
                }
              >
                {option}
                <span className="sr-only">
                  , {formatCents(priceForSize(product, option))}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-7">
        <legend className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
          Grind
        </legend>
        <div role="radiogroup" aria-label="Grind" className="mt-3.5 flex flex-wrap gap-2.5">
          {grinds.map((option) => {
            const isSelected = option === grind;
            return (
              <button
                key={option}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setGrind(option)}
                className={
                  isSelected
                    ? "border border-accent bg-accent px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-accent-contrast"
                    : "border border-line px-4 py-2.5 font-mono text-[0.6875rem] uppercase tracking-[0.1em] transition-colors hover:border-line-strong"
                }
              >
                {option}
              </button>
            );
          })}
        </div>
        <p className="mt-3.5 text-xs leading-relaxed text-ink-faint">
          Ground coffee stales within days. Whole bean if you own a grinder, every time.
        </p>
      </fieldset>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        <div className="flex items-center border border-line">
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.max(1, current - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
            className="px-4 py-3 font-mono text-sm transition-colors hover:bg-surface-sunken disabled:opacity-40"
          >
            &minus;
          </button>
          <span className="min-w-11 border-x border-line px-3 py-3 text-center font-mono text-sm">
            <span className="sr-only">Quantity: </span>
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((current) => Math.min(MAX_QUANTITY, current + 1))}
            disabled={quantity >= MAX_QUANTITY}
            aria-label="Increase quantity"
            className="px-4 py-3 font-mono text-sm transition-colors hover:bg-surface-sunken disabled:opacity-40"
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={() => addItem(product.slug, grind, size, quantity)}
          className="flex-1 bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          Add to bag &mdash; {formatCents(totalCents)}
        </button>
      </div>

      <p className="mt-5 text-xs leading-relaxed text-ink-faint">
        Roasted on the next roast day and dispatched the same afternoon.
      </p>
    </div>
  );
}
