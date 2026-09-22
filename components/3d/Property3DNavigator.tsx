"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wine, Utensils, Users, Bed, ArrowRight, Sparkles, Clock, Check } from "lucide-react";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";

export default function Property3DNavigator() {
  const [activeFloor, setActiveFloor] = useState<"casabay" | "rooms" | "fishtown" | "townhall">("casabay");

  const floors = [
    {
      id: "casabay",
      floorBadge: "L4",
      level: "LEVEL 4 · ROOFTOP RESTOBAR",
      name: "CasaBay Restobar",
      tagline: "Take the evening upstairs.",
      badge: "Open 5 PM · Live Music",
      image: "/images/casabay/casa-cocktail-deck.webp",
      icon: Wine,
      accentBorder: "border-[#E5C158]",
      activeBg: "bg-[#182136]",
      desc: "Angamaly's premier open-air rooftop destination. Handcrafted cocktails, charcoal grills, and twilight skyline energy accompanied by acoustic live music sessions.",
      features: ["Full Bar & Craft Mixology", "Charcoal Grills & Tapas", "Live Music Acoustic Sessions", "Skyline Twilight Views"],
      href: "/casabay",
      waIntent: "CasaBay Rooftop Reservation",
    },
    {
      id: "rooms",
      floorBadge: "L2",
      level: "LEVEL 2 · BOUTIQUE ACCOMMODATIONS",
      name: "10 Boutique Rooms",
      tagline: "Built for a proper night's rest.",
      badge: "10 Air-Conditioned Rooms",
      image: "/images/rooms/room-hero.webp",
      icon: Bed,
      accentBorder: "border-[#E5C158]",
      activeBg: "bg-[#182136]",
      desc: "10 quiet air-conditioned rooms each built for a proper night’s rest — complimentary breakfast and high-speed WiFi included. Exclusive access to the resident Executive Bar.",
      features: ["Complimentary Breakfast", "High-Speed WiFi Included", "Resident Executive Bar", "~5 km to Airport"],
      href: "/rooms",
      waIntent: "Boutique Room Reservation",
    },
    {
      id: "fishtown",
      floorBadge: "L1",
      level: "LEVEL 1 · ALL-DAY DINING",
      name: "Fish Town Multi-Cuisine",
      tagline: "Fresh catch. Local soul.",
      badge: "Breakfast · Lunch · Dinner",
      image: "/images/fishtown/restaurant-hero.webp",
      icon: Utensils,
      accentBorder: "border-[#E5C158]",
      activeBg: "bg-[#182136]",
      desc: "Celebrates the food Kerala knows best — fresh fish, generous portions, and familiar spices. From a quick local meal to a table full of family and friends.",
      features: ["Fresh Daily Coastal Catch", "Kerala, North Indian, Chinese", "Continental Delicacies", "Spacious Family Tables"],
      href: "/fishtown",
      waIntent: "Fish Town Table Reservation",
    },
    {
      id: "townhall",
      floorBadge: "G",
      level: "GROUND · BANQUETS & EVENTS",
      name: "Town Hall & Boardroom",
      tagline: "Where the whole guest list fits.",
      badge: "Up to 120 Guests",
      image: "/images/town-hall/hall-lighting.webp",
      icon: Users,
      accentBorder: "border-[#E5C158]",
      activeBg: "bg-[#182136]",
      desc: "The hotel’s premier indoor venue — conferences, weddings, and family celebrations, laid out to suit the occasion and catered in-house by Fish Town from start to finish.",
      features: ["Theatre & Banquet Setups", "Up to 120 Guests", "Executive Boardroom for 12", "In-House Live Catering"],
      href: "/town-hall",
      waIntent: "Town Hall Banquet Enquiry",
    },
  ];

  const current = floors.find((f) => f.id === activeFloor) || floors[0];

  return (
    <div id="floor-navigator" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#E5C158]/40 backdrop-blur-md mb-3 shadow-[0_0_15px_rgba(229,193,88,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
            Interactive 3D Floor Explorer
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
          Four Floors. One Destination.
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto mt-3 leading-relaxed">
          Select a level to explore the rooftop restobar, boutique guest rooms, coastal kitchen, and grand banquet hall.
        </p>

        {/* Mobile Horizontal Floor Selector (shows on mobile, hidden on lg desktop) */}
        <div className="mt-6 flex lg:hidden items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {floors.map((fl) => {
            const Icon = fl.icon;
            const isSelected = activeFloor === fl.id;
            return (
              <button
                key={fl.id}
                onClick={() => setActiveFloor(fl.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] shadow-lg scale-102"
                    : "bg-[#111726]/80 text-slate-300 border border-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="font-mono opacity-80">{fl.floorBadge}</span>
                <span className="truncate">{fl.name.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Building Floor Navigator Tabs (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between gap-3.5">
          {floors.map((fl) => {
            const Icon = fl.icon;
            const isSelected = activeFloor === fl.id;
            return (
              <button
                key={fl.id}
                onClick={() => setActiveFloor(fl.id as any)}
                className={`group relative p-5 rounded-sm text-left transition-all duration-300 border ${
                  isSelected
                    ? `${fl.activeBg} border-[#E5C158] shadow-[0_10px_30px_rgba(12,16,27,0.8),0_0_20px_rgba(229,193,88,0.2)] translate-x-2`
                    : "bg-[#111726]/80 border-white/10 hover:border-white/25 hover:bg-[#162033]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 shrink-0 rounded-sm flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] shadow-md"
                          : "bg-white/5 text-slate-300 group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#E5C158] font-semibold block">
                        {fl.level}
                      </span>
                      <h3 className="text-xl font-serif text-white font-medium group-hover:text-[#E5C158] transition-colors">
                        {fl.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 px-2.5 py-1 rounded-sm bg-black/40 border border-white/10">
                    {fl.badge}
                  </span>
                </div>

                <p className="mt-2.5 text-xs text-slate-300 font-light line-clamp-1 italic">
                  &ldquo;{fl.tagline}&rdquo;
                </p>

                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#E5C158] to-[#D4AF37]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: 3D Perspective Showcase View with Specular Glare */}
        <div className="lg:col-span-7 flex flex-col">
          <TiltCard3D maxTilt={6} className="h-full rounded-sm">
            <div className="flex flex-col h-full rounded-sm overflow-hidden border border-[#E5C158]/30 bg-[#121828] shadow-2xl">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-black/60">
                <Image
                  key={current.image}
                  src={current.image}
                  alt={current.name}
                  fill
                  className="object-cover transition-all duration-700 brightness-95 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#121828] via-transparent to-black/30" />

                <div className="absolute top-4 left-4">
                  <span className="px-3.5 py-1.5 text-xs uppercase tracking-widest font-semibold bg-[#0C101B]/90 text-[#E5C158] border border-[#E5C158]/40 rounded-sm backdrop-blur-md shadow-lg">
                    {current.level}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                    <h3 className="text-2xl sm:text-3xl font-serif text-white">
                      {current.name}
                    </h3>
                    <span className="text-xs uppercase tracking-widest text-[#E5C158] font-serif italic">
                      &ldquo;{current.tagline}&rdquo;
                    </span>
                  </div>

                  <p className="text-sm font-light text-slate-300 leading-relaxed mb-6">
                    {current.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2.5 mb-8">
                    {current.features.map((feat, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-sm bg-[#0C101B]/70 border border-white/10 text-xs text-slate-200 font-light flex items-center gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    href={current.href}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-all shadow-md"
                  >
                    <span>Experience {current.name.split(" ")[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <WhatsAppCta
                    intent={current.waIntent}
                    label="Direct WhatsApp Enquiry"
                    variant="outline"
                    className="w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-wider text-slate-200 border-white/20 hover:border-[#E5C158]"
                  />
                </div>
              </div>
            </div>
          </TiltCard3D>
        </div>
      </div>
    </div>
  );
}
