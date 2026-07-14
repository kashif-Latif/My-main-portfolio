"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  BookOpen,
  Code2,
  Trophy,
  TrendingUp,
  Star,
  GitFork,
  Mail,
  ExternalLink,
  Briefcase,
  GraduationCap,
  Terminal,
  Phone,
} from "lucide-react";
import { siteConfig, profile, gmailComposeUrl } from "@/data/profile";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { skills } from "@/data/skills";
import { AccentColor, accentTextClass, accentBorderClass, accentBgClass } from "@/lib/accents";
import { useAppRouter } from "@/hooks/use-app-router";
import { cn } from "@/lib/utils";

const interviewTopics = [
  "JavaScript",
  "Python",
  "HTML",
  "CSS",
  "Node.js",
  "Express.js",
  "Backend Development",
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Automation",
  "Generative AI",
  "Agentic AI",
];

const linkedinGoals = [
  "Build a recruiter-friendly profile that surfaces AI & software engineering skills clearly",
  "Showcase projects with structured descriptions, outcomes and stack details",
  "Improve discoverability for AI, ML and full-stack engineering roles",
  "Build an international professional network aligned with long-term goals",
  "Document learning milestones and projects publicly",
];

export function GithubPage() {
  const { navigate } = useAppRouter();

  // Top languages by occurrence
  const topLanguages = React.useMemo(() => {
    const counts = new Map<string, number>();
    skills.forEach((s) => {
      const lang = s.name;
      counts.set(lang, (counts.get(lang) ?? 0) + 1);
    });
    return Array.from(counts.entries())
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);
  }, []);

  return (
    <div className="relative">
      {/* ===== HEADER ===== */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="GitHub & Tech Presence"
            title={
              <>
                <span className="text-gradient-blue">40+ repositories</span> ·{" "}
                <span className="text-gradient-gold">10,000+ contributions</span> — and
                counting.
              </>
            }
            description="My public developer presence — code, learning milestones and the engineering career I'm building. The interface is wired up to accept live GitHub data; statistics below will populate automatically once the API token is configured."
          />
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Public repositories"
              value="40+"
              caption="Across AI, full-stack & embedded"
              icon={Github}
              accent="blue"
            />
            <StatCard
              label="Contributions"
              value="10,000+"
              caption="Pushed consistently across all repos"
              icon={TrendingUp}
              accent="cyan"
            />
            <StatCard
              label="Stars earned"
              value="100+"
              caption="Across public repositories"
              icon={Star}
              accent="gold"
            />
            <StatCard
              label="Languages used"
              value="5+"
              caption="TypeScript, Python, JS, C++, Java"
              icon={Code2}
              accent="purple"
            />
          </div>
        </div>
      </section>

      {/* ===== FEATURED REPOS PLACEHOLDER ===== */}
      <section className="relative py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight">
              Featured repositories
            </h3>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
            >
              View all
              <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Repo placeholder cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/[0.06] bg-card/40 p-5 hover:border-white/[0.12] transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Github className="h-4 w-4 text-muted-foreground" />
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    Repository
                  </span>
                </div>
                <h4 className="font-mono text-sm font-medium text-foreground">
                  your-username/repo-{i}
                </h4>
                <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                  Live repository data will appear here once the GitHub API is
                  connected. Replace the placeholder username in{" "}
                  <code className="rounded bg-white/[0.04] px-1 py-0.5 text-[10px]">
                    data/profile.ts
                  </code>{" "}
                  to enable.
                </p>
                <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    —
                  </span>
                  <span className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    —
                  </span>
                  <span className="ml-auto h-2 w-2 rounded-full bg-[oklch(0.62_0.18_250)]/40" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TOP TECH ===== */}
      <section className="relative py-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Most-used technologies"
                title="The stack I keep returning to."
                description="Based on the skills I track across projects. Frequencies update as the skills data file grows."
              />
            </div>
            <div className="grid gap-2">
              {topLanguages.map((lang, i) => {
                const max = topLanguages[0].count;
                const pct = (lang.count / max) * 100;
                const accent = (["blue", "purple", "cyan", "gold"] as AccentColor[])[i % 4];
                return (
                  <motion.div
                    key={lang.name}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex items-center gap-4"
                  >
                    <span className="w-28 text-xs font-mono text-foreground/80 shrink-0">
                      {lang.name}
                    </span>
                    <div className="flex-1 h-7 rounded-md border border-white/[0.06] bg-white/[0.02] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${pct}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className={cn(
                          "h-full flex items-center justify-end pr-2 text-[10px] font-medium text-background/80",
                          accentBgClass[accent]
                        )}
                      >
                        {lang.count}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LINKEDIN SECTION ===== */}
      <section className="relative py-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[0.06] bg-card/30 p-8 sm:p-12 relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at top right, oklch(0.55 0.22 295 / 8%) 0%, transparent 60%)",
              }}
            />
            <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-[oklch(0.55_0.22_295_/_30%)] bg-[oklch(0.55_0.22_295_/_12%)]">
                    <Linkedin className="h-5 w-5 text-[oklch(0.65_0.2_295)]" />
                  </div>
                  <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    Professional presence
                  </span>
                </div>
                <SectionHeading
                  title="LinkedIn strategy"
                  description="How I'm shaping my LinkedIn presence for international software & AI engineering opportunities — without claiming follower counts or hype I can't back up."
                />
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/[0.06] transition-colors"
                >
                  <Linkedin className="h-4 w-4" />
                  View LinkedIn
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
              <div className="grid gap-3">
                {linkedinGoals.map((goal, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.06 }}
                    className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                  >
                    <Briefcase className="h-3.5 w-3.5 text-[oklch(0.65_0.2_295)] mt-0.5 shrink-0" />
                    <span className="text-xs text-foreground/85 leading-relaxed">{goal}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== INTERVIEW PREP ===== */}
      <section className="relative py-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Interview Preparation"
            title="Always preparing — across the stack."
            description="I treat interview prep as a continuous habit rather than a cram. The topics below are the ones I rotate through regularly, with depth increasing over time."
            align="center"
          />
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {interviewTopics.map((topic, i) => {
              const accent = (["blue", "purple", "cyan", "gold"] as AccentColor[])[i % 4];
              return (
                <motion.span
                  key={topic}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-medium",
                    accentBorderClass[accent],
                    accentTextClass[accent]
                  )}
                >
                  <BookOpen className="h-3 w-3" />
                  {topic}
                </motion.span>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== CONTACT LINKS ===== */}
      <section className="relative py-16 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <ContactLink
              icon={Github}
              label="GitHub"
              value={`@${siteConfig.social.githubUsername}`}
              href={siteConfig.social.github}
              accent="blue"
            />
            <ContactLink
              icon={Linkedin}
              label="LinkedIn"
              value="View profile"
              href={siteConfig.social.linkedin}
              accent="purple"
            />
            <ContactLink
              icon={Mail}
              label="Email"
              value={siteConfig.email}
              href={gmailComposeUrl(siteConfig.email, "Portfolio enquiry")}
              accent="cyan"
            />
            <ContactLink
              icon={Phone}
              label="Phone"
              value={siteConfig.phone}
              href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
              accent="gold"
            />
            <ContactLink
              icon={GraduationCap}
              label="University"
              value={profile.university}
              href="#"
              accent="gold"
            />
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("contact")}
              className="group inline-flex items-center gap-1.5 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background hover:bg-foreground/90 transition-colors"
            >
              <Terminal className="h-4 w-4" />
              Open contact page
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ---------- Sub-components ---------- */
function StatCard({
  label,
  value,
  caption,
  icon: Icon,
  accent,
}: {
  label: string;
  value: string;
  caption: string;
  icon: React.ComponentType<{ className?: string }>;
  accent: AccentColor;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group relative rounded-2xl border border-white/[0.06] bg-card/40 p-5 backdrop-blur-sm overflow-hidden"
    >
      <div className="flex items-center justify-between mb-3">
        <div
          className={cn(
            "grid h-10 w-10 place-items-center rounded-xl border",
            accentBorderClass[accent],
            accentBgClass[accent]
          )}
        >
          <Icon className={cn("h-4 w-4", accentTextClass[accent])} />
        </div>
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
      </div>
      <div className={cn("font-display text-3xl font-semibold tabular-nums", accentTextClass[accent])}>
        {value}
      </div>
      <p className="mt-2 text-[11px] text-muted-foreground leading-relaxed">{caption}</p>
    </motion.div>
  );
}

function ContactLink({
  icon: Icon,
  label,
  value,
  href,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  accent: AccentColor;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-3 rounded-2xl border border-white/[0.06] bg-card/40 p-4 hover:border-white/[0.16] transition-colors"
    >
      <div
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl border",
          accentBorderClass[accent],
          accentBgClass[accent]
        )}
      >
        <Icon className={cn("h-4 w-4", accentTextClass[accent])} />
      </div>
      <div className="flex flex-col gap-0.5 min-w-0 flex-1">
        <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
          {label}
        </span>
        <span className="text-sm font-medium text-foreground truncate">{value}</span>
      </div>
      <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}
