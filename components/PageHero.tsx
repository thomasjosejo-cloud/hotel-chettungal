import { getImageProps } from "next/image";
import type { ReactNode } from "react";
import HeroFx from "@/components/HeroFx";
import HeroEmbers from "@/components/motion/HeroEmbers";
import HeroParallax from "@/components/motion/HeroParallax";
import { blurFor } from "@/content/blur";

const PHONE = "(max-width: 760px)";
const WIDE = "(min-width: 761px)";

/** Next's blur placeholder, as plain style so it works on a bare <img>. */
const BLUR_STYLE = (blur: string, position: string) => ({
  backgroundImage: `url("${blur}")`,
  backgroundSize: "cover",
  backgroundPosition: position,
  backgroundRepeat: "no-repeat",
});

/** The portrait crop a phone gets instead of the landscape original. */
function phoneCrop(image: string): string {
  return `/images/hero-phone/${image.split("/").pop()}`;
}

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
  scrim = "normal",
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
  /** "deep" for heroes whose photo is bright right behind the copy. */
  scrim?: "normal" | "deep";
  children: ReactNode;
}) {
  const blur = blurFor(image);
  const common = { alt, sizes: "100vw", quality: 75 } as const;
  const { props: phone } = getImageProps({ ...common, src: phoneCrop(image), width: 768, height: 1024 });
  const { props: wide } = getImageProps({ ...common, src: image, width: 1536, height: 1024 });
  // The <img> keeps the wide candidate as its fallback src.
  // The <img> is only the fallback for a browser that matches no <source>, so
  // it carries neither srcSet nor sizes: with both present but no candidates to
  // choose from, Chrome fetched the fallback as well as the chosen source.
  const { srcSet: _wideSrcSet, sizes: _wideSizes, ...img } = wide;

  return (
    <section
      className={`relative isolate flex items-end overflow-hidden bg-night text-ivory ${
        height === "tall" ? "min-h-[100svh]" : "min-h-[78svh]"
      }`}
    >
      <div className="absolute inset-0 -z-10">
        {/* Poster (the LCP image) and its WebGL copy share the parallax wrapper. */}
        <div className="hero-bg absolute inset-0">
          <picture>
            {/*
              Art direction, not just resizing. Through `cover` in a tall
              viewport a 3:2 photo loses about two thirds of its width, so a
              phone was being sent mostly pixels it would crop away and then
              stretching what was left. Phones get a portrait crop of the same
              photograph instead: the right pixels, at a third of the bytes.

              The preload scanner finds the <source> it will actually use, so
              there is still one download per device; a <link rel="preload">
              would be emitted for only one of the two and cause a second.
            */}
            <source media={PHONE} srcSet={phone.srcSet} sizes="100vw" />
            <source media={WIDE} srcSet={wide.srcSet} sizes="100vw" />
            <img
              {...img}
              alt={alt}
              loading="eager"
              fetchPriority={posterPriority ? "high" : undefined}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: position, ...(blur ? BLUR_STYLE(blur, position) : null) }}
            />
          </picture>
          <HeroFx position={toXY(position)} wave={fx === "wave"} />
        </div>
        {/* Embers sit UNDER the scrim. Over it, a drifting spark crossing the
            eyebrow dropped its measured contrast from 4.8:1 to 3.6:1 frame to
            frame; under it they keep full brightness in the open part of the
            hero and are damped exactly where the copy is. */}
        {fx === "embers" && <HeroEmbers />}
        <div className={`page-hero-scrim absolute inset-0${scrim === "deep" ? " page-hero-scrim-deep" : ""}`} />
      </div>
      <div className="hero-copy-k container-x relative pb-28 pt-36 md:pb-20 md:pt-40 lg:pb-24">{children}</div>
      <HeroParallax />
    </section>
  );
}
