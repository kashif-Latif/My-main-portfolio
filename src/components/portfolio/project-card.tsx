"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Box } from "lucide-react";
import { Project, statusMeta } from "@/data/projects";
import { AccentColor, accentBorderClass, accentTextClass, accentBgClass } from "@/lib/accents";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  onOpen?: (project: Project) => void;
  variant?: "default" | "compact";
}

const statusAccent: Record<string, AccentColor> = {
  blue: "blue",
  purple: "purple",
  cyan: "cyan",
  gold: "gold",
};

export function ProjectCard({ project, index = 0, onOpen, variant = "default" }: ProjectCardProps) {
  const sMeta = statusMeta[project.status];
  const accent = statusAccent[sMeta.accent];

  return (
    <motion.button
      type="button"
      onClick={() => onOpen?.(project)}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        delay: Math.min(index * 0.06, 0.4),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -4 }}
      className="group relative flex w-full flex-col overflow-hidden rounded-2xl border border-white/[0.06] bg-card/50 text-left transition-colors duration-500 hover:border-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
      aria-label={`Open project case study: ${project.title}`}
    >
      {/* Gradient sheen on hover */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.62 0.18 250 / 6%) 0%, transparent 60%)",
        }}
      />

      {/* Top accent line */}
      <div className={cn("h-px w-full bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-60")} />

      <div className={cn("relative flex flex-col gap-4 p-5 sm:p-6", variant === "compact" && "p-4")}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid h-10 w-10 place-items-center rounded-xl border",
                accentBorderClass[accent],
                accentBgClass[accent]
              )}
            >
              <Box className={cn("h-4 w-4", accentTextClass[accent])} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {project.category}
              </span>
              <span
                className={cn(
                  "text-[10px] font-medium uppercase tracking-wider",
                  accentTextClass[accent]
                )}
              >
                {sMeta.label}
              </span>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        {/* Title & tagline */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-lg sm:text-xl font-semibold tracking-tight text-foreground group-hover:text-gradient-blue">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Description (only on default variant) */}
        {variant === "default" && (
          <p className="text-sm text-muted-foreground/90 leading-relaxed line-clamp-3">
            {project.description}
          </p>
        )}

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="rounded-md px-2 py-0.5 text-[10px] font-mono text-muted-foreground/70">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-1 flex items-center justify-between border-t border-white/[0.04] pt-3">
          <span className="text-[11px] text-muted-foreground">{project.role}</span>
          <div className="flex items-center gap-1.5">
            {project.github && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.github, "_blank");
                }}
                className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
                role="link"
                aria-label="View source on GitHub"
              >
                <Github className="h-3.5 w-3.5" />
              </span>
            )}
            {project.demo && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.demo, "_blank");
                }}
                className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
                role="link"
                aria-label="Open live demo"
              >
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.button>
  );
}
