import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

const ITEMS = [
  { id: "awakening", label: "Awakening", idx: "01" },
  { id: "capability", label: "Capability", idx: "02" },
  { id: "ecosystem", label: "Ecosystem", idx: "03" },
  { id: "machines", label: "Machines", idx: "04" },
  { id: "process", label: "Process", idx: "05" },
  { id: "network", label: "Network", idx: "06" },
];

/**
 * Floating Dock Navigation with scroll progress and active state.
 */
export function Dock() {
  const ref = useRef<HTMLElement | null>(null);
  const [active, setActive] = useState("awakening");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const p = total > 0 ? h.scrollTop / total : 0;
      setProgress(p);
      // Active section by midpoint
      for (const it of ITEMS) {
        const el = document.getElementById(it.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.4 && rect.bottom > 0) {
          setActive(it.id);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { y: 80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.4 },
    );
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between pointer-events-none">
        <a
          href="#awakening"
          data-cursor="HOME"
          className="pointer-events-auto flex items-center gap-3 group"
        >
          <div className="relative h-9 w-9 grid place-items-center">
            <div className="absolute inset-0 border border-titan-ember/40 group-hover:border-titan-ember transition-colors" />
            <div className="absolute inset-1 bg-titan-ember/10 group-hover:bg-titan-ember/20 transition-colors" />
            <span className="relative font-display text-titan-ember text-lg">T</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-titan-bone text-sm tracking-[0.3em]">TITAN</span>
            <span className="font-mono text-[9px] tracking-[0.4em] text-titan-steel">AUTOWORX</span>
          </div>
        </a>

        <div className="hidden md:flex pointer-events-auto items-center gap-3 titan-mono">
          <span className="text-titan-steel">EST. 2008</span>
          <span className="h-1 w-1 rounded-full bg-titan-ember" />
          <span className="text-titan-bone">BERLIN — DUBAI — DETROIT</span>
        </div>

        <a
          href="#network"
          data-cursor="ENGAGE"
          className="pointer-events-auto group relative flex items-center gap-3 px-4 py-2.5 clip-corner-sm border border-titan-ember/40 hover:border-titan-ember bg-titan-ember/5 hover:bg-titan-ember transition-all"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-titan-ember group-hover:bg-titan-void animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.4em] text-titan-bone group-hover:text-titan-void">
            ENGAGE
          </span>
        </a>
      </header>

      <nav
        ref={ref}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 opacity-0"
      >
        <div className="relative flex items-center gap-1 p-1.5 rounded-full bg-titan-carbon/80 backdrop-blur-xl border border-titan-steel/10 clip-corner-sm">
          <div
            className="absolute -top-1 left-0 h-px bg-gradient-to-r from-transparent via-titan-ember to-transparent transition-[width] duration-300"
            style={{ width: `${progress * 100}%` }}
          />
          {ITEMS.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              data-cursor={it.label.toUpperCase()}
              className={cn(
                "group relative flex items-center gap-2 px-3.5 py-2 rounded-full transition-all duration-500",
                active === it.id
                  ? "bg-titan-ember text-titan-void"
                  : "text-titan-steel hover:text-titan-bone",
              )}
            >
              <span className="font-mono text-[10px] tracking-widest">{it.idx}</span>
              <span
                className={cn(
                  "font-display text-[11px] tracking-[0.3em] uppercase overflow-hidden transition-all duration-500",
                  active === it.id ? "w-auto opacity-100" : "w-0 opacity-0 group-hover:w-auto group-hover:opacity-100",
                )}
              >
                {it.label}
              </span>
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
