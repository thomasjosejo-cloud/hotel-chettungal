import type { Metadata } from "next";
import Image from "next/image";
import HomeJourney from "@/components/home/HomeJourney";
import HeroParallax from "@/components/motion/HeroParallax";
import CasaBayLogo from "@/components/CasaBayLogo";
import PhotoFrame from "@/components/home/PhotoFrame";
import PhotoMarks from "@/components/home/PhotoMarks";
import { byFile, CHAPTER_NAMES, CHAPTER_SETS, ROOMS_SET } from "@/components/home/sets";
import { Button, WhatsAppIcon } from "@/components/ui";
import { PHOTOS, SITE, VENUES, WA, whatsapp } from "@/content/site";
import { blurFor } from "@/content/blur";

// Home page: the approved prototype (docs/prototype-home.html), built in React.
const RECEPTION = byFile(PHOTOS.location, "reception-counter");

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: {
    images: [{ url: RECEPTION.src, width: 1536, height: 1024, alt: "The reception desk at Chettungal New Town Hotel" }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Hotel",
  name: SITE.name,
  url: SITE.url,
  telephone: SITE.phone.replace(/\s/g, ""),
  ...(SITE.email ? { email: SITE.email } : {}),
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

/**
 * A chapter's photos for the static layout (hidden while the WebGL journey
 * runs): the same set as the WebGL frame, first photo showing, swapped
 * instantly by the marks or a sideways swipe; never changes by itself.
 */
function ChapterPhotos({ i }: { i: number }) {
  return (
    <div className="ch-img">
      <PhotoFrame id={`ch${i}`} photos={CHAPTER_SETS[i]} auto={false} sizes="(min-width: 800px) 760px, 100vw" />
    </div>
  );
}

/** Photo marks under a chapter's numeral. */
function Marks({ i }: { i: number }) {
  return <PhotoMarks id={`ch${i}`} count={CHAPTER_SETS[i].length} label={`${CHAPTER_NAMES[i]} photos`} />;
}

export default function Home() {
  const heroBlur = blurFor(RECEPTION.src);
  return (
    <div className="proto">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* 1. Hero: the reception — one address, every occasion */}
      <section className="hero" aria-label={SITE.name}>
        {/* Poster is the LCP image; the parallax transform is on its wrapper.
            The priority slot is spelled `preload` in Next 16, not `priority`. */}
        <div className="hero-bg absolute inset-0 -z-20">
          <Image
            src={RECEPTION.src}
            alt="The reception desk at Chettungal New Town Hotel"
            fill
            preload
            sizes="100vw"
            placeholder={heroBlur ? "blur" : "empty"}
            blurDataURL={heroBlur}
            className="object-cover"
            style={{ objectPosition: "center 55%" }}
          />
        </div>
        <HeroParallax />
        <div className="hero-scrim" aria-hidden />
        <div className="hero-copy hero-copy-k">
          <p className="p-eyebrow">NH&nbsp;544 · Angamaly</p>
          <h1 className="house">
            <span className="house-top">{SITE.house}</span>{" "}
            <span className="house-name">New Town Hotel</span>
          </h1>
          <p className="tag">One address, every occasion.</p>
          <p className="body">
            A rooftop restobar, a multi-cuisine restaurant, a banquet hall for 120, a private board room and ten rooms.
            One address on NH&nbsp;544.
          </p>
          <div className="row">
            <Button href={whatsapp(WA.general)}>
              <WhatsAppIcon /> WhatsApp us
            </Button>
            <Button href="#journey" tone="outline-light">
              See the evening
            </Button>
          </div>
        </div>
      </section>

      {/* 2. Journey */}
      <HomeJourney>
        <article className="chapter finale" data-ch="0">
          <ChapterPhotos i={0} />
          <p className="numeral">I</p>
          <Marks i={0} />
          <h2 className="casa-mark">
            <CasaBayLogo sizes="clamp(290px, 46vw, 640px)" />
          </h2>
          <p className="tag">Take the evening upstairs.</p>
          <Fact>{open(SITE.hours.casabay)}</Fact>
          <p className="body">{venue("casabay").body}</p>
          <Button href={whatsapp(WA.casabay)} tone="ember">
            Reserve a table
          </Button>
        </article>

        <article className="chapter" data-ch="1">
          <ChapterPhotos i={1} />
          <p className="numeral">II</p>
          <Marks i={1} />
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

        <article className="chapter" data-ch="2">
          <ChapterPhotos i={2} />
          <p className="numeral">III</p>
          <Marks i={2} />
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

        <article className="chapter" data-ch="3">
          <ChapterPhotos i={3} />
          <p className="numeral">IV</p>
          <Marks i={3} />
          <h2>The Board Room</h2>
          <p className="tag">{venue("board-room").line}</p>
          <Fact>{SITE.boardRoomSeats ? `Seats ${SITE.boardRoomSeats}` : null}</Fact>
          <p className="body">{venue("board-room").body}</p>
          <Button href={whatsapp(WA.boardroom)} tone="outline-light">
            Book the room
          </Button>
        </article>
      </HomeJourney>

      {/* 3. Quiet close: Rooms */}
      <section className="close" aria-label="Rooms">
        <div>
          <figure>
            <PhotoFrame id="rooms" photos={ROOMS_SET} auto sizes="(min-width: 761px) 55vw, 100vw" />
          </figure>
          <PhotoMarks id="rooms" count={ROOMS_SET.length} label="Room photos" />
        </div>
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
