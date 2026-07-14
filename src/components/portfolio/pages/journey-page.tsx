"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CheckCircle2, Circle, Loader2, Sparkles, Compass } from "lucide-react";
import { journeyStages, currentlyExploring, JourneyStage } from "@/data/journey";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { AccentColor, accentTextClass, accentBorderClass, accentBgClass } from "@/lib/accents";
import { cn } from "@/lib/utils";

const stageAccent: Record<JourneyStage["accent"], AccentColor> = {
  blue: "blue",
  purple: "purple",
  cyan: "cyan",
  gold: "gold",
};

const statusIcon = {
  complete: CheckCircle2,
  active: Loader2,
  future: Circle,
};

const statusLabel: Record<JourneyStage["status"], string> = {
  complete: "Complete",
  active: "Currently active",
  future: "On the horizon",
};

export function JourneyPage() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.5", "end 0.5"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div className="relative">
      {/* ===== HEADER ===== */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="AI Journey"
            title={
              <>
                From{" "}
                <span className="text-gradient-blue">web foundations</span> to{" "}
                <span className="text-gradient-gold">agentic AI</span>.
              </>
            }
            description="A cinematic timeline of how I'm progressing from writing my first line of HTML toward building autonomous AI agent systems. Scroll to follow the path — each stage is a deliberate step."
          />
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section ref={containerRef} className="relative py-12 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Track */}
            <div className="absolute left-[19px] sm:left-1/2 sm:-translate-x-1/2 top-0 bottom-0 w-px bg-white/[0.06]" />

            {/* Animated progress line */}
            <motion.div
              style={{ height: lineHeight }}
              className="absolute left-[19px] sm:left-1/2 sm:-translate-x-1/2 top-0 w-px bg-gradient-to-b from-[oklch(0.62_0.18_250)] via-[oklch(0.55_0.22_295)] to-[oklch(0.78_0.13_90)]"
            />

            {/* Stages */}
            <div className="flex flex-col gap-12 sm:gap-16">
              {journeyStages.map((stage, i) => (
                <JourneyStageCard key={stage.id} stage={stage} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CURRENTLY EXPLORING ===== */}
      <section className="relative py-16 sm:py-24 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[0.06] bg-card/30 p-8 sm:p-12 relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at top left, oklch(0.78 0.13 90 / 6%) 0%, transparent 60%)",
              }}
            />
            <div className="relative grid gap-10 lg:grid-cols-[1fr_2fr] lg:items-center">
              <div>
                <SectionHeading
                  eyebrow="Currently Exploring"
                  title="The frontier I'm walking toward."
                  description="Topics I'm actively reading about, experimenting with and trying to turn into shippable projects."
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {currentlyExploring.map((topic, i) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                  >
                    <Compass className="h-3.5 w-3.5 text-[oklch(0.82_0.13_90)] mt-0.5 shrink-0" />
                    <span className="text-xs text-foreground/85 leading-relaxed">{topic}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Stage Card ---------- */
function JourneyStageCard({ stage, index }: { stage: JourneyStage; index: number }) {
  const accent = stageAccent[stage.accent];
  const isLeft = index % 2 === 0;
  const StatusIcon = statusIcon[stage.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "relative pl-12 sm:pl-0",
        "sm:grid sm:grid-cols-2 sm:gap-12"
      )}
    >
      {/* Node on the line */}
      <div
        className={cn(
          "absolute left-[12px] sm:left-1/2 sm:-translate-x-1/2 top-2 grid h-4 w-4 place-items-center",
          "rounded-full border-2 border-background z-10"
        )}
      >
        <div
          className={cn(
            "h-2 w-2 rounded-full",
            accentBgClass[accent],
            stage.status === "active" && "animate-pulse"
          )}
        />
      </div>

      {/* Content - alternating sides on desktop */}
      <div className={cn(isLeft ? "sm:col-start-1" : "sm:col-start-2")}>
        <div className="group relative rounded-2xl border border-white/[0.06] bg-card/40 p-5 sm:p-6 transition-colors hover:border-white/[0.12]">
          {/* Header row */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-col gap-1">
              <span
                className={cn(
                  "inline-flex w-fit items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                  accentBorderClass[accent],
                  accentTextClass[accent]
                )}
              >
                <span className="font-mono tabular-nums">0{stage.index}</span>
                {stage.title}
              </span>
              <p className="text-xs text-muted-foreground mt-1">{stage.subtitle}</p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <StatusIcon
                className={cn(
                  "h-4 w-4",
                  accentTextClass[accent],
                  stage.status === "active" && "animate-spin"
                )}
                style={{ animationDuration: "3s" }}
              />
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground">
                {statusLabel[stage.status]}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="mt-4 text-sm text-foreground/85 leading-relaxed">
            {stage.description}
          </p>

          {/* Items */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {stage.items.map((item) => (
              <span
                key={item}
                className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[10px] font-mono text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Empty placeholder for the other column - desktop only */}
      <div className="hidden sm:block" />
    </motion.div>
  );
}
