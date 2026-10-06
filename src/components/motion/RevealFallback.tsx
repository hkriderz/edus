"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";
import { prefersReducedMotion, supportsViewTimeline } from "@/lib/useInView";

const REVEAL_SELECTOR = "[data-reveal], [data-reveal-group] > *";

function isOnScreen(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.bottom > 0 && rect.top < window.innerHeight && rect.width > 0 && rect.height > 0;
}

/**
 * IntersectionObserver fallback for `[data-reveal]` nodes.
 *
 * Chromium and Safari animate via CSS `animation-timeline: view()`. Firefox
 * parses that syntax but freezes the animation on the hidden first keyframe,
 * so it uses this path instead. The effect re-runs on each navigation because
 * the marketing layout does not remount. Content stays visible when JavaScript
 * is disabled: the hidden state is only applied after this module confirms
 * that the CSS path is unavailable.
 */
export function RevealFallback() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (prefersReducedMotion() || supportsViewTimeline()) return;

    document.documentElement.classList.add("js-reveal-fallback");

    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in-view");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px 15% 0px", threshold: 0 },
    );

    for (const element of elements) {
      if (isOnScreen(element)) {
        element.classList.add("is-in-view");
        continue;
      }
      observer.observe(element);
    }

    return () => {
      observer.disconnect();
      document.documentElement.classList.remove("js-reveal-fallback");
    };
  }, [pathname]);

  return null;
}
