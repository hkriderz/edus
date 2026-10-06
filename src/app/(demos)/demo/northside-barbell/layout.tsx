import Link from "next/link";
import { Archivo, Archivo_Black, Roboto_Mono } from "next/font/google";
import { DemoFrame } from "@/components/demo/DemoFrame";

/**
 * Northside Barbell identity: one family at two extremes of weight. Archivo
 * Black carries the display numerals that dominate every page; Archivo handles
 * body copy; Roboto Mono reinforces the utilitarian, engineered register.
 */
const archivoBlack = Archivo_Black({ subsets: ["latin"], weight: "400", display: "swap" });
const archivo = Archivo({ subsets: ["latin"], display: "swap" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], display: "swap" });

const navLinks = [
  { label: "Schedule", href: "/demo/northside-barbell/schedule/" },
  { label: "Coaches", href: "/demo/northside-barbell/coaches/" },
  { label: "Membership", href: "/demo/northside-barbell/membership/" },
];

export default function NorthsideBarbellLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoFrame
      slug="northside-barbell"
      fonts={{
        display: archivoBlack.style.fontFamily,
        body: archivo.style.fontFamily,
        mono: robotoMono.style.fontFamily,
      }}
    >
      {/* Hard-ruled header, uppercase throughout, zero radius anywhere. */}
      <header className="sticky top-0 z-40 border-b-2 border-ink bg-surface">
        <div className="mx-auto flex max-w-7xl items-stretch justify-between">
          <Link
            href="/demo/northside-barbell/"
            className="flex items-center border-r border-line px-5 py-4 sm:px-7"
          >
            <span className="font-display text-lg uppercase leading-none tracking-[-0.02em] sm:text-xl">
              NORTHSIDE
              <span className="text-accent">/</span>
              BARBELL
            </span>
          </Link>

          <nav aria-label="Northside Barbell primary" className="flex items-stretch">
            <ul className="flex items-stretch">
              {navLinks.map((link) => (
                <li key={link.href} className="flex">
                  <Link
                    href={link.href}
                    className="flex items-center border-l border-line px-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] transition-colors hover:bg-accent hover:text-accent-contrast sm:px-6"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="flex">
                <Link
                  href="/demo/northside-barbell/membership/#trial"
                  className="flex items-center bg-accent px-4 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-accent-contrast transition-colors hover:bg-accent-hover sm:px-6"
                >
                  Free trial
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="demo-main" className="flex-1">
        {children}
      </main>

      <footer className="border-t-2 border-ink">
        <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
          <p className="font-display text-[clamp(2.5rem,11vw,8rem)] uppercase leading-[0.82] tracking-[-0.04em]">
            NO MIRRORS
            <br />
            <span className="text-accent">NO EXCUSES</span>
          </p>

          <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-3">
            <div>
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                Unit 7
              </h2>
              <address className="mt-4 space-y-1.5 text-sm not-italic text-ink-muted">
                <span className="block">7 Ironworks Court</span>
                <span className="block">Rancho Cucamonga, CA</span>
                <span className="block">(909) 555-0177</span>
              </address>
            </div>
            <div>
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                Staffed hours
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
                <li>Mon – Fri &mdash; 05:00 to 21:00</li>
                <li>Sat – Sun &mdash; 08:00 to 13:00</li>
                <li>Fob access 24/7 for members</li>
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-[0.625rem] uppercase tracking-[0.16em] text-ink-faint">
                Kit
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
                <li>9 competition platforms</li>
                <li>14 calibrated bars</li>
                <li>Chalk, belts and straps provided</li>
              </ul>
            </div>
          </div>

          <p className="mt-12 border-t border-line pt-6 font-mono text-[0.5625rem] uppercase tracking-[0.14em] text-ink-faint">
            A fictional business, designed and built by EDUS Media as a demonstration.
          </p>
        </div>
      </footer>
    </DemoFrame>
  );
}
