import Link from "next/link";
import { IBM_Plex_Sans, Spectral } from "next/font/google";
import { DemoFrame } from "@/components/demo/DemoFrame";
import { CartProvider } from "./CartContext";
import { CartButton, CartDrawer } from "./CartDrawer";

/**
 * Fathom identity: a text serif with real optical weight for product names and
 * origin stories, paired with a neutral grotesque that carries specification
 * tables and prices without editorialising them. IBM Plex Sans doubles as the
 * mono voice via its own mono-adjacent tracking at small sizes — but prices
 * deserve true tabular figures, so Plex Sans is used with tracking instead of a
 * third family, keeping the font payload to two.
 */
const spectral = Spectral({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const navLinks = [
  { label: "Shop", href: "/demo/fathom-coffee/shop/" },
  { label: "Ardent", href: "/demo/fathom-coffee/shop/ardent-house-blend/" },
];

export default function FathomLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoFrame
      slug="fathom-coffee"
      grain
      fonts={{
        display: spectral.style.fontFamily,
        body: plexSans.style.fontFamily,
        mono: plexSans.style.fontFamily,
      }}
    >
      <CartProvider>
        {/* Free-shipping threshold in the top bar: the single most effective
            placement for it on a coffee shop, and it is honest here because the
            figure matches the cart's own calculation. */}
        <p className="border-b border-line bg-surface-invert px-5 py-2 text-center font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-invert sm:px-8">
          Free shipping over $35 &middot; Roasted Tuesdays &amp; Fridays
        </p>

        <header className="sticky top-0 z-40 border-b border-line bg-surface/93 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
            <Link
              href="/demo/fathom-coffee/"
              className="font-display text-xl leading-none tracking-[-0.01em] sm:text-2xl"
            >
              Fathom
              <span className="text-accent">.</span>
            </Link>

            <nav aria-label="Fathom primary" className="hidden sm:block">
              <ul className="flex items-center gap-7">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="link-underline font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-ink"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <CartButton />
          </div>

          <nav aria-label="Fathom primary mobile" className="border-t border-line sm:hidden">
            <ul className="mx-auto flex max-w-6xl divide-x divide-line">
              {navLinks.map((link) => (
                <li key={link.href} className="flex-1">
                  <Link
                    href={link.href}
                    className="block py-3 text-center font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-muted"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </header>

        <main id="demo-main" className="flex-1">
          {children}
        </main>

        <footer className="border-t border-line bg-surface-sunken">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2">
                <p className="font-display text-3xl leading-none">
                  Fathom<span className="text-accent">.</span>
                </p>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-muted">
                  A small roastery in Rancho Cucamonga. We publish what we pay for every lot, and we
                  will tell you when a coffee is not right for how you brew.
                </p>
              </div>

              <div>
                <h2 className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Shop
                </h2>
                <ul className="mt-4 space-y-2 text-sm text-ink-muted">
                  <li>
                    <Link href="/demo/fathom-coffee/shop/" className="hover:text-accent">
                      All coffee
                    </Link>
                  </li>
                  <li>
                    <Link href="/demo/fathom-coffee/cart/" className="hover:text-accent">
                      Your bag
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-ink-faint">
                  Visit
                </h2>
                <address className="mt-4 space-y-1.5 text-sm not-italic text-ink-muted">
                  <span className="block">12 Foothill Works</span>
                  <span className="block">Rancho Cucamonga, CA</span>
                  <span className="block">Thu &ndash; Sun, 08:00 to 14:00</span>
                </address>
              </div>
            </div>

            <p className="mt-14 border-t border-line pt-7 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
              A fictional business, designed and built by EDUS Media as a demonstration. The cart
              works, but no order is ever placed and no payment is taken.
            </p>
          </div>
        </footer>

        <CartDrawer />
      </CartProvider>
    </DemoFrame>
  );
}
