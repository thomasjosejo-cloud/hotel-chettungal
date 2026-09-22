export interface CocktailItem {
  id: string;
  name: string;
  price: string;
  description: string;
  category: "Signature" | "Classic" | "Mocktail" | "Grill & Tapas";
  menuTab: "cocktails" | "mocktails" | "tapas";
  flavorNotes: string[];
  isHero?: boolean;
}

export const CASABAY_CONTENT = {
  hero: {
    headline: "CasaBay",
    tagline: "Rooftop Resto-Bar",
    subheading: "Take the evening upstairs.",
    description: "CASABAY is our rooftop resto-bar for conversations, cocktails, and unhurried evenings — an elevated setting where the night moves effortlessly from after-work drinks to late-evening gatherings. Come for the view, stay for the food, raise a glass to the evening.",
    timing: "5:00 PM – 11:30 PM (Daily)",
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
      title: "Open-Sky Living",
      description: "Warm wicker lighting, acoustic music sessions, and unhurried open-air evenings under the stars.",
    },
  ],
  menuTabs: [
    { id: "all", label: "Full Highlights" },
    { id: "cocktails", label: "Signature Mixology" },
    { id: "mocktails", label: "Craft Mocktails" },
    { id: "tapas", label: "Rooftop Grills & Tapas" },
  ],
  signatureCocktails: [
    {
      id: "terrace",
      name: "Terrace",
      price: "₹400",
      description: "House-pickled pineapple and fiery chilli infused with artisanal gin, finished with our secret botanical house recipe.",
      category: "Signature",
      menuTab: "cocktails",
      flavorNotes: ["Pickled Pineapple", "Chilli Zing", "Crisp Botanical"],
      isHero: true,
    },
    {
      id: "watermelon-rosemary",
      name: "Watermelon Rosemary",
      price: "₹400",
      description: "Rosemary-infused fresh watermelon, dry gin, fresh lime juice, and simple syrup, crowned with fragrant rosemary smoke.",
      category: "Signature",
      menuTab: "cocktails",
      flavorNotes: ["Fresh Watermelon", "Smoked Herb", "Zesty Lime"],
      isHero: true,
    },
    {
      id: "mango-tango",
      name: "Mango Tango",
      price: "₹400",
      description: "Gin, ripe mango puree, chaat masala, mineral rock salt, and cane syrup, effervescently topped with club soda.",
      category: "Signature",
      menuTab: "cocktails",
      flavorNotes: ["Sweet Mango", "Tangy Spice", "Effervescent"],
    },
    {
      id: "purple-martini",
      name: "Purple Martini",
      price: "₹450",
      description: "Dry gin, macerated mountain strawberry, blue curaçao, and fresh lime juice for a vibrant nocturnal hue.",
      category: "Signature",
      menuTab: "cocktails",
      flavorNotes: ["Wild Strawberry", "Citrus Blue", "Silky Finish"],
    },
    {
      id: "cucumber-basil-smash",
      name: "Cucumber Basil Smash",
      price: "₹500",
      description: "Muddled crisp garden cucumber, sweet basil leaves, gin, lime juice, and premium tonic water.",
      category: "Signature",
      menuTab: "cocktails",
      flavorNotes: ["Garden Fresh", "Aromatic Basil", "Crisp Tonic"],
    },
    {
      id: "sozo-cata",
      name: "Sozo Cata",
      price: "₹500",
      description: "Agave tequila, fresh lime juice, green chilli spice, and exotic passion fruit reduction.",
      category: "Signature",
      menuTab: "cocktails",
      flavorNotes: ["Smoky Tequila", "Tropical Passion", "Chilli Kick"],
    },
    {
      id: "don",
      name: "Don",
      price: "₹550",
      description: "Blended malt whisky, apricot liqueur, house Kerala spices, fresh lime juice, egg white froth, and flamed orange peel.",
      category: "Signature",
      menuTab: "cocktails",
      flavorNotes: ["Oak & Malt", "Warm Spices", "Velvety Foam"],
      isHero: true,
    },
    {
      id: "virgin-terrace",
      name: "Virgin Tropical Spritz",
      price: "₹280",
      description: "Muddled passion fruit, fresh kaffir lime, mint leaves, and effervescent ginger ale over crushed ice.",
      category: "Mocktail",
      menuTab: "mocktails",
      flavorNotes: ["Passion Fruit", "Zesty Lime", "Ginger Effervescence"],
    },
    {
      id: "berry-blossom",
      name: "Berry Rosemary Cooler",
      price: "₹280",
      description: "Crushed mixed berries, elderflower essence, fresh lemon juice, and torched rosemary sprig.",
      category: "Mocktail",
      menuTab: "mocktails",
      flavorNotes: ["Wild Berry", "Elderflower", "Smoked Rosemary"],
    },
    {
      id: "charcoal-chicken-tikka",
      name: "Casa Charcoal Chicken Skewers",
      price: "₹380",
      description: "Succulent chicken thigh marinated in crushed black pepper, lime juice, and Greek yogurt, flame-charred on the rooftop grill.",
      category: "Grill & Tapas",
      menuTab: "tapas",
      flavorNotes: ["Smoky Char", "Black Pepper", "Mint Chutney"],
    },
    {
      id: "crispy-calamari",
      name: "Golden Salt & Pepper Squid",
      price: "₹420",
      description: "Crispy battered ocean calamari tossed with scallions, crushed garlic, birds-eye chili, and lemon aioli.",
      category: "Grill & Tapas",
      menuTab: "tapas",
      flavorNotes: ["Crispy Crunch", "Garlic Chili", "Tangy Dip"],
    },
    {
      id: "truffle-parmesan-fries",
      name: "Truffle & Herb Potato Wedges",
      price: "₹260",
      description: "Hand-cut crispy wedges tossed in white truffle oil, shaved aged parmesan, and cracked peppercorn.",
      category: "Grill & Tapas",
      menuTab: "tapas",
      flavorNotes: ["White Truffle", "Aged Cheese", "Sea Salt"],
    },
  ] as CocktailItem[],
  quickFacts: [
    { label: "Floor Level", value: "Rooftop Open-Sky" },
    { label: "Timings", value: "5:00 PM – 11:30 PM (Mon–Sun)" },
    { label: "Bar Service", value: "Full Spirits, Beer, Wine & Cocktails" },
    { label: "Entertainment", value: "Live Acoustic Nights on Weekends" },
    { label: "Reservations", value: "Recommended for Friday & Saturday" },
  ],
};
