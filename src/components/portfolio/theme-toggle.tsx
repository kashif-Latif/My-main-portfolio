"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

/* "Have we hydrated yet?" as an external store rather than a mount effect.
 * The server snapshot is false and the client snapshot is true, so React
 * renders the placeholder during hydration and the real icon immediately
 * after — no mismatch, and no setState-in-effect cascade. */
const noopSubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

/**
 * Light/dark switch for the nav pill.
 *
 * The icon depends on the resolved theme, which is only known on the client, so
 * the button ships as a same-sized placeholder first — the layout never shifts.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    noopSubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "grid h-9 w-9 place-items-center rounded-full border border-[var(--panel-line)]",
        "text-[var(--panel-foreground)] transition-colors hover:bg-[var(--panel-line)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand",
        className
      )}
      aria-label={
        mounted
          ? `Switch to ${isDark ? "light" : "dark"} theme`
          : "Toggle theme"
      }
    >
      {mounted &&
        (isDark ? (
          <Sun className="h-4 w-4" strokeWidth={2} />
        ) : (
          <Moon className="h-4 w-4" strokeWidth={2} />
        ))}
    </button>
  );
}
