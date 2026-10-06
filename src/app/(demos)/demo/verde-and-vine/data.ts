export type Light = "Low light" | "Bright indirect" | "Full sun";
export type Difficulty = "Forgiving" | "Needs a routine" | "For the devoted";

export type Plant = {
  slug: string;
  name: string;
  latin: string;
  price: string;
  light: Light;
  difficulty: Difficulty;
  water: string;
  petSafe: boolean;
  /** One line a staff member would actually say at the counter. */
  note: string;
};

/**
 * Filed by light and difficulty first, Latin name second — the structural
 * decision the case study describes. The browse page leads with "thrives in low
 * light" rather than a taxonomy the customer has to translate.
 */
export const plants: readonly Plant[] = [
  {
    slug: "zz-plant",
    name: "ZZ Plant",
    latin: "Zamioculcas zamiifolia",
    price: "$28",
    light: "Low light",
    difficulty: "Forgiving",
    water: "Every 3 weeks",
    petSafe: false,
    note: "Survives a north-facing hallway and a fortnight away. The one we give to people who have killed three plants already.",
  },
  {
    slug: "cast-iron-plant",
    name: "Cast Iron Plant",
    latin: "Aspidistra elatior",
    price: "$34",
    light: "Low light",
    difficulty: "Forgiving",
    water: "Every 2–3 weeks",
    petSafe: true,
    note: "Named accurately. Tolerates draughts, dim corners and benign neglect, and it is safe around cats.",
  },
  {
    slug: "pothos-marble-queen",
    name: "Marble Queen Pothos",
    latin: "Epipremnum aureum",
    price: "$18",
    light: "Low light",
    difficulty: "Forgiving",
    water: "Weekly",
    petSafe: false,
    note: "Trails happily off a shelf. Cuttings root in a glass of water, so one plant becomes gifts for your whole street.",
  },
  {
    slug: "snake-plant-laurentii",
    name: "Snake Plant 'Laurentii'",
    latin: "Dracaena trifasciata",
    price: "$24",
    light: "Low light",
    difficulty: "Forgiving",
    water: "Every 3–4 weeks",
    petSafe: false,
    note: "The most common cause of death is kindness. Water it less than you think and it will outlive your lease.",
  },
  {
    slug: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    latin: "Monstera deliciosa",
    price: "$46",
    light: "Bright indirect",
    difficulty: "Needs a routine",
    water: "Weekly",
    petSafe: false,
    note: "Give it a moss pole and it will reward you with the split leaves it is famous for. Without support it sprawls.",
  },
  {
    slug: "rubber-plant",
    name: "Rubber Plant",
    latin: "Ficus elastica",
    price: "$42",
    light: "Bright indirect",
    difficulty: "Needs a routine",
    water: "Weekly",
    petSafe: false,
    note: "Hates being moved. Pick its spot carefully, then leave it alone and wipe the leaves once a month.",
  },
  {
    slug: "bird-of-paradise",
    name: "Bird of Paradise",
    latin: "Strelitzia nicolai",
    price: "$88",
    light: "Full sun",
    difficulty: "Needs a routine",
    water: "Twice weekly in summer",
    petSafe: false,
    note: "The biggest thing we sell. It wants a south window and a lot of water, and it will fill a corner within a year.",
  },
  {
    slug: "string-of-pearls",
    name: "String of Pearls",
    latin: "Curio rowleyanus",
    price: "$22",
    light: "Full sun",
    difficulty: "For the devoted",
    water: "Every 2 weeks, sparingly",
    petSafe: false,
    note: "Beautiful and genuinely fussy. Overwatering is fatal within days. We will only sell you one if you ask twice.",
  },
  {
    slug: "maidenhair-fern",
    name: "Maidenhair Fern",
    latin: "Adiantum raddianum",
    price: "$26",
    light: "Bright indirect",
    difficulty: "For the devoted",
    water: "Keep constantly damp",
    petSafe: true,
    note: "Wants bathroom humidity and will crisp overnight if it dries out once. Stunning, high maintenance, pet safe.",
  },
  {
    slug: "calathea-orbifolia",
    name: "Calathea Orbifolia",
    latin: "Goeppertia orbifolia",
    price: "$38",
    light: "Bright indirect",
    difficulty: "For the devoted",
    water: "Twice weekly, filtered",
    petSafe: true,
    note: "Tap water browns the leaf edges. Use filtered or rainwater and it stays spectacular.",
  },
  {
    slug: "olive-tree",
    name: "Dwarf Olive Tree",
    latin: "Olea europaea",
    price: "$64",
    light: "Full sun",
    difficulty: "Needs a routine",
    water: "Weekly, drain well",
    petSafe: true,
    note: "Wants the brightest window you own and a terracotta pot that breathes. Will sulk anywhere dimmer.",
  },
  {
    slug: "spider-plant",
    name: "Spider Plant",
    latin: "Chlorophytum comosum",
    price: "$14",
    light: "Bright indirect",
    difficulty: "Forgiving",
    water: "Weekly",
    petSafe: true,
    note: "Cheapest, toughest, pet safe, and it makes babies you can pot up. The best first plant there is.",
  },
] as const;

export const lightLevels: readonly Light[] = ["Low light", "Bright indirect", "Full sun"];
export const difficulties: readonly Difficulty[] = [
  "Forgiving",
  "Needs a routine",
  "For the devoted",
];

export type CafeItem = {
  name: string;
  description: string;
  price: string;
};

export const cafeMenu: readonly { section: string; items: readonly CafeItem[] }[] = [
  {
    section: "Coffee & tea",
    items: [
      { name: "Filter", description: "Rotating single origin, brewed by the batch", price: "$3.50" },
      { name: "Flat white", description: "House espresso, whole or oat milk", price: "$4.75" },
      { name: "Cortado", description: "Double shot, cut short", price: "$4.25" },
      { name: "Nettle & mint tisane", description: "From the herb beds out back", price: "$4.00" },
      { name: "Iced hibiscus", description: "Cold-steeped overnight, no sugar", price: "$4.50" },
    ],
  },
  {
    section: "From the oven",
    items: [
      { name: "Rosemary & olive oil cake", description: "Rosemary cut from the front planter", price: "$5.00" },
      { name: "Seeded sourdough toast", description: "Cultured butter, flaked salt", price: "$4.50" },
      { name: "Cardamom bun", description: "Baked at six, usually gone by eleven", price: "$5.50" },
      { name: "Fig & walnut scone", description: "Served warm with honey butter", price: "$4.75" },
    ],
  },
  {
    section: "Lunch, until 3pm",
    items: [
      {
        name: "Greenhouse salad",
        description: "Whatever is ready in the beds, lemon and pecorino",
        price: "$12.00",
      },
      {
        name: "Tomato & basil galette",
        description: "Buttery pastry, served room temperature",
        price: "$13.50",
      },
      {
        name: "Soup of the day",
        description: "Written on the board by the till, always vegetarian",
        price: "$9.00",
      },
    ],
  },
] as const;

export type Workshop = {
  title: string;
  date: string;
  time: string;
  price: string;
  capacity: number;
  booked: number;
  description: string;
};

export const workshops: readonly Workshop[] = [
  {
    title: "Repotting clinic",
    date: "Saturday 14 March",
    time: "10:00 – 11:30",
    price: "$35",
    capacity: 12,
    booked: 9,
    description:
      "Bring a plant that has outgrown its pot. We supply soil, pots and the mess. You leave with it done properly.",
  },
  {
    title: "Propagation from cuttings",
    date: "Sunday 22 March",
    time: "11:00 – 13:00",
    price: "$45",
    capacity: 10,
    booked: 10,
    description:
      "Take cuttings from our stock plants and learn to root them in water and in soil. Go home with four of your own.",
  },
  {
    title: "Terrarium building",
    date: "Saturday 4 April",
    time: "14:00 – 16:00",
    price: "$65",
    capacity: 8,
    booked: 3,
    description:
      "Build a closed terrarium from scratch. Glass vessel, drainage layer, moss and three plants included.",
  },
  {
    title: "Winter plant triage",
    date: "Sunday 19 April",
    time: "10:30 – 12:00",
    price: "$30",
    capacity: 14,
    booked: 6,
    description:
      "Yellow leaves, leggy growth, fungus gnats. Bring the patient and we will work out what went wrong together.",
  },
] as const;
