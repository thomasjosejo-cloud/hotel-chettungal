import type { Metadata } from "next";
import EnquiryForm from "@/components/EnquiryForm";
import PageHero from "@/components/PageHero";
import { Eyebrow, WhatsAppIcon } from "@/components/ui";
import { PHOTOS, SITE, WA, whatsapp } from "@/content/site";

export const metadata: Metadata = {
  title: "Enquire",
  description:
    "Reserve a table at CasaBay or Fish Town, plan an event at Town Hall, book the Board Room or a room at Chettungal New Town Hotel, Angamaly.",
  alternates: { canonical: "/enquire" },
};

export default function EnquirePage() {
  const hero = PHOTOS.location[1];
  return (
    <div className="bg-night text-ivory">
      <PageHero image={hero.src} alt={hero.alt} height="medium">
        <Eyebrow className="text-brass-light">Enquire</Eyebrow>
        <h1 className="display mt-6 max-w-3xl">Tell us what you have in mind.</h1>
      </PageHero>

      <section className="py-20 md:py-32">
        <div className="container-x grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <EnquiryForm />
          </div>

          <aside className="md:col-span-4 md:col-start-9">
            <Eyebrow className="text-brass-light">Prefer to talk?</Eyebrow>
            <ul className="mt-5">
              <li className="border-t border-ivory/15">
                <a href={SITE.phoneHref} className="group block py-5">
                  <span className="eyebrow block text-smoke">Call</span>
                  <span className="mt-1 block font-serif text-3xl transition-colors group-hover:text-brass-light">{SITE.phone}</span>
                </a>
              </li>
              <li className="border-t border-ivory/15">
                <a href={whatsapp(WA.general)} target="_blank" rel="noopener noreferrer" className="group block py-5">
                  <span className="eyebrow flex items-center gap-2 text-smoke">
                    <WhatsAppIcon className="h-3.5 w-3.5" /> WhatsApp
                  </span>
                  <span className="mt-1 block font-serif text-3xl transition-colors group-hover:text-brass-light">Message us</span>
                </a>
              </li>
              {SITE.email && (
                <li className="border-t border-ivory/15">
                  <a href={`mailto:${SITE.email}`} className="group block py-5">
                    <span className="eyebrow block text-smoke">Email</span>
                    {/* One unbreakable token: it must shrink and wrap in this narrow column. */}
                    <span className="mt-1 block font-serif text-xl transition-colors [overflow-wrap:anywhere] group-hover:text-brass-light lg:text-2xl">
                      {SITE.email}
                    </span>
                  </a>
                </li>
              )}
              <li className="border-y border-ivory/15">
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="group block py-5">
                  <span className="eyebrow block text-smoke">Visit</span>
                  <span className="mt-1 block text-[1.0625rem] leading-relaxed transition-colors group-hover:text-brass-light">
                    {SITE.address.line}
                    <br />
                    {SITE.address.region} {SITE.address.pincode} ↗
                  </span>
                </a>
              </li>
            </ul>
          </aside>
        </div>
      </section>
    </div>
  );
}
