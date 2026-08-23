"use client";

import { type ReactNode, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
}: SectionHeadingProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as any }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "flex flex-col gap-6",
        align === "center"
          ? "items-center text-center mx-auto"
          : "items-start text-left",
        maxTitleWidth,
        className
      )}
    >
      {eyebrow && (
        <motion.div variants={itemVariants}>
          <span className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-semibold tracking-wide text-blue-400 backdrop-blur-md shadow-sm">
            {eyebrow}
          </span>
        </motion.div>
      )}
      <motion.h2
        variants={itemVariants}
        className={cn(
          "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
        )}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl leading-relaxed text-zinc-400 max-w-2xl"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
