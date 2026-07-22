import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Container({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-8", className)}
      {...props}
    />
  );
}

interface SectionProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  tone?: "light" | "dark";
  className?: string;
}

export function Section({
  id,
  className,
  children,
  tone = "light",
  ...rest
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative w-full py-[80px] sm:py-[80px]",
        tone === "dark"
          ? "bg-[var(--canvas-dark)] text-[var(--on-dark)]"
          : "bg-[var(--canvas)] text-[var(--ink)]",
        className
      )}
      {...rest}
    >
      {children}
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
  onDark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  maxTitleWidth = "max-w-3xl",
  onDark = false,
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
            "mono-eyebrow",
            onDark ? "text-[var(--on-dark)] opacity-80" : "text-[var(--body)]"
          )}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "text-display-xl",
          onDark ? "text-[var(--on-dark)]" : "text-[var(--ink)]"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-[17px] leading-relaxed",
            onDark ? "text-[var(--on-dark)] opacity-80" : "text-[var(--body)]"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
