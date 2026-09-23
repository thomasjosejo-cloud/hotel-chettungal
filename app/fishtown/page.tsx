import React from "react";
import type { Metadata } from "next";
import FishTownContent from "@/components/pages/FishTownContent";

export const metadata: Metadata = {
  title: "Fish Town Restaurant",
  description:
    "Fresh catch. Local soul. Multi-cuisine dining featuring coastal fish curries, tandoor, biryani, Chinese & continental favorites in Angamaly, Kerala.",
  openGraph: {
    title: "Fish Town Restaurant | Hotel New Town by Chettungal",
    description: "Fresh catch. Local soul. Kerala fish curries, tandoori grills, Chinese & Continental dining on NH 544, Angamaly.",
    url: "https://hotelchettungal.com/fishtown",
    images: [
      {
        url: "/images/fishtown/restaurant-hero.webp",
        width: 1200,
        height: 630,
        alt: "Fish Town Restaurant Angamaly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fish Town Restaurant | Chettungal",
    description: "Fresh catch. Local soul. Multi-cuisine family and business dining in Angamaly.",
    images: ["/images/fishtown/restaurant-hero.webp"],
  },
};

export default function FishTownPage() {
  return <FishTownContent />;
}
