"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={
        mounted
          ? theme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      title="Toggle theme"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-text-primary transition-all hover:scale-105 hover:shadow-card-hover active:scale-95"
    >
      <Sun
        aria-hidden
        className={`h-5 w-5 transition-all ${
          mounted && theme === "dark"
            ? "rotate-90 scale-0 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      />
      <Moon
        aria-hidden
        className={`absolute h-5 w-5 transition-all ${
          mounted && theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
      />
    </button>
  );
}
