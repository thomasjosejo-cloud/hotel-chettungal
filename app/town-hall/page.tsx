import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import CountUp from "@/components/motion/CountUp";
import Gallery from "@/components/Gallery";
import EnquiryForm from "@/components/EnquiryForm";
import { Button, Eyebrow, WhatsAppIcon } from "@/components/ui";
import { PHOTOS, SITE, WA, whatsapp } from "@/content/site";
import SplitText from "@/components/motion/SplitText";

export const metadata: Metadata = {
  title: "Town Hall Banquet Hall",
  description:
    "Town Hall at Chettungal New Town Hotel, Angamaly: a banquet hall for up to 120 guests with a stage, podium and buffet space, for weddings and conferences.",
  alternates: { canonical: "/town-hall" },
  openGraph: { images: [{ url: PHOTOS.townhall[0].src, width: 1536, height: 1024, alt: PHOTOS.townhall[0].alt }] },
};

const OCCASIONS = [
  { t: "Weddings & receptions", d: "The ceremony stage, the head table and room for the whole family." },
  { t: "Engagements & family occasions", d: "Birthdays, anniversaries and the gatherings in between." },
  { t: "Conferences & seminars", d: "Theatre-style rows facing the stage and podium." },
  { t: "Corporate events", d: "Launches, awards nights and annual meetings." },
];

const ROOM = [
  { k: "Stage & podium", v: "A raised, carpeted stage with a podium and head-table seating." },
  { k: "Buffet line", v: "Space for buffet counters inside the hall." },
  { k: "Lounge corner", v: "Sofa seating for elders and guests of honour." },
];

export default function TownHallPage() {
  const p = PHOTOS.townhall;
  return (
    <div className="bg-night text-ivory">
      <PageHero image={p[0].src} alt={p[0].alt}>
        <Eyebrow className="text-brass-light">Banquet hall · Chettungal New Town</Eyebrow>
        <h1 className="display mt-6">Town Hall</h1>
        <p className="mt-4 font-serif text-[clamp(1.75rem,1.4rem+1.5vw,2.75rem)] italic leading-tight">
          Where the whole guest list fits.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="#enquire">Check a date</Button>
          <Button href={whatsapp(WA.townhall)} tone="outline-light">
            <WhatsAppIcon /> WhatsApp the team
          </Button>
        </div>
      </PageHero>

      <section className="py-24 md:py-36">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5" data-reveal>
            <p
              className="font-serif text-[clamp(7rem,5rem+9vw,13rem)] leading-[0.8] text-brass-light"
              // Lining + tabular figures: Cormorant's default old-style 7 drops below the line.
              style={{ fontVariantNumeric: "lining-nums tabular-nums", fontFeatureSettings: '"lnum" 1, "tnum" 1' }}
            >
              <CountUp to={120} />
            </p>
            <p className="eyebrow mt-6 text-smoke">Guests, at capacity</p>
          </div>
          <div className="md:col-span-6 md:col-start-7" data-reveal>
            <SplitText className="h2">The hotel&apos;s largest room.</SplitText>
            <p className="mt-6 text-[1.0625rem] leading-relaxed text-smoke">
              Town Hall is laid out to suit the occasion, from rows facing the stage to a room built around a buffet.
              Tell us the date and the numbers, and we&apos;ll plan the layout with you.
            </p>
            <dl className="mt-12 grid gap-8">
              {ROOM.map((r) => (
                <div key={r.k} className="grid gap-2 border-t border-ivory/15 pt-6 sm:grid-cols-[10rem_1fr]">
                  <dt className="eyebrow text-brass-light">{r.k}</dt>
                  <dd className="text-[1.0625rem] text-ivory">{r.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-night-2 py-24 md:py-32">
        <div className="container-x">
          <div data-reveal>
            <Eyebrow className="text-brass-light">Occasions</Eyebrow>
            <SplitText className="h2 mt-4 max-w-2xl">What Town Hall is for.</SplitText>
          </div>
          <ol className="mt-14 grid gap-px bg-ivory/15 md:grid-cols-2">
            {OCCASIONS.map((o, i) => (
              <li key={o.t} className="flex gap-6 bg-night-2 py-8 md:px-8 md:odd:pl-0" data-reveal style={{ ["--reveal-delay" as string]: `${i * 80}ms` }}>
                <span className="w-8 shrink-0 pt-1.5 font-serif text-lg italic text-brass-light">{["I", "II", "III", "IV"][i]}</span>
                <div>
                  <h3 className="h3">{o.t}</h3>
                  <p className="mt-2 text-smoke">{o.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="mb-14 md:mb-20" data-reveal>
            <Eyebrow className="text-brass-light">The hall</Eyebrow>
            <SplitText className="h2 mt-4">Inside Town Hall</SplitText>
          </div>
          <Gallery photos={p} />
        </div>
      </section>

      <section id="enquire" className="scroll-mt-20 bg-night-2 py-24 text-ivory md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow className="text-brass-light">Enquire</Eyebrow>
            <SplitText className="h2 mt-4">Check a date for Town Hall.</SplitText>
            <p className="mt-6 text-smoke">
              Or call the team on{" "}
              <a href={SITE.phoneHref} className="tap-line text-ivory underline underline-offset-4">
                {SITE.phone}
              </a>
              .
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <EnquiryForm defaultPurpose="An event at Town Hall" lockPurpose tone="dark" />
          </div>
        </div>
      </section>
    </div>
  );
}
