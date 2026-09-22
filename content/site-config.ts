export interface SiteConfig {
  propertyName: string;
  brandSubtitle: string;
  tagline: string;
  phone: string;
  phoneRaw: string;
  whatsapp: string;
  whatsappRaw: string;
  email: string;
  address: string;
  pincode: string;
  cityState: string;
  highway: string;
  proximity: {
    airport: string;
    railway: string;
  };
  mapsUrl: string;
  googleMapsEmbed: string;
  hours: {
    casabay: string;
    fishtown: string;
    events: string;
    frontDesk: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  propertyName: "Hotel New Town",
  brandSubtitle: "by Chettungal",
  tagline: "One Address, Every Occasion — Stay · Dine · Meet · Celebrate",
  phone: "+91 99611 34364",
  phoneRaw: "+919961134364",
  whatsapp: "+91 99611 34364",
  whatsappRaw: "919961134364",
  email: "info@hotelchettungal.com",
  address: "NH 544, Angamaly",
  pincode: "683572",
  cityState: "Kerala, India",
  highway: "NH 544 (Kochi-Salem Highway)",
  proximity: {
    airport: "~5 km from Cochin International Airport (CIAL) — a short drive in",
    railway: "~1 km from Angamaly Railway Station — on the Aluva–Munnar road",
  },
  mapsUrl: "https://maps.google.com/?q=Hotel+New+Town+Chettungal+Angamaly",
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3927.0984852906563!2d76.3860!3d10.1960!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTDCsDExJzQ1LjYiTiA3NsKwMjMnMDkuNiJF!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin",
  hours: {
    casabay: "5:00 PM – 11:30 PM (Daily Rooftop & Live Music)",
    fishtown: "Breakfast, Lunch & Dinner (7:30 AM – 11:00 PM)",
    events: "Flexible banquet timings as per booking",
    frontDesk: "24/7 Concierge & Resident Assistance",
  },
};

export function buildWhatsAppLink(intent: string, details?: Record<string, string>): string {
  let message = `Hi Hotel New Town by Chettungal team, I'd like to enquire regarding *${intent}*.`;
  if (details) {
    const extra = Object.entries(details)
      .filter(([_, val]) => Boolean(val))
      .map(([key, val]) => `\n• ${key}: ${val}`)
      .join("");
    if (extra) {
      message += `\n\nDetails:${extra}`;
    }
  }
  return `https://wa.me/${SITE_CONFIG.whatsappRaw}?text=${encodeURIComponent(message)}`;
}
