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
    <img src="/images/vistaar_logo.png" alt="Vistaar Logo" width={90} />
  );
}
