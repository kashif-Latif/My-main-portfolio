"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import { navItems, RouteId } from "@/data/navigation";
import { useAppRouter } from "@/hooks/use-app-router";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

interface NavbarProps {
  onOpenCommand: () => void;
  onOpenTerminal: () => void;
}

export function Navbar({ onOpenCommand, onOpenTerminal }: NavbarProps) {
  const { route, navigate } = useAppRouter();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  // Track scroll for translucent navbar
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
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
          "fixed top-0 inset-x-0 z-50 transition-all duration-500",
          scrolled
            ? "py-2"
            : "py-4"
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav
            className={cn(
              "flex items-center justify-between rounded-full transition-all duration-500",
              scrolled
                ? "glass-strong px-4 py-2 shadow-lg shadow-black/20"
                : "px-4 py-2 bg-transparent"
            )}
            aria-label="Primary navigation"
          >
            {/* Logo */}
            <button
              onClick={() => handleNavigate("home")}
              className="group flex items-center gap-2.5 focus:outline-none"
              aria-label="Go to home"
            >
              <span
                className="relative grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-gradient-to-br from-[oklch(0.62_0.18_250_/_20%)] to-[oklch(0.55_0.22_295_/_20%)] font-display text-sm font-semibold tracking-wider text-white"
              >
                MKL
                <span className="absolute inset-0 rounded-xl bg-[oklch(0.62_0.18_250_/_0%)] transition-colors duration-500 group-hover:bg-[oklch(0.62_0.18_250_/_12%)]" />
              </span>
              <span className="hidden sm:flex flex-col leading-tight">
                <span className="font-display text-[13px] font-medium tracking-tight text-foreground">
                  {profile.name}
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {profile.tagline}
                </span>
              </span>
            </button>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const active = route === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavigate(item.id)}
                    className={cn(
                      "relative px-3.5 py-1.5 text-[13px] font-medium tracking-tight transition-colors duration-300 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                      active
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {active && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/[0.08]"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              {/* Command palette trigger - desktop */}
              <button
                onClick={onOpenCommand}
                className="hidden md:flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-1.5 text-[11px] text-muted-foreground hover:text-foreground hover:border-white/[0.16] transition-all duration-300"
                aria-label="Open command palette"
              >
                <Command className="h-3 w-3" />
                <kbd className="font-mono text-[10px]">K</kbd>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden grid h-9 w-9 place-items-center rounded-full border border-white/[0.08] bg-white/[0.02] text-foreground hover:bg-white/[0.06] transition-colors"
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-4 w-4" />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-background/80 backdrop-blur-2xl"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4">
                <span className="font-display text-sm uppercase tracking-[0.2em] text-muted-foreground">
                  Navigate
                </span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/[0.08] bg-white/[0.02] text-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Menu items */}
              <div className="flex-1 overflow-y-auto scrollbar-premium px-6 pt-4">
                <ul className="flex flex-col gap-1">
                  {navItems.map((item, idx) => {
                    const active = route === item.id;
                    return (
                      <motion.li
                        key={item.id}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.05 + idx * 0.05,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <button
                          onClick={() => handleNavigate(item.id)}
                          className={cn(
                            "group flex w-full items-center justify-between rounded-2xl px-4 py-4 text-left transition-all duration-300",
                            active
                              ? "bg-white/[0.05] border border-white/[0.08]"
                              : "border border-transparent hover:bg-white/[0.03]"
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          <div className="flex flex-col gap-0.5">
                            <span
                              className={cn(
                                "font-display text-2xl tracking-tight transition-colors",
                                active ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                              )}
                            >
                              {item.label}
                            </span>
                            <span className="text-[11px] text-muted-foreground/80">
                              {item.description}
                            </span>
                          </div>
                          <span
                            className={cn(
                              "font-display text-xs tabular-nums transition-colors",
                              active ? "text-[oklch(0.7_0.18_250)]" : "text-muted-foreground/40"
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

              {/* Footer */}
              <div className="px-6 py-6 border-t border-white/[0.06]">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onOpenTerminal();
                  }}
                  className="w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 text-left text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span className="font-mono">$ open terminal</span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
