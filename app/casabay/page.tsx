import type { Metadata } from "next";
import Image from "next/image";
import CasaBayLogo from "@/components/CasaBayLogo";
import PageHero from "@/components/PageHero";
import Gallery from "@/components/Gallery";
import { Button, Eyebrow, WhatsAppIcon } from "@/components/ui";
import { PHOTOS, SITE, WA, whatsapp } from "@/content/site";
import SplitText from "@/components/motion/SplitText";

export const metadata: Metadata = {
  title: "CasaBay Rooftop Restobar",
  description:
    "CasaBay is the rooftop restobar at Chettungal New Town Hotel, Angamaly. An open-air deck, a full bar and food from the kitchen. Take the evening upstairs.",
  alternates: { canonical: "/casabay" },
  openGraph: { images: [{ url: PHOTOS.casabay[1].src, width: 1536, height: 1024, alt: PHOTOS.casabay[1].alt }] },
};

const FEATURES = [
  { k: "The deck", v: "Open-air tables under umbrellas and string lights" },
  { k: "The bar", v: "A backlit onyx counter and a full back bar" },
  { k: "The room", v: "Covered dining under wicker lamps and painted murals" },
];

export default function CasaBayPage() {
  const photos = PHOTOS.casabay;
  return (
    <div className="bg-night text-ivory">
      <PageHero image={photos[1].src} alt={photos[1].alt} position="50% 45%" fx="embers" posterPriority={false}>
        <Eyebrow className="text-ember">Rooftop restobar · Chettungal New Town</Eyebrow>
        <h1 className="ignite mt-5">
          <CasaBayLogo preload className="w-[clamp(260px,45vw,620px)]" sizes="clamp(260px, 45vw, 620px)" />
        </h1>
        <p className="mt-4 font-serif text-[clamp(1.75rem,1.4rem+1.5vw,2.75rem)] italic leading-tight">
          Take the evening upstairs.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={whatsapp(WA.casabay)} tone="ember">
            <WhatsAppIcon /> Reserve a table
          </Button>
          <Button href={whatsapp(WA.casabayMenu)} tone="outline-light">
            Ask for the menu
          </Button>
        </div>
      </PageHero>

      <section className="py-24 md:py-36">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <h2 className="statement md:col-span-7" data-reveal>
            Up on the roof, the evening moves at its own pace, from after-work drinks to{" "}
            <em className="text-ember">late conversations.</em>
          </h2>
          <div className="md:col-span-4 md:col-start-9 md:pt-3" data-reveal>
            <p className="text-[1.0625rem] leading-relaxed text-smoke">
              CasaBay is the hotel&apos;s rooftop resto-bar for cocktails, conversation and unhurried evenings. Come
              for the view, stay for the food, and raise a glass to the night.
            </p>
            {SITE.hours.casabay && (
              <div className="mt-8">
                <p className="eyebrow text-smoke">Hours</p>
                <p className="mt-2 text-[0.9375rem] text-ember">Open {SITE.hours.casabay}</p>
              </div>
            )}
          </div>
        </div>

        <div className="container-x mt-20 md:mt-28">
        <dl className="grid gap-px bg-white/10 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <div key={f.k} className="bg-night py-8 md:px-8 md:first:pl-0" data-reveal style={{ ["--reveal-delay" as string]: `${i * 100}ms` }}>
              <dt className="eyebrow text-ember">{f.k}</dt>
              <dd className="mt-3 font-serif text-2xl leading-snug">{f.v}</dd>
            </div>
          ))}
        </dl>
        </div>
      </section>

      {/* Full-bleed band */}
      <section className="relative h-[70svh] min-h-[420px] overflow-hidden" aria-label={photos[0].caption}>
        <Image src={photos[0].src} alt={photos[0].alt} fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-night/80 via-transparent to-night/60" />
        <p className="container-x absolute inset-x-0 bottom-10 text-sm text-ivory/80">{photos[0].caption}</p>
      </section>

      <section className="py-24 md:py-32">
        <div className="container-x">
          <div className="mb-14 flex flex-col justify-between gap-6 md:mb-20 md:flex-row md:items-end">
            <div data-reveal>
              <Eyebrow className="text-ember">After dark</Eyebrow>
              <SplitText className="h2 mt-4">Around the roof</SplitText>
            </div>
            <p className="max-w-sm text-smoke" data-reveal>
              Onyx, lattice and murals under the lamps. Select any photo to see it larger.
            </p>
          </div>
          <Gallery photos={photos.filter((_, i) => i !== 0 && i !== 4)} tone="dark" />
        </div>
      </section>

      {/* Private evenings */}
      <section className="bg-night-2">
        <div className="grid lg:grid-cols-2">
          <div className="flex items-center px-5 py-20 md:px-10 md:py-24 lg:px-16 xl:px-24">
            <div className="max-w-md" data-reveal>
              <Eyebrow className="text-ember">Private evenings</Eyebrow>
              <SplitText className="h2 mt-5">Make the roof yours for a night.</SplitText>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-smoke">
                Birthdays, team nights and small celebrations. Tell us the date and how many are coming, and we&apos;ll
                work out the rest with you.
              </p>
              <Button href={whatsapp(WA.casabayPrivate)} tone="ember" className="mt-10">
                <WhatsAppIcon /> Plan a private evening
              </Button>
            </div>
          </div>
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[600px]">
            <Image src={photos[4].src} alt={photos[4].alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-28 text-center md:py-40">
        <div className="container-x" data-reveal>
          <p>
            {/* Same sizes as the hero logo, so this reuses the hero's download. */}
            <CasaBayLogo className="mx-auto w-[200px] md:w-[260px]" sizes="clamp(260px, 45vw, 620px)" />
          </p>
          <SplitText className="display mx-auto mt-6 max-w-3xl">Take the evening upstairs.</SplitText>
          <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={whatsapp(WA.casabay)} tone="ember">
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
