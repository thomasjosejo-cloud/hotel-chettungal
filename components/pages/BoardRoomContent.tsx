"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Briefcase,
  Monitor,
  Wifi,
  VolumeX,
  Coffee,
  CheckCircle2,
  Calendar,
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Video,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import WhatsAppCta from "@/components/shared/WhatsAppCta";
import TiltCard3D from "@/components/3d/TiltCard3D";
import { EVENTS_CONTENT } from "@/content/events";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

export default function BoardRoomContent() {
  const { boardRoom } = EVENTS_CONTENT;

  const [formData, setFormData] = useState({
    purpose: "Executive Board Meeting",
    duration: "Full-Day Summit (8 Hours)",
    date: "",
    delegates: "Up to 12 Guests",
    name: "",
    phone: "",
    company: "",
  });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const link = buildWhatsAppLink("Board Room Corporate Booking", {
      Purpose: formData.purpose,
      Package: formData.duration,
      Date: formData.date || "To be scheduled",
      Delegates: formData.delegates,
      Contact: formData.name || "Corporate Delegate",
      Company: formData.company || "Not specified",
      Phone: formData.phone || "Not provided",
    });
    window.open(link, "_blank");
  };

  return (
    <div className="bg-[#0C101B] text-slate-100 min-h-screen">
      {/* 1. HERO SECTION WITH REAL BOARDROOM PHOTO */}
      <section className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/board-room/boardroom-hero.webp"
            alt="The Boardroom at Chettungal New Town Hotel"
            fill
            className="object-cover brightness-90 contrast-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0C101B] via-[#0C101B]/40 to-black/55" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111726]/80 border border-[#E5C158]/40 backdrop-blur-md mb-6">
            <Briefcase className="w-3.5 h-3.5 text-[#E5C158]" />
            <span className="text-[11px] uppercase tracking-[0.25em] font-semibold text-[#E5C158]">
              Dedicated Meeting Suite · For 12 · NH 544, Angamaly
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-tight mb-3">
            The Boardroom
          </h1>

          <p className="font-serif text-2xl sm:text-3xl text-[#E5C158] italic mb-6">
            &ldquo;A room built for focus.&rdquo;
          </p>

          <p className="max-w-2xl text-base sm:text-lg text-slate-200 font-light leading-relaxed mb-8">
            Quiet, well-equipped, and ready for presentations, interviews, or closed-door discussions — a dedicated meeting room, not a converted corner.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#corporate-enquiry"
              className="w-full sm:w-auto px-8 py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-colors shadow-lg"
            >
              Book Corporate Suite
            </a>
            <WhatsAppCta
              intent="The Boardroom Availability Check"
              label={`Corporate Desk (${SITE_CONFIG.phone})`}
              variant="dark"
              className="w-full sm:w-auto px-7 py-4 text-xs uppercase tracking-widest border border-white/20"
            />
          </div>
        </div>
      </section>

      {/* 2. SPECIFICATIONS & TECH MATRIX WITH 3D TILT */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeader
          eyebrow="Facilities & Setup"
          title="Boardroom-Style Seating For 12"
          subtitle="A dedicated corporate environment equipped with presentation displays and executive hospitality."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {boardRoom.specs.map((spec, i) => (
            <TiltCard3D key={i} maxTilt={8} className="rounded-sm">
              <div className="p-6 rounded-sm bg-[#121824] border border-white/10 hover:border-[#D4AF37]/50 transition-colors h-full flex flex-col justify-between shadow-lg">
                <div>
                  <div className="w-9 h-9 rounded-sm bg-[#182030] text-[#D4AF37] flex items-center justify-center mb-4">
                    {i === 0 ? <Briefcase className="w-4 h-4" /> : i === 1 ? <Monitor className="w-4 h-4" /> : i === 2 ? <Video className="w-4 h-4" /> : i === 3 ? <Wifi className="w-4 h-4" /> : i === 4 ? <VolumeX className="w-4 h-4" /> : <Coffee className="w-4 h-4" />}
                  </div>
                  <span className="text-[11px] uppercase tracking-wider text-[#D4AF37] font-semibold block mb-1">
                    {spec.label}
                  </span>
                  <p className="text-sm text-slate-200 font-light leading-relaxed">
                    {spec.value}
                  </p>
                </div>
              </div>
            </TiltCard3D>
          ))}
        </div>
      </section>

      {/* 3. REAL BOARDROOM GALLERY */}
      <section className="py-20 bg-[#111726] border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Corporate Ambiance"
            title="The Meeting Suite"
            subtitle="Explore the boardroom table, grey executive ergonomic armchairs, and acoustic lighting."
            align="center"
            theme="dark"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/board-room/boardroom-hero.webp"
                alt="The Boardroom Executive Seating"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-white text-base">
                12 High-Back Executive Armchairs & Conference Table
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/board-room/boardroom-2.webp"
                alt="Presentation Display Screen"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-white text-base">
                Presentation Display & Dedicated Video Conferencing
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/board-room/boardroom-angle.webp"
                alt="The Boardroom Angle View"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-white text-base">
                Natural Daylight & Acoustic Paneling
              </div>
            </div>

            <div className="relative aspect-[16/10] rounded-sm overflow-hidden border border-white/10 shadow-2xl group">
              <Image
                src="/images/board-room/boardroom-focus.webp"
                alt="Distraction Free Setting"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-xs font-serif text-white text-base">
                Distraction-Free Setting for Strategic Decisions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORPORATE ENQUIRY FORM */}
      <section id="corporate-enquiry" className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="p-8 sm:p-10 rounded-sm bg-[#131A2B] border border-[#E5C158]/30 shadow-2xl">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-[0.25em] text-[#E5C158] font-semibold">
              Corporate Reservation
            </span>
            <h2 className="text-3xl font-serif text-white mt-2">
              Reserve The Boardroom
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-2">
              Book our 12-seat meeting suite. Refreshments and executive lunch at Fish Town can be paired seamlessly.
            </p>
          </div>

          <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                  Meeting Purpose
                </label>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-sm bg-[#0C101B] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#E5C158]"
                >
                  <option value="Executive Board Meeting">Executive Board Meeting</option>
                  <option value="Client Pitch / Presentation">Client Pitch / Presentation</option>
                  <option value="Interviews / Recruitment Panel">Interviews / Recruitment Panel</option>
                  <option value="Closed-Door Strategy Discussion">Closed-Door Strategy Discussion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                  Duration Format
                </label>
                <select
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-sm bg-[#0C101B] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#E5C158]"
                >
                  <option value="Half-Day (Up to 4 Hours)">Half-Day (Up to 4 Hours)</option>
                  <option value="Full-Day Summit (Up to 8 Hours)">Full-Day Summit (Up to 8 Hours)</option>
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
                  Contact Name
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="Company Name"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-sm bg-[#0C101B] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#E5C158]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                  WhatsApp Contact Number
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
            </div>

            <button
              type="submit"
              className="w-full py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect on WhatsApp with Corporate Desk</span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
