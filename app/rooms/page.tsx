import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Wine,
  Phone,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  Coffee,
  Wind,
  Tv,
  Wifi,
  Plane,
  Train,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import ScrollReveal from "@/components/motion/ScrollReveal";
import StaggerChildren from "@/components/motion/StaggerChildren";
import { ROOMS_CONTENT } from "@/content/rooms";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

export const metadata: Metadata = {
  title: "10 AC Rooms & Stays",
  description:
    "10 air-conditioned rooms, each built for a proper night's rest — complimentary breakfast and high-speed WiFi included on NH 544, Angamaly.",
  openGraph: {
    title: "10 Boutique AC Rooms | Hotel New Town by Chettungal",
    description: "Proper night's rest near Cochin International Airport. Air-conditioned rooms with complimentary breakfast and high-speed WiFi.",
    url: "https://hotelchettungal.com/rooms",
    images: [
      {
        url: "/images/rooms/room-hero.webp",
        width: 1200,
        height: 630,
        alt: "Hotel New Town by Chettungal Boutique Rooms",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boutique AC Rooms | Hotel New Town by Chettungal",
    description: "10 quiet air-conditioned rooms with complimentary breakfast on NH 544, Angamaly.",
    images: ["/images/rooms/room-hero.webp"],
  },
};

export default function RoomsPage() {
  const { amenities } = ROOMS_CONTENT;

  const roomGallery = [
    { src: "/images/rooms/room-hero.webp", title: "King Pillowtop Bed & Warm Wood Paneling" },
    { src: "/images/rooms/room-2.webp", title: "Executive Suite Seating & Ambient Reading Lights" },
    { src: "/images/rooms/lux-03.webp", title: "Quiet Contemporary Layout for Restorative Sleep" },
    { src: "/images/rooms/lux-05.webp", title: "Dedicated Work Desk & Universal Power Outlets" },
    { src: "/images/rooms/lux-08.webp", title: "High-Pressure Rain Shower & Botanical Amenities" },
    { src: "/images/rooms/room-1-bed.webp", title: "Plush Bedding & Integrated Headboard Illumination" },
  ];

  return (
    <div className="bg-[#0C101B] text-slate-100 min-h-screen">
      {/* 1. HERO SECTION - BOTTOM-ALIGNED EDITORIAL LAYOUT */}
      <section className="relative min-h-[88vh] sm:min-h-screen flex items-end justify-start pt-32 pb-14 sm:pb-20 px-6 sm:px-10 lg:px-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/rooms/room-hero.webp"
            alt="Chettungal New Town Hotel Boutique Room"
            fill
            className="object-cover object-center brightness-100"
            priority
          />
          {/* Subtle top header gradient & deep bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/20 to-transparent h-36" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B] via-[#0C101B]/85 to-transparent h-3/5 sm:h-1/2" />
        </div>

        <div className="relative z-10 max-w-3xl text-left flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md mb-4 shadow-lg">
            <Bed className="w-3.5 h-3.5 text-[#E5C158]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
              10 AC Rooms · NH 544, Angamaly
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            10 AC Rooms
          </h1>

          <p className="font-serif text-2xl sm:text-3xl text-[#F5D061] italic mb-6 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
            &ldquo;Each built for a proper night’s rest.&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <WhatsAppCta
              intent="Room Stay Direct Enquiry"
              label="Enquire via WhatsApp"
              variant="gold"
              className="px-7 py-3.5 text-xs uppercase tracking-widest shadow-xl font-bold"
            />
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs uppercase tracking-widest font-semibold text-slate-200 hover:text-white border border-white/20 hover:border-[#E5C158] rounded-sm transition-colors bg-black/60 backdrop-blur-md shadow-lg"
            >
              <Phone className="w-4 h-4 text-[#E5C158]" />
              <span>Call Front Desk</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. BROCHURE INCLUSIONS STRIP */}
      <ScrollReveal direction="up">
      <section className="py-10 bg-[#111726] border-y border-[#E5C158]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center text-xs text-slate-200">
            <div className="flex items-center justify-center gap-2">
              <Coffee className="w-4 h-4 text-[#E5C158]" />
              <span>Complimentary Breakfast</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Wifi className="w-4 h-4 text-[#E5C158]" />
              <span>High-Speed WiFi Included</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Plane className="w-4 h-4 text-[#E5C158]" />
              <span>~5 km from Kochi Airport</span>
            </div>
            <div className="flex items-center justify-center gap-2">
              <Plane className="w-4 h-4 text-[#E5C158]" />
              <span>Airport Transfer Available</span>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* 3. REAL ROOM PHOTO GALLERY WITH 3D TILT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <SectionHeader
            eyebrow="Accommodations Gallery"
            title="Intimate Boutique Comfort"
            subtitle="Because we operate just ten rooms, your stay receives personal care, quiet privacy, and immediate host service."
            align="center"
            theme="dark"
          />
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomGallery.map((img, i) => (
            <TiltCard3D key={i} maxTilt={8} className="rounded-sm">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-lg group">
                <Image
                  src={img.src}
                  alt={img.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-85" />
                <div className="absolute bottom-4 left-4 right-4 text-xs font-serif text-white text-base">
                  {img.title}
                </div>
              </div>
            </TiltCard3D>
          ))}
        </StaggerChildren>
      </section>

      {/* 4. ROOM AMENITIES & DIRECT-RESERVATION PHILOSOPHY */}
      <ScrollReveal direction="up">
      <section className="py-20 bg-[#111726] border-t border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto p-8 sm:p-12 rounded-sm bg-[#131A2B] border border-[#E5C158]/30 shadow-2xl">
          <SectionHeader
            eyebrow="Appointments"
            title="In-Room Amenities"
            subtitle="Prepared with high-standard furnishings to guarantee sound sleep and quiet relaxation on NH 544."
            align="left"
            theme="dark"
            className="mb-8"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {amenities.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-[#E5C158] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-sm bg-[#0C101B] border border-white/10 text-center">
            <span className="text-xs uppercase tracking-widest text-[#E5C158] font-semibold block mb-2">
              Direct Host Booking Only
            </span>
            <p className="text-xs sm:text-sm font-light text-slate-300 max-w-xl mx-auto mb-6">
              To preserve personal hospitality and prioritize wedding/banquet families, room stays are reserved directly via phone or WhatsApp with zero middleman commissions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <WhatsAppCta
                intent="Room Booking Enquiry"
                label="Enquire via WhatsApp"
                variant="gold"
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-bold"
              />
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="w-full sm:w-auto px-6 py-3 text-xs uppercase tracking-widest font-semibold text-white border border-white/20 hover:border-[#E5C158] rounded-sm transition-colors"
              >
                Call Front Desk
              </a>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>
    </div>
  );
}
