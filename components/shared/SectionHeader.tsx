import React from "react";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  theme?: "dark" | "light";
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "center",
  theme = "dark",
  className = "",
}: SectionHeaderProps) {
  const isDark = theme === "dark";
  const alignClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={`flex flex-col ${alignClass} mb-12 md:mb-16 ${className}`}>
      {eyebrow && (
        <div className="flex items-center gap-3 mb-3">
          <span className="h-[1px] w-6 bg-[#D4AF37]/60" />
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#D4AF37]">
            {eyebrow}
          </span>
          <span className="h-[1px] w-6 bg-[#D4AF37]/60" />
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl md:text-5xl font-serif tracking-tight leading-tight ${
          isDark ? "text-white" : "text-[#0B0E14]"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base sm:text-lg font-light leading-relaxed ${
            isDark ? "text-slate-300" : "text-stone-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
