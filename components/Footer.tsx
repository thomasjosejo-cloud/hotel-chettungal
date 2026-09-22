import Link from "next/link";
import Image from "next/image";
import { NAV, SITE, WA, whatsapp } from "@/content/site";

export default function Footer() {
  return (
    <footer className="bg-ink pb-28 pt-20 text-ivory md:pb-12">
      <div className="container-x">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Image src="/branding/chettungal_crest_gold.png" alt="" width={344} height={260} className="h-12 w-auto" />
            <p className="mt-6 font-serif text-[2rem] leading-tight">
              The table, the roof,
              <br />
              <em className="text-brass-light">the hall.</em>
            </p>
            <p className="mt-5 max-w-sm text-mist">
              A rooftop restobar, a multi-cuisine restaurant, a banquet hall and ten rooms at one address in Angamaly.
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="eyebrow text-brass-light">The hotel</p>
            <ul className="mt-5 grid gap-3">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="text-ivory/85 transition-colors hover:text-brass-light">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/enquire" className="text-ivory/85 transition-colors hover:text-brass-light">
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
            <div className="mt-6 grid gap-3">
              <a href={SITE.phoneHref} className="text-ivory/85 transition-colors hover:text-brass-light">
                {SITE.phone}
              </a>
              <a
                href={whatsapp(WA.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/85 transition-colors hover:text-brass-light"
              >
                WhatsApp us
              </a>
              {SITE.email && (
                <a href={`mailto:${SITE.email}`} className="text-ivory/85 transition-colors hover:text-brass-light">
                  {SITE.email}
                </a>
              )}
              <a
                href={SITE.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory/85 transition-colors hover:text-brass-light"
              >
                Directions ↗
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-8 text-sm text-mist sm:flex-row sm:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}</p>
          <p>Angamaly, Kerala</p>
        </div>
      </div>
    </footer>
  );
}
