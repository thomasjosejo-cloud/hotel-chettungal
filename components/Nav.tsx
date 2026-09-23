"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { NAV, SITE, WA, whatsapp } from "@/content/site";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,padding,border-color] duration-500 ${
        solid
          ? "border-b border-white/10 bg-night/95 py-3 backdrop-blur-md"
          : "border-b border-transparent bg-gradient-to-b from-black/55 to-transparent py-5 md:py-7"
      }`}
    >
      <div className="container-x flex items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-3" aria-label={`${SITE.name}, home`}>
          <Image
            src="/branding/chettungal_crest_gold.png"
            alt=""
            width={344}
            height={260}
            priority
            className="h-8 w-auto md:h-9"
          />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-[1.3rem] tracking-[0.02em] md:text-[1.45rem]">Hotel New Town</span>
            <span className="mt-1 text-[0.8125rem] font-medium uppercase tracking-[0.28em] text-brass-light">
              by Chettungal
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex 2xl:gap-10">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative py-2 text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-colors hover:text-brass-light ${
                  active ? "text-brass-light" : "text-ivory/90"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brass-light transition-transform duration-500 ${
                    active ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            );
          })}
          <Link
            href="/enquire"
            className="border border-brass-light/70 px-5 py-2.5 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-ivory transition-colors hover:bg-brass-light hover:text-ink"
          >
            Enquire
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative -mr-2 flex h-11 w-11 items-center justify-center xl:hidden"
        >
          <span
            className={`absolute h-px w-6 bg-ivory transition-transform duration-300 ${
              open ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`absolute h-px w-6 bg-ivory transition-transform duration-300 ${
              open ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </button>
      </div>

    </header>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        // Sibling of <header>, not a child: the header's backdrop-blur would make it
        // the containing block and collapse this fixed panel to 0px tall.
        className="fixed inset-0 z-[45] overflow-y-auto bg-night-2 pt-[76px] text-ivory xl:hidden"
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col pb-10 pt-8">
          <ol className="flex flex-col">
            {NAV.map((item, i) => (
              <li key={item.href} className="border-b border-white/10">
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="flex items-baseline gap-5 py-4"
                >
                  <span className="w-6 font-serif text-sm italic text-brass-light">{i + 1}</span>
                  <span className="font-serif text-[2rem] leading-none text-ivory">{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
          <div className="mt-auto grid gap-3 pt-10">
            <Link
              href="/enquire"
              className="bg-brass-light py-4 text-center text-sm font-medium uppercase tracking-[0.18em] text-ink"
            >
              Send an enquiry
            </Link>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={SITE.phoneHref}
                className="border border-white/20 py-4 text-center text-sm font-medium uppercase tracking-[0.18em]"
              >
                Call
              </a>
              <a
                href={whatsapp(WA.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/20 py-4 text-center text-sm font-medium uppercase tracking-[0.18em]"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
