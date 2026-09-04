"use client";

import * as React from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", onChange);
  return () => mql.removeEventListener("change", onChange);
}

/**
 * SSR-safe prefers-reduced-motion, the correct way.
 *
 * Several components used to read matchMedia inside an effect and then
 * call setState — an extra render pass on every mount and a React 19
 * lint error (react-hooks/set-state-in-effect). useSyncExternalStore is
 * built exactly for subscribing to external browser state: no effect,
 * no cascading render, and it live-updates if the OS setting changes.
 */
export function useReducedMotion(): boolean {
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false // server snapshot: assume motion, components stay SSR-consistent
  );
}
