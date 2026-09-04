/**
 * Shared accent color mapping helpers.
 * Used across cards, badges, lines, etc.
 */

export type AccentColor = "blue" | "purple" | "cyan" | "gold";

export const accentHex: Record<AccentColor, string> = {
  blue: "oklch(0.62 0.18 250)",
  purple: "oklch(0.55 0.22 295)",
  cyan: "oklch(0.72 0.15 195)",
  gold: "oklch(0.78 0.13 90)",
};

export const accentHexDim: Record<AccentColor, string> = {
  blue: "oklch(0.62 0.18 250 / 30%)",
  purple: "oklch(0.55 0.22 295 / 30%)",
  cyan: "oklch(0.72 0.15 195 / 30%)",
  gold: "oklch(0.78 0.13 90 / 30%)",
};

/** Tailwind text color class for each accent */
export const accentTextClass: Record<AccentColor, string> = {
  blue: "text-[oklch(0.7_0.18_250)]",
  purple: "text-[oklch(0.65_0.2_295)]",
  cyan: "text-[oklch(0.78_0.15_195)]",
  gold: "text-[oklch(0.82_0.13_90)]",
};

/** Tailwind background tint class for each accent */
export const accentBgClass: Record<AccentColor, string> = {
  blue: "bg-[oklch(0.62_0.18_250_/_12%)]",
  purple: "bg-[oklch(0.55_0.22_295_/_12%)]",
  cyan: "bg-[oklch(0.72_0.15_195_/_12%)]",
  gold: "bg-[oklch(0.78_0.13_90_/_12%)]",
};

/** Tailwind border tint class for each accent */
export const accentBorderClass: Record<AccentColor, string> = {
  blue: "border-[oklch(0.62_0.18_250_/_35%)]",
  purple: "border-[oklch(0.55_0.22_295_/_35%)]",
  cyan: "border-[oklch(0.72_0.15_195_/_35%)]",
  gold: "border-[oklch(0.78_0.13_90_/_35%)]",
};
