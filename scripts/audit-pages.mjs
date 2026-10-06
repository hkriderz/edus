/**
 * Static audit of the exported site.
 *
 * Checks the things that silently rot in a hand-built static site and that a
 * type-checker cannot see: broken internal links, missing local assets,
 * duplicated or absent metadata, heading-order jumps, images without alt text,
 * and unparseable JSON-LD.
 *
 * Runs against `out/` so it audits exactly what ships, with no browser needed.
 *
 * Usage: node scripts/audit-pages.mjs [outDir]
 */
import { readFile, readdir, stat } from "node:fs/promises";
import { join, posix, relative, resolve, sep } from "node:path";

const OUT_DIR = resolve(process.argv[2] ?? "out");

/** @type {{ file: string, message: string }[]} */
const problems = [];
/** @type {{ file: string, message: string }[]} */
const warnings = [];

function fail(file, message) {
  problems.push({ file, message });
}

function warn(file, message) {
  warnings.push({ file, message });
}

async function collectHtmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) {
        // The Next.js build output is not ours to audit. The previous-site
        // archive is a frozen export with its own markup, so it is not held
        // to this site's heading, canonical, and alt rules.
        if (entry.name === "_next" || entry.name === "archive") return [];
        return collectHtmlFiles(full);
      }
      return entry.name.endsWith(".html") ? [full] : [];
    }),
  );
  return files.flat();
}

async function exists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

/** Resolves a site-root-relative URL to a file inside the export. */
async function resolvesInExport(url) {
  const clean = url.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return exists(join(OUT_DIR, "index.html"));

  const relativePath = clean.replace(/^\//, "").split("/").join(sep);
  const candidates = [
    join(OUT_DIR, relativePath),
    join(OUT_DIR, relativePath, "index.html"),
    join(OUT_DIR, `${relativePath}.html`),
  ];

  for (const candidate of candidates) {
    if (await exists(candidate)) return true;
  }
  return false;
}

function matchAll(html, pattern) {
  return [...html.matchAll(pattern)];
}

function attr(tag, name) {
  const match = tag.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match ? match[1] : null;
}

async function auditFile(file) {
  const label = posix.join("/", relative(OUT_DIR, file).split(sep).join("/"));
  const html = await readFile(file, "utf8");

  // --- Metadata ------------------------------------------------------------
  const titles = matchAll(html, /<title>(.*?)<\/title>/gi);
  if (titles.length === 0) fail(label, "No <title>.");
  if (titles.length > 1) fail(label, `${titles.length} <title> tags.`);

  const descriptions = matchAll(html, /<meta name="description"[^>]*>/gi);
  if (descriptions.length === 0) fail(label, "No meta description.");
  if (descriptions.length > 1) fail(label, `${descriptions.length} meta descriptions.`);

  // A noindex 404 page should not claim a canonical URL, so it is exempt.
  const isNotFoundPage = /^\/(404|_not-found)\b/.test(label);
  const canonical = matchAll(html, /<link rel="canonical"[^>]*>/gi);
  if (canonical.length === 0 && !isNotFoundPage) fail(label, "No canonical link.");

  if (!/<html[^>]+lang="/i.test(html)) fail(label, "No lang attribute on <html>.");

  // --- Landmarks and headings ---------------------------------------------
  const h1s = matchAll(html, /<h1[\s>]/gi);
  if (h1s.length === 0) fail(label, "No <h1>.");
  if (h1s.length > 1) fail(label, `${h1s.length} <h1> elements.`);

  if (!/<main[\s>]/i.test(html)) fail(label, "No <main> landmark.");

  const headingLevels = matchAll(html, /<h([1-6])[\s>]/gi).map((m) => Number(m[1]));
  for (let i = 1; i < headingLevels.length; i += 1) {
    const jump = headingLevels[i] - headingLevels[i - 1];
    if (jump > 1) {
      warn(label, `Heading level jumps from h${headingLevels[i - 1]} to h${headingLevels[i]}.`);
      break;
    }
  }

  // --- Images --------------------------------------------------------------
  for (const [tag] of matchAll(html, /<img\b[^>]*>/gi)) {
    if (!/\salt=/i.test(tag)) {
      fail(label, `<img> without an alt attribute: ${tag.slice(0, 90)}`);
    }
    const src = attr(tag, "src");
    if (src && src.startsWith("/") && !(await resolvesInExport(src))) {
      fail(label, `<img> src not in export: ${src}`);
    }
  }

  // --- Open Graph image ----------------------------------------------------
  for (const [tag] of matchAll(html, /<meta property="og:image"[^>]*>/gi)) {
    const content = attr(tag, "content");
    if (!content) continue;
    const path = content.replace(/^https?:\/\/[^/]+/, "");
    if (!(await resolvesInExport(path))) {
      fail(label, `og:image not in export: ${path}`);
    }
    if (path.endsWith(".svg")) {
      fail(label, `og:image is SVG, which social platforms reject: ${path}`);
    }
  }

  // --- Internal links ------------------------------------------------------
  for (const [tag] of matchAll(html, /<a\b[^>]*>/gi)) {
    const href = attr(tag, "href");
    if (!href || !href.startsWith("/")) continue;
    if (!(await resolvesInExport(href))) {
      fail(label, `Internal link 404s: ${href}`);
    }
  }

  // --- JSON-LD -------------------------------------------------------------
  for (const [, body] of matchAll(
    html,
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
  )) {
    try {
      JSON.parse(body.replace(/\\u003c/g, "<"));
    } catch (error) {
      fail(label, `Unparseable JSON-LD: ${error.message}`);
    }
  }
}

async function main() {
  if (!(await exists(OUT_DIR))) {
    console.error(`No export found at ${OUT_DIR}. Run \`npm run build\` first.`);
    process.exit(1);
  }

  const files = await collectHtmlFiles(OUT_DIR);
  // Sequential: each page does many filesystem probes, and parallelising them
  // all at once exhausts file handles on Windows.
  for (const file of files) {
    await auditFile(file);
  }

  console.log(`Audited ${files.length} pages in ${OUT_DIR}\n`);

  if (warnings.length > 0) {
    console.log(`${warnings.length} warning(s):`);
    for (const { file, message } of warnings) console.log(`  ! ${file} — ${message}`);
    console.log("");
  }

  if (problems.length > 0) {
    console.log(`${problems.length} problem(s):`);
    for (const { file, message } of problems) console.log(`  x ${file} — ${message}`);
    process.exit(1);
  }

  console.log("No problems found.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
