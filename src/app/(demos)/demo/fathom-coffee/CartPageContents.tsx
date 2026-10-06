"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, useCartLineDetails } from "./CartContext";
import { formatCents } from "./data";

const FREE_SHIPPING_THRESHOLD_CENTS = 3500;
const SHIPPING_CENTS = 650;

/**
 * Full cart view. Shares state with the drawer through CartProvider, so the
 * figures here are the same reducer-derived numbers, not a second calculation.
 */
export function CartPageContents() {
  const { subtotalCents, itemCount, setQuantity, removeItem, clearCart } = useCart();
  const lines = useCartLineDetails();
  const [checkoutAttempted, setCheckoutAttempted] = useState(false);

  const qualifiesForFreeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;
  const shippingCents = qualifiesForFreeShipping ? 0 : SHIPPING_CENTS;
  const remainingCents = Math.max(0, FREE_SHIPPING_THRESHOLD_CENTS - subtotalCents);
  const totalCents = subtotalCents + shippingCents;

  if (lines.length === 0) {
    return (
      <div className="border border-line bg-surface-raised px-8 py-20 text-center">
        <p className="font-display text-2xl">Your bag is empty.</p>
        <p className="mx-auto mt-5 max-w-[42ch] leading-relaxed text-ink-muted">
          Add a coffee from the shop and it will appear here. Everything is stored in your browser for
          this visit only.
        </p>
        <Link
          href="/demo/fathom-coffee/shop/"
          className="mt-9 inline-block bg-accent px-7 py-3.5 font-mono text-xs uppercase tracking-[0.12em] text-accent-contrast transition-colors hover:bg-accent-hover"
        >
          Shop the coffee
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-7">
        <ul className="divide-y divide-line border-y border-line">
          {lines.map((line) => (
            <li key={line.id} className="flex gap-5 py-7">
              <span
                aria-hidden="true"
                className="h-24 w-24 shrink-0"
                style={{ background: line.product.hue }}
              />

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <Link
                      href={`/demo/fathom-coffee/shop/${line.slug}/`}
                      className="font-display text-xl leading-snug hover:text-accent"
                    >
                      {line.product.name}
                    </Link>
                    <p className="mt-1.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-ink-faint">
                      {line.product.origin} &middot; {line.size} &middot; {line.grind}
                    </p>
                  </div>
                  <p className="font-mono text-base">{line.lineLabel}</p>
                </div>

                <div className="mt-6 flex flex-wrap items-center gap-5">
                  <div className="flex items-center border border-line">
                    <button
                      type="button"
                      onClick={() => setQuantity(line.id, line.quantity - 1)}
                      aria-label={`Decrease quantity of ${line.product.name}`}
                      className="px-3.5 py-2 font-mono text-sm transition-colors hover:bg-surface-sunken"
                    >
                      &minus;
                    </button>
                    <span className="min-w-10 border-x border-line px-2 py-2 text-center font-mono text-sm">
                      <span className="sr-only">Quantity: </span>
                      {line.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(line.id, line.quantity + 1)}
                      aria-label={`Increase quantity of ${line.product.name}`}
                      className="px-3.5 py-2 font-mono text-sm transition-colors hover:bg-surface-sunken"
                    >
                      +
                    </button>
                  </div>

                  <p className="font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint">
                    {line.unitLabel} each
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(line.id)}
                    className="ml-auto font-mono text-[0.625rem] uppercase tracking-[0.1em] text-ink-faint underline underline-offset-[3px] transition-colors hover:text-accent"
                  >
                    Remove
                    <span className="sr-only"> {line.product.name} from your bag</span>
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <Link
            href="/demo/fathom-coffee/shop/"
            className="link-underline font-mono text-xs uppercase tracking-[0.12em] text-ink-muted"
          >
            Keep shopping
          </Link>
          <button
            type="button"
            onClick={clearCart}
            className="font-mono text-xs uppercase tracking-[0.12em] text-ink-faint underline underline-offset-[3px] transition-colors hover:text-accent"
          >
            Empty the bag
          </button>
        </div>
      </div>

      <aside className="lg:col-span-5">
        <div className="border border-line bg-surface-raised p-7 lg:sticky lg:top-32">
          <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
            Order summary
          </h2>

          <dl className="mt-6 space-y-3.5 border-b border-line pb-6 text-sm">
            <div className="flex justify-between gap-5">
              <dt className="text-ink-muted">
                Subtotal ({itemCount} {itemCount === 1 ? "bag" : "bags"})
              </dt>
              <dd className="font-mono">{formatCents(subtotalCents)}</dd>
            </div>
            <div className="flex justify-between gap-5">
              <dt className="text-ink-muted">Shipping</dt>
              <dd className="font-mono">
                {qualifiesForFreeShipping ? "Free" : formatCents(SHIPPING_CENTS)}
              </dd>
            </div>
          </dl>

          <div className="mt-6 flex items-baseline justify-between gap-5">
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
              Total
            </p>
            <p className="font-display text-3xl leading-none">{formatCents(totalCents)}</p>
          </div>

          {/* Progress toward free shipping, stated as text as well as a bar so it
              does not depend on the bar being perceivable. */}
          <div className="mt-7" aria-live="polite">
            {qualifiesForFreeShipping ? (
              <p className="text-sm text-accent">Shipping is free on this order.</p>
            ) : (
              <>
                <p className="text-sm text-ink-muted">
                  {formatCents(remainingCents)} more for free shipping.
                </p>
                <div
                  role="img"
                  aria-label={`${Math.round((subtotalCents / FREE_SHIPPING_THRESHOLD_CENTS) * 100)}% of the way to free shipping`}
                  className="mt-3 h-1.5 w-full bg-surface-sunken"
                >
                  <div
                    className="h-full bg-accent"
                    style={{
                      width: `${Math.min(100, (subtotalCents / FREE_SHIPPING_THRESHOLD_CENTS) * 100)}%`,
                    }}
                  />
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={() => setCheckoutAttempted(true)}
            className="mt-8 w-full bg-accent px-6 py-4 font-mono text-xs uppercase tracking-[0.12em] text-accent-contrast transition-colors hover:bg-accent-hover"
          >
            Continue to payment
          </button>

          <div aria-live="polite">
            {checkoutAttempted ? (
              <p className="mt-5 border border-accent bg-accent-soft p-4 text-sm leading-relaxed">
                <span className="font-medium">This is a demonstration build.</span> The cart,
                variants and totals are real, but there is no payment processor connected and no order
                was placed. On a live build this is where Stripe Checkout would take over.
              </p>
            ) : (
              <p className="mt-5 text-xs leading-relaxed text-ink-faint">
                No payment is taken &mdash; this is a demonstration cart.
              </p>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
