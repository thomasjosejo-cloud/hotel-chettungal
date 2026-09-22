import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Wine, Clock, MessageSquare, ArrowRight, GlassWater, Flame, Music, Check } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { CASABAY_CONTENT } from "@/content/casabay";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

export const metadata = {
  title: "CasaBay Rooftop Restobar | Hotel New Town by Chettungal",
  description: "Take the evening upstairs. Open-air rooftop resto-bar for conversations, cocktails, grills, small plates & live music nights in Angamaly, Kerala.",
};

export default function CasaBayPage() {
  const { signatureCocktails } = CASABAY_CONTENT;

  const highlights = [
    { label: "Setting", desc: "Open-air rooftop, full bar" },
    { label: "On the Menu", desc: "Cocktails, grills, small plates" },
    { label: "Evenings", desc: "Live music nights & sundowner hours" },
  ];

  const bestFor = ["Rooftop evenings", "Cocktails & bites", "Private gatherings", "Live music nights"];

  return (
    <div className="bg-[#0A0D14] text-slate-100 min-h-screen">
      {/* 1. CASABAY HERO WITH REAL PHOTO & MASTER LOGO */}
      <section className="relative min-h-[94vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/casabay/casa-hero.webp"
            alt="CasaBay Rooftop Restobar at Chettungal New Town Hotel"
            fill
            className="object-cover brightness-[0.38] contrast-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D14] via-[#0A0D14]/50 to-black/80" />
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:28px_28px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/40 backdrop-blur-md mb-6">
            <Wine className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
              Rooftop Resto-Bar · NH 544, Angamaly
            </span>
          </div>

          {/* Master CasaBay Logo Image */}
          <div className="relative w-72 sm:w-96 md:w-[480px] h-28 sm:h-36 mb-4 filter drop-shadow-[0_10px_25px_rgba(235,140,60,0.35)]">
            <Image
              src="/branding/casabay-logo.webp"
              alt="CasaBay Wordmark"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Brochure Tagline */}
          <p className="font-serif text-2xl sm:text-3xl text-[#E59866] italic mb-6 neon-glow-sunset">
            &ldquo;Take the evening upstairs.&rdquo;
          </p>

          {/* Official Brochure Narrative */}
          <p className="max-w-2xl text-base sm:text-lg text-slate-200 font-light leading-relaxed mb-8">
            CASABAY is our rooftop resto-bar for conversations, cocktails, and unhurried evenings — an elevated setting where the night moves effortlessly from after-work drinks to late-evening gatherings. Come for the view, stay for the food, raise a glass to the evening.
          </p>

          {/* Best For Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {bestFor.map((item, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1 rounded-full text-xs font-light bg-[#141B26] text-slate-300 border border-[#D4AF37]/30"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <WhatsAppCta
              intent="CasaBay Table Reservation"
              label={`Reserve Table on WhatsApp (${SITE_CONFIG.phone})`}
              variant="gold"
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest shadow-xl"
            />
            <a
              href="#cocktail-menu"
              className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest font-semibold text-slate-200 hover:text-white border border-white/20 hover:border-[#D4AF37] rounded-sm transition-colors bg-white/5"
            >
              Explore Signature Drinks
            </a>
          </div>
        </div>
      </section>

      {/* 2. BROCHURE SPECS STRIP */}
      <section className="py-12 bg-[#0E131C] border-y border-[#D4AF37]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {highlights.map((h, i) => (
              <div key={i} className="p-4 border-r last:border-r-0 border-white/10">
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold block mb-1">
                  {h.label}
                </span>
                <p className="text-base sm:text-lg font-serif text-white">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE COCKTAILS WITH 3D TILT CARDS */}
      <section id="cocktail-menu" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Crafted Behind the Bar"
          title="Signature Mixology"
          subtitle="Botanical spirits, house shrubs, and Kerala spices. Explore our signature cocktails crafted for unhurried conversations."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureCocktails.map((drink) => (
            <TiltCard3D key={drink.id} maxTilt={10} className="rounded-sm">
              <div className="flex flex-col justify-between h-full p-6 rounded-sm bg-[#121824] border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-colors shadow-lg">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono">
                      {drink.category}
                    </span>
                    <span className="font-serif text-lg text-[#D4AF37] font-semibold">
                      {drink.price}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-white tracking-wide mb-2">
                    {drink.name}
                  </h3>

                  <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                    {drink.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                    {drink.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full text-[10px] font-light bg-[#0A0D14] text-slate-300 border border-white/5"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* 4. ROOFTOP AMBIENCE GALLERY WITH REAL SHOTS */}
      <section className="py-20 bg-[#0E131C] border-y border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Atmosphere"
            title="Twilight at the Rooftop"
            subtitle="The warm glow of wicker lamps, custom mural art, and elevated seating under the night sky."
            align="center"
            theme="dark"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-xl">
              <Image
                src="/images/casabay/casa-hero.webp"
                alt="CasaBay Bar Counter & Mural"
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
                src="/images/casabay/casa-ambience-1.webp"
                alt="CasaBay Dining Seating"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-slate-200">
                Lounge Tables & Conversation Corners
              </div>
            </div>

            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 group shadow-xl">
              <Image
                src="/images/casabay/casa-ambience-2.webp"
                alt="CasaBay Lantern Glow"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-slate-200">
                Warm Wicker Lanterns & Evening Breeze
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CASABAY WHATSAPP-FIRST CTA */}
      <section className="py-24 px-4 text-center">
        <div className="max-w-2xl mx-auto p-10 rounded-sm bg-gradient-to-b from-[#141B26] to-[#0A0D14] border border-[#D4AF37]/30 shadow-2xl">
          <Wine className="w-8 h-8 text-[#D4AF37] mx-auto mb-4" />
          <h2 className="text-3xl sm:text-4xl font-serif text-white mb-2">
            Take the Evening Upstairs
          </h2>
          <p className="text-sm font-light text-slate-300 mb-8 leading-relaxed max-w-lg mx-auto">
            Book your table directly with our floor team on WhatsApp for prompt table arrangements and live music night updates.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <WhatsAppCta
              intent="CasaBay Table Booking"
              label={`WhatsApp Reservation (${SITE_CONFIG.phone})`}
              variant="gold"
              className="px-8 py-4 text-xs uppercase tracking-widest"
            />
            <Link
              href="/enquire"
              className="px-8 py-4 text-xs uppercase tracking-widest font-semibold rounded-sm bg-white/10 text-white hover:bg-white/20 border border-white/20 transition-colors"
            >
              General Form
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
