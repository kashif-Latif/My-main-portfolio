/**
 * Shared accent mapping.
 *
 * The palette lives in `globals.css` as --a1..--a4 and flips with the theme,
 * so these helpers must never contain a raw colour value — only token names
 * and Tailwind classes that resolve to them. Add an accent here and in
 * globals.css together; nothing else needs to change.
 *
 *   amber  -> --a1  primary brand amber
 *   rust   -> --a2  burnt orange
 *   golden -> --a3  warm yellow
 *   sand   -> --a4  espresso (light) / sand (dark)
 */

export type AccentColor = "amber" | "rust" | "golden" | "sand";

/** Raw CSS value — for inline styles, SVG fills and three.js materials. */
export const accentVar: Record<AccentColor, string> = {
  amber: "var(--a1)",
  rust: "var(--a2)",
  golden: "var(--a3)",
  sand: "var(--a4)",
};

/** Same colour at 30% alpha, for soft fills and hairlines. */
export const accentVarDim: Record<AccentColor, string> = {
  amber: "color-mix(in oklab, var(--a1) 30%, transparent)",
  rust: "color-mix(in oklab, var(--a2) 30%, transparent)",
  golden: "color-mix(in oklab, var(--a3) 30%, transparent)",
  sand: "color-mix(in oklab, var(--a4) 30%, transparent)",
};

/** Deprecated aliases kept so older call sites keep compiling. */
export const accentHex = accentVar;
export const accentHexDim = accentVarDim;

/** Text colour class per accent. */
export const accentTextClass: Record<AccentColor, string> = {
  amber: "text-a1",
  rust: "text-a2",
  golden: "text-a3",
  sand: "text-a4",
};

/** Background tint class per accent. */
export const accentBgClass: Record<AccentColor, string> = {
  amber: "bg-a1/12",
  rust: "bg-a2/12",
  golden: "bg-a3/12",
  sand: "bg-a4/12",
};

/** Border tint class per accent. */
export const accentBorderClass: Record<AccentColor, string> = {
  amber: "border-a1/35",
  rust: "border-a2/35",
  golden: "border-a3/35",
  sand: "border-a4/35",
};

/** Solid-fill class per accent — used for dots, bars and progress tracks. */
export const accentFillClass: Record<AccentColor, string> = {
  amber: "bg-a1",
  rust: "bg-a2",
  golden: "bg-a3",
  sand: "bg-a4",
};
