"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ArrowUpRight, Mail, MapPin, GraduationCap, Phone } from "lucide-react";
import { HeroSceneWithFallback } from "@/components/3d/hero-scene";
import { RotatingRoles } from "@/components/portfolio/rotating-roles";
import { MagneticButton } from "@/components/portfolio/magnetic-button";
import { ResumeMenu } from "@/components/portfolio/resume-menu";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import { useAppRouter } from "@/hooks/use-app-router";
import { profile, siteConfig, gmailComposeUrl } from "@/data/profile";
import { skillCategories, getSkillsByCategory } from "@/data/skills";
import { getFeaturedProjects, Project } from "@/data/projects";
import { ProjectModal } from "@/components/portfolio/project-modal";
import { cn } from "@/lib/utils";

export function HomePage() {
  const { navigate } = useAppRouter();
  const [activeProject, setActiveProject] = React.useState<Project | null>(null);

  const featuredProjects = getFeaturedProjects(5);
  const topSkills = React.useMemo(() => {
    return skillCategories
      .map((cat) => ({
        cat,
        items: getSkillsByCategory(cat.name).slice(0, 3),
      }))
      .slice(0, 6);
  }, []);

  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-grid"
        aria-label="Hero"
      >
        <div className="absolute inset-0">
          <HeroSceneWithFallback />
        </div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/40" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-16">
          <div className="max-w-3xl mx-auto text-center lg:mx-0 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.62_0.18_250_/_30%)] bg-[oklch(0.62_0.18_250_/_0.08)] px-3 py-1.5 text-[11px] uppercase tracking-[0.18em] text-[oklch(0.7_0.18_250)] backdrop-blur-md"
              style={{ boxShadow: "0 0 24px -4px oklch(0.62 0.18 250 / 35%)" }}
            >
              {/* More prominent blinking indicator */}
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[oklch(0.62_0.18_250)] opacity-90" />
                <span
                  className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[oklch(0.7_0.18_250)]"
                  style={{ animation: "blink 1.2s steps(2, end) infinite", boxShadow: "0 0 8px oklch(0.7 0.18 250 / 90%)" }}
                />
              </span>
              Available for opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display text-[2.25rem] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.0] sm:leading-[0.95]"
            >
              <span className="block text-foreground">Muhammad</span>
              <span className="block text-gradient-blue">Kashif Latif</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 flex items-center gap-2 h-7 justify-center lg:justify-start"
            >
              <span className="font-display text-base sm:text-xl md:text-2xl lg:text-3xl font-medium text-foreground/90">
                <RotatingRoles roles={profile.rotatingRoles} />
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 max-w-2xl mx-auto lg:mx-0 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
            >
              {profile.heroSubtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-3 justify-center lg:justify-start w-full sm:w-auto"
            >
              <MagneticButton
                onClick={() => navigate("projects")}
                className="group rounded-full bg-foreground px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors w-full sm:w-auto"
              >
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>

              <MagneticButton
                onClick={() => navigate("contact")}
                className="group rounded-full border border-white/[0.12] bg-white/[0.02] px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-medium text-foreground backdrop-blur-md hover:bg-white/[0.06] transition-colors w-full sm:w-auto"
              >
                Let's Connect
              </MagneticButton>

              <ResumeMenu variant="outline" className="w-full sm:w-auto" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
              className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground/80 justify-center lg:justify-start"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3 w-3 text-[oklch(0.72_0.15_195)]" />
                {profile.location}
              </span>
              <span className="flex items-center gap-1.5">
                <GraduationCap className="h-3 w-3 text-[oklch(0.62_0.18_250)]" />
                {profile.degree}
              </span>
              <a
                href={gmailComposeUrl(siteConfig.email, "Portfolio enquiry")}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-colors hover:text-foreground"
              >
                <Mail className="h-3 w-3 text-[oklch(0.55_0.22_295)]" />
                {siteConfig.email}
              </a>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/60"
        >
          <span>Scroll</span>
          <span className="relative h-8 w-px bg-gradient-to-b from-white/30 to-transparent overflow-hidden">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-[oklch(0.7_0.18_250)]"
              animate={{ y: [-12, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </section>

      {/* ===== ABOUT SECTION (right below the hero / scroll button) ===== */}
      <AboutSection />

      {/* ===== QUICK INTRODUCTION ===== */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quick Introduction"
            title={
              <>
                Building at the intersection of{" "}
                <span className="text-gradient-blue">software engineering</span> and{" "}
                <span className="text-gradient-cyan">artificial intelligence</span>.
              </>
            }
            description={profile.quickIntro}
          />

          <div className="mt-10 flex flex-wrap gap-2">
            {profile.focusAreas.map((focus, i) => (
              <motion.span
                key={focus}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.02] px-3.5 py-1.5 text-xs font-medium text-foreground/80 hover:border-white/[0.12] transition-colors"
              >
                <Sparkles className="h-3 w-3 text-[oklch(0.7_0.18_250)]" />
                {focus}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED SKILLS ===== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Featured Skills"
              title="A toolkit sharpened across the stack."
              description="From low-level embedded work through full-stack web to modern AI systems — each category is represented below."
            />
            <button
              onClick={() => navigate("skills")}
              className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              View all skills
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topSkills.map(({ cat, items }, idx) => (
              <SkillPreviewCard
                key={cat.name}
                category={cat}
                skills={items}
                index={idx}
                onClick={() => navigate("skills")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <SectionHeading
              eyebrow="Featured Projects"
              title="Selected work, built end-to-end."
              description="A glimpse of what I've shipped — from embedded AI systems to full-stack web applications."
            />
            <button
              onClick={() => navigate("projects")}
              className="group inline-flex w-fit items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              View all projects
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                index={i}
                onOpen={setActiveProject}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ===== GITHUB SNAPSHOT ===== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-card/40 p-8 sm:p-12">
            <div
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  "radial-gradient(ellipse at top right, oklch(0.62 0.18 250 / 8%) 0%, transparent 60%)",
              }}
            />
            <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div className="flex flex-col gap-4">
                <SectionHeading
                  eyebrow="GitHub Snapshot"
                  title={<>40+ repositories. 10,000+ contributions.</>}
                  description="I push consistently across AI experiments, full-stack apps, embedded systems, and ML models. Stats reflect activity across all public + private repositories."
                />
                <button
                  onClick={() => navigate("github")}
                  className="group mt-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/[0.06] transition-colors"
                >
                  View GitHub page
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <AnimatedStatBox label="Repositories" value={40} suffix="+" accent="blue" />
                <AnimatedStatBox label="Contributions" value={10000} suffix="+" accent="purple" />
                <AnimatedStatBox label="Stars earned" value={100} suffix="+" accent="cyan" />
                <AnimatedStatBox label="Languages" value={5} suffix="+" accent="gold" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CURRENT FOCUS ===== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Current Focus"
            title="Where my energy is going right now."
            description={profile.currentFocus}
            align="center"
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {profile.focusAreas.map((focus, i) => (
              <FocusCard key={focus} label={focus} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="relative py-24 sm:py-32 border-t border-white/[0.04]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight leading-[1.05]">
              Let's build intelligent products that{" "}
              <span className="text-gradient-blue">solve real problems.</span>
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
              I'm open to internships, collaborations, freelance work and meaningful
              conversations about AI, software engineering and automation.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
              <MagneticButton
                onClick={() => navigate("contact")}
                className="group rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
              >
                Start a conversation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </MagneticButton>
              <MagneticButton
                onClick={() => navigate("about")}
                className="group rounded-full border border-white/[0.12] bg-white/[0.02] px-7 py-3.5 text-sm font-medium text-foreground hover:bg-white/[0.06] transition-colors"
              >
                Read my story
              </MagneticButton>
            </div>
          </motion.div>
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

/* ---------- About section (text left + profile picture right) ---------- */
function AboutSection() {
  const { navigate } = useAppRouter();

  return (
    <section className="relative py-20 sm:py-24 border-t border-white/[0.04]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:gap-16 lg:grid-cols-[1.3fr_1fr] lg:items-center">
          {/* Left: About text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-5"
          >
            <SectionHeading
              eyebrow="About Me"
              title={
                <>
                  A CS student building at the{" "}
                  <span className="text-gradient-blue">intersection of software & AI</span>.
                </>
              }
              description={profile.quickIntro}
            />

            {/* Quick facts grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <FactPill label="Age" value={`${profile.age}`} accent="blue" />
              <FactPill label="Location" value={profile.location} accent="cyan" />
              <FactPill label="Degree" value="BS CS" accent="purple" />
              <FactPill label="University" value="Minhaj Univ." accent="blue" />
              <FactPill label="Stage" value="4th Sem." accent="gold" />
              <FactPill label="Focus" value="AI / Full-Stack" accent="cyan" />
            </div>

            {/* Focus areas */}
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.focusAreas.slice(0, 5).map((focus) => (
                <span
                  key={focus}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 text-xs text-foreground/80"
                >
                  <Sparkles className="h-3 w-3 text-[oklch(0.7_0.18_250)]" />
                  {focus}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-4">
              <button
                onClick={() => navigate("about")}
                className="group inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/[0.06] transition-colors"
              >
                Read full story
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </motion.div>

          {/* Right: Profile picture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 30 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto w-full max-w-[360px]"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-card/40 backdrop-blur-md">
              {/* Top status bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.65_0.18_22_/_70%)]" />
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.78_0.13_90_/_70%)]" />
                  <span className="h-2 w-2 rounded-full bg-[oklch(0.62_0.18_250_/_70%)]" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  mkl.profile
                </span>
              </div>

              {/* Picture */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src="/profile.png"
                  alt="Muhammad Kashif Latif — AI Engineer & Full Stack Developer"
                  className="h-full w-full object-cover object-top"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.62_0.18_250_/_0.08)] via-transparent to-[oklch(0.55_0.22_295_/_0.08)] mix-blend-overlay" />

                {/* Description overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-[oklch(0.7_0.18_250_/_80%)]">
                    {"// operator"}
                  </div>
                  <div className="font-display text-base font-semibold text-foreground">
                    {profile.name}
                  </div>
                  <div className="mt-0.5 text-[11px] text-muted-foreground">
                    {profile.age}yo · {profile.location} · {profile.degree}
                  </div>
                </div>
              </div>

              {/* Bottom tech tags */}
              <div className="flex flex-wrap gap-1 border-t border-white/[0.06] p-2.5">
                <span className="rounded-md border border-[oklch(0.62_0.18_250_/_30%)] bg-[oklch(0.62_0.18_250_/_0.06)] px-1.5 py-0.5 text-[9px] font-mono text-[oklch(0.7_0.18_250)]">AI</span>
                <span className="rounded-md border border-[oklch(0.55_0.22_295_/_30%)] bg-[oklch(0.55_0.22_295_/_0.06)] px-1.5 py-0.5 text-[9px] font-mono text-[oklch(0.65_0.2_295)]">Full-Stack</span>
                <span className="rounded-md border border-white/[0.08] bg-white/[0.02] px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">Embedded</span>
                <span className="rounded-md border border-white/[0.08] bg-white/[0.02] px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">Automation</span>
              </div>
            </div>

            {/* Floating accent glow behind picture */}
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-30 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.62 0.18 250 / 40%) 0%, transparent 60%), radial-gradient(circle at 70% 70%, oklch(0.55 0.22 295 / 40%) 0%, transparent 60%)",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FactPill({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "blue" | "purple" | "cyan" | "gold";
}) {
  const colors = {
    blue: "text-[oklch(0.7_0.18_250)] border-[oklch(0.62_0.18_250_/_30%)] bg-[oklch(0.62_0.18_250_/_0.06)]",
    purple: "text-[oklch(0.65_0.2_295)] border-[oklch(0.55_0.22_295_/_30%)] bg-[oklch(0.55_0.22_295_/_0.06)]",
    cyan: "text-[oklch(0.78_0.15_195)] border-[oklch(0.72_0.15_195_/_30%)] bg-[oklch(0.72_0.15_195_/_0.06)]",
    gold: "text-[oklch(0.82_0.13_90)] border-[oklch(0.78_0.13_90_/_30%)] bg-[oklch(0.78_0.13_90_/_0.06)]",
  };
  return (
    <div className={`rounded-xl border px-3 py-2.5 ${colors[accent]}`}>
      <div className="font-mono text-[9px] uppercase tracking-[0.16em] opacity-70">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-medium text-foreground truncate">
        {value}
      </div>
    </div>
  );
}

function SkillPreviewCard({
  category,
  skills,
  index,
  onClick,
}: {
  category: typeof skillCategories[number];
  skills: ReturnType<typeof getSkillsByCategory>;
  index: number;
  onClick: () => void;
}) {
  const accent = category.accent;
  const accentClasses: Record<string, string> = {
    blue: "border-[oklch(0.62_0.18_250_/_30%)] text-[oklch(0.7_0.18_250)]",
    purple: "border-[oklch(0.55_0.22_295_/_30%)] text-[oklch(0.65_0.2_295)]",
    cyan: "border-[oklch(0.72_0.15_195_/_30%)] text-[oklch(0.78_0.15_195)]",
    gold: "border-[oklch(0.78_0.13_90_/_30%)] text-[oklch(0.82_0.13_90)]",
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group relative flex flex-col gap-4 rounded-2xl border border-white/[0.06] bg-card/40 p-5 text-left transition-colors hover:border-white/[0.12] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
            accentClasses[accent]
          )}
        >
          <span className="h-1 w-1 rounded-full bg-current" />
          {category.name}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <p className="text-xs text-muted-foreground">{category.description}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {skills.map((s) => (
          <span
            key={s.name}
            className="rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-0.5 text-[11px] font-mono text-foreground/80"
          >
            {s.name}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function StatBox({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent: "blue" | "purple" | "cyan" | "gold";
}) {
  const colors = {
    blue: "text-[oklch(0.7_0.18_250)]",
    purple: "text-[oklch(0.65_0.2_295)]",
    cyan: "text-[oklch(0.78_0.15_195)]",
    gold: "text-[oklch(0.82_0.13_90)]",
  };
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
      <div className={cn("font-display text-3xl font-semibold tabular-nums", colors[accent])}>
        {value}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function FocusCard({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-card/40 p-4 transition-colors hover:border-white/[0.12]"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg border border-white/[0.06] bg-white/[0.02] font-mono text-xs text-muted-foreground">
        0{index + 1}
      </span>
      <span className="text-sm font-medium text-foreground/90">{label}</span>
    </motion.div>
  );
}

/**
 * Animated stat counter — counts up from 0 to the target value
 * when the element enters the viewport.
 */
function AnimatedStatBox({
  label,
  value,
  suffix = "",
  accent,
}: {
  label: string;
  value: number;
  suffix?: string;
  accent: "blue" | "purple" | "cyan" | "gold";
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [display, setDisplay] = React.useState(0);

  const colors = {
    blue: "text-[oklch(0.7_0.18_250)]",
    purple: "text-[oklch(0.65_0.2_295)]",
    cyan: "text-[oklch(0.78_0.15_195)]",
    gold: "text-[oklch(0.82_0.13_90)]",
  };

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.floor(eased * value));
            if (t < 1) requestAnimationFrame(tick);
            else setDisplay(value);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  const formatNum = (n: number) => {
    if (value >= 1000) return n.toLocaleString();
    return String(n);
  };

  return (
    <div ref={ref} className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 backdrop-blur-sm">
      <div className={cn("font-display text-3xl font-semibold tabular-nums", colors[accent])}>
        {formatNum(display)}{suffix}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
