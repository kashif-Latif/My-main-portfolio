"use client";

import * as React from "react";
import { motion } from "framer-motion";

const techLabels = [
  { label: "Python", x: 12, y: 18, delay: 0 },
  { label: "React", x: 78, y: 12, delay: 0.4 },
  { label: "Node.js", x: 8, y: 70, delay: 0.8 },
  { label: "Django", x: 82, y: 64, delay: 1.2 },
  { label: "AI", x: 50, y: 6, delay: 0.2 },
  { label: "APIs", x: 88, y: 38, delay: 1.0 },
  { label: "PostgreSQL", x: 4, y: 42, delay: 0.6 },
  { label: "Docker", x: 70, y: 86, delay: 1.4 },
  { label: "Automation", x: 28, y: 90, delay: 1.6 },
];

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

/**
 * SVG-based neural engine — pseudo-3D with rotating rings, neural paths,
 * tech labels, a hexagonal core, plus ESP32-CAM and database ornaments.
 * Uses CSS perspective + preserve-3d for subtle parallax on mouse move.
 */
export function NeuralEngine() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--rx", `${clamp(-py * 12, -10, 10)}deg`);
    el.style.setProperty("--ry", `${clamp(px * 12, -10, 10)}deg`);
  };

  const handleLeave = () => {
    const el = containerRef.current;
    if (el) {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    }
  };

  return (
    <div
      ref={containerRef}
      className="perspective relative mx-auto aspect-square w-full max-w-[460px]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        { "--rx": "0deg", "--ry": "0deg" } as React.CSSProperties
      }
      aria-hidden="true"
    >
      <div
        className="preserve-3d relative h-full w-full transition-transform duration-300 ease-out"
        style={{ transform: "rotateX(var(--rx)) rotateY(var(--ry))" }}
      >
        {/* Outer rotating ring */}
        {!reduced && (
          <div className="absolute inset-0 animate-spin-slow">
            <svg viewBox="0 0 400 400" className="h-full w-full">
              <circle
                cx="200"
                cy="200"
                r="190"
                fill="none"
                stroke="rgba(61,214,140,0.15)"
                strokeWidth="1"
                strokeDasharray="2 8"
              />
              <circle
                cx="200"
                cy="200"
                r="190"
                fill="none"
                stroke="rgba(61,214,140,0.4)"
                strokeWidth="1.5"
                strokeDasharray="40 360"
              />
            </svg>
          </div>
        )}

        {/* Middle ring (counter-rotate) */}
        {!reduced && (
          <div
            className="absolute inset-8 animate-spin-slow"
            style={{ animationDirection: "reverse", animationDuration: "30s" }}
          >
            <svg viewBox="0 0 400 400" className="h-full w-full">
              <circle
                cx="200"
                cy="200"
                r="170"
                fill="none"
                stroke="rgba(240,168,48,0.12)"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            </svg>
          </div>
        )}

        {/* Neural network paths */}
        <svg
          viewBox="0 0 400 400"
          className="absolute inset-0 h-full w-full"
          style={{ transform: "translateZ(20px)" }}
        >
          <defs>
            <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(61,214,140,0.35)" />
              <stop offset="100%" stopColor="rgba(61,214,140,0)" />
            </radialGradient>
          </defs>
          {/* Core glow */}
          <circle cx="200" cy="200" r="120" fill="url(#coreGlow)" />

          {/* Neural connection lines */}
          <g stroke="rgba(61,214,140,0.25)" strokeWidth="1" fill="none">
            <path d="M200 200 L80 80" className={!reduced ? "dash-flow" : ""} />
            <path d="M200 200 L320 80" className={!reduced ? "dash-flow" : ""} />
            <path d="M200 200 L60 200" className={!reduced ? "dash-flow" : ""} />
            <path d="M200 200 L340 200" className={!reduced ? "dash-flow" : ""} />
            <path d="M200 200 L80 320" className={!reduced ? "dash-flow" : ""} />
            <path d="M200 200 L320 320" className={!reduced ? "dash-flow" : ""} />
            <path d="M200 200 L200 60" className={!reduced ? "dash-flow" : ""} />
            <path d="M200 200 L200 340" className={!reduced ? "dash-flow" : ""} />
          </g>

          {/* Outer nodes */}
          {[
            [80, 80],
            [320, 80],
            [60, 200],
            [340, 200],
            [80, 320],
            [320, 320],
            [200, 60],
            [200, 340],
          ].map(([cx, cy], i) => (
            <g key={i}>
              <circle cx={cx} cy={cy} r="6" fill="rgba(11,15,18,0.9)" stroke="rgba(61,214,140,0.5)" strokeWidth="1.5" />
              <circle cx={cx} cy={cy} r="2.5" fill="#3dd68c" />
            </g>
          ))}
        </svg>

        {/* Central processor core */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ transform: "translate(-50%,-50%) translateZ(40px)" }}
        >
          <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
            {/* Core hexagon */}
            <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full">
              <polygon
                points="60,8 104,32 104,88 60,112 16,88 16,32"
                fill="rgba(11,15,18,0.85)"
                stroke="rgba(61,214,140,0.6)"
                strokeWidth="1.5"
              />
              <polygon
                points="60,20 92,38 92,82 60,100 28,82 28,38"
                fill="none"
                stroke="rgba(240,168,48,0.3)"
                strokeWidth="1"
              />
            </svg>
            {/* Core label */}
            <div className="relative z-10 text-center">
              <div className="font-mono text-[8px] uppercase tracking-widest2 text-signal/70">
                Core
              </div>
              <div className="font-display text-lg font-bold text-offwhite sm:text-xl">
                MKL
              </div>
              <div className="mt-1 flex justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-1 w-1 rounded-full bg-signal"
                    style={
                      !reduced
                        ? { animation: `pulse-soft 1.4s ease-in-out ${i * 0.2}s infinite` }
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Floating tech labels */}
        {techLabels.map((t) => (
          <motion.div
            key={t.label}
            className="absolute font-mono text-[10px] uppercase tracking-wider text-steel-light"
            style={{ left: `${t.x}%`, top: `${t.y}%`, transform: "translateZ(30px)" }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: t.delay, duration: 0.5 }}
          >
            <span className="rounded border border-white/10 bg-obsidian/70 px-1.5 py-0.5 backdrop-blur-sm">
              {t.label}
            </span>
          </motion.div>
        ))}

        {/* Database cylinder (bottom-left) */}
        <svg
          viewBox="0 0 60 60"
          className="absolute bottom-[14%] left-[14%] h-12 w-12"
          style={{ transform: "translateZ(25px)" }}
        >
          <ellipse cx="30" cy="14" rx="20" ry="7" fill="rgba(11,15,18,0.8)" stroke="rgba(240,168,48,0.5)" strokeWidth="1.2" />
          <path d="M10 14 L10 46 A20 7 0 0 0 50 46 L50 14" fill="rgba(11,15,18,0.6)" stroke="rgba(240,168,48,0.5)" strokeWidth="1.2" />
          <ellipse cx="30" cy="14" rx="20" ry="7" fill="none" stroke="rgba(240,168,48,0.3)" strokeWidth="1" />
        </svg>

        {/* Terminal window (top-right) */}
        <div
          className="absolute right-[10%] top-[20%] w-24 rounded-md border border-white/10 bg-obsidian/80 p-1.5 backdrop-blur-sm"
          style={{ transform: "translateZ(35px)" }}
        >
          <div className="mb-1 flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-red-signal/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-amber/70" />
            <span className="h-1.5 w-1.5 rounded-full bg-signal/70" />
          </div>
          <div className="space-y-0.5 font-mono text-[7px] leading-tight text-signal/80">
            <div>{"> init.ai"}</div>
            <div className="text-steel">loading...</div>
            <div className="text-amber">[ok]</div>
          </div>
        </div>

        {/* Camera lens (ESP32-CAM inspired, bottom-right) */}
        <svg
          viewBox="0 0 50 50"
          className="absolute bottom-[18%] right-[16%] h-12 w-12"
          style={{ transform: "translateZ(28px)" }}
        >
          <circle cx="25" cy="25" r="22" fill="rgba(11,15,18,0.85)" stroke="rgba(61,214,140,0.4)" strokeWidth="1.2" />
          <circle cx="25" cy="25" r="14" fill="none" stroke="rgba(61,214,140,0.3)" strokeWidth="1" />
          <circle cx="25" cy="25" r="7" fill="rgba(61,214,140,0.15)" stroke="rgba(61,214,140,0.6)" strokeWidth="1" />
          <circle cx="22" cy="22" r="2" fill="rgba(232,230,225,0.5)" />
        </svg>
      </div>
    </div>
  );
}
