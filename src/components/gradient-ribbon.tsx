import { cn } from "@/lib/utils";

/* ============================================================
   GradientRibbon — the brand signature.
   A three-stop ribbon (orange → magenta → periwinkle) that loops
   through layered translucent shapes. Never miniaturised to icon
   size; used at hero scale only.
   ============================================================ */
export function GradientRibbon({
  className,
  animate = true,
}: {
  className?: string;
  animate?: boolean;
}) {
  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="brand-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fc4c02" />
            <stop offset="50%" stopColor="#ef2cc1" />
            <stop offset="100%" stopColor="#bdbbff" />
          </linearGradient>
          <linearGradient id="brand-grad-vert" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#fc4c02" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#ef2cc1" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#bdbbff" stopOpacity="0.85" />
          </linearGradient>
          <filter id="soft-blur">
            <feGaussianBlur stdDeviation="2" />
          </filter>
        </defs>

        {/* Outer soft blob */}
        <ellipse
          cx="300"
          cy="300"
          rx="220"
          ry="260"
          fill="url(#brand-grad)"
          opacity="0.18"
          filter="url(#soft-blur)"
        />

        {/* Main ribbon — sweeping curve */}
        <path
          d="M 80 180 Q 200 80, 340 160 T 540 220 Q 480 340, 360 380 T 120 380 Q 60 280, 80 180 Z"
          fill="url(#brand-grad)"
          opacity="0.92"
        />

        {/* Highlight band */}
        <path
          d="M 120 200 Q 220 130, 340 200 Q 420 240, 480 240"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Inner floating shape */}
        <path
          d="M 200 280 Q 300 220, 400 280 Q 440 320, 380 360 Q 280 380, 220 340 Q 180 310, 200 280 Z"
          fill="url(#brand-grad-vert)"
          opacity="0.85"
        />

        {/* Tiny dot accents */}
        <circle cx="420" cy="120" r="6" fill="#fc4c02" opacity="0.7" />
        <circle cx="160" cy="460" r="8" fill="#ef2cc1" opacity="0.7" />
        <circle cx="500" cy="420" r="5" fill="#bdbbff" opacity="0.9" />
        <circle cx="120" cy="120" r="4" fill="#ffffff" opacity="0.5" />
      </svg>

      {animate && (
        <div className="pointer-events-none absolute inset-0 animate-float-slow" />
      )}
    </div>
  );
}
