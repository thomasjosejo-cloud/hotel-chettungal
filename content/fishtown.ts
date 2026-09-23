export interface DishItem {
  id: string;
  name: string;
  cuisine: string;
  description: string;
  badge?: string;
  category: "all" | "coastal" | "tandoor" | "biryani" | "veg";
  dietary: "Non-Veg" | "Seafood" | "Veg";
  timing: "Lunch & Dinner" | "All Day";
}

export const FISHTOWN_CONTENT = {
  hero: {
    headline: "Fish Town",
    tagline: "Multi-Cuisine Restaurant",
    subheading: "Fresh Catch & Local Soul on NH 544",
    description: "The everyday culinary heart of Hotel New Town. Fish Town brings together coastal seafood specialities, fragrant biryanis, clay oven tandoors, and North Indian curries in a welcoming family and corporate dining atmosphere.",
    timing: "Breakfast, Lunch & Dinner (7:30 AM – 11:00 PM)",
  },
  cuisinePhilosophy: {
    lead: "Fresh daily catch, familiar spices, generous portions.",
    paragraphs: [
      "Fish Town celebrates the food Kerala knows best — fresh fish from the coast, fragrant clay-pot curries, and generous multi-cuisine hospitality. From a quick business lunch to a family celebration, this is food made to satisfy.",
    ],
  },
  menuCategories: [
    { id: "all", label: "Featured Signatures" },
    { id: "coastal", label: "Kerala Seafood" },
    { id: "tandoor", label: "Tandoor Grills" },
    { id: "biryani", label: "Malabar Biryani" },
    { id: "veg", label: "Vegetarian Specialties" },
  ],
  signatureDishes: [
    {
      id: "alleppey-fish-curry",
      name: "Alleppey Meen Curry",
      cuisine: "Coastal Kerala",
      category: "coastal",
      description: "Fresh catch simmered in rich coconut milk, raw mango tang, curry leaves, and freshly roasted shallot masala.",
      badge: "House Specialty",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
    {
      id: "karimeen-pollichathu",
      name: "Karimeen Pollichathu",
      cuisine: "Backwater Classic",
      category: "coastal",
      description: "Fresh pearl spot coated in spicy shallot-tomato reduction, wrapped in banana leaves and slow pan-roasted.",
      badge: "Chef Signature",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
    {
      id: "malabar-prawn-roast",
      name: "Travancore Tiger Prawn Roast",
      cuisine: "Coastal Kerala",
      category: "coastal",
      description: "Succulent prawns pan-tossed with crushed black pepper, caramelized shallots, curry leaves, and toasted coconut slivers.",
      badge: "Guest Favourite",
      dietary: "Seafood",
      timing: "Lunch & Dinner",
    },
    {
      id: "tandoori-murgh",
      name: "Bhatinda Tandoori Murgh",
      cuisine: "Clay Oven Tandoor",
      category: "tandoor",
      description: "Tender chicken marinated overnight in hung curd, Kashmiri deghi mirch, and hand-ground garam masala, roasted over charcoals.",
      badge: "Charcoal Roasted",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "thalassery-biryani",
      name: "Chettungal Thalassery Biryani",
      cuisine: "Malabar Heritage",
      category: "biryani",
      description: "Aromatic short-grain kaima rice slow-cooked on dum with marinated meat, golden fried onions, cashews, and raisins.",
      badge: "Dum Biryani",
      dietary: "Non-Veg",
      timing: "Lunch & Dinner",
    },
    {
      id: "tandoori-paneer-tikka",
      name: "Kasundi Paneer Tikka",
      cuisine: "Clay Oven Tandoor",
      category: "veg",
      description: "Fresh cottage cheese steaks steeped in mustard marinade and carom seeds, skewered with bell peppers and charred in the tandoor.",
      badge: "Vegetarian",
      dietary: "Veg",
      timing: "Lunch & Dinner",
    },
  ],
};
