import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import { Button, Eyebrow, WhatsAppIcon } from "@/components/ui";
import { PHOTOS, SITE, WA, whatsapp } from "@/content/site";
import SplitText from "@/components/motion/SplitText";

export const metadata: Metadata = {
  title: "Fish Town Restaurant",
  description:
    "Fish Town is the multi-cuisine restaurant at Chettungal New Town Hotel, Angamaly. Kerala seafood, North Indian, Chinese and Continental. Fresh catch, local soul.",
  alternates: { canonical: "/fishtown" },
  openGraph: { images: [{ url: PHOTOS.fishtown[0].src, width: 1536, height: 1024, alt: PHOTOS.fishtown[0].alt }] },
};

const KITCHEN = [
  { n: "I", t: "Kerala & seafood", d: "Fish at the centre of the menu, cooked the way Kerala likes it." },
  { n: "II", t: "North Indian", d: "Curries, breads and grills for the whole table to share." },
  { n: "III", t: "Chinese", d: "Indo-Chinese favourites, hot from the wok." },
  { n: "IV", t: "Continental", d: "Lighter plates and familiar classics." },
];

export default function FishTownPage() {
  const p = PHOTOS.fishtown;
  const occasions = [
    { t: "Family tables", d: "Long tables that seat everyone together.", img: p[2] },
    { t: "Business lunches", d: "Tables for four, away from the rush.", img: p[3] },
    { t: "Quieter corners", d: "Booths for a slower meal.", img: p[4] },
  ];

  return (
    <div className="bg-night text-ivory">
      <PageHero image={p[0].src} alt={p[0].alt} fx="wave">
        <Eyebrow className="text-brass-light">Multi-cuisine restaurant · Chettungal New Town</Eyebrow>
        <h1 className="mt-8">
          <span className="sr-only">Fish Town</span>
          <Image
            src="/branding/fishtown-logo-ivory.png"
            alt=""
            width={1184}
            height={678}
            priority
            className="h-auto w-[min(72vw,360px)]"
          />
        </h1>
        <p className="mt-8 font-serif text-[clamp(1.75rem,1.4rem+1.5vw,2.75rem)] italic leading-tight">
          Fresh catch. Local soul.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsapp(WA.fishtown)}>
            <WhatsAppIcon /> Reserve a table
          </Button>
          <Button href={whatsapp(WA.fishtownMenu)} tone="outline-light">
            Ask for the menu
          </Button>
        </div>
      </PageHero>

      <section className="py-24 md:py-36">
        <div className="container-x grid gap-10 md:grid-cols-12">
          <Eyebrow className="text-brass-light md:col-span-3 md:pt-3">The restaurant</Eyebrow>
          <div className="md:col-span-9">
            <p className="statement" data-reveal>
              The food Kerala knows best: fresh fish, generous portions and familiar spices, served in a room lit by
              its <em className="text-brass-light">glowing wave walls.</em>
            </p>
            <p className="mt-8 max-w-2xl text-[1.0625rem] leading-relaxed text-ivory/70" data-reveal>
              From a quick lunch to a business meal or a table full of family and friends, Fish Town is the
              hotel&apos;s everyday kitchen.
            </p>
            {SITE.hours.fishtown && (
              <div className="mt-8">
                <p className="eyebrow text-smoke">Hours</p>
                <p className="mt-2 text-[0.9375rem] text-brass-light">Open {SITE.hours.fishtown}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Kitchen */}
      <section className="bg-night-2 py-24 text-ivory md:py-32">
        <div className="container-x">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end" data-reveal>
            <div>
              <Eyebrow className="text-brass-light">The kitchen</Eyebrow>
              <SplitText className="h2 mt-4">Four cuisines, one kitchen.</SplitText>
            </div>
            <a href={whatsapp(WA.fishtownMenu)} target="_blank" rel="noopener noreferrer" className="link-arrow self-start text-ivory md:self-auto">
              Get the menu on WhatsApp <span aria-hidden>↗</span>
            </a>
          </div>
          <ol className="mt-16 grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
            {KITCHEN.map((k, i) => (
              <li key={k.t} className="bg-night-2 py-8 sm:px-8 lg:first:pl-0" data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}>
                <span className="font-serif text-lg italic text-brass-light">{k.n}</span>
                <h3 className="h3 mt-5">{k.t}</h3>
                <p className="mt-3 leading-relaxed text-ivory/70">{k.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Occasions */}
      <section className="py-24 md:py-32">
        <div className="container-x">
          <div data-reveal>
            <Eyebrow className="text-brass-light">At the table</Eyebrow>
            <SplitText className="h2 mt-4 max-w-2xl">A table for every kind of meal.</SplitText>
          </div>
          <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
            {occasions.map((o, i) => (
              <li key={o.t} data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Image src={o.img.src} alt={o.img.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <h3 className="h3 mt-6">{o.t}</h3>
                <p className="mt-2 text-ivory/70">{o.d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-night-2 py-24 md:py-32">
        <div className="container-x">
          <div className="mb-14 md:mb-20" data-reveal>
            <Eyebrow className="text-brass-light">The room</Eyebrow>
            <SplitText className="h2 mt-4">Inside Fish Town</SplitText>
          </div>
          <Gallery photos={[p[1], p[5], p[6], p[7], p[0], p[2]]} />
        </div>
      </section>

      <section className="bg-night-2 py-24 text-ivory md:py-32">
        <div className="container-x grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7" data-reveal>
            <Image src="/branding/fishtown-logo-ivory.png" alt="Fish Town" width={1184} height={678} className="h-auto w-40" />
            <SplitText className="display mt-10">Come hungry.</SplitText>
          </div>
          <div className="flex flex-col gap-3 md:col-span-4 md:col-start-9" data-reveal>
            <Button href={whatsapp(WA.fishtown)}>
              <WhatsAppIcon /> Reserve a table
            </Button>
            <Button href={SITE.phoneHref} tone="outline-light">
              Call {SITE.phone}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
