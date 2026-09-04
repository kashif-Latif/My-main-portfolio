"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Calendar,
  GraduationCap,
  Award,
  Compass,
  Target,
  Zap,
} from "lucide-react";
import { profile } from "@/data/profile";
import { SectionHeading } from "@/components/portfolio/section-heading";
import { useAppRouter } from "@/hooks/use-app-router";

export function AboutPage() {
  const { navigate } = useAppRouter();

  const facts = [
    { label: "Name", value: profile.name, icon: Award },
    { label: "Age", value: `${profile.age} years`, icon: Calendar },
    { label: "Location", value: profile.location, icon: MapPin },
    { label: "University", value: profile.university, icon: GraduationCap },
    { label: "Degree", value: profile.degree, icon: GraduationCap },
    { label: "Stage", value: profile.academicStage, icon: Compass },
  ];

  return (
    <div className="relative">
      {/* ===== HEADER ===== */}
      <section className="relative pt-32 pb-12 sm:pt-40 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                A student building a{" "}
                <span className="text-gradient-blue">long-term career</span> in AI &
                software.
              </>
            }
            description={profile.positioning}
          />
        </div>
      </section>

      {/* ===== FACTS GRID ===== */}
      <section className="relative py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-start gap-3 rounded-2xl border border-white/[0.06] bg-card/40 p-4 backdrop-blur-sm"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/[0.06] bg-white/[0.02]">
                    <Icon className="h-4 w-4 text-[oklch(0.7_0.18_250)]" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                      {f.label}
                    </span>
                    <span className="text-sm font-medium text-foreground">{f.value}</span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== PERSONAL STORY ===== */}
      <section className="relative py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHeading
                eyebrow="Personal Story"
                title="Why I'm doing this."
              />
            </div>
            <div className="flex flex-col gap-6">
              {profile.personalStory.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="text-base sm:text-lg text-foreground/85 leading-relaxed"
                >
                  {para}
                </motion.p>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="mt-2 rounded-2xl border border-white/[0.06] bg-card/40 p-6"
              >
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-[oklch(0.7_0.18_250)]">
                  <Zap className="h-3.5 w-3.5" />
                  What drives me
                </div>
                <p className="mt-3 text-sm sm:text-base text-foreground/85 leading-relaxed">
                  The ambition to build technology businesses, the discipline to learn
                  deeply even when it's hard, and the belief that real-world projects
                  compound into a career that certificates alone never could.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== CAREER VISION ROADMAP ===== */}
      <section className="relative py-16 sm:py-24 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            eyebrow="Career Vision"
            title="A long-term roadmap, not a sprint."
            description="These are the milestones I'm working toward over the next few years — each one a deliberate step toward becoming a professional AI engineer who ships production systems."
            align="center"
          />

          <div className="mt-16 relative">
            {/* Vertical line - desktop */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/[0.12] to-transparent" />

            <div className="flex flex-col gap-8 lg:gap-0">
              {profile.careerVision.map((vision, i) => {
                const isLeft = i % 2 === 0;
                const isLast = i === profile.careerVision.length - 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative flex flex-col lg:flex-row lg:items-center lg:gap-12 ${
                      isLeft ? "" : "lg:flex-row-reverse"
                    } ${isLast ? "pb-0" : "pb-8 lg:pb-0"}`}
                  >
                    {/* Content */}
                    <div className="lg:w-1/2 lg:px-8">
                      <div className="group relative rounded-2xl border border-white/[0.06] bg-card/40 p-5 transition-colors hover:border-white/[0.12]">
                        <div className="flex items-start gap-3">
                          <span className="font-display text-2xl font-semibold text-[oklch(0.7_0.18_250)] tabular-nums">
                            0{i + 1}
                          </span>
                          <p className="text-sm sm:text-base text-foreground/85 leading-relaxed pt-1">
                            {vision}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Node - desktop */}
                    <div className="hidden lg:flex lg:w-0 lg:relative">
                      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 grid h-3 w-3 place-items-center">
                        <div className="absolute h-3 w-3 rounded-full bg-[oklch(0.62_0.18_250)] opacity-50 animate-ping" />
                        <div className="relative h-2 w-2 rounded-full bg-[oklch(0.7_0.18_250)]" />
                      </div>
                    </div>

                    {/* Empty side */}
                    <div className="hidden lg:block lg:w-1/2" />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ===== LEARNING PHILOSOPHY ===== */}
      <section className="relative py-16 sm:py-24 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-white/[0.06] bg-card/30 p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  "radial-gradient(ellipse at bottom right, oklch(0.55 0.22 295 / 8%) 0%, transparent 60%)",
              }}
            />
            <div className="relative grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionHeading
                  eyebrow="Learning Philosophy"
                  title={
                    <>
                      <span className="text-gradient-cyan">Learn deeply.</span>{" "}
                      <span className="text-gradient-blue">Build practically.</span>{" "}
                      <span className="text-gradient-gold">Ship consistently.</span>
                    </>
                  }
                  description="My approach to growth is structured, deliberate and project-driven — not certificate-driven."
                />
                <button
                  onClick={() => navigate("journey")}
                  className="group mt-6 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 text-sm font-medium text-foreground hover:bg-white/[0.06] transition-colors"
                >
                  <Target className="h-4 w-4" />
                  View AI journey
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {profile.philosophyDetails.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="flex items-start gap-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[oklch(0.62_0.18_250)] shrink-0" />
                    <span className="text-xs text-foreground/85 leading-relaxed">{p}</span>
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
