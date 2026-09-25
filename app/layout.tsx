import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Instrument_Serif, Inter, Jost } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import RevealObserver from "@/components/RevealObserver";
import SiteMotion from "@/components/motion/SiteMotion";
import { SITE } from "@/content/site";
import "./globals.css";

/* The page's own type, unchanged: everything outside the header and footer. */
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  // Only 400 and 500 are used; 300 and 600 were downloaded and never referenced.
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

/* The chrome's type: the header and the footer only. */
const jost = Jost({
  subsets: ["latin"],
  weight: "500",
  variable: "--font-ui",
  display: "swap",
  // The header is above the fold on every page.
  preload: true,
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-ui-serif",
  display: "swap",
  // One line, in the footer: never worth blocking the critical path for.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} · Angamaly`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "CasaBay rooftop restobar, Fish Town restaurant, Town Hall banquets for up to 120, a private board room and ten rooms on NH 544, Angamaly.",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: SITE.name,
    images: [{ url: "/images/casabay/casa-ambience-2.webp", width: 1536, height: 1024, alt: "CasaBay rooftop at night" }],
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/branding/chettungal_crest_gold.png", apple: "/branding/chettungal_crest_gold.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1e1e1c",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${inter.variable} ${jost.variable} ${instrument.variable}`} suppressHydrationWarning>
      <head>
        {/* Enables scroll-reveal before first paint; without JS content stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-ivory focus:px-4 focus:py-2 focus:text-ink"
        >
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <MobileDock />
        <RevealObserver />
        <SiteMotion />
      </body>
    </html>
  );
}
