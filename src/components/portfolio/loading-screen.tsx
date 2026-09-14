"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const indicators = ["Code", "Data", "AI", "Systems"];

// "Muhammad KL" split into individual letters for staggered animation.
// Letter colours come from theme tokens, not fixed hex. The old values were
// cream-on-near-black; on the cream theme most of the name rendered invisible.
// --a1 is the contrast-safe accent on both grounds.
const BRAND = "var(--a1)";
const INK = "var(--foreground)";
const DEEP = "var(--a2)";
const GLOW = "color-mix(in oklab, var(--a1) 45%, transparent)";
const GLOW_DEEP = "color-mix(in oklab, var(--a2) 45%, transparent)";

const letters = [
  { char: "M", color: BRAND, glow: GLOW },
  { char: "u", color: INK, glow: "transparent" },
  { char: "h", color: INK, glow: "transparent" },
  { char: "a", color: INK, glow: "transparent" },
  { char: "m", color: INK, glow: "transparent" },
  { char: "m", color: INK, glow: "transparent" },
  { char: "a", color: INK, glow: "transparent" },
  { char: "d", color: INK, glow: "transparent" },
  { char: " ", color: "transparent", glow: "transparent" },
  { char: "K", color: BRAND, glow: GLOW },
  { char: "L", color: DEEP, glow: GLOW_DEEP },
];

/**
 * Loading sequence (blue theme):
 *  - "Muhammad KL" appears with letter-by-letter reveal
 *  - Blinking indicators + progress bar
 *  - Fade out
 *
 * Uses HTML text (not SVG) for maximum mobile compatibility.
 */
const SESSION_KEY = "mkl-intro-seen";

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [done, setDone] = React.useState(false);
  const reduced = useReducedMotion();
  // FIX: the intro used to replay in full on every single visit and
  // refresh. It now plays once per browser session; after that it clears
  // in a single frame so returning visitors get straight to the content.
  const [seen, setSeen] = React.useState(false);

  React.useEffect(() => {
    // Deferred one frame so the effect body doesn't set state
    // synchronously (react-hooks/set-state-in-effect).
    const raf = requestAnimationFrame(() => {
      try {
        setSeen(sessionStorage.getItem(SESSION_KEY) === "1");
      } catch {
        /* storage unavailable — just play the intro */
      }
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // FIX: was a flat 2000ms + 400ms fade for everyone, on every load —
  // a forced 2.4s wall in front of the content. The letter cascade
  // actually finishes at ~1.4s, so 1500ms shows the full animation and
  // still cuts nearly a second off. Repeat visits: 0ms.
  const totalDuration = seen ? 0 : reduced ? 400 : 1500;

  React.useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch {
        /* non-fatal */
      }
      setTimeout(onComplete, seen ? 0 : 400);
    }, totalDuration);
    return () => clearTimeout(t);
  }, [seen, reduced, totalDuration, onComplete]);

  const skip = () => {
    setDone(true);
    setTimeout(onComplete, 150);
  };

  if (reduced) {
    return (
      <AnimatePresence>
        {!done && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-center px-4">
              Muhammad KL
            </div>
            <button
              onClick={skip}
              className="absolute bottom-6 right-6 font-mono text-xs text-muted-foreground hover:text-foreground"
            >
              Skip
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  // Stagger timings — same for all devices for consistency
  const letterDur = 0.25;
  const stagger = 0.1;
  const startDelay = 0.15;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, var(--line) 1px, transparent 1px), linear-gradient(to bottom, var(--line) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

          {/* Ambient glow */}
          <div
            className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brand) 45%, transparent) 0%, transparent 70%)",
            }}
          />

          {/* "Muhammad KL" — letter-by-letter reveal using HTML text */}
          <div className="relative z-10 w-full px-4 flex justify-center">
            <h1
              className="font-display font-bold tracking-tight text-center flex flex-wrap justify-center"
              style={{
                fontSize: "clamp(1.75rem, 9vw, 3.5rem)",
                lineHeight: 1.1,
              }}
              aria-label="Muhammad KL"
            >
              {letters.map((letter, i) => {
                // Skip animation for the space character
                if (letter.char === " ") {
                  return <span key={i} style={{ width: "0.3em", display: "inline-block" }} />;
                }
                return (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: letterDur,
                      delay: startDelay + stagger * i,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    style={{
                      color: letter.color,
                      display: "inline-block",
                      textShadow: letter.glow !== "transparent" ? `0 0 16px ${letter.glow}, 0 0 32px ${letter.glow}` : "none",
                      willChange: "opacity, transform, filter",
                    }}
                  >
                    {letter.char}
                  </motion.span>
                );
              })}
            </h1>
          </div>

          {/* Underline that grows in after letters — using inline style for mobile compatibility */}
          <motion.div
            className="relative z-10 mt-4 h-[2px]"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "180px", opacity: 1 }}
            transition={{
              delay: startDelay + stagger * letters.length + 0.1,
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{
              background: "linear-gradient(to right, transparent, var(--a1), transparent)",
              boxShadow: "0 0 8px color-mix(in oklab, var(--a1) 55%, transparent)",
              willChange: "width, opacity",
            }}
          />

          {/* Indicators */}
          <motion.div
            className="relative z-10 mt-8 flex gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {indicators.map((ind, i) => (
              <motion.div
                key={ind}
                className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 + i * 0.08, duration: 0.2 }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ backgroundColor: "var(--a1)" }}
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: 0.55 + i * 0.08, repeat: Infinity }}
                />
                {ind}
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 mt-6 h-px w-44 sm:w-56 overflow-hidden bg-surface-2">
            <motion.div
              className="h-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: totalDuration / 1000, ease: "linear" }}
              style={{ backgroundColor: "var(--a1)", boxShadow: "0 0 8px color-mix(in oklab, var(--a1) 70%, transparent)" }}
            />
          </div>

          <button
            onClick={skip}
            className="absolute bottom-6 right-6 z-10 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            [ Skip ]
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
