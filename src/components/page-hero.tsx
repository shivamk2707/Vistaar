"use client";

import { cn } from "@/lib/utils";
import { Container } from "./layout";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * PageHero — shared hero for every inner page.
 * Upgraded with modern aesthetics, background grid, glowing orbs, and fluid typography.
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
    <section className="relative overflow-hidden bg-black text-white py-24 sm:py-32 lg:py-40 flex flex-col justify-center min-h-[50vh] border-b border-white/[0.08]">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-blue-500/20 blur-[120px]"></div>
        <div className="absolute right-0 bottom-0 -z-10 m-auto h-[300px] w-[300px] rounded-full bg-purple-500/20 blur-[120px]"></div>
      </div>

      <Container className="relative z-10">
        <div
          className={cn(
            "mx-auto flex max-w-4xl flex-col",
            align === "center" ? "items-center text-center" : "items-start text-left"
          )}
        >
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 px-4 text-xs sm:text-sm font-semibold tracking-wide text-neutral-300 backdrop-blur-md uppercase"
            >
              <span className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse" />
              {eyebrow}
            </motion.div>
          )}
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              "text-balance text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]",
            )}
          >
            {title}{" "}
            {highlight && (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 animate-gradient-x">
                {highlight}
              </span>
            )}
          </motion.h1>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "mt-8 max-w-2xl text-lg sm:text-xl leading-relaxed text-neutral-400",
                align === "center" && "mx-auto"
              )}
            >
              {description}
            </motion.p>
          )}

          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className={cn(
                "mt-10 flex flex-wrap items-center gap-4",
                align === "center" && "justify-center"
              )}
            >
              {children}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}
