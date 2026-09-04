"use client";

import * as React from "react";

/**
 * Reveal element when it enters the viewport.
 * Returns a ref to attach and an `isVisible` flag.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = React.useRef<T | null>(null);
  const [isVisible, setIsVisible] = React.useState(false);

  // FIX: `options` (an object) used to sit in the dependency array, so any
  // caller passing an inline literal recreated the IntersectionObserver on
  // EVERY render — constant observer churn. We depend on the primitive
  // values instead.
  const threshold = options?.threshold ?? 0.15;
  const rootMargin = options?.rootMargin ?? "0px 0px -10% 0px";

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced motion: show immediately (deferred a frame so the
    // effect body itself doesn't set state synchronously)
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
