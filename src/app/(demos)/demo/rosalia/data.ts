export type DietaryFlag = "V" | "VG" | "GF" | "N";

export type Dish = {
  name: string;
  description: string;
  price: string;
  flags: readonly DietaryFlag[];
};

export const dietaryLegend: Record<DietaryFlag, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten free",
  N: "Contains nuts",
};

/**
 * The menu as structured data rather than a PDF. This is the whole point of the
 * build: dish names are indexable, prices are a one-line edit, and the kitchen
 * can change a dish weekly without emailing a designer.
 */
export const menu: readonly { section: string; note: string; dishes: readonly Dish[] }[] = [
  {
    section: "Para empezar",
    note: "Small plates, built for the middle of the table",
    dishes: [
      {
        name: "Guacamole de molcajete",
        description: "Crushed to order with serrano, lime and toasted pepita",
        price: "14",
        flags: ["VG", "GF", "N"],
      },
      {
        name: "Esquites",
        description: "Charred corn, crema, chile de árbol, aged cotija",
        price: "11",
        flags: ["V", "GF"],
      },
      {
        name: "Aguachile de camarón",
        description: "Raw prawn, cucumber, red onion, lime and habanero",
        price: "19",
        flags: ["GF"],
      },
      {
        name: "Queso fundido",
        description: "Oaxaca cheese, roasted poblano, handmade flour tortillas",
        price: "16",
        flags: ["V"],
      },
      {
        name: "Tostada de nopal",
        description: "Grilled cactus, black bean purée, salsa macha, radish",
        price: "13",
        flags: ["VG", "N"],
      },
    ],
  },
  {
    section: "Tacos",
    note: "Three per order, on nixtamalised corn ground in house",
    dishes: [
      {
        name: "Carnitas",
        description: "Pork shoulder confited six hours, salsa verde cruda",
        price: "18",
        flags: ["GF"],
      },
      {
        name: "Pescado zarandeado",
        description: "Grilled market fish, achiote, pickled cabbage, chipotle crema",
        price: "21",
        flags: ["GF"],
      },
      {
        name: "Birria de res",
        description: "Short rib braised in guajillo, consommé on the side",
        price: "22",
        flags: ["GF"],
      },
      {
        name: "Hongos al pastor",
        description: "Oyster mushrooms, pineapple, achiote, charred spring onion",
        price: "17",
        flags: ["VG", "GF"],
      },
    ],
  },
  {
    section: "Platos fuertes",
    note: "Larger plates, intended to be shared between two",
    dishes: [
      {
        name: "Mole negro con pollo",
        description: "Thirty-two ingredient mole, free-range chicken, sesame",
        price: "34",
        flags: ["GF", "N"],
      },
      {
        name: "Pescado a la talla",
        description: "Whole butterflied branzino, two salsas, grilled over mesquite",
        price: "46",
        flags: ["GF"],
      },
      {
        name: "Cochinita pibil",
        description: "Achiote pork, banana leaf, habanero escabeche, fresh tortillas",
        price: "32",
        flags: ["GF"],
      },
      {
        name: "Calabaza en pipián verde",
        description: "Roasted winter squash, pumpkin-seed pipián, epazote",
        price: "26",
        flags: ["VG", "GF", "N"],
      },
      {
        name: "Arroz verde con verduras",
        description: "Green rice, seasonal vegetables from the Thursday market",
        price: "24",
        flags: ["VG", "GF"],
      },
    ],
  },
  {
    section: "Postres y bebidas",
    note: "Desserts, plus a short list from the bar",
    dishes: [
      {
        name: "Flan de cajeta",
        description: "Goat's-milk caramel, burnt orange",
        price: "12",
        flags: ["V", "GF"],
      },
      {
        name: "Helado de maíz tostado",
        description: "Toasted corn ice cream, crisp blue corn tuile",
        price: "11",
        flags: ["V"],
      },
      {
        name: "Mezcal flight",
        description: "Three half-ounce pours, one espadín and two wild agave",
        price: "26",
        flags: ["VG", "GF"],
      },
      {
        name: "Agua de jamaica",
        description: "Hibiscus, lightly sweetened, free refills",
        price: "6",
        flags: ["VG", "GF"],
      },
      {
        name: "Café de olla",
        description: "Piloncillo, cinnamon, brewed in clay",
        price: "7",
        flags: ["VG", "GF"],
      },
    ],
  },
] as const;

export const sittings = [
  { label: "Early — 17:30", value: "early" },
  { label: "Prime — 19:00", value: "prime" },
  { label: "Prime — 19:30", value: "prime-late" },
  { label: "Late — 21:00", value: "late" },
] as const;

export const storyChapters = [
  {
    heading: "Nixtamal, every morning",
    body: "We buy single-origin heirloom corn from a cooperative in Oaxaca, cook it with lime overnight, and grind it on a stone mill at six every morning. It is the most labour-intensive thing we do and the only part of the menu we would never compromise on. Masa made yesterday tastes like yesterday.",
  },
  {
    heading: "The Thursday market decides",
    body: "The vegetable dishes change weekly because the plates follow what is actually good that week, not what a printed menu committed us to in January. If the squash is poor, the squash dish comes off. This is also why the menu lives on this website rather than in a PDF.",
  },
  {
    heading: "Mole takes three days",
    body: "Thirty-two ingredients, each toasted separately, then ground and simmered across three days. We make it once a week in a sixty-litre pot, and when it runs out on a Saturday night it is genuinely gone until Tuesday.",
  },
  {
    heading: "Named for a grandmother",
    body: "Rosalía cooked for eleven people on a two-ring stove and never once wrote a recipe down. Everything here was reverse-engineered from memory and argument. Her mole is the only dish on the menu we have not changed.",
  },
] as const;
