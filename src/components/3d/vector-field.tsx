"use client";

import * as React from "react";

/**
 * VectorField — a 3D wireframe vector structure for the bottom of the
 * home page (or any closing section). Renders an isometric wireframe
 * pyramid/tetra + orbiting node + axis grid + scanlines.
 *
 * Pure SVG with CSS 3D transforms — no WebGL. Lightweight and elegant.
 */
export function VectorField({ className }: { className?: string }) {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  return (
    <div
      className={`relative mx-auto flex max-w-md items-center justify-center ${className ?? ""}`}
      aria-hidden="true"
      style={{ perspective: "900px" }}
    >
      <div
        className="relative aspect-[4/3] w-full"
        style={
          !reduced
            ? {
                transformStyle: "preserve-3d",
                animation: "float-y 8s ease-in-out infinite",
              }
            : { transformStyle: "preserve-3d" }
        }
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(240,168,48,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Main SVG */}
        <svg
          viewBox="0 0 400 300"
          className="absolute inset-0 h-full w-full"
          style={
            !reduced
              ? {
                  transformStyle: "preserve-3d",
                  animation: "spin-slow 90s linear infinite",
                }
              : undefined
          }
        >
          <defs>
            <linearGradient id="vecLine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(61,214,140,0.8)" />
              <stop offset="100%" stopColor="rgba(240,168,48,0.6)" />
            </linearGradient>
            <radialGradient id="vecCore" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(61,214,140,0.5)" />
              <stop offset="100%" stopColor="rgba(61,214,140,0)" />
            </radialGradient>
          </defs>

          {/* Central core glow */}
          <circle cx="200" cy="150" r="80" fill="url(#vecCore)" />

          {/* Isometric wireframe tetrahedron / pyramid */}
          <g
            stroke="url(#vecLine)"
            strokeWidth="1.2"
            fill="none"
            strokeLinejoin="round"
          >
            {/* Outer tetra edges */}
            <path d="M200 50 L120 220 L280 220 Z" />
            <path d="M200 50 L200 220" />
            <path d="M120 220 L200 220 L280 220" />

            {/* Inner secondary tetra */}
            <path
              d="M200 90 L150 200 L250 200 Z"
              stroke="rgba(240,168,48,0.4)"
              strokeWidth="0.8"
            />
            <path
              d="M200 90 L200 200"
              stroke="rgba(240,168,48,0.4)"
              strokeWidth="0.8"
            />

            {/* Diagonal struts */}
            <path
              d="M200 50 L150 200 M200 50 L250 200"
              stroke="rgba(61,214,140,0.3)"
              strokeWidth="0.6"
            />
          </g>

          {/* Axis grid lines */}
          <g stroke="rgba(138,148,156,0.2)" strokeWidth="0.5" strokeDasharray="2 4">
            <line x1="40" y1="150" x2="360" y2="150" />
            <line x1="200" y1="20" x2="200" y2="280" />
            <line x1="80" y1="60" x2="320" y2="240" />
            <line x1="320" y1="60" x2="80" y2="240" />
          </g>

          {/* Vertex nodes */}
          <g>
            {/* Top vertex */}
            <circle cx="200" cy="50" r="5" fill="rgba(11,15,18,0.9)" stroke="#3dd68c" strokeWidth="1.5" />
            <circle cx="200" cy="50" r="2" fill="#3dd68c">
              {!reduced && (
                <animate attributeName="r" values="2;3;2" dur="2s" repeatCount="indefinite" />
              )}
            </circle>
            {/* Bottom-left */}
            <circle cx="120" cy="220" r="4" fill="rgba(11,15,18,0.9)" stroke="#f0a830" strokeWidth="1.2" />
            <circle cx="120" cy="220" r="1.8" fill="#f0a830" />
            {/* Bottom-right */}
            <circle cx="280" cy="220" r="4" fill="rgba(11,15,18,0.9)" stroke="#f0a830" strokeWidth="1.2" />
            <circle cx="280" cy="220" r="1.8" fill="#f0a830" />
            {/* Center */}
            <circle cx="200" cy="150" r="3" fill="#5ef0a6">
              {!reduced && (
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.6s" repeatCount="indefinite" />
              )}
            </circle>
          </g>

          {/* Coordinate ticks */}
          <g fill="rgba(138,148,156,0.5)" fontFamily="monospace" fontSize="7">
            <text x="206" y="48">+y</text>
            <text x="110" y="234">−x</text>
            <text x="286" y="234">+x</text>
            <text x="206" y="156">0,0</text>
          </g>

          {/* Data flow path (animated dashes) */}
          <path
            d="M200 50 Q 150 110 200 150 Q 250 190 200 220"
            fill="none"
            stroke="rgba(94,240,166,0.6)"
            strokeWidth="1"
            className={!reduced ? "dash-flow" : ""}
          />
        </svg>

        {/* Counter-rotating outer ring */}
        {!reduced && (
          <svg
            viewBox="0 0 400 300"
            className="absolute inset-0 h-full w-full"
            style={{ animation: "spin-slow 60s linear infinite reverse" }}
          >
            <ellipse
              cx="200"
              cy="150"
              rx="170"
              ry="100"
              fill="none"
              stroke="rgba(61,214,140,0.15)"
              strokeWidth="0.8"
              strokeDasharray="3 6"
            />
            <ellipse
              cx="200"
              cy="150"
              rx="140"
              ry="80"
              fill="none"
              stroke="rgba(240,168,48,0.12)"
              strokeWidth="0.6"
              strokeDasharray="2 8"
            />
          </svg>
        )}

        {/* Scanline overlay */}
        {!reduced && (
          <div className="scanline pointer-events-none absolute inset-0 rounded-lg" />
        )}
      </div>

      {/* Caption */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest2 text-steel-dark">
        <span className="text-signal/70">●</span> vector field · live
      </div>
    </div>
  );
}
