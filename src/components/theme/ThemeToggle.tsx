"use client";

import { useCallback, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./ThemeScript";
import { cn } from "@/lib/cn";

type Theme = "light" | "dark";

function readAppliedTheme(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function subscribeTheme(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  window.addEventListener("storage", onChange);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onChange);
  };
}

function getServerTheme(): Theme {
  return "light";
}

export function ThemeToggle({ className }: { className?: string }) {
  const theme = useSyncExternalStore(subscribeTheme, readAppliedTheme, getServerTheme);

  const toggle = useCallback(() => {
    const next: Theme = readAppliedTheme() === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Persistence unavailable (private mode, blocked storage). The toggle
      // still works for this page view, which is the important part.
    }
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      aria-pressed={isDark}
      className={cn(
        "grid h-10 w-10 place-items-center border border-line text-ink transition-colors",
        "hover:border-line-strong hover:bg-surface-sunken",
        className,
      )}
    >
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        aria-hidden="true"
      >
        {isDark ? (
          <path
            d="M15.5 12.4A6.2 6.2 0 0 1 7.6 4.5a6.2 6.2 0 1 0 7.9 7.9Z"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <>
            <circle cx="10" cy="10" r="3.4" />
            <path
              d="M10 1.8v2.1M10 16.1v2.1M1.8 10h2.1M16.1 10h2.1M4.2 4.2l1.5 1.5M14.3 14.3l1.5 1.5M15.8 4.2l-1.5 1.5M5.7 14.3l-1.5 1.5"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </button>
  );
}
