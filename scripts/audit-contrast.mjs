/**
 * WCAG contrast audit of the design tokens.
 *
 * Contrast is decided in the token layer, not in individual components: every
 * theme re-points the same semantic variables, so checking the token pairs
 * covers every page that uses them. Doing it here rather than in a browser makes
 * it deterministic and cheap enough to run on every change.
 *
 * Parses the oklch() literals straight out of globals.css and demo/themes.css so
 * the check can never drift from the stylesheets it is validating.
 *
 * Usage: node scripts/audit-contrast.mjs
 */
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const GLOBALS = resolve("src/app/globals.css");
const DEMO_THEMES = resolve("src/app/(demos)/demo/themes.css");

// --- oklch -> sRGB -----------------------------------------------------------

/** Oklab to linear sRGB, per Björn Ottosson's reference implementation. */
function oklabToLinearSrgb(L, a, b) {
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const l = l_ ** 3;
  const m = m_ ** 3;
  const s = s_ ** 3;

  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

function linearToSrgb(channel) {
  const clamped = Math.min(1, Math.max(0, channel));
  return clamped <= 0.0031308 ? clamped * 12.92 : 1.055 * clamped ** (1 / 2.4) - 0.055;
}

/** @returns {{ r: number, g: number, b: number, alpha: number } | null} */
function parseOklch(value) {
  const match = value.match(
    /oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)\s*)?\)/,
  );
  if (!match) return null;

  const L = Number(match[1]) / 100;
  const C = Number(match[2]);
  const hueRadians = (Number(match[3]) * Math.PI) / 180;
  const alpha = match[4] === undefined ? 1 : Number(match[4]);

  const [lr, lg, lb] = oklabToLinearSrgb(L, C * Math.cos(hueRadians), C * Math.sin(hueRadians));

  return {
    r: linearToSrgb(lr) * 255,
    g: linearToSrgb(lg) * 255,
    b: linearToSrgb(lb) * 255,
    alpha,
  };
}

// --- WCAG --------------------------------------------------------------------

function relativeLuminance({ r, g, b }) {
  const channel = (value) => {
    const v = value / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

/** Flattens a translucent foreground onto its background before measuring. */
function composite(foreground, background) {
  const a = foreground.alpha;
  return {
    r: foreground.r * a + background.r * (1 - a),
    g: foreground.g * a + background.g * (1 - a),
    b: foreground.b * a + background.b * (1 - a),
    alpha: 1,
  };
}

function contrastRatio(foreground, background) {
  const l1 = relativeLuminance(composite(foreground, background));
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// --- Token extraction --------------------------------------------------------

/**
 * Pulls `--token: oklch(...)` declarations out of a single CSS block.
 * Deliberately simple: these stylesheets are flat lists of colour declarations.
 */
function readBlock(css, selector) {
  const start = css.indexOf(selector);
  if (start === -1) return null;

  const open = css.indexOf("{", start);
  const close = css.indexOf("}", open);
  if (open === -1 || close === -1) return null;

  const body = css.slice(open + 1, close);
  /** @type {Record<string, ReturnType<typeof parseOklch>>} */
  const tokens = {};

  for (const [, name, value] of body.matchAll(/(--[\w-]+)\s*:\s*(oklch\([^;]+\))\s*;/g)) {
    const colour = parseOklch(value);
    if (colour) tokens[name] = colour;
  }

  return tokens;
}

/**
 * The pairings that actually appear in the UI. Large-text pairs use the 3:1
 * threshold WCAG allows; everything else must clear 4.5:1.
 */
const PAIRS = [
  { fg: "--ink", bg: "--surface", min: 4.5, label: "body text on page" },
  { fg: "--ink", bg: "--surface-raised", min: 4.5, label: "body text on raised card" },
  { fg: "--ink", bg: "--surface-sunken", min: 4.5, label: "body text on sunken band" },
  { fg: "--ink-muted", bg: "--surface", min: 4.5, label: "secondary text on page" },
  { fg: "--ink-muted", bg: "--surface-sunken", min: 4.5, label: "secondary text on sunken band" },
  { fg: "--ink-faint", bg: "--surface", min: 4.5, label: "labels and captions on page" },
  { fg: "--ink-faint", bg: "--surface-sunken", min: 4.5, label: "labels on sunken band" },
  { fg: "--accent", bg: "--surface", min: 4.5, label: "accent text on page" },
  { fg: "--accent", bg: "--surface-raised", min: 4.5, label: "accent text on raised card" },
  { fg: "--accent", bg: "--surface-sunken", min: 4.5, label: "accent text on sunken band" },
  { fg: "--accent-contrast", bg: "--accent", min: 4.5, label: "label on filled accent button" },
  { fg: "--accent-contrast", bg: "--accent-hover", min: 4.5, label: "label on hovered button" },
  { fg: "--ink-invert", bg: "--surface-invert", min: 4.5, label: "text on inverted band" },
  // Borders are non-text, so they fall under the 3:1 UI-component threshold.
  { fg: "--line-strong", bg: "--surface", min: 3, label: "strong border on page" },
];

function parseHex(hex) {
  const value = hex.replace("#", "");
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
    alpha: 1,
  };
}

function withAlpha(colour, alpha) {
  return { ...colour, alpha };
}

/**
 * The EDUS demo badge deliberately ignores the host demo's palette — it is
 * chrome belonging to EDUS, not to the fictional client — so its colours are
 * literals in DemoFrame.tsx rather than tokens. They still have to pass, and
 * nothing else would catch them, so they are checked explicitly here.
 */
function auditDemoBadge() {
  const field = parseHex("#191511");
  // Lighter than the EDUS brand clay: on the badge's near-black field the brand
  // value only reaches 4.39:1 at this type size.
  const ember = parseHex("#cc6a42");
  const paper = parseHex("#f7f3ec");

  const checks = [
    { fg: ember, bg: field, min: 4.5, label: "badge accent label on badge field" },
    { fg: withAlpha(paper, 0.65), bg: field, min: 4.5, label: "badge muted label on badge field" },
    { fg: paper, bg: field, min: 4.5, label: "badge link on badge field" },
  ];

  console.log("\ndemo badge (literal colours in DemoFrame.tsx)");

  let failures = 0;
  for (const check of checks) {
    const ratio = contrastRatio(check.fg, check.bg);
    const passed = ratio >= check.min;
    if (!passed) failures += 1;
    console.log(
      `    ${passed ? "pass" : "FAIL"}  ${ratio.toFixed(2).padStart(5)}:1  (needs ${check.min})  ${check.label}`,
    );
  }
  return failures;
}

async function main() {
  const [globalsCss, demoCss] = await Promise.all([
    readFile(GLOBALS, "utf8"),
    readFile(DEMO_THEMES, "utf8"),
  ]);

  /** @type {{ name: string, tokens: Record<string, any> }[]} */
  const themes = [];

  const light = readBlock(globalsCss, ":root {");
  if (light) themes.push({ name: "EDUS light", tokens: light });

  const dark = readBlock(globalsCss, ".dark {");
  if (dark) themes.push({ name: "EDUS dark", tokens: { ...light, ...dark } });

  for (const [, slug] of demoCss.matchAll(/\[data-demo="([\w-]+)"\]/g)) {
    const tokens = readBlock(demoCss, `[data-demo="${slug}"]`);
    if (tokens) themes.push({ name: `demo: ${slug}`, tokens });
  }

  let failures = 0;

  for (const theme of themes) {
    /** @type {string[]} */
    const lines = [];

    for (const pair of PAIRS) {
      const fg = theme.tokens[pair.fg];
      const bg = theme.tokens[pair.bg];
      if (!fg || !bg) continue;

      const ratio = contrastRatio(fg, bg);
      const passed = ratio >= pair.min;
      if (!passed) failures += 1;

      lines.push(
        `    ${passed ? "pass" : "FAIL"}  ${ratio.toFixed(2).padStart(5)}:1  (needs ${pair.min})  ${pair.label}  [${pair.fg} on ${pair.bg}]`,
      );
    }

    const themeFailed = lines.some((line) => line.includes("FAIL"));
    console.log(`\n${theme.name}${themeFailed ? "  <-- has failures" : ""}`);
    for (const line of lines) console.log(line);
  }

  failures += auditDemoBadge();

  console.log(`\n${themes.length} themes checked.`);

  if (failures > 0) {
    console.log(`${failures} contrast failure(s).`);
    process.exit(1);
  }

  console.log("All token pairs meet their WCAG threshold.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
