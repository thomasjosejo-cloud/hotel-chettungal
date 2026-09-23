import React from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, Car, Train, Plane, Clock, Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import ScrollReveal from "@/components/motion/ScrollReveal";
import StaggerChildren from "@/components/motion/StaggerChildren";
import { SITE_CONFIG } from "@/content/site-config";

export const metadata: Metadata = {
  title: "About & Location — NH 544, Angamaly",
  description:
    "Hotel New Town by Chettungal on NH 544, Angamaly. Located ~5 km from Cochin International Airport (CIAL) and ~1 km from Angamaly Railway Station.",
  openGraph: {
    title: "About & Directions | Hotel New Town by Chettungal",
    description: "NH 544, Angamaly, Kerala. Destination hospitality ~5 km from Cochin International Airport with dining, banquets, and rooms.",
    url: "https://hotelchettungal.com/about",
    images: [
      {
        url: "/images/location/facade.webp",
        width: 1200,
        height: 630,
        alt: "Hotel New Town by Chettungal Facade on NH 544 Angamaly",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About & Directions | Hotel New Town by Chettungal",
    description: "Located on NH 544, Angamaly — ~5 km from Cochin International Airport.",
    images: ["/images/location/facade.webp"],
  },
};

export default function AboutPage() {
  const transitPoints = [
    { label: "Kochi Airport (CIAL)", time: "~5 km drive (short drive in)", icon: Plane },
    { label: "Angamaly Railway Station", time: "~1 km (on Aluva–Munnar road)", icon: Train },
    { label: "National Highway Access", time: "Direct access on NH 544", icon: Car },
    { label: "Free Parking & Valet", time: "Complimentary for all diners & guests", icon: Navigation },
  ];

  return (
    <div className="bg-[#0C101B] text-slate-100 min-h-screen">
      {/* 1. ABOUT HERO - NATURAL PHOTOGRAPHIC CLARITY */}
      <section className="relative min-h-[75vh] sm:min-h-[82vh] flex items-end justify-start pt-28 pb-10 sm:pb-14 px-6 sm:px-10 lg:px-16">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/location/facade.webp"
            alt="Chettungal Hotel New Town Facade & Entrance on NH 544 Angamaly"
            fill
            className="object-cover object-bottom brightness-100"
            priority
          />
          {/* Natural photographic clarity: subtle top navbar vignette and soft bottom transition */}
          <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-b from-black/60 to-transparent pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-44 bg-gradient-to-t from-[#0C101B] via-[#0C101B]/60 to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-white/20 backdrop-blur-md mb-3 shadow-lg">
              <MapPin className="w-3.5 h-3.5 text-[#E5C158]" />
              <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
                NH 544, Angamaly, Kerala · 683572
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif text-white tracking-tight mb-2 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
              One Address, <span className="italic font-light text-[#F5D061]">Every Occasion.</span>
            </h1>

            <p className="font-serif text-xl sm:text-2xl text-[#F5D061] italic drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
              &ldquo;Rooms, rooftop, restaurant, and hall — all under one roof.&rdquo;
            </p>
          </div>
        </div>
      </section>

      {/* 2. CHETTUNGAL ETHOS & ENTRANCE / RECEPTION GALLERY */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold mb-2 block">
                The Chettungal Ethos
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-white mb-6">
                The Table, The Roof, The Hall — Chettungal Keeps Them All Open
              </h2>
              <div className="space-y-4 text-sm text-slate-300 font-light leading-relaxed">
                <p>
                  Hotel New Town was purposefully designed to break the mold of conventional highway hotels. We believe that what surrounds your room matters most: the warmth of fresh coastal cooking at Fish Town, the elevated twilight energy of CasaBay, and the grand memories created in Town Hall.
                </p>
                <p>
                  Whether you are driving in from Cochin International Airport, hosting a wedding banquet, or stopping for family lunch along NH 544, Chettungal hospitality is genuine, unhurried, and distinct.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-xs text-[#E5C158]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>24/7 Front Desk Concierge</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#E5C158]">
                  <ShieldCheck className="w-4 h-4" />
                  <span>On-Site 100% DG Power Backup</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <TiltCard3D maxTilt={6} className="rounded-sm">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#E5C158]/20 shadow-lg">
                  <Image
                    src="/images/location/reception-entrance.webp"
                    alt="Hotel New Town Main Entrance"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs font-serif text-white">
                    Main Hotel Entrance
                  </div>
                </div>
              </TiltCard3D>

              <TiltCard3D maxTilt={6} className="rounded-sm">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#E5C158]/20 shadow-lg">
                  <Image
                    src="/images/location/reception-counter.webp"
                    alt="Hotel New Town Reception Counter"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs font-serif text-white">
                    Front Desk & Check-In
                  </div>
                </div>
              </TiltCard3D>

              <TiltCard3D maxTilt={6} className="rounded-sm">
                <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-[#E5C158]/20 shadow-lg">
                  <Image
                    src="/images/location/reception-2.webp"
                    alt="Hotel New Town Lobby Area"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B]/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-xs font-serif text-white">
                    Lobby Lounge & Waiting
                  </div>
                </div>
              </TiltCard3D>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. TRANSIT PROXIMITY & LOCATION MAP */}
      <section className="py-20 bg-[#111726] border-y border-white/10">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="Connectivity"
              title="Strategic Position on NH 544"
              subtitle="Prime highway access connecting Kochi Airport, Angamaly railway, and regional tourist arteries."
              align="center"
              theme="dark"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {transitPoints.map((tp, idx) => {
                const Icon = tp.icon;
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-sm bg-[#131A2B] border border-[#E5C158]/15 flex flex-col hover:border-[#E5C158]/40 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-[#E5C158] mb-3" />
                    <span className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                      {tp.label}
                    </span>
                    <span className="text-base font-serif text-white font-medium">
                      {tp.time}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Map display */}
            <div className="rounded-sm overflow-hidden border border-[#E5C158]/30 shadow-2xl bg-[#131A2B]">
              <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10">
                <div>
                  <h3 className="text-xl font-serif text-white">{SITE_CONFIG.address}</h3>
                  <p className="text-xs text-slate-400 mt-1">{SITE_CONFIG.cityState} {SITE_CONFIG.pincode}</p>
                </div>
                <a
                  href={SITE_CONFIG.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-colors shadow"
                >
                  Open in Google Maps Navigation
                </a>
              </div>

              <div className="relative w-full h-[300px] sm:h-[420px] bg-[#0C101B]">
                <iframe
                  src={SITE_CONFIG.googleMapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="brightness-90 contrast-105"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
