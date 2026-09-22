import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Wine,
  Utensils,
  Users,
  Briefcase,
  Bed,
  MapPin,
  Clock,
  Sparkles,
  Plane,
  Train,
  CheckCircle2,
} from "lucide-react";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Hotel New Town by Chettungal | Stay · Dine · Meet · Celebrate",
  description:
    "Rooftop Restobar (CasaBay), Multi-Cuisine Dining (Fish Town), 120-pax Banquet Arena (Town Hall), and 10 Boutique Rooms on NH 544, Angamaly, Kerala.",
  openGraph: {
    title: "Hotel New Town by Chettungal — Angamaly",
    description: "Where Evenings Rise Above. Rooftop Restobar, Multi-Cuisine Dining, Banquets, and Boutique Rooms on NH 544.",
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
    description: "Stay · Dine · Meet · Celebrate on NH 544, Angamaly.",
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
    <div className="flex flex-col bg-[#FAF8F5] text-stone-900 selection:bg-[#C8A962] selection:text-[#0E131C] overflow-hidden">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. CINEMATIC HERO SECTION (Clean, Uncluttered, High Atmosphere) */}
      <section className="relative min-h-[92vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0D14]">
        {/* Real Vibrant Background Image (treated lightly so details pop) */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/casabay/casa-night-view.webp"
            alt="CasaBay Rooftop Restobar at Chettungal New Town Hotel"
            fill
            className="object-cover object-center brightness-75 contrast-105 scale-105 transition-transform duration-1000"
            priority
          />
          {/* Subtle vignette gradients for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/30 to-black/60" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center pt-24 pb-16">
          {/* Subtle Location Eyebrow */}
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#E5C158] font-medium mb-4">
            HOTEL NEW TOWN · NH 544, ANGAMALY
          </span>

          {/* Bold Editorial Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] mb-5">
            Where Evenings <br />
            <span className="italic font-light text-[#E5C158]">Rise Above</span>
          </h1>

          {/* Clean One-Line Subtitle */}
          <p className="max-w-xl text-base sm:text-lg text-slate-200 font-light leading-relaxed mb-8">
            Open-sky rooftop restobar, coastal dining, banquets for up to 120, and 10 boutique rooms.
          </p>

          {/* Streamlined Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/enquire"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#C8A962] text-[#0A0D12] hover:brightness-110 transition-all shadow-xl"
            >
              <span>Reserve a Table or Event</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href={buildWhatsAppLink("Hero Instant Concierge")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-xs uppercase tracking-widest font-medium rounded-sm bg-black/40 text-slate-200 border border-white/20 hover:border-[#E5C158] hover:text-white transition-all backdrop-blur-md"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#E5C158]" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>

          {/* Understated Minimalist Key Facts Strip */}
          <div className="mt-12 pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-light text-slate-300 tracking-wider">
            <span>Rooftop Restobar</span>
            <span className="text-[#E5C158]">·</span>
            <span>Multi-Cuisine Dining</span>
            <span className="text-[#E5C158]">·</span>
            <span>120 Pax Banquet</span>
            <span className="text-[#E5C158]">·</span>
            <span>~5 km to Kochi Airport</span>
          </div>
        </div>
      </section>

      {/* 2. THE ESSENCE STATEMENT (Warm Alabaster Linen Canvas) */}
      <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <span className="text-xs uppercase tracking-[0.3em] text-[#B89344] font-semibold mb-4 block">
          THE DESTINATION
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif text-stone-900 leading-snug tracking-tight font-normal mb-8">
          &ldquo;Chettungal brings together what Angamaly was missing — an open-sky rooftop restobar under the stars, a kitchen steeped in Kerala’s coastal soul, and spaces designed for the gatherings that matter.&rdquo;
        </h2>
        <div className="h-0.5 w-16 bg-[#C8A962] mx-auto mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left border-t border-stone-200 pt-10">
          <div>
            <span className="text-xs font-mono text-[#B89344] block mb-1">01 / DINE & DRINK</span>
            <h3 className="font-serif text-xl text-stone-900 mb-2">CasaBay & Fish Town</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              From open-air evening cocktails with skyline views to authentic Kerala curries and tandoori feasts.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono text-[#B89344] block mb-1">02 / GATHER & CELEBRATE</span>
            <h3 className="font-serif text-xl text-stone-900 mb-2">Town Hall & Boardroom</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Banquets for up to 120 guests with in-house catering, alongside a dedicated 12-seat corporate suite.
            </p>
          </div>
          <div>
            <span className="text-xs font-mono text-[#B89344] block mb-1">03 / STAY & REST</span>
            <h3 className="font-serif text-xl text-stone-900 mb-2">10 Boutique Rooms</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
              Sound-insulated air-conditioned rooms with complimentary breakfast and access to the resident Executive Bar.
            </p>
          </div>
        </div>
      </section>

      {/* 3. PILLAR 1: CASABAY (Cinematic Midnight Lounge Showcase) */}
      <section className="bg-[#0D111A] text-slate-100 py-24 px-4 sm:px-6 lg:px-8 border-y border-[#C8A962]/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden shadow-2xl border border-white/10 group">
                <Image
                  src="/images/casabay/casa-sunset.webp"
                  alt="CasaBay Rooftop Restobar Bar & Dining"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-200">
                  <span className="font-serif text-lg text-white">CasaBay Rooftop Restobar</span>
                  <span className="px-3 py-1 bg-[#C8A962] text-[#0A0D12] text-[10px] uppercase font-bold tracking-wider rounded-sm">
                    Level 4 · Open 5 PM
                  </span>
                </div>
              </div>

              {/* Secondary Detail Row */}
              <div className="grid grid-cols-2 gap-4">
                <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-white/10">
                  <Image
                    src="/images/casabay/casa-bar.webp"
                    alt="CasaBay Bar Counter and Cocktails"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider text-slate-200 font-medium">
                    Signature Bar Counter
                  </span>
                </div>
                <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-white/10">
                  <Image
                    src="/images/casabay/casa-cocktail-deck.webp"
                    alt="CasaBay Open-Air Skyline Deck"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                  <span className="absolute bottom-2 left-2 text-[10px] uppercase tracking-wider text-slate-200 font-medium">
                    Open-Air Skyline Deck
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.3em] text-[#E5C158] font-semibold mb-2">
                THE HERO ASSET
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif text-white tracking-tight mb-2">
                CasaBay
              </h3>
              <p className="text-lg font-serif italic text-[#E5C158] mb-5">
                &ldquo;Take the evening upstairs.&rdquo;
              </p>
              <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed mb-6">
                An open-air rooftop resto-bar built for conversations, cocktails, and music under the stars. Enjoy handcrafted botanical mixology, charcoal grills, and small plates overlooking the Angamaly skyline.
              </p>

              <div className="space-y-3 mb-8 text-xs sm:text-sm text-slate-300 font-light">
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
                  <span>Handcrafted mixology, tandoori grills & tapas</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
                  <span>Live acoustic sessions & weekend sundowners</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
                  <span>Daily service: 5:00 PM – 11:30 PM</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3.5">
                <Link
                  href="/casabay"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#C8A962] text-[#0A0D12] hover:brightness-110 transition-all shadow-md"
                >
                  <span>Explore CasaBay Menu</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <WhatsAppCta
                  intent="CasaBay Table Reservation"
                  label="Reserve Rooftop Table"
                  variant="dark"
                  className="w-full sm:w-auto px-6 py-3.5 text-xs uppercase tracking-widest"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PILLAR 2: FISH TOWN (Appetizing Warm Ivory Dining Showcase) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FAF8F5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Narrative Column */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89344] font-semibold mb-2">
              COASTAL SOUL & DINING
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif text-stone-900 tracking-tight mb-2">
              Fish Town
            </h3>
            <p className="text-lg font-serif italic text-[#B89344] mb-5">
              &ldquo;Fresh catch. Local soul.&rdquo;
            </p>
            <p className="text-sm sm:text-base font-light text-stone-600 leading-relaxed mb-6">
              Our multi-cuisine restaurant celebrates the food Kerala knows best — fresh fish from coastal shores, generous family portions, and native spices. Also serving North Indian tandoor, Chinese delights, and Continental classics.
            </p>

            <div className="space-y-3 mb-8 text-xs sm:text-sm text-stone-700 font-light">
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89344]" />
                <span>Daily fresh coastal catch, Karimeen, prawns & curries</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89344]" />
                <span>Comfortable family dining tables & business lunch booths</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B89344]" />
                <span>Breakfast, Lunch & Dinner (7:30 AM – 11:00 PM)</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <Link
                href="/fishtown"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm"
              >
                <span>Explore Fish Town</span>
                <ArrowRight className="w-4 h-4 text-[#C8A962]" />
              </Link>
              <WhatsAppCta
                intent="Fish Town Table Booking"
                label="Book a Dining Table"
                variant="outline"
                className="w-full sm:w-auto px-6 py-3.5 text-xs uppercase tracking-widest border-stone-300 text-stone-900 hover:bg-stone-100"
              />
            </div>
          </div>

          {/* Visual Column */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-4">
            <div className="relative aspect-[16/10] w-full rounded-sm overflow-hidden shadow-xl border border-stone-200 group bg-white">
              <Image
                src="/images/fishtown/restaurant-hero.webp"
                alt="Fish Town Restaurant Dining Space with Wave Wall"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="font-serif text-lg">Signature Wave-Wall Dining</span>
                <span className="px-3 py-1 bg-white text-stone-900 text-[10px] uppercase font-bold tracking-wider rounded-sm shadow">
                  Level 1 · All-Day
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-stone-200 shadow-sm">
                <Image
                  src="/images/fishtown/restaurant-2.webp"
                  alt="Fish Town Family Tables and Wicker Lighting"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-stone-200 shadow-sm">
                <Image
                  src="/images/fishtown/restaurant-3.webp"
                  alt="Fish Town Contemporary Interior Partitions"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PILLAR 3: EVENT ARENAS (Town Hall & Boardroom — Clean Architectural Dual Feature) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F2EB] border-y border-stone-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89344] font-semibold mb-2 block">
              GATHERINGS & CONFERENCES
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-stone-900 tracking-tight">
              Spaces Tailored to the Occasion
            </h2>
            <p className="text-sm sm:text-base text-stone-600 font-light mt-3">
              From full-scale banquets with live in-house catering to private corporate boardroom sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {/* Town Hall Card */}
            <div className="bg-white rounded-sm border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src="/images/town-hall/hall-hero.webp"
                    alt="Town Hall Banquet Arena 120 Pax"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[11px] uppercase tracking-wider font-semibold bg-[#0A0D12]/80 text-[#E5C158] rounded-sm backdrop-blur-md">
                      Up to 120 Guests
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-2">
                    Town Hall Banquet Arena
                  </h3>
                  <p className="text-xs font-serif italic text-[#B89344] mb-4">
                    &ldquo;Where the whole guest list fits.&rdquo;
                  </p>
                  <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                    Our premier indoor venue for weddings, family celebrations, and large corporate gatherings. Adaptable to theatre, cluster, or banquet layouts with dedicated in-house catering by Fish Town.
                  </p>

                  <div className="space-y-2 text-xs text-stone-700 font-light mb-6 border-t border-stone-100 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B89344]" />
                      <span>Stage, audio-visual ready & custom lighting</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B89344]" />
                      <span>Live buffet & seated Kerala / Multi-cuisine banquet options</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between">
                <Link
                  href="/town-hall"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-[#B89344] transition-colors"
                >
                  <span>Explore Town Hall</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <WhatsAppCta
                  intent="Town Hall Banquet Booking"
                  label="Enquire Dates"
                  variant="outline"
                  className="text-xs uppercase tracking-wider px-4 py-2 border-stone-300"
                />
              </div>
            </div>

            {/* The Boardroom Card */}
            <div className="bg-white rounded-sm border border-stone-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                  <Image
                    src="/images/board-room/boardroom-hero.webp"
                    alt="The Boardroom Executive Meeting Suite for 12"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[11px] uppercase tracking-wider font-semibold bg-[#0A0D12]/80 text-[#E5C158] rounded-sm backdrop-blur-md">
                      Executive Suite · 12 Pax
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-2">
                    The Boardroom
                  </h3>
                  <p className="text-xs font-serif italic text-[#B89344] mb-4">
                    &ldquo;A room built for focus.&rdquo;
                  </p>
                  <p className="text-sm text-stone-600 font-light leading-relaxed mb-6">
                    A quiet, dedicated executive meeting suite designed for confidential boardroom discussions, presentations, and team off-sites. Located just 5 km from Cochin Airport.
                  </p>

                  <div className="space-y-2 text-xs text-stone-700 font-light mb-6 border-t border-stone-100 pt-4">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B89344]" />
                      <span>Boardroom-style seating for 12 with high-speed WiFi</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B89344]" />
                      <span>Presentation AV support & continuous coffee service</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 sm:p-8 pt-0 flex items-center justify-between">
                <Link
                  href="/board-room"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-stone-900 hover:text-[#B89344] transition-colors"
                >
                  <span>Explore The Boardroom</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <WhatsAppCta
                  intent="Boardroom Reservation"
                  label="Reserve Suite"
                  variant="outline"
                  className="text-xs uppercase tracking-wider px-4 py-2 border-stone-300"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PILLAR 4: 10 BOUTIQUE ROOMS (Restful Hospitality Feature) */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-[#FAF8F5]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-stone-200 rounded-sm p-6 sm:p-10 shadow-sm">
          <div className="lg:col-span-6 relative aspect-[16/10] rounded-sm overflow-hidden">
            <Image
              src="/images/rooms/room-hero.webp"
              alt="10 Air Conditioned Boutique Rooms"
              fill
              className="object-cover"
            />
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89344] font-semibold mb-2">
              REST & REJUVENATION
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-stone-900 tracking-tight mb-3">
              10 Air-Conditioned Boutique Rooms & Executive Bar
            </h3>
            <p className="text-sm font-light text-stone-600 leading-relaxed mb-6">
              Each room is designed for a proper night’s rest — with complimentary breakfast, high-speed WiFi, and exclusive access to the resident Executive Bar. Ideal for airport layovers, business travelers, and wedding party stays.
            </p>

            {/* Inclusions Row */}
            <div className="grid grid-cols-2 gap-3 text-xs text-stone-700 font-light mb-8">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89344]" />
                <span>Complimentary Breakfast</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89344]" />
                <span>High-Speed WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89344]" />
                <span>Resident Executive Bar</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#B89344]" />
                <span>~5 km to Kochi Airport</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <Link
                href="/rooms"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm"
              >
                <span>View Rooms & Suites</span>
                <ArrowRight className="w-4 h-4 text-[#C8A962]" />
              </Link>
              <WhatsAppCta
                intent="Room Booking Enquiry"
                label="Check Room Availability"
                variant="outline"
                className="w-full sm:w-auto px-6 py-3.5 text-xs uppercase tracking-widest border-stone-300 text-stone-900"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. LOCATION & CONNECTIVITY STRIP */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.3em] text-[#B89344] font-semibold mb-2 block">
              LOCATION & ACCESS
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 tracking-tight mb-4">
              Directly on NH 544, Angamaly
            </h2>
            <p className="text-sm sm:text-base font-light text-stone-600 leading-relaxed mb-6">
              Effortlessly accessible on the Kochi-Salem highway corridor with seamless connectivity to the airport and rail network.
            </p>

            <div className="space-y-3.5 text-sm text-stone-700 mb-8 font-light">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#B89344] shrink-0" />
                <span>{SITE_CONFIG.address}, {SITE_CONFIG.cityState} {SITE_CONFIG.pincode}</span>
              </div>
              <div className="flex items-center gap-3">
                <Plane className="w-4 h-4 text-[#B89344] shrink-0" />
                <span>{SITE_CONFIG.proximity.airport}</span>
              </div>
              <div className="flex items-center gap-3">
                <Train className="w-4 h-4 text-[#B89344] shrink-0" />
                <span>{SITE_CONFIG.proximity.railway}</span>
              </div>
            </div>

            <a
              href={SITE_CONFIG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-sm bg-stone-900 text-white hover:bg-stone-800 transition-colors shadow-sm"
            >
              <span>Open in Google Maps Navigation</span>
              <ArrowRight className="w-4 h-4 text-[#C8A962]" />
            </a>
          </div>

          <div className="relative aspect-[16/10] rounded-sm overflow-hidden shadow-lg border border-stone-200">
            <Image
              src="/images/location/facade.webp"
              alt="Hotel New Town by Chettungal Facade on NH 544 Angamaly"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 8. INSTANT CONCIERGE BANNER (Warm Midnight Invitation) */}
      <section className="py-20 bg-[#0D111A] text-slate-100 text-center px-4 border-t border-[#C8A962]/20">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#E5C158] font-semibold mb-3">
            DIRECT HOST ASSISTANCE
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal mb-5">
            Reserve a Table or Plan an Event
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-8 max-w-lg">
            Our hosts respond directly on WhatsApp for rooftop reservations at CasaBay, family dining at Fish Town, or booking Town Hall.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full sm:w-auto">
            <Link
              href="/enquire"
              className="w-full sm:w-auto px-8 py-3.5 text-xs uppercase tracking-widest font-semibold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#C8A962] text-[#0A0D12] hover:brightness-110 transition-all shadow-lg"
            >
              Submit Online Enquiry
            </Link>
            <WhatsAppCta
              intent="Direct Banner Enquiry"
              label={`WhatsApp: ${SITE_CONFIG.phone}`}
              variant="dark"
              className="w-full sm:w-auto px-7 py-3.5 text-xs uppercase tracking-widest"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
