"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Wine,
  Utensils,
  Bed,
  Users,
  ArrowRight,
  Clock,
  Sparkles,
  MapPin,
  Check,
  ChevronRight,
} from "lucide-react";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";

interface Venue {
  id: string;
  floorBadge: string;
  tabLabel: string;
  shortLevel: string;
  name: string;
  category: string;
  tagline: string;
  hours: string;
  description: string;
  image: string;
  highlights: string[];
  href: string;
  waIntent: string;
  icon: React.ElementType;
}

const VENUES: Venue[] = [
  {
    id: "casabay",
    floorBadge: "L4",
    tabLabel: "CasaBay",
    shortLevel: "Level 4 · Rooftop",
    name: "CasaBay Restobar",
    category: "Rooftop Lounge & Mixology",
    tagline: "Take the evening upstairs.",
    hours: "5:00 PM – 11:30 PM",
    description:
      "Angamaly's premier open-air rooftop destination. Handcrafted cocktails, charcoal grills, and twilight skyline energy accompanied by acoustic live music sessions.",
    image: "/images/casabay/casa-cocktail-deck.webp",
    highlights: [
      "Open-air sky terrace with panoramic views",
      "Full craft cocktail & mixology bar",
      "Live tandoor & small charcoal plates",
      "Acoustic music & twilight atmosphere",
    ],
    href: "/casabay",
    waIntent: "CasaBay Rooftop Reservation",
    icon: Wine,
  },
  {
    id: "fishtown",
    floorBadge: "L1",
    tabLabel: "Fish Town",
    shortLevel: "Level 1 · All-Day Dining",
    name: "Fish Town Multi-Cuisine",
    category: "Multi-Cuisine Restaurant",
    tagline: "Fresh catch. Local soul.",
    hours: "7:30 AM – 11:00 PM",
    description:
      "Celebrating Kerala's coastal culinary roots with daily fresh fish curries, generous family portions, authentic North Indian tandoor, Chinese and Continental favorites.",
    image: "/images/fishtown/restaurant-hero.webp",
    highlights: [
      "Daily coastal fish catch cooked to order",
      "Traditional Kerala clay-pot fish curries",
      "Illuminated wave wall & plush family booths",
      "Full breakfast, lunch & dinner service",
    ],
    href: "/fishtown",
    waIntent: "Fish Town Table Reservation",
    icon: Utensils,
  },
  {
    id: "rooms",
    floorBadge: "L2",
    tabLabel: "10 Rooms",
    shortLevel: "Level 2 · Accommodations",
    name: "10 Boutique Rooms",
    category: "AC Rooms & Executive Bar",
    tagline: "Built for a proper night's rest.",
    hours: "24/7 Front Desk",
    description:
      "Ten peaceful, sound-insulated air-conditioned rooms designed for restful stays. Features complimentary breakfast, high-speed WiFi, and access to the resident Executive Bar.",
    image: "/images/rooms/room-hero.webp",
    highlights: [
      "10 quiet, sound-insulated AC rooms",
      "Complimentary morning breakfast & WiFi",
      "Resident Executive Bar on the floor",
      "Just ~5 km (10 mins) from Kochi Airport",
    ],
    href: "/rooms",
    waIntent: "Boutique Room Reservation",
    icon: Bed,
  },
  {
    id: "townhall",
    floorBadge: "G",
    tabLabel: "Town Hall",
    shortLevel: "Ground · Banquets & Meetings",
    name: "Town Hall & Boardroom",
    category: "120-Pax Arena & Executive Suite",
    tagline: "Where the whole guest list fits.",
    hours: "Custom Event Timings",
    description:
      "A dedicated 120-guest banquet hall for weddings, reception dinners, and conferences, paired with an executive 12-seat boardroom. Live in-house catering by Fish Town.",
    image: "/images/town-hall/hall-lighting.webp",
    highlights: [
      "Grand banquet arena for up to 120 guests",
      "Dedicated 12-delegate executive boardroom",
      "Full AV staging & acoustic insulation",
      "Live multi-cuisine banquet catering",
    ],
    href: "/town-hall",
    waIntent: "Town Hall Banquet Enquiry",
    icon: Users,
  },
];

export default function DestinationShowcase() {
  const [activeId, setActiveId] = useState<string>("casabay");
  const activeVenue = VENUES.find((v) => v.id === activeId) || VENUES[0];
  const IconComponent = activeVenue.icon;

  return (
    <section id="destination-showcase" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      {/* Editorial Eyebrow & Title */}
      <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#111726] border border-[#E5C158]/30 mb-3 shadow-[0_0_15px_rgba(229,193,88,0.12)]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
            The Chettungal Experience
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
          Explore Our Four Levels
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mt-3 leading-relaxed">
          From open-sky twilight cocktails to coastal family feasts and executive suites — select a floor to preview the experience.
        </p>

        {/* Level Switcher: Desktop Pill Bar / Mobile Horizontal Scroll */}
        <div className="mt-8 w-full max-w-4xl">
          <div className="flex items-center justify-between sm:justify-center gap-2 p-1.5 rounded-full bg-[#111726]/90 border border-[#E5C158]/20 backdrop-blur-md overflow-x-auto no-scrollbar shadow-xl">
            {VENUES.map((venue) => {
              const VenueIcon = venue.icon;
              const isSelected = venue.id === activeId;
              return (
                <button
                  key={venue.id}
                  onClick={() => setActiveId(venue.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] shadow-lg scale-102"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <VenueIcon className={`w-3.5 h-3.5 ${isSelected ? "text-[#0C101B]" : "text-[#E5C158]"}`} />
                  <span className="text-[10px] sm:text-xs opacity-80 font-mono">
                    {venue.floorBadge} ·
                  </span>
                  <span className="whitespace-nowrap">{venue.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
        {/* Left: Showcase Photography with 3D Tilt */}
        <div className="lg:col-span-7 flex flex-col">
          <TiltCard3D maxTilt={6} className="h-full rounded-sm">
            <div className="relative aspect-[16/10] sm:aspect-[4/3] lg:aspect-auto lg:h-full min-h-[300px] sm:min-h-[420px] rounded-sm overflow-hidden border border-[#E5C158]/30 shadow-2xl bg-[#111726] group">
              <Image
                key={activeVenue.image}
                src={activeVenue.image}
                alt={activeVenue.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105 brightness-95"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B] via-transparent to-black/30" />

              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-sm text-[11px] uppercase tracking-widest font-semibold bg-[#0C101B]/90 text-[#E5C158] border border-[#E5C158]/40 backdrop-blur-md shadow-md">
                  {activeVenue.shortLevel}
                </span>
                <span className="px-3 py-1 rounded-sm text-[11px] font-medium bg-black/60 text-slate-200 border border-white/10 backdrop-blur-md hidden sm:inline-flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-[#E5C158]" />
                  {activeVenue.hours}
                </span>
              </div>

              {/* Bottom Tagline on Image */}
              <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6">
                <p className="text-xl sm:text-2xl font-serif text-white italic drop-shadow-md">
                  &ldquo;{activeVenue.tagline}&rdquo;
                </p>
                <span className="text-xs uppercase tracking-widest text-[#E5C158] font-medium mt-1 block">
                  {activeVenue.category}
                </span>
              </div>
            </div>
          </TiltCard3D>
        </div>

        {/* Right: Curated Details & Actions */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-sm bg-[#111726]/80 border border-[#E5C158]/20 backdrop-blur-md shadow-xl">
          <div>
            <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-[#E5C158] font-semibold block mb-1">
                  {activeVenue.shortLevel}
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif text-white">
                  {activeVenue.name}
                </h3>
              </div>
              <div className="w-10 h-10 rounded-sm bg-[#0C101B] border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0">
                <IconComponent className="w-5 h-5" />
              </div>
            </div>

            <p className="text-sm font-light text-slate-300 leading-relaxed mb-6">
              {activeVenue.description}
            </p>

            <div className="mb-8">
              <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold block mb-3">
                Experience Highlights
              </span>
              <ul className="space-y-2.5">
                {activeVenue.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 font-light">
                    <div className="w-4 h-4 rounded-full bg-[#E5C158]/15 border border-[#E5C158]/40 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 text-[#E5C158]" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row gap-3">
            <Link
              href={activeVenue.href}
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-all shadow-md text-center"
            >
              <span>Explore {activeVenue.name.split(" ")[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <WhatsAppCta
              intent={activeVenue.waIntent}
              label="Direct WhatsApp"
              variant="outline"
              className="flex-1 py-3 px-4 text-xs uppercase tracking-wider text-slate-200 border-white/20 hover:border-[#E5C158] hover:text-[#E5C158] text-center"
            />
          </div>
        </div>
      </div>

      {/* Visual Navigation Strip: Quick jump thumbnails */}
      <div className="mt-10 sm:mt-14 pt-8 border-t border-white/10">
        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold block mb-4 text-center sm:text-left">
          Jump to Another Level
        </span>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {VENUES.map((venue) => {
            const isSelected = venue.id === activeId;
            return (
              <button
                key={venue.id}
                onClick={() => setActiveId(venue.id)}
                className={`group relative flex items-center gap-3 p-2.5 sm:p-3 rounded-sm border text-left transition-all duration-300 ${
                  isSelected
                    ? "bg-[#131A2B] border-[#E5C158] shadow-lg ring-1 ring-[#E5C158]/50"
                    : "bg-[#111726]/60 border-white/10 hover:border-white/20 hover:bg-[#162033]"
                }`}
              >
                <div className="relative w-12 h-12 rounded-sm overflow-hidden shrink-0 border border-white/10">
                  <Image
                    src={venue.image}
                    alt={venue.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-widest text-[#E5C158] font-mono block">
                    {venue.floorBadge}
                  </span>
                  <span className="text-xs font-serif text-white font-medium truncate block group-hover:text-[#E5C158] transition-colors">
                    {venue.tabLabel}
                  </span>
                  <span className="text-[10px] text-slate-400 font-light truncate block">
                    {venue.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
