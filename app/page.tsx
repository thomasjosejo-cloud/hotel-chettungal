import type { Metadata } from "next";
import Image from "next/image";
import HomeJourney from "@/components/home/HomeJourney";
import HeroEmbers from "@/components/motion/HeroEmbers";
import HeroParallax from "@/components/motion/HeroParallax";
import CasaBayLogo from "@/components/CasaBayLogo";
import { Button, WhatsAppIcon } from "@/components/ui";
import { PHOTOS, SITE, VENUES, WA, whatsapp, type Photo } from "@/content/site";
import { blurFor } from "@/content/blur";

// Home page: the approved prototype (docs/prototype-home.html), built in React.
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
    {
      "@type": "BarOrPub",
      name: "CasaBay",
      url: `${SITE.url}/casabay`,
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", ...SITE.openingHours.casabay },
    },
    {
      "@type": "Restaurant",
      name: "Fish Town",
      url: `${SITE.url}/fishtown`,
      openingHoursSpecification: { "@type": "OpeningHoursSpecification", ...SITE.openingHours.fishtown },
    },
    { "@type": "EventVenue", name: "Town Hall", maximumAttendeeCapacity: 120, url: `${SITE.url}/town-hall` },
  ],
};

const venue = (slug: string) => VENUES.find((v) => v.slug === slug)!;

/** A confirmed fact under a tagline (hours, seats), in the eyebrow style. Hidden while unset. */
function Fact({ children }: { children: string | null }) {
  return children ? <p className="fact">{children}</p> : null;
}
const open = (hours: string | null) => (hours ? `Open ${hours}` : null);
const CUISINES = ["Kerala & seafood", "North Indian", "Chinese", "Continental"];

/** Chapter photo for the static layout (hidden in the WebGL journey). */
function ChapterImage({ photo }: { photo: Photo }) {
  const blur = blurFor(photo.src);
  return (
    <div className="ch-img">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="(min-width: 800px) 760px, 100vw"
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur}
        className="object-cover"
      />
    </div>
  );
}

export default function Home() {
  const cb = PHOTOS.casabay;
  const heroBlur = blurFor(cb[0].src);
  return (
    <div className="proto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero: CasaBay at night */}
      <section className="hero" aria-label="CasaBay rooftop restobar">
        {/* Poster stays the LCP image; the parallax transform is on its wrapper. */}
        <div className="hero-bg absolute inset-0 -z-20">
          <Image
            src={cb[0].src}
            alt={cb[0].alt}
            fill
            priority
            sizes="100vw"
            placeholder={heroBlur ? "blur" : "empty"}
            blurDataURL={heroBlur}
            className="object-cover"
            style={{ objectPosition: "center 60%" }}
          />
        </div>
        <HeroParallax />
        <div className="hero-scrim" aria-hidden />
        <HeroEmbers className="-z-10" />
        <div className="hero-copy hero-copy-k">
          <p className="p-eyebrow">Rooftop restobar · Angamaly</p>
          <h1 className="wordmark ignite">
            <CasaBayLogo priority sizes="(min-width: 761px) 640px, 80vw" />
          </h1>
          <p className="tag">Take the evening upstairs.</p>
          <Fact>{open(SITE.hours.casabay)}</Fact>
          <p className="body">
            A rooftop restobar, a multi-cuisine restaurant, a banquet hall for 120, a private board room and ten rooms.
            One address on NH&nbsp;544.
          </p>
          <div className="row">
            <Button href={whatsapp(WA.casabay)} tone="ember">
              <WhatsAppIcon /> Reserve a table
            </Button>
            <Button href="#journey" tone="outline-light">
              See the evening
            </Button>
          </div>
        </div>
        <div className="cue" aria-hidden>
          Scroll
        </div>
      </section>

      {/* 2. Journey */}
      <HomeJourney>
        <article className="chapter" data-ch="0">
          <ChapterImage photo={PHOTOS.fishtown[0]} />
          <p className="numeral">I</p>
          <h2>
            <span className="sr-only">Fish Town</span>
            <Image src="/branding/fishtown-logo-ivory.png" alt="" width={1184} height={678} sizes="190px" className="ft-logo" />
          </h2>
          <p className="tag">{venue("fishtown").line}</p>
          <Fact>{open(SITE.hours.fishtown)}</Fact>
          <p className="body">{venue("fishtown").body}</p>
          <ul className="cuisines">
            {CUISINES.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
          <Button href={whatsapp(WA.fishtown)} tone="outline-light">
            Reserve at Fish Town
          </Button>
        </article>

        <article className="chapter" data-ch="1">
          <ChapterImage photo={PHOTOS.townhall[0]} />
          <p className="numeral">II</p>
          <h2>Town Hall</h2>
          <p className="count">
            <span data-count aria-hidden>
              120
            </span>
            <span className="sr-only">120 guests</span>
          </p>
          <p className="count-label">Guests, at capacity</p>
          <p className="tag">{venue("town-hall").line}</p>
          <Button href={whatsapp(WA.townhall)} tone="outline-light">
            Check a date
          </Button>
        </article>

        <article className="chapter" data-ch="2">
          <ChapterImage photo={PHOTOS.boardroom[0]} />
          <p className="numeral">III</p>
          <h2>The Board Room</h2>
          <p className="tag">{venue("board-room").line}</p>
          <Fact>{SITE.boardRoomSeats ? `Seats ${SITE.boardRoomSeats}` : null}</Fact>
          <p className="body">{venue("board-room").body}</p>
          <Button href={whatsapp(WA.boardroom)} tone="outline-light">
            Book the room
          </Button>
        </article>

        <article className="chapter finale" data-ch="3">
          <ChapterImage photo={cb[1]} />
          <p className="numeral">IV</p>
          <h2 className="casa-mark">
            <CasaBayLogo sizes="(min-width: 761px) 500px, 70vw" />
          </h2>
          <p className="tag">Back on the roof.</p>
          <Fact>{open(SITE.hours.casabay)}</Fact>
          <p className="body">{venue("casabay").body}</p>
          <Button href={whatsapp(WA.casabay)} tone="ember">
            Reserve a table
          </Button>
        </article>
      </HomeJourney>

      {/* 3. Quiet close: Rooms */}
      <section className="close" aria-label="Rooms">
        <figure>
          <Image
            src={PHOTOS.rooms[0].src}
            alt={PHOTOS.rooms[0].alt}
            fill
            sizes="(min-width: 761px) 55vw, 100vw"
            placeholder={blurFor(PHOTOS.rooms[0].src) ? "blur" : "empty"}
            blurDataURL={blurFor(PHOTOS.rooms[0].src)}
            className="object-cover"
          />
        </figure>
        <div>
          <p className="p-eyebrow">Stay</p>
          <h2>For when the evening runs long.</h2>
          <p className="body">
            Ten air-conditioned rooms with a work desk, television, tea station and en-suite shower. The hotel also has{" "}
            {SITE.executiveBar}.
          </p>
          <Button href={whatsapp(WA.rooms)} tone="outline-light">
            Check availability
          </Button>
        </div>
      </section>

      {/* 4. Find us */}
      <section className="find" aria-label="Find us">
        <div>
          <p className="p-eyebrow">Find us</p>
          <h3>{SITE.address.line}</h3>
          <p>
            {SITE.address.region} {SITE.address.pincode}
          </p>
          <p>
            <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer">
              Get directions ↗
            </a>
          </p>
        </div>
        <div>
          <p className="p-eyebrow">Call or WhatsApp</p>
          <p className="phone">{SITE.phone}</p>
          <p>
            <a href={whatsapp(WA.general)} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp ↗
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
