"use client";

import * as React from "react";
import { RouteId, routeOrder, getNav } from "@/data/navigation";

interface RouterContextValue {
  route: RouteId;
  navigate: (route: RouteId) => void;
  /** True while a page transition is in flight */
  isTransitioning: boolean;
}

const RouterContext = React.createContext<RouterContextValue | null>(null);

const VALID_ROUTES = new Set<RouteId>(routeOrder);

function parseHash(): RouteId {
  if (typeof window === "undefined") return "home";
  const raw = window.location.hash.replace(/^#\/?/, "").trim().toLowerCase();
  if (!raw) return "home";
  if (VALID_ROUTES.has(raw as RouteId)) return raw as RouteId;
  return "home";
}

export function AppRouterProvider({ children }: { children: React.ReactNode }) {
  const [route, setRoute] = React.useState<RouteId>("home");
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  // FIX: setting window.location.hash inside navigate() fires a
  // "hashchange" event, whose handler used to swap the route INSTANTLY —
  // then the 220ms timeout fired again. Result: the exit animation never
  // played and scroll-to-top arrived 220ms late as a visible jump.
  // This ref lets navigate() mark its own hash writes so the hashchange
  // handler only acts on real back/forward presses.
  const programmaticHash = React.useRef(false);

  // Initialize from hash on mount (deferred a frame so the effect body
  // doesn't set state synchronously)
  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setRoute(parseHash()));
    return () => cancelAnimationFrame(raf);
  }, []);

  // Listen to hash changes — now ONLY browser back/forward reach this
  React.useEffect(() => {
    const onHashChange = () => {
      if (programmaticHash.current) {
        programmaticHash.current = false;
        return;
      }
      const next = parseHash();
      setRoute(next);
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      const nav = getNav(next);
      document.title =
        next === "home"
          ? "Muhammad Kashif Latif — AI Engineer & Full Stack Developer"
          : `${nav.label} — Muhammad Kashif Latif`;
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = React.useCallback(
    (next: RouteId) => {
      if (!VALID_ROUTES.has(next)) return;
      if (next === route) return;

      setIsTransitioning(true);

      // Update URL hash for back/forward support
      if (typeof window !== "undefined") {
        programmaticHash.current = true;
        window.location.hash = `/${next}`;
      }

      // Small delay to let exit animation play
      window.setTimeout(() => {
        setRoute(next);
        // Scroll to top on navigation
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
        // Update document title
        const nav = getNav(next);
        if (next === "home") {
          document.title = "Muhammad Kashif Latif — AI Engineer & Full Stack Developer";
        } else {
          document.title = `${nav.label} — Muhammad Kashif Latif`;
        }
        setIsTransitioning(false);
      }, 220);
    },
    [route]
  );

  // Keyboard navigation: ArrowUp/ArrowDown to move between pages
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Don't intercept when typing in inputs
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable) return;
      // Skip if any modifier other than shift is pressed
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      const currentIdx = routeOrder.indexOf(route);
      if (e.key === "ArrowDown" && e.shiftKey) {
        e.preventDefault();
        const nextIdx = Math.min(currentIdx + 1, routeOrder.length - 1);
        navigate(routeOrder[nextIdx]);
      } else if (e.key === "ArrowUp" && e.shiftKey) {
        e.preventDefault();
        const nextIdx = Math.max(currentIdx - 1, 0);
        navigate(routeOrder[nextIdx]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [route, navigate]);

  const value = React.useMemo(
    () => ({ route, navigate, isTransitioning }),
    [route, navigate, isTransitioning]
  );

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>;
}

export function useAppRouter() {
  const ctx = React.useContext(RouterContext);
  if (!ctx) throw new Error("useAppRouter must be used within AppRouterProvider");
  return ctx;
}
