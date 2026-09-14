"use client";

import * as React from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/portfolio/magnetic-button";
import { cn } from "@/lib/utils";

type Variant = "brand" | "dark" | "outline" | "ghost";

interface BrandButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  /** Trailing circular arrow badge, as on the reference CTAs. */
  arrow?: "right" | "up-right" | false;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-tight " +
  "transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-ink hover:bg-brand-deep",
  dark: "bg-foreground text-background hover:bg-foreground/90",
  outline:
    "border border-line-strong bg-transparent text-foreground hover:bg-surface-2",
  ghost: "text-foreground hover:bg-surface-2",
};

/** Left padding is tighter when an arrow badge sits on the right. */
const sizes: Record<"sm" | "md" | "lg", { pad: string; withArrow: string; text: string; badge: string }> = {
  sm: { pad: "px-4 py-2", withArrow: "pl-4 pr-1.5 py-1.5", text: "text-[13px]", badge: "h-7 w-7" },
  md: { pad: "px-6 py-3", withArrow: "pl-6 pr-2 py-2", text: "text-sm", badge: "h-9 w-9" },
  lg: { pad: "px-7 py-3.5", withArrow: "pl-7 pr-2.5 py-2.5", text: "text-sm sm:text-base", badge: "h-10 w-10" },
};

/* Badge colour is the inverse of the button's own fill.
 *
 * `brand` uses --cream rather than --card: the button is amber on BOTH themes,
 * so the disc must be light on both. --card flips to espresso in dark mode,
 * which rendered a dark arrow on a dark disc — invisible. --cream and --ink are
 * theme-independent constants, which is exactly what a fixed-colour button
 * needs. */
const badgeTone: Record<Variant, string> = {
  brand: "bg-cream text-ink",
  dark: "bg-brand text-ink",
  outline: "bg-brand text-ink",
  ghost: "bg-brand text-ink",
};

export function BrandButton({
  children,
  className,
  variant = "brand",
  arrow = false,
  size = "md",
  fullWidth = false,
  ...props
}: BrandButtonProps) {
  const s = sizes[size];
  const Icon = arrow === "up-right" ? ArrowUpRight : ArrowRight;

  return (
    <MagneticButton
      className={cn(
        base,
        variants[variant],
        s.text,
        arrow ? s.withArrow : s.pad,
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      <span className="relative">{children}</span>
      {arrow && (
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full transition-transform duration-300",
            s.badge,
            badgeTone[variant],
            "group-hover:translate-x-0.5"
          )}
        >
          <Icon className="h-4 w-4" strokeWidth={2.25} />
        </span>
      )}
    </MagneticButton>
  );
}
