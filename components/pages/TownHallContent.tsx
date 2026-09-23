"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  Volume2,
  Wind,
  UtensilsCrossed,
  ShieldCheck,
  Send,
  MessageSquare,
  Car,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { EVENTS_CONTENT } from "@/content/events";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";
import ScrollReveal from "@/components/motion/ScrollReveal";
import StaggerChildren from "@/components/motion/StaggerChildren";

export default function TownHallContent() {
  const { townHall } = EVENTS_CONTENT;

  // Form state
  const [formData, setFormData] = useState({
    eventType: "Wedding Reception",
    date: "",
    headcount: "80 Guests",
    name: "",
    phone: "",
    notes: "",
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = buildWhatsAppLink("Town Hall Banquet Booking", {
      "Event Type": formData.eventType,
      "Preferred Date": formData.date || "To be discussed",
      "Estimated Guests": formData.headcount,
      "Contact Name": formData.name || "Guest",
      "Phone Number": formData.phone || "Not provided",
      "Special Notes": formData.notes || "None",
    });
    window.open(link, "_blank");
  };

  return (
    <div className="bg-[#0C101B] text-slate-100 min-h-screen">
      {/* 1. HERO SECTION WITH REAL TOWN HALL PHOTO */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/town-hall/hall-lighting.webp"
            alt="Town Hall Banquet Arena at Chettungal New Town Hotel"
            fill
            className="object-cover brightness-95 contrast-105"
            priority
          />
          {/* Natural Vignette */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/25 to-transparent h-44" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B] via-[#0C101B]/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(12,16,27,0.2)_0%,transparent_75%)]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-[#E5C158]/40 backdrop-blur-md mb-6 shadow-lg">
            <Users className="w-3.5 h-3.5 text-[#E5C158]" />
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
              Indoor Venue · Up to 120 Guests · NH 544, Angamaly
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight mb-3 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            Town Hall
          </h1>

          <p className="font-serif text-2xl sm:text-3xl text-[#F5D061] italic mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            &ldquo;Where the whole guest list fits.&rdquo;
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#enquiry-form"
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-colors shadow-lg"
            >
              Check Date & Get Quotation
            </a>
            <WhatsAppCta
              intent="Town Hall Quick Banquet Enquiry"
              label={`WhatsApp Banquet Team (${SITE_CONFIG.phone})`}
              variant="dark"
              className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest border border-white/20"
            />
          </div>
        </div>
      </section>

      {/* 2. CAPACITY & FORMAT TILES WITH 3D TILT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <ScrollReveal direction="up">
          <SectionHeader
            eyebrow="Seating Configurations"
            title="Theatre, Banquet & Floor Setups"
            subtitle="Town Hall adapts effortlessly to formal conferences, wedding receptions, and celebratory banquets."
            align="center"
            theme="dark"
          />
        </ScrollReveal>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {townHall.configurations.map((config, idx) => (
            <TiltCard3D key={idx} maxTilt={8} className="rounded-sm">
              <div className="p-6 rounded-sm bg-[#121824] border border-white/10 hover:border-[#D4AF37]/50 transition-colors flex flex-col justify-between h-full shadow-lg">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-mono">
                    Format {idx + 1}
                  </span>
                  <h3 className="text-xl font-serif text-white mt-1 mb-2">
                    {config.format}
                  </h3>
                  <div className="text-2xl font-serif text-[#D4AF37] font-semibold mb-3">
                    {config.capacity}
                  </div>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed pt-3 border-t border-white/10">
                  {config.bestFor}
                </p>
              </div>
            </TiltCard3D>
          ))}
        </StaggerChildren>
      </section>

      {/* 3. REAL VENUE GALLERY */}
      <section className="py-20 bg-[#111726] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <SectionHeader
              eyebrow="Venue Views"
              title="A Hall Built for Celebrations"
              subtitle="Explore the polished staging, acoustic wall design, and central air-conditioning at Town Hall."
              align="center"
              theme="dark"
            />
          </ScrollReveal>

          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/town-hall/hall-hero.webp"
                alt="Town Hall Full Banquet Configuration"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-white text-base">
                Banquet Setup with Ceremonial Elevated Stage
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/town-hall/hall-stage.webp"
                alt="Town Hall Stage & Dais"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-white text-base">
                Acoustic Presentation Stage & Dais
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/town-hall/hall-2.webp"
                alt="Town Hall Conference & Seminar Layout"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-white text-base">
                Theatre & Seminar Conference Layout
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/town-hall/hall-wide.webp"
                alt="Town Hall Wide Panorama"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-white text-base">
                Column-Free Banquet Floor (Up to 120 Guests)
              </div>
            </div>
          </StaggerChildren>
        </div>
      </section>

      {/* 4. BANQUET ENQUIRY FORM */}
      <section id="enquiry-form" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <ScrollReveal direction="up">
        <div className="p-8 sm:p-10 rounded-sm bg-[#131A2B] border border-[#E5C158]/30 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold">
              Banquet Quotation
            </span>
            <h2 className="text-3xl font-serif text-white mt-2">
              Reserve Town Hall (Up to 120)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-2">
              Submit your preferred date and requirements. Our banquet team will respond directly on WhatsApp with availability and custom menus.
            </p>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                  Event Occasion
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-sm bg-[#0C101B] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#E5C158]"
                >
                  <option value="Wedding Reception">Wedding Reception</option>
                  <option value="Family Celebration / Birthday">Family Celebration / Birthday</option>
                  <option value="Corporate Conference">Corporate Conference</option>
                  <option value="Dinner Gala">Dinner Gala</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                  Estimated Headcount
                </label>
                <select
                  value={formData.headcount}
                  onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-sm bg-[#0C101B] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#E5C158]"
                >
                  <option value="50 - 70 Guests">50 – 70 Guests</option>
                  <option value="70 - 90 Guests">70 – 90 Guests</option>
                  <option value="90 - 110 Guests">90 – 110 Guests</option>
                  <option value="110 - 120 Guests">110 – 120 Guests (Max)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                  Preferred Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-sm bg-[#0C101B] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#E5C158]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-sm bg-[#0C101B] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#E5C158]"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                WhatsApp Phone Number
              </label>
              <input
                type="tel"
                placeholder="+91 99611 00000"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-3 rounded-sm bg-[#0C101B] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#E5C158]"
                required
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                Special Catering or Staging Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention buffet packages, welcome drink preferences, stage setup..."
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-3.5 py-3 rounded-sm bg-[#0C101B] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#E5C158]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp with Banquet Host</span>
            </button>
          </form>
        </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
