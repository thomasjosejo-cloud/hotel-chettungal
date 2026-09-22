import React from "react";
import { MessageSquare } from "lucide-react";
import { buildWhatsAppLink } from "@/content/site-config";

interface WhatsAppCtaProps {
  intent: string;
  details?: Record<string, string>;
  label?: string;
  variant?: "gold" | "dark" | "outline" | "minimal";
  className?: string;
}

export default function WhatsAppCta({
  intent,
  details,
  label = "Enquire on WhatsApp",
  variant = "gold",
  className = "",
}: WhatsAppCtaProps) {
  const url = buildWhatsAppLink(intent, details);

  const baseStyles = "inline-flex items-center justify-center gap-2.5 px-5 py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-sm";

  const variants = {
    gold: "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D278] hover:to-[#E5C158] text-[#0C101B] shadow-md hover:shadow-xl font-bold",
    dark: "bg-[#131A2B] hover:bg-[#1C253D] text-white border border-[#E5C158]/30 hover:border-[#E5C158] shadow-sm",
    outline: "bg-transparent text-[#E5C158] border border-[#E5C158]/50 hover:border-[#E5C158] hover:bg-[#E5C158]/10",
    minimal: "bg-transparent text-current hover:text-[#E5C158] p-0 underline-offset-4 hover:underline",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      <MessageSquare className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </a>
  );
}
