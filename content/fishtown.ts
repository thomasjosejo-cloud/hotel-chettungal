export interface DishItem {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  badge?: string;
  category: "coastal" | "tandoor" | "biryani" | "curries" | "chinese_continental";
  dietary: "Non-Veg" | "Seafood" | "Veg";
  timing: "Lunch & Dinner" | "All Day";
}

export const FISHTOWN_CONTENT = {
  hero: {
    headline: "Fish Town",
    tagline: "Multi-Cuisine Restaurant",
    subheading: "A Feast for Every Table and Generation",
    description: "The everyday culinary heart of Hotel New Town. Fish Town brings together coastal seafood masterworks, fragrant biryanis, clay oven tandoor delicacies, and continental classics in an inviting, warm setting on NH 544.",
    timing: "7:30 AM – 11:00 PM (Daily)",
  },
  cuisinePhilosophy: {
    lead: "Sourced Fresh Daily, Crafted with Generational Heritage",
    paragraphs: [
      "At Fish Town, dining is an unhurried family and business ritual. From our signature Alleppey curries simmered in clay pots to tender tandoor meats basted in artisanal spices, each recipe honors authentic flavor profiles while delivering consistent hospitality.",
      "Whether you are hosting an executive lunch, gathering the extended family for Sunday afternoon feasts, or celebrating a quiet dinner milestone, our warm service and expansive menu cater to every palate.",
    ],
  },
  menuCategories: [
    { id: "all", label: "All Signatures" },
    { id: "coastal", label: "Kerala & Coastal Seafood" },
    { id: "tandoor", label: "Clay-Oven Tandoor" },
    { id: "biryani", label: "Malabar Biryani & Breads" },
    { id: "curries", label: "North Indian Curries" },
    { id: "chinese_continental", label: "Chinese & Continental" },
  ],
  signatureDishes: [
    {
      id: "alleppey-fish-curry",
      name: "Alleppey Meen Curry",
      cuisine: "Coastal Kerala",
      category: "coastal",
      description: "Fresh catch of the day simmered in rich coconut milk, raw mango tang, curry leaves, and freshly ground shallot masala.",
      badge: "House Specialty",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
    {
      id: "karimeen-pollichathu",
      name: "Karimeen Pollichathu",
      cuisine: "Backwater Classic",
      category: "coastal",
      description: "Pearl spot fish marinated in spicy pepper and tomato reduction, wrapped in charred banana leaves and pan-roasted to perfection.",
      badge: "Chef Signature",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
    {
      id: "malabar-prawn-roast",
      name: "Travancore Tiger Prawn Roast",
      cuisine: "Coastal Kerala",
      category: "coastal",
      description: "Plump ocean prawns tossed with black pepper, crushed fennel seeds, sliced coconut tidbits, and fresh curry leaves.",
      badge: "Coastal Favorite",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
    {
      id: "tandoori-murgh",
      name: "Bhatinda Tandoori Murgh",
      cuisine: "Clay Oven Tandoor",
      category: "tandoor",
      description: "Spring chicken steeped in hung curd, Kashmiri deggi mirch, and hand-pounded spices, charred in traditional clay oven.",
      badge: "Tandoor Star",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "murgh-malai-tikka",
      name: "Murgh Malai Tikka",
      cuisine: "Clay Oven Tandoor",
      category: "tandoor",
      description: "Tender boneless chicken marinated in cream, cardamom, mild green chillies, and grilled gently over glowing charcoal.",
      badge: "Melt In Mouth",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "tandoori-paneer-tikka",
      name: "Kasundi Paneer Tikka",
      cuisine: "Clay Oven Tandoor",
      category: "tandoor",
      description: "Fresh cottage cheese steaks seasoned with Bengali mustard, ajwain seeds, and bell peppers charred on skewers.",
      dietary: "Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "thalassery-biryani",
      name: "Chettungal Thalassery Biryani",
      cuisine: "Malabar Heritage",
      category: "biryani",
      description: "Fragrant short-grain Khaima rice layered with spiced tender chicken, caramelized onions, fried cashews, and aromatic ghee.",
      badge: "Guest Favorite",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "mutton-pepper-fry",
      name: "Kerala Nadan Mutton Fry",
      cuisine: "Travancore Spices",
      category: "biryani",
      description: "Tender goat meat slow-cooked with crushed Malabar peppercorns, roasted coconut slivers, and fragrant shallots. Perfect with Kerala Porotta.",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "paneer-butter-masala",
      name: "Slow-Simmered Paneer Lababdar",
      cuisine: "North Indian",
      category: "curries",
      description: "Charred cottage cheese cubes folded in a velvety tomato-cashew satin gravy with crushed kasuri methi.",
      dietary: "Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "butter-chicken",
      name: "Old Delhi Butter Chicken",
      cuisine: "North Indian",
      category: "curries",
      description: "Smoky shredded tandoori chicken cooked in a rich, buttery tomato gravy scented with fenugreek leaves.",
      badge: "Classic",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "dragon-chicken",
      name: "Indo-Chinese Dragon Chicken",
      cuisine: "Oriental Wok",
      category: "chinese_continental",
      description: "Crispy fried chicken strips glazed in fiery red chili sauce, cashews, and scallions with a sweet-spicy kick.",
      badge: "Popular Starter",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "grilled-fish-lemon-butter",
      name: "Grilled Fish with Lemon Butter",
      cuisine: "Continental",
      category: "chinese_continental",
      description: "Pan-seared fresh ocean fillet served with herb-infused lemon garlic butter sauce and steamed garden vegetables.",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
  ] as DishItem[],
  diningOccasions: [
    {
      title: "Family Celebrations",
      summary: "Spacious multi-generation seating, diverse non-veg and vegetarian selections, and warm attentive table service.",
    },
    {
      title: "Executive Business Lunches",
      summary: "Swift course delivery, discrete seating arrangements, and reliable Wi-Fi for productive afternoon meetings.",
    },
    {
      title: "Group Banqueting & Feasts",
      summary: "Curated multi-course platters and family-style sharing courses for anniversaries, birthdays, and reunions.",
    },
  ],
};
