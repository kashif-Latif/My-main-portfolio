"use client";

/**
 * The dark scrolling band under the hero.
 *
 * Perf notes: the track is duplicated once and translated -50%, so the loop is
 * seamless with a single `transform` animation — no JS timer, no per-frame
 * layout, and the compositor handles it entirely off the main thread. The copy
 * is aria-hidden so screen readers hear the list once.
 */

function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 text-brand"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 0c.6 5.7 2.9 8.8 12 12-9.1 3.2-11.4 6.3-12 12-.6-5.7-2.9-8.8-12-12C9.1 8.8 11.4 5.7 12 0Z" />
    </svg>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <div
      className="flex shrink-0 items-center"
      aria-hidden={hidden || undefined}
    >
      {items.map((item, i) => (
        <span key={`${item}-${i}`} className="flex items-center">
          <span className="whitespace-nowrap px-6 font-display text-lg font-bold tracking-tight text-[var(--panel-foreground)] sm:px-9 sm:text-2xl">
            {item}
          </span>
          <Sparkle />
        </span>
      ))}
    </div>
  );

  return (
    <div className="panel relative overflow-hidden border-y border-[var(--panel-line)] py-4 sm:py-5">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
