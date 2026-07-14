"use client";

import * as React from "react";

/**
 * MetaEarth — a draggable wireframe globe with latitude/longitude lines,
 * blinking data points, and zoom in/out while rotating.
 *
 * - Auto-rotates slowly by default
 * - User can drag to rotate it manually (mouse or touch)
 * - While rotating, the globe subtly zooms in and out (breathing effect)
 * - On release, resumes auto-rotation from the current angle
 * - Pure SVG + state — no WebGL, very lightweight
 * - Blue/cyan/purple palette to match the premium dark theme
 *
 * Variants:
 *  - "hero"      : large, sits on the right side of hero on desktop
 *  - "background" : larger, lower-opacity, sits behind hero text on mobile
 */
interface MetaEarthProps {
  size?: number;
  variant?: "hero" | "background";
  className?: string;
}

export function MetaEarth({
  size = 320,
  variant = "hero",
  className = "",
}: MetaEarthProps) {
  const [reduced, setReduced] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [angle, setAngle] = React.useState(0);
  const [scale, setScale] = React.useState(1);
  const [isDragging, setIsDragging] = React.useState(false);
  const [autoRotate, setAutoRotate] = React.useState(true);
  const dragStart = React.useRef<{ x: number; angle: number } | null>(null);
  const rafRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      setReduced(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  // Auto-rotation + breathing zoom loop
  React.useEffect(() => {
    if (reduced || !autoRotate || isDragging) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setAngle((a) => (a + dt * 10) % 360); // 10deg/sec rotation
      // Breathing zoom: oscillates between 0.92 and 1.08 over ~6s
      const breath = 1 + Math.sin(now / 1500) * 0.08;
      setScale(breath);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced, autoRotate, isDragging]);

  // Drag handlers (pointer events — works for mouse + touch)
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduced) return;
    setIsDragging(true);
    setAutoRotate(false);
    dragStart.current = { x: e.clientX, angle };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const newAngle = (dragStart.current.angle + dx * 0.6) % 360;
    setAngle(newAngle);
    // Zoom out slightly while dragging fast, zoom in when slow
    const speed = Math.abs(dx);
    const dragZoom = Math.max(0.88, 1 - speed / 800);
    setScale(dragZoom);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    dragStart.current = null;
    // Resume auto-rotation after a short pause
    window.setTimeout(() => setAutoRotate(true), 1200);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* noop */
    }
  };

  // Wheel handler for manual zoom
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (reduced) return;
    e.preventDefault();
    const delta = -e.deltaY * 0.0008;
    setScale((s) => Math.max(0.6, Math.min(1.4, s + delta)));
  };

  const opacity = variant === "background" ? 0.22 : 1;
  const blur = variant === "background" ? "blur(2px)" : undefined;
  const cursor = reduced ? "default" : isDragging ? "grabbing" : "grab";

  return (
    <div
      className={`relative select-none ${className}`}
      style={{
        width: size,
        height: size,
        opacity,
        cursor,
        filter: blur,
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      onWheel={onWheel}
      aria-label="Interactive rotating globe — drag to rotate, scroll to zoom"
      role="img"
    >
      {/* Outer atmospheric glow */}
      <div
        className="absolute inset-0 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.18 250 / 35%) 0%, oklch(0.55 0.22 295 / 20%) 50%, transparent 70%)",
        }}
      />

      {/* Globe wrapper (applies rotation + scale transforms) */}
      <div
        className="absolute inset-0"
        style={{
          transform: mounted ? `scale(${scale})` : "scale(1)",
          transformOrigin: "center",
          transition: isDragging ? "none" : "transform 0.3s ease-out",
        }}
      >
        {/* Rotating globe (longitude lines spin with the drag) */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          style={{
            transform: mounted ? `rotateY(${angle}deg)` : "rotateY(0deg)",
            transformOrigin: "center",
            transformStyle: "preserve-3d",
          }}
        >
          <defs>
            <radialGradient id="earthGlowBlue" cx="35%" cy="35%" r="65%">
              <stop offset="0%" stopColor="oklch(0.7 0.18 250 / 0.20)" />
              <stop offset="50%" stopColor="oklch(0.16 0.014 264 / 0.90)" />
              <stop offset="100%" stopColor="oklch(0.09 0.01 264 / 0.95)" />
            </radialGradient>
            <radialGradient id="earthAtmosphere" cx="50%" cy="50%" r="50%">
              <stop offset="80%" stopColor="oklch(0.7 0.18 250 / 0)" />
              <stop offset="95%" stopColor="oklch(0.7 0.18 250 / 0.4)" />
              <stop offset="100%" stopColor="oklch(0.7 0.18 250 / 0)" />
            </radialGradient>
          </defs>

          {/* Sphere with classical shading */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="url(#earthGlowBlue)"
            stroke="oklch(0.7 0.18 250 / 0.6)"
            strokeWidth="0.8"
          />
          {/* Atmosphere rim */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="url(#earthAtmosphere)"
            stroke="oklch(0.78 0.15 195 / 0.3)"
            strokeWidth="0.4"
          />

          {/* Longitude lines (vertical ellipses — varying rx creates the spin illusion) */}
          <g strokeWidth="0.5" fill="none">
            {[0, 30, 60, 90, 120, 150].map((deg, i) => {
              const useAngle = mounted ? angle : 0;
              const rad = ((deg + useAngle) * Math.PI) / 180;
              const rx = Math.abs(Math.cos(rad)) * 45;
              const op = Math.abs(Math.sin(rad)) * 0.5 + 0.2;
              return (
                <ellipse
                  key={i}
                  cx="50"
                  cy="50"
                  rx={Math.max(rx, 1)}
                  ry="45"
                  stroke={`oklch(0.7 0.18 250 / ${op})`}
                />
              );
            })}
          </g>

          {/* Latitude lines (horizontal) — classical globe meridians */}
          <g stroke="oklch(0.7 0.18 250 / 0.28)" strokeWidth="0.5" fill="none">
            <ellipse cx="50" cy="50" rx="45" ry="12" />
            <ellipse cx="50" cy="50" rx="45" ry="24" />
            <ellipse cx="50" cy="50" rx="45" ry="35" />
            <ellipse cx="50" cy="50" rx="45" ry="42" />
            <line x1="5" y1="50" x2="95" y2="50" stroke="oklch(0.78 0.15 195 / 0.4)" strokeWidth="0.6" />
          </g>

          {/* Equator highlight — brighter */}
          <ellipse
            cx="50"
            cy="50"
            rx="45"
            ry="0.5"
            fill="none"
            stroke="oklch(0.82 0.13 90 / 0.5)"
            strokeWidth="0.6"
          />

          {/* Data points — blinking (representing global reach) */}
          <g fill="oklch(0.7 0.18 250)">
            <circle cx="35" cy="40" r="1.8">
              {!reduced && (
                <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx="65" cy="55" r="1.8">
              {!reduced && (
                <animate attributeName="opacity" values="1;0.3;1" dur="2.4s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx="50" cy="28" r="1.8">
              {!reduced && (
                <animate attributeName="opacity" values="0.5;1;0.5" dur="1.8s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx="55" cy="72" r="1.8">
              {!reduced && (
                <animate attributeName="opacity" values="1;0.4;1" dur="2.6s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx="28" cy="60" r="1.4">
              {!reduced && (
                <animate attributeName="opacity" values="0.4;1;0.4" dur="2.2s" repeatCount="indefinite" />
              )}
            </circle>
            <circle cx="72" cy="38" r="1.4">
              {!reduced && (
                <animate attributeName="opacity" values="1;0.3;1" dur="2.8s" repeatCount="indefinite" />
              )}
            </circle>
          </g>

          {/* Connection arcs between data points — classical network look */}
          <g stroke="oklch(0.7 0.18 250 / 0.35)" strokeWidth="0.4" fill="none">
            <path d="M 35 40 Q 45 25 50 28" />
            <path d="M 50 28 Q 60 40 65 55" />
            <path d="M 65 55 Q 60 65 55 72" />
            <path d="M 28 60 Q 40 65 55 72" />
            <path d="M 72 38 Q 70 50 65 55" />
          </g>
        </svg>
      </div>

      {/* Outer counter-rotating dashed ring (classical orrery feel) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        style={
          !reduced
            ? {
                animation: "spin-slow 40s linear infinite reverse",
                transformOrigin: "center",
              }
            : undefined
        }
      >
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="oklch(0.65 0.2 295 / 0.4)"
          strokeWidth="0.5"
          strokeDasharray="2 4"
        />
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="oklch(0.7 0.18 250 / 0.5)"
          strokeWidth="0.8"
          strokeDasharray="30 200"
        />
        {/* Tick marks on the ring — classical compass feel */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = 50 + Math.cos(a) * 47;
          const y1 = 50 + Math.sin(a) * 47;
          const x2 = 50 + Math.cos(a) * 49;
          const y2 = 50 + Math.sin(a) * 49;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="oklch(0.7 0.18 250 / 0.5)"
              strokeWidth="0.6"
            />
          );
        })}
      </svg>

      {/* Outermost faint ring */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <circle
          cx="50"
          cy="50"
          r="49.5"
          fill="none"
          stroke="oklch(0.78 0.15 195 / 0.15)"
          strokeWidth="0.3"
        />
      </svg>
    </div>
  );
}
