"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Wine, Utensils, Users, Bed, Briefcase, ArrowRight, Sparkles, Check } from "lucide-react";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";

export default function Property3DNavigator() {
  const [activeVenue, setActiveVenue] = useState<"casabay" | "fishtown" | "townhall" | "boardroom" | "rooms">("casabay");

  const venues = [
    {
      id: "casabay",
      category: "ROOFTOP RESTO-BAR",
      name: "CasaBay",
      tagline: "Take the evening upstairs.",
      badge: "Open-Air Rooftop · Full Bar",
      image: "/images/casabay/casa-cocktail-deck.webp",
      icon: Wine,
      desc: "CASABAY is our rooftop resto-bar for conversations, cocktails, and unhurried evenings — an elevated setting where the night moves effortlessly from after-work drinks to late-evening gatherings. Come for the view, stay for the food, raise a glass to the evening.",
      features: ["Open-air rooftop, full bar", "Cocktails, grills, small plates", "Live music nights", "Private gatherings"],
      href: "/casabay",
      waIntent: "CasaBay Rooftop Reservation",
    },
    {
      id: "fishtown",
      category: "MULTI-CUISINE RESTAURANT",
      name: "Fish Town",
      tagline: "Fresh catch. Local soul.",
      badge: "Breakfast · Lunch · Dinner",
      image: "/images/fishtown/restaurant-hero.webp",
      icon: Utensils,
      desc: "FISH TOWN celebrates the food Kerala knows best — fresh fish, generous portions, and familiar spices, brought together with a contemporary restaurant experience. From a quick local meal to a table full of family and friends, this is food made to satisfy.",
      features: ["Fresh, daily catch", "Kerala, North Indian, Chinese", "Continental Delicacies", "Spacious family tables"],
      href: "/fishtown",
      waIntent: "Fish Town Table Reservation",
    },
    {
      id: "townhall",
      category: "BANQUETS & CELEBRATIONS",
      name: "Town Hall",
      tagline: "Where the whole guest list fits.",
      badge: "Up to 120 Guests",
      image: "/images/town-hall/hall-lighting.webp",
      icon: Users,
      desc: "The hotel’s largest indoor venue — conferences, weddings, and family celebrations, laid out to suit the occasion and catered in-house from start to finish.",
      features: ["Up to 120 guests capacity", "Theatre, banquet & floor setups", "In-house catering by Fish Town", "Weddings & Conferences"],
      href: "/town-hall",
      waIntent: "Town Hall Banquet Enquiry",
    },
    {
      id: "boardroom",
      category: "EXECUTIVE MEETING SUITE",
      name: "The Boardroom",
      tagline: "A room built for focus.",
      badge: "For 12 Guests",
      image: "/images/board-room/boardroom-hero.webp",
      icon: Briefcase,
      desc: "Quiet, well-equipped, and ready for presentations, interviews, or closed-door discussions — a dedicated meeting room, not a converted corner.",
      features: ["Up to 12 guests capacity", "Boardroom-style seating", "Quiet & acoustically private", "Presentation-ready setup"],
      href: "/board-room",
      waIntent: "Boardroom Meeting Enquiry",
    },
    {
      id: "rooms",
      category: "BOUTIQUE ACCOMMODATIONS",
      name: "10 AC Rooms",
      tagline: "Each built for a proper night’s rest.",
      badge: "10 Air-Conditioned Rooms",
      image: "/images/rooms/room-hero.webp",
      icon: Bed,
      desc: "10 air-conditioned rooms, each built for a proper night’s rest — complimentary breakfast and high-speed WiFi included, so business stays and leisure stays get the same standard.",
      features: ["Complimentary breakfast included", "High-speed WiFi included", "~5 km from Kochi Airport", "~1 km from Railway Station"],
      href: "/rooms",
      waIntent: "Room Stay Direct Enquiry",
    },
  ];

  const current = venues.find((v) => v.id === activeVenue) || venues[0];

  return (
    <div id="hotel-venues" className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#E5C158]/40 backdrop-blur-md mb-3 shadow-[0_0_15px_rgba(229,193,88,0.15)]">
          <Sparkles className="w-3.5 h-3.5 text-[#E5C158]" />
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
            One Address · Every Occasion
          </span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-white tracking-tight leading-tight">
          Explore Our Venues & Stays
        </h2>
        <p className="text-sm sm:text-base text-slate-300 font-light max-w-2xl mx-auto mt-3 leading-relaxed">
          Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 — all under one roof on NH 544, Angamaly.
        </p>

        {/* Mobile Horizontal Selector */}
        <div className="mt-6 flex lg:hidden items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {venues.map((v) => {
            const Icon = v.icon;
            const isSelected = activeVenue === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setActiveVenue(v.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] shadow-lg scale-102"
                    : "bg-[#111726]/80 text-slate-300 border border-white/10"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">{v.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3D Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Venue Navigator Directory (Desktop) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col justify-between gap-3">
          {venues.map((v) => {
            const Icon = v.icon;
            const isSelected = activeVenue === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setActiveVenue(v.id as any)}
                className={`group relative p-4 xl:p-5 rounded-sm text-left transition-all duration-300 border ${
                  isSelected
                    ? "bg-[#182136] border-[#E5C158] shadow-[0_10px_30px_rgba(12,16,27,0.8),0_0_20px_rgba(229,193,88,0.2)] translate-x-2"
                    : "bg-[#111726]/80 border-white/10 hover:border-white/25 hover:bg-[#162033]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-10 h-10 shrink-0 rounded-sm flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] shadow-md"
                          : "bg-white/5 text-slate-300 group-hover:text-white"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-[#E5C158] font-semibold block">
                        {v.category}
                      </span>
                      <h3 className="text-lg font-serif text-white font-medium group-hover:text-[#E5C158] transition-colors">
                        {v.name}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-slate-300 px-2.5 py-1 rounded-sm bg-black/40 border border-white/10">
                    {v.badge}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-300 font-light line-clamp-1 italic">
                  &ldquo;{v.tagline}&rdquo;
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
                    {current.category}
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8">
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
                    <span>Experience {current.name}</span>
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
