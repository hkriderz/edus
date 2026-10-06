/**
 * Decodes a CDP `Page.captureScreenshot` response into a PNG on disk.
 *
 * The browser tooling writes large CDP responses to a JSON file rather than
 * returning them inline, so capturing a true desktop-width screenshot is a
 * two-step process. This script is the second step.
 *
 * Usage: node scripts/decode-screenshot.mjs <cdp-response.json> <output.png>
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  console.error("Usage: node scripts/decode-screenshot.mjs <cdp-response.json> <output.png>");
  process.exit(1);
}

async function main() {
  const raw = await readFile(resolve(inputPath), "utf8");

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Could not parse ${inputPath} as JSON: ${error.message}`);
  }

  // The envelope shape has varied between tool versions, so probe the likely keys.
  const base64 = payload?.data ?? payload?.result?.data ?? payload?.response?.data;

  if (typeof base64 !== "string" || base64.length === 0) {
    throw new Error(`No screenshot data found in ${inputPath}. Top-level keys: ${Object.keys(payload ?? {}).join(", ")}`);
  }

  const target = resolve(outputPath);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, Buffer.from(base64, "base64"));

  const sizeKb = Math.round(Buffer.byteLength(base64, "base64") / 1024);
  console.log(`Wrote ${target} (${sizeKb} KB)`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
