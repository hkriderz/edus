export type PricingTier = {
  id: string;
  name: string;
  /** Formatted price string, including the currency symbol. */
  price: string;
  priceNote: string;
  /** Numeric value, used to derive the LocalBusiness priceRange in JSON-LD. */
  priceValue: number;
  bestFor: string;
  summary: string;
  includes: readonly string[];
  /** Marks the recommended tier. Exactly one tier should set this. */
  featured: boolean;
  timeline: string;
};

/**
 * Prices are published deliberately. "Affordable" is a claim that means nothing
 * without numbers next to it, and a visitor who has to book a call to learn the
 * budget usually just leaves.
 */
export const pricingTiers: readonly PricingTier[] = [
  {
    id: "essential",
    name: "Essential",
    price: "$1,200",
    priceValue: 1200,
    priceNote: "one-time",
    bestFor: "Sole traders and new businesses who need a credible presence now",
    summary:
      "A focused one-page site that answers the four questions every customer has: what you do, where you are, what it costs, and how to reach you.",
    includes: [
      "Single long-form page, custom designed",
      "Mobile, tablet and desktop layouts",
      "Contact form with spam protection",
      "Google Business Profile setup",
      "Basic on-page SEO and analytics",
      "WCAG 2.2 AA accessibility pass",
      "30 days of post-launch support",
    ],
    featured: false,
    timeline: "2 weeks",
  },
  {
    id: "studio",
    name: "Studio",
    price: "$1,500",
    priceValue: 1500,
    priceNote: "one-time",
    bestFor: "Established local businesses with real services to explain",
    summary:
      "The tier most clients choose. A multi-page site with room for your services, your story and your proof, built on a structure that can grow.",
    includes: [
      "Everything in Essential",
      "Up to 6 custom pages",
      "Two distinct design directions to choose from",
      "Local SEO structure and schema markup",
      "Testimonial, gallery and FAQ sections",
      "Content structure workshop",
      "Training session and written handover",
      "90 days of post-launch support",
    ],
    featured: true,
    timeline: "3 – 4 weeks",
  },
  {
    id: "commerce",
    name: "Commerce",
    price: "$2,200",
    priceValue: 2200,
    priceNote: "one-time",
    bestFor: "Shops and studios selling products or taking bookings online",
    summary:
      "A full storefront or booking system, configured and tested with real transactions before anyone hands you the keys.",
    includes: [
      "Everything in Studio",
      "Storefront or booking system setup",
      "Product, variant and inventory structure",
      "Payments, tax and shipping configuration",
      "Order and abandoned-cart emails",
      "Staff training on a live order",
      "Operations runbook",
      "6 months of post-launch support",
    ],
    featured: false,
    timeline: "4 – 6 weeks",
  },
] as const;

export type CarePlan = {
  id: string;
  name: string;
  price: string;
  firstResponse: string;
  includes: readonly string[];
};

export const carePlans: readonly CarePlan[] = [
  {
    id: "care-standard",
    name: "Care",
    price: "$95 / month",
    firstResponse: "4 business hours",
    includes: [
      "Uptime monitoring and alerting",
      "Security and dependency updates",
      "Daily offsite backups",
      "1 hour of content edits per month",
      "Quarterly performance report",
    ],
  },
  {
    id: "care-plus",
    name: "Care Plus",
    price: "$185 / month",
    firstResponse: "1 hour, including outages",
    includes: [
      "Everything in Care",
      "4 hours of content and design edits per month",
      "Monthly SEO and Core Web Vitals review",
      "Priority queue for new feature work",
      "Direct phone line to your developer",
    ],
  },
] as const;

/** Derived so the JSON-LD priceRange can never drift from the published tiers. */
export const priceRange = (() => {
  const values = pricingTiers.map((tier) => tier.priceValue);
  return `$${Math.min(...values).toLocaleString("en-US")}-$${Math.max(...values).toLocaleString("en-US")}`;
})();

export const paymentTerms = [
  {
    heading: "Split into three",
    body: "A third to book the work, a third at design sign-off, a third on launch. No interest, no financing partner.",
  },
  {
    heading: "No surprise invoices",
    body: "The quote is the price. If scope genuinely changes we re-quote in writing before any work starts.",
  },
  {
    heading: "You own everything",
    body: "Code, domain, hosting account, analytics. If you leave, you take the whole site with you and we help you move it.",
  },
] as const;
