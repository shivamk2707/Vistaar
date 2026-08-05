"use client";

import { useEffect, useState, useRef, type ReactNode } from "react";

/**
 * Reveal — scroll-driven entrance animation.
 * Wraps children with [data-reveal] which transitions to [data-reveal="visible"]
 * when the element scrolls into view. Pure IntersectionObserver, no deps.
 *
 * Props:
 *   delay — index used by [data-reveal-delay="N"] (0..8) to stagger siblings
 *   once — when true (default) the animation never reverses
 *   as / className — render as a specific element
 */
export function Reveal({
  children,
  delay = 0,
  once = true,
  className,
  threshold = 0.12,
  rootMargin = "0px 0px -8% 0px",
  direction,
}: {
  children: ReactNode;
  delay?: number;
  once?: boolean;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) obs.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        }
      },
      { threshold, rootMargin }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [once, threshold, rootMargin]);

  return (
    <div
      ref={ref}
      data-reveal={visible ? "visible" : "hidden"}
      data-reveal-delay={delay || undefined}
      data-reveal-dir={direction || undefined}
      className={className}
    >
      {children}
    </div>
  );
}
