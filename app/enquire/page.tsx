import { Metadata } from "next";
import EnquireContent from "@/components/pages/EnquireContent";

export const metadata: Metadata = {
  title: "Enquire — Book a Table, Plan an Event | Chettungal",
  description: "Send your enquiry for dining reservations, banquet events, meeting room bookings, or room stays at Hotel New Town by Chettungal.",
  openGraph: {
    title: "Enquire — Book a Table, Plan an Event | Chettungal",
    description: "Send your enquiry for dining reservations, banquet events, meeting room bookings, or room stays at Hotel New Town by Chettungal.",
    url: "https://hotelchettungal.com/enquire",
    images: [{ url: "/images/casabay/casa-night-view.webp", width: 1200, height: 630, alt: "Enquire — Book a Table, Plan an Event | Chettungal" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Enquire — Dining, Events, Stays | Chettungal",
    description: "Fast WhatsApp and online enquiry for Hotel New Town by Chettungal.",
    images: ["/images/casabay/casa-night-view.webp"],
  },
};

export default function EnquirePage() {
  return <EnquireContent />;
}
