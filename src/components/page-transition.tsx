"use client";

import { type ReactNode } from "react";
import { usePathname } from "next/navigation";

/**
 * PageTransition — soft fade + slight Y rise on route change.
 * Children remount on every pathname change (via `key`), so the animation
 * triggers each navigation. Lightweight — no GSAP, no Framer dependency.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-enter">
      {children}
    </div>
  );
}
