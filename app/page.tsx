import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  MapPin,
  Plane,
  Train,
  CheckCircle2,
  Compass,
  Wine,
  Utensils,
  PartyPopper,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";
import Property3DNavigator from "@/components/3d/Property3DNavigator";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { SITE_CONFIG } from "@/content/site-config";
import ScrollReveal from "@/components/motion/ScrollReveal";
import StaggerChildren from "@/components/motion/StaggerChildren";

export const metadata: Metadata = {
  title: "Hotel New Town by Chettungal | Stay · Dine · Meet · Celebrate",
  description:
    "Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 — all under one roof on NH 544, Angamaly. Hotel New Town by Chettungal.",
  openGraph: {
    title: "Hotel New Town by Chettungal — Angamaly",
    description: "Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 — all under one roof on NH 544, Angamaly.",
    url: "https://hotelchettungal.com",
    siteName: "Hotel New Town by Chettungal",
    images: [
      {
        url: "/images/casabay/casa-night-view.webp",
        width: 1200,
        height: 630,
        alt: "Hotel New Town by Chettungal Rooftop Night View",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hotel New Town by Chettungal — Angamaly",
    description: "Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 — all under one roof on NH 544.",
    images: ["/images/casabay/casa-night-view.webp"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: "Hotel New Town by Chettungal",
  description: "Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 under one roof on NH 544, Angamaly.",
  url: "https://hotelchettungal.com",
  telephone: "+919961134364",
  address: {
    "@type": "PostalAddress",
    streetAddress: "NH 544",
    addressLocality: "Angamaly",
    addressRegion: "Kerala",
    postalCode: "683572",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "10.1960",
    longitude: "76.3860",
  },
  image: "https://hotelchettungal.com/images/casabay/casa-night-view.webp",
  priceRange: "$$",
};

export default function HomePage() {
  return (
    <div className="flex flex-col bg-[#0C101B] text-slate-100 overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. CINEMATIC LUXURY HERO SECTION - BOTTOM-ALIGNED EDITORIAL LAYOUT */}
      <section className="relative min-h-[96vh] sm:min-h-screen flex items-end justify-start pt-32 pb-14 sm:pb-20 px-6 sm:px-10 lg:px-16">
        {/* Full Vibrancy Reception Counter Photo */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/location/reception-counter.webp"
            alt="Hotel New Town by Chettungal Reception & Front Desk"
            fill
            className="object-cover object-center brightness-100"
            priority
          />
          {/* Subtle top header gradient & deep bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent h-36" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B] via-[#0C101B]/85 to-transparent h-3/5 sm:h-1/2" />
        </div>

        {/* Hero Content Container - Bottom-Left Aligned */}
        <div className="relative z-10 max-w-3xl text-left flex flex-col items-start">
          <ScrollReveal direction="up">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md mb-4 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
                Stay · Dine · Meet · Celebrate
              </span>
            </div>

            {/* Clean, Punchy Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight leading-[1.08] mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              One Address, <br />
              <span className="italic font-light text-[#F5D061]">Every Occasion.</span>
            </h1>

            {/* Crisp One-Line Subtitle */}
            <p className="text-sm sm:text-base font-light text-slate-200 max-w-xl leading-relaxed mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              Rooms, rooftop resto-bar, multi-cuisine dining, and 120-guest banquet hall on NH 544, Angamaly.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto">
              <a
                href="#hotel-venues"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-all shadow-xl"
              >
                <Compass className="w-4 h-4" />
                <span>Explore The Hotel</span>
              </a>

              <WhatsAppCta
                intent="General Hotel Enquiry"
                label="Chat on WhatsApp"
                variant="dark"
                className="px-6 py-3.5 text-xs uppercase tracking-widest border border-white/20 bg-black/60 backdrop-blur-md hover:border-[#E5C158] text-slate-100 shadow-lg"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. THE PROPERTY & VENUES EXPLORER */}
      <section className="bg-gradient-to-b from-[#0C101B] via-[#111726] to-[#0C101B] border-y border-[#E5C158]/20">
        <ScrollReveal direction="up">
          <Property3DNavigator />
        </ScrollReveal>
      </section>

      {/* 3. ATMOSPHERE & EXPERIENCES: WHY GUESTS CHOOSE CHETTUNGAL */}
      <section className="py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ScrollReveal direction="up">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold block mb-2">
              The Living Property
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight">
              Crafted for Every Occasion
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light mt-3 leading-relaxed">
              Whether arriving from Cochin Airport for a restful stay, gathering family over fresh karimeen, or unwinding on the rooftop under night skies.
            </p>
          </div>
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Experience Card 1 */}
          <TiltCard3D maxTilt={6} className="h-full rounded-sm">
            <div className="h-full flex flex-col rounded-sm overflow-hidden border border-white/10 bg-[#111726]/70 hover:border-[#E5C158]/40 transition-all duration-300 group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <Image
                  src="/images/casabay/casa-sunset.webp"
                  alt="CasaBay Rooftop Twilight"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#0C101B]/90 text-[#E5C158] border border-[#E5C158]/30 rounded-sm">
                    Nightlife & Cocktails
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#E5C158]">
                    <Wine className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Rooftop Resto-Bar</span>
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-[#E5C158] transition-colors">
                    Twilight Skies & Acoustic Music
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    Open-sky seating, handcrafted mixology, charcoal grills, and acoustic sessions overlooking Angamaly.
                  </p>
                </div>
                <Link
                  href="/casabay"
                  className="mt-6 pt-4 border-t border-white/10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E5C158] hover:text-white transition-colors"
                >
                  <span>Explore CasaBay</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </TiltCard3D>

          {/* Experience Card 2 */}
          <TiltCard3D maxTilt={6} className="h-full rounded-sm">
            <div className="h-full flex flex-col rounded-sm overflow-hidden border border-white/10 bg-[#111726]/70 hover:border-[#E5C158]/40 transition-all duration-300 group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <Image
                  src="/images/fishtown/restaurant-wide.webp"
                  alt="Fish Town Dining Ambiance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#0C101B]/90 text-[#E5C158] border border-[#E5C158]/30 rounded-sm">
                    Coastal Feasts
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#E5C158]">
                    <Utensils className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Multi-Cuisine Restaurant</span>
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-[#E5C158] transition-colors">
                    Fresh Catch & Family Tables
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    Traditional clay-pot fish curries, North Indian tandoor, Chinese and Continental meals served across warm booths.
                  </p>
                </div>
                <Link
                  href="/fishtown"
                  className="mt-6 pt-4 border-t border-white/10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E5C158] hover:text-white transition-colors"
                >
                  <span>Explore Fish Town</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </TiltCard3D>

          {/* Experience Card 3 */}
          <TiltCard3D maxTilt={6} className="h-full rounded-sm">
            <div className="h-full flex flex-col rounded-sm overflow-hidden border border-white/10 bg-[#111726]/70 hover:border-[#E5C158]/40 transition-all duration-300 group">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                <Image
                  src="/images/town-hall/hall-stage.webp"
                  alt="Town Hall Banquet Staging"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#0C101B]/90 text-[#E5C158] border border-[#E5C158]/30 rounded-sm">
                    120-Pax Events
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#E5C158]">
                    <PartyPopper className="w-4 h-4" />
                    <span className="text-xs uppercase tracking-widest font-semibold">Banquets & Celebrations</span>
                  </div>
                  <h3 className="font-serif text-2xl text-white mb-2 group-hover:text-[#E5C158] transition-colors">
                    Weddings & Banquets
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    A grand, air-conditioned banquet hall with presentation AV, theatrical stage, and live in-house catering by Fish Town.
                  </p>
                </div>
                <Link
                  href="/town-hall"
                  className="mt-6 pt-4 border-t border-white/10 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E5C158] hover:text-white transition-colors"
                >
                  <span>Explore Town Hall</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </TiltCard3D>
        </StaggerChildren>
      </section>

      {/* 4. BOUTIQUE ACCOMMODATIONS */}
      <section className="py-20 bg-[#111726] border-y border-white/10">
        <ScrollReveal direction="up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <div className="lg:col-span-5 relative aspect-[16/10] rounded-sm overflow-hidden border border-[#E5C158]/30 shadow-2xl">
                <Image
                  src="/images/rooms/room-hero.webp"
                  alt="Hotel New Town 10 Air Conditioned Rooms"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300 flex items-center justify-between">
                  <span>10 AC Rooms</span>
                  <span className="text-[#E5C158] font-medium">Breakfast & WiFi Included</span>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center">
                <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold mb-2">
                  10 AIR-CONDITIONED ROOMS
                </span>
                <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-tight mb-4">
                  Built for Rest. Connected to the Highway.
                </h2>
                <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed mb-6">
                  Ten quiet, sound-insulated rooms built for business transit, airport layovers, and wedding parties. Complimentary breakfast and high-speed WiFi included.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-200 mb-8">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                    <span>Complimentary Breakfast</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                    <span>High-Speed WiFi</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                    <span>Airport Transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0" />
                    <span>~5 km to Kochi Airport</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href="/rooms"
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-colors shadow-md"
                  >
                    <span>View Room Specs</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <WhatsAppCta
                    intent="Room Stay Direct Enquiry"
                    label="Enquire Availability"
                    variant="outline"
                    className="px-6 py-3 text-xs uppercase tracking-widest text-slate-200 border-white/25 hover:border-[#E5C158]"
                  />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. LOCATION & CONNECTIVITY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold mb-2 block">
                LOCATION & ARRIVAL
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-4">
                Directly on NH 544, Angamaly
              </h2>
              <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed mb-6">
                Effortless access along the primary highway artery connecting Kochi Airport, railway stations, and regional transit corridors.
              </p>

              <div className="space-y-3.5 text-sm text-slate-300 mb-8 font-light">
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>{SITE_CONFIG.address}, {SITE_CONFIG.cityState} {SITE_CONFIG.pincode}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Plane className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>{SITE_CONFIG.proximity.airport}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Train className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>{SITE_CONFIG.proximity.railway}</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-[#E5C158] shrink-0" />
                  <span>Complimentary on-site valet parking & 100% DG power backup</span>
                </div>
              </div>

              <a
                href={SITE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-semibold text-[#E5C158] hover:text-white border border-[#E5C158]/30 hover:border-[#E5C158] rounded-sm transition-colors"
              >
                <span>Open in Google Maps Navigation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="lg:col-span-6 relative aspect-[16/10] rounded-sm overflow-hidden border border-[#E5C158]/30 shadow-2xl">
              <Image
                src="/images/location/facade.webp"
                alt="Hotel New Town by Chettungal Facade on NH 544 Angamaly"
                fill
                className="object-cover brightness-95 contrast-105"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 6. CONVERSION BANNER */}
      <section className="py-20 bg-gradient-to-b from-[#111726] to-[#0A0D14] border-t border-[#E5C158]/25 text-center px-4">
        <ScrollReveal direction="fade">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#E5C158] font-semibold mb-3">
              DIRECT HOST ASSISTANCE
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal mb-4">
              Reserve a Table or Plan an Event
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-8 max-w-xl">
              Whether booking an intimate rooftop evening at CasaBay, a family feast at Fish Town, or a 120-guest banquet at Town Hall, our team responds directly on WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/enquire"
                className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-colors shadow-lg"
              >
                Fill Online Enquiry Form
              </Link>
              <WhatsAppCta
                intent="Direct Banner Enquiry"
                label="Chat on WhatsApp"
                variant="dark"
                className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest border-white/20"
              />
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
