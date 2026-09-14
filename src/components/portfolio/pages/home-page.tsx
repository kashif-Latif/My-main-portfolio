"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ArrowUpRight, Mail, MapPin, GraduationCap, Phone } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { HeroFallback } from "@/components/3d/hero-fallback";

// PERF FIX: hero-scene pulls in Three.js (~1.2 MB raw / ~150 KB gzip).
// It used to be imported statically, so every visitor downloaded and
// parsed all of it before anything was interactive. It now loads lazily
// after first paint, with the pure-CSS fallback showing in the meantime
// — visually seamless, and the initial bundle drops by over a megabyte.
const HeroSceneWithFallback = dynamic(
  () =>
    import("@/components/3d/hero-scene").then((m) => m.HeroSceneWithFallback),
  { ssr: false, loading: () => <HeroFallback /> }
);
import { RotatingRoles } from "@/components/portfolio/rotating-roles";
import { BrandButton } from "@/components/portfolio/brand-button";
import { Marquee } from "@/components/portfolio/marquee";
import { ResumeMenu } from "@/components/portfolio/resume-menu";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { ProjectCard } from "@/components/portfolio/project-card";
import { useAppRouter } from "@/hooks/use-app-router";
import { profile, siteConfig, gmailComposeUrl } from "@/data/profile";
import { skillCategories, getSkillsByCategory } from "@/data/skills";
import { getFeaturedProjects, Project } from "@/data/projects";
import { ProjectModal } from "@/components/portfolio/project-modal";
import {
  AccentColor,
  accentTextClass,
  accentBorderClass,
  accentBgClass,
} from "@/lib/accents";
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
        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-grid"
        aria-label="Hero"
      >
        <div className="absolute inset-0">
          <HeroSceneWithFallback />
        </div>

        {/* Ground the 3D scene into the page colour so type stays readable */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/50 via-background/20 to-background" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background/85 via-background/10 to-background/40" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-32 pb-20 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center lg:mx-0 lg:max-w-none lg:flex-row lg:items-end lg:justify-between lg:text-left">
            <div className="lg:max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2.5 rounded-full border border-line bg-card px-4 py-2 text-[12px] font-medium tracking-tight text-foreground shadow-[var(--shadow-card)]"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-80" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
                </span>
                Available for opportunities
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 font-display text-[2.5rem] font-extrabold leading-[1.02] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-[5.25rem]"
              >
                <span className="block text-foreground">I&rsquo;m Muhammad</span>
                <span className="block text-brand">Kashif Latif</span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 flex h-8 items-center justify-center gap-2 lg:justify-start"
              >
                <span className="font-display text-lg font-semibold tracking-tight text-foreground/80 sm:text-2xl lg:text-3xl">
                  <RotatingRoles roles={profile.rotatingRoles} />
                </span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base lg:mx-0 lg:text-lg"
              >
                {profile.heroSubtitle}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="mt-8 flex w-full flex-col justify-center gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-3 lg:justify-start"
              >
                <BrandButton
                  onClick={() => navigate("projects")}
                  variant="brand"
                  arrow="right"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Explore My Work
                </BrandButton>

                <BrandButton
                  onClick={() => navigate("contact")}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Let&rsquo;s Connect
                </BrandButton>

                <ResumeMenu variant="outline" className="w-full sm:w-auto" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground lg:justify-start"
              >
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-brand" />
                  {profile.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-brand" />
                  {profile.degree}
                </span>
                <a
                  href={gmailComposeUrl(siteConfig.email, "Portfolio enquiry")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 transition-colors hover:text-brand"
                >
                  <Mail className="h-3.5 w-3.5 text-brand" />
                  {siteConfig.email}
                </a>
              </motion.div>
            </div>

            <HireMeBadge />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex"
        >
          <span>Scroll</span>
          <span className="relative h-8 w-px overflow-hidden bg-line-strong">
            <motion.span
              className="absolute inset-x-0 top-0 h-3 bg-brand"
              animate={{ y: [-12, 32] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </section>

      {/* ===== MARQUEE BAND ===== */}
      <Marquee items={profile.focusAreas.slice(0, 6)} />

      {/* ===== ABOUT SECTION (right below the hero / scroll button) ===== */}
      <AboutSection />

      {/* ===== QUICK INTRODUCTION ===== */}
      <section className="relative py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Quick Introduction"
            title={
              <>
                Building at the intersection of{" "}
                <span className="text-grad-brand">software engineering</span> and{" "}
                <span className="text-grad-warm">artificial intelligence</span>.
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
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-xs font-medium text-foreground/80 hover:border-line-strong transition-colors"
              >
                <Sparkles className="h-3 w-3 text-a1" />
                {focus}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED SKILLS ===== */}
      <section className="relative py-20 sm:py-28 border-t border-line">
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
      <section className="relative py-20 sm:py-28 border-t border-line">
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

      {/* ===== GITHUB SNAPSHOT =====
           Rendered as a dark band so the page alternates cream → espresso →
           cream, which is what gives the reference layout its rhythm. */}
      <section className="relative border-t border-line py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className="panel chamfer chamfer-tr relative overflow-hidden rounded-[32px] p-8 sm:p-12"
            style={{ ["--chamfer-size" as string]: "56px" }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at top right, color-mix(in oklab, var(--brand) 18%, transparent) 0%, transparent 62%)",
              }}
            />
            <div className="relative grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div className="flex flex-col gap-4">
                <SectionHeading
                  onPanel
                  eyebrow="GitHub Snapshot"
                  title={
                    <>
                      40+ repositories.{" "}
                      <span className="text-brand">10,000+ contributions.</span>
                    </>
                  }
                  description="I push consistently across AI experiments, full-stack apps, embedded systems, and ML models. Stats reflect activity across all public + private repositories."
                />
                <button
                  onClick={() => navigate("github")}
                  className="group mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-brand py-2 pl-5 pr-2 text-sm font-semibold text-ink transition-colors hover:bg-brand-deep"
                >
                  View GitHub page
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-[var(--panel)] text-brand transition-transform duration-300 group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <AnimatedStatBox label="Repositories" value={40} suffix="+" accent="amber" />
                <AnimatedStatBox label="Contributions" value={10000} suffix="+" accent="rust" />
                <AnimatedStatBox label="Stars earned" value={100} suffix="+" accent="golden" />
                <AnimatedStatBox label="Languages" value={5} suffix="+" accent="sand" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CURRENT FOCUS ===== */}
      <section className="relative py-20 sm:py-28 border-t border-line">
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
      <section className="relative py-20 sm:py-28 border-t border-line">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-5xl md:text-6xl">
              Let&rsquo;s build intelligent products that{" "}
              <span className="text-brand">solve real problems.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              I&rsquo;m open to internships, collaborations, freelance work and meaningful
              conversations about AI, software engineering and automation.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <BrandButton
                onClick={() => navigate("contact")}
                variant="brand"
                arrow="right"
                size="lg"
              >
                Start a conversation
              </BrandButton>
              <BrandButton
                onClick={() => navigate("about")}
                variant="outline"
                size="lg"
              >
                Read my story
              </BrandButton>
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

/** Rotating amber seal from the reference hero. SVG textPath + one CSS
 *  rotation — no image, no library, and it respects reduced motion. */
function HireMeBadge() {
  const { navigate } = useAppRouter();
  return (
    <motion.button
      type="button"
      onClick={() => navigate("contact")}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.06 }}
      className="relative mt-12 hidden h-32 w-32 shrink-0 place-items-center rounded-full bg-foreground text-background focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:grid"
      aria-label="Get in touch — available for hire"
    >
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full animate-[spin-slow_14s_linear_infinite]"
        aria-hidden="true"
      >
        <defs>
          <path
            id="hire-me-arc"
            d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0"
            fill="none"
          />
        </defs>
        <text className="fill-background text-[10px] font-semibold uppercase tracking-[0.22em]">
          <textPath href="#hire-me-arc" startOffset="0">
            Hire me &middot; Available now &middot; Hire me &middot;
          </textPath>
        </text>
      </svg>
      <span className="grid h-11 w-11 place-items-center rounded-full bg-brand text-ink">
        <ArrowRight className="h-5 w-5" strokeWidth={2.5} />
      </span>
    </motion.button>
  );
}

/* ---------- About section (text left + profile picture right) ---------- */
function AboutSection() {
  const { navigate } = useAppRouter();

  return (
    <section className="relative py-20 sm:py-24 border-t border-line">
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
                  <span className="text-grad-brand">intersection of software & AI</span>.
                </>
              }
              description={profile.quickIntro}
            />

            {/* Quick facts grid */}
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
              <FactPill label="Age" value={`${profile.age}`} accent="amber" />
              <FactPill label="Location" value={profile.location} accent="golden" />
              <FactPill label="Degree" value="BS CS" accent="rust" />
              <FactPill label="University" value="Minhaj Univ." accent="amber" />
              <FactPill label="Stage" value="4th Sem." accent="sand" />
              <FactPill label="Focus" value="AI / Full-Stack" accent="golden" />
            </div>

            {/* Focus areas */}
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.focusAreas.slice(0, 5).map((focus) => (
                <span
                  key={focus}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3 py-1 text-xs text-foreground/80"
                >
                  <Sparkles className="h-3 w-3 text-a1" />
                  {focus}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-4">
              <button
                onClick={() => navigate("about")}
                className="group inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-5 py-2.5 text-sm font-medium text-foreground hover:bg-surface-2 transition-colors"
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
            <div className="relative overflow-hidden card-surface rounded-[22px] backdrop-blur-md">
              {/* Top status bar */}
              <div className="flex items-center justify-between border-b border-line px-4 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-destructive/70" />
                  <span className="h-2 w-2 rounded-full bg-a4/70" />
                  <span className="h-2 w-2 rounded-full bg-a1/70" />
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  mkl.profile
                </span>
              </div>

              {/* Picture */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* FIX: was a raw <img> pointing at a 978 KB PNG with no
                    dimensions — a full-second download on 3G plus a layout
                    shift. Now a 24 KB WebP through next/image, which also
                    serves responsive sizes and modern formats on Vercel. */}
                <Image
                  src="/profile.webp"
                  alt="Muhammad Kashif Latif — AI Engineer & Full Stack Developer"
                  fill
                  sizes="(max-width: 1024px) 90vw, 420px"
                  className="object-cover object-top"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-a1/8 via-transparent to-a2/8 mix-blend-overlay" />

                {/* Description overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-a1/80">
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
              <div className="flex flex-wrap gap-1 border-t border-line p-2.5">
                <span className="rounded-md border border-a1/30 bg-a1/6 px-1.5 py-0.5 text-[9px] font-mono text-a1">AI</span>
                <span className="rounded-md border border-a2/30 bg-a2/6 px-1.5 py-0.5 text-[9px] font-mono text-a2">Full-Stack</span>
                <span className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">Embedded</span>
                <span className="rounded-md border border-line bg-surface px-1.5 py-0.5 text-[9px] font-mono text-muted-foreground">Automation</span>
              </div>
            </div>

            {/* Floating accent glow behind picture */}
            <div
              className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl opacity-30 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, color-mix(in oklab, var(--a1) 40%, transparent) 0%, transparent 60%), radial-gradient(circle at 70% 70%, color-mix(in oklab, var(--a2) 40%, transparent) 0%, transparent 60%)",
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
  accent: AccentColor;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border px-3 py-2.5",
        accentTextClass[accent],
        accentBorderClass[accent],
        accentBgClass[accent]
      )}
    >
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

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.06, 0.4), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -2 }}
      onClick={onClick}
      className="group relative flex flex-col gap-4 card-surface rounded-[22px] p-5 text-left transition-colors hover:border-line-strong focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      <div className="flex items-center justify-between">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
            accentBorderClass[accent],
            accentTextClass[accent]
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
            className="rounded-md border border-line bg-surface px-2 py-0.5 text-[11px] font-mono text-foreground/80"
          >
            {s.name}
          </span>
        ))}
      </div>
    </motion.button>
  );
}

function FocusCard({ label, index }: { label: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.4), ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-center gap-3 card-surface rounded-[22px] p-4 transition-colors hover:border-line-strong"
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg border border-line bg-surface font-mono text-xs text-muted-foreground">
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
  accent: AccentColor;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  // FIX: the initial state used to be 0, so the server HTML (and anyone
  // on a slow connection, and Google's crawler) saw "0+ Repositories"
  // directly under a heading claiming "40+". We now render the REAL
  // value first and treat the count-up as a progressive enhancement.
  const [display, setDisplay] = React.useState(value);


  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return; // value is already shown — nothing to animate
    }

    let raf = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const duration = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.floor(eased * value));
            if (t < 1) raf = requestAnimationFrame(tick);
            else setDisplay(value);
          };
          raf = requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  const formatNum = (n: number) => {
    if (value >= 1000) return n.toLocaleString();
    return String(n);
  };

  return (
    <div
      ref={ref}
      className="rounded-[22px] border border-[var(--panel-line)] bg-[var(--panel-line)] p-4"
    >
      <div className={cn("font-display text-3xl font-extrabold tabular-nums", accentTextClass[accent])}>
        {formatNum(display)}
        {suffix}
      </div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[var(--panel-muted)]">
        {label}
      </div>
    </div>
  );
}
