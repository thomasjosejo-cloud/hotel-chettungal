import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Jost } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import RevealObserver from "@/components/RevealObserver";
import SiteMotion from "@/components/motion/SiteMotion";
import { SITE } from "@/content/site";
import "./globals.css";

// Instrument Serif ships one weight with a true italic, so every serif rule
// on the site is 400; none asked for more.
const displaySerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const textSans = Jost({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-text",
  display: "swap",
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
    <html lang="en-IN" className={`${displaySerif.variable} ${textSans.variable}`} suppressHydrationWarning>
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
