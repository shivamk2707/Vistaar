import { cn } from "@/lib/utils";
import { Container } from "./layout";
import { Reveal } from "./reveal";
import type { ReactNode } from "react";

/**
 * PageHero — shared hero for every inner page.
 * Mirrors the home page hero:
 *   dark canvas band + eyebrow + display headline + lead + CTA cluster.
 */
export function PageHero({
  eyebrow,
  title,
  highlight,
  description,
  align = "center",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  highlight?: string;
  description?: ReactNode;
  align?: "center" | "left";
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--canvas-dark)] text-[var(--on-dark)]">
      <div className="relative py-[80px] sm:py-[100px]">
        <Container>
          <div
            className={cn(
              "mx-auto flex max-w-3xl flex-col",
              align === "center" ? "items-center text-center" : "items-start text-left"
            )}
          >
            {eyebrow && (
              <Reveal>
                <span className="mono-eyebrow text-[var(--on-dark)] opacity-70">
                  {eyebrow}
                </span>
              </Reveal>
            )}
            <Reveal delay={1}>
              <h1
                className={cn(
                  "mt-6 text-display-xxl",
                  "text-[var(--on-dark)]"
                )}
              >
                {title}{" "}
                {highlight && (
                  <span className="text-gradient-brand">{highlight}</span>
                )}
              </h1>
            </Reveal>
            {description && (
              <Reveal delay={2}>
                <p
                  className={cn(
                    "mt-6 max-w-2xl text-[18px] leading-[1.45] text-[var(--on-dark)] opacity-80",
                    align === "center" && "mx-auto"
                  )}
                >
                  {description}
                </p>
              </Reveal>
            )}
            {children && (
              <Reveal delay={3}>
                <div
                  className={cn(
                    "mt-8 flex flex-wrap items-center gap-3",
                    align === "center" && "justify-center"
                  )}
                >
                  {children}
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
