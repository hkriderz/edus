/**
 * Single source of truth for brand and contact details.
 *
 * Every value is sourced from a NEXT_PUBLIC_* environment variable so nothing
 * operational is hardcoded in components. Unset values fall back to an
 * obviously-wrong `REPLACE_ME__` sentinel rather than a plausible-looking
 * default, so a misconfigured deploy fails loudly in review instead of
 * shipping someone else's phone number.
 *
 * See `.env.example` for the full list. Note these are inlined at BUILD time.
 */

const PLACEHOLDER_PREFIX = "REPLACE_ME__";

function readEnv(value: string | undefined, name: string): string {
  const trimmed = value?.trim();
  if (trimmed) return trimmed;
  return `${PLACEHOLDER_PREFIX}${name}`;
}

/** True when a config value was never supplied. Used to gate UI and warnings. */
export function isPlaceholder(value: string): boolean {
  return value.startsWith(PLACEHOLDER_PREFIX);
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://edusdesigns.com").replace(/\/+$/, "");

export const siteConfig = {
  name: "EDUS Media",
  shortName: "EDUS",
  tagline: "Exceptional Designs for Us",
  description:
    "EDUS Media is a community-focused web design studio. Studio-quality websites at a price local businesses can actually afford, with support guaranteed in writing.",

  url: siteUrl,

  email: readEnv(process.env.NEXT_PUBLIC_CONTACT_EMAIL, "CONTACT_EMAIL"),
  /** E.164, for tel: hrefs. */
  phone: readEnv(process.env.NEXT_PUBLIC_CONTACT_PHONE, "CONTACT_PHONE"),
  /** Formatted for display. */
  phoneDisplay: readEnv(process.env.NEXT_PUBLIC_CONTACT_PHONE_DISPLAY, "CONTACT_PHONE_DISPLAY"),

  address: {
    city: readEnv(process.env.NEXT_PUBLIC_CONTACT_CITY, "CONTACT_CITY"),
    region: readEnv(process.env.NEXT_PUBLIC_CONTACT_REGION, "CONTACT_REGION"),
    country: readEnv(process.env.NEXT_PUBLIC_CONTACT_COUNTRY, "CONTACT_COUNTRY"),
  },

  hours: [
    { days: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
    { days: "Saturday", time: "10:00 AM – 4:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],

  /** Blank when unset — the contact form and GTM both no-op rather than guess. */
  formspreeId: process.env.NEXT_PUBLIC_FORMSPREE_ID?.trim() ?? "",
  gtmId: process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() ?? "",

  founder: "Hari",
  foundedYear: 2020,
  /** Fixed at source so the footer cannot hydrate with a different year. */
  copyrightYear: 2026,
} as const;

export const siteLocation = `${siteConfig.address.city}, ${siteConfig.address.region}`;

export function absoluteUrl(path: string): string {
  const normalised = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${normalised}`;
}

/**
 * Warn once, at build time only, about unconfigured values. Kept out of the
 * browser bundle guard so it surfaces in CI logs where someone will read it.
 */
if (process.env.NODE_ENV !== "production" && typeof window === "undefined") {
  const missing = [
    ["NEXT_PUBLIC_CONTACT_EMAIL", siteConfig.email],
    ["NEXT_PUBLIC_CONTACT_PHONE", siteConfig.phone],
    ["NEXT_PUBLIC_CONTACT_CITY", siteConfig.address.city],
  ]
    .filter(([, value]) => isPlaceholder(value as string))
    .map(([name]) => name);

  if (missing.length > 0) {
    console.warn(
      `[edus-designs] Unset contact configuration: ${missing.join(", ")}. ` +
        `Copy .env.example to .env.local and fill these in.`,
    );
  }
}
