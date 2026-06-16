import { type ReactNode, useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

/**
 * 21st.dev style Spotlight — radial gradient that follows the cursor.
 */
export function Spotlight({
  className,
  size = 600,
  color = "232, 69, 60",
  intensity = 0.35,
  children,
}: {
  className?: string;
  size?: number;
  color?: string;
  intensity?: number;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [pos, setPos] = useState({ x: -9999, y: -9999 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setOpacity(1);
    };
    const onLeave = () => setOpacity(0);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={cn("relative overflow-hidden", className)}
      style={
        {
          "--spotlight-x": `${pos.x}px`,
          "--spotlight-y": `${pos.y}px`,
          "--spotlight-size": `${size}px`,
          "--spotlight-color": color,
          "--spotlight-intensity": intensity,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity,
          background: `radial-gradient(var(--spotlight-size) circle at var(--spotlight-x) var(--spotlight-y), rgba(var(--spotlight-color), var(--spotlight-intensity)), transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
