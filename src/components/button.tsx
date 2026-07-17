"use client";

import { type ReactNode, type ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "gradient";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
  loading?: boolean;
}

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm rounded-full gap-1.5",
  md: "h-11 px-5 text-[0.95rem] rounded-full gap-2",
  lg: "h-12 px-6 text-base rounded-full gap-2",
};

const variantClasses: Record<Variant, string> = {
  // Coral solid — the primary reference look
  primary:
    "relative text-white shadow-coral bg-[image:var(--gradient-primary)] hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_16px_50px_rgba(255,90,54,0.42)] transition-all duration-200 before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 hover:before:opacity-100 before:transition-opacity before:bg-white/10",
  // Glassy neutral with border
  secondary:
    "bg-background-elevated text-text-primary border border-border hover:border-border-strong hover:shadow-card-hover hover:-translate-y-0.5 active:translate-y-0",
  // Coral gradient (softer, more saturated)
  gradient:
    "relative text-white shadow-coral bg-[image:var(--gradient-accent)] bg-[length:200%_200%] animate-gradient-pan hover:scale-[1.02] active:scale-[0.98]",
  ghost:
    "text-text-primary hover:bg-background-muted active:bg-background-muted/80",
  outline:
    "border border-border bg-transparent text-text-primary hover:bg-surface hover:border-border-strong",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
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
      ...rest
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-all duration-200 select-none disabled:opacity-50 disabled:pointer-events-none",
          sizeClasses[size],
          variantClasses[variant],
          fullWidth && "w-full",
          className
        )}
        {...rest}
      >
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
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
      </button>
    );
  }
);
Button.displayName = "Button";
