"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Lockup } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { primaryNav } from "@/config/navigation";
import { siteConfig, isPlaceholder } from "@/config/site";
import { cn } from "@/lib/cn";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href);
}

export function Navbar() {
  const pathname = usePathname();
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const panelId = useId();
  // Bound to the current path so a navigation closes the panel without an effect.
  const isOpen = openForPath === pathname;

  // Lock scroll and wire Escape only while the panel is actually open.
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenForPath(null);
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen]);

  const showPhone = !isPlaceholder(siteConfig.phoneDisplay);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[90rem] items-center justify-between gap-6 px-6 sm:px-8 lg:h-20 lg:px-12">
        <Link href="/" className="shrink-0" aria-label={`${siteConfig.name} — home`}>
          <Lockup />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(pathname, link.href) ? "page" : undefined}
                  className={cn(
                    "link-underline font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors",
                    isActive(pathname, link.href) ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          {showPhone ? (
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-accent sm:block"
            >
              {siteConfig.phoneDisplay}
            </a>
          ) : null}

          <ThemeToggle />

          <button
            type="button"
            onClick={() => setOpenForPath((current) => (current === pathname ? null : pathname))}
            aria-expanded={isOpen}
            aria-controls={panelId}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="grid h-10 w-10 place-items-center border border-line text-ink transition-colors hover:border-line-strong lg:hidden"
          >
            <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
              {isOpen ? (
                <path
                  d="M4 4l12 12M16 4L4 16"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              ) : (
                <path d="M3 6h14M3 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile panel. Kept in the DOM only while open so its links stay out of
          the tab order when collapsed. */}
      {isOpen ? (
        <div
          id={panelId}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-surface lg:hidden"
        >
          <nav aria-label="Primary mobile" className="px-6 py-8 sm:px-8">
            <ul className="divide-y divide-line border-y border-line">
              {primaryNav.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive(pathname, link.href) ? "page" : undefined}
                    className="flex items-baseline justify-between gap-4 py-5"
                  >
                    <span className="font-display text-3xl font-medium tracking-[-0.02em]">
                      {link.label}
                    </span>
                    {link.description ? (
                      <span className="shrink-0 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
                        {link.description}
                      </span>
                    ) : null}
                  </Link>

                  {link.children ? (
                    <ul className="-mt-1 mb-5 space-y-2 pl-1">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted transition-colors hover:text-accent"
                          >
                            — {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="mt-10 space-y-3 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-ink-muted">
              {!isPlaceholder(siteConfig.email) ? (
                <a href={`mailto:${siteConfig.email}`} className="block hover:text-accent">
                  {siteConfig.email}
                </a>
              ) : null}
              {showPhone ? (
                <a href={`tel:${siteConfig.phone}`} className="block hover:text-accent">
                  {siteConfig.phoneDisplay}
                </a>
              ) : null}
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
