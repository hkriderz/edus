export type Grind = "Whole bean" | "Filter" | "Espresso" | "Cafetière";
export type BagSize = "250g" | "500g" | "1kg";

export type Product = {
  slug: string;
  name: string;
  origin: string;
  producer: string;
  /** Base price in cents for the 250g bag. Integer arithmetic avoids float drift. */
  basePriceCents: number;
  roast: "Light" | "Medium" | "Medium-dark";
  process: string;
  varietal: string;
  altitude: string;
  tastingNotes: readonly string[];
  description: string;
  /** Rendered as the product's colour field, since there is no photography. */
  hue: string;
};

/** Multipliers applied to the 250g base price. */
export const bagSizeMultipliers: Record<BagSize, number> = {
  "250g": 1,
  "500g": 1.85,
  "1kg": 3.4,
};

export const grinds: readonly Grind[] = ["Whole bean", "Filter", "Espresso", "Cafetière"];
export const bagSizes: readonly BagSize[] = ["250g", "500g", "1kg"];

export const products: readonly Product[] = [
  {
    slug: "ardent-house-blend",
    name: "Ardent",
    origin: "Brazil & Colombia",
    producer: "House blend",
    basePriceCents: 1600,
    roast: "Medium",
    process: "Washed & natural",
    varietal: "Catuaí, Caturra",
    altitude: "1,100 – 1,750 m",
    tastingNotes: ["Milk chocolate", "Toasted almond", "Red apple"],
    description:
      "The bag we sell most of, and the one we would put in your hand if you asked us to just pick something. Sweet, round and forgiving of a slightly careless brew — it does not punish you for using a kettle straight off the boil.",
    hue: "oklch(52% 0.09 48)",
  },
  {
    slug: "cordillera-huila",
    name: "Cordillera",
    origin: "Huila, Colombia",
    producer: "Finca La Esperanza",
    basePriceCents: 1950,
    roast: "Light",
    process: "Washed",
    varietal: "Pink Bourbon",
    altitude: "1,850 m",
    tastingNotes: ["Nectarine", "Jasmine", "Brown sugar"],
    description:
      "Pink Bourbon from a single farm at 1,850 metres. Floral in a way that surprises people who think they do not like fruity coffee. Best as filter; it is thin and awkward as espresso and we would rather say so.",
    hue: "oklch(62% 0.1 92)",
  },
  {
    slug: "kirinyaga-ab",
    name: "Kirinyaga AB",
    origin: "Kirinyaga, Kenya",
    producer: "Kiangoi Factory",
    basePriceCents: 2200,
    roast: "Light",
    process: "Washed, 72-hour fermentation",
    varietal: "SL28, SL34, Ruiru 11",
    altitude: "1,700 m",
    tastingNotes: ["Blackcurrant", "Grapefruit", "Cane sugar"],
    description:
      "The most acidic thing we roast, and the most polarising. Blackcurrant so pronounced that first-time drinkers assume something has been added. Nothing has. Brew it slightly cooler than you think.",
    hue: "oklch(48% 0.14 18)",
  },
  {
    slug: "kayanza-honey",
    name: "Kayanza Honey",
    origin: "Kayanza, Burundi",
    producer: "Nemba Washing Station",
    basePriceCents: 2050,
    roast: "Medium",
    process: "Honey",
    varietal: "Red Bourbon",
    altitude: "1,780 m",
    tastingNotes: ["Dried fig", "Praline", "Black tea"],
    description:
      "Honey-processed, so some fruit mucilage is left on the bean during drying. The result sits between a washed and a natural coffee: sweeter and heavier than the former, cleaner than the latter.",
    hue: "oklch(56% 0.08 68)",
  },
  {
    slug: "sumatra-blue-batak",
    name: "Blue Batak",
    origin: "North Sumatra, Indonesia",
    producer: "Lintong smallholders",
    basePriceCents: 1850,
    roast: "Medium-dark",
    process: "Wet-hulled",
    varietal: "Typica, Bourbon",
    altitude: "1,400 m",
    tastingNotes: ["Cedar", "Dark cocoa", "Tobacco leaf"],
    description:
      "Wet-hulled and unmistakably Sumatran: earthy, syrupy, almost savoury. Low acidity makes it the one bag that works for people who find most specialty coffee too sharp. Excellent in a cafetière.",
    hue: "oklch(38% 0.04 160)",
  },
  {
    slug: "decaf-cerrado",
    name: "Cerrado Decaf",
    origin: "Cerrado, Brazil",
    producer: "Sugarcane EA process",
    basePriceCents: 1750,
    roast: "Medium",
    process: "Sugarcane ethyl acetate",
    varietal: "Mundo Novo",
    altitude: "1,050 m",
    tastingNotes: ["Hazelnut", "Caramel", "Baked pear"],
    description:
      "Decaffeinated with sugarcane-derived ethyl acetate rather than solvents. We taste it blind against the caffeinated lots every month, and it holds its own, which is not something we could say about the last three decafs we trialled.",
    hue: "oklch(60% 0.05 108)",
  },
] as const;

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Price in cents for a given product and bag size. */
export function priceForSize(product: Product, size: BagSize): number {
  return Math.round(product.basePriceCents * bagSizeMultipliers[size]);
}

export function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

export const subscriptionCadences = [
  { label: "Every week", value: "weekly", discount: "15% off" },
  { label: "Every two weeks", value: "fortnightly", discount: "12% off" },
  { label: "Every month", value: "monthly", discount: "10% off" },
] as const;
