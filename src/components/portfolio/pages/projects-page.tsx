"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
import { projects, projectCategories, ProjectCategory, Project } from "@/data/projects";
import { ProjectCard } from "@/components/portfolio/project-card";
import { ProjectModal } from "@/components/portfolio/project-modal";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { cn } from "@/lib/utils";

export function ProjectsPage() {
  const [activeCategory, setActiveCategory] = React.useState<ProjectCategory | "all">("all");
  const [query, setQuery] = React.useState("");
  const [activeProject, setActiveProject] = React.useState<Project | null>(null);

  const filtered = React.useMemo(() => {
    let list = projects;
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.stack.some((s) => s.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => b.weight - a.weight);
  }, [activeCategory, query]);

  return (
    <div className="relative">
      {/* ===== HEADER ===== */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Projects"
            title={
              <>
                Selected work across{" "}
                <span className="text-gradient-blue">embedded AI</span>,{" "}
                <span className="text-gradient-cyan">full-stack</span> &{" "}
                <span className="text-gradient-gold">machine learning</span>.
              </>
            }
            description="Every project below was built to learn something concrete — a new system, a new integration, or a new way of solving a real problem. Click any card to open the full case study."
          />

          {/* Controls */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects, tech, keywords..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full rounded-full border border-white/[0.08] bg-white/[0.02] pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-white/[0.16] transition-colors"
                aria-label="Search projects"
              />
            </div>

            {/* Category filter - desktop */}
            <div className="hidden sm:flex items-center gap-1.5 flex-wrap">
              <SlidersHorizontal className="h-3.5 w-3.5 text-muted-foreground" />
              {(["all", ...projectCategories] as const).map((cat) => {
                const isActive = activeCategory === cat;
                const count =
                  cat === "all"
                    ? projects.length
                    : projects.filter((p) => p.category === cat).length;
                if (count === 0) return null;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                      isActive
                        ? "border-white/[0.16] bg-white/[0.06] text-foreground"
                        : "border-white/[0.06] bg-white/[0.02] text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {cat === "all" ? "All" : cat}
                    <span className="text-[10px] text-muted-foreground/60 tabular-nums">
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category filter - mobile (scrollable) */}
          <div className="sm:hidden mt-3 -mx-4 px-4 flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
            {(["all", ...projectCategories] as const).map((cat) => {
              const isActive = activeCategory === cat;
              const count =
                cat === "all"
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "shrink-0 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                    isActive
                      ? "border-white/[0.16] bg-white/[0.06] text-foreground"
                      : "border-white/[0.06] bg-white/[0.02] text-muted-foreground"
                  )}
                >
                  {cat === "all" ? "All" : cat}
                  <span className="text-[10px] text-muted-foreground/60 tabular-nums">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== GRID ===== */}
      <section className="relative py-12 pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-24 text-center">
              <Search className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">
                No projects match your search. Try a different filter.
              </p>
              <button
                onClick={() => {
                  setQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs text-foreground/80 underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  index={i}
                  onOpen={setActiveProject}
                />
              ))}
            </motion.div>
          )}
        </div>
      </section>

      <ProjectModal
        project={activeProject}
        open={!!activeProject}
        onOpenChange={(o) => !o && setActiveProject(null)}
      />
    </div>
  );
}
