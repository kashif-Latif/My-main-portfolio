"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, FileText, X, Brain, Code2, Layers } from "lucide-react";
import { siteConfig } from "@/data/profile";
import { cn } from "@/lib/utils";

interface ResumeMenuProps {
  className?: string;
  variant?: "primary" | "ghost" | "outline";
}

const accentClasses: Record<string, { border: string; text: string; bg: string }> = {
  blue: { border: "border-[oklch(0.62_0.18_250_/_30%)]", text: "text-[oklch(0.7_0.18_250)]", bg: "bg-[oklch(0.62_0.18_250_/_0.08)]" },
  cyan: { border: "border-[oklch(0.72_0.15_195_/_30%)]", text: "text-[oklch(0.78_0.15_195)]", bg: "bg-[oklch(0.72_0.15_195_/_0.08)]" },
  purple: { border: "border-[oklch(0.55_0.22_295_/_30%)]", text: "text-[oklch(0.65_0.2_295)]", bg: "bg-[oklch(0.55_0.22_295_/_0.08)]" },
};

const resumeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  "ai-engineer": Brain,
  fullstack: Code2,
  combined: Layers,
};

const variantClasses: Record<string, string> = {
  primary: "bg-foreground text-background hover:bg-foreground/90",
  ghost: "border border-white/[0.12] bg-white/[0.02] text-foreground backdrop-blur-md hover:bg-white/[0.06]",
  outline: "border border-white/[0.08] bg-transparent text-muted-foreground hover:text-foreground hover:border-white/[0.16]",
};

export function ResumeMenu({ className, variant = "outline" }: ResumeMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  // Lock body scroll + close on Escape when modal is open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const handleDownload = (path: string) => {
    window.open(path, "_blank", "noopener,noreferrer");
    setOpen(false);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
          variantClasses[variant],
          className
        )}
        aria-haspopup="dialog"
      >
        <Download className="h-4 w-4" />
        Download Resume
      </button>

      {/* Modal — rendered via portal to document.body to escape any overflow-hidden parents */}
      {mounted && createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[200] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-label="Download resume"
            >
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
                onClick={() => setOpen(false)}
              />

              {/* Modal card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 16 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 16 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-card/95 backdrop-blur-2xl shadow-2xl shadow-black/50"
              >
                {/* Header */}
                <div className="flex items-start justify-between border-b border-white/[0.06] px-5 py-4">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[oklch(0.7_0.18_250)]">
                      Choose a resume
                    </div>
                    <div className="mt-1 font-display text-lg font-semibold text-foreground">
                      Download Resume
                    </div>
                    <div className="mt-0.5 text-xs text-muted-foreground">
                      Three tailored versions — pick the one that fits the role.
                    </div>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
                    aria-label="Close"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Resume options */}
                <div className="flex flex-col gap-1 p-3 max-h-[60vh] overflow-y-auto scrollbar-premium">
                  {siteConfig.resumes.map((resume) => {
                    const Icon = resumeIcons[resume.id] ?? FileText;
                    const a = accentClasses[resume.accent];
                    return (
                      <button
                        key={resume.id}
                        onClick={() => handleDownload(resume.path)}
                        className="group flex w-full items-start gap-3 rounded-xl p-3 text-left transition-colors hover:bg-white/[0.04]"
                      >
                        <div className={cn("grid h-10 w-10 shrink-0 place-items-center rounded-lg border", a.border, a.bg)}>
                          <Icon className={cn("h-4 w-4", a.text)} />
                        </div>
                        <div className="flex min-w-0 flex-1 flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-foreground">{resume.title}</span>
                            <Download className="h-3 w-3 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                          <span className="text-[11px] text-muted-foreground leading-relaxed">
                            {resume.description}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Footer */}
                <div className="border-t border-white/[0.06] px-5 py-3">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground/60">
                    PDF · opens in new tab · press Esc to close
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
