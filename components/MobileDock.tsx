"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE, WA, whatsapp } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui";

const CONTEXT: Record<string, string> = {
  "/casabay": WA.casabay,
  "/fishtown": WA.fishtown,
  "/town-hall": WA.townhall,
  "/board-room": WA.boardroom,
  "/rooms": WA.rooms,
};

/** Thumb-reach actions on phones. The WhatsApp message follows the page. */
export default function MobileDock() {
  const pathname = usePathname();
  if (pathname === "/enquire") return null;
  const message = CONTEXT[pathname] ?? WA.general;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-white/10 bg-charcoal/95 pb-[env(safe-area-inset-bottom)] text-ivory backdrop-blur-md md:hidden">
      <a href={SITE.phoneHref} className="flex min-h-14 items-center justify-center text-[0.8125rem] font-medium uppercase tracking-[0.16em]">
        Call
      </a>
      <a
        href={whatsapp(message)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-14 items-center justify-center gap-2 border-x border-white/10 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-brass-light"
      >
        <WhatsAppIcon /> WhatsApp
      </a>
      <Link href="/enquire" className="flex min-h-14 items-center justify-center text-[0.8125rem] font-medium uppercase tracking-[0.16em]">
        Enquire
      </Link>
    </div>
  );
}
