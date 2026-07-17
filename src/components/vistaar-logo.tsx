/**
 * Vistaar wordmark — a custom infinity-inspired mark + wordmark.
 * Coral primary brand mark with soft pastel gradient.
 * Vector-only SVG, theme-aware via currentColor.
 */
import { cn } from "@/lib/utils";

export function VistaarLogo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center", className)} aria-label="Vistaar">
      <span className="flex items-center gap-2.5">
        <svg
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 shrink-0"
          aria-hidden
        >
          <defs>
            <linearGradient id="vlg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff5a36" />
              <stop offset="55%" stopColor="#ff8a3d" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          {/* Infinity-inspired mark */}
          <path
            d="M20 6c-4 0-7 2.6-7 6.5 0 3.3 2 5.4 4.6 7.5l3.4 2.7c.4.3.9.3 1.3 0l3.4-2.7C28 17.9 30 15.8 30 12.5 30 8.6 27 6 23 6c-1.3 0-2.4.4-3 1-.6-.6-1.7-1-3-1z"
            fill="url(#vlg)"
          />
          <path
            d="M20 34c4 0 7-2.6 7-6.5 0-3.3-2-5.4-4.6-7.5l-3.4-2.7c-.4-.3-.9-.3-1.3 0L14.3 20C12 22.1 10 24.2 10 27.5 10 31.4 13 34 17 34c1.3 0 2.4-.4 3-1 .6.6 1.7 1 3 1z"
            fill="url(#vlg)"
            opacity="0.85"
          />
        </svg>
        {showWordmark && (
          <span className="font-display text-lg font-bold tracking-tight text-text-primary">
            vistaar
          </span>
        )}
      </span>
    </span>
  );
}
