"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppRouter } from "@/hooks/use-app-router";

/**
 * Wraps children in a smooth fade + slight vertical movement
 * page transition whenever the active route changes.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const { route } = useAppRouter();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={route}
        initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -8, filter: "blur(8px)" }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
