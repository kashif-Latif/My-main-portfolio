"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RotatingRolesProps {
  roles: readonly string[];
  interval?: number;
  className?: string;
}

/**
 * Cycles through role strings with a smooth fade + slide transition.
 * Respects prefers-reduced-motion (no animation, just static text).
 */
export function RotatingRoles({ roles, interval = 2400, className }: RotatingRolesProps) {
  const [idx, setIdx] = React.useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setPrefersReducedMotion(
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      );
    }
  }, []);

  React.useEffect(() => {
    if (prefersReducedMotion || roles.length <= 1) return;
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % roles.length);
    }, interval);
    return () => clearInterval(t);
  }, [roles.length, interval, prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <span className={className}>{roles[0]}</span>;
  }

  return (
    <span className={className}>
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="inline-block"
        >
          {roles[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
