"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Utensils,
  Clock,
  Users,
  Briefcase,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  MessageSquare,
  Flame,
  FileText,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { FISHTOWN_CONTENT } from "@/content/fishtown";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";
import ScrollReveal from "@/components/motion/ScrollReveal";
import StaggerChildren from "@/components/motion/StaggerChildren";

export default function FishTownContent() {
  const { signatureDishes, menuCategories } = FISHTOWN_CONTENT;
  const [activeCategory, setActiveCategory] = useState("all");

  const highlights = [
    { label: "Cuisine", desc: "Kerala Coastal, North Indian, Chinese & Continental" },
    { label: "Service Hours", desc: "Breakfast (7:30 AM), Lunch & Dinner (till 11 PM)" },
    { label: "Atmosphere", desc: "Illuminated wave wall, plush orange leather booths & family tables" },
  ];

  const restaurantPhotos = [
    { src: "/images/fishtown/restaurant-hero.webp", label: "Signature Wave Wall & Leather Dining Booths" },
    { src: "/images/fishtown/restaurant-2.webp", label: "Multi-Generation Family Tables & Wicker Lanterns" },
    { src: "/images/fishtown/restaurant-3.webp", label: "Contemporary Restaurant Interior & Wood Accents" },
    { src: "/images/fishtown/restaurant-4.webp", label: "Warm Cove Lighting & Architectural Dining Accents" },
    { src: "/images/fishtown/restaurant-wide.webp", label: "Full Dining Hall Panorama" },
    { src: "/images/fishtown/restaurant-buffet.webp", label: "Executive Buffet & Fresh Service Zone" },
  ];

  const filteredDishes =
    activeCategory === "all"
      ? signatureDishes
      : signatureDishes.filter((d) => d.category === activeCategory);

  return (
    <div className="bg-[#0C101B] text-slate-100 min-h-screen">
      {/* 1. CINEMATIC FISH TOWN HERO - NATURAL PHOTOGRAPHIC CLARITY */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-end justify-start pt-28 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fishtown/restaurant-hero.webp"
            alt="Fish Town Restaurant Interior at Chettungal New Town Hotel"
            fill
            className="object-cover object-center brightness-100"
            priority
          />
          {/* Natural photographic clarity: subtle top navbar vignette and soft bottom transition */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#0C101B] via-[#0C101B]/60 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/20 shadow-lg backdrop-blur-md mb-3">
              <Utensils className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
                Multi-Cuisine Dining · NH 544, Angamaly
              </span>
            </div>

            <h1 className="sr-only">Fish Town Multi-Cuisine Restaurant</h1>

            {/* Fish Town Master Logo - Clean Transparent Ivory & Gold */}
            <div className="relative w-52 sm:w-64 md:w-80 h-16 sm:h-20 mb-2 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              <Image
                src="/branding/fishtown-logo-ivory.png"
                alt="Fish Town Restaurant Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            {/* Brochure Tagline */}
            <p className="font-serif text-xl sm:text-2xl text-[#F5D061] italic drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              &ldquo;Fresh catch. Local soul.&rdquo;
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <WhatsAppCta
              intent="Fish Town Table Booking"
              label="Reserve Table on WhatsApp"
              variant="gold"
              className="px-6 py-3.5 text-xs uppercase tracking-widest shadow-2xl font-bold"
            />
            <a
              href="#dining-menu"
              className="inline-flex items-center justify-center px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-slate-100 hover:text-white border border-[#E5C158]/50 hover:border-[#E5C158] rounded-sm transition-all bg-black/70 backdrop-blur-md shadow-xl"
            >
              Explore The Menu
            </a>
          </div>
        </div>
      </section>

      {/* 2. BROCHURE SPECS STRIP */}
      <section className="py-12 bg-[#111726] border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {highlights.map((h, i) => (
                <div
                  key={i}
                  className="p-4 border-b last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0 border-white/10"
                >
                  <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold block mb-1">
                    {h.label}
                  </span>
                  <p className="text-base sm:text-lg font-serif text-white">
                    {h.desc}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 3. DEDICATED MENU HIGHLIGHTS SECTION WITH CATEGORY TABS */}
      <section id="dining-menu" className="py-20 bg-[#0C101B] border-b border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal direction="up">
            <SectionHeader
              eyebrow="The Dining Menu"
              title="Generous Portions, Familiar Spices"
              subtitle="Prepared fresh daily from native coastal spice blends, freshly grated coconut milk, and prime ocean catches."
              align="center"
              theme="dark"
            />
          </ScrollReveal>

          {/* Interactive Menu Category Tabs */}
          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10">
            {menuCategories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                    isSelected
                      ? "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] shadow-lg scale-102"
                      : "bg-[#111726] text-slate-300 border border-white/10 hover:border-white/30"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Curated Signature Dishes Grid */}
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <div
                key={dish.id}
                className="flex flex-col justify-between p-6 sm:p-7 bg-[#131A2B]/90 rounded-sm border border-[#E5C158]/25 hover:border-[#E5C158]/60 transition-all duration-300 shadow-lg group hover:translate-y-[-2px]"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {dish.badge ? (
                      <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[#E5C158]/15 text-[#E5C158] border border-[#E5C158]/30 rounded-sm">
                        {dish.badge}
                      </span>
                    ) : <span />}
                    <span
                      className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-sm border ${
                        dish.dietary === "Veg"
                          ? "text-emerald-400 border-emerald-500/30 bg-emerald-950/40"
                          : dish.dietary === "Seafood"
                          ? "text-cyan-400 border-cyan-500/30 bg-cyan-950/40"
                          : "text-amber-400 border-amber-500/30 bg-amber-950/40"
                      }`}
                    >
                      {dish.dietary}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-white group-hover:text-[#E5C158] transition-colors mb-1">
                    {dish.name}
                  </h3>
                  <span className="text-[11px] uppercase tracking-widest text-[#E5C158]/80 font-mono block mb-3">
                    {dish.cuisine}
                  </span>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-6">
                    {dish.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                  <span className="font-mono text-[11px] text-slate-400">{dish.timing}</span>
                  <a
                    href={buildWhatsAppLink("Fish Town Table Booking", { Dish: dish.name })}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#E5C158] hover:text-white font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <span>Reserve Dish</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </StaggerChildren>

          {/* Full Menu WhatsApp Card */}
          <ScrollReveal direction="up">
            <div className="mt-12 p-8 rounded-sm bg-gradient-to-r from-[#111726] via-[#162033] to-[#111726] border border-[#E5C158]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-sm bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif text-xl sm:text-2xl text-white">
                    Want the Full Printed Menu on Your Phone?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
                    Receive our current multi-cuisine menu with daily seafood specials, bread baskets, and dessert selections directly on WhatsApp.
                  </p>
                </div>
              </div>

              <a
                href={buildWhatsAppLink("Request Fish Town Full Menu PDF")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-all shadow-md shrink-0 whitespace-nowrap"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get Menu on WhatsApp</span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. REAL RESTAURANT AMBIENCE GALLERY */}
      <section id="cuisine-gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <SectionHeader
            eyebrow="Dining Spaces"
            title="The Fish Town Atmosphere"
            subtitle="Illuminated wave walls, warm orange leather armchairs, and spacious seating designed for lively conversations."
            align="center"
            theme="dark"
          />
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantPhotos.map((photo, i) => (
            <div
              key={i}
              className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 hover:border-[#E5C158]/40 transition-colors shadow-lg group"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-serif text-white">
                {photo.label}
              </div>
            </div>
          ))}
        </StaggerChildren>
      </section>

      {/* 5. CATERING CROSSOVER BANNER */}
      <section className="py-16 bg-[#111726] text-white border-t border-[#E5C158]/20">
        <ScrollReveal direction="fade">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold">
              Banquets & Celebrations
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif mt-2 mb-4">
              Catering Town Hall Events (Up to 120 Guests)
            </h3>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              All private banquet functions, wedding celebrations, and corporate dinners hosted at Town Hall are catered live by the executive culinary brigade of Fish Town.
            </p>
            <Link
              href="/town-hall"
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-colors"
            >
              <span>Explore Town Hall Banquet Spaces</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
