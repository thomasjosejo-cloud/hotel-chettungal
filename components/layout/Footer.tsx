import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, MessageSquare, Clock, ArrowUpRight, Plane, Train } from "lucide-react";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

export default function Footer() {
  return (
    <footer className="bg-[#0A0E18] text-slate-300 border-t border-[#E5C158]/25 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Brand Heritage & Perception */}
          <div className="lg:col-span-2 flex flex-col items-start">
            <div className="flex items-center gap-3.5 mb-4">
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src="/branding/chettungal_crest_gold.png"
                  alt="Chettungal Crest"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-serif text-2xl text-white tracking-wider leading-tight">
                  CHETTUNGAL
                </h3>
                <span className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-light">
                  NEW TOWN HOTEL · ANGAMALY
                </span>
              </div>
            </div>
            <p className="text-sm font-light text-slate-300 leading-relaxed max-w-sm mb-6">
              Rooms, a rooftop bar, a multi-cuisine kitchen, and banquet space for up to 120 — all under one roof on NH 544, Angamaly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <a
                href={buildWhatsAppLink("Footer Quick Chat")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-wider rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0C101B] hover:brightness-110 transition-all w-full sm:w-auto shadow-md"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp: {SITE_CONFIG.phone}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium tracking-wider rounded-sm bg-white/5 text-slate-200 border border-white/15 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-colors w-full sm:w-auto"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call Front Desk</span>
              </a>
            </div>
          </div>

          {/* Col 3: The Dining Pillars */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-4">
              Dine & Drink
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/casabay"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span>CasaBay Rooftop</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/fishtown"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span>Fish Town Restaurant</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-opacity" />
                </Link>
              </li>
              <li className="pt-2 text-xs text-slate-400 flex items-center gap-2">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                <span>CasaBay: 5 PM – 11:30 PM</span>
              </li>
              <li className="text-xs text-slate-400 flex items-center gap-2">
                <Clock className="w-3 h-3 text-[#D4AF37]" />
                <span>Fish Town: Breakfast, Lunch, Dinner</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay & Gather */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-4">
              Stay & Gather
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/town-hall"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span>Town Hall (Up to 120)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/board-room"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span>The Boardroom (For 12)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="group flex items-center justify-between text-slate-300 hover:text-white transition-colors"
                >
                  <span>10 AC Rooms</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-[#D4AF37] transition-opacity" />
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
                >
                  <span>Breakfast & WiFi Included</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Location & Connectivity */}
          <div>
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold mb-4">
              Location & Access
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>{SITE_CONFIG.address}, {SITE_CONFIG.cityState} {SITE_CONFIG.pincode}</span>
              </p>
              <p className="flex items-center gap-2">
                <Plane className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>~5 km from Kochi Airport (CIAL)</span>
              </p>
              <p className="flex items-center gap-2">
                <Train className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>~1 km from Angamaly Railway Station</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Brochure Sign-Off & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-slate-400">
          <p className="font-serif text-sm text-[#D4AF37] italic">
            &ldquo;The table, the roof, the hall — Chettungal keeps them all open.&rdquo;
          </p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>© {new Date().getFullYear()} Hotel New Town by Chettungal.</span>
            <span>·</span>
            <Link href="/about" className="hover:text-white transition-colors">
              Directions & Map
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
