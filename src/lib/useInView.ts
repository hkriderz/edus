"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type UseInViewOptions = {
  root?: Element | Document | null;
  rootMargin?: string;
  threshold?: number | number[];
  /** When true (the default), the observer disconnects after the first entry. */
  once?: boolean;
};

/**
 * IntersectionObserver hook used as the scroll-reveal safety net.
 *
 * CSS `animation-timeline: view()` is the primary path. This hook exists for
 * browsers that do not implement scroll-driven animations, and for any
 * component that needs an explicit in-view signal. It never hides content on
 * its own — callers decide what the boolean means.
 */
export function useInView<T extends Element = HTMLElement>(
  options: UseInViewOptions = {},
): [(node: T | null) => void, boolean] {
  const { root = null, rootMargin = "0px 0px -8% 0px", threshold = 0.08, once = true } = options;
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const setNode = useCallback(
    (node: T | null) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node || typeof IntersectionObserver === "undefined") {
        return;
      }

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;

          if (entry.isIntersecting) {
            setIsInView(true);
            if (once) observerRef.current?.disconnect();
            return;
          }

          if (!once) setIsInView(false);
        },
        { root, rootMargin, threshold },
      );

      observerRef.current.observe(node);
    },
    [once, root, rootMargin, threshold],
  );

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, []);

  return [setNode, isInView];
}

export function supportsViewTimeline(): boolean {
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") return false;
  // Firefox parses `animation-timeline: view()` but keeps the animation on the
  // first keyframe (opacity 0 / clipped), so those sections never appear.
  // `-moz-orient` is Firefox-only; the observer fallback is used there instead.
  if (CSS.supports("-moz-orient: inline")) return false;
  return CSS.supports("animation-timeline: view()");
}

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}
