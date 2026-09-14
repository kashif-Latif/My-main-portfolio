"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { navItems, RouteId } from "@/data/navigation";
import { useAppRouter } from "@/hooks/use-app-router";
import { profile } from "@/data/profile";
import { ThemeToggle } from "@/components/portfolio/theme-toggle";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenCommand: () => void;
  onOpenTerminal: () => void;
}

/** Amber disc + monogram, as on the reference wordmark. */
function Logo() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-brand font-display text-[13px] font-extrabold tracking-tight text-ink">
      K
    </span>
  );
}

export function Navbar({ onOpenCommand, onOpenTerminal }: NavbarProps) {
  const { route, navigate } = useAppRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile sheet is open
  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavigate = (id: RouteId) => {
    navigate(id);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className={cn(
              "panel flex items-center justify-between gap-3 rounded-full p-2 transition-shadow duration-500",
              scrolled ? "shadow-lg shadow-ink/20" : "shadow-sm shadow-ink/10"
            )}
            aria-label="Primary navigation"
          >
            {/* Wordmark */}
            <button
              onClick={() => handleNavigate("home")}
              className="group flex items-center gap-2.5 rounded-full pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              aria-label="Go to home"
            >
              <Logo />
              <span className="hidden flex-col items-start leading-tight sm:flex">
                <span className="font-display text-[13px] font-bold tracking-tight text-[var(--panel-foreground)]">
                  {profile.name}
                  <span className="text-brand">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-[var(--panel-muted)]">
                  {profile.tagline}
                </span>
              </span>
            </button>

            {/* Desktop links */}
            <div className="hidden items-center gap-0.5 lg:flex">
              {navItems.map((item) => {
                const active = route === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={cn(
                      "relative rounded-full px-3.5 py-2 text-[13px] font-medium tracking-tight transition-colors duration-300",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                      active
                        ? "text-brand"
                        : "text-[var(--panel-muted)] hover:text-[var(--panel-foreground)]"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    <span className="relative">{item.label}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-brand"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenCommand}
                className="hidden items-center gap-1.5 rounded-full border border-[var(--panel-line)] px-2.5 py-1.5 text-[11px] text-[var(--panel-muted)] transition-colors hover:text-[var(--panel-foreground)] md:flex"
                aria-label="Open command palette"
              >
                <Command className="h-3 w-3" />
                <kbd className="font-mono text-[10px]">K</kbd>
              </button>

              <ThemeToggle />

              <button
                onClick={() => handleNavigate("contact")}
                className="hidden rounded-full bg-[var(--panel-foreground)] px-5 py-2 text-[13px] font-semibold tracking-tight text-ink transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand sm:block"
              >
                Let&rsquo;s Talk
              </button>

              <button
                onClick={() => setMobileOpen(true)}
                className="grid h-9 w-9 place-items-center rounded-full bg-brand text-ink lg:hidden"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile sheet */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex h-full flex-col"
            >
              <div className="flex items-center justify-between px-5 pt-5 pb-4">
                <span className="flex items-center gap-2.5">
                  <Logo />
                  <span className="font-display text-sm font-bold tracking-tight text-foreground">
                    {profile.name}
                    <span className="text-brand">.</span>
                  </span>
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-brand text-ink"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" strokeWidth={2.25} />
                </button>
              </div>

              <div className="scrollbar-premium flex-1 overflow-y-auto px-5 pt-2">
                <ul className="flex flex-col gap-1.5">
                  {navItems.map((item, idx) => {
                    const active = route === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ x: -16, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 0.35,
                          delay: 0.04 + idx * 0.04,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <button
                          onClick={() => handleNavigate(item.id)}
                          className={cn(
                            "group flex w-full items-center justify-between rounded-3xl px-5 py-4 text-left transition-colors duration-300",
                            active ? "panel" : "border border-line bg-card"
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          <span className="flex flex-col gap-0.5">
                            <span
                              className={cn(
                                "font-display text-2xl font-bold tracking-tight",
                                active ? "text-brand" : "text-foreground"
                              )}
                            >
                              {item.label}
                            </span>
                            <span
                              className={cn(
                                "text-[11px]",
                                active
                                  ? "text-[var(--panel-muted)]"
                                  : "text-muted-foreground"
                              )}
                            >
                              {item.description}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "font-display text-xs font-bold tabular-nums",
                              active ? "text-brand" : "text-muted-foreground/50"
                            )}
                          >
                            0{idx + 1}
                          </span>
                        </button>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex items-center gap-2 border-t border-line px-5 py-5">
                <button
                  onClick={() => handleNavigate("contact")}
                  className="flex-1 rounded-full bg-brand px-5 py-3.5 text-sm font-semibold text-ink"
                >
                  Let&rsquo;s Talk
                </button>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenTerminal();
                  }}
                  className="rounded-full border border-line bg-card px-5 py-3.5 font-mono text-sm text-muted-foreground"
                  aria-label="Open terminal"
                >
                  $_
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
