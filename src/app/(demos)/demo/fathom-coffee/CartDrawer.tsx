"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart, useCartLineDetails } from "./CartContext";

/**
 * Slide-over cart. Rendered in the demo layout so it is available on every
 * Fathom route, including the dedicated cart page.
 */
export function CartDrawer() {
  const { isDrawerOpen, closeDrawer, subtotalLabel, itemCount, setQuantity, removeItem } = useCart();
  const lines = useCartLineDetails();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Move focus into the panel on open so keyboard users are not stranded at the
  // bottom of the page behind the overlay.
  useEffect(() => {
    if (isDrawerOpen) closeButtonRef.current?.focus();
  }, [isDrawerOpen]);

  // Prevent the page behind the overlay from scrolling.
  useEffect(() => {
    if (!isDrawerOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        onClick={closeDrawer}
        aria-label="Close cart"
        className="absolute inset-0 bg-ink/40"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className="relative flex h-full w-full max-w-md flex-col border-l border-line bg-surface"
      >
        <header className="flex items-center justify-between border-b border-line px-6 py-5">
          <h2 id="cart-drawer-title" className="font-display text-xl">
            Your bag{itemCount > 0 ? ` (${itemCount})` : ""}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeDrawer}
            className="font-mono text-xs uppercase tracking-[0.1em] text-ink-muted transition-colors hover:text-accent"
          >
            Close
          </button>
        </header>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center">
            <p className="text-ink-muted">Nothing in the bag yet.</p>
            <Link
              href="/demo/fathom-coffee/shop/"
              onClick={closeDrawer}
              className="border border-line-strong px-5 py-2.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
            >
              Browse the coffee
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 divide-y divide-line overflow-y-auto">
              {lines.map((line) => (
                <li key={line.id} className="flex gap-4 px-6 py-5">
                  <span
                    aria-hidden="true"
                    className="h-16 w-16 shrink-0"
                    style={{ background: line.product.hue }}
                  />

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/demo/fathom-coffee/shop/${line.slug}/`}
                        onClick={closeDrawer}
                        className="font-display text-base leading-snug hover:text-accent"
                      >
                        {line.product.name}
                      </Link>
                      <p className="shrink-0 font-mono text-sm">{line.lineLabel}</p>
                    </div>

                    <p className="mt-1.5 font-mono text-xs uppercase tracking-[0.08em] text-ink-faint">
                      {line.size} &middot; {line.grind}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-4">
                      <div className="flex items-center border border-line">
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity - 1)}
                          aria-label={`Decrease quantity of ${line.product.name}`}
                          className="px-3 py-1.5 font-mono text-sm transition-colors hover:bg-surface-sunken"
                        >
                          &minus;
                        </button>
                        <span
                          aria-live="polite"
                          className="min-w-9 border-x border-line px-2 py-1.5 text-center font-mono text-sm"
                        >
                          {line.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => setQuantity(line.id, line.quantity + 1)}
                          aria-label={`Increase quantity of ${line.product.name}`}
                          className="px-3 py-1.5 font-mono text-sm transition-colors hover:bg-surface-sunken"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(line.id)}
                        className="font-mono text-xs uppercase tracking-[0.08em] text-ink-faint underline underline-offset-[3px] transition-colors hover:text-accent"
                      >
                        Remove
                        <span className="sr-only"> {line.product.name} from your bag</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="border-t border-line px-6 py-6">
              <div className="flex items-baseline justify-between">
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-muted">
                  Subtotal
                </p>
                <p className="font-display text-2xl">{subtotalLabel}</p>
              </div>
              <p className="mt-2.5 text-xs leading-relaxed text-ink-faint">
                Shipping is free over $35. Roasted and dispatched the next weekday.
              </p>
              <Link
                href="/demo/fathom-coffee/cart/"
                onClick={closeDrawer}
                className="mt-5 block bg-accent px-6 py-3.5 text-center font-mono text-xs uppercase tracking-[0.12em] text-accent-contrast transition-colors hover:bg-accent-hover"
              >
                View bag &amp; checkout
              </Link>
            </footer>
          </>
        )}
      </div>
    </div>
  );
}

/** Nav trigger that shows the live item count. */
export function CartButton() {
  const { itemCount, openDrawer } = useCart();

  return (
    <button
      type="button"
      onClick={openDrawer}
      className="border border-line-strong px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
    >
      Bag
      <span aria-hidden="true"> ({itemCount})</span>
      <span className="sr-only">
        , {itemCount} {itemCount === 1 ? "item" : "items"}
      </span>
    </button>
  );
}
