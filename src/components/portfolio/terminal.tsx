"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal as TerminalIcon } from "lucide-react";
import { useAppRouter } from "@/hooks/use-app-router";
import { profile, siteConfig } from "@/data/profile";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import { journeyStages } from "@/data/journey";
import { RouteId } from "@/data/navigation";

interface TerminalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Line {
  type: "input" | "output" | "error" | "system";
  text: string;
}

const PROMPT = "kashif@portfolio:~$";

export function Terminal({ open, onOpenChange }: TerminalProps) {
  const { navigate } = useAppRouter();
  const [history, setHistory] = React.useState<Line[]>([
    { type: "system", text: "MKL Interactive Terminal v1.0 — type 'help' to see available commands." },
    { type: "system", text: "" },
  ]);
  const [input, setInput] = React.useState("");
  const [historyIndex, setHistoryIndex] = React.useState(-1);
  const [pastCommands, setPastCommands] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const commands: Record<string, () => Line[]> = {
    help: () => [
      { type: "output", text: "Available commands:" },
      { type: "output", text: "  help          — Show this help message" },
      { type: "output", text: "  about         — About Muhammad Kashif Latif" },
      { type: "output", text: "  skills        — List all skills" },
      { type: "output", text: "  projects      — List featured projects" },
      { type: "output", text: "  journey       — Show AI journey stages" },
      { type: "output", text: "  contact       — Show contact info" },
      { type: "output", text: "  goto <page>   — Navigate to a page (home, about, skills, projects, journey, github, contact)" },
      { type: "output", text: "  clear         — Clear the terminal" },
      { type: "output", text: "  exit          — Close terminal" },
    ],
    about: () => [
      { type: "output", text: `${profile.name}` },
      { type: "output", text: `${profile.age} years old · ${profile.location}` },
      { type: "output", text: `${profile.degree} · ${profile.university}` },
      { type: "output", text: `Academic stage: ${profile.academicStage}` },
      { type: "output", text: "" },
      { type: "output", text: profile.positioning },
      { type: "output", text: "" },
      { type: "output", text: "Type 'goto about' to view the full About page." },
    ],
    skills: () => {
      const lines: Line[] = [];
      const cats = Array.from(new Set(skills.map((s) => s.category)));
      cats.forEach((cat) => {
        lines.push({ type: "output", text: `▸ ${cat}` });
        const names = skills.filter((s) => s.category === cat).map((s) => s.name);
        lines.push({ type: "output", text: `  ${names.join(" · ")}` });
      });
      lines.push({ type: "output", text: "" });
      lines.push({ type: "output", text: "Type 'goto skills' for the interactive constellation." });
      return lines;
    },
    projects: () => {
      const lines: Line[] = [
        { type: "output", text: `Featured projects (${projects.filter((p) => p.featured).length}):` },
      ];
      projects.filter((p) => p.featured).forEach((p, i) => {
        lines.push({ type: "output", text: `  ${i + 1}. ${p.title}` });
        lines.push({ type: "output", text: `     ${p.tagline}` });
      });
      lines.push({ type: "output", text: "" });
      lines.push({ type: "output", text: "Type 'goto projects' to open the showcase." });
      return lines;
    },
    journey: () => {
      const lines: Line[] = [{ type: "output", text: "AI Journey stages:" }];
      journeyStages.forEach((s) => {
        const marker = s.status === "complete" ? "✓" : s.status === "active" ? "▸" : "○";
        lines.push({ type: "output", text: `  ${marker} ${s.title} — ${s.subtitle}` });
      });
      lines.push({ type: "output", text: "" });
      lines.push({ type: "output", text: "Type 'goto journey' for the cinematic timeline." });
      return lines;
    },
    contact: () => [
      { type: "output", text: "Contact information:" },
      { type: "output", text: `  Email:      ${siteConfig.email}` },
      { type: "output", text: `  GitHub:     ${siteConfig.social.github}` },
      { type: "output", text: `  LinkedIn:   ${siteConfig.social.linkedin}` },
      { type: "output", text: "" },
      { type: "output", text: "Type 'goto contact' for the contact form." },
    ],
    clear: () => {
      setHistory([]);
      return [];
    },
    exit: () => {
      onOpenChange(false);
      return [];
    },
  };

  const handleCommand = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    const newHistory: Line[] = [
      ...history,
      { type: "input", text: raw },
    ];

    // Handle goto <page>
    if (cmd.startsWith("goto ")) {
      const page = cmd.slice(5).trim() as RouteId;
      const validPages: RouteId[] = ["home", "about", "skills", "projects", "journey", "github", "contact"];
      if (validPages.includes(page)) {
        newHistory.push({ type: "output", text: `→ Navigating to /${page}...` });
        setHistory(newHistory);
        setTimeout(() => {
          navigate(page);
          onOpenChange(false);
        }, 300);
        return;
      } else {
        newHistory.push({ type: "error", text: `Unknown page: '${page}'. Try: home, about, skills, projects, journey, github, contact` });
        setHistory(newHistory);
        return;
      }
    }

    const handler = commands[cmd];
    if (handler) {
      const output = handler();
      if (cmd !== "clear" && cmd !== "exit") {
        setHistory([...newHistory, ...output]);
      }
    } else {
      newHistory.push({ type: "error", text: `Command not found: '${cmd}'. Type 'help' for available commands.` });
      setHistory(newHistory);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommand(input);
      if (input.trim()) {
        setPastCommands((prev) => [...prev, input]);
      }
      setInput("");
      setHistoryIndex(-1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (pastCommands.length === 0) return;
      const newIdx = historyIndex === -1 ? pastCommands.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIdx);
      setInput(pastCommands[newIdx]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIdx = historyIndex + 1;
      if (newIdx >= pastCommands.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIdx);
        setInput(pastCommands[newIdx]);
      }
    } else if (e.key === "Escape") {
      onOpenChange(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-4"
        >
          <div
            className="absolute inset-0 bg-background/70 backdrop-blur-md"
            onClick={() => onOpenChange(false)}
          />
          <motion.div
            initial={{ y: 30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 20, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl"
          >
            <div className="glass-strong rounded-t-2xl sm:rounded-2xl border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
                <div className="flex items-center gap-2">
                  <TerminalIcon className="h-3.5 w-3.5 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">
                    interactive-terminal
                  </span>
                </div>
                <button
                  onClick={() => onOpenChange(false)}
                  className="grid h-7 w-7 place-items-center rounded-md text-muted-foreground hover:text-foreground hover:bg-white/[0.06] transition-colors"
                  aria-label="Close terminal"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Terminal body */}
              <div
                ref={scrollRef}
                className="h-[60vh] sm:h-[50vh] overflow-y-auto scrollbar-premium bg-[oklch(0.10_0.012_264_/_60%)] p-4 font-mono text-[13px] leading-relaxed"
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((line, i) => (
                  <div
                    key={i}
                    className={
                      line.type === "input"
                        ? "text-foreground"
                        : line.type === "error"
                        ? "text-[oklch(0.75_0.18_22)]"
                        : line.type === "system"
                        ? "text-[oklch(0.65_0.12_195)]"
                        : "text-muted-foreground"
                    }
                  >
                    {line.type === "input" ? (
                      <>
                        <span className="text-[oklch(0.7_0.18_250)]">{PROMPT}</span>{" "}
                        {line.text}
                      </>
                    ) : (
                      line.text || "\u00A0"
                    )}
                  </div>
                ))}
                {/* Active input line */}
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[oklch(0.7_0.18_250)]">{PROMPT}</span>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground/50"
                    spellCheck={false}
                    autoComplete="off"
                    aria-label="Terminal input"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
