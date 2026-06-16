import { cn } from "@/lib/utils";

/**
 * Animated border that traces the perimeter of a card using a rotating conic gradient.
 */
export function BorderBeam({
  className,
  duration = 6,
  colorFrom = "#E8453C",
  colorTo = "#F2C14E",
  delay = 0,
}: {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 clip-corner-sm",
        className,
      )}
      style={{
        background: `conic-gradient(from 0deg, transparent 0deg, ${colorFrom} 60deg, ${colorTo} 120deg, transparent 180deg, transparent 360deg)`,
        animation: `border-beam-spin ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
      }}
    >
      <style>{`
        @keyframes border-beam-spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
