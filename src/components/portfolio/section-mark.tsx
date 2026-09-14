/**
 * The eyebrow marker that precedes every section label — one solid disc
 * followed by two amber half-discs. Pure inline SVG (no icon font, no extra
 * request) and it inherits theme colours, so it flips with light/dark.
 */
export function SectionMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 38 14"
      className={className ?? "h-3 w-auto shrink-0"}
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="7" cy="7" r="6.5" fill="currentColor" />
      <path d="M15 0.5a6.5 6.5 0 0 1 0 13Z" fill="var(--brand)" />
      <path d="M26 0.5a6.5 6.5 0 0 1 0 13Z" fill="var(--brand)" />
    </svg>
  );
}
