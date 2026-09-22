import React from "react";
import type { Metadata } from "next";
import CasaBayContent from "@/components/pages/CasaBayContent";

export const metadata: Metadata = {
  title: "CasaBay Rooftop Restobar | Hotel New Town by Chettungal",
  description:
    "Take the evening upstairs. Open-air rooftop resto-bar for conversations, cocktails, grills, small plates & live music nights in Angamaly, Kerala.",
  openGraph: {
    title: "CasaBay Rooftop Restobar | Hotel New Town by Chettungal",
    description: "Open-air rooftop resto-bar with signature mixology, grills, small plates & twilight views in Angamaly, Kerala.",
    url: "https://hotelchettungal.com/casabay",
    images: [
      {
        url: "/images/casabay/casa-cocktail-deck.webp",
        width: 1200,
        height: 630,
        alt: "CasaBay Rooftop Restobar Angamaly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CasaBay Rooftop Restobar | Chettungal",
    description: "Take the evening upstairs. Rooftop cocktails, grills, and live music.",
    images: ["/images/casabay/casa-cocktail-deck.webp"],
  },
};

export default function CasaBayPage() {
  return <CasaBayContent />;
}
