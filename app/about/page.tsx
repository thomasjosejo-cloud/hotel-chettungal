import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Navigation, Car, Train, Plane, Clock, Phone, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { SITE_CONFIG } from "@/content/site-config";

export default function AboutPage() {
  const transitPoints = [
    { label: "Kochi Airport (CIAL)", time: "~5 km drive (short drive in)", icon: Plane },
    { label: "Angamaly Railway Station", time: "~1 km (on Aluva–Munnar road)", icon: Train },
    { label: "National Highway Access", time: "Direct access on NH 544", icon: Car },
    { label: "Free Parking & Valet", time: "Complimentary for all diners & guests", icon: Navigation },
  ];

  return (
    <div className="bg-[#0A0D12] text-slate-100 min-h-screen">
      {/* 1. ABOUT HERO WITH REAL FACADE */}
      <section className="relative min-h-[65vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/location/facade.webp"
            alt="Chettungal Hotel New Town Facade on NH 544 Angamaly"
            fill
            className="object-cover brightness-[0.4] contrast-110"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0D12] via-[#0A0D12]/60 to-black/75" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#D4AF37]/40 backdrop-blur-md mb-6">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
              NH 544, Angamaly, Kerala · 683572
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-serif text-white tracking-tight mb-4">
            One Address, Every Occasion
          </h1>

          <p className="text-base sm:text-xl text-[#D4AF37] font-light max-w-2xl leading-relaxed">
            Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 — all under one roof on NH 544, Angamaly.
          </p>
        </div>
      </section>

      {/* 2. CHETTUNGAL ETHOS & RECEPTION PHOTO */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-2 block">
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
              <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                <ShieldCheck className="w-4 h-4" />
                <span>24/7 Front Desk Concierge</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[#D4AF37]">
                <ShieldCheck className="w-4 h-4" />
                <span>On-Site 100% DG Power Backup</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <TiltCard3D maxTilt={6} className="rounded-sm">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src="/images/location/reception-1.webp"
                  alt="Hotel New Town Reception"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-serif text-white">
                  Ground Floor Reception
                </div>
              </div>
            </TiltCard3D>

            <TiltCard3D maxTilt={6} className="rounded-sm">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/10 shadow-lg">
                <Image
                  src="/images/location/reception-2.webp"
                  alt="Hotel New Town Lobby Area"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-xs font-serif text-white">
                  Lobby Lounge & Concierge
                </div>
              </div>
            </TiltCard3D>
          </div>
        </div>
      </section>

      {/* 3. TRANSIT PROXIMITY & LOCATION MAP */}
      <section className="py-20 bg-[#0E131C] border-y border-white/10">
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
                  className="p-6 rounded-sm bg-[#121824] border border-white/5 flex flex-col"
                >
                  <Icon className="w-5 h-5 text-[#D4AF37] mb-3" />
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
          <div className="rounded-sm overflow-hidden border border-[#D4AF37]/30 shadow-2xl bg-[#121824]">
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10">
              <div>
                <h3 className="text-xl font-serif text-white">{SITE_CONFIG.address}</h3>
                <p className="text-xs text-slate-400 mt-1">{SITE_CONFIG.cityState} {SITE_CONFIG.pincode}</p>
              </div>
              <a
                href={SITE_CONFIG.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12] hover:brightness-110 transition-colors shadow"
              >
                Open in Google Maps Navigation
              </a>
            </div>

            <div className="relative w-full h-[420px] bg-[#0A0D12]">
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
      </section>
    </div>
  );
}
