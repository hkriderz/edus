import Link from "next/link";
import { Karla, Young_Serif, Space_Mono } from "next/font/google";
import { DemoFrame } from "@/components/demo/DemoFrame";

/**
 * Verde & Vine identity: Young Serif has the chunky, slightly agricultural
 * warmth of a printed seed catalogue, which is the reference the brief kept
 * returning to. Karla carries the care instructions at small sizes.
 */
const youngSerif = Young_Serif({ subsets: ["latin"], weight: "400", display: "swap" });
const karla = Karla({ subsets: ["latin"], display: "swap" });
const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

const navLinks = [
  { label: "Shop", href: "/demo/verde-and-vine/catalogue/" },
  { label: "Café", href: "/demo/verde-and-vine/cafe/" },
  { label: "Visit", href: "/demo/verde-and-vine/visit/" },
];

export default function VerdeAndVineLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoFrame
      slug="verde-and-vine"
      grain
      fonts={{
        display: youngSerif.style.fontFamily,
        body: karla.style.fontFamily,
        mono: spaceMono.style.fontFamily,
      }}
    >
      {/* Shop and café sit side by side in one navigation — the brief's core
          requirement, since visitors could not tell it was one place. */}
      <header className="sticky top-0 z-40 border-b border-line bg-surface/92 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <Link href="/demo/verde-and-vine/" className="group flex items-baseline gap-2.5">
            <span className="font-display text-2xl leading-none">Verde</span>
            <span aria-hidden="true" className="text-lg leading-none text-accent">
              &amp;
            </span>
            <span className="font-display text-2xl leading-none">Vine</span>
          </Link>

          <nav aria-label="Verde and Vine primary">
            <ul className="flex items-center gap-6 sm:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demo/verde-and-vine/visit/#hours"
                  className="border border-line-strong px-3.5 py-2 font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors hover:bg-ink hover:text-ink-invert"
                >
                  Open today
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="demo-main" className="flex-1">
        {children}
      </main>

      <footer className="border-t border-line bg-surface-invert text-ink-invert">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <p className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[0.95]">
                Verde <span className="text-accent">&amp;</span> Vine
              </p>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ink-invert/70">
                A plant shop with a café in the back. Sit down, stay a while, and ask us anything
                before you buy.
              </p>
            </div>

            <div>
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-invert/50">
                Find us
              </h2>
              <address className="mt-4 space-y-1.5 text-sm not-italic text-ink-invert/75">
                <span className="block">214 Nursery Lane</span>
                <span className="block">Rancho Cucamonga, CA</span>
                <span className="block">(909) 555-0114</span>
              </address>
            </div>

            <div>
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-invert/50">
                Hours
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-invert/75">
                <li>Tue – Fri &mdash; 9 to 6</li>
                <li>Sat – Sun &mdash; 8 to 5</li>
                <li>Monday &mdash; closed</li>
              </ul>
            </div>
          </div>

          <p className="mt-14 border-t border-ink-invert/20 pt-7 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-invert/40">
            A fictional business, designed and built by EDUS Media as a demonstration.
          </p>
        </div>
      </footer>
    </DemoFrame>
  );
}
