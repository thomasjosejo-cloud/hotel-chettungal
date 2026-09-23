import Link from "next/link";
import Image from "next/image";
import { NAV, SITE, WA, whatsapp } from "@/content/site";

// 44px touch target on phones and tablets via padding; original rhythm from lg up
const LINK = "inline-flex min-h-11 items-center py-2.5 text-ivory/85 transition-colors hover:text-brass-light lg:min-h-0 lg:py-0";

export default function Footer() {
  return (
    <footer className="bg-night pb-28 pt-20 text-ivory md:pb-12">
      <div className="container-x">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/branding/chettungal_crest_gold.png" alt="" width={344} height={260} className="h-12 w-auto" />
            <p className="mt-6 font-serif text-[2rem] leading-tight">
              The table, the roof,
              <br />
              <em className="text-brass-light">the hall.</em>
            </p>
            <p className="mt-5 max-w-sm text-smoke">
              A rooftop restobar, a multi-cuisine restaurant, a banquet hall and ten rooms at one address in Angamaly.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow text-brass-light">The hotel</p>
            <ul className="mt-3 grid lg:mt-5 lg:gap-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className={LINK}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/enquire" className={LINK}>
                  Enquire
                </Link>
              </li>
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="eyebrow text-brass-light">Find us</p>
            <address className="mt-5 not-italic leading-relaxed text-ivory/85">
              {SITE.name}
              <br />
              {SITE.address.line}
              <br />
              {SITE.address.region} {SITE.address.pincode}
            </address>
            {(SITE.hours.casabay || SITE.hours.fishtown) && (
              <dl className="mt-5 grid gap-1 leading-relaxed text-ivory/85">
                {SITE.hours.casabay && (
                  <div>
                    <dt className="inline">CasaBay</dt> <dd className="inline text-smoke">{SITE.hours.casabay}</dd>
                  </div>
                )}
                {SITE.hours.fishtown && (
                  <div>
                    <dt className="inline">Fish Town</dt> <dd className="inline text-smoke">{SITE.hours.fishtown}</dd>
                  </div>
                )}
              </dl>
            )}
            <div className="mt-4 grid justify-items-start lg:mt-6 lg:gap-3">
              <a href={SITE.phoneHref} className={LINK}>
                {SITE.phone}
              </a>
              <a
                href={whatsapp(WA.general)}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                WhatsApp us
              </a>
              {SITE.email && (
                <a href={`mailto:${SITE.email}`} className={LINK}>
                  {SITE.email}
                </a>
              )}
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={LINK}
              >
                Directions ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-smoke sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>Angamaly, Kerala</p>
        </div>
      </div>
    </footer>
  );
}
