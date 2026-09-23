"use client";

import { useId, useState } from "react";
import { whatsapp } from "@/content/site";
import { WhatsAppIcon } from "@/components/ui";

export type Purpose = "Dining at CasaBay" | "Dining at Fish Town" | "An event at Town Hall" | "The Board Room" | "A room stay";

export const PURPOSES: Purpose[] = [
  "Dining at CasaBay",
  "Dining at Fish Town",
  "An event at Town Hall",
  "The Board Room",
  "A room stay",
];

const GUEST_LABEL: Record<Purpose, string> = {
  "Dining at CasaBay": "Guests",
  "Dining at Fish Town": "Guests",
  "An event at Town Hall": "Expected guests",
  "The Board Room": "Attendees",
  "A room stay": "Rooms needed",
};

const DATE_LABEL: Record<Purpose, string> = {
  "Dining at CasaBay": "Date",
  "Dining at Fish Town": "Date",
  "An event at Town Hall": "Event date",
  "The Board Room": "Meeting date",
  "A room stay": "Check-in date",
};

/**
 * Composes a readable WhatsApp message from the guest's answers.
 * Nothing is stored; the guest sends it from their own phone.
 */
export default function EnquiryForm({
  defaultPurpose = "Dining at CasaBay",
  lockPurpose = false,
  tone = "dark",
}: {
  defaultPurpose?: Purpose;
  lockPurpose?: boolean;
  tone?: "light" | "dark";
}) {
  const id = useId();
  const [purpose, setPurpose] = useState<Purpose>(defaultPurpose);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("");
  const [note, setNote] = useState("");

  const dark = tone === "dark";
  const field = `w-full border-0 border-b bg-transparent px-0 py-3 text-base outline-none transition-colors focus:ring-0 ${
    dark ? "border-ivory/25 text-ivory placeholder:text-smoke/70 focus:border-brass-light" : "border-ivory/25 text-ivory placeholder:text-smoke/70 focus:border-brass-light"
  }`;
  // 44px touch target on mobile via padding; tight to the field from md up
  const label = `eyebrow block min-h-11 pt-3 pb-3 md:min-h-0 md:pt-0 md:pb-0 ${dark ? "text-smoke" : "text-smoke"}`;

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const lines = [
      `Hello, my name is ${name.trim()}.`,
      `I'd like to enquire about ${purpose.charAt(0).toLowerCase() + purpose.slice(1)}.`,
      date && `${DATE_LABEL[purpose]}: ${new Date(date + "T00:00").toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}`,
      guests && `${GUEST_LABEL[purpose]}: ${guests}`,
      note.trim() && `\n${note.trim()}`,
    ].filter(Boolean);
    window.open(whatsapp(lines.join("\n")), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={submit} className="grid gap-8">
      {!lockPurpose && (
        <fieldset>
          <legend className={label}>I&apos;m enquiring about</legend>
          <div className="mt-4 flex flex-wrap gap-2">
            {PURPOSES.map((p) => {
              const on = p === purpose;
              return (
                <label
                  key={p}
                  className={`inline-flex min-h-11 cursor-pointer items-center border px-4 py-3 text-sm transition-colors md:min-h-0 md:py-2.5 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brass-light ${
                    on
                      ? dark
                        ? "border-brass-light bg-brass-light text-ink"
                        : "border-ivory bg-night-2 text-ivory"
                      : dark
                        ? "border-ivory/25 text-ivory hover:border-ivory/60"
                        : "border-ivory/20 text-ivory hover:border-ivory/60"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${id}-purpose`}
                    value={p}
                    checked={on}
                    onChange={() => setPurpose(p)}
                    className="sr-only"
                  />
                  {p}
                </label>
              );
            })}
          </div>
        </fieldset>
      )}

      <div className="grid gap-8 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className={label}>Your name</label>
          <input id={`${id}-name`} required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} className={field} />
        </div>
        <div>
          <label htmlFor={`${id}-date`} className={label}>{DATE_LABEL[purpose]}</label>
          <input id={`${id}-date`} type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${field} ${dark ? "[color-scheme:dark]" : ""}`} />
        </div>
        <div>
          <label htmlFor={`${id}-guests`} className={label}>{GUEST_LABEL[purpose]}</label>
          <input id={`${id}-guests`} inputMode="numeric" value={guests} onChange={(e) => setGuests(e.target.value)} placeholder="e.g. 4" className={field} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-note`} className={label}>Anything we should know</label>
          <textarea id={`${id}-note`} rows={3} value={note} onChange={(e) => setNote(e.target.value)} className={`${field} resize-none`} placeholder="Occasion, timing, dietary needs…" />
        </div>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className={`max-w-sm text-sm ${dark ? "text-smoke" : "text-smoke"}`}>
          This opens WhatsApp with your message ready to send. Our team replies directly.
        </p>
        <button
          type="submit"
          className={`inline-flex min-h-12 items-center justify-center gap-3 px-8 py-3.5 text-[0.8125rem] font-medium uppercase tracking-[0.18em] transition-colors ${
            dark ? "bg-brass-light text-ink hover:bg-ivory" : "bg-night-2 text-ivory hover:bg-brass"
          }`}
        >
          <WhatsAppIcon /> Send on WhatsApp
        </button>
      </div>
    </form>
  );
}
