"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Strength of the magnetic pull (px). Default 8. */
  strength?: number;
  as?: "button" | "a";
  href?: string;
  target?: string;
  rel?: string;
}

/**
 * Subtle magnetic button — translates slightly toward the cursor on hover.
 * Disabled on touch devices and reduced-motion preferences.
 */
export const MagneticButton = React.forwardRef<
  HTMLButtonElement,
  MagneticButtonProps
>(({ children, className, strength = 8, ...props }, ref) => {
  const innerRef = React.useRef<HTMLButtonElement | null>(null);
  React.useImperativeHandle(ref, () => innerRef.current as HTMLButtonElement);

  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    const factor = (strength / rect.width) * 2;
    el.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  };

  const onMouseLeave = () => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transform = "translate(0, 0)";
  };

  return (
    <button
      ref={innerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn(
        "magnetic inline-flex items-center justify-center gap-2 will-change-transform",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});
MagneticButton.displayName = "MagneticButton";
