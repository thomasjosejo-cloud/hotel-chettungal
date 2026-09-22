import Image from "next/image";
import type { ReactNode } from "react";

/**
 * Full-bleed photographic hero. Copy sits low and left (editorial), never a
 * centred stack. `tint` sets the colour the image fades into at the bottom so
 * each sub-brand hands off into its own page ground.
 */
export default function PageHero({
  image,
  alt,
  tint = "charcoal",
  height = "tall",
  position = "center",
  children,
}: {
  image: string;
  alt: string;
  tint?: "charcoal" | "night" | "navy";
  height?: "tall" | "medium";
  position?: string;
  children: ReactNode;
}) {
  const fade = {
    charcoal: "from-charcoal via-charcoal/45",
    night: "from-night via-night/50",
    navy: "from-navy via-navy/45",
  }[tint];

  return (
    <section
      className={`relative isolate flex items-end overflow-hidden text-ivory ${
        height === "tall" ? "min-h-[100svh]" : "min-h-[78svh]"
      }`}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={image}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="ken-burns object-cover"
          style={{ objectPosition: position }}
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${fade} to-transparent`} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
      </div>
      <div className="container-x relative pb-28 pt-36 md:pb-20 md:pt-40 lg:pb-24">{children}</div>
    </section>
  );
}
