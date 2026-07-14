"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const indicators = ["Code", "Data", "AI", "Systems"];

/**
 * Loading sequence (blue theme):
 *  - "Muhammad KL" drawn-paths record plays
 *  - Blinking indicators + progress bar
 *  - Fade out
 *
 * On mobile: slightly longer duration to ensure all letters fully render.
 * On desktop: fast and snappy.
 */
export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [done, setDone] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setReduced(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
      setIsMobile(
        window.matchMedia("(max-width: 768px)").matches ||
          /Mobi|Android/i.test(navigator.userAgent)
      );
    }
  }, []);

  // Mobile gets slightly more time to ensure all letters render
  const totalDuration = reduced ? 500 : isMobile ? 1800 : 1200;

  React.useEffect(() => {
    const t = setTimeout(() => {
      setDone(true);
      setTimeout(onComplete, 300);
    }, totalDuration);
    return () => clearTimeout(t);
  }, [reduced, totalDuration, onComplete]);

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

  // Stagger timings — slightly slower on mobile for clarity
  const letterDur = isMobile ? 0.22 : 0.18;
  const stagger = isMobile ? 0.08 : 0.06;
  const startDelay = 0.1;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Background grid */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

          {/* Ambient glow */}
          <div
            className="absolute left-1/2 top-1/2 h-[40vmin] w-[40vmin] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, oklch(0.62 0.18 250 / 50%) 0%, transparent 70%)",
            }}
          />

          {/* "Muhammad KL" drawn from connected paths */}
          <div className="relative z-10 w-full max-w-[600px] px-4 flex justify-center">
            <svg
              width="100%"
              height="auto"
              viewBox="0 0 560 80"
              fill="none"
              className="relative z-10"
              style={{ maxWidth: "560px" }}
              aria-label="Muhammad KL system boot"
              preserveAspectRatio="xMidYMid meet"
            >
              {/* M — blue */}
              <motion.path
                d="M10 70 L10 15 L28 55 L46 15 L46 70"
                stroke="oklch(0.7 0.18 250)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 0, ease: "easeInOut" }}
              />
              {/* u */}
              <motion.path
                d="M62 30 L62 60 Q62 70 72 70 Q82 70 82 60 L82 30"
                stroke="#e8e6e1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 1, ease: "easeInOut" }}
              />
              {/* h */}
              <motion.path
                d="M96 15 L96 70 M96 40 Q96 30 106 30 Q116 30 116 45 L116 70"
                stroke="#e8e6e1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 2, ease: "easeInOut" }}
              />
              {/* a */}
              <motion.path
                d="M132 55 Q132 45 142 45 Q152 45 152 55 L152 70 M152 55 Q152 70 142 70 Q132 70 132 60"
                stroke="#e8e6e1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 3, ease: "easeInOut" }}
              />
              {/* m */}
              <motion.path
                d="M168 70 L168 40 M168 40 Q168 30 176 30 Q184 30 184 45 L184 70 M184 40 Q184 30 192 30 Q200 30 200 45 L200 70"
                stroke="#e8e6e1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 4, ease: "easeInOut" }}
              />
              {/* m (second) */}
              <motion.path
                d="M214 70 L214 40 M214 40 Q214 30 222 30 Q230 30 230 45 L230 70 M230 40 Q230 30 238 30 Q246 30 246 45 L246 70"
                stroke="#e8e6e1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 5, ease: "easeInOut" }}
              />
              {/* a (second) */}
              <motion.path
                d="M262 55 Q262 45 272 45 Q282 45 282 55 L282 70 M282 55 Q282 70 272 70 Q262 70 262 60"
                stroke="#e8e6e1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 6, ease: "easeInOut" }}
              />
              {/* d */}
              <motion.path
                d="M306 15 L306 70 M306 40 Q306 30 296 30 Q286 30 286 50 Q286 70 296 70 Q306 70 306 60"
                stroke="#e8e6e1"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 7, ease: "easeInOut" }}
              />

              {/* K — blue */}
              <motion.path
                d="M340 70 L340 15 M340 45 L370 15 M340 45 L370 70"
                stroke="oklch(0.7 0.18 250)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 8, ease: "easeInOut" }}
              />
              {/* L — purple */}
              <motion.path
                d="M395 15 L395 70 L440 70"
                stroke="oklch(0.65 0.2 295)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: letterDur, delay: startDelay + stagger * 9, ease: "easeInOut" }}
              />

              {/* System pulse traveling across */}
              <motion.circle
                cx="10"
                cy="70"
                r="4"
                fill="oklch(0.7 0.18 250)"
                initial={{ opacity: 0, cx: 10 }}
                animate={{ opacity: [0, 1, 0], cx: [10, 440] }}
                transition={{ duration: 0.6, delay: startDelay + stagger * 10, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Indicators */}
          <motion.div
            className="relative z-10 mt-6 flex gap-4 sm:gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {indicators.map((ind, i) => (
              <motion.div
                key={ind}
                className="flex items-center gap-1.5 font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.22em] text-muted-foreground"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + i * 0.06, duration: 0.2 }}
              >
                <motion.span
                  className="h-1.5 w-1.5 rounded-full bg-[oklch(0.62_0.18_250)]"
                  animate={{ opacity: [0.3, 1, 0.3] }}
                  transition={{ duration: 1, delay: 0.35 + i * 0.06, repeat: Infinity }}
                />
                {ind}
              </motion.div>
            ))}
          </motion.div>

          {/* Progress bar */}
          <div className="relative z-10 mt-6 h-px w-48 sm:w-56 overflow-hidden bg-white/10">
            <motion.div
              className="h-full bg-[oklch(0.62_0.18_250)]"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: totalDuration / 1000, ease: "linear" }}
              style={{ boxShadow: "0 0 8px oklch(0.62 0.18 250 / 80%)" }}
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
