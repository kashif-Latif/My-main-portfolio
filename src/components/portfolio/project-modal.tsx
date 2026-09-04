"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  X,
  Github,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  Target,
  CheckCircle2,
  Box,
} from "lucide-react";
import { Project, statusMeta } from "@/data/projects";
import { AccentColor, accentTextClass, accentBorderClass, accentBgClass } from "@/lib/accents";
import { cn } from "@/lib/utils";

interface ProjectModalProps {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const statusAccent: Record<string, AccentColor> = {
  blue: "blue",
  purple: "purple",
  cyan: "cyan",
  gold: "gold",
};

export function ProjectModal({ project, open, onOpenChange }: ProjectModalProps) {
  if (!project) return null;
  const sMeta = statusMeta[project.status];
  const accent = statusAccent[sMeta.accent];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-3xl max-h-[90vh] overflow-hidden p-0 gap-0 bg-card/95 backdrop-blur-2xl border-white/[0.08]"
        aria-describedby={undefined}
      >
        <DialogTitle className="sr-only">{project.title}</DialogTitle>

        <div className="flex flex-col max-h-[90vh]">
          {/* Hero header */}
          <div className="relative overflow-hidden border-b border-white/[0.06] p-6 sm:p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at top right, oklch(0.62 0.18 250 / 8%) 0%, transparent 60%)",
              }}
            />
            <div className="relative flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-xl border shrink-0",
                    accentBorderClass[accent],
                    accentBgClass[accent]
                  )}
                >
                  <Box className={cn("h-5 w-5", accentTextClass[accent])} />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {project.category}
                  </span>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                    {project.title}
                  </h2>
                  <p className="text-sm text-muted-foreground">{project.tagline}</p>
                </div>
              </div>
              <button
                onClick={() => onOpenChange(false)}
                className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors shrink-0"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Scrollable body */}
          <div className="overflow-y-auto scrollbar-premium p-6 sm:p-8 space-y-8">
            {/* Status & role */}
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wider",
                  accentBorderClass[accent],
                  accentTextClass[accent]
                )}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-current" />
                {sMeta.label}
              </span>
              <span className="text-sm text-muted-foreground">{project.role}</span>
            </div>

            {/* Description */}
            <section>
              <p className="text-base text-foreground/90 leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* Problem / Solution */}
            <div className="grid gap-6 sm:grid-cols-2">
              <section className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  <Target className="h-3.5 w-3.5" />
                  Problem
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.problem}
                </p>
              </section>
              <section className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[oklch(0.7_0.18_250)]">
                  <Lightbulb className="h-3.5 w-3.5" />
                  Solution
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.solution}
                </p>
              </section>
            </div>

            {/* Tech stack */}
            <section className="space-y-3">
              <h3 className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2.5 py-1 text-xs font-mono text-foreground/90"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {/* Challenges */}
            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <AlertTriangle className="h-3.5 w-3.5" />
                Technical Challenges
              </h3>
              <ul className="space-y-2">
                {project.challenges.map((c, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-2 h-1 w-1 rounded-full bg-[oklch(0.62_0.18_250)] shrink-0" />
                    {c}
                  </li>
                ))}
              </ul>
            </section>

            {/* Learnings */}
            <section className="space-y-3">
              <h3 className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Key Learnings
              </h3>
              <ul className="space-y-2">
                {project.learnings.map((l, i) => (
                  <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                    <span className="mt-2 h-1 w-1 rounded-full bg-[oklch(0.65_0.2_295)] shrink-0" />
                    {l}
                  </li>
                ))}
              </ul>
            </section>

            {/* Placeholder note */}
            <section className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-foreground/80 font-medium">Note:</span> GitHub
                and live demo links are placeholders. They will be wired up when the
                real repositories are public.
              </p>
            </section>
          </div>

          {/* Footer actions */}
          <div className="flex flex-wrap items-center gap-3 border-t border-white/[0.06] p-4 sm:p-6 bg-card/80">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm text-foreground hover:bg-white/[0.06] transition-colors"
              >
                <Github className="h-4 w-4" />
                View Source
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.01] px-4 py-2 text-sm text-muted-foreground/60">
                <Github className="h-4 w-4" />
                GitHub link pending
              </span>
            )}
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.62_0.18_250)] px-4 py-2 text-sm font-medium text-white hover:bg-[oklch(0.55_0.18_250)] transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                Live Demo
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.01] px-4 py-2 text-sm text-muted-foreground/60">
                <ExternalLink className="h-4 w-4" />
                Demo pending
              </span>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
