import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { SplitText } from "@/components/ui/SplitText";
import { workshopNodes } from "@/data/capabilities";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

export function SceneEcosystem() {
  const ref = useRef<HTMLElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const orbRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          pin: true,
        },
      });

      // Zoom in
      tl.to(".workshop-stage", { scale: 1.6, ease: "none" }, 0);
      tl.to(".workshop-grid", { opacity: 0.4, ease: "none" }, 0);

      // Move camera through nodes
      const center = { x: 50, y: 50 };
      tl.to(orbRef.current, { x: 0, y: 0, duration: 0.1 }, 0);
      workshopNodes.forEach((n, i) => {
        const dx = (n.x - center.x) * 0.5;
        const dy = (n.y - center.y) * 0.5;
        tl.to(
          orbRef.current,
          { x: -dx * 12, y: -dy * 8, duration: 1, ease: "power1.inOut" },
          i,
        );
        tl.to(
          `#node-${n.id}`,
          { scale: 1.2, duration: 0.2, ease: "expo.out", yoyo: true, repeat: 1 },
          i + 0.5,
        );
      });

      // Reveal
      gsap.utils.toArray<HTMLElement>(".ws-node").forEach((el, i) => {
        gsap.fromTo(
          el,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: "expo.out",
            delay: i * 0.1,
            scrollTrigger: { trigger: ref.current, start: "top 60%" },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>(".ws-conn").forEach((el, i) => {
        gsap.fromTo(
          el,
          { strokeDashoffset: 200, opacity: 0 },
          {
            strokeDashoffset: 0,
            opacity: 0.6,
            duration: 1.4,
            ease: "expo.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: ref.current, start: "top 50%" },
          },
        );
      });

      // Pulse on nodes
      gsap.utils.toArray<HTMLElement>(".ws-pulse").forEach((el, i) => {
        gsap.to(el, {
          scale: 2.4,
          opacity: 0,
          duration: 2.5,
          repeat: -1,
          ease: "power2.out",
          delay: i * 0.3,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  // SVG connection lines between workshop nodes
  const connections = [
    ["design", "fab"],
    ["design", "engine"],
    ["design", "aero"],
    ["fab", "engine"],
    ["engine", "dyno"],
    ["paint", "interior"],
    ["aero", "track"],
    ["dyno", "track"],
    ["interior", "dyno"],
  ];

  const nodeMap = Object.fromEntries(workshopNodes.map((n) => [n.id, n]));

  return (
    <section
      id="ecosystem"
      ref={ref}
      className="relative w-full h-screen bg-titan-void grain overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines workshop-grid opacity-20" />

      {/* HUD label */}
      <div className="absolute top-24 left-6 md:left-12 z-20">
        <div className="flex items-center gap-3 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
          <span className="titan-label">SCENE 03 // WORKSHOP BLUEPRINT</span>
        </div>
        <h2 className="titan-display text-titan-bone text-5xl md:text-7xl">
          <SplitText text="THE ECOSYSTEM" trigger as="span" className="block" />
        </h2>
        <p className="titan-label mt-2 max-w-md">
          EVERY DEPARTMENT IS A NODE. EVERY NODE IS A SYSTEM. EXPLORE THE FLOOR.
        </p>
      </div>

      <div className="absolute top-24 right-6 md:right-12 z-20 text-right">
        <div className="titan-label">FLOOR AREA</div>
        <div className="titan-display text-titan-bone text-4xl">14,200<span className="text-titan-ember text-xl">m²</span></div>
        <div className="titan-label mt-2">8 DEPARTMENTS</div>
      </div>

      {/* The blueprint stage */}
      <div
        ref={orbRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="workshop-stage relative w-[min(140vw,160vh)] h-[min(140vw,160vh)]">
          {/* Concentric circles */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="absolute h-[80%] aspect-square rounded-full border border-titan-steel/10" />
            <div className="absolute h-[60%] aspect-square rounded-full border border-titan-steel/10" />
            <div className="absolute h-[40%] aspect-square rounded-full border border-titan-steel/10" />
            <div className="absolute h-[20%] aspect-square rounded-full border border-titan-ember/30" />
            <div className="absolute h-[6%] aspect-square rounded-full bg-titan-ember/20 blur-xl" />
          </div>

          {/* Center node */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-titan-ember/10 border border-titan-ember/40 grid place-items-center backdrop-blur-sm">
                <div className="h-3 w-3 rounded-full bg-titan-ember animate-pulse" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 titan-label whitespace-nowrap mt-12">
                TITAN CORE
              </div>
            </div>
          </div>

          {/* SVG lines */}
          <svg
            ref={svgRef}
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {connections.map(([a, b], i) => {
              const na = nodeMap[a];
              const nb = nodeMap[b];
              return (
                <line
                  key={i}
                  className="ws-conn"
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="#E8453C"
                  strokeWidth="0.15"
                  strokeDasharray="0.8 0.4"
                  style={{
                    strokeDasharray: 200,
                    strokeDashoffset: 200,
                  }}
                />
              );
            })}
          </svg>

          {/* Workshop nodes */}
          {workshopNodes.map((n) => (
            <div
              key={n.id}
              id={`node-${n.id}`}
              className="ws-node absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <div className="relative">
                <div className="ws-pulse absolute inset-0 -m-2 rounded-full border border-titan-ember/60" />
                <div className="relative h-12 w-12 rounded-full bg-titan-carbon/90 border border-titan-ember/40 grid place-items-center backdrop-blur-sm hover:scale-110 transition-transform cursor-pointer group">
                  <div className="h-1.5 w-1.5 rounded-full bg-titan-ember group-hover:bg-titan-gold" />
                </div>
                <div className="absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap text-center">
                  <div className="font-mono text-[9px] tracking-widest text-titan-bone">
                    {n.label}
                  </div>
                  <div className="font-mono text-[8px] text-titan-steel/60">
                    {n.sub}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Corner data */}
          <div className="absolute top-0 left-0 titan-label opacity-50">
            E.N 13.405 // N.L 52.520
          </div>
          <div className="absolute bottom-0 right-0 titan-label opacity-50">
            REVISION 9.2.4 // SCALE 1:240
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="absolute bottom-12 left-0 right-0 z-20 px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { l: "DEPARTMENTS", v: "08" },
            { l: "BAYS", v: "42" },
            { l: "ENGINEERS", v: "38" },
            { l: "DAYS OPEN", v: "6,205" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1">
              <div className="titan-label">{s.l}</div>
              <div className="titan-display text-titan-bone text-3xl">{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 titan-label">
        SCROLL TO TRAVERSE
      </div>
    </section>
  );
}
