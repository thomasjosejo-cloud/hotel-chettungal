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
 * srcset of the full file. On the two CasaBay heroes (/ and /casabay) the logo is
 * the LCP element (Chrome ignores the dark night photo), so `preload` gives it
 * the priority slot: one high-priority preload per screen width, matching what
 * the <picture> will pick, so each device downloads exactly one logo file.
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
      {preload && (
        <>
          {/* React hoists these into <head>. */}
          <link rel="preload" as="image" href={LOGO_SM} media={PHONE} fetchPriority="high" />
          <link rel="preload" as="image" imageSrcSet={srcSet} imageSizes={sizes} media={WIDE} fetchPriority="high" />
        </>
      )}
      <picture>
        <source media={PHONE} srcSet={`${LOGO_SM} 700w`} sizes={sizes} />
        <source media={WIDE} srcSet={srcSet} sizes={sizes} />
        <img {...img} alt="CasaBay" loading={preload ? "eager" : "lazy"} className={`casa-logo h-auto ${className}`} />
      </picture>
    </>
  );
}
