import Link from "next/link";
import { GrainOverlay } from "@/components/brand/GrainOverlay";
import { Lockup } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { primaryNav } from "@/config/navigation";
import { marketingFontVariables } from "@/lib/fonts";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

/**
 * Root-level 404. It carries its own chrome rather than reusing the marketing
 * layout, because `not-found` can be triggered from inside the (demos) group
 * too, where the EDUS navigation would be out of place.
 */
export default function NotFound() {
  return (
    <div
      style={marketingFontVariables}
      className="flex min-h-screen flex-col bg-surface font-sans text-ink"
    >
      <GrainOverlay />

      <header className="border-b border-line">
        <Container width="wide" className="flex h-20 items-center">
          <Link href="/" aria-label="EDUS Media — home">
            <Lockup />
          </Link>
        </Container>
      </header>

      <main id="main" className="flex flex-1 items-center">
        <Container width="wide" className="py-24">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-8 text-hero optical-left">
            Not
            <br />
            <span className="text-accent">here</span>.
          </h1>
          <p className="text-lead mt-10 max-w-[48ch] border-t border-line pt-10 text-ink-muted">
            This page does not exist, or it moved during our rebrand from Near Me Web Designs to EDUS
            Media. The sitemap below has everything.
          </p>

          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/" size="lg">
              Back to the homepage
            </ButtonLink>
            <ButtonLink href="/sitemap/" variant="outline" size="lg">
              Full sitemap
            </ButtonLink>
          </div>

          <nav aria-label="Main pages" className="mt-20">
            <h2 className="eyebrow mb-6">Or try one of these</h2>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 border-t border-line pt-6">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </main>
    </div>
  );
}
