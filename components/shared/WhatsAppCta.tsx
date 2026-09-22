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
    gold: "bg-gradient-to-r from-[#E5C158] to-[#D4AF37] hover:from-[#F0D278] hover:to-[#E5C158] text-[#0A0D12] shadow-md hover:shadow-xl font-bold",
    dark: "bg-[#141822] hover:bg-[#1E2433] text-white border border-[#D4AF37]/30 hover:border-[#D4AF37] shadow-sm",
    outline: "bg-transparent text-[#D4AF37] border border-[#D4AF37]/50 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10",
    minimal: "bg-transparent text-current hover:text-[#D4AF37] p-0 underline-offset-4 hover:underline",
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
