import Link from "next/link";
import { Outfit } from "next/font/google";
import { DemoFrame } from "@/components/demo/DemoFrame";

/**
 * Meridian Dental identity: one geometric sans across the entire site. In a
 * healthcare context typographic consistency reads as competence, whereas
 * dramatic display/body contrast reads as marketing — which is the last thing an
 * anxious patient needs to see.
 */
const outfit = Outfit({ subsets: ["latin"], display: "swap" });

const navLinks = [
  { label: "Treatments & prices", href: "/demo/meridian-dental/services/" },
  { label: "Our team", href: "/demo/meridian-dental/team/" },
];

export default function MeridianDentalLayout({ children }: { children: React.ReactNode }) {
  return (
    <DemoFrame
      slug="meridian-dental"
      fonts={{
        display: outfit.style.fontFamily,
        body: outfit.style.fontFamily,
        mono: outfit.style.fontFamily,
      }}
    >
      {/* Emergency line sits above the navigation: the one piece of information
          a patient in pain needs before anything else. */}
      <div className="bg-surface-invert text-ink-invert">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-5 py-2.5 text-center sm:px-8">
          <span className="text-xs">In pain today?</span>
          <a href="tel:+19095550133" className="text-xs font-medium underline underline-offset-[3px]">
            Call (909) 555-0133
          </a>
          <span className="text-xs text-ink-invert/70">
            &mdash; same-day slots held every morning and afternoon
          </span>
        </div>
      </div>

      <header className="sticky top-0 z-40 border-b border-line bg-surface/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
          <Link href="/demo/meridian-dental/" className="flex items-center gap-3">
            {/* Meridian line mark: a horizon with a single marked point. */}
            <svg viewBox="0 0 28 28" className="h-7 w-7 shrink-0" aria-hidden="true">
              <circle cx="14" cy="14" r="13" fill="none" stroke="var(--accent)" strokeWidth="1.5" />
              <path d="M1 14h26" stroke="var(--accent)" strokeWidth="1.5" />
              <circle cx="14" cy="14" r="3.5" fill="var(--accent)" />
            </svg>
            <span className="text-xl font-medium tracking-[-0.02em]">Meridian Dental</span>
          </Link>

          <nav aria-label="Meridian Dental primary" className="flex items-center gap-5 sm:gap-7">
            <ul className="hidden items-center gap-7 sm:flex">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted underline-offset-[5px] transition-colors hover:text-accent hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/demo/meridian-dental/book/"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-contrast transition-colors hover:bg-accent-hover"
            >
              Book a visit
            </Link>
          </nav>
        </div>

        <nav aria-label="Meridian Dental primary mobile" className="border-t border-line sm:hidden">
          <ul className="mx-auto flex max-w-6xl divide-x divide-line">
            {navLinks.map((link) => (
              <li key={link.href} className="flex-1">
                <Link href={link.href} className="block py-3 text-center text-xs text-ink-muted">
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
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-2">
              <p className="text-2xl font-medium tracking-[-0.02em]">Meridian Dental</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
                A family practice built around the most anxious person who will ever walk in. Prices
                published, plans written down, nothing booked under pressure.
              </p>
            </div>

            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-ink-faint">
                Practice
              </h2>
              <address className="mt-4 space-y-1.5 text-sm not-italic text-ink-muted">
                <span className="block">42 Meridian Avenue, Suite 3</span>
                <span className="block">Rancho Cucamonga, CA</span>
                <a href="tel:+19095550133" className="block underline underline-offset-[3px]">
                  (909) 555-0133
                </a>
              </address>
            </div>

            <div>
              <h2 className="text-xs font-medium uppercase tracking-[0.1em] text-ink-faint">
                Opening hours
              </h2>
              <ul className="mt-4 space-y-1.5 text-sm text-ink-muted">
                <li>Mon – Thu &mdash; 08:00 to 18:00</li>
                <li>Friday &mdash; 08:00 to 15:00</li>
                <li>Saturday &mdash; 09:00 to 13:00</li>
                <li>Sunday &mdash; closed</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-7">
            <p className="text-xs text-ink-faint">
              Step-free access &middot; Accessible WC &middot; Hearing loop at reception
            </p>
            <p className="text-xs text-ink-faint">
              A fictional business, designed and built by EDUS Media as a demonstration.
            </p>
          </div>
        </div>
      </footer>
    </DemoFrame>
  );
}
