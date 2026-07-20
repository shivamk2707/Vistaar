import { cn } from "@/lib/utils";
import { Halo } from "./halo";
import { Container } from "./layout";
import { Reveal } from "./reveal";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

/**
 * PageHero — shared hero used on every inner page.
 * Keeps the same visual language as the home hero:
 *   light bg + soft pastel mesh + halo glows + eyebrow + title + lede.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  tone = "coral",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  highlight?: string;
  description?: ReactNode;
  align?: "center" | "left";
  tone?: "coral" | "blue" | "violet" | "pink";
  children?: ReactNode;
}) {
  const haloToneMap = {
    coral: "coral",
    blue: "blue",
    violet: "violet",
    pink: "pink",
  } as const;
  return (
    <section className="relative isolate overflow-hidden py-28 sm:py-32 lg:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-page-mesh"
      />
      <Halo
        tone={haloToneMap[tone]}
        className="-top-40 left-1/2 -z-10 h-[480px] w-[680px] -translate-x-1/2"
      />
      <Halo
        tone="blue"
        className="top-40 -right-32 -z-10 h-[360px] w-[360px] animate-float-slow"
      />
      <Container>
        <div
          className={cn(
            "mx-auto flex max-w-4xl flex-col",
            align === "center" ? "items-center text-center" : "items-start text-left"
          )}
        >
          {eyebrow && (
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-soft" />
                {eyebrow}
              </span>
            </Reveal>
          )}
          <Reveal delay={1}>
            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-text-primary sm:text-5xl lg:text-[4.5rem]">
              {title}{" "}
              {highlight && (
                <span className="bg-[image:var(--gradient-accent)] bg-clip-text text-transparent">
                  {highlight}
                </span>
              )}
            </h1>
          </Reveal>
          {description && (
            <Reveal delay={2}>
              <p
                className={cn(
                  "mt-5 max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg",
                  align === "center" && "mx-auto"
                )}
              >
                {description}
              </p>
            </Reveal>
          )}
          {children && (
            <Reveal delay={3}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {children}
              </div>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}

export function Stat({
  Icon,
  value,
  label,
  className,
}: {
  Icon?: LucideIcon;
  value: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("text-center sm:text-left", className)}>
      <div className="font-display text-4xl font-bold text-text-primary sm:text-5xl">
        {value}
      </div>
      <div className="mt-1.5 text-xs uppercase tracking-wider text-text-muted sm:text-sm">
        {label}
      </div>
    </div>
  );
}
