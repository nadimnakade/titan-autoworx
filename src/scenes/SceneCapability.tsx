import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BentoGrid, BentoCell } from "@/components/ui/Bento";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { SplitText } from "@/components/ui/SplitText";
import { Counter } from "@/components/ui/Counter";
import { capabilities } from "@/data/capabilities";
import { Activity, Cpu, Gauge, Wrench, Zap, Wind, Settings, Sparkles } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, any> = {
  engine: Cpu,
  aero: Wind,
  ecu: Zap,
  chassis: Settings,
  interior: Sparkles,
  track: Activity,
};

const accentColor: Record<string, string> = {
  ember: "232, 69, 60",
  gold: "242, 193, 78",
  steel: "170, 178, 189",
  bone: "232, 229, 221",
};

export function SceneCapability() {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".cap-cell").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "expo.out",
            delay: i * 0.06,
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
            },
          },
        );
      });

      // Live bar chart
      gsap.utils.toArray<HTMLElement>(".bar-fill").forEach((bar) => {
        const w = bar.dataset.w || "0";
        gsap.fromTo(
          bar,
          { width: "0%" },
          {
            width: `${w}%`,
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: { trigger: bar, start: "top 90%" },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capability"
      ref={ref}
      className="relative w-full py-32 md:py-48 bg-titan-void grain overflow-hidden"
    >
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(232,69,60,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_70%,rgba(242,193,78,0.06),transparent_50%)]" />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="grid md:grid-cols-12 gap-6 mb-20">
          <div className="md:col-span-2">
            <div className="titan-label">SCENE 02</div>
            <div className="font-mono text-xs text-titan-ember mt-1">
              02 / 06
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="h-3.5 w-3.5 text-titan-ember" />
              <span className="titan-label">CAPABILITY MATRIX</span>
            </div>
            <h2 className="titan-display text-titan-bone text-[clamp(2.5rem,7vw,6rem)] leading-[0.9]">
              <SplitText text="ENGINEERED" trigger as="span" className="block" />
              <SplitText text="DOMAINS." trigger as="span" className="block text-titan-ember" />
            </h2>
            <p className="mt-6 max-w-xl text-titan-steel">
              Six core engineering domains. Each one a complete vertical —
              from initial concept to track-validated delivery. We don't outsource
              disciplines. We own them.
            </p>
          </div>
          <div className="md:col-span-3 flex flex-col gap-3 justify-end">
            <div className="border-l-2 border-titan-ember pl-4">
              <div className="titan-label">SYSTEMS ACTIVE</div>
              <div className="titan-display text-titan-bone text-5xl">
                <Counter to={6} duration={1.2} />
              </div>
            </div>
            <div className="border-l-2 border-titan-gold pl-4">
              <div className="titan-label">ENGINEERS ON FLOOR</div>
              <div className="titan-display text-titan-bone text-5xl">
                <Counter to={38} duration={1.4} />
              </div>
            </div>
          </div>
        </div>

        {/* Bento grid */}
        <BentoGrid>
          {capabilities.map((c, i) => {
            const Icon = iconMap[c.id] || Cpu;
            const isWide = c.id === "engine" || c.id === "aero" || c.id === "ecu";
            return (
              <BentoCell key={c.id} className={`cap-cell ${c.span}`}>
                <SpotlightCard
                  className="h-full group"
                  spotlightColor={accentColor[c.accent]}
                  spotlightSize={isWide ? 600 : 400}
                >
                  {i === 0 && <BorderBeam duration={8} />}

                  <div className="relative h-full p-6 flex flex-col">
                    {/* Top row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 grid place-items-center border border-titan-steel/20 group-hover:border-titan-ember transition-colors">
                          <Icon className="h-4 w-4 text-titan-ember" />
                        </div>
                        <div>
                          <div className="titan-label">DOMAIN // {c.idx}</div>
                          <div className="font-mono text-[10px] text-titan-steel/60">{c.sub}</div>
                        </div>
                      </div>
                      <div className="titan-mono">{c.idx}</div>
                    </div>

                    {/* Title */}
                    <h3 className="titan-display text-titan-bone text-2xl md:text-3xl mb-3">
                      {c.title}
                    </h3>
                    <p className="text-titan-steel text-sm leading-relaxed mb-6">
                      {c.desc}
                    </p>

                    {/* Spacer */}
                    <div className="flex-1" />

                    {/* Stats */}
                    {isWide ? (
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {c.stat.map((s) => (
                          <div key={s.label} className="border-l-2 border-titan-ember/60 pl-3">
                            <div className="titan-label">{s.label}</div>
                            <div className="titan-display text-titan-bone text-2xl">
                              {s.value}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex items-baseline gap-3 mb-5">
                        <div>
                          <div className="titan-label">{c.stat[0].label}</div>
                          <div className="titan-display text-titan-bone text-2xl">
                            {c.stat[0].value}
                          </div>
                        </div>
                        <div>
                          <div className="titan-label">{c.stat[1].label}</div>
                          <div className="font-mono text-sm text-titan-ember">
                            {c.stat[1].value}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {c.tags.map((t) => (
                        <span
                          key={t}
                          className="font-mono text-[9px] tracking-widest px-2 py-1 border border-titan-steel/20 text-titan-steel/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Corner crosshair */}
                    <div className="absolute top-2 right-2 h-3 w-3 border-t border-r border-titan-ember/40" />
                    <div className="absolute bottom-2 left-2 h-3 w-3 border-b border-l border-titan-ember/40" />

                    {/* Index strip */}
                    <div className="absolute top-2 left-2 titan-label opacity-0 group-hover:opacity-100 transition-opacity">
                      [{c.idx}/{capabilities.length.toString().padStart(2, "0")}]
                    </div>
                  </div>
                </SpotlightCard>
              </BentoCell>
            );
          })}
        </BentoGrid>

        {/* Telemetry strip */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-titan-steel/10 pt-8">
          {[
            { l: "AVG. TURNAROUND", v: "14", s: "WEEKS" },
            { l: "DYNO HOURS / YR", v: "2,400", s: "HRS" },
            { l: "TRACK DAYS / YR", v: "84", s: "DAYS" },
            { l: "FAILURE RATE", v: "0.4", s: "%" },
          ].map((s) => (
            <div key={s.l} className="flex flex-col gap-1">
              <div className="titan-label">{s.l}</div>
              <div className="flex items-baseline gap-1">
                <span className="titan-display text-titan-bone text-4xl">{s.v}</span>
                <span className="font-mono text-[10px] text-titan-ember">{s.s}</span>
              </div>
              <div className="h-1 w-full bg-titan-steel/10 overflow-hidden mt-1">
                <div
                  className="bar-fill h-full bg-titan-ember"
                  data-w={Math.random() * 30 + 70}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
