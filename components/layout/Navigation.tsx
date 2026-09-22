"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, Phone, MessageSquare } from "lucide-react";
import { SITE_CONFIG, buildWhatsAppLink } from "@/content/site-config";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/casabay", label: "CasaBay", badge: "Rooftop" },
  { href: "/fishtown", label: "Fish Town", badge: "Dining" },
  { href: "/town-hall", label: "Town Hall", badge: "120 Pax" },
  { href: "/board-room", label: "Board Room", badge: "Meeting" },
  { href: "/rooms", label: "Rooms", badge: "10 Suites" },
  { href: "/about", label: "About" },
  { href: "/enquire", label: "Enquire", isCta: true },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isLightPage = pathname === "/fishtown";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isLightPage
            ? "bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#D4AF37]/30 shadow-sm py-3"
            : "bg-[#0A0D12]/95 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-xl py-3"
          : "bg-gradient-to-b from-black/90 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand identity */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 shrink-0">
            <Image
              src="/branding/chettungal_crest_gold.png"
              alt="Chettungal New Town Hotel"
              width={44}
              height={44}
              className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-lg sm:text-xl tracking-wider leading-tight ${
                isLightPage && scrolled ? "text-[#0B0E14]" : "text-white"
              }`}
            >
              CHETTUNGAL
            </span>
            <span className="text-[9px] sm:text-[10px] tracking-[0.25em] uppercase font-medium text-[#D4AF37]">
              NEW TOWN HOTEL · ANGAMALY
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-7">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;

            if (link.isCta) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-widest font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12] hover:brightness-110 transition-all duration-300 shadow-md"
                >
                  {link.label}
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-xs sm:text-sm tracking-widest uppercase transition-colors duration-200 py-1 ${
                  isActive
                    ? "text-[#D4AF37] font-semibold"
                    : isLightPage && scrolled
                    ? "text-stone-800 hover:text-black font-medium"
                    : "text-slate-200 hover:text-[#D4AF37]"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#D4AF37]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Tablet quick action */}
        <div className="hidden md:flex lg:hidden items-center gap-3">
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="p-2.5 text-[#D4AF37] hover:text-white border border-[#D4AF37]/30 rounded-sm hover:bg-[#D4AF37]/10 transition-colors"
            title="Call Front Desk"
          >
            <Phone className="w-4 h-4" />
          </a>
          <a
            href={buildWhatsAppLink("Navigation Quick Contact")}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 text-[#D4AF37] hover:text-white border border-[#D4AF37]/30 rounded-sm hover:bg-[#D4AF37]/10 transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <Link
            href="/enquire"
            className="px-4 py-2 text-xs uppercase tracking-wider font-bold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12]"
          >
            Enquire
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <a
            href={`tel:${SITE_CONFIG.phoneRaw}`}
            className="p-2 text-[#D4AF37] hover:text-white"
            title="Call"
          >
            <Phone className="w-5 h-5" />
          </a>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 focus:outline-none ${
              isLightPage && scrolled ? "text-stone-900" : "text-slate-100"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-x-0 top-full bg-[#0D1117] border-b border-[#D4AF37]/30 shadow-2xl px-6 py-8 flex flex-col gap-5 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center justify-between py-2.5 border-b border-white/5 text-base tracking-wider uppercase font-serif ${
                    isActive ? "text-[#D4AF37] font-semibold" : "text-slate-200"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-sans tracking-widest px-2 py-0.5 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] uppercase">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href={buildWhatsAppLink("Mobile Menu Direct Enquiry")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-sm bg-gradient-to-r from-[#E5C158] to-[#D4AF37] text-[#0A0D12]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp: {SITE_CONFIG.phone}</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.phoneRaw}`}
              className="flex items-center justify-center gap-2 w-full py-3 text-sm font-medium rounded-sm bg-white/5 text-slate-200 border border-white/10"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span>Call Front Desk: {SITE_CONFIG.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
