import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";
import { Phone, MessageSquare, CalendarDays } from "lucide-react";
import Link from "next/link";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hotelchettungal.com"),
  title: {
    default: "Hotel New Town by Chettungal | Stay · Dine · Meet · Celebrate",
    template: "%s | Hotel New Town by Chettungal",
  },
  description:
    "Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 — all under one roof on NH 544, Angamaly, Kerala.",
  keywords: [
    "Chettungal New Town Hotel",
    "Hotel New Town Angamaly",
    "CasaBay Rooftop Restobar",
    "Fish Town Restaurant",
    "Town Hall Banquet Angamaly",
    "Hotels near Cochin Airport",
    "Angamaly Restobar",
    "NH 544 Hotels",
  ],
  alternates: {
    canonical: "https://hotelchettungal.com",
  },
  icons: {
    icon: "/branding/chettungal_crest_gold.png",
    apple: "/branding/chettungal_crest_gold.png",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://hotelchettungal.com",
    siteName: "Hotel New Town by Chettungal",
    title: "Hotel New Town by Chettungal — Angamaly",
    description: "One Address, Every Occasion. Rooftop Restobar, Multi-Cuisine Dining, Banquets, and 10 Rooms on NH 544.",
    images: [
      {
        url: "/images/casabay/casa-night-view.webp",
        width: 1200,
        height: 630,
        alt: "Hotel New Town by Chettungal — CasaBay Rooftop & Dining",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel New Town by Chettungal — Angamaly",
    description: "One Address, Every Occasion. Rooftop Restobar, Multi-Cuisine Dining, Banquets, and 10 Rooms on NH 544.",
    images: ["/images/casabay/casa-night-view.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0C101B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#0C101B] text-slate-100 antialiased selection:bg-[#E5C158] selection:text-[#0C101B]">
        <Navigation />
        <main className="flex-grow pt-0 pb-16 md:pb-0">{children}</main>
        <Footer />

        {/* Mobile Floating Direct Action Dock */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E1524]/95 backdrop-blur-lg border-t border-[#E5C158]/30 px-3 py-2.5 flex items-center justify-around gap-2 shadow-2xl">
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-medium rounded-sm bg-white/10 text-slate-200 border border-white/10"
          >
            <Phone className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Call</span>
          </a>
          <a
            href={buildWhatsAppLink("General Hotel Enquiry")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B]"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
          <Link
            href="/enquire"
            className="flex-1 flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold rounded-sm bg-white/15 text-white border border-white/20"
          >
            <CalendarDays className="w-3.5 h-3.5 text-[#E5C158]" />
            <span>Enquire</span>
          </Link>
        </div>
      </body>
    </html>
  );
}
