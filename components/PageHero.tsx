import Image from "next/image";
import type { ReactNode } from "react";
import HeroFx from "@/components/HeroFx";
import HeroEmbers from "@/components/motion/HeroEmbers";
import HeroParallax from "@/components/motion/HeroParallax";
import { blurFor } from "@/content/blur";

/** "50% 60%" / "center" -> [0.5, 0.6] for the WebGL plane's object-position. */
function toXY(position: string): [number, number] {
  const [x = "50%", y = x] = position.replace(/center/g, "50%").split(/\s+/);
  return [parseFloat(x) / 100, parseFloat(y) / 100];
}

/**
 * Full-bleed photographic hero on the night ground. Copy sits low and left
 * (editorial), never a centred stack. The section paints the dark ground and
 * a blurred preview on first paint, so there is no light flash while the
 * poster loads. The poster is always the LCP element; after load, HeroFx fades
 * a WebGL copy of it in on top (mouse tilt, scroll-out fade).
 *
 * `fx`: "embers" adds the CasaBay ember canvas, "wave" the Fish Town
 * wave-wall glow.
 */
export default function PageHero({
  image,
  alt,
  height = "tall",
  position = "center",
  fx,
  posterPriority = true,
  children,
}: {
  image: string;
  alt: string;
  /** Kept for existing call sites; every hero now sits on the one night ground. */
  tint?: "charcoal" | "night" | "navy";
  height?: "tall" | "medium";
  position?: string;
  fx?: "embers" | "wave";
  /**
   * The poster is the priority (preloaded) image by default. Pages whose hero
   * logo is the LCP element pass false: the poster then loads eagerly at normal
   * priority and the logo takes the priority slot.
   */
  posterPriority?: boolean;
  children: ReactNode;
}) {
  const blur = blurFor(image);

  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-night text-ivory ${
        height === "tall" ? "min-h-[100svh]" : "min-h-[78svh]"
      }`}
    >
      <div className="absolute inset-0 -z-10">
        {/* Poster (the LCP image) and its WebGL copy share the parallax wrapper. */}
        <div className="hero-bg absolute inset-0">
          <Image
            src={image}
            alt={alt}
            fill
            preload={posterPriority}
            loading={posterPriority ? undefined : "eager"}
            sizes="100vw"
            placeholder={blur ? "blur" : "empty"}
            blurDataURL={blur}
            className="object-cover"
            style={{ objectPosition: position }}
          />
          <HeroFx position={toXY(position)} wave={fx === "wave"} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
        {fx === "embers" && <HeroEmbers />}
      </div>
      <div className="hero-copy-k container-x relative pb-28 pt-36 md:pb-20 md:pt-40 lg:pb-24">{children}</div>
      <HeroParallax />
    </section>
  );
}
