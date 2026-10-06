import Link from "next/link";
import { Monogram } from "@/components/brand/Logo";
import { footerNav } from "@/config/navigation";
import { siteConfig, siteLocation, isPlaceholder } from "@/config/site";

export function Footer() {
  const hasEmail = !isPlaceholder(siteConfig.email);
  const hasPhone = !isPlaceholder(siteConfig.phoneDisplay);
  const hasLocation = !isPlaceholder(siteConfig.address.city);

  return (
    <footer className="border-t border-line bg-surface-sunken">
      <div className="mx-auto w-full max-w-[90rem] px-6 py-16 sm:px-8 lg:px-12 lg:py-20">
        {/* Oversized sign-off: the wordmark set as display type rather than a logo image. */}
        <div className="flex flex-col gap-8 border-b border-line pb-14 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-5">{siteConfig.tagline}</p>
            <p className="font-display text-[clamp(2.75rem,8vw,6.5rem)] font-semibold leading-[0.85] tracking-[-0.035em] optical-left">
              EDUS
              <span className="text-accent">.</span>
            </p>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-muted">
            A community-focused web design studio. Studio-quality sites, prices published up front,
            and support guaranteed in writing.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 py-14 sm:grid-cols-3 lg:grid-cols-4">
          {footerNav.map((group) => (
            <nav key={group.heading} aria-label={group.heading}>
              <h2 className="eyebrow mb-5">{group.heading}</h2>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-accent"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          <div>
            <h2 className="eyebrow mb-5">Contact</h2>
            <ul className="space-y-3 text-sm text-ink-muted">
              {hasEmail ? (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="transition-colors hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </li>
              ) : null}
              {hasPhone ? (
                <li>
                  <a
                    href={`tel:${siteConfig.phone}`}
                    className="transition-colors hover:text-accent"
                  >
                    {siteConfig.phoneDisplay}
                  </a>
                </li>
              ) : null}
              {hasLocation ? <li>{siteLocation}</li> : null}
              {siteConfig.hours.map((entry) => (
                <li key={entry.days} className="text-ink-faint">
                  {entry.days}: {entry.time}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Monogram className="h-6 w-6" />
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
              &copy; {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>
          <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
            Built by hand. No page builders.
          </p>
        </div>
      </div>
    </footer>
  );
}
