import Link from "next/link";
import { IBM_Plex_Mono, Playfair_Display, Source_Sans_3 } from "next/font/google";
import { DemoFrame } from "@/components/demo/DemoFrame";

/**
 * Rosalía identity: a high-contrast display serif for dish names set large
 * enough to read across a table, with a humanist sans carrying descriptions and
 * dietary notes at small sizes.
 */
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const sourceSans = Source_Sans_3({ subsets: ["latin"], display: "swap" });
const plexMono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const navLinks = [
  { label: "Menu", href: "/demo/rosalia/menu/" },
  { label: "Story", href: "/demo/rosalia/story/" },
];

export default function RosaliaLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoFrame
      slug="rosalia"
      grain
      fonts={{
        display: playfair.style.fontFamily,
        body: sourceSans.style.fontFamily,
        mono: plexMono.style.fontFamily,
      }}
    >
      {/* Centred serif wordmark with the reservation CTA pulled out — the
          structure of a printed menu's cover rather than a SaaS header. */}
      <header className="sticky top-0 z-40 border-b border-line bg-surface/93 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <nav aria-label="Rosalia primary" className="hidden flex-1 sm:block">
            <ul className="flex items-center gap-7">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline font-mono text-[0.625rem] uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-ink"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href="/demo/rosalia/"
            className="font-display text-2xl leading-none tracking-[-0.01em] sm:text-3xl"
          >
            Rosalí<span className="text-accent">a</span>
          </Link>

          <div className="flex flex-1 justify-end">
            <Link
              href="/demo/rosalia/reservations/"
              className="border border-accent bg-accent px-4 py-2.5 font-mono text-[0.5625rem] uppercase tracking-[0.16em] text-accent-contrast transition-colors hover:bg-accent-hover sm:px-5"
            >
              Reserve
            </Link>
          </div>
        </div>

        {/* Mobile nav, below the wordmark so the mark stays centred. */}
        <nav aria-label="Rosalia primary mobile" className="border-t border-line sm:hidden">
          <ul className="mx-auto flex max-w-6xl divide-x divide-line">
            {navLinks.map((link) => (
              <li key={link.href} className="flex-1">
                <Link
                  href={link.href}
                  className="block py-3 text-center font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-ink-muted"
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

      <footer className="border-t border-line bg-surface-invert text-ink-invert">
        <div className="mx-auto max-w-6xl px-5 py-16 text-center sm:px-8">
          <p className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9]">
            Rosalí<span className="text-[var(--clay)]">a</span>
          </p>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-ink-invert/70">
            Modern Mexican cooking, nixtamal ground every morning, and a menu that changes with the
            Thursday market.
          </p>

          <div className="mt-14 grid gap-10 border-t border-ink-invert/20 pt-10 text-left sm:grid-cols-3">
            <div>
              <h2 className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-ink-invert/50">
                Address
              </h2>
              <address className="mt-4 space-y-1.5 text-sm not-italic text-ink-invert/75">
                <span className="block">88 Calle Verde</span>
                <span className="block">Rancho Cucamonga, CA</span>
                <span className="block">(909) 555-0162</span>
              </address>
            </div>
            <div>
              <h2 className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-ink-invert/50">
                Service
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-invert/75">
                <li>Tue – Thu &mdash; 17:30 to 22:00</li>
                <li>Fri – Sat &mdash; 17:00 to 23:00</li>
                <li>Sunday &mdash; 12:00 to 20:00</li>
                <li>Closed Mondays</li>
              </ul>
            </div>
            <div>
              <h2 className="font-mono text-[0.5625rem] uppercase tracking-[0.18em] text-ink-invert/50">
                Good to know
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-invert/75">
                <li>Walk-ins at the bar, always</li>
                <li>Step-free entrance and accessible WC</li>
                <li>Private dining for up to 18</li>
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
