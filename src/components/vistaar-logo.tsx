import { cn } from "@/lib/utils";

/**
 * Vistaar wordmark — a custom infinity-inspired mark + wordmark.
 * Adopts the new design system:
 *  - On dark surfaces → white mark + white wordmark
 *  - On light surfaces → black mark + black wordmark
 */
export function VistaarLogo({
  className,
  showWordmark = true,
  onDark = false,
}: {
  className?: string;
  showWordmark?: boolean;
  onDark?: boolean;
}) {
  const text = onDark ? "text-[var(--on-dark)]" : "text-[var(--ink)]";
  return (
    <span className={cn("inline-flex items-center", className)} aria-label="Vistaar">
      <span className="flex items-center gap-2.5">
        <svg
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0"
          aria-hidden
        >
          <defs>
            <linearGradient id="vlg-new" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fc4c02" />
              <stop offset="50%" stopColor="#ef2cc1" />
              <stop offset="100%" stopColor="#bdbbff" />
            </linearGradient>
          </defs>
          <path
            d="M20 6c-4 0-7 2.6-7 6.5 0 3.3 2 5.4 4.6 7.5l3.4 2.7c.4.3.9.3 1.3 0l3.4-2.7C28 17.9 30 15.8 30 12.5 30 8.6 27 6 23 6c-1.3 0-2.4.4-3 1-.6-.6-1.7-1-3-1z"
            fill="url(#vlg-new)"
          />
          <path
            d="M20 34c4 0 7-2.6 7-6.5 0-3.3-2-5.4-4.6-7.5l-3.4-2.7c-.4-.3-.9-.3-1.3 0L14.3 20C12 22.1 10 24.2 10 27.5 10 31.4 13 34 17 34c1.3 0 2.4-.4 3-1 .6.6 1.7 1 3 1z"
            fill="url(#vlg-new)"
            opacity="0.9"
          />
        </svg>
        {showWordmark && (
          <span
            className={cn(
              "text-[18px] font-medium tracking-[-0.02em]",
              text
            )}
          >
            vistaar
          </span>
        )}
      </span>
    </span>
  );
}
