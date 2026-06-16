import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/ui/SplitText";
import { processSteps } from "@/data/process";
import { ArrowRight, Check, Wrench, Zap, Activity, Gauge, Cpu, Trophy } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const stepIcons = [Wrench, Cpu, Zap, Activity, Gauge, Trophy];

export function SceneProcess() {
  const ref = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const distance = () => track.scrollWidth - window.innerWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${distance() + 400}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              processSteps.length - 1,
              Math.floor(self.progress * processSteps.length),
            );
            setActive(idx);
          },
        },
      });

      // Progress fill
      gsap.utils.toArray<HTMLElement>(".proc-progress-fill").forEach((p) => {
        gsap.to(p, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: () => `+=${distance() + 400}`,
            scrub: 1,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={ref}
      className="relative w-full h-screen bg-titan-void grain overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(232,69,60,0.04),transparent)]" />

      {/* Header */}
      <div className="absolute top-24 left-6 md:left-12 z-30">
        <div className="flex items-center gap-3 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
          <span className="titan-label">SCENE 05 // PIT LANE PROTOCOL</span>
        </div>
        <h2 className="titan-display text-titan-bone text-5xl md:text-7xl">
          <SplitText text="ENGINEERING" trigger as="span" className="block" />
          <span className="block text-titan-ember">PROCESS.</span>
        </h2>
      </div>

      <div className="absolute top-24 right-6 md:right-12 z-30 text-right">
        <div className="titan-label">CYCLE</div>
        <div className="titan-display text-titan-bone text-4xl">20 WEEKS</div>
        <div className="titan-label mt-2">6 PHASES</div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 flex h-[80vh] will-change-transform"
      >
        {/* Intro panel */}
        <div className="shrink-0 w-screen h-full grid place-items-center px-12">
          <div className="max-w-2xl">
            <div className="titan-label mb-4">// BRIEFING</div>
            <h3 className="titan-display text-titan-bone text-7xl md:text-9xl leading-[0.85]">
              FROM
              <br />
              <span className="text-titan-ember">CONCEPT</span>
              <br />
              TO
              <br />
              <span className="text-stroke-thin text-titan-bone">DELIVERY.</span>
            </h3>
            <div className="mt-8 flex items-center gap-3 titan-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
              <span>SCROLL TO TRAVERSE THE PROTOCOL</span>
              <ArrowRight className="h-3 w-3" />
            </div>
          </div>
        </div>

        {processSteps.map((s, i) => {
          const Icon = stepIcons[i] || Wrench;
          return (
            <div
              key={s.idx}
              className="shrink-0 w-screen h-full grid md:grid-cols-2 gap-12 px-12 md:px-24 items-center"
            >
              {/* Left — visual */}
              <div className="relative h-[60vh] max-h-[600px]">
                <div className="absolute inset-0 grid-lines opacity-30" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(232,69,60,0.12),transparent_60%)]" />
                <div className="relative h-full flex items-center justify-center">
                  {/* Big number */}
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="titan-display text-[clamp(12rem,30vw,30rem)] text-titan-steel/10 leading-none">
                      {s.idx}
                    </span>
                  </div>
                  {/* Center mark */}
                  <div className="relative">
                    <div className="absolute inset-0 -m-12">
                      <div className="h-full w-full rounded-full border border-titan-ember/30 animate-spin-slow" />
                    </div>
                    <div className="absolute inset-0 -m-20">
                      <div className="h-full w-full rounded-full border border-titan-gold/20 animate-spin-slower" />
                    </div>
                    <div className="relative h-40 w-40 rounded-full bg-titan-carbon/90 border border-titan-ember/40 grid place-items-center backdrop-blur-md">
                      <Icon className="h-16 w-16 text-titan-ember" strokeWidth={1} />
                      <div className="absolute -bottom-3 titan-label bg-titan-void px-2">
                        {s.duration}
                      </div>
                    </div>
                  </div>
                  {/* Tick marks */}
                  {Array.from({ length: 8 }).map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute h-1 w-1 rounded-full bg-titan-ember"
                      style={{
                        left: "50%",
                        top: "50%",
                        transform: `rotate(${idx * 45}deg) translateY(-180px)`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Right — info */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="titan-label text-titan-ember">PHASE // {s.idx}</span>
                  <span className="h-px flex-1 bg-titan-ember/30" />
                </div>
                <h3 className="titan-display text-titan-bone text-7xl md:text-8xl leading-[0.85] mb-2">
                  {s.title}
                </h3>
                <div className="font-mono text-sm text-titan-ember mb-6">{s.role}</div>
                <p className="text-titan-bone text-lg leading-relaxed mb-8 max-w-md">
                  {s.description}
                </p>

                {/* KPIs */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {s.kpis.map((k) => (
                    <div
                      key={k.label}
                      className="border-l-2 border-titan-ember/60 pl-3"
                    >
                      <div className="titan-label">{k.label}</div>
                      <div className="titan-display text-titan-bone text-2xl">
                        {k.value}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Outputs */}
                <div className="flex flex-col gap-2">
                  <div className="titan-label">DELIVERABLES</div>
                  {s.outputs.map((o) => (
                    <div
                      key={o}
                      className="flex items-center gap-3 font-mono text-xs text-titan-bone"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-titan-ember" />
                      <span>{o}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}

        {/* Outro */}
        <div className="shrink-0 w-screen h-full grid place-items-center px-12">
          <div className="text-center">
            <div className="titan-display text-titan-ember text-[clamp(6rem,15vw,14rem)] leading-[0.85]">
              427
            </div>
            <div className="titan-label">BUILDS COMPLETED</div>
            <div className="mt-8 flex items-center gap-3 titan-mono justify-center">
              <Check className="h-3.5 w-3.5 text-titan-ember" />
              <span>PROTOCOL CERTIFIED</span>
            </div>
          </div>
        </div>
      </div>

      {/* Progress track */}
      <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 z-30">
        <div className="flex items-center gap-4">
          <div className="titan-label whitespace-nowrap">
            PHASE 0{active + 1} / 0{processSteps.length}
          </div>
          <div className="flex-1 h-px bg-titan-steel/20 relative">
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-px bg-titan-ember"
              style={{
                width: `${(active / (processSteps.length - 1)) * 100}%`,
                transition: "width 0.3s",
              }}
            />
            <div
              className="proc-progress-fill absolute top-1/2 -translate-y-1/2 left-0 h-px bg-titan-ember origin-left"
              style={{ width: "100%", transform: "scaleX(0)" }}
            />
            {processSteps.map((s, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full border"
                style={{
                  left: `${(i / (processSteps.length - 1)) * 100}%`,
                  background: i <= active ? "#E8453C" : "transparent",
                  borderColor: i <= active ? "#E8453C" : "rgba(170,178,189,0.3)",
                  transform: `translate(-50%, -50%) scale(${i === active ? 1.3 : 1})`,
                  transition: "all 0.4s",
                }}
              />
            ))}
          </div>
          <div className="titan-label whitespace-nowrap flex items-center gap-2">
            <span className="text-titan-ember">●</span> SCROLL
          </div>
        </div>
      </div>
    </section>
  );
}
