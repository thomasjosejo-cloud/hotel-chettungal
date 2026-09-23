import { Metadata } from "next";
import BoardRoomContent from "@/components/pages/BoardRoomContent";

export const metadata: Metadata = {
  title: "The Boardroom — Meeting Suite for 12",
  description: "A dedicated, quiet meeting suite for 12 with presentation-ready setup at Hotel New Town by Chettungal, Angamaly.",
  openGraph: {
    title: "The Boardroom — Executive Meeting Suite for 12 | Chettungal",
    description: "A dedicated, quiet meeting suite for 12 with presentation-ready setup at Hotel New Town by Chettungal, Angamaly.",
    url: "https://hotelchettungal.com/board-room",
    images: [{ url: "/images/board-room/boardroom-hero.webp", width: 1200, height: 630, alt: "The Boardroom — Executive Meeting Suite for 12 | Chettungal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Boardroom — Executive Meeting Suite | Chettungal",
    description: "Dedicated meeting suite for 12 with high-speed WiFi and AV on NH 544, Angamaly.",
    images: ["/images/board-room/boardroom-hero.webp"],
  },
};

export default function BoardRoomPage() {
  return <BoardRoomContent />;
}
