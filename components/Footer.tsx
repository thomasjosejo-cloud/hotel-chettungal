import Link from "next/link";
import Image from "next/image";
import { NAV, SITE, WA, whatsapp } from "@/content/site";

/** 44px touch target on phones and tablets via padding; tighter rhythm from lg up. */
const LINK = "inline-flex min-h-11 items-center py-2.5 text-ivory/85 transition-colors hover:text-brass-light lg:min-h-0 lg:py-0";

/** A column heading. Each column below answers exactly one question. */
function ColumnHeading({ children }: { children: string }) {
  return <p className="eyebrow text-brass-light">{children}</p>;
}

/** Everywhere to go, minus Home and Enquire: the header and the dock carry those. */
const EXPLORE = NAV.filter((n) => n.href !== "/");

export default function Footer() {
  return (
    // pb-28 keeps the bottom bar clear of the fixed phone dock.
    <footer className="bg-night pb-28 pt-20 text-ivory md:pb-12">
      <div className="container-x">
        <div className="grid gap-12 md:grid-cols-2 md:gap-10 lg:grid-cols-12">
          {/* Brand: the same lockup the header uses, so there is one of them. */}
          <div className="md:col-span-2 lg:col-span-3">
            <div className="flex items-center gap-3">
              <Image
                src="/branding/chettungal_crest_gold.png"
                alt=""
                width={344}
                height={260}
                sizes="48px"
                className="h-10 w-auto"
              />
              <span className="flex flex-col leading-none">
                <span className="text-[0.8125rem] font-medium uppercase tracking-[0.28em] text-brass-light">
                  {SITE.house}
                </span>
                <span className="mt-1 font-serif text-[1.3rem] tracking-[0.02em]">New Town Hotel</span>
              </span>
            </div>
            <p className="mt-7 font-serif text-[2rem] leading-tight">
              The table, the roof,
              <br />
              <em className="text-brass-light">the hall.</em>
            </p>
          </div>

          <div className="lg:col-span-3">
            <ColumnHeading>Visit</ColumnHeading>
            <address className="mt-5 not-italic leading-relaxed text-ivory/85">
              {SITE.name}
              <br />
              {SITE.address.line}
              <br />
              {SITE.address.region} {SITE.address.pincode}
            </address>
            {/* inline-flex makes each child a flex item, which eats the space in the
                markup, so the gap has to be a real one. */}
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${LINK} mt-2 gap-1.5 lg:mt-4`}>
              Directions <span aria-hidden>↗</span>
            </a>
          </div>

          {(SITE.hours.casabay || SITE.hours.fishtown) && (
            <div className="lg:col-span-3">
              <ColumnHeading>Hours</ColumnHeading>
              {/* Two aligned rows: the venue, then the hours the property gave. */}
              <dl className="mt-5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2 leading-relaxed">
                {SITE.hours.casabay && (
                  <>
                    <dt className="text-ivory/85">CasaBay</dt>
                    <dd className="whitespace-nowrap text-smoke">{SITE.hours.casabay}</dd>
                  </>
                )}
                {SITE.hours.fishtown && (
                  <>
                    <dt className="text-ivory/85">Fish Town</dt>
                    <dd className="whitespace-nowrap text-smoke">{SITE.hours.fishtown}</dd>
                  </>
                )}
              </dl>
            </div>
          )}

          <div className="lg:col-span-3">
            <ColumnHeading>Contact</ColumnHeading>
            <div className="mt-2 grid justify-items-start lg:mt-4 lg:gap-3">
              <a href={SITE.phoneHref} className={LINK}>
                {SITE.phone}
              </a>
              <a href={whatsapp(WA.general)} target="_blank" rel="noopener noreferrer" className={LINK}>
                WhatsApp us
              </a>
              {SITE.email && (
                <a href={`mailto:${SITE.email}`} className={`${LINK} max-w-full [overflow-wrap:anywhere]`}>
                  {SITE.email}
                </a>
              )}
            </div>
          </div>
        </div>

        <nav aria-label="Footer" className="mt-14 border-t border-white/10 pt-8">
          <ColumnHeading>Explore</ColumnHeading>
          <ul className="mt-2 grid grid-cols-2 gap-x-8 sm:grid-cols-3 lg:mt-4 lg:grid-cols-6 lg:gap-x-6">
            {EXPLORE.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className={LINK}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-col gap-6 border-t border-white/10 pt-8 text-sm text-smoke sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <span className="flex items-center gap-3">
            {/* 13px, not 12: the site's floor is 14px with an exception for uppercase
                tracked labels at 13, and 12px failed the text-size check on all
                eight pages. */}
            <span className="text-[0.8125rem] uppercase tracking-[0.22em]">Crafted by</span>
            <a
              href="https://www.thehostory.in"
              target="_blank"
              rel="noopener"
              title="HOSTORY — Hospitality, Reimagined."
              className="inline-flex min-h-11 items-center opacity-85 transition-opacity hover:opacity-100 focus-visible:opacity-100"
            >
              <Image
                src="/branding/hostory-compact.png"
                alt="HOSTORY — Hospitality, Reimagined."
                width={900}
                height={209}
                sizes="(max-width: 760px) 130px, 150px"
                loading="lazy"
                className="h-auto w-[130px] md:w-[150px]"
              />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
