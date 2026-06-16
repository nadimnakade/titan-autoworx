import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * 21st.dev style SpotlightCard — combines cursor spotlight with clip-corner border.
 */
export function SpotlightCard({
  children,
  className,
  spotlightColor = "232, 69, 60",
  spotlightSize = 400,
}: {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightSize?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", () => setIsHover(true));
    el.addEventListener("mouseleave", () => setIsHover(false));
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", () => setIsHover(true));
      el.removeEventListener("mouseleave", () => setIsHover(false));
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "group relative overflow-hidden bg-titan-carbon/40 clip-corner border border-titan-steel/10 transition-colors duration-500",
        className,
      )}
      style={
        {
          "--x": `${pos.x}px`,
          "--y": `${pos.y}px`,
          "--spot-size": `${spotlightSize}px`,
          "--spot-color": spotlightColor,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: `radial-gradient(var(--spot-size) circle at var(--x) var(--y), rgba(var(--spot-color), 0.18), transparent 50%)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(80px circle at var(--x) var(--y), rgba(255,255,255,0.06), transparent 70%)`,
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
