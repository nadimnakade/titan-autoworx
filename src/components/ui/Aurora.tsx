import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * 21st.dev style Aurora — animated conic/radial color field.
 */
export function Aurora({
  className,
  colors = ["#E8453C", "#C8312A", "#F2C14E", "#AAB2BD"],
  speed = 18,
  blur = 120,
  opacity = 0.55,
}: {
  className?: string;
  colors?: string[];
  speed?: number;
  blur?: number;
  opacity?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.0025;
      const x = 50 + Math.sin(t * speed * 0.05) * 25;
      const y = 50 + Math.cos(t * speed * 0.04) * 25;
      el.style.setProperty("--aurora-x", `${x}%`);
      el.style.setProperty("--aurora-y", `${y}%`);
      el.style.setProperty("--aurora-rotate", `${t * 20}deg`);
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [speed]);

  const stops = colors
    .map((c, i) => `${c} ${(i / colors.length) * 100}%`)
    .join(", ");

  return (
    <div
      ref={ref}
      className={cn("pointer-events-none absolute inset-0", className)}
      style={
        {
          opacity,
          filter: `blur(${blur}px)`,
          "--aurora-x": "50%",
          "--aurora-y": "50%",
          "--aurora-rotate": "0deg",
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0"
        style={{
          background: `conic-gradient(from var(--aurora-rotate) at var(--aurora-x) var(--aurora-y), ${stops})`,
          mixBlendMode: "screen",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at var(--aurora-x) var(--aurora-y), rgba(232, 69, 60, 0.35), transparent 60%)`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  );
}
