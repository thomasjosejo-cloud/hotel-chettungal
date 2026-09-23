import Image from "next/image";

/**
 * The CasaBay logo (supplied by the property; transparent WebP, 1600×496).
 * Put it inside the heading element so the heading's accessible name is "CasaBay".
 */
export default function CasaBayLogo({
  className = "",
  sizes = "(min-width: 761px) 640px, 80vw",
  priority = false,
}: {
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/branding/casabay-logo.webp"
      alt="CasaBay"
      width={1600}
      height={496}
      sizes={sizes}
      priority={priority}
      className={`casa-logo h-auto ${className}`}
    />
  );
}
