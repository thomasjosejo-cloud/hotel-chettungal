import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Chewy } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileDock from "@/components/MobileDock";
import RevealObserver from "@/components/RevealObserver";
import { SITE } from "@/content/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// CasaBay's signage face — used only for the CasaBay wordmark.
const chewy = Chewy({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-chewy",
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
    <html lang="en-IN" className={`${cormorant.variable} ${inter.variable} ${chewy.variable}`} suppressHydrationWarning>
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
      </body>
    </html>
  );
}
