/**
 * Builds a static, noindex archive of the previous Near Me Web Designs site.
 *
 * Source (local, gitignored): old/nmwd-master
 *   The raw Next.js static export. It contains the original contact name,
 *   email, phone, and a Google Tag Manager container. Do not commit it.
 *
 * Output (committed): public/archive/near-me-web-designs/
 *   HTML, CSS, fonts, and images only. Root-absolute URLs are prefixed so the
 *   archive can live under this app without colliding with /_next. Script tags
 *   are removed so Next's client router cannot escape the prefix and so the
 *   flight payload cannot put the original contact details back.
 *
 * Several routes shipped an empty <main> and filled it in the browser. Those
 * routes can be restored by placing the hydrated main innerHTML at
 * tmp/hydrated/<route>/main.html before running this script. That folder is
 * gitignored because it still has the original contact details.
 *
 * Regenerate from a local copy of the export:
 *   node scripts/archive-nmwd.mjs
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";

const SOURCE = "old/nmwd-master";
const DEST = "public/archive/near-me-web-designs";
const PREFIX = "/archive/near-me-web-designs";

function walk(dir) {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }
  return files;
}

function shouldCopy(rel) {
  const normalised = rel.split("\\").join("/");
  if (normalised.endsWith(".html")) return true;
  if (normalised.endsWith(".css")) return true;
  if (normalised.endsWith(".woff2")) return true;
  if (normalised.startsWith("images/")) return true;
  if (normalised === "favicon.ico") return true;
  return false;
}

function sanitizeHtml(html) {
  let out = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  out = out.replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "");
  // Preloads for chunks we do not ship. Leaving them requests 404s on every page.
  out = out.replace(/<link\b[^>]*href="[^"]+\.js"[^>]*>/gi, "");
  out = out.replace(/GTM-[A-Z0-9]+/g, "");

  // Root-absolute asset and navigation URLs. Leave protocol-relative (//) alone.
  out = out.replace(/(\s(?:href|src|srcset)=["'])\/(?!\/)/gi, `$1${PREFIX}/`);

  out = out.replace(
    /<meta\b[^>]*name="robots"[^>]*>/gi,
    '<meta name="robots" content="noindex, nofollow"/>',
  );
  out = out.replace(
    /<meta\b[^>]*name="googlebot"[^>]*>/gi,
    '<meta name="googlebot" content="noindex, nofollow"/>',
  );
  if (!/name="robots"/i.test(out)) {
    out = out.replace(/<head[^>]*>/i, (head) => `${head}<meta name="robots" content="noindex, nofollow"/>`);
  }

  out = out.replaceAll("hari@nearmewebdesigns.com", "hello@example.com");
  out = out.replaceAll("+19093336812", "+10000000000");
  out = out.replaceAll("(909) 333-6812", "(000) 000-0000");
  out = out.replaceAll("909-333-6812", "000-000-0000");
  out = out.replaceAll("9093336812", "0000000000");
  out = out.replaceAll('content="Hari"', 'content="Studio"');
  out = out.replaceAll(">Hari<", ">Studio<");
  out = out.replaceAll("Hari Y", "Alex Rivera");
  out = out.replace(/\bHari\b/g, "Alex");
  out = out.replaceAll("6LdYOdgrAAAAAMAXMfD3WGRZjb6JRoqBHm7aoLUo", "");
  out = out.replace(/G-L9S61DMHYY/g, "");
  out = out.replace(/\sdata-cursor-ref="[^"]*"/g, "");
  out = out.replace(/<iframe\b[^>]*>[\s\S]*?<\/iframe>/gi, "");
  out = out.replace(/<form\b/gi, '<form action="#"');
  out = out.replace(/type="submit"/gi, 'type="button"');

  return out;
}

function assertClean(html, file) {
  const forbidden = [
    "hari@",
    "GTM-",
    "+19093336812",
    "(909) 333-6812",
    "<script",
    'content="Hari"',
    "Hari Y",
    "G-L9S61",
    "6LdYOdgr",
  ];
  for (const token of forbidden) {
    if (html.toLowerCase().includes(token.toLowerCase())) {
      throw new Error(`${file} still contains ${token}`);
    }
  }
  if (/\bHari\b/.test(html)) {
    throw new Error(`${file} still contains the founder first name`);
  }
  if (!html.includes('name="robots" content="noindex, nofollow"')) {
    throw new Error(`${file} is missing a noindex robots meta`);
  }
}

const sourceStat = statSync(SOURCE, { throwIfNoEntry: false });
if (!sourceStat?.isDirectory()) {
  console.error(`Missing ${SOURCE}. Place the previous site's static export there and rerun.`);
  process.exit(1);
}

rmSync(DEST, { recursive: true, force: true });

const files = walk(SOURCE).filter((file) => shouldCopy(relative(SOURCE, file)));
let htmlCount = 0;

for (const file of files) {
  const rel = relative(SOURCE, file);
  const target = join(DEST, rel);
  mkdirSync(dirname(target), { recursive: true });

  if (rel.toLowerCase().endsWith(".html")) {
    let raw = readFileSync(file, "utf8");
    const overlay = join("tmp/hydrated", rel.split("\\").join("/").replace(/index\.html$/, "main.html"));
    if (existsSync(overlay)) {
      const inner = readFileSync(overlay, "utf8");
      const spliced = raw.replace(
        /<main\b[^>]*>[\s\S]*?<\/main>/,
        `<main class="flex-1">${inner}</main>`,
      );
      if (spliced === raw) throw new Error(`Could not splice main into ${rel}`);
      raw = spliced;
    }
    const html = sanitizeHtml(raw);
    assertClean(html, rel);
    writeFileSync(target, html);
    htmlCount += 1;
  } else {
    writeFileSync(target, readFileSync(file));
  }
}

console.log(`Archived ${htmlCount} HTML pages and ${files.length - htmlCount} assets to ${DEST}`);
