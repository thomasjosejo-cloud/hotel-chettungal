"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sparkles,
  Wine,
  Clock,
  MessageSquare,
  ArrowRight,
  Flame,
  FileText,
  GlassWater,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { CASABAY_CONTENT } from "@/content/casabay";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";
import ScrollReveal from "@/components/motion/ScrollReveal";
import StaggerChildren from "@/components/motion/StaggerChildren";

export default function CasaBayContent() {
  const { signatureCocktails, menuTabs, quickFacts } = CASABAY_CONTENT;
  const [activeTab, setActiveTab] = useState("all");

  const highlights = [
    { label: "Setting", desc: "Open-air rooftop, full bar" },
    { label: "On the Menu", desc: "Cocktails, grills, small plates" },
    { label: "Evenings", desc: "Live music nights & sundowner hours" },
  ];

  const filteredItems =
    activeTab === "all"
      ? signatureCocktails
      : signatureCocktails.filter((item) => item.menuTab === activeTab);

  return (
    <div className="bg-[#0C101B] text-slate-100 min-h-screen">
      {/* 1. CINEMATIC CASABAY HERO - NATURAL PHOTOGRAPHIC CLARITY */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-end justify-start pt-28 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/casabay/casa-cocktail-deck.webp"
            alt="CasaBay Rooftop Restobar at Chettungal New Town Hotel"
            fill
            className="object-cover object-center brightness-95 contrast-105"
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
              <Wine className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
                Rooftop Resto-Bar · NH 544, Angamaly
              </span>
            </div>

            <h1 className="sr-only">CasaBay Rooftop Resto-Bar</h1>

            {/* Master CasaBay Logo Image */}
            <div className="relative w-52 sm:w-64 md:w-80 h-16 sm:h-20 mb-2 filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              <Image
                src="/branding/casabay-logo.webp"
                alt="CasaBay Wordmark"
                fill
                className="object-contain object-left"
                priority
              />
            </div>

            {/* Brochure Tagline */}
            <p className="font-serif text-xl sm:text-2xl text-[#F5D061] italic drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              &ldquo;Take the evening upstairs.&rdquo;
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <WhatsAppCta
              intent="CasaBay Rooftop Reservation"
              label="Reserve Table on WhatsApp"
              variant="gold"
              className="px-6 py-3.5 text-xs uppercase tracking-widest shadow-2xl font-bold"
            />
            <a
              href="#rooftop-menu"
              className="inline-flex items-center justify-center px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-slate-100 hover:text-white border border-[#E5C158]/50 hover:border-[#E5C158] rounded-sm transition-all bg-black/70 backdrop-blur-md shadow-xl"
            >
              Explore Drinks & Tapas
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

      {/* 3. DEDICATED ROOFTOP MENU SECTION WITH TABS */}
      <section id="rooftop-menu" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <SectionHeader
            eyebrow="Rooftop Menu"
            title="Handcrafted Cocktails & Charcoal Grills"
            subtitle="Botanical spirits, house-smoked reductions, and savory rooftop tapas curated for unhurried conversations."
            align="center"
            theme="dark"
          />
        </ScrollReveal>

        {/* Interactive Menu Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto no-scrollbar pb-4 mb-10">
          {menuTabs.map((tab) => {
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 shrink-0 ${
                  isSelected
                    ? "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] shadow-lg scale-102"
                    : "bg-[#111726] text-slate-300 border border-white/10 hover:border-white/30"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((drink) => (
            <TiltCard3D key={drink.id} maxTilt={6} className="rounded-sm">
              <div className="flex flex-col justify-between h-full p-6 rounded-sm bg-[#131A2B] border border-[#E5C158]/20 hover:border-[#E5C158]/60 transition-colors shadow-lg">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#E5C158] font-mono">
                      {drink.category}
                    </span>
                    <span className="font-serif text-lg text-[#E5C158] font-semibold">
                      {drink.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-white tracking-wide mb-2">
                    {drink.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed mb-4">
                    {drink.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {drink.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-[10px] font-light bg-[#0A0D14] text-slate-300 border border-white/10"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </StaggerChildren>

        {/* Full Menu WhatsApp Request Card */}
        <ScrollReveal direction="up">
          <div className="mt-12 p-8 rounded-sm bg-gradient-to-r from-[#111726] via-[#162033] to-[#111726] border border-[#E5C158]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="flex items-center gap-4 text-left">
              <div className="w-12 h-12 rounded-sm bg-[#E5C158]/10 border border-[#E5C158]/30 flex items-center justify-center text-[#E5C158] shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-serif text-xl sm:text-2xl text-white">
                  Want the Full Rooftop Bar & Food Menu on WhatsApp?
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1">
                  Receive our complete beverage list, premium spirits, mocktails, and live grill platters directly on your phone.
                </p>
              </div>
            </div>

            <a
              href={buildWhatsAppLink("Request CasaBay Full Bar Menu")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-all shadow-md shrink-0 whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get CasaBay Menu on WhatsApp</span>
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. ROOFTOP AMBIENCE GALLERY WITH REAL SHOTS */}
      <section id="ambience-gallery" className="py-20 bg-[#111726] border-y border-[#E5C158]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <SectionHeader
              eyebrow="Atmosphere"
              title="Twilight at the Rooftop"
              subtitle="The warm glow of wicker lamps, custom mural art, and elevated seating under the night sky."
              align="center"
              theme="dark"
            />
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-xl">
              <Image
                src="/images/casabay/casa-hero.webp"
                alt="CasaBay Skyline Rooftop Deck"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-slate-200">
                Skyline Rooftop Deck & Canopy
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-xl">
              <Image
                src="/images/casabay/casa-bar.webp"
                alt="CasaBay Bar Counter"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-slate-200">
                Full Bar & Signature Cocktails
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-xl">
              <Image
                src="/images/casabay/casa-night-view.webp"
                alt="CasaBay Twilight Night View"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-slate-200">
                Nightlife & Rooftop Lounging
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-xl">
              <Image
                src="/images/casabay/casa-sunset.webp"
                alt="CasaBay Golden Hour Sunset"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-slate-200">
                Golden Hour Sundowner Sky
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-xl">
              <Image
                src="/images/casabay/casa-cabana.webp"
                alt="CasaBay Private Cabana Seating"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-slate-200">
                Private Cabana Lounging & Twilight
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-xl">
              <Image
                src="/images/casabay/casa-cocktail-deck.webp"
                alt="CasaBay Cocktail Deck"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-slate-200">
                Cocktail Deck & Open Air
              </div>
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* 5. DIRECT WHATSAPP RESERVATION CTA BANNER */}
      <section className="py-20 bg-gradient-to-b from-[#111726] to-[#0A0D14] border-t border-[#E5C158]/20 text-center px-4">
        <ScrollReveal direction="fade">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold mb-2">
              DIRECT RESERVATIONS
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif text-white font-normal mb-4">
              Spend the Evening Upstairs
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed mb-8 max-w-xl">
              Book your table directly with our floor team on WhatsApp for prompt table arrangements and live music night updates.
            </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <WhatsAppCta
              intent="CasaBay Evening Table Booking"
              label="Chat on WhatsApp"
              variant="gold"
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest shadow-lg font-bold"
            />
            <Link
              href="/enquire"
              className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest border border-white/20 hover:border-[#E5C158] text-slate-200 hover:text-white rounded-sm transition-colors"
            >
              Online Enquiry
            </Link>
          </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
