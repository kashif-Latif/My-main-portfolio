"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowUpRight } from "lucide-react";
import { skillCategories, skills, statusMeta, Skill, SkillStatus } from "@/data/skills";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { AccentColor, accentTextClass, accentBorderClass, accentBgClass } from "@/lib/accents";
import { useAppRouter } from "@/hooks/use-app-router";
import { cn } from "@/lib/utils";
import { languagesAndTools, techCategoryOrder, TechItem } from "@/data/languages";

const statusAccentMap: Record<SkillStatus, AccentColor> = {
  mastered: "cyan",
  proficient: "blue",
  learning: "purple",
  future: "gold",
};

export function SkillsPage() {
  const { navigate } = useAppRouter();
  const [activeSkill, setActiveSkill] = React.useState<Skill | null>(null);
  const [filter, setFilter] = React.useState<SkillStatus | "all">("all");

  const filteredSkills = React.useMemo(() => {
    if (filter === "all") return skills;
    return skills.filter((s) => s.status === filter);
  }, [filter]);

  const filterOptions: { value: SkillStatus | "all"; label: string }[] = [
    { value: "all", label: "All" },
    { value: "mastered", label: "Solid" },
    { value: "proficient", label: "Proficient" },
    { value: "learning", label: "Learning" },
    { value: "future", label: "Future" },
  ];

  return (
    <div className="relative">
      {/* ===== HEADER ===== */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Skills"
            title={
              <>
                An interactive{" "}
                <span className="text-gradient-blue">technology ecosystem</span>.
              </>
            }
            description="Hover or tap any node to inspect it. Each skill shows its category, current learning status and the projects where I've used it. Statuses are honest — I'd rather under-promise and over-deliver."
          />

          {/* Legend */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {filterOptions.map((opt) => {
              const count =
                opt.value === "all"
                  ? skills.length
                  : skills.filter((s) => s.status === opt.value).length;
              const isActive = filter === opt.value;
              return (
                <button
                  key={opt.value}
                  onClick={() => setFilter(opt.value)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                    isActive
                      ? "border-white/[0.16] bg-white/[0.06] text-foreground"
                      : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:text-foreground"
                  )}
                >
                  {opt.value !== "all" && (
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        accentBgClass[statusAccentMap[opt.value as SkillStatus]]
                      )}
                    />
                  )}
                  {opt.label}
                  <span className="text-[10px] text-muted-foreground/60 tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CATEGORIES GRID ===== */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-16">
          {skillCategories.map((cat, catIdx) => {
            const catSkills = filteredSkills.filter((s) => s.category === cat.name);
            if (catSkills.length === 0) return null;

            const accent = cat.accent;
            return (
              <div key={cat.name} className="flex flex-col gap-8">
                {/* Category header */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 pb-4 border-b border-white/[0.06]"
                >
                  <div className="flex flex-col gap-2">
                    <span
                      className={cn(
                        "inline-flex w-fit items-center gap-2 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                        accentBorderClass[accent],
                        accentTextClass[accent]
                      )}
                    >
                      <span className="h-1 w-1 rounded-full bg-current" />
                      Category 0{catIdx + 1}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight">
                      {cat.name}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground sm:text-right max-w-xs">
                    {cat.description}
                  </p>
                </motion.div>

                {/* Skills constellation grid */}
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {catSkills.map((skill, i) => (
                    <SkillNode
                      key={skill.name}
                      skill={skill}
                      index={i}
                      onClick={() => setActiveSkill(skill)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ===== LANGUAGES & TOOLS (icon grid) ===== */}
      <LanguagesAndToolsSection />

      {/* ===== DETAIL DRAWER ===== */}
      <SkillDetailDrawer
        skill={activeSkill}
        open={!!activeSkill}
        onOpenChange={(o) => !o && setActiveSkill(null)}
        onNavigateProjects={() => {
          setActiveSkill(null);
          navigate("projects");
        }}
      />
    </div>
  );
}

/* ---------- Skill Node ---------- */
function SkillNode({
  skill,
  index,
  onClick,
}: {
  skill: Skill;
  index: number;
  onClick: () => void;
}) {
  const accent = statusAccentMap[skill.status];
  const sizeClass =
    skill.weight >= 80
      ? "lg:col-span-1 xl:col-span-1"
      : skill.weight >= 60
      ? ""
      : "";

  return (
    <motion.button
      initial={{ opacity: 0, y: 16, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{
        duration: 0.5,
        delay: Math.min(index * 0.04, 0.3),
        ease: [0.16, 1, 0.3, 1],
      }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-3 rounded-2xl border border-white/[0.06] bg-card/40 p-4 text-left transition-colors hover:border-white/[0.16] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        sizeClass
      )}
      aria-label={`View details for ${skill.name}`}
    >
      {/* Hover glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 rounded-2xl"
        style={{
          background: `radial-gradient(circle at top right, var(--accent-glow-${accent}, transparent) 0%, transparent 70%)`,
        }}
      />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 relative">
        <span className="font-display text-base font-semibold tracking-tight text-foreground">
          {skill.name}
        </span>
        <span
          className={cn(
            "rounded-md border px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider",
            accentBorderClass[accent],
            accentTextClass[accent]
          )}
        >
          {statusMeta[skill.status].label}
        </span>
      </div>

      {/* Description */}
      <p className="text-xs text-muted-foreground leading-relaxed relative line-clamp-2">
        {skill.description}
      </p>

      {/* Weight bar (subtle) */}
      <div className="mt-auto relative">
        <div className="h-px w-full bg-white/[0.04]">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.weight}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={cn("h-full", accentBgClass[accent])}
          />
        </div>
      </div>

      {/* Hover indicator */}
      <div className="absolute top-3 right-3 opacity-0 transition-opacity group-hover:opacity-100">
        <ArrowUpRight className={cn("h-3 w-3", accentTextClass[accent])} />
      </div>
    </motion.button>
  );
}

/* ---------- Skill Detail Drawer (uses Dialog-like overlay) ---------- */
function SkillDetailDrawer({
  skill,
  open,
  onOpenChange,
  onNavigateProjects,
}: {
  skill: Skill | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigateProjects: () => void;
}) {
  if (!skill) return null;
  const accent = statusAccentMap[skill.status];
  const sMeta = statusMeta[skill.status];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-center sm:p-4"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full sm:max-w-md glass-strong rounded-t-3xl sm:rounded-3xl border border-white/[0.08] p-6 sm:p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-4 right-4 grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Status pill */}
            <span
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-wider",
                accentBorderClass[accent],
                accentTextClass[accent]
              )}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-current" />
              {sMeta.label}
            </span>

            {/* Name & category */}
            <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
              {skill.name}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">{skill.category}</p>

            {/* Description */}
            <p className="mt-4 text-sm text-foreground/85 leading-relaxed">
              {skill.description}
            </p>

            {/* Status description */}
            <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
              <p className="text-xs text-muted-foreground leading-relaxed">
                {sMeta.description}
              </p>
            </div>

            {/* Related projects */}
            <div className="mt-5">
              <h4 className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
                Related Projects
              </h4>
              {skill.relatedProjects && skill.relatedProjects.length > 0 ? (
                <div className="flex flex-wrap gap-1.5">
                  {skill.relatedProjects.map((p) => (
                    <span
                      key={p}
                      className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[11px] font-mono text-foreground/80"
                    >
                      {p}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground/70 italic">
                  No specific project linked yet.
                </p>
              )}
            </div>

            {/* CTA */}
            <button
              onClick={onNavigateProjects}
              className="mt-6 w-full inline-flex items-center justify-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-4 py-2.5 text-sm font-medium text-foreground hover:bg-white/[0.06] transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              Browse all projects
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Languages & Tools section ---------- */
function LanguagesAndToolsSection() {
  return (
    <section className="relative py-16 border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Languages & Tools"
          title="The full tech stack at a glance."
          description="Every language, framework, database and tool I work with — sourced from my GitHub profile README."
        />

        <div className="mt-10 flex flex-col gap-8">
          {techCategoryOrder.map((cat) => {
            const items = languagesAndTools.filter((t) => t.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="flex flex-col gap-4">
                <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {cat}
                  <span className="ml-2 text-muted-foreground/60">({items.length})</span>
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
                  {items.map((tech, i) => (
                    <TechIcon key={tech.name} tech={tech} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TechIcon({ tech, index }: { tech: TechItem; index: number }) {
  const [errored, setErrored] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.4) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3 transition-all hover:border-[oklch(0.62_0.18_250_/_30%)] hover:bg-[oklch(0.62_0.18_250_/_0.04)]"
      style={hovered ? { boxShadow: "0 0 24px -4px oklch(0.62 0.18 250 / 35%)" } : undefined}
    >
      <div className="relative h-8 w-8">
        {!errored ? (
          <img
            src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${tech.icon}/${tech.icon}-original.svg`}
            alt={tech.name}
            className="h-full w-full object-contain"
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-md border border-white/10 bg-white/[0.04] font-mono text-[9px] text-muted-foreground uppercase">
            {tech.name.slice(0, 2)}
          </div>
        )}
      </div>
      <span className="font-mono text-[10px] text-muted-foreground group-hover:text-foreground transition-colors text-center">
        {tech.name}
      </span>

      {/* Hover tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-[oklch(0.62_0.18_250_/_30%)] bg-background px-2 py-1 font-mono text-[9px] uppercase tracking-wider text-[oklch(0.7_0.18_250)] pointer-events-none"
          >
            {tech.category}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
