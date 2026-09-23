import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import EnquiryForm from "@/components/EnquiryForm";
import { Button, Eyebrow, WhatsAppIcon } from "@/components/ui";
import { PHOTOS, SITE, WA, whatsapp } from "@/content/site";
import SplitText from "@/components/motion/SplitText";

export const metadata: Metadata = {
  title: "Rooms",
  description:
    "Ten air-conditioned rooms at Hotel New Town by Chettungal on NH 544, Angamaly, booked directly by phone or WhatsApp.",
  alternates: { canonical: "/rooms" },
  openGraph: { images: [{ url: PHOTOS.rooms[0].src, width: 1448, height: 1086, alt: PHOTOS.rooms[0].alt }] },
};

const IN_ROOM = [
  "Double bed with a carved headboard",
  "Air-conditioning",
  "Work desk and chair",
  "Television",
  "Kettle and tea station",
  "Wardrobe",
  "En-suite bathroom with walk-in shower",
];

export default function RoomsPage() {
  const p = PHOTOS.rooms;
  return (
    <div className="bg-night text-ivory">
      <PageHero image={p[0].src} alt={p[0].alt}>
        <Eyebrow className="text-brass-light">Stay · Hotel New Town</Eyebrow>
        <h1 className="display mt-6">Ten rooms.</h1>
        <p className="mt-4 font-serif text-[clamp(1.75rem,1.4rem+1.5vw,2.75rem)] italic leading-tight">
          Each built for a proper night&apos;s rest.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsapp(WA.rooms)}>
            <WhatsAppIcon /> Check availability
          </Button>
          <Button href={SITE.phoneHref} tone="outline-light">
            Call {SITE.phone}
          </Button>
        </div>
      </PageHero>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6" data-reveal>
            <p className="statement">
              A small hotel on purpose. Ten rooms for wedding guests, visiting teams and{" "}
              <em className="text-brass-light">anyone who stayed for one more at CasaBay.</em>
            </p>
          </div>
          <div className="md:col-span-5 md:col-start-8" data-reveal>
            <Eyebrow className="text-brass-light">In the rooms</Eyebrow>
            <ul className="mt-5 grid gap-3">
              {IN_ROOM.map((f) => (
                <li key={f} className="border-t border-ivory/15 pt-3 text-[1.0625rem]">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <Gallery photos={p} />
        </div>
      </section>

      <section className="bg-night py-24 text-ivory md:py-32">
        <div className="container-x grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7" data-reveal>
            <Eyebrow className="text-brass-light">Also in the hotel</Eyebrow>
            <SplitText className="h2 mt-4">The Executive Bar.</SplitText>
          </div>
          <p className="text-[1.0625rem] leading-relaxed text-smoke md:col-span-4 md:col-start-9" data-reveal>
            A second bar inside the hotel, alongside CasaBay on the roof and Fish Town for meals.
          </p>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-20 bg-night-2 py-24 text-ivory md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow className="text-brass-light">Book direct</Eyebrow>
            <SplitText className="h2 mt-4">Rooms are booked with the front desk.</SplitText>
            <p className="mt-6 text-smoke">
              Send your dates here, WhatsApp us, or call{" "}
              <a href={SITE.phoneHref} className="text-ivory underline underline-offset-4">
                {SITE.phone}
              </a>
              .
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <EnquiryForm defaultPurpose="A room stay" lockPurpose tone="dark" />
          </div>
        </div>
      </section>
    </div>
  );
}
