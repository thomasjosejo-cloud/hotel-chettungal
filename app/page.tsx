import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Sparkles,
  Users,
  Utensils,
  Wine,
  Briefcase,
  Bed,
  MapPin,
  Plane,
  Train,
  CheckCircle2,
  Layers,
  Compass,
} from "lucide-react";
import Property3DNavigator from "@/components/3d/Property3DNavigator";
import TiltCard3D from "@/components/3d/TiltCard3D";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import SectionHeader from "@/components/shared/SectionHeader";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Hotel New Town by Chettungal | Stay · Dine · Meet · Celebrate",
  description:
    "Four Floors. One Destination. CasaBay Rooftop Restobar, Fish Town Multi-Cuisine Kitchen, Town Hall 120-Pax Banquets, and 10 Boutique Rooms on NH 544, Angamaly, Kerala.",
  openGraph: {
    title: "Hotel New Town by Chettungal — Angamaly",
    description: "Four Floors. One Destination. Rooftop Restobar, Multi-Cuisine Dining, Banquets, and Boutique Rooms on NH 544.",
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
    description: "Four Floors. One Destination. Rooftop Restobar, Dining, Banquets on NH 544.",
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
  const pillars = [
    {
      id: "casabay",
      level: "Level 4 · Rooftop",
      title: "CasaBay",
      role: "Rooftop Restobar",
      tagline: "Take the evening upstairs.",
      href: "/casabay",
      image: "/images/casabay/casa-sunset.webp",
      badge: "Open 5 PM · Live Music",
      borderAccent: "border-[#E5C158]/40 hover:border-[#E5C158]",
      features: [
        "Open-air rooftop terrace & full bar",
        "Handcrafted mixology & charcoal grills",
        "Acoustic live music & twilight skyline",
      ],
    },
    {
      id: "fishtown",
      level: "Level 1 · Dining",
      title: "Fish Town",
      role: "Multi-Cuisine Restaurant",
      tagline: "Fresh catch. Local soul.",
      href: "/fishtown",
      image: "/images/fishtown/restaurant-hero.webp",
      badge: "Breakfast · Lunch · Dinner",
      borderAccent: "border-[#E5C158]/40 hover:border-[#E5C158]",
      features: [
        "Daily coastal fish catch & traditional curries",
        "Kerala, North Indian, Tandoor & Chinese",
        "Illuminated wave wall & family booths",
      ],
    },
    {
      id: "town-hall",
      level: "Ground · Banquets",
      title: "Town Hall",
      role: "120 Pax Banquet Arena",
      tagline: "Where the whole guest list fits.",
      href: "/town-hall",
      image: "/images/town-hall/hall-hero.webp",
      badge: "Up to 120 Guests",
      borderAccent: "border-[#E5C158]/40 hover:border-[#E5C158]",
      features: [
        "Conferences, weddings & family celebrations",
        "Theatre, round-table & custom setups",
        "Live in-house catering by Fish Town",
      ],
    },
    {
      id: "board-room",
      level: "Ground · Executive",
      title: "The Boardroom",
      role: "Executive Meeting Suite",
      tagline: "A room built for focus.",
      href: "/board-room",
      image: "/images/board-room/boardroom-hero.webp",
      badge: "Dedicated Suite · For 12",
      borderAccent: "border-[#E5C158]/40 hover:border-[#E5C158]",
      features: [
        "Quiet, sound-insulated meeting space",
        "Presentation AV & high-speed WiFi",
        "Boardroom-style seating for 12",
      ],
    },
  ];

  return (
    <div className="flex flex-col bg-[#0C101B] text-slate-100 overflow-hidden">
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. CINEMATIC 3D HERO SECTION */}
      <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Full Vibrancy Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/casabay/casa-night-view.webp"
            alt="CasaBay Rooftop Restobar at Chettungal New Town Hotel"
            fill
            className="object-cover object-center brightness-90 contrast-105 scale-105 transition-transform duration-1000"
            priority
          />
          {/* Rich Midnight Sapphire Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B] via-[#0C101B]/45 to-black/60" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#E5C158_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#111726]/80 border border-[#E5C158]/40 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(229,193,88,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
            <span className="text-[11px] uppercase tracking-[0.3em] font-semibold text-[#E5C158]">
              NH 544, Angamaly, Kerala · Destination Hospitality
            </span>
          </div>

          {/* Punchy, Confident Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] mb-5">
            Four Floors. <br />
            <span className="italic font-light gold-gradient-text">One Destination.</span>
          </h1>

          {/* Clean Subtitle */}
          <p className="max-w-2xl text-base sm:text-lg md:text-xl font-light text-slate-200 leading-relaxed mb-8">
            An open-sky rooftop restobar, coastal multi-cuisine dining, banquets for up to 120, and 10 boutique rooms —{" "}
            <span className="text-[#E5C158] font-normal">all under one roof in Angamaly.</span>
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#navigator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-all shadow-xl hover:shadow-2xl hover:scale-105 duration-300"
            >
              <Compass className="w-4 h-4" />
              <span>Explore 3D Property Navigator</span>
            </a>

            <WhatsAppCta
              intent="General Destination Enquiry"
              label={`WhatsApp Concierge: ${SITE_CONFIG.phone}`}
              variant="dark"
              className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest border border-white/20 bg-black/40 hover:border-[#E5C158]"
            />
          </div>

          {/* 4 Interactive Floor Quick-Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-4xl text-xs">
            <div className="p-3 rounded-sm bg-[#111726]/80 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2 text-slate-200 hover:border-[#E5C158]/50 transition-colors">
              <Wine className="w-4 h-4 text-[#E5C158]" />
              <span className="font-medium">Level 4: CasaBay Rooftop</span>
            </div>
            <div className="p-3 rounded-sm bg-[#111726]/80 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2 text-slate-200 hover:border-[#E5C158]/50 transition-colors">
              <Bed className="w-4 h-4 text-[#E5C158]" />
              <span className="font-medium">Level 2: 10 AC Rooms</span>
            </div>
            <div className="p-3 rounded-sm bg-[#111726]/80 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2 text-slate-200 hover:border-[#E5C158]/50 transition-colors">
              <Utensils className="w-4 h-4 text-[#E5C158]" />
              <span className="font-medium">Level 1: Fish Town Dining</span>
            </div>
            <div className="p-3 rounded-sm bg-[#111726]/80 border border-white/10 backdrop-blur-md flex items-center justify-center gap-2 text-slate-200 hover:border-[#E5C158]/50 transition-colors">
              <Users className="w-4 h-4 text-[#E5C158]" />
              <span className="font-medium">Ground: Town Hall 120 Pax</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3D INTERACTIVE PROPERTY NAVIGATOR */}
      <section className="bg-gradient-to-b from-[#0C101B] via-[#111726] to-[#0C101B] border-y border-[#E5C158]/25">
        <Property3DNavigator />
      </section>

      {/* 3. FOUR DESTINATION PILLARS WITH 3D TILT CARDS */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <SectionHeader
          eyebrow="Interactive Experience"
          title="Four Distinct Worlds"
          subtitle="Tilt, explore, and discover our rooftop restobar, coastal restaurant, banquet arena, and corporate boardroom."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {pillars.map((item) => (
            <TiltCard3D key={item.id} className="rounded-sm" maxTilt={8}>
              <Link
                href={item.href}
                className={`group flex flex-col h-full bg-[#131A2B]/90 border ${item.borderAccent} rounded-sm overflow-hidden transition-all duration-300 hover:shadow-2xl`}
              >
                {/* 3D Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#131A2B] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[11px] uppercase tracking-widest font-semibold bg-[#0C101B]/90 text-[#E5C158] border border-[#E5C158]/40 rounded-sm backdrop-blur-md shadow-lg">
                      {item.badge}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-serif text-3xl text-white tracking-wide group-hover:text-[#E5C158] transition-colors">
                        {item.title}
                      </h3>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-light">
                        {item.role}
                      </span>
                    </div>
                    <p className="text-sm font-serif text-[#E5C158] italic mb-4">
                      &ldquo;{item.tagline}&rdquo;
                    </p>

                    <ul className="space-y-2.5 mb-6 text-xs text-slate-300">
                      {item.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#E5C158]">
                    <span>Explore {item.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </Link>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* 4. 10 BOUTIQUE ROOMS & EXECUTIVE BAR STRIP */}
      <section className="py-20 bg-[#111726] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="/images/rooms/room-hero.webp"
                alt="Hotel New Town 10 Air Conditioned Rooms"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-300 flex items-center justify-between">
                <span>10 AC Rooms</span>
                <span className="text-[#E5C158]">Resident Executive Bar</span>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold mb-2">
                ACCOMMODATION · LEVEL 2
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-white tracking-tight mb-4">
                10 Air-Conditioned Rooms & The Executive Bar
              </h3>
              <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed mb-6">
                Each built for a proper night’s rest — with complimentary breakfast, high-speed WiFi, and exclusive access to the resident Executive Bar. Ideal for airport layovers, corporate travelers, and wedding parties.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-slate-200 mb-8">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                  <span>Complimentary Breakfast</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                  <span>High-Speed WiFi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                  <span>Resident Executive Bar</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#E5C158]" />
                  <span>~5 km to Airport</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-sm bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors"
                >
                  <span>View Rooms & Suites</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5C158]" />
                </Link>
                <WhatsAppCta
                  intent="Room Stay Direct Enquiry"
                  label="Enquire Room Availability"
                  variant="outline"
                  className="px-6 py-3 text-xs uppercase tracking-widest text-slate-200 border-white/25 hover:border-[#E5C158]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LOCATION & CONNECTIVITY STRIP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold mb-2 block">
              CONNECTIVITY & PROXIMITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-4">
              Directly on NH 544, Angamaly
            </h2>
            <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed mb-6">
              Located conveniently on the major transport spine with effortless access to Cochin International Airport, Angamaly Railway Station, and free on-site valet parking.
            </p>

            <div className="space-y-3.5 text-sm text-slate-300 mb-8 font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#E5C158]" />
                <span>{SITE_CONFIG.address}, {SITE_CONFIG.cityState} {SITE_CONFIG.pincode}</span>
              </div>
              <div className="flex items-center gap-3">
                <Plane className="w-4 h-4 text-[#E5C158]" />
                <span>{SITE_CONFIG.proximity.airport}</span>
              </div>
              <div className="flex items-center gap-3">
                <Train className="w-4 h-4 text-[#E5C158]" />
                <span>{SITE_CONFIG.proximity.railway}</span>
              </div>
            </div>

            <a
              href={SITE_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#E5C158] hover:text-white transition-colors"
            >
              <span>Open in Google Maps Navigation</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/location/facade.webp"
              alt="Hotel New Town by Chettungal Facade on NH 544 Angamaly"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 6. CONVERSION BANNER */}
      <section className="py-20 bg-gradient-to-b from-[#111726] to-[#0A0D14] border-t border-[#E5C158]/25 text-center px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E5C158] font-semibold mb-3">
            DIRECT HOST ASSISTANCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal mb-5">
            Reserve a Table or Plan an Event
          </h2>
          <p className="text-base text-slate-300 font-light leading-relaxed mb-10 max-w-xl">
            Whether booking an intimate rooftop evening at CasaBay, a family feast at Fish Town, or a 120-guest banquet at Town Hall, our team responds directly on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/enquire"
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-colors shadow-lg"
            >
              Fill Online Enquiry Form
            </Link>
            <WhatsAppCta
              intent="Direct Banner Enquiry"
              label={`Chat on WhatsApp (${SITE_CONFIG.phone})`}
              variant="dark"
              className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest border-white/20"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
