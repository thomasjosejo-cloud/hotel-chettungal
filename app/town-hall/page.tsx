import { Metadata } from "next";
import TownHallContent from "@/components/pages/TownHallContent";

export const metadata: Metadata = {
  title: "Town Hall — 120 Pax Banquet & Event Arena | Chettungal",
  description: "Host weddings, corporate events, and celebrations for up to 120 guests at Town Hall, Hotel New Town by Chettungal, Angamaly.",
  openGraph: {
    title: "Town Hall — 120 Pax Banquet & Event Arena | Chettungal",
    description: "Host weddings, corporate events, and celebrations for up to 120 guests at Town Hall, Hotel New Town by Chettungal, Angamaly.",
    url: "https://hotelchettungal.com/town-hall",
    images: [{ url: "/images/town-hall/hall-lighting.webp", width: 1200, height: 630, alt: "Town Hall — 120 Pax Banquet & Event Arena | Chettungal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Town Hall — 120 Pax Banquet Arena | Chettungal",
    description: "Conferences, weddings & celebrations up to 120 guests on NH 544, Angamaly.",
    images: ["/images/town-hall/hall-lighting.webp"],
  },
};

export default function TownHallPage() {
  return <TownHallContent />;
}
