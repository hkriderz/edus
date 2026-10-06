export type Service = {
  slug: string;
  name: string;
  /** Shown in nav, cards and metadata. One sentence, no marketing padding. */
  summary: string;
  /** Opening paragraph on the detail page. */
  intro: string;
  /** Short mono label used in the index grid. */
  index: string;
  deliverables: readonly string[];
  process: readonly { step: string; detail: string }[];
  /** Honest answer to "what this is not", which pre-empts mismatched leads. */
  notIncluded: readonly string[];
  startingAt: string;
  timeline: string;
};

export const services: readonly Service[] = [
  {
    slug: "web-design",
    name: "Web Design & Development",
    index: "01",
    summary: "Custom sites designed and hand-built for your business, not assembled from a template.",
    intro:
      "Every EDUS site starts as a blank page and a conversation about what your business actually needs to say. We design in the browser, build with modern tooling, and hand over something you own outright — no page-builder lock-in and no monthly licence to keep it running.",
    deliverables: [
      "Custom design across mobile, tablet and desktop",
      "Hand-built front end — no page-builder bloat",
      "Content structure written with you, not guessed at",
      "Accessibility pass against WCAG 2.2 AA",
      "Core Web Vitals in the green on launch day",
      "Analytics, contact forms and spam protection wired up",
      "Training session and a written handover doc",
    ],
    process: [
      {
        step: "Conversation",
        detail:
          "An hour on a call or at your counter. We want to hear how customers find you today and where it breaks down.",
      },
      {
        step: "Direction",
        detail:
          "Two distinct design directions, shown as real pages in a browser rather than flat mockups. You pick one.",
      },
      {
        step: "Build",
        detail:
          "We build on a staging URL you can watch progress on daily. Feedback happens in comments, not twelve-email threads.",
      },
      {
        step: "Launch",
        detail:
          "We handle DNS, SSL, redirects from your old URLs and search-console setup. You keep every credential.",
      },
    ],
    notIncluded: [
      "Ongoing content writing beyond launch copy",
      "Logo and full brand identity design — we partner out for this",
      "Custom photography or video production",
    ],
    startingAt: "$1,200",
    timeline: "3 – 5 weeks",
  },
  {
    slug: "seo-optimization",
    name: "SEO Optimization",
    index: "02",
    summary: "Get found by the people already searching for what you do, a few miles away.",
    intro:
      "Local search is not a mystery and it is not a subscription you need forever. We fix the technical foundations, structure your pages around the terms people in your area actually type, and hand you a plan you can keep running yourself.",
    deliverables: [
      "Technical audit: crawlability, indexing, redirects, Core Web Vitals",
      "Keyword research grounded in local search volume",
      "On-page structure: titles, headings, internal links, schema",
      "Google Business Profile setup and optimisation",
      "Local citation and directory consistency check",
      "Search Console and analytics dashboards you can read",
      "A written 90-day action plan in plain language",
    ],
    process: [
      {
        step: "Audit",
        detail:
          "We crawl your current site and benchmark it against the three competitors ranking above you.",
      },
      {
        step: "Fix",
        detail:
          "Technical blockers first — nothing else matters if search engines cannot read your pages properly.",
      },
      {
        step: "Structure",
        detail:
          "We rewrite page structure and metadata around intent, then add the structured data that earns rich results.",
      },
      {
        step: "Measure",
        detail:
          "A baseline report, then a follow-up at 60 days so you can see what moved and what did not.",
      },
    ],
    notIncluded: [
      "Paid search management — we will refer you to someone good",
      "Link buying or any tactic that risks a penalty",
      "Guaranteed rankings, which nobody can honestly promise",
    ],
    startingAt: "$650",
    timeline: "2 – 3 weeks",
  },
  {
    slug: "ecommerce-setup",
    name: "E-Commerce Setup",
    index: "03",
    summary: "Sell online with a storefront you can run yourself on a Tuesday afternoon.",
    intro:
      "Most small shops do not need a bespoke commerce platform. They need a clean catalogue, a checkout that works on a phone, and an admin screen a human being can understand. We set that up properly and teach you to run it.",
    deliverables: [
      "Platform selection based on your catalogue and margins",
      "Storefront design matched to your brand",
      "Product, variant and inventory structure set up correctly",
      "Payments, tax and shipping rules configured and tested",
      "Abandoned-cart and order-confirmation emails",
      "Staff training on fulfilling a real order end to end",
      "A written runbook for the things that go wrong",
    ],
    process: [
      {
        step: "Catalogue",
        detail:
          "We map your products, options and inventory before touching design. Bad product structure is expensive to undo.",
      },
      {
        step: "Storefront",
        detail: "Design and build the browse, product and checkout experience, mobile first.",
      },
      {
        step: "Plumbing",
        detail:
          "Payments, tax, shipping zones and receipts — all tested with real transactions before launch.",
      },
      {
        step: "Handover",
        detail: "We walk your team through a live order, then hand over the runbook and the keys.",
      },
    ],
    notIncluded: [
      "Warehouse or ERP integration work",
      "Product photography and copywriting for large catalogues",
      "Ongoing merchandising and promotions management",
    ],
    startingAt: "$2,200",
    timeline: "4 – 6 weeks",
  },
  {
    slug: "website-maintenance",
    name: "Website Care & Support",
    index: "04",
    summary: "Guaranteed response times in writing, so a broken site is never your emergency alone.",
    intro:
      "This is the part most studios treat as an afterthought. Our care plan has response times written into the agreement, not implied in a sales call. If something breaks, you message one person and get an answer — not a ticket number.",
    deliverables: [
      "Guaranteed first response: 4 business hours, 1 hour for outages",
      "Uptime monitoring with alerts going to us, not to you",
      "Dependency, security and platform updates applied and tested",
      "Daily offsite backups with a tested restore path",
      "Monthly content and copy edits included",
      "A quarterly performance and accessibility check",
      "A plain-English monthly summary of what we did",
    ],
    process: [
      {
        step: "Baseline",
        detail: "We document the current stack, hosting, credentials and known weak points.",
      },
      {
        step: "Monitor",
        detail:
          "Uptime, certificate expiry and Core Web Vitals are watched continuously. We find out before your customers do.",
      },
      {
        step: "Maintain",
        detail: "Updates are applied on staging, verified, then promoted. Never straight to production.",
      },
      {
        step: "Report",
        detail: "One short monthly email: what changed, what we fixed, what needs a decision from you.",
      },
    ],
    notIncluded: [
      "New feature development — quoted separately, at a client rate",
      "Third-party software licences and hosting fees",
      "Support for sites we did not build, until we have audited them",
    ],
    startingAt: "$95 / month",
    timeline: "Ongoing, cancel any time",
  },
] as const;

export const serviceSlugs = services.map((service) => service.slug);

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
