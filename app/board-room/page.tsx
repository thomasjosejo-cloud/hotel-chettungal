import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import EnquiryForm from "@/components/EnquiryForm";
import { Button, Eyebrow, WhatsAppIcon } from "@/components/ui";
import { PHOTOS, SITE, WA, whatsapp } from "@/content/site";
import SplitText from "@/components/motion/SplitText";

export const metadata: Metadata = {
  title: "The Board Room",
  description:
    "A private board room at Chettungal New Town Hotel, Angamaly, for board meetings, interviews, client presentations and training.",
  alternates: { canonical: "/board-room" },
  openGraph: { images: [{ url: PHOTOS.boardroom[0].src, width: 1536, height: 1024, alt: PHOTOS.boardroom[0].alt }] },
};

const USES = ["Board meetings", "Interviews and panels", "Client presentations", "Training sessions"];

export default function BoardRoomPage() {
  const p = PHOTOS.boardroom;
  const facts = [
    SITE.boardRoomSeats ? `Seats ${SITE.boardRoomSeats}` : null,
    "One long boardroom table",
    "Executive high-back chairs",
    "Air-conditioned, behind a closed door",
    "High-speed Wi-Fi",
    "100% DG power backup",
  ].filter(Boolean) as string[];

  return (
    <div className="bg-night text-ivory">
      <PageHero image={p[0].src} alt={p[0].alt} position="50% 65%">
        <Eyebrow className="text-brass-light">
          Private meeting room · {SITE.boardRoomSeats ? `Seats ${SITE.boardRoomSeats}` : SITE.shortName}
        </Eyebrow>
        <h1 className="display mt-6">The Board Room</h1>
        <p className="mt-4 font-serif text-[clamp(1.75rem,1.4rem+1.5vw,2.75rem)] italic leading-tight">
          A room built for focus.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href="#enquire">Check availability</Button>
          <Button href={whatsapp(WA.boardroom)} tone="outline-light">
            <WhatsAppIcon /> WhatsApp
          </Button>
        </div>
      </PageHero>

      <section className="py-24 md:py-32">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-6" data-reveal>
            <h2 className="statement">
              A dedicated meeting room, <em className="text-brass-light">not a converted corner.</em>
            </h2>
            <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-smoke">
              Quiet, private and ready for the kind of meeting that needs a closed door.
            </p>
          </div>
          <div className="grid gap-12 sm:grid-cols-2 md:col-span-5 md:col-start-8" data-reveal>
            <div>
              <Eyebrow className="text-brass-light">The room</Eyebrow>
              <ul className="mt-5 grid gap-3">
                {facts.map((f) => (
                  <li key={f} className="border-t border-ivory/15 pt-3">
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow className="text-brass-light">Booked for</Eyebrow>
              <ul className="mt-5 grid gap-3">
                {USES.map((u) => (
                  <li key={u} className="border-t border-ivory/15 pt-3">
                    {u}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-x">
          <Gallery photos={[p[1], p[2], p[3]]} />
        </div>
      </section>

      <section className="bg-night-2 py-24 md:py-32">
        <div className="container-x">
          <div data-reveal>
            <Eyebrow className="text-brass-light">Make a day of it</Eyebrow>
            <SplitText className="h2 mt-4 max-w-2xl">Everything else is under the same roof.</SplitText>
          </div>
          <ul className="mt-14 grid gap-px bg-ivory/15 md:grid-cols-3">
            {[
              { t: "Lunch at Fish Town", d: "Break for a proper meal without leaving the building.", h: "/fishtown" },
              { t: "Rooms for the team", d: "Ten rooms for anyone staying the night.", h: "/rooms" },
              { t: "Bigger group?", d: "Town Hall seats up to 120.", h: "/town-hall" },
            ].map((x) => (
              <li key={x.t} className="bg-night-2 py-8 md:px-8 md:first:pl-0" data-reveal>
                <h3 className="h3">{x.t}</h3>
                <p className="mt-2 text-smoke">{x.d}</p>
                <Link href={x.h} className="link-arrow mt-6 text-ivory">
                  See more <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="enquire" className="scroll-mt-20 bg-night-2 py-24 text-ivory md:py-32">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow className="text-brass-light">Enquire</Eyebrow>
            <SplitText className="h2 mt-4">Book the Board Room.</SplitText>
            <p className="mt-6 text-smoke">
              Or call{" "}
              <a href={SITE.phoneHref} className="tap-line text-ivory underline underline-offset-4">
                {SITE.phone}
              </a>
              .
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <EnquiryForm defaultPurpose="The Board Room" lockPurpose tone="dark" />
          </div>
        </div>
      </section>
    </div>
  );
}
