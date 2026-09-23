import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import EnquiryBand from "@/components/EnquiryBand";
import { Button, Eyebrow, Numeral, WhatsAppIcon } from "@/components/ui";
import { PHOTOS, SITE, VENUES, WA, whatsapp } from "@/content/site";
import { blurFor } from "@/content/blur";

// Each venue keeps its own colour world on the dark home page.
const WORLD: Record<string, { band: string; accent: string }> = {
  casabay: { band: "bg-night", accent: "text-ember" },
  fishtown: { band: "bg-navy", accent: "text-brass-light" },
  "town-hall": { band: "bg-[#2a2118]", accent: "text-brass-light" },
  "board-room": { band: "bg-charcoal", accent: "text-brass-light" },
};

export const metadata: Metadata = { alternates: { canonical: "/" } };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone.replace(/\s/g, ""),
  image: `${SITE.url}/images/casabay/casa-ambience-2.webp`,
  numberOfRooms: 10,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.line,
    addressLocality: "Angamaly",
    addressRegion: "Kerala",
    postalCode: SITE.address.pincode,
    addressCountry: "IN",
  },
  containsPlace: [
    { "@type": "BarOrPub", name: "CasaBay", url: `${SITE.url}/casabay` },
    { "@type": "Restaurant", name: "Fish Town", url: `${SITE.url}/fishtown` },
    { "@type": "EventVenue", name: "Town Hall", maximumAttendeeCapacity: 120, url: `${SITE.url}/town-hall` },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero image={PHOTOS.casabay[0].src} alt={PHOTOS.casabay[0].alt} position="50% 60%">
        <Eyebrow className="text-brass-light">Angamaly · Kerala</Eyebrow>
        <h1 className="display mt-6 max-w-4xl">
          The table, the roof,
          <br />
          <em className="text-brass-light">the hall.</em>
        </h1>
        <p className="lede mt-7 max-w-xl text-ivory/85">
          A rooftop restobar, a multi-cuisine restaurant, a banquet hall for 120, a private board room and ten
          rooms. One address on NH 544.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="/casabay">Discover CasaBay</Button>
          <Button href="/town-hall" tone="outline-light">
            Plan an event
          </Button>
        </div>
      </PageHero>

      {/* Statement */}
      <section className="bg-ink py-24 text-ivory md:py-36">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <Eyebrow className="text-brass-light md:col-span-3 md:pt-3">More than a stay</Eyebrow>
          <p className="statement md:col-span-9" data-reveal>
            Hotel New Town is built around the table, not the bed. Four spaces for eating, drinking, meeting and
            celebrating, <span className="italic text-brass-light">and ten rooms for when the evening runs long.</span>
          </p>
        </div>
      </section>

      {/* The four venues — each in its own colour world */}
      <div aria-label="Venues" role="region">
        {VENUES.map((v, i) => {
          const flip = i % 2 === 1;
          const w = WORLD[v.slug];
          return (
            <section key={v.slug} className={`${w.band} py-20 text-ivory md:py-32`}>
              <article className="container-x grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <Link
                  href={v.href}
                  className={`group relative block aspect-[4/3] overflow-hidden md:col-span-7 ${flip ? "md:order-2 md:col-start-6" : ""}`}
                  data-reveal
                  tabIndex={-1}
                  aria-hidden
                >
                  <Image
                    src={v.image.src}
                    alt={v.image.alt}
                    fill
                    sizes="(min-width: 768px) 58vw, 100vw"
                    placeholder={blurFor(v.image.src) ? "blur" : "empty"}
                    blurDataURL={blurFor(v.image.src)}
                    className="img-zoom object-cover"
                  />
                </Link>
                <div
                  className={`md:col-span-5 ${flip ? "md:order-1 md:col-start-1 md:row-start-1 md:pr-6" : "md:pl-6"}`}
                  data-reveal
                  style={{ ["--reveal-delay" as string]: "120ms" }}
                >
                  <Numeral n={v.numeral} className={w.accent} />
                  <Eyebrow className="mt-8 text-mist">{v.kind}</Eyebrow>
                  {v.slug === "casabay" ? (
                    <h2 className="mt-3 font-casa text-[clamp(3rem,2.2rem+3vw,4.75rem)] leading-none text-ember">{v.name}</h2>
                  ) : (
                    <h2 className="h2 mt-3">{v.name}</h2>
                  )}
                  <p className={`mt-3 font-serif text-2xl italic ${w.accent}`}>{v.line}</p>
                  <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-ivory/75">{v.body}</p>
                  <Link href={v.href} className="link-arrow mt-9 text-ivory">
                    Explore {v.name.replace(/^The /, "")} <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            </section>
          );
        })}
      </div>

      {/* Stay */}
      <section className="bg-ink text-ivory">
        <div className="grid lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[640px]">
            <Image src={PHOTOS.rooms[0].src} alt={PHOTOS.rooms[0].alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="flex items-center px-5 py-20 md:px-10 md:py-24 lg:px-16 xl:px-24">
            <div className="max-w-md" data-reveal>
              <Eyebrow className="text-brass-light">Stay</Eyebrow>
              <h2 className="h2 mt-5">Ten rooms, and the Executive Bar.</h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-mist">
                Air-conditioned rooms with a work desk, television, tea station and en-suite shower. For wedding
                guests, visiting teams and anyone passing through Angamaly.
              </p>
              <div className="mt-10 flex flex-col flex-wrap gap-3 sm:flex-row">
                <Button href="/rooms" tone="outline-light">
                  See the rooms
                </Button>
                <Button href={whatsapp(WA.rooms)} tone="solid-light">
                  <WhatsAppIcon /> Check availability
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="bg-night-2 py-24 text-ivory md:py-32">
        <div className="container-x grid items-end gap-12 md:grid-cols-12">
          <div className="md:col-span-5" data-reveal>
            <Eyebrow className="text-brass-light">Find us</Eyebrow>
            <h2 className="h2 mt-5">On NH 544, in Angamaly.</h2>
            <address className="mt-6 not-italic text-[1.0625rem] leading-relaxed text-mist">
              {SITE.address.line}
              <br />
              {SITE.address.region} {SITE.address.pincode}
            </address>
            <div className="mt-9 flex flex-wrap gap-x-10 gap-y-4">
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow text-ivory">
                Get directions <span aria-hidden>↗</span>
              </a>
              <Link href="/about" className="link-arrow text-ivory">
                About the hotel <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <div className="relative aspect-[6/5] overflow-hidden md:col-span-6 md:col-start-7" data-reveal>
            <Image src={PHOTOS.location[0].src} alt={PHOTOS.location[0].alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <EnquiryBand />
    </>
  );
}
