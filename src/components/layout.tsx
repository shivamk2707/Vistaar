import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-10", className)}
      {...props}
    />
  );
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  /** When true, gives the section a soft tinted background. */
  tinted?: boolean;
  /** When true, makes the section full-bleed with its own bg. */
  contained?: boolean;
}

export function Section({
  id,
  className,
  children,
  tinted = false,
  contained = false,
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-20 sm:py-24 lg:py-28",
        tinted && "bg-background-muted/60",
        className
      )}
      {...rest}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  maxTitleWidth?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  maxTitleWidth = "max-w-3xl",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center"
          ? "items-center text-center mx-auto"
          : "items-start text-left",
        maxTitleWidth,
        className
      )}
    >
      {eyebrow && (
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary",
            align === "left" ? "" : "mx-auto"
          )}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse-soft" />
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl font-bold leading-[1.1] tracking-tight text-text-primary sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description && (
        <p className="text-base leading-relaxed text-text-secondary sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
