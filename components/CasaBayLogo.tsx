import { getImageProps } from "next/image";

const LOGO = { src: "/branding/casabay-logo.webp", width: 1600, height: 496 };
// Phone weight: 700px wide, quality 70, exported from the file above.
const LOGO_SM = "/branding/casabay-logo-sm.webp";
const PHONE = "(max-width: 760px)";
const WIDE = "(min-width: 761px)";

/**
 * The CasaBay logo (supplied by the property; transparent WebP, 1600×496).
 * Put it inside the heading element so the heading's accessible name is "CasaBay".
 *
 * Below 761px it serves a lighter 700px file; wider screens get the optimised
 * srcset of the full file. On the CasaBay heroes the logo is the LCP element
 * (Chrome ignores the dark night photo), so `preload` marks it high priority
 * and eager; the browser's preload scanner finds it in the initial HTML.
 *
 * It deliberately does NOT emit a <link rel="preload">. React hoists those into
 * the document, and Next prefetches /casabay from the nav on every page, which
 * applied the hint everywhere and had phones downloading the logo on pages that
 * never show it.
 */
export default function CasaBayLogo({
  className = "",
  sizes,
  preload = false,
}: {
  className?: string;
  /** Must match the rendered CSS width so the preload and <img> pick the same file. */
  sizes: string;
  preload?: boolean;
}) {
  const { props } = getImageProps({ ...LOGO, alt: "CasaBay", sizes, fetchPriority: preload ? "high" : undefined });
  const { srcSet, ...img } = props;

  return (
    <>
      <picture>
        <source media={PHONE} srcSet={`${LOGO_SM} 700w`} sizes={sizes} />
        <source media={WIDE} srcSet={srcSet} sizes={sizes} />
        <img {...img} alt="CasaBay" loading={preload ? "eager" : "lazy"} className={`casa-logo h-auto ${className}`} />
      </picture>
    </>
  );
}
