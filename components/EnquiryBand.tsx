import { Button, WhatsAppIcon } from "@/components/ui";
import { SITE, WA, whatsapp } from "@/content/site";

export default function EnquiryBand({
  title = "Plan something.",
  body = "A table tonight, a wedding next season or a meeting next week. Tell us what you have in mind and the team will come back to you directly.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-charcoal py-24 text-ivory md:py-32">
      <div className="container-x grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7" data-reveal>
          <h2 className="display">{title}</h2>
          <p className="lede mt-6 max-w-xl text-mist">{body}</p>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4 md:col-start-9" data-reveal>
          <Button href="/enquire">Send an enquiry</Button>
          <Button href={whatsapp(WA.general)} tone="outline-light">
            <WhatsAppIcon /> WhatsApp
          </Button>
          <Button href={SITE.phoneHref} tone="outline-light">
            Call {SITE.phone}
          </Button>
        </div>
      </div>
    </section>
  );
}
