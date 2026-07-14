"use client";

import * as React from "react";
import { AppRouterProvider, useAppRouter } from "@/hooks/use-app-router";
import { PageTransition } from "@/components/portfolio/page-transition";
import { Navbar } from "@/components/portfolio/navbar";
import { Footer } from "@/components/portfolio/footer";
import { CommandPalette } from "@/components/portfolio/command-palette";
import { Terminal } from "@/components/portfolio/terminal";
import { LoadingScreen } from "@/components/portfolio/loading-screen";
import { HomePage } from "@/components/portfolio/pages/home-page";
import { AboutPage } from "@/components/portfolio/pages/about-page";
import { SkillsPage } from "@/components/portfolio/pages/skills-page";
import { ProjectsPage } from "@/components/portfolio/pages/projects-page";
import { JourneyPage } from "@/components/portfolio/pages/journey-page";
import { GithubPage } from "@/components/portfolio/pages/github-page";
import { ContactPage } from "@/components/portfolio/pages/contact-page";

function ActivePage() {
  const { route } = useAppRouter();

  switch (route) {
    case "home":
      return <HomePage />;
    case "about":
      return <AboutPage />;
    case "skills":
      return <SkillsPage />;
    case "projects":
      return <ProjectsPage />;
    case "journey":
      return <JourneyPage />;
    case "github":
      return <GithubPage />;
    case "contact":
      return <ContactPage />;
    default:
      return <HomePage />;
  }
}

function PortfolioShell() {
  const [commandOpen, setCommandOpen] = React.useState(false);
  const [terminalOpen, setTerminalOpen] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);

  // Keyboard shortcut for command palette: Cmd/Ctrl + K
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((o) => !o);
      }
      // Open terminal with backtick (when not typing in an input)
      if (e.key === "`" && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.isContentEditable
        )
          return;
        e.preventDefault();
        setTerminalOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <LoadingScreen onComplete={() => setLoaded(true)} />

      <div
        className="relative min-h-screen flex flex-col bg-background"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.6s ease" }}
        aria-hidden={!loaded}
      >
      {/* Subtle background grid - fixed */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.4] bg-grid"
        aria-hidden="true"
      />

      {/* Atmospheric glow blobs - fixed */}
      <div
        className="pointer-events-none fixed top-0 left-1/4 h-[40vmin] w-[40vmin] rounded-full opacity-20 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.62 0.18 250 / 60%) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none fixed bottom-0 right-1/4 h-[35vmin] w-[35vmin] rounded-full opacity-15 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, oklch(0.55 0.22 295 / 60%) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <Navbar
        onOpenCommand={() => setCommandOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      <main className="relative flex-1 z-10">
        <PageTransition>
          <ActivePage />
        </PageTransition>
      </main>

      <Footer />

      <CommandPalette
        open={commandOpen}
        onOpenChange={setCommandOpen}
        onOpenTerminal={() => setTerminalOpen(true)}
      />
      <Terminal open={terminalOpen} onOpenChange={setTerminalOpen} />

      {/* Keyboard shortcut hint - desktop only */}
      <div className="hidden md:flex fixed bottom-4 left-4 z-30 items-center gap-1.5 rounded-full border border-white/[0.06] bg-card/60 backdrop-blur-md px-3 py-1.5 text-[10px] text-muted-foreground/70">
        <kbd className="font-mono">⌘</kbd>
        <kbd className="font-mono">K</kbd>
        <span className="mx-1">commands</span>
        <span className="opacity-50">·</span>
        <kbd className="font-mono">`</kbd>
        <span className="mx-1">terminal</span>
      </div>
      </div>
    </>
  );
}

export function PortfolioApp() {
  return (
    <AppRouterProvider>
      <PortfolioShell />
    </AppRouterProvider>
  );
}
