"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { GraduationCap, Briefcase, MapPin } from "lucide-react";
import { workExperience, education } from "@/data/experience";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { accentTextClass, accentBgClass, accentBorderClass } from "@/lib/accents";
import { cn } from "@/lib/utils";

/* ---------- Shared card shell ---------- */
function Panel({
  icon: Icon,
  title,
  children,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className="card-surface chamfer chamfer-br flex flex-col gap-5 rounded-[28px] p-6 sm:p-7"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand text-ink">
          <Icon className="h-5 w-5" strokeWidth={2.25} />
        </span>
        <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground sm:text-2xl">
          {title}
        </h3>
      </div>

      <div
        className="h-px w-full"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to right, var(--line-strong) 0 6px, transparent 6px 12px)",
        }}
      />

      <div className="flex flex-col gap-4">{children}</div>
    </motion.div>
  );
}

/** One row: name + sub on the left, a dark period pill on the right. */
function Row({
  name,
  sub,
  period,
  live = false,
}: {
  name: string;
  sub: string;
  period: string;
  live?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="min-w-0">
        <div className="font-display text-base font-bold tracking-tight text-foreground sm:text-lg">
          {name}
        </div>
        <div className="mt-0.5 text-sm text-muted-foreground">{sub}</div>
      </div>
      <span
        className={cn(
          "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[12px] font-semibold tracking-tight",
          live
            ? "bg-brand text-ink"
            : "bg-[var(--panel)] text-[var(--panel-foreground)]"
        )}
      >
        {live && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink opacity-70" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-ink" />
          </span>
        )}
        {period}
      </span>
    </div>
  );
}

/* ---------- Detail card for the role currently held ---------- */
function CurrentRoleCard() {
  const role = workExperience.find((w) => w.current) ?? workExperience[0];
  if (!role) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="panel chamfer chamfer-tr relative mt-5 overflow-hidden rounded-[28px] p-6 sm:p-9"
      style={{ ["--chamfer-size" as string]: "48px" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(ellipse at top right, color-mix(in oklab, var(--brand) 18%, transparent) 0%, transparent 62%)",
        }}
      />

      <div className="relative flex flex-col gap-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-2 rounded-full bg-brand px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-ink">
                Currently
              </span>
              <span className="inline-flex items-center gap-1.5 text-[12px] text-[var(--panel-muted)]">
                <MapPin className="h-3.5 w-3.5" />
                {role.location}
              </span>
            </div>
            <h3 className="mt-3 font-display text-2xl font-extrabold leading-tight tracking-tight text-[var(--panel-foreground)] sm:text-3xl">
              {role.role} <span className="text-brand">@ {role.company}</span>
            </h3>
          </div>

          <div className="text-right">
            <div className="font-display text-xl font-extrabold text-brand sm:text-2xl">
              {role.duration}
            </div>
            <div className="text-[12px] text-[var(--panel-muted)]">{role.period}</div>
          </div>
        </div>

        <p className="max-w-3xl text-sm leading-relaxed text-[var(--panel-muted)] sm:text-base">
          {role.summary}
        </p>

        <ul className="flex flex-col gap-3">
          {role.highlights.map((h) => (
            <li
              key={h}
              className="flex gap-3 text-sm leading-relaxed text-[var(--panel-foreground)]"
            >
              <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {role.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-[var(--panel-line)] px-2.5 py-1 font-mono text-[11px] text-[var(--panel-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- Public section ---------- */
export function ExperienceSection({
  showHeading = true,
}: {
  /** Home renders its own lead-in, so the heading can be suppressed there. */
  showHeading?: boolean;
}) {
  return (
    <div className="flex flex-col gap-10">
      {showHeading && (
        <SectionHeading
          eyebrow="Education & Work"
          title={
            <>
              My <span className="text-brand">academic and professional</span>{" "}
              journey.
            </>
          }
          description="Where I study, where I work, and what I'm shipping right now."
        />
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        <Panel icon={GraduationCap} title="Education">
          {education.map((e) => (
            <Row
              key={e.id}
              name={e.institution}
              sub={e.qualification}
              period={e.period}
            />
          ))}
        </Panel>

        <Panel icon={Briefcase} title="Work Experience" delay={0.08}>
          {workExperience.map((w) => (
            <Row
              key={w.id}
              name={w.company}
              sub={w.role}
              period={w.current ? "Present" : w.period}
              live={w.current}
            />
          ))}
        </Panel>
      </div>

      <CurrentRoleCard />
    </div>
  );
}

/* ---------- Compact strip for the Home page ---------- */
export function ExperienceStrip() {
  const role = workExperience.find((w) => w.current) ?? workExperience[0];
  if (!role) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_1.15fr] lg:items-center">
      <SectionHeading
        eyebrow="Experience"
        title={
          <>
            Shipping production software at{" "}
            <span className="text-brand">{role.company}</span>.
          </>
        }
        description={role.summary}
      />

      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col gap-3"
      >
        {role.highlights.map((h, i) => (
          <li
            key={h}
            className={cn(
              "card-surface flex items-start gap-3.5 rounded-[20px] p-4",
              i === 0 && "chamfer chamfer-tr"
            )}
          >
            <span
              className={cn(
                "grid h-8 w-8 shrink-0 place-items-center rounded-full border font-mono text-[11px] font-semibold",
                accentBorderClass[role.accent],
                accentBgClass[role.accent],
                accentTextClass[role.accent]
              )}
            >
              0{i + 1}
            </span>
            <span className="text-sm leading-relaxed text-foreground/90">{h}</span>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}
