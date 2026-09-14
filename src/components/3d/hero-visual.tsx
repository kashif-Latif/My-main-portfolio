"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { HeroFallback } from "./hero-fallback";

/**
 * Decides whether the hero gets WebGL at all — and does it BEFORE the
 * three.js chunk is fetched.
 *
 * This gate has to live outside `hero-scene.tsx`. Any check written inside
 * that module only runs once the module has loaded, by which point the
 * ~231 KB (gzipped) download has already happened and the bandwidth is spent.
 * Referencing `HeroScene` only when we've said yes is what actually keeps the
 * chunk off the wire.
 */
const HeroScene = dynamic(
  () => import("./hero-scene").then((m) => m.HeroSceneWithFallback),
  { ssr: false, loading: () => <HeroFallback /> }
);

type Connection = {
  saveData?: boolean;
  effectiveType?: string;
};

/**
 * Deliberately conservative. Only Data Saver and genuinely 2G-class links opt
 * out — 3G still gets the scene, because on this site the 3D hero is the point
 * and most of the audience is on mobile data. Widen the list here if you'd
 * rather protect 3G too:
 *
 *   const TOO_SLOW = ["slow-2g", "2g", "3g"];
 */
const TOO_SLOW = ["slow-2g", "2g"];

function skipHeavyVisual(): boolean {
  if (typeof window === "undefined") return true;

  // Someone who asked for less motion should never pay for a 3D scene.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

  const connection = (
    navigator as Navigator & { connection?: Connection }
  ).connection;
  if (!connection) return false; // unknown link quality — assume it's fine

  if (connection.saveData) return true;
  if (connection.effectiveType && TOO_SLOW.includes(connection.effectiveType)) {
    return true;
  }

  return false;
}

export function HeroVisual() {
  // null = undecided. The CSS fallback shows meanwhile, so there is never an
  // empty hero, and the decision is deferred one frame so first paint lands
  // before any of this runs.
  const [useWebGL, setUseWebGL] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const raf = requestAnimationFrame(() => setUseWebGL(!skipHeavyVisual()));
    return () => cancelAnimationFrame(raf);
  }, []);

  if (useWebGL !== true) return <HeroFallback />;
  return <HeroScene />;
}
