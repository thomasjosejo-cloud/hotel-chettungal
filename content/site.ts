/**
 * Single source of truth for everything the site says.
 *
 * Rule for this file: only facts the property has confirmed, or that the
 * photographs themselves show. Anything optional is typed `string | null`
 * and the UI hides it while it is null, so the property can fill it in
 * later (or it can move into Sanity) without anyone inventing a detail.
 */

export type Photo = { src: string; alt: string; caption: string };

export const SITE = {
  url: "https://hotelchettungal.com",
  name: "Chettungal New Town Hotel",
  shortName: "Chettungal New Town",
  house: "Chettungal",
  phone: "+91 99611 34364",
  phoneHref: "tel:+919961134364",
  whatsappNumber: "919961134364",
  email: null as string | null, // add once the mailbox is confirmed live
  address: {
    line: "NH 544, Angamaly",
    region: "Ernakulam, Kerala",
    pincode: "683572",
  },
  // Maps search still uses the Google listing's current name; update once the listing is renamed.
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+New+Town+Chettungal+Angamaly",
  mapsEmbed: "https://www.google.com/maps?q=Hotel+New+Town+Chettungal+Angamaly&output=embed",
  // Confirmed by the property. Days were not given: never add days or "daily".
  hours: {
    casabay: "3 pm – 11 pm" as string | null,
    fishtown: "7 am – 11 pm" as string | null,
  },
  // The same hours in 24-hour form, for schema.org openingHoursSpecification.
  openingHours: {
    casabay: { opens: "15:00", closes: "23:00" },
    fishtown: { opens: "07:00", closes: "23:00" },
  },
  boardRoomSeats: 12 as number | null,
  // Confirmed facility beyond the four venues (named by the client in the original brief).
  executiveBar: "the Executive Bar",
} as const;

/** WhatsApp deep link with a message written in the guest's own voice. */
export function whatsapp(message: string): string {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  general: "Hello, I'd like to know more about Chettungal New Town Hotel.",
  casabay: "Hello, I'd like to reserve a table at CasaBay.",
  casabayMenu: "Hello, could you send me the CasaBay menu?",
  casabayPrivate: "Hello, I'm planning a private evening at CasaBay and would like to discuss it.",
  fishtown: "Hello, I'd like to reserve a table at Fish Town.",
  fishtownMenu: "Hello, could you send me the Fish Town menu?",
  townhall: "Hello, I'm planning an event and would like to check Town Hall availability.",
  boardroom: "Hello, I'd like to check availability of the Board Room.",
  rooms: "Hello, I'd like to check room availability.",
} as const;

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/casabay", label: "CasaBay" },
  { href: "/fishtown", label: "Fish Town" },
  { href: "/town-hall", label: "Town Hall" },
  { href: "/board-room", label: "Board Room" },
  { href: "/rooms", label: "Rooms" },
  { href: "/about", label: "About" },
] as const;

/* ------------------------------------------------------------------ */
/* Photography — captions describe what each frame actually shows.     */
/* ------------------------------------------------------------------ */

const cb = (f: string) => `/images/casabay/${f}.webp`;
const ft = (f: string) => `/images/fishtown/${f}.webp`;
const th = (f: string) => `/images/town-hall/${f}.webp`;
const br = (f: string) => `/images/board-room/${f}.webp`;
const rm = (f: string) => `/images/rooms/${f}.webp`;
const lc = (f: string) => `/images/location/${f}.webp`;

export const PHOTOS = {
  casabay: [
    { src: cb("casa-ambience-2"), alt: "CasaBay open-air rooftop deck at night with umbrellas and string lights", caption: "The open-air deck after dark" },
    { src: cb("casa-cocktail-deck"), alt: "Cocktails on the CasaBay bar with the winged mural behind", caption: "Cocktails at the bar, the mural behind" },
    { src: cb("casa-ambience-1"), alt: "Glowing onyx columns and planters along the edge of the rooftop", caption: "Onyx columns and garden edge" },
    { src: cb("casa-hero"), alt: "The backlit onyx bar counter at CasaBay", caption: "The backlit onyx bar" },
    { src: cb("casa-night-view"), alt: "Umbrella tables on the CasaBay open deck", caption: "Umbrella tables on the deck" },
    { src: cb("casa-ambience-3"), alt: "CasaBay dining floor with lattice screens and mural wall", caption: "Lattice screens and the mural wall" },
    { src: cb("casa-cabana"), alt: "The CasaBay back bar with lit shelves", caption: "The back bar" },
    { src: cb("casa-bar"), alt: "Long view of CasaBay with lattice screens and pendant lamps", caption: "The long room under wicker lamps" },
    { src: cb("casa-terrace"), alt: "Covered dining floor at CasaBay at night", caption: "The covered dining floor" },
    { src: cb("casa-sunset"), alt: "CasaBay bar counter beneath the painted mural gallery", caption: "The bar and mural gallery" },
  ] satisfies Photo[],
  fishtown: [
    { src: ft("restaurant-hero"), alt: "Fish Town main dining room with illuminated wave walls", caption: "The main dining room" },
    { src: ft("restaurant-wave-wall"), alt: "Illuminated wave wall along Fish Town's dining floor", caption: "The illuminated wave wall" },
    { src: ft("restaurant-2"), alt: "Long tables laid for a group at Fish Town", caption: "Long tables for families and groups" },
    { src: ft("restaurant-intimate"), alt: "Tables for four at Fish Town", caption: "Tables for four" },
    { src: ft("restaurant-3"), alt: "Booth seating in a quiet corner of Fish Town", caption: "Booth seating" },
    { src: ft("restaurant-4"), alt: "Fish Town entrance counter and lounge seating", caption: "The entrance and lounge" },
    { src: ft("restaurant-wide"), alt: "Wide view of Fish Town's dining floor", caption: "The full dining floor" },
    { src: ft("restaurant-buffet"), alt: "Fish Town dining tables near the service counter", caption: "Tables by the service counter" },
  ] satisfies Photo[],
  townhall: [
    { src: th("hall-hero"), alt: "Town Hall set theatre-style facing the stage", caption: "Theatre-style, facing the stage" },
    { src: th("hall-stage"), alt: "Town Hall stage with podium and head-table chairs", caption: "The stage and podium" },
    { src: th("hall-lighting"), alt: "Head table on the carpeted stage at Town Hall", caption: "Head table on the stage" },
    { src: th("hall-events"), alt: "Buffet counters set along Town Hall", caption: "Buffet counters along the hall" },
    { src: th("hall-2"), alt: "Rows of banquet chairs in Town Hall", caption: "Rows set for a gathering" },
    { src: th("hall-wide"), alt: "Lounge seating and buffet line inside Town Hall", caption: "Lounge seating and buffet line" },
  ] satisfies Photo[],
  boardroom: [
    { src: br("boardroom-seating"), alt: "The Board Room table seen from its head", caption: "From the head of the table" },
    { src: br("boardroom-angle"), alt: "The Board Room table with executive chairs", caption: "One table, executive chairs" },
    { src: br("boardroom-2"), alt: "Wide view of the Board Room", caption: "The full room" },
    { src: br("boardroom-focus"), alt: "Board Room chairs and table detail", caption: "Set for a meeting" },
    { src: br("boardroom-hero"), alt: "The Board Room from the entrance corner", caption: "From the door" },
  ] satisfies Photo[],
  rooms: [
    { src: rm("lux-05"), alt: "A guest room with a double bed and carved headboard", caption: "A guest room" },
    { src: rm("lux-03"), alt: "Guest room with the bed and window drapes", caption: "Light from the window side" },
    { src: rm("room-2-lounge"), alt: "Guest room with kettle station, desk and television", caption: "Desk, television and tea station" },
    { src: rm("lux-08"), alt: "Guest room bed and bedside tables", caption: "Bedside" },
    { src: rm("room-2"), alt: "Guest room set up for a celebration", caption: "Set up for a celebration" },
    { src: rm("room-1-desk"), alt: "En-suite bathroom with walk-in shower", caption: "En-suite shower" },
    { src: rm("room-1-detail"), alt: "Bathroom vanity with basin and mirror", caption: "The vanity" },
    { src: rm("room-2-angle"), alt: "Guest room seen from the desk", caption: "The room from the desk" },
  ] satisfies Photo[],
  location: [
    { src: lc("facade"), alt: "Chettungal New Town Hotel facade on NH 544, Angamaly", caption: "On NH 544, Angamaly" },
    { src: lc("reception-counter"), alt: "The reception desk at Chettungal New Town", caption: "Reception" },
    { src: lc("reception-1"), alt: "Lobby seating at Chettungal New Town", caption: "The lobby" },
    { src: lc("reception-entrance"), alt: "Chettungal New Town entrance and reception", caption: "The entrance" },
  ] satisfies Photo[],
};

/* ------------------------------------------------------------------ */
/* The four assets, in order of commercial weight.                     */
/* ------------------------------------------------------------------ */

export const VENUES = [
  {
    numeral: "I",
    slug: "casabay",
    href: "/casabay",
    name: "CasaBay",
    kind: "Rooftop restobar",
    line: "Take the evening upstairs.",
    body: "An open-air deck and a covered bar on the roof. Cocktails, food from the kitchen, and the kind of evening that starts with one drink and ends late.",
    image: PHOTOS.casabay[1],
  },
  {
    numeral: "II",
    slug: "fishtown",
    href: "/fishtown",
    name: "Fish Town",
    kind: "Multi-cuisine restaurant",
    line: "Fresh catch. Local soul.",
    body: "The food Kerala knows best, served under the wave walls. A quick lunch, a business meal or a table for the whole family.",
    image: PHOTOS.fishtown[0],
  },
  {
    numeral: "III",
    slug: "town-hall",
    href: "/town-hall",
    name: "Town Hall",
    kind: "Banquet hall · up to 120",
    line: "Where the whole guest list fits.",
    body: "The hotel's largest room, with a stage, a podium and space for a buffet. Weddings, receptions, conferences and family occasions.",
    image: PHOTOS.townhall[0],
  },
  {
    numeral: "IV",
    slug: "board-room",
    href: "/board-room",
    name: "The Board Room",
    kind: "Private meeting room",
    line: "A room built for focus.",
    body: "One long table behind a closed door. For board meetings, interviews, client presentations and training.",
    image: PHOTOS.boardroom[1],
  },
] as const;
