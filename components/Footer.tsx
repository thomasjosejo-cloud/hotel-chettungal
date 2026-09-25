import { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import { WhatsAppIcon } from "@/components/ui";
import { NAV, SITE, WA, whatsapp } from "@/content/site";

/** Everywhere to go, minus Home: the header and the dock carry that. */
const EXPLORE = NAV.filter((n) => n.href !== "/");

function Visit() {
  return (
    <div className="ftr-col">
      <h2>Visit</h2>
      <p>
        {SITE.address.line}
        <br />
        {SITE.address.region} {SITE.address.pincode}
      </p>
      <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="ftr-go">
        Directions <span aria-hidden>↗</span>
      </a>
    </div>
  );
}

function Hours() {
  return (
    <div className="ftr-col">
      <h2>Hours</h2>
      {/* The hours the property confirmed, with no days attached. */}
      <dl className="ftr-hours">
        {SITE.hours.casabay && (
          <>
            <dt>CasaBay</dt>
            <dd>{SITE.hours.casabay}</dd>
          </>
        )}
        {SITE.hours.fishtown && (
          <>
            <dt>Fish Town</dt>
            <dd>{SITE.hours.fishtown}</dd>
          </>
        )}
      </dl>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="ftr-inner">
        <div>
          {/* The house in brass, the hotel in ivory: the header's pairing. */}
          <p className="ftr-mark">
            <b>{SITE.house}</b>&nbsp; New Town Hotel
          </p>
          <p className="ftr-line">
            The table, the roof, <i>the hall.</i>
          </p>
          {/* Desktop only: on a phone the dock already carries both of these. */}
          <div className="ftr-pills">
            <a href={whatsapp(WA.general)} target="_blank" rel="noopener noreferrer" className="ftr-pill ftr-pill-solid">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={SITE.phoneHref} className="ftr-pill">
              Call {SITE.phone}
            </a>
          </div>
        </div>

        {/* Direct children of the grid: on a phone they centre and fall into the
            study's order; on desktop the email auto-places under the pills. */}
        <div className="ftr-rule" aria-hidden />

        <div className="ftr-cols">
          <Visit />
          <Hours />
          {/* The third column appears from 761px; below that the links stand alone. */}
          <div className="ftr-col ftr-explore-col">
            <h2>Explore</h2>
            <nav className="ftr-explore" aria-label="Explore">
              {EXPLORE.map((n) => (
                <Link key={n.href} href={n.href}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Phones: the same six links, dotted, as two rows of three. */}
        <nav className="ftr-links" aria-label="Explore">
          {EXPLORE.map((n, i) => (
            <Fragment key={n.href}>
              {i > 0 && i !== 3 && <i aria-hidden>·</i>}
              <Link href={n.href}>{n.label}</Link>
            </Fragment>
          ))}
        </nav>

        {SITE.email && (
          <a href={`mailto:${SITE.email}`} className="ftr-mail">
            {SITE.email}
          </a>
        )}
      </div>

      <div className="ftr-wm" aria-hidden>
        <span>{SITE.house.toUpperCase()}</span>
      </div>

      <div className="ftr-strip">
        <div className="ftr-strip-inner">
        <span>
          © {new Date().getFullYear()} {SITE.name}
        </span>
        <a
          href="https://www.thehostory.in"
          target="_blank"
          rel="noopener"
          title="HOSTORY — Hospitality, Reimagined."
          className="ftr-credit"
        >
          Crafted by
          <Image
            src="/branding/hostory-compact-dark.png"
            alt="HOSTORY — Hospitality, Reimagined."
            width={360}
            height={84}
            sizes="(max-width: 760px) 118px, 138px"
            loading="lazy"
          />
        </a>
        </div>
      </div>
    </footer>
  );
}
