import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Sparkles,
  Users,
  Utensils,
  Wine,
  Briefcase,
  Bed,
  MapPin,
  Clock,
  ShieldCheck,
  Plane,
  Train,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import Property3DNavigator from "@/components/3d/Property3DNavigator";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

export default function HomePage() {
  const assets = [
    {
      id: "casabay",
      title: "CasaBay",
      role: "Rooftop Restobar",
      tagline: "Take the evening upstairs.",
      href: "/casabay",
      image: "/images/casabay/casa-hero.webp",
      badge: "Rooftop · Open 5 PM · Live Music",
      accent: "border-[#D4AF37]/30 hover:border-[#D4AF37]",
      features: ["Open-air rooftop, full bar", "Cocktails, grills, small plates", "Live music nights & twilight skyline"],
    },
    {
      id: "fishtown",
      title: "Fish Town",
      role: "Multi-Cuisine Restaurant",
      tagline: "Fresh catch. Local soul.",
      href: "/fishtown",
      image: "/images/fishtown/restaurant-hero.webp",
      badge: "Breakfast · Lunch · Dinner",
      accent: "border-[#E59866]/40 hover:border-[#E59866]",
      features: ["Fresh daily catch & coastal curries", "Kerala, North Indian, Chinese & Continental", "Family tables & business lunch booths"],
    },
    {
      id: "town-hall",
      title: "Town Hall",
      role: "120 Pax Banquet Arena",
      tagline: "Where the whole guest list fits.",
      href: "/town-hall",
      image: "/images/town-hall/hall-hero.webp",
      badge: "Up to 120 Guests",
      accent: "border-[#D4AF37]/30 hover:border-[#D4AF37]",
      features: ["Conferences, weddings & celebrations", "Theatre, banquet & floor setups", "Live in-house catering by Fish Town"],
    },
    {
      id: "board-room",
      title: "The Boardroom",
      role: "Executive Meeting Suite",
      tagline: "A room built for focus.",
      href: "/board-room",
      image: "/images/board-room/boardroom-hero.webp",
      badge: "Dedicated Room · For 12",
      accent: "border-slate-700 hover:border-[#D4AF37]",
      features: ["Quiet, dedicated meeting suite", "Ready for presentations & closed-door discussions", "Boardroom-style seating for 12"],
    },
  ];

  return (
    <div className="flex flex-col bg-[#0A0D12] text-slate-100 overflow-hidden">
      {/* 1. HERO SECTION WITH CINEMATIC OBSIDIAN & REAL CASABAY PHOTO */}
      <section className="relative min-h-[96vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Real CasaBay Hero Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/casabay/casa-hero.webp"
            alt="CasaBay Rooftop Restobar at Chettungal New Town Hotel"
            fill
            className="object-cover object-center brightness-[0.38] contrast-110 scale-105 transition-transform duration-1000"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/50 to-black/80" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/40 backdrop-blur-md mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
              NH 544, Angamaly, Kerala · Destination Hospitality
            </span>
          </div>

          {/* Brochure Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif text-white tracking-tight leading-[1.05] mb-6">
            Stay · Dine · Meet · <br />
            <span className="italic font-light gold-gradient-text">Celebrate</span>
          </h1>

          {/* Positioning statement */}
          <p className="max-w-2xl text-base sm:text-lg md:text-xl font-light text-slate-200 leading-relaxed mb-10">
            Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 —{" "}
            <span className="text-[#D4AF37] font-normal">all under one roof on NH 544, Angamaly.</span>
          </p>

          {/* Dual Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/enquire"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12] hover:brightness-110 transition-all shadow-xl hover:shadow-2xl"
            >
              <span>Enquire for Dining or Events</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <WhatsAppCta
              intent="General Destination Enquiry"
              label={`WhatsApp: ${SITE_CONFIG.phone}`}
              variant="dark"
              className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest"
            />
          </div>

          {/* Quick anchor pills */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-light text-slate-300 tracking-wider">
            <div className="flex items-center justify-center gap-2">
              <Wine className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>CasaBay Rooftop</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Utensils className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Fish Town Dining</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Users className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Town Hall 120 Pax</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Bed className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>10 Boutique Rooms</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. 3D DESTINATION EXPLORER (PROPERTY NAVIGATOR) */}
      <section className="bg-gradient-to-b from-[#0A0D12] via-[#0F141F] to-[#0A0D12] border-y border-[#D4AF37]/20">
        <Property3DNavigator />
      </section>

      {/* 3. FOUR HERO TILES WITH 3D TILT EFFECT */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <SectionHeader
          eyebrow="The Destination Pillars"
          title="Four Distinct Experiences"
          subtitle="Explore our rooftop restobar, multi-cuisine restaurant, grand banquet arena, and corporate boardroom."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {assets.map((asset) => (
            <TiltCard3D key={asset.id} className="rounded-sm" maxTilt={8}>
              <Link
                href={asset.href}
                className={`group flex flex-col h-full bg-[#111622]/90 border ${asset.accent} rounded-sm overflow-hidden transition-all duration-300 hover:shadow-2xl`}
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/60">
                  <Image
                    src={asset.image}
                    alt={asset.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111622] via-[#111622]/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-[11px] uppercase tracking-widest font-semibold bg-[#0A0D12]/90 text-[#D4AF37] border border-[#D4AF37]/30 rounded-sm backdrop-blur-md">
                      {asset.badge}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-serif text-3xl text-white tracking-wide group-hover:text-[#D4AF37] transition-colors">
                        {asset.title}
                      </h3>
                      <span className="text-xs uppercase tracking-wider text-slate-400 font-light">
                        {asset.role}
                      </span>
                    </div>
                    <p className="text-sm font-serif text-[#D4AF37] italic mb-4">
                      &ldquo;{asset.tagline}&rdquo;
                    </p>

                    <ul className="space-y-2 mb-6 text-xs text-slate-300">
                      {asset.features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-semibold uppercase tracking-widest text-[#D4AF37]">
                    <span>Explore {asset.title}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </Link>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* 4. ROOMS & EXECUTIVE BAR SUPPORTING STRIP */}
      <section className="py-20 bg-[#0E131C] border-y border-white/10">
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
                <span className="text-[#D4AF37]">Resident Executive Bar</span>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2">
                Stay & Rest
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-white tracking-tight mb-4">
                10 Air-Conditioned Rooms & The Executive Bar
              </h3>
              <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed mb-6">
                Each built for a proper night’s rest — complimentary breakfast and high-speed WiFi included, so business stays and leisure stays get the same standard.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/rooms"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-semibold rounded-sm bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors"
                >
                  <span>View Rooms & Suites</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                </Link>
                <WhatsAppCta
                  intent="Room Stay Direct Enquiry"
                  label="Enquire Room Availability"
                  variant="outline"
                  className="px-6 py-3 text-xs uppercase tracking-widest"
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
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2 block">
              Connectivity & Proximity
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white tracking-tight mb-4">
              On NH 544, Angamaly
            </h2>
            <p className="text-sm sm:text-base font-light text-slate-300 leading-relaxed mb-6">
              Located conveniently on the major transport spine with effortless access to Cochin International Airport and Angamaly Railway Station.
            </p>

            <div className="space-y-3.5 text-sm text-slate-300 mb-8">
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                <span>{SITE_CONFIG.address}, {SITE_CONFIG.cityState} {SITE_CONFIG.pincode}</span>
              </div>
              <div className="flex items-center gap-3">
                <Plane className="w-4 h-4 text-[#D4AF37]" />
                <span>{SITE_CONFIG.proximity.airport}</span>
              </div>
              <div className="flex items-center gap-3">
                <Train className="w-4 h-4 text-[#D4AF37]" />
                <span>{SITE_CONFIG.proximity.railway}</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Free parking, High-speed WiFi & Business center</span>
              </div>
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#D4AF37] hover:text-white transition-colors"
            >
              <span>Explore Location & Directions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl">
            <Image
              src="/images/location/facade.webp"
              alt="Hotel New Town by Chettungal Facade on NH 544 Angamaly"
              fill
              className="object-cover brightness-95"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-slate-200">
              <span className="font-serif text-lg">CHETTUNGAL HOTEL NEW TOWN</span>
              <a
                href={SITE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12] font-bold rounded-sm tracking-wider uppercase text-[10px] hover:brightness-110 transition-colors"
              >
                Open Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONVERSION BANNER */}
      <section className="py-20 bg-gradient-to-b from-[#111724] to-[#080B10] border-t border-[#D4AF37]/20 text-center px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-3">
            Direct Host Assistance
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal mb-6">
            Reserve a Table or Plan an Event
          </h2>
          <p className="text-base text-slate-300 font-light leading-relaxed mb-10 max-w-xl">
            Whether booking an intimate rooftop evening at CasaBay, a family feast at Fish Town, or a 120-guest banquet at Town Hall, our team responds directly on WhatsApp.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href="/enquire"
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12] hover:brightness-110 transition-colors shadow-lg"
            >
              Fill Online Enquiry Form
            </Link>
            <WhatsAppCta
              intent="Direct Banner Enquiry"
              label={`Chat on WhatsApp (${SITE_CONFIG.phone})`}
              variant="dark"
              className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
