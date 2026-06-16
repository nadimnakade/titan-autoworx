import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom cursor — follows the mouse with a magnetic outer ring and a precise inner dot.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current!;
    const ring = ringRef.current!;
    const label = labelRef.current!;

    const setX = gsap.quickTo(dot, "x", { duration: 0.2, ease: "power3.out" });
    const setY = gsap.quickTo(dot, "y", { duration: 0.2, ease: "power3.out" });
    const setRX = gsap.quickTo(ring, "x", { duration: 0.6, ease: "power3.out" });
    const setRY = gsap.quickTo(ring, "y", { duration: 0.6, ease: "power3.out" });
    const setLX = gsap.quickTo(label, "x", { duration: 0.4, ease: "power3.out" });
    const setLY = gsap.quickTo(label, "y", { duration: 0.4, ease: "power3.out" });

    let labelText = "";
    const setLabel = (t: string) => {
      if (t === labelText) return;
      labelText = t;
      label.textContent = t;
    };

    const onMove = (e: MouseEvent) => {
      setX(e.clientX);
      setY(e.clientY);
      setRX(e.clientX);
      setRY(e.clientY);
      setLX(e.clientX);
      setLY(e.clientY);
      const target = e.target as HTMLElement;
      const interact = target.closest("[data-cursor]");
      if (interact) {
        const t = interact.getAttribute("data-cursor") || "";
        setLabel(t);
        gsap.to(ring, { scale: 1.6, duration: 0.4, ease: "expo.out" });
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.4, ease: "expo.out" });
      } else {
        setLabel("");
        gsap.to(ring, { scale: 1, duration: 0.4, ease: "expo.out" });
        gsap.to(label, { opacity: 0, scale: 0.7, duration: 0.3, ease: "power3.out" });
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block"
        style={{ mixBlendMode: "difference" }}
      >
        <div className="h-10 w-10 rounded-full border border-titan-bone/60" />
      </div>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-titan-ember" />
      </div>
      <div
        ref={labelRef}
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center opacity-0 scale-70 px-3 py-1 rounded-full bg-titan-ember text-titan-void text-[10px] font-mono tracking-widest uppercase"
      />
    </>
  );
}
