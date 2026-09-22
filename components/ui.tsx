import Link from "next/link";
import type { ReactNode } from "react";

type Tone = "solid-light" | "solid-dark" | "outline-light" | "outline-dark" | "ember" | "navy";

const TONES: Record<Tone, string> = {
  // on dark backgrounds
  "solid-light": "bg-brass-light text-ink hover:bg-ivory",
  "outline-light": "border border-ivory/40 text-ivory hover:border-ivory hover:bg-ivory hover:text-ink",
  ember: "bg-ember text-night hover:bg-ivory",
  // on light backgrounds
  "solid-dark": "bg-charcoal text-ivory hover:bg-brass",
  "outline-dark": "border border-charcoal/30 text-charcoal hover:border-charcoal hover:bg-charcoal hover:text-ivory",
  navy: "bg-navy text-ivory hover:bg-ft-brass",
};

const BASE =
  "inline-flex min-h-12 items-center justify-center gap-3 px-7 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] transition-colors duration-300";

export function Button({
  href,
  tone = "solid-light",
  external,
  children,
  className = "",
}: {
  href: string;
  tone?: Tone;
  external?: boolean;
  children: ReactNode;
  className?: string;
}) {
  const cls = `${BASE} ${TONES[tone]} ${className}`;
  if (external || href.startsWith("http") || href.startsWith("tel:")) {
    const isHttp = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.29Z" />
    </svg>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}

/** Roman-numeral section marker — the house system from the print menus. */
export function Numeral({ n, className = "" }: { n: string; className?: string }) {
  return (
    <span className={`flex items-center gap-4 font-serif text-lg italic ${className}`}>
      <span>{n}</span>
      <span aria-hidden className="h-px w-10 bg-current opacity-50" />
    </span>
  );
}
