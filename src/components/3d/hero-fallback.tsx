"use client";

/**
 * Pure-CSS hero fallback. Lives in its own file so the home page can show
 * it INSTANTLY while the heavy Three.js scene (~1.2 MB) lazy-loads in the
 * background — and so devices that never load WebGL still get a visual.
 */
export function HeroFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Animated gradient orbs */}
      <div
        className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.18 250 / 40%) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute left-[40%] top-[40%] h-[30vmin] w-[30vmin] rounded-full opacity-40 blur-3xl animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 295 / 40%) 0%, transparent 70%)",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute left-[60%] top-[60%] h-[25vmin] w-[25vmin] rounded-full opacity-30 blur-3xl animate-pulse-slow"
        style={{
          background:
            "radial-gradient(circle, oklch(0.72 0.15 195 / 40%) 0%, transparent 70%)",
          animationDelay: "2s",
        }}
      />

      {/* Static grid overlay */}
      <div className="absolute inset-0 bg-grid opacity-40" />

      {/* Central geometric SVG */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-60"
        width="280"
        height="280"
        viewBox="0 0 280 280"
        fill="none"
      >
        <circle cx="140" cy="140" r="60" stroke="oklch(0.7 0.18 250 / 40%)" strokeWidth="1" />
        <circle cx="140" cy="140" r="90" stroke="oklch(0.65 0.2 295 / 30%)" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="140" cy="140" r="120" stroke="oklch(0.72 0.15 195 / 25%)" strokeWidth="1" strokeDasharray="2 8" />
        <circle cx="140" cy="140" r="12" fill="oklch(0.7 0.18 250 / 60%)" />
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const x = 140 + Math.cos(angle) * 90;
          const y = 140 + Math.sin(angle) * 90;
          return (
            <g key={i}>
              <line
                x1="140"
                y1="140"
                x2={x}
                y2={y}
                stroke="oklch(0.7 0.18 250 / 15%)"
                strokeWidth="0.5"
              />
              <circle cx={x} cy={y} r="3" fill="oklch(0.7 0.18 250 / 70%)" />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
