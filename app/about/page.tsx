import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import EnquiryBand from "@/components/EnquiryBand";
import { Eyebrow } from "@/components/ui";
import { PHOTOS, SITE, VENUES } from "@/content/site";
import SplitText from "@/components/motion/SplitText";

export const metadata: Metadata = {
  title: "About & Location",
  description:
    "Chettungal New Town Hotel on NH 544, Angamaly, Kerala: CasaBay, Fish Town, Town Hall, the Board Room and ten rooms. Address and directions.",
  alternates: { canonical: "/about" },
  openGraph: { images: [{ url: PHOTOS.location[0].src, width: 1131, height: 942, alt: PHOTOS.location[0].alt }] },
};

export default function AboutPage() {
  const p = PHOTOS.location;
  return (
    <div className="bg-night text-ivory">
      <PageHero image={p[3].src} alt={p[3].alt}>
        <Eyebrow className="text-brass-light">About the hotel</Eyebrow>
        <h1 className="display mt-6 max-w-3xl">
          One address, <em className="text-brass-light">every occasion.</em>
        </h1>
      </PageHero>

      <section className="py-24 md:py-36">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7" data-reveal>
            <p className="statement">
              Chettungal New Town Hotel is an Angamaly address built around food, drink and gathering, with ten
              rooms for the people who come for them.
            </p>
          </div>
          <nav aria-label="The hotel" className="md:col-span-4 md:col-start-9" data-reveal>
            <Eyebrow className="text-brass-light">Under one roof</Eyebrow>
            <ul className="mt-5">
              {VENUES.map((v) => (
                <li key={v.slug} className="border-t border-ivory/15">
                  <Link href={v.href} className="group flex items-baseline justify-between gap-4 py-4">
                    <span className="font-serif text-2xl transition-colors group-hover:text-brass-light">{v.name}</span>
                    <span className="text-sm text-smoke">{v.kind}</span>
                  </Link>
                </li>
              ))}
              <li className="border-y border-ivory/15">
                <Link href="/rooms" className="group flex items-baseline justify-between gap-4 py-4">
                  <span className="font-serif text-2xl transition-colors group-hover:text-brass-light">Rooms</span>
                  <span className="text-sm text-smoke">Ten rooms</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <section className="bg-night-2 py-24 md:py-32" id="location">
        <div className="container-x grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow className="text-brass-light">Find us</Eyebrow>
            <SplitText className="h2 mt-4">On NH 544, in Angamaly.</SplitText>
            <address className="mt-6 not-italic text-[1.0625rem] leading-relaxed text-smoke">
              {SITE.name}
              <br />
              {SITE.address.line}
              <br />
              {SITE.address.region} {SITE.address.pincode}
            </address>
            <div className="mt-9 grid gap-4">
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-arrow justify-self-start text-ivory">
                Open in Google Maps <span aria-hidden>↗</span>
              </a>
              <a href={SITE.phoneHref} className="link-arrow justify-self-start text-ivory">
                Call {SITE.phone}
              </a>
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden bg-night-2 md:col-span-7 md:col-start-6" data-reveal>
            <iframe
              title="Map showing Chettungal New Town Hotel, Angamaly"
              src={SITE.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 h-full w-full border-0 grayscale-[35%]"
            />
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="mb-14 md:mb-20" data-reveal>
            <Eyebrow className="text-brass-light">Arriving</Eyebrow>
            <SplitText className="h2 mt-4">The front of house</SplitText>
          </div>
          <Gallery photos={[p[0], p[1], p[2]]} />
        </div>
      </section>

      <EnquiryBand />
    </div>
  );
}
