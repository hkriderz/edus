export const THEME_STORAGE_KEY = "edus-theme";

/**
 * Applies the stored theme before first paint to prevent a flash of the wrong
 * palette. This has to be a blocking inline script in <head> — any React-level
 * solution runs after the browser has already painted.
 *
 * Wrapped in try/catch because localStorage throws in some privacy modes, and a
 * theme preference is never worth breaking the page over.
 */
const script = `
(function () {
  try {
    var stored = localStorage.getItem("${THEME_STORAGE_KEY}");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var isDark = stored === "dark" || (stored === null && prefersDark);
    document.documentElement.classList.toggle("dark", isDark);
    document.documentElement.style.colorScheme = isDark ? "dark" : "light";
  } catch (error) {
    /* Theme preference unavailable; the light default in CSS applies. */
  }
})();
`;

export function ThemeScript() {
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
