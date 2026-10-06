export type PaletteSwatch = {
  name: string;
  /** CSS colour, used directly as an inline swatch background. */
  value: string;
  /** Set when the swatch is light enough to need dark label text. */
  lightText?: boolean;
};

export type CaseStudy = {
  slug: string;
  /** The fictional client. */
  brand: string;
  vertical: string;
  year: string;
  /** One-line positioning, used on cards. */
  tagline: string;
  /** Card and metadata description. */
  summary: string;
  /** The problem, in the client's words. */
  brief: readonly string[];
  /** What we did about it. */
  approach: readonly { heading: string; body: string }[];
  typography: { display: string; body: string; note: string };
  palette: readonly PaletteSwatch[];
  /** Concrete things built, not adjectives. */
  features: readonly string[];
  outcomes: readonly { metric: string; label: string }[];
  /** Live demo entry point. */
  demoHref: string;
  /** Pages built inside the demo, shown as a route list. */
  demoPages: readonly { label: string; href: string }[];
  /** Accent used for the card treatment on the work index. */
  cardAccent: string;
  cardSurface: string;
  cardInk: string;
  tier: string;
  /** Live-rail label. Defaults to a demonstration build. */
  liveKicker?: string;
  liveHeadline?: string;
  /** Brief-column heading. Defaults to the client-brief wording. */
  briefHeading?: string;
};

/**
 * Real captures of the finished demos, taken from the production export at a
 * 1440x900 layout viewport and written to public/work/<slug>/. These must match
 * the files on disk exactly: next/image uses them to reserve layout space, and
 * the case-study pages reuse them as Open Graph dimensions.
 */
export const SCREENSHOT_WIDTH = 1040;
export const SCREENSHOT_HEIGHT = 650;

/**
 * Paths are derived rather than stored per record, so adding a case study
 * cannot half-wire its imagery.
 */

export function screenshotPaths(slug: string) {
  return {
    home: `/work/${slug}/home.png`,
    detail: `/work/${slug}/detail.png`,
  };
}

/**
 * These are demonstration builds, not paid client engagements. Each one exists
 * as a real, navigable site under /demo/ so the portfolio shows working
 * software rather than screenshots of software. The `Demonstration build`
 * framing is repeated in the UI so nothing here reads as a false claim.
 */
export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "verde-and-vine",
    brand: "Verde & Vine",
    vertical: "Plant shop & garden café",
    year: "2026",
    tagline: "A plant shop that reads like a seed catalogue",
    summary:
      "A warm, botanical storefront for a neighbourhood plant shop with a café in the back — built around a care-level catalogue so customers buy the plant they can actually keep alive.",
    brief: [
      "Two businesses share one roof: a plant shop and a small café. The old site treated them as separate worlds and visitors could never tell whether they were allowed to just sit down with a coffee.",
      "Staff were answering the same three questions on the phone all day — is this plant hard to keep alive, does it survive a north-facing window, and are you open on Sundays.",
    ],
    approach: [
      {
        heading: "Catalogue structured around care, not species",
        body: "Every plant is filed by light requirement and difficulty first, Latin name second. The browse page leads with 'thrives in low light' rather than a taxonomy a customer has to translate.",
      },
      {
        heading: "One roof, one navigation",
        body: "Shop and café sit side by side in the nav with a shared visual language, so the site reads as a single place you can spend an afternoon in.",
      },
      {
        heading: "Editorial serif, generous measure",
        body: "A high-contrast serif and a wide text measure give the catalogue the feel of a printed seed guide — the reference the owners kept coming back to.",
      },
    ],
    typography: {
      display: "Young Serif",
      body: "Karla",
      note: "Young Serif has the chunky, slightly agricultural warmth of a printed seed guide; Karla keeps the care instructions legible at small sizes.",
    },
    palette: [
      { name: "Deep Forest", value: "oklch(32% 0.062 150)" },
      { name: "Moss", value: "oklch(52% 0.085 143)" },
      { name: "Cream", value: "oklch(95.5% 0.025 92)", lightText: true },
      { name: "Terracotta", value: "oklch(62% 0.13 46)" },
    ],
    features: [
      "Filterable catalogue with light and difficulty facets",
      "Care-guide panel on every plant card",
      "Café menu with daily bake listing",
      "Workshop schedule with capacity indicators",
      "Visit page with hours, parking and transit notes",
    ],
    outcomes: [
      { metric: "4", label: "Pages built" },
      { metric: "12", label: "Catalogue entries" },
      { metric: "0", label: "Images required" },
    ],
    demoHref: "/demo/verde-and-vine/",
    demoPages: [
      { label: "Home", href: "/demo/verde-and-vine/" },
      { label: "Catalogue", href: "/demo/verde-and-vine/catalogue/" },
      { label: "Café", href: "/demo/verde-and-vine/cafe/" },
      { label: "Visit", href: "/demo/verde-and-vine/visit/" },
    ],
    cardAccent: "oklch(62% 0.13 46)",
    cardSurface: "oklch(32% 0.062 150)",
    cardInk: "oklch(95.5% 0.025 92)",
    tier: "Studio",
  },
  {
    slug: "northside-barbell",
    brand: "Northside Barbell",
    vertical: "Strength & conditioning gym",
    year: "2026",
    tagline: "No mirrors, no excuses, no soft shadows",
    summary:
      "An unapologetically brutalist site for a barbell gym — oversized condensed type, a hard grid, and a schedule you can read at arm's length from a squat rack.",
    brief: [
      "The gym's identity is deliberately severe: concrete floors, chalk, no mirrors. The previous site looked like a wellness spa and was attracting the wrong enquiries entirely.",
      "Members check the class schedule on a phone, mid-session, sweating. Legibility at a glance mattered more than anything decorative.",
    ],
    approach: [
      {
        heading: "Brutalism as an accurate description",
        body: "Hard 1px rules, zero border radius, no shadows, safety-orange on near-black. The design is severe because the gym is severe — it filters enquiries before anyone picks up the phone.",
      },
      {
        heading: "Schedule built for a sweaty thumb",
        body: "The weekly timetable is a single scannable table with oversized numerals, 48px touch targets, and capacity shown as a filled bar rather than a number you have to interpret.",
      },
      {
        heading: "Numbers as the dominant visual",
        body: "Total tonnage lifted, coach certifications, session counts. Condensed display numerals at display sizes carry the whole page — no stock gym photography anywhere.",
      },
    ],
    typography: {
      display: "Archivo Black",
      body: "Archivo",
      note: "One family, two extremes of weight. The monospaced metadata labels come from JetBrains Mono to reinforce the engineered, utilitarian register.",
    },
    palette: [
      { name: "Pitch", value: "oklch(16% 0.004 250)" },
      { name: "Safety Orange", value: "oklch(68% 0.192 48)" },
      { name: "Concrete", value: "oklch(72% 0.006 250)", lightText: true },
      { name: "Chalk", value: "oklch(96% 0.002 250)", lightText: true },
    ],
    features: [
      "Weekly class timetable with capacity bars",
      "Coach roster with certification listings",
      "Membership comparison with no hidden tiers",
      "Scrolling marquee of gym records",
      "Trial-session enquiry form",
    ],
    outcomes: [
      { metric: "4", label: "Pages built" },
      { metric: "28", label: "Timetable slots" },
      { metric: "AA", label: "Contrast on orange" },
    ],
    demoHref: "/demo/northside-barbell/",
    demoPages: [
      { label: "Home", href: "/demo/northside-barbell/" },
      { label: "Schedule", href: "/demo/northside-barbell/schedule/" },
      { label: "Coaches", href: "/demo/northside-barbell/coaches/" },
      { label: "Membership", href: "/demo/northside-barbell/membership/" },
    ],
    cardAccent: "oklch(68% 0.192 48)",
    cardSurface: "oklch(16% 0.004 250)",
    cardInk: "oklch(96% 0.002 250)",
    tier: "Studio",
  },
  {
    slug: "rosalia",
    brand: "Rosalía",
    vertical: "Modern Mexican restaurant",
    year: "2026",
    tagline: "The menu is the hero, so the menu is the typography",
    summary:
      "A magazine-grade restaurant site where the menu is set as editorial typography rather than trapped in a PDF — plus a reservation flow that works on a phone in a parking lot.",
    brief: [
      "The menu lived in a PDF. On a phone it was a pinch-and-zoom nightmare, it was invisible to search engines, and updating a single price meant emailing a designer.",
      "The kitchen changes dishes weekly. Anything that made updates expensive was going to be abandoned within a month.",
    ],
    approach: [
      {
        heading: "Menu as structured content",
        body: "Every dish is a typed record with name, description, price and dietary flags. It renders as editorial type on the page, is readable by search engines, and a price change is a one-line edit.",
      },
      {
        heading: "Display serif at magazine scale",
        body: "Dish names are set large enough to read across a table. Section dividers use a single hairline rule and a mono label, borrowing the restraint of a printed menu.",
      },
      {
        heading: "Reservation flow without a login",
        body: "Party size, date and time in three taps, with no account creation. The form validates client-side and states its confirmation window explicitly.",
      },
    ],
    typography: {
      display: "Playfair Display",
      body: "Source Sans 3",
      note: "A high-contrast didone-adjacent serif for dish names, with a humanist sans carrying the descriptions and dietary notes.",
    },
    palette: [
      { name: "Cochineal", value: "oklch(44% 0.165 22)" },
      { name: "Clay", value: "oklch(64% 0.11 44)" },
      { name: "Bone", value: "oklch(94% 0.016 80)", lightText: true },
      { name: "Charred", value: "oklch(22% 0.028 30)" },
    ],
    features: [
      "Four-section menu with dietary flags and prices",
      "Reservation form with party size and sitting selection",
      "Story page with the kitchen's sourcing notes",
      "Private-dining enquiry section",
      "Hours and location block with transit directions",
    ],
    outcomes: [
      { metric: "4", label: "Pages built" },
      { metric: "26", label: "Menu items as data" },
      { metric: "3", label: "Taps to reserve" },
    ],
    demoHref: "/demo/rosalia/",
    demoPages: [
      { label: "Home", href: "/demo/rosalia/" },
      { label: "Menu", href: "/demo/rosalia/menu/" },
      { label: "Story", href: "/demo/rosalia/story/" },
      { label: "Reservations", href: "/demo/rosalia/reservations/" },
    ],
    cardAccent: "oklch(64% 0.11 44)",
    cardSurface: "oklch(44% 0.165 22)",
    cardInk: "oklch(94% 0.016 80)",
    tier: "Studio",
  },
  {
    slug: "meridian-dental",
    brand: "Meridian Dental",
    vertical: "Family dental practice",
    year: "2026",
    tagline: "Built for the most anxious person who will ever visit",
    summary:
      "A deliberately calm, accessibility-first practice site — the quiet counterpoint to the rest of this portfolio, designed around dental anxiety and a bento grid of plainly-priced services.",
    brief: [
      "Roughly a third of patients delay appointments out of anxiety. The old site's stock imagery of gleaming instruments was actively making that worse.",
      "Patients could not find out what anything cost, so the front desk fielded price questions all day and new patients went elsewhere.",
    ],
    approach: [
      {
        heading: "Anxiety-aware content order",
        body: "What happens at a first visit comes before credentials or technology. Every procedure page states duration, what you will feel, and the price up front.",
      },
      {
        heading: "A calm palette and a lot of air",
        body: "Soft cyan on near-white, generous whitespace, nothing clinical or sharp. The restraint is the design decision — this is the one site in the portfolio that should not shout.",
      },
      {
        heading: "Accessibility treated as a requirement",
        body: "A 4.5:1 minimum on every text pairing, full keyboard operability, semantic landmarks throughout, and a booking form that never relies on colour alone to convey state.",
      },
    ],
    typography: {
      display: "Outfit",
      body: "Outfit",
      note: "A single geometric sans across the whole site. In a healthcare context, typographic consistency reads as competence; contrast reads as marketing.",
    },
    palette: [
      { name: "Meridian Cyan", value: "oklch(58% 0.098 218)" },
      { name: "Slate", value: "oklch(38% 0.028 240)" },
      { name: "Mist", value: "oklch(96.5% 0.012 215)", lightText: true },
      { name: "Signal Green", value: "oklch(58% 0.112 155)" },
    ],
    features: [
      "Bento grid of services with prices stated plainly",
      "First-visit walkthrough written for anxious patients",
      "Clinician profiles with qualifications and languages spoken",
      "Appointment request form with accessible validation",
      "Insurance and payment-plan explainer",
    ],
    outcomes: [
      { metric: "4", label: "Pages built" },
      { metric: "4.5:1", label: "Minimum contrast" },
      { metric: "100%", label: "Keyboard operable" },
    ],
    demoHref: "/demo/meridian-dental/",
    demoPages: [
      { label: "Home", href: "/demo/meridian-dental/" },
      { label: "Services", href: "/demo/meridian-dental/services/" },
      { label: "Team", href: "/demo/meridian-dental/team/" },
      { label: "Book", href: "/demo/meridian-dental/book/" },
    ],
    cardAccent: "oklch(58% 0.098 218)",
    cardSurface: "oklch(96.5% 0.012 215)",
    cardInk: "oklch(30% 0.03 240)",
    tier: "Studio",
  },
  {
    slug: "fathom-coffee",
    brand: "Fathom Coffee Roasters",
    vertical: "Specialty coffee e-commerce",
    year: "2026",
    tagline: "A storefront with a working cart and no backend at all",
    summary:
      "A boutique roastery store with a real product catalogue, grind-and-size variant selection, and a functioning cart drawer — all running client-side with no server.",
    brief: [
      "Customers abandoned checkout because grind selection was buried on a second screen, and the bag size was a dropdown nobody noticed.",
      "The roastery wanted the site to explain origin and tasting notes with the seriousness of a wine list, without turning the shop into a reading exercise.",
    ],
    approach: [
      {
        heading: "Variant selection in the open",
        body: "Grind and bag size are visible buttons on the product page, with the price updating live. Nothing is hidden behind a dropdown and nothing is a surprise at checkout.",
      },
      {
        heading: "A cart that genuinely works",
        body: "Line items, quantity changes, removals and a running subtotal, backed by a reducer and persisted to sessionStorage. It is demonstrably functional while still being a static site with no server.",
      },
      {
        heading: "Origin notes as the editorial layer",
        body: "Altitude, process, varietal and tasting notes are set as a typographic data block — the seriousness of a wine list, in a tenth of the words.",
      },
    ],
    typography: {
      display: "Spectral",
      body: "IBM Plex Sans",
      note: "A literary serif for origin storytelling, with IBM Plex Sans handling product data where its figures stay unambiguous.",
    },
    palette: [
      { name: "Ink Navy", value: "oklch(27% 0.055 255)" },
      { name: "Copper", value: "oklch(64% 0.128 56)" },
      { name: "Paper", value: "oklch(95.5% 0.014 86)", lightText: true },
      { name: "Sea Glass", value: "oklch(72% 0.068 190)", lightText: true },
    ],
    features: [
      "Six-product catalogue with origin metadata",
      "Product page with live-priced grind and size variants",
      "Working cart drawer with quantity and removal",
      "Cart persistence across page navigation",
      "Subscription explainer with cadence options",
    ],
    outcomes: [
      { metric: "4", label: "Pages built" },
      { metric: "6", label: "Products with variants" },
      { metric: "0", label: "Server calls" },
    ],
    demoHref: "/demo/fathom-coffee/",
    demoPages: [
      { label: "Home", href: "/demo/fathom-coffee/" },
      { label: "Shop", href: "/demo/fathom-coffee/shop/" },
      { label: "Product", href: "/demo/fathom-coffee/shop/ardent-house-blend/" },
      { label: "Cart", href: "/demo/fathom-coffee/cart/" },
    ],
    cardAccent: "oklch(64% 0.128 56)",
    cardSurface: "oklch(27% 0.055 255)",
    cardInk: "oklch(95.5% 0.014 86)",
    tier: "Commerce",
  },
  {
    slug: "near-me-web-designs",
    brand: "Near Me Web Designs",
    vertical: "Previous studio site",
    year: "2025",
    tagline: "The site this studio replaced, kept as a working archive",
    summary:
      "The previous marketing site for Near Me Web Designs, preserved as static pages you can still click through. Contact names, email, and phone on the archive are placeholders.",
    brief: [
      "Before EDUS Media, the studio published as Near Me Web Designs: a Rancho Cucamonga marketing site with services, a portfolio, and a contact page.",
      "The export still uses the old visual system — Geist, violet on white, a conventional marketing layout — which is exactly why it stays in the portfolio. It shows the starting point, not another invented client.",
    ],
    approach: [
      {
        heading: "Served as pages, not a second app",
        body: "The old Next.js export expected to live at the domain root. It is republished under /archive/ so its assets do not collide with this site, and each link is a full page load.",
      },
      {
        heading: "Contact identity replaced",
        body: "The archive still says Near Me Web Designs and Rancho Cucamonga. The person's name, email address, and phone number are placeholders, and the old analytics container is not loaded.",
      },
      {
        heading: "Kept out of the search index",
        body: "Every archived page is noindex, and robots.txt disallows /archive/. The case study is the page we want found. The old site is a reference, not a duplicate.",
      },
    ],
    typography: {
      display: "Geist",
      body: "Geist",
      note: "The previous site used Geist for both headings and body, with Geist Mono for small labels — a conventional product-marketing pairing, unlike the five demonstration builds.",
    },
    palette: [
      { name: "Violet", value: "oklch(52% 0.22 300)" },
      { name: "Ink", value: "oklch(21% 0.02 280)" },
      { name: "Paper", value: "oklch(99% 0.002 280)", lightText: true },
      { name: "Slate", value: "oklch(55% 0.02 270)", lightText: true },
    ],
    features: [
      "Home, about, portfolio, services, and contact as static pages",
      "Four service pages from the previous site",
      "Contact name, email, and phone replaced with placeholders",
      "Analytics container removed",
      "noindex on every archived page",
    ],
    outcomes: [
      { metric: "14", label: "Archived HTML pages" },
      { metric: "0", label: "Analytics tags" },
      { metric: "0", label: "Real contact details" },
    ],
    demoHref: "/archive/near-me-web-designs/",
    demoPages: [
      { label: "Home", href: "/archive/near-me-web-designs/" },
      { label: "About", href: "/archive/near-me-web-designs/about/" },
      { label: "Portfolio", href: "/archive/near-me-web-designs/portfolio/" },
      { label: "Services", href: "/archive/near-me-web-designs/services/" },
      { label: "Contact", href: "/archive/near-me-web-designs/contact/" },
    ],
    cardAccent: "oklch(52% 0.22 300)",
    cardSurface: "oklch(21% 0.02 280)",
    cardInk: "oklch(99% 0.002 280)",
    tier: "Archive",
    liveKicker: "Previous studio site",
    liveHeadline: "Contact names and numbers on this archive are placeholders.",
    briefHeading: "Where this one came from.",
  },
] as const;

export const caseStudySlugs = caseStudies.map((study) => study.slug);

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

/** Previous/next navigation at the foot of each case study. */
export function getAdjacentCaseStudies(slug: string) {
  const index = caseStudies.findIndex((study) => study.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };
  return {
    previous: index > 0 ? caseStudies[index - 1] : caseStudies[caseStudies.length - 1],
    next: index < caseStudies.length - 1 ? caseStudies[index + 1] : caseStudies[0],
  };
}
