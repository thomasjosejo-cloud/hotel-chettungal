export interface CocktailItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: "Signature" | "Classic" | "Mocktail";
  flavorNotes: string[];
  isHero?: boolean;
}

export const CASABAY_CONTENT = {
  hero: {
    headline: "CasaBay",
    tagline: "Rooftop Restobar",
    subheading: "Evenings Elevated Above the City",
    description: "Perched atop Hotel New Town, CasaBay blends open-sky twilight, moody emerald ambience, and precision mixology. From house-infused spirits to signature tapas, it is the city's most photogenic nocturnal destination.",
    timing: "5:00 PM – 11:30 PM",
  },
  ambiencePillars: [
    {
      title: "Skyline Sundowners",
      description: "Watch the golden hour soften into twilight over craft aperitifs and breezy rooftop vistas.",
    },
    {
      title: "Artisanal Mixology",
      description: "Botanical spirits, house-smoked fruit reductions, and hand-shaken signature cocktails.",
    },
    {
      title: "Moody Emerald Aesthetic",
      description: "Deep greens, warm brass accents, and intimate candle-lit seating crafted for conversations.",
    },
  ],
  signatureCocktails: [
    {
      id: "terrace",
      name: "Terrace",
      price: "₹400",
      description: "House-pickled pineapple and fiery chilli infused with artisanal gin, finished with our secret botanical house recipe.",
      category: "Signature",
      flavorNotes: ["Pickled Pineapple", "Chilli Zing", "Crisp Botanical"],
      isHero: true,
    },
    {
      id: "watermelon-rosemary",
      name: "Watermelon Rosemary",
      price: "₹400",
      description: "Rosemary-infused fresh watermelon, dry gin, fresh lime juice, and simple syrup, crowned with fragrant rosemary smoke.",
      category: "Signature",
      flavorNotes: ["Fresh Watermelon", "Smoked Herb", "Zesty Lime"],
      isHero: true,
    },
    {
      id: "mango-tango",
      name: "Mango Tango",
      price: "₹400",
      description: "Gin, ripe mango puree, chaat masala, mineral rock salt, and cane syrup, effervescently topped with club soda.",
      category: "Signature",
      flavorNotes: ["Sweet Mango", "Tangy Spice", "Effervescent"],
    },
    {
      id: "purple-martini",
      name: "Purple Martini",
      price: "₹450",
      description: "Dry gin, macerated mountain strawberry, blue curaçao, and fresh lime juice for a vibrant nocturnal hue.",
      category: "Signature",
      flavorNotes: ["Wild Strawberry", "Citrus Blue", "Silky Finish"],
    },
    {
      id: "cucumber-basil-smash",
      name: "Cucumber Basil Smash",
      price: "₹500",
      description: "Muddled crisp garden cucumber, sweet basil leaves, gin, lime juice, and premium tonic water.",
      category: "Signature",
      flavorNotes: ["Garden Fresh", "Aromatic Basil", "Crisp Tonic"],
    },
    {
      id: "sozo-cata",
      name: "Sozo Cata",
      price: "₹500",
      description: "Agave tequila, fresh lime juice, green chilli spice, and exotic passion fruit reduction.",
      category: "Signature",
      flavorNotes: ["Smoky Tequila", "Tropical Passion", "Chilli Kick"],
    },
    {
      id: "smoked-pineapple-splash",
      name: "Smoked Pineapple Splash",
      price: "₹500",
      description: "Charred pineapple infused tequila, triple sec, tart lime juice, and cold-pressed pineapple juice.",
      category: "Signature",
      flavorNotes: ["Charred Fruit", "Bright Orange", "Agave Warmth"],
    },
    {
      id: "don",
      name: "Don",
      price: "₹550",
      description: "Blended malt whisky, apricot liqueur, house Kerala spices, fresh lime juice, egg white froth, and flamed orange peel.",
      category: "Signature",
      flavorNotes: ["Oak & Malt", "Warm Spices", "Velvety Foam"],
      isHero: true,
    },
  ] as CocktailItem[],
};
