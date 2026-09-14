"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, ExternalLink, Box } from "lucide-react";
import { Project, statusMeta } from "@/data/projects";
import { accentBorderClass, accentTextClass, accentBgClass } from "@/lib/accents";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index?: number;
  onOpen?: (project: Project) => void;
  variant?: "default" | "compact";
}

export function ProjectCard({
  project,
  index = 0,
  onOpen,
  variant = "default",
}: ProjectCardProps) {
  const sMeta = statusMeta[project.status];
  const accent = sMeta.accent;

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
      className={cn(
        "group chamfer chamfer-tr card-surface card-surface-hover relative flex w-full flex-col",
        "rounded-[26px] text-left transition-[box-shadow,border-color] duration-400",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
      aria-label={`Open project case study: ${project.title}`}
    >
      <div className={cn("relative flex flex-col gap-4 p-5 sm:p-6", variant === "compact" && "p-4")}>
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                "grid h-11 w-11 place-items-center rounded-2xl border",
                accentBorderClass[accent],
                accentBgClass[accent]
              )}
            >
              <Box className={cn("h-4.5 w-4.5", accentTextClass[accent])} strokeWidth={2} />
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                {project.category}
              </span>
              <span
                className={cn(
                  "text-[11px] font-semibold tracking-tight",
                  accentTextClass[accent]
                )}
              >
                {sMeta.label}
              </span>
            </div>
          </div>
          {/* Sits clear of the chamfered corner */}
          <span className="mt-6 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-surface-2 text-muted-foreground transition-colors duration-300 group-hover:bg-brand group-hover:text-ink">
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
          </span>
        </div>

        {/* Title & tagline */}
        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-lg font-bold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-brand sm:text-xl">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            {project.tagline}
          </p>
        </div>

        {variant === "default" && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground/90">
            {project.description}
          </p>
        )}

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-mono text-[10px] text-muted-foreground"
            >
              {tech}
            </span>
          ))}
          {project.stack.length > 5 && (
            <span className="rounded-full px-2 py-1 font-mono text-[10px] text-muted-foreground/70">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="mt-1 flex items-center justify-between border-t border-line pt-3">
          <span className="text-[11px] text-muted-foreground">{project.role}</span>
          <div className="flex items-center gap-1.5">
            {project.github && (
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(project.github, "_blank", "noopener,noreferrer");
                }}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
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
                  window.open(project.demo, "_blank", "noopener,noreferrer");
                }}
                className="grid h-8 w-8 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-surface-2 hover:text-foreground"
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
