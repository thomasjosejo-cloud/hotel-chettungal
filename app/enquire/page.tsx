"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  Calendar,
  Send,
  Sparkles,
  Plane,
  Train,
} from "lucide-react";
import SectionHeader from "@/components/shared/SectionHeader";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

export default function EnquirePage() {
  const [purpose, setPurpose] = useState<"dining" | "event" | "meeting" | "stay">("dining");
  const [venue, setVenue] = useState("CasaBay Rooftop Restobar");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [headcount, setHeadcount] = useState("2 Guests");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const link = buildWhatsAppLink(`Consolidated Enquiry: ${purpose.toUpperCase()}`, {
      Purpose: purpose.toUpperCase(),
      Venue: venue,
      Name: name || "Guest",
      Phone: phone,
      "Preferred Date": date || "Flexible",
      "Preferred Time": time || "Flexible",
      Headcount: headcount,
      Notes: notes || "None",
    });

    window.open(link, "_blank");
  };

  return (
    <div className="bg-[#0A0D12] text-slate-100 min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          eyebrow="Direct Host Enquiries"
          title="Connect with Chettungal"
          subtitle="Every reservation at Hotel New Town is handled directly by our floor team on WhatsApp or phone."
          align="center"
          theme="dark"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Direct Contact & Location Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="p-8 rounded-sm bg-[#0E131C] border border-[#D4AF37]/30 shadow-xl space-y-6">
              <div className="flex items-center gap-3.5">
                <Image
                  src="/branding/chettungal-logo-light.webp"
                  alt="Chettungal New Town Hotel"
                  width={46}
                  height={46}
                  className="object-contain"
                />
                <div>
                  <h3 className="font-serif text-2xl text-white">CHETTUNGAL</h3>
                  <span className="text-xs uppercase tracking-widest text-[#D4AF37]">
                    NEW TOWN HOTEL · ANGAMALY
                  </span>
                </div>
              </div>

              <p className="text-sm font-light text-slate-300 leading-relaxed">
                We operate without third-party booking engines to ensure transparent pricing, flexible banquet customisation, and immediate human response.
              </p>

              <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
                <a
                  href={`tel:${SITE_CONFIG.phoneRaw}`}
                  className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-sm bg-[#141B26] border border-white/10 flex items-center justify-center text-[#D4AF37]">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                      Direct Phone
                    </span>
                    <span className="font-serif text-base">{SITE_CONFIG.phone}</span>
                  </div>
                </a>

                <a
                  href={buildWhatsAppLink("Quick Concierge Chat")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-slate-200 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-sm bg-[#141B26] border border-white/10 flex items-center justify-center text-[#D4AF37]">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                      Instant WhatsApp
                    </span>
                    <span className="font-serif text-base">{SITE_CONFIG.phone}</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 text-slate-200">
                  <div className="w-9 h-9 rounded-sm bg-[#141B26] border border-white/10 flex items-center justify-center text-[#D4AF37]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                      Email
                    </span>
                    <span className="font-serif text-sm">{SITE_CONFIG.email}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-slate-200 pt-1">
                  <div className="w-9 h-9 rounded-sm bg-[#141B26] border border-white/10 flex items-center justify-center text-[#D4AF37] shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest block">
                      Address
                    </span>
                    <span className="text-xs font-light text-slate-300">
                      {SITE_CONFIG.address}, {SITE_CONFIG.cityState} {SITE_CONFIG.pincode}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Proximity Card */}
            <div className="p-6 rounded-sm bg-[#0E131C] border border-white/10 text-xs text-slate-300 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold block mb-2">
                Location & Transit Proximity
              </span>
              <div className="flex items-center gap-2 py-1 border-b border-white/5">
                <Plane className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{SITE_CONFIG.proximity.airport}</span>
              </div>
              <div className="flex items-center gap-2 py-1 border-b border-white/5">
                <Train className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>{SITE_CONFIG.proximity.railway}</span>
              </div>
              <div className="flex items-center gap-2 py-1">
                <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>CasaBay: 5 PM – 11:30 PM · Fish Town: 7:30 AM – 11 PM</span>
              </div>
            </div>
          </div>

          {/* Right Column: Multi-Purpose Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-sm bg-[#0E131C] border border-[#D4AF37]/30 shadow-2xl">
              <h3 className="text-2xl font-serif text-white mb-2">
                Reserve or Enquire Online
              </h3>
              <p className="text-xs text-slate-300 font-light mb-6">
                Choose your purpose below to customize your enquiry fields.
              </p>

              {/* Purpose Selector Tabs */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8">
                {[
                  { id: "dining", label: "Dining / Table", defVenue: "CasaBay Rooftop Restobar" },
                  { id: "event", label: "Banquet Event", defVenue: "Town Hall (Up to 120)" },
                  { id: "meeting", label: "Boardroom", defVenue: "The Boardroom (For 12)" },
                  { id: "stay", label: "Room Stay", defVenue: "10 AC Rooms" },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setPurpose(item.id as any);
                      setVenue(item.defVenue);
                    }}
                    className={`py-3 px-2 text-xs uppercase tracking-wider font-bold rounded-sm border transition-all text-center ${
                      purpose === item.id
                        ? "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12] border-[#D4AF37] shadow-md"
                        : "bg-black/40 text-slate-300 border-white/10 hover:border-white/20"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Dynamic Venue selection */}
                {purpose === "dining" && (
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      Select Dining Venue
                    </label>
                    <select
                      value={venue}
                      onChange={(e) => setVenue(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-sm bg-[#0A0D12] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#D4AF37]"
                    >
                      <option value="CasaBay Rooftop Restobar">CasaBay Rooftop Restobar (Open 5 PM · Live Music)</option>
                      <option value="Fish Town Multi-Cuisine">Fish Town Multi-Cuisine Restaurant (Breakfast, Lunch & Dinner)</option>
                    </select>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Thomas"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-sm bg-[#0A0D12] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="+91 99611 00000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-sm bg-[#0A0D12] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-sm bg-[#0A0D12] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#D4AF37]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-sm bg-[#0A0D12] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                      Headcount / Guests
                    </label>
                    <select
                      value={headcount}
                      onChange={(e) => setHeadcount(e.target.value)}
                      className="w-full px-3.5 py-3 rounded-sm bg-[#0A0D12] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#D4AF37]"
                    >
                      {purpose === "dining" && (
                        <>
                          <option value="1 - 2 Guests">1 – 2 Guests</option>
                          <option value="3 - 5 Guests">3 – 5 Guests</option>
                          <option value="6 - 10 Guests">6 – 10 Guests</option>
                          <option value="Large Group (10+)">Large Group (10+)</option>
                        </>
                      )}
                      {purpose === "event" && (
                        <>
                          <option value="50 - 70 Guests">50 – 70 Guests</option>
                          <option value="70 - 90 Guests">70 – 90 Guests</option>
                          <option value="90 - 120 Guests">90 – 120 Guests</option>
                        </>
                      )}
                      {purpose === "meeting" && (
                        <>
                          <option value="4 - 8 Delegates">4 – 8 Delegates</option>
                          <option value="9 - 12 Delegates">9 – 12 Delegates (Max)</option>
                        </>
                      )}
                      {purpose === "stay" && (
                        <>
                          <option value="1 Room">1 Room</option>
                          <option value="2 - 3 Rooms">2 – 3 Rooms</option>
                          <option value="Whole Property Block (10 Rooms)">Whole Property Block (10 Rooms)</option>
                        </>
                      )}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-slate-300 font-medium mb-1.5">
                    Special Requests / Notes
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mention table preference, buffet requirements, arrival time..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-sm bg-[#0A0D12] border border-white/15 text-slate-100 text-sm focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12] hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Submit & Connect on WhatsApp</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
