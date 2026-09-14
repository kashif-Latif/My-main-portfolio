"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { useAppRouter } from "@/hooks/use-app-router";

/**
 * Fade + lift when the active route changes.
 *
 * Deliberately NOT built on `AnimatePresence mode="wait"`. That variant only
 * mounts the incoming page once the outgoing one reports its exit finished —
 * and if that callback is missed (a dropped frame on a long page, a navigation
 * fired mid-exit), the wrapper is left stranded at its exit values and the
 * whole page renders invisible while still being present in the DOM. It is a
 * hard failure mode for something whose only job is a 400 ms fade.
 *
 * Keying the element on `route` gives the same visual result: React remounts
 * it on every navigation, so `initial -> animate` replays each time. There is
 * no exit state that can strand the page.
 *
 * The blur was also dropped: filtering a multi-thousand-pixel subtree forces a
 * full-page re-raster every frame, which is the single most expensive thing on
 * this page on mid-range phones.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const { route } = useAppRouter();

  return (
    <motion.div
      key={route}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}
