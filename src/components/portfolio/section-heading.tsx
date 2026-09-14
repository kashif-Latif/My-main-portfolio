"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { SectionMark } from "@/components/portfolio/section-mark";
import { cn } from "@/lib/utils";
import { useReveal } from "@/hooks/use-reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  /** Renders on a dark band — flips the eyebrow and copy to panel colours. */
  onPanel?: boolean;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  onPanel = false,
  className,
}: SectionHeadingProps) {
  const { ref, isVisible } = useReveal<HTMLElement>();

  return (
    <motion.section
      ref={ref}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "inline-flex items-center gap-2.5 text-sm font-medium tracking-tight",
            onPanel ? "text-[var(--panel-foreground)]" : "text-foreground"
          )}
        >
          <SectionMark />
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "font-display text-[2rem] font-extrabold leading-[1.08] tracking-[-0.035em] sm:text-4xl md:text-5xl",
          onPanel ? "text-[var(--panel-foreground)]" : "text-foreground"
        )}
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "max-w-2xl text-base leading-relaxed sm:text-lg",
            onPanel ? "text-[var(--panel-muted)]" : "text-muted-foreground"
          )}
        >
          {description}
        </motion.p>
      )}
    </motion.section>
  );
}
