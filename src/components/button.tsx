"use client";

import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* ============================================================
   Button — Together-style.
   - 4px radius, no shadow on light, no decorative chrome.
   - Uppercase mono labels.
   - Variants: primary (black), secondary-mint, secondary-white,
     ghost-on-dark, outline.
   ============================================================ */

type Variant =
  | "primary"
  | "secondary-mint"
  | "secondary-white"
  | "ghost-on-dark"
  | "outline"
  | "ghost"
  | "link";

type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
  href?: string;
  external?: boolean;
}

type ButtonProps =
  | (BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined })
  | (BaseProps & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "href"> & { href: string });

const sizeClasses: Record<Size, string> = {
  sm: "h-8 px-4 text-[11px] gap-2",
  md: "h-10 px-5 text-[12px] gap-2",
  lg: "h-12 px-6 text-[12px] gap-2.5",
};

const baseClasses =
  "relative inline-flex items-center justify-center font-medium tracking-[0.05em] rounded-[4px] transition-all duration-150 select-none disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-[var(--primary)] text-[var(--on-primary)] hover:opacity-90 active:opacity-80",
  "secondary-mint":
    "bg-[var(--accent-mint)] text-[var(--ink)] hover:opacity-90",
  "secondary-white":
    "bg-[var(--canvas)] text-[var(--ink)] border border-[var(--hairline)] hover:border-[var(--ink)]",
  "ghost-on-dark":
    "bg-[var(--surface-dark-soft)] text-[var(--on-dark)] hover:bg-[#3d4452]",
  outline:
    "bg-[var(--canvas)] text-[var(--ink)] border border-[var(--hairline)] rounded-[3.25px] hover:border-[var(--ink)]",
  ghost:
    "bg-transparent text-[var(--ink)] hover:bg-[var(--hairline)]",
  link:
    "bg-transparent text-[var(--ink)] underline-offset-4 hover:underline p-0 h-auto",
};

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & { asLink?: boolean }
>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth,
      leftIcon,
      rightIcon,
      children,
      loading,
      disabled,
      type = "button",
      href,
      external,
      ...rest
    },
    ref
  ) => {
    const content = (
      <>
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent" />
          </span>
        )}
        <span
          className={cn(
            "inline-flex items-center justify-center gap-2",
            loading && "invisible"
          )}
        >
          {leftIcon}
          {children}
          {rightIcon}
        </span>
      </>
    );

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      variant !== "link" && sizeClasses[size],
      fullWidth && "w-full",
      className
    );

    if (href) {
      if (external) {
        return (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={classes}
          >
            {content}
          </a>
        );
      }
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={classes}
        {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);
Button.displayName = "Button";
