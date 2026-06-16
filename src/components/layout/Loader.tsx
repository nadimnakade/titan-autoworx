import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

/**
 * Cinematic Loader — pretitle countdown that boots the experience.
 */
export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"boot" | "ignite" | "go">("boot");
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let raf = 0;
    let start: number | null = null;
    const duration = 2400;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setProgress(p);
      if (p > 0.45 && p < 0.85) setPhase("ignite");
      if (p >= 0.85) setPhase("go");
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        gsap.to(ref.current, {
          yPercent: -100,
          duration: 1.1,
          ease: "expo.inOut",
          onComplete,
        });
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <div
      ref={ref}
      className="fixed inset-0 z-[200] bg-titan-void flex flex-col items-center justify-center overflow-hidden grain"
    >
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(232,69,60,0.18),transparent_60%)]" />

      <div className="relative z-10 w-full max-w-3xl px-6 flex flex-col items-center gap-10">
        <div className="flex items-center gap-3 titan-label">
          <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
          <span>SYSTEM // TITAN-AW1</span>
          <span className="h-px w-12 bg-titan-steel/30" />
          <span>v.9.2.4</span>
        </div>

        <div className="titan-display text-[clamp(3rem,12vw,9rem)] leading-none tracking-tighter text-titan-bone">
          TITAN
          <span className="text-titan-ember">.</span>
        </div>

        <div className="w-full flex flex-col gap-3">
          <div className="flex justify-between titan-label">
            <span>
              {phase === "boot" && "INITIALIZING ENGINE"}
              {phase === "ignite" && "CALIBRATING TELEMETRY"}
              {phase === "go" && "ALL SYSTEMS NOMINAL"}
            </span>
            <span>{Math.round(progress * 100)}%</span>
          </div>
          <div className="h-[2px] w-full bg-titan-steel/10 overflow-hidden">
            <div
              className={cn(
                "h-full bg-gradient-to-r from-titan-ember to-titan-gold transition-[width] duration-100",
              )}
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 titan-mono opacity-60 w-full">
          <div>
            <div className="text-titan-steel/50">HEMI.OUTPUT</div>
            <div className="text-titan-bone">{Math.round(720 * progress)} HP</div>
          </div>
          <div>
            <div className="text-titan-steel/50">TORQUE</div>
            <div className="text-titan-bone">{Math.round(900 * progress)} NM</div>
          </div>
          <div>
            <div className="text-titan-steel/50">0—100</div>
            <div className="text-titan-bone">{(3.1 * (1 - progress * 0.6)).toFixed(2)}S</div>
          </div>
        </div>
      </div>
    </div>
  );
}
