import Image from "next/image";

/**
 * The CasaBay logo (supplied by the property; transparent WebP, 1600×496).
 * Put it inside the heading element so the heading's accessible name is "CasaBay".
 *
 * On the two CasaBay heroes (/ and /casabay) the logo is the LCP element (Chrome
 * ignores the dark night photo), so it takes the priority slot there: `preload`
 * adds a high-priority preload at exactly the size it renders, via `sizes`
 * matching the CSS width.
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
  return (
    <Image
      src="/branding/casabay-logo.webp"
      alt="CasaBay"
      width={1600}
      height={496}
      sizes={sizes}
      preload={preload}
      fetchPriority={preload ? "high" : undefined}
      className={`casa-logo h-auto ${className}`}
    />
  );
}
