"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wine, Utensils, Users, Bed, ArrowRight, Sparkles, MapPin } from "lucide-react";
import WhatsAppCta from "@/components/shared/WhatsAppCta";

export default function Property3DNavigator() {
  const [activeFloor, setActiveFloor] = useState<"casabay" | "rooms" | "fishtown" | "townhall">("casabay");

  const floors = [
    {
      id: "casabay",
      level: "ROOFTOP RESTOBAR",
      name: "CasaBay",
      tagline: "Take the evening upstairs.",
      badge: "Open 5 PM · Live Music",
      image: "/images/casabay/casa-hero.webp",
      icon: Wine,
      accentBorder: "border-[#E59866]",
      activeBg: "bg-[#1C1614]",
      desc: "Open-air rooftop, full bar, cocktails, grills & small plates. An elevated setting where the night moves effortlessly into late-evening gatherings.",
      features: ["Full Bar & Signature Mixology", "Grills & Small Plates", "Live Music Nights", "Skyline Twilight Views"],
      href: "/casabay",
      waIntent: "CasaBay Rooftop Reservation",
    },
    {
      id: "rooms",
      level: "LEVEL 2 · BOUTIQUE ACCOMMODATIONS",
      name: "10 AC Rooms",
      tagline: "Built for a proper night's rest.",
      badge: "10 Air-Conditioned Rooms",
      image: "/images/rooms/room-hero.webp",
      icon: Bed,
      accentBorder: "border-[#D4AF37]",
      activeBg: "bg-[#18181A]",
      desc: "10 quiet air-conditioned rooms each built for a proper night’s rest — complimentary breakfast and high-speed WiFi included. Exclusive access to the resident Executive Bar.",
      features: ["Complimentary Breakfast", "High-Speed WiFi Included", "Resident Executive Bar", "~5 km to Airport"],
      href: "/rooms",
      waIntent: "Boutique Room Reservation",
    },
    {
      id: "fishtown",
      level: "LEVEL 1 · ALL-DAY DINING",
      name: "Fish Town",
      tagline: "Fresh catch. Local soul.",
      badge: "Breakfast · Lunch · Dinner",
      image: "/images/fishtown/restaurant-hero.webp",
      icon: Utensils,
      accentBorder: "border-[#E5A044]",
      activeBg: "bg-[#1E1914]",
      desc: "Celebrates the food Kerala knows best — fresh fish, generous portions, and familiar spices. From a quick local meal to a table full of family and friends.",
      features: ["Fresh Daily Catch", "Kerala, North Indian, Chinese", "Continental Delicacies", "Spacious Family Tables"],
      href: "/fishtown",
      waIntent: "Fish Town Table Reservation",
    },
    {
      id: "townhall",
      level: "EVENT WING · BANQUETS",
      name: "Town Hall & Boardroom",
      tagline: "Where the whole guest list fits.",
      badge: "Up to 120 Guests",
      image: "/images/town-hall/hall-hero.webp",
      icon: Users,
      accentBorder: "border-[#D4AF37]",
      activeBg: "bg-[#1A1814]",
      desc: "The hotel’s largest indoor venue — conferences, weddings, and family celebrations, laid out to suit the occasion and catered in-house from start to finish.",
      features: ["Theatre, Banquet & Floor Setups", "Up to 120 Guests", "The Boardroom for 12", "In-House Live Catering"],
      href: "/town-hall",
      waIntent: "Town Hall Banquet Enquiry",
    },
  ];

  const current = floors.find((f) => f.id === activeFloor) || floors[0];

  return (
    <div className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-14">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/40 backdrop-blur-md mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
            3D Destination Explorer
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight">
          One Address, Every Occasion
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto mt-3">
          Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 — all under one roof on NH 544, Angamaly.
        </p>
      </div>

      {/* 3D Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Building Floor Navigator */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-3.5">
          {floors.map((fl) => {
            const Icon = fl.icon;
            const isSelected = activeFloor === fl.id;
            return (
              <button
                key={fl.id}
                onClick={() => setActiveFloor(fl.id as any)}
                className={`group relative p-5 rounded-sm text-left transition-all duration-300 border ${
                  isSelected
                    ? `${fl.activeBg} border-[#D4AF37] shadow-2xl translate-x-2`
                    : "bg-[#0E131C]/80 border-white/10 hover:border-white/30 hover:bg-[#141B26]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-11 h-11 shrink-0 rounded-sm flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12]"
                          : "bg-white/5 text-slate-300 group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block">
                        {fl.level}
                      </span>
                      <h3 className="text-xl font-serif text-white font-medium group-hover:text-[#D4AF37] transition-colors">
                        {fl.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400 px-2.5 py-1 rounded-sm bg-black/40 border border-white/5 hidden sm:inline">
                    {fl.badge}
                  </span>
                </div>

                <p className="mt-2.5 text-xs text-slate-300 font-light line-clamp-1 italic">
                  &ldquo;{fl.tagline}&rdquo;
                </p>

                {isSelected && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D4AF37]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right: 3D Perspective Showcase View */}
        <div className="lg:col-span-7 flex flex-col rounded-sm overflow-hidden border border-[#D4AF37]/30 bg-[#0F141F] shadow-2xl">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/70">
            <Image
              src={current.image}
              alt={current.name}
              fill
              className="object-cover transition-all duration-700 brightness-95 hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F141F] via-[#0F141F]/35 to-transparent" />

            <div className="absolute top-4 left-4">
              <span className="px-3.5 py-1.5 text-xs uppercase tracking-widest font-semibold bg-[#0A0D12]/90 text-[#D4AF37] border border-[#D4AF37]/40 rounded-sm backdrop-blur-md shadow-lg">
                {current.level}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
                <h3 className="text-3xl sm:text-4xl font-serif text-white">
                  {current.name}
                </h3>
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-serif italic">
                  &ldquo;{current.tagline}&rdquo;
                </span>
              </div>

              <p className="text-sm font-light text-slate-200 leading-relaxed mb-6">
                {current.desc}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {current.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-2.5 rounded-sm bg-black/40 border border-white/5 text-[11px] text-slate-300 font-light flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                    <span className="truncate">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                href={current.href}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12] hover:brightness-110 transition-all shadow-md"
              >
                <span>Experience {current.name.split(" ")[0]}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <WhatsAppCta
                intent={current.waIntent}
                label="Direct WhatsApp Enquiry"
                variant="outline"
                className="w-full sm:w-auto px-5 py-3 text-xs uppercase tracking-wider"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
