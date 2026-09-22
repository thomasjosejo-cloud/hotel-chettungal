export interface DishItem {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  badge?: string;
  dietary: "Non-Veg" | "Seafood" | "Veg";
  timing: "Lunch & Dinner" | "All Day";
}

export const FISHTOWN_CONTENT = {
  hero: {
    headline: "Fish Town",
    tagline: "Multi-Cuisine Restaurant",
    subheading: "A Feast for Every Table and Generation",
    description: "The everyday culinary heart of Hotel New Town. Fish Town brings together coastal seafood masterworks, fragrant biryanis, clay oven tandoor delicacies, and continental classics in an inviting, light-filled ivory setting.",
    timing: "11:30 AM – 11:00 PM (Daily)",
  },
  cuisinePhilosophy: {
    lead: "Sourced Fresh Daily, Crafted with Generational Heritage",
    paragraphs: [
      "At Fish Town, dining is an unhurried family and business ritual. From our signature Alleppey curries simmered in clay pots to tender tandoor meats basted in artisanal spices, each recipe honors authentic flavor profiles while delivering consistent hospitality.",
      "Whether you are hosting an executive lunch, gathering the extended family for Sunday afternoon feasts, or celebrating a quiet dinner milestone, our warm service and expansive menu cater to every palate.",
    ],
  },
  signatureDishes: [
    {
      id: "alleppey-fish-curry",
      name: "Alleppey Meen Curry",
      cuisine: "Coastal Kerala",
      description: "Fresh catch of the day simmered in rich coconut milk, raw mango tang, curry leaves, and freshly ground shallot masala.",
      badge: "House Specialty",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
    {
      id: "thalassery-biryani",
      name: "Chettungal Thalassery Biryani",
      cuisine: "Malabar Heritage",
      description: "Fragrant short-grain Khaima rice layered with spiced tender chicken, caramelized onions, fried cashews, and aromatic ghee.",
      badge: "Guest Favorite",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "karimeen-pollichathu",
      name: "Karimeen Pollichathu",
      cuisine: "Backwater Classic",
      description: "Pearl spot fish marinated in spicy pepper and tomato reduction, wrapped in charred banana leaves and pan-roasted to perfection.",
      badge: "Chef Signature",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
    {
      id: "tandoori-murgh",
      name: "Bhatinda Tandoori Murgh",
      cuisine: "Clay Oven Tandoor",
      description: "Spring chicken steeped in hung curd, Kashmiri deggi mirch, and hand-pounded spices, charred in traditional clay oven.",
      badge: "Tandoor Star",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "malabar-prawn-roast",
      name: "Travancore Tiger Prawn Roast",
      cuisine: "Coastal Kerala",
      description: "Plump ocean prawns tossed with black pepper, crushed fennel seeds, sliced coconut tidbits, and fresh curry leaves.",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
    {
      id: "paneer-butter-masala",
      name: "Slow-Simmered Paneer Lababdar",
      cuisine: "North Indian",
      description: "Charred cottage cheese cubes folded in a velvety tomato-cashew satin gravy with crushed kasuri methi.",
      dietary: "Veg",
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
