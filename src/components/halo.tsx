import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Tone = "coral" | "blue" | "violet" | "pink" | "warm" | "sun";

const TONE_BG: Record<Tone, string> = {
  coral: "bg-glow-coral",
  blue: "bg-glow-blue",
  violet: "bg-glow-violet",
  pink: "bg-glow-pink",
  warm: "bg-glow-coral",
  sun: "bg-glow-coral",
};

const TONE_BORDER: Record<Tone, string> = {
  coral: "border-primary/20",
  blue: "border-secondary/20",
  violet: "border-accent/20",
  pink: "border-accent-3/20",
  warm: "border-primary/15",
  sun: "border-accent-4/30",
};

/**
 * Halo — a large soft radial glow used behind hero/showcase content
 * to recreate the reference's "floating UI mockup with halo" effect.
 *
 * Usage:
 *   <div className="relative">
 *     <Halo tone="blue" className="-top-32 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2" />
 *     <YourContent />
 *   </div>
 */
export function Halo({
  tone = "coral",
  className,
}: {
  tone?: Tone;
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute rounded-full blur-3xl",
        TONE_BG[tone],
        className
      )}
    />
  );
}

/**
 * GlassCard — a frosted premium card with a soft top border highlight.
 * This is the workhorse card for the reference design.
 */
export function GlassCard({
  className,
  children,
  tone = "blue",
  hover = true,
}: {
  className?: string;
  children: ReactNode;
  tone?: Tone;
  hover?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border bg-surface-strong backdrop-blur-xl",
        TONE_BORDER[tone],
        hover &&
          "transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated",
        className
      )}
    >
      {/* subtle top highlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent"
      />
      {children}
    </div>
  );
}
