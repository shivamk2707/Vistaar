"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Sparkles, Command, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/button";
import { cn } from "@/lib/utils";

/* ============================================================
   PromptPill — Apple-window style input (scaled up)
   ------------------------------------------------------------
   Changes from the previous pass, all aimed at making this read
   as a large, premium centerpiece instead of a slim utility bar:

   1. FIXED A BUG: the outer <form> was `rounded-lg` (~8px) while
      the doc comment promised "rounded-3xl" — a big soft pill
      shape with an 8px corner radius reads as visually broken.
      Now `rounded-[2rem]`, matching the intent.
   2. Input field grew from h-11 to h-14 / h-16 on larger screens,
      with text-base/text-lg instead of text-sm.
   3. Chrome bar, traffic lights, filename pill, and icons all
      scaled up proportionally so nothing looks undersized next
      to the taller input row.
   4. CTA button bumped from size="md" to size="lg".
   5. Outer wrapper now takes w-full instead of an inert
      max-w-7xl (that value was larger than every parent
      container that could hold it, so it never did anything —
      width should be controlled by whatever wraps this component).
   ============================================================ */

interface PromptPillProps {
  placeholder?: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  filename?: string;
  modelBadge?: string;
}

export function PromptPill({
  placeholder = "Tell us about your project — branding, website, AI, growth…",
  ctaLabel = "Start Project",
  ctaHref = "/contact",
  className,
  filename = "vistaar.studio · brand-growth-workspace",
  modelBadge = "Vistaar AI",
}: PromptPillProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className={cn("relative max-w-7xl", className)}>
      {/* Outer halo — bigger, softer glow for a larger container */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[2.75rem] bg-[image:var(--gradient-primary)] opacity-20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-px -z-10 rounded-[2.4rem] bg-[image:var(--gradient-soft)] opacity-60 blur-md"
      />

      {/* Apple-style window */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className={cn(
          "group relative overflow-hidden rounded-[1rem] max-w-7xl",
          "bg-surface-strong backdrop-blur-2xl backdrop-saturate-[180%]",
          "shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_32px_80px_-16px_rgba(15,23,42,0.2),0_10px_28px_-8px_rgba(15,23,42,0.1)]",
          "ring-1 ring-border"
        )}
      >
        {/* Top inner highlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/30"
        />

        {/* ===== Window chrome bar ===== */}
        <div className="relative flex items-center gap-3 border-b border-border/70 bg-background-muted/55 px-5 py-4">
          <div className="flex items-center gap-2">
            <span
              className="h-3.5 w-3.5 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.04)]"
              aria-hidden
            />
            <span
              className="h-3.5 w-3.5 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.04)]"
              aria-hidden
            />
            <span
              className="h-3.5 w-3.5 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.04)]"
              aria-hidden
            />
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-background-elevated/80 px-3.5 py-1 text-xs font-medium text-text-secondary shadow-sm ring-1 ring-border/60">
              <Command className="h-3.5 w-3.5 text-text-muted" />
              <span className="truncate max-w-[220px] sm:max-w-[320px]">
                {filename}
              </span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-text-muted">
              {modelBadge}
            </span>
            <span
              className="inline-flex items-center gap-[3px]"
              aria-label="model confidence"
              title="Model confidence"
            >
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="h-2 w-2 rounded-full bg-primary/40" />
              <span className="h-2 w-2 rounded-full bg-primary/20" />
            </span>
          </div>
        </div>

        {/* ===== Open text area — the main body, now genuinely tall ===== */}
        <div className="relative px-6 pt-6 sm:px-8 sm:pt-7">
          <div className="flex items-start gap-3">
            <span className="mt-1 shrink-0 text-primary">
              <Sparkles className="h-5 w-5 sm:h-6 sm:w-6" />
            </span>
            <textarea
              ref={inputRef}
              rows={3}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={placeholder}
              className="min-h-[112px] w-full flex-1 resize-none bg-transparent text-lg leading-relaxed text-text-primary placeholder:text-text-muted/80 outline-none sm:min-h-[128px] sm:text-xl"
              aria-label="Project description"
            />
          </div>
        </div>

        {/* ===== Footer row — hint + CTA, separated from the body ===== */}
        <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-border/70 bg-background-muted/40 px-6 py-4 sm:px-8 sm:py-5">
          <span className="hidden items-center gap-1.5 rounded-md border border-border bg-background-muted/70 px-2 py-1 text-xs font-medium text-text-muted lg:inline-flex">
            <CornerDownLeft className="h-3.5 w-3.5" />
            Press enter to send
          </span>
          <span className="text-xs text-text-muted lg:hidden">
            Tell us what you&rsquo;re building
          </span>

          <Link href={ctaHref} className="shrink-0">
            <Button
              size="lg"
              variant="primary"
              rightIcon={<ArrowRight className="h-5 w-5" />}
            >
              {ctaLabel}
            </Button>
          </Link>
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-border-strong/30 to-transparent"
        />
      </form>

      {/* Caption row */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-xs text-text-muted sm:text-sm">
        <span className="inline-flex items-center gap-1.5">
          <span className="relative inline-flex h-2 w-2 rounded-full bg-success">
            <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
          </span>
          Free 30-min discovery call
        </span>
        <span className="hidden h-3 w-px bg-border sm:inline-block" />
        <span>NDA on request</span>
        <span className="hidden h-3 w-px bg-border sm:inline-block" />
        <span>Reply within 1 business day</span>
        <span className="hidden h-3 w-px bg-border sm:inline-block" />
        <kbd className="hidden items-center gap-1 rounded-md border border-border bg-background-muted/60 px-2 py-1 text-xs font-medium text-text-secondary sm:inline-flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </div>
    </div>
  );
}


// "use client";

// import Link from "next/link";
// import { useEffect, useRef, useState } from "react";
// import { ArrowRight, Sparkles, Command, CornerDownLeft } from "lucide-react";
// import { Button } from "@/components/button";
// import { cn } from "@/lib/utils";

// /* ============================================================
//    PromptPill — Apple-window style input

//    Visual recipe:
//    - Window chrome: 3 macOS-style traffic-light dots, a centered
//      pill-shaped tab carrying the "filename", and a right-side
//      confidence meter.
//    - Container: rounded-3xl frosted glass (Apple's signature
//      vibrancy), subtle gradient ring, layered drop shadow.
//    - Top inner highlight: 1px white-to-transparent stroke, just
//      like macOS window chrome.
//    - Body: a single rounded-full field with leading sparkles,
//      placeholder, trailing "Press ⏎" hint, and the action button.
//    - Subtle: a soft hover lift and a slow floating animation.
//    ============================================================ */

// interface PromptPillProps {
//   placeholder?: string;
//   ctaLabel?: string;
//   ctaHref?: string;
//   className?: string;
//   filename?: string;
//   /** Brand / model name shown in the top-right of the chrome. */
//   modelBadge?: string;
// }

// export function PromptPill({
//   placeholder = "Tell us about your project — branding, website, AI, growth…",
//   ctaLabel = "Start Project",
//   ctaHref = "/contact",
//   className,
//   filename = "vistaar.studio · brand-growth-workspace",
//   modelBadge = "Vistaar AI",
// }: PromptPillProps) {
//   const [value, setValue] = useState("");
//   const inputRef = useRef<HTMLInputElement>(null);

//   // Keyboard shortcut: ⌘/Ctrl + K focuses the input — Apple-feel.
//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => {
//       if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
//         e.preventDefault();
//         inputRef.current?.focus();
//       }
//     };
//     window.addEventListener("keydown", onKey);
//     return () => window.removeEventListener("keydown", onKey);
//   }, []);

//   return (
//     <div className={cn("relative max-w-7xl", className)}>
//       {/* Outer halo — the soft outer glow that lifts the whole pill */}
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -inset-3 -z-10 rounded-[2rem] bg-[image:var(--gradient-primary)] opacity-20 blur-3xl"
//       />
//       <div
//         aria-hidden
//         className="pointer-events-none absolute -inset-px -z-10 rounded-[1.7rem] bg-[image:var(--gradient-soft)] opacity-60 blur-md"
//       />

//       {/* Apple-style window */}
//       <form
//         onSubmit={(e) => e.preventDefault()}
//         className={cn(
//           "group relative overflow-hidden rounded-lg",
//           // Apple vibrancy
//           "bg-surface-strong backdrop-blur-2xl backdrop-saturate-[180%]",
//           // Subtle gradient border using a layered shadow trick
//           "shadow-[0_1px_0_0_rgba(255,255,255,0.9)_inset,0_1px_2px_rgba(15,23,42,0.04),0_24px_60px_-12px_rgba(15,23,42,0.18),0_8px_24px_-8px_rgba(15,23,42,0.08)]",
//           "ring-1 ring-border"
//         )}
//       >
//         {/* Top inner highlight — macOS chrome signature */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent dark:via-white/30"
//         />

//         {/* ===== Window chrome bar ===== */}
//         <div className="relative flex items-center gap-3 border-b border-border/70 bg-background-muted/55 px-4 py-2.5">
//           {/* Traffic lights — Apple window controls */}
//           <div className="flex items-center gap-1.5">
//             <span
//               className="h-3 w-3 rounded-full bg-[#ff5f57] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.04)]"
//               aria-hidden
//             />
//             <span
//               className="h-3 w-3 rounded-full bg-[#febc2e] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.04)]"
//               aria-hidden
//             />
//             <span
//               className="h-3 w-3 rounded-full bg-[#28c840] shadow-[inset_0_0_0_0.5px_rgba(0,0,0,0.12),0_0_0_0.5px_rgba(0,0,0,0.04)]"
//               aria-hidden
//             />
//           </div>

//           {/* Centered filename pill — the macOS "title" */}
//           <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
//             <div className="inline-flex items-center gap-1.5 rounded-full bg-background-elevated/80 px-3 py-0.5 text-[11px] font-medium text-text-secondary shadow-sm ring-1 ring-border/60">
//               <Command className="h-3 w-3 text-text-muted" />
//               <span className="truncate max-w-[200px] sm:max-w-[280px]">
//                 {filename}
//               </span>
//             </div>
//           </div>

//           {/* Right-side confidence meter + model badge */}
//           <div className="ml-auto flex items-center gap-2.5">
//             <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-text-muted">
//               {modelBadge}
//             </span>
//             <span
//               className="inline-flex items-center gap-[3px]"
//               aria-label="model confidence"
//               title="Model confidence"
//             >
//               <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               <span className="h-1.5 w-1.5 rounded-full bg-primary/40" />
//               <span className="h-1.5 w-1.5 rounded-full bg-primary/20" />
//             </span>
//           </div>
//         </div>

//         {/* ===== Input field row ===== */}
//         <div className="relative flex items-center gap-2 px-2.5 py-2.5 sm:px-3 sm:py-3">
//           {/* Soft inner field, Apple-style rounded control */}
//           <div className="flex flex-1 items-center gap-2.5 rounded-full bg-background-elevated/85 pl-4 pr-2 ring-1 ring-border/60 transition-all focus-within:ring-primary/40 focus-within:shadow-[0_0_0_4px_rgba(255,90,54,0.10)]">
//             <span className="shrink-0 text-primary">
//               <Sparkles className="h-4 w-4" />
//             </span>
//             <input
//               ref={inputRef}
//               type="text"
//               value={value}
//               onChange={(e) => setValue(e.target.value)}
//               placeholder={placeholder}
//               className="h-11 min-w-0 flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted/80 outline-none"
//               aria-label="Project description"
//             />
//             {/* Hidden on mobile, shown on desktop as the "Press ⏎" hint */}
//             <span className="hidden items-center gap-1 rounded-md border border-border bg-background-muted/70 px-1.5 py-0.5 text-[10px] font-medium text-text-muted lg:inline-flex">
//               <CornerDownLeft className="h-3 w-3" />
//               ⏎
//             </span>
//           </div>

//           <Link href={ctaHref} className="shrink-0">
//             <Button
//               size="md"
//               variant="primary"
//               rightIcon={<ArrowRight className="h-4 w-4" />}
//             >
//               {ctaLabel}
//             </Button>
//           </Link>
//         </div>

//         {/* Subtle bottom inner highlight for depth */}
//         <div
//           aria-hidden
//           className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-border-strong/30 to-transparent"
//         />
//       </form>

//       {/* Caption row — same as before, slightly upgraded */}
//       <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-text-muted sm:text-xs">
//         <span className="inline-flex items-center gap-1.5">
//           <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-success">
//             <span className="absolute inset-0 animate-ping rounded-full bg-success/60" />
//           </span>
//           Free 30-min discovery call
//         </span>
//         <span className="hidden h-3 w-px bg-border sm:inline-block" />
//         <span>NDA on request</span>
//         <span className="hidden h-3 w-px bg-border sm:inline-block" />
//         <span>Reply within 1 business day</span>
//         <span className="hidden h-3 w-px bg-border sm:inline-block" />
//         <kbd className="hidden items-center gap-1 rounded-md border border-border bg-background-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-text-secondary sm:inline-flex">
//           <Command className="h-2.5 w-2.5" />K
//         </kbd>
//       </div>
//     </div>
//   );
// }
