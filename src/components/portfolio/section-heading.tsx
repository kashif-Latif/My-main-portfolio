"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <motion.section
      ref={ref}
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          <span className="h-px w-6 bg-gradient-to-r from-[oklch(0.62_0.18_250)] to-transparent" />
          {eyebrow}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-foreground"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "text-base sm:text-lg text-muted-foreground leading-relaxed",
            align === "center" ? "max-w-2xl" : "max-w-2xl"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.section>
  );
}
