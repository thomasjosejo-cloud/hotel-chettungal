import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Utensils, Clock, Users, Briefcase, Sparkles, HeartHandshake, ArrowRight, ShieldCheck, Fish } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { FISHTOWN_CONTENT } from "@/content/fishtown";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

export const metadata = {
  title: "Fish Town Restaurant | Hotel New Town by Chettungal",
  description: "Fresh catch. Local soul. Multi-cuisine dining featuring coastal fish curries, tandoor, biryani, Chinese & continental favorites in Angamaly, Kerala.",
};

export default function FishTownPage() {
  const { signatureDishes } = FISHTOWN_CONTENT;

  const highlights = [
    { label: "Cuisine", desc: "Kerala, North Indian, Chinese, Continental" },
    { label: "Service", desc: "Breakfast, lunch, dinner" },
    { label: "Setting", desc: "Contemporary warm dining with illuminated wave walls & orange leather chairs" },
  ];

  const bestFor = ["Fresh, daily catch", "Kerala at heart", "Family tables", "Business lunch booths"];

  const restaurantPhotos = [
    { src: "/images/fishtown/restaurant-hero.webp", label: "Signature Illuminated Wave Wall & Leather Dining Booths" },
    { src: "/images/fishtown/restaurant-2.webp", label: "Spacious Multi-Generation Family Tables & Wicker Lanterns" },
    { src: "/images/fishtown/restaurant-3.webp", label: "Contemporary Restaurant Interior & Warm Wood Partitions" },
    { src: "/images/fishtown/restaurant-4.webp", label: "Warm Cove Lighting & Architectural Dining Accents" },
    { src: "/images/fishtown/restaurant-wide.webp", label: "Full Dining Hall Panorama" },
    { src: "/images/fishtown/restaurant-buffet.webp", label: "Executive Buffet & Fresh Service Zone" },
  ];

  return (
    <div className="bg-[#FAF9F6] text-[#1A1E24] min-h-screen">
      {/* 1. FISH TOWN HERO WITH REAL PHOTO & LOGO */}
      <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-[#F5EFE6]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/fishtown/restaurant-hero.webp"
            alt="Fish Town Restaurant Interior at Chettungal New Town Hotel"
            fill
            className="object-cover brightness-[0.75] contrast-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#FAF9F6] via-[#FAF9F6]/60 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/95 border border-[#D4AF37]/50 shadow-sm backdrop-blur-md mb-6">
            <Fish className="w-3.5 h-3.5 text-[#B8860B]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#0B0E14]">
              Multi-Cuisine Dining · NH 544, Angamaly
            </span>
          </div>

          {/* Fish Town Master Logo */}
          <div className="relative w-64 sm:w-80 md:w-96 h-24 sm:h-28 mb-4 filter drop-shadow-md">
            <Image
              src="/branding/fishtown-logo.webp"
              alt="Fish Town Restaurant Logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Brochure Tagline */}
          <p className="font-serif text-2xl sm:text-3xl text-[#0B0E14] italic mb-6">
            &ldquo;Fresh catch. Local soul.&rdquo;
          </p>

          {/* Official Brochure Narrative */}
          <p className="max-w-2xl text-base sm:text-lg text-stone-700 font-light leading-relaxed mb-8">
            FISH TOWN celebrates the food Kerala knows best — fresh fish, generous portions, and familiar spices, brought together with a contemporary restaurant experience. From a quick local meal to a table full of family and friends, this is food made to satisfy.
          </p>

          {/* Best For Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {bestFor.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/90 text-stone-800 border border-stone-300 shadow-sm"
              >
                {item}
              </span>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <WhatsAppCta
              intent="Fish Town Table Booking"
              label={`Reserve Table on WhatsApp (${SITE_CONFIG.phone})`}
              variant="gold"
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest shadow-md"
            />
            <a
              href="#cuisine-gallery"
              className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest font-semibold text-[#0B0E14] hover:text-black border border-stone-400 hover:border-black rounded-sm transition-colors bg-white/80"
            >
              View Dining Ambiance
            </a>
          </div>
        </div>
      </section>

      {/* 2. BROCHURE SPECS STRIP */}
      <section className="py-12 bg-white border-y border-stone-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {highlights.map((h, i) => (
              <div key={i} className="p-4 border-r last:border-r-0 border-stone-200">
                <span className="text-xs uppercase tracking-[0.25em] text-[#B8860B] font-semibold block mb-1">
                  {h.label}
                </span>
                <p className="text-base sm:text-lg font-serif text-[#0B0E14]">
                  {h.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE DISHES WITH 3D TILT */}
      <section className="py-20 bg-[#F5F2EC] border-b border-stone-300 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            eyebrow="Chef Signatures"
            title="Generous Portions, Familiar Spices"
            subtitle="Prepared fresh daily from native coastal spice blends, freshly grated coconut milk, and prime ocean catches."
            align="center"
            theme="light"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {signatureDishes.map((dish, idx) => (
              <TiltCard3D key={dish.id} maxTilt={8} className="rounded-sm shadow-md">
                <div className="flex flex-col bg-white rounded-sm overflow-hidden border border-stone-200 h-full">
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={["/images/fishtown/restaurant-wave-wall.webp", "/images/fishtown/restaurant-intimate.webp", "/images/fishtown/restaurant-buffet.webp", "/images/fishtown/restaurant-wide.webp"][idx % 4]}
                      alt={dish.name}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    {dish.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#0B0E14] text-white rounded-sm shadow">
                          {dish.badge}
                        </span>
                      </div>
                    )}
                    <div className="absolute bottom-3 right-3">
                      <span className="px-2 py-0.5 text-[10px] font-medium tracking-wide bg-white/95 text-stone-800 rounded-sm">
                        {dish.cuisine}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-serif text-2xl text-[#0B0E14] mb-2">
                        {dish.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed mb-4">
                        {dish.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                      <span>Available: {dish.timing}</span>
                      <span className="font-semibold text-[#0B0E14]">{dish.dietary}</span>
                    </div>
                  </div>
                </div>
              </TiltCard3D>
            ))}
          </div>
        </div>
      </section>

      {/* 4. REAL RESTAURANT AMBIENCE GALLERY */}
      <section id="cuisine-gallery" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Dining Spaces"
          title="The Fish Town Atmosphere"
          subtitle="Illuminated wave walls, warm orange leather armchairs, and spacious seating designed for lively conversations."
          align="center"
          theme="light"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurantPhotos.map((photo, i) => (
            <div
              key={i}
              className="relative aspect-[16/10] rounded-sm overflow-hidden border border-stone-300 shadow-lg group"
            >
              <Image
                src={photo.src}
                alt={photo.label}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-85" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-serif text-white text-base">
                {photo.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CATERING CROSSOVER BANNER */}
      <section className="py-16 bg-[#111724] text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
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
            className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12] hover:brightness-110 transition-colors"
          >
            <span>Explore Town Hall Banquet Spaces</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
