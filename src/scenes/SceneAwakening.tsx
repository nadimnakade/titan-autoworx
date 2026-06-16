import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroCanvas } from "@/components/three/HeroCanvas";
import { SplitText } from "@/components/ui/SplitText";
import { Aurora } from "@/components/ui/Aurora";
import { Magnetic } from "@/components/ui/Magnetic";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Counter } from "@/components/ui/Counter";
import { ArrowRight, ChevronDown, Cpu, Gauge, Radar } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export function SceneAwakening() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const hudRef = useRef<HTMLDivElement | null>(null);
  const blueprintRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scroll-driven camera intro reveal
      gsap.fromTo(
        ".hero-eyebrow",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 0.2 },
      );
      gsap.fromTo(
        ".hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 1.4 },
      );
      gsap.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "expo.out", delay: 1.7 },
      );
      gsap.fromTo(
        ".hero-hud",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "expo.out", stagger: 0.08, delay: 2 },
      );

      gsap.to(blueprintRef.current, {
        rotate: 360,
        duration: 32,
        repeat: -1,
        ease: "none",
      });

      gsap.to(hudRef.current, {
        y: -10,
        duration: 2.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(canvasRef.current, {
        scale: 1.12,
        yPercent: -6,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.1,
        },
      });

      gsap.to(".hero-grid-parallax", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });

      // Scroll-out (headline exits as we leave)
      gsap.to(".hero-headline-wrap", {
        yPercent: -30,
        opacity: 0.3,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="awakening"
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-titan-void grain"
    >
      {/* Background layers */}
      <div className="hero-grid-parallax absolute inset-0 grid-lines opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(232,69,60,0.15),transparent_60%)]" />
      <Aurora colors={["#E8453C", "#C8312A", "#13181F"]} blur={150} opacity={0.35} />

      {/* 3D Canvas */}
      <div ref={canvasRef} className="absolute inset-0 z-0 will-change-transform">
        <HeroCanvas />
      </div>

      {/* Vignette over canvas */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(10,13,18,0.7)_80%)]" />

      {/* Blueprint overlay (top-left) */}
      <svg
        ref={blueprintRef}
        className="absolute top-24 left-6 md:left-12 z-[2] w-56 h-56 opacity-30 hidden md:block"
        viewBox="0 0 200 200"
        fill="none"
      >
        <defs>
          <pattern id="bp-grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#AAB2BD" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#bp-grid)" />
        <circle cx="100" cy="100" r="60" stroke="#E8453C" strokeWidth="0.5" fill="none" />
        <circle cx="100" cy="100" r="80" stroke="#E8453C" strokeWidth="0.3" fill="none" />
        <circle cx="100" cy="100" r="40" stroke="#F2C14E" strokeWidth="0.3" fill="none" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#AAB2BD" strokeWidth="0.3" strokeDasharray="2 4" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="#AAB2BD" strokeWidth="0.3" strokeDasharray="2 4" />
        <text x="8" y="14" fill="#AAB2BD" fontSize="6" fontFamily="JetBrains Mono">BLUEPRINT.TAW-001</text>
        <text x="8" y="194" fill="#AAB2BD" fontSize="6" fontFamily="JetBrains Mono">SCALE 1:1.0</text>
      </svg>

      {/* Top-right HUD frame */}
      <div className="hero-corner absolute top-24 right-6 md:right-12 z-[2] hidden md:flex flex-col items-end gap-2">
        <div className="titan-label">SYS // CORE / TITAN-AW1</div>
        <div className="flex items-center gap-2 titan-mono">
          <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
          <span>LIVE FEED</span>
        </div>
        <div className="font-mono text-[10px] text-titan-steel/60">
          LAT 52.5200 · LON 13.4050
        </div>
      </div>

      {/* Headline */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 max-w-7xl">
        <div className="hero-headline-wrap">
          <div className="hero-eyebrow flex items-center gap-3 mb-6">
            <span className="titan-label">[ EST. 2008 / BERLIN — DUBAI — DETROIT ]</span>
            <span className="h-px w-12 bg-titan-ember" />
          </div>

          <h1 className="titan-display text-titan-bone text-[clamp(3rem,11vw,10rem)] leading-[0.85] tracking-tighter">
            <span className="block overflow-hidden">
              <SplitText
                text="BUILT TO HANDLE"
                className="block"
                delay={0.4}
                stagger={0.04}
                as="span"
              />
            </span>
            <span className="block overflow-hidden">
              <SplitText
                text="ANYTHING"
                className="block text-titan-ember"
                delay={0.9}
                stagger={0.05}
                as="span"
              />
            </span>
            <span className="block overflow-hidden flex items-baseline gap-4">
              <span className="text-stroke-thin text-titan-steel/30 text-[0.7em]">/</span>
              <SplitText
                text="ON FOUR WHEELS"
                className="block"
                delay={1.3}
                stagger={0.04}
                as="span"
              />
            </span>
          </h1>

          <p className="hero-sub mt-10 max-w-xl text-titan-steel text-base md:text-lg leading-relaxed">
            We don't restore cars. We <span className="text-titan-bone">re-engineer</span> them.
            Titan AutoWorx is a motorsport atelier, performance lab, and engine forge —
            obsessed with extracting the absolute limit from every machine that enters our floor.
          </p>

          <div className="hero-cta mt-10 flex flex-wrap items-center gap-4">
            <Magnetic>
              <AnimatedButton
                variant="primary"
                icon={<ArrowRight className="h-3.5 w-3.5" />}
                onClick={() => {
                  document.getElementById("capability")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore Capability
              </AnimatedButton>
            </Magnetic>
            <Magnetic>
              <AnimatedButton
                variant="outline"
                icon={<ArrowRight className="h-3.5 w-3.5" />}
                onClick={() => {
                  document.getElementById("machines")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                View Builds
              </AnimatedButton>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* HUD bottom-left telemetry */}
      <div
        ref={hudRef}
        className="hero-hud absolute bottom-24 left-6 md:left-12 z-[2] hidden md:flex flex-col gap-2 max-w-xs"
      >
        <div className="titan-label">TELEMETRY // ACTIVE</div>
        <div className="grid grid-cols-3 gap-3 font-mono text-[10px]">
          <div>
            <div className="text-titan-steel/60">RPM</div>
            <div className="text-titan-bone">
              <Counter to={8400} duration={2.4} />
            </div>
          </div>
          <div>
            <div className="text-titan-steel/60">BOOST</div>
            <div className="text-titan-ember">+1.4 BAR</div>
          </div>
          <div>
            <div className="text-titan-steel/60">LAP</div>
            <div className="text-titan-bone">7:12.4</div>
          </div>
        </div>
        {/* Mini bar chart */}
        <div className="flex items-end gap-[2px] h-8">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-1 bg-titan-ember/80"
              style={{
                height: `${20 + Math.sin(i * 0.4) * 14 + Math.random() * 10}px`,
                opacity: 0.4 + (i / 24) * 0.6,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom-right KPIs */}
      <div className="hero-hud absolute bottom-24 right-6 md:right-12 z-[2] hidden md:flex flex-col items-end gap-1">
        <div className="titan-label">CUMULATIVE // 17 YEARS</div>
        <div className="flex items-baseline gap-2">
          <span className="titan-display text-titan-bone text-6xl">
            <Counter to={427} duration={2.6} />
          </span>
          <span className="font-mono text-xs text-titan-ember">BUILDS</span>
        </div>
        <div className="font-mono text-[10px] text-titan-steel/60">+ 92 CURRENTLY IN WORKSHOP</div>
      </div>

      {/* Top center index strip */}
      <div className="hero-corner absolute top-24 left-1/2 -translate-x-1/2 z-[2] hidden lg:flex items-center gap-2 titan-label">
        <Cpu className="h-3 w-3 text-titan-ember" />
        <span>SCENE 01 / 06</span>
        <span className="h-px w-8 bg-titan-steel/30" />
        <Gauge className="h-3 w-3 text-titan-gold" />
        <span>HERO // ACTIVE</span>
        <span className="h-px w-8 bg-titan-steel/30" />
        <Radar className="h-3 w-3 text-titan-steel" />
        <span>SCANNING</span>
      </div>

      {/* Scan line */}
      <div className="absolute inset-y-0 left-0 right-0 z-[3] pointer-events-none overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-titan-ember/80 to-transparent animate-scan-line" />
      </div>

      {/* Scroll indicator */}
      <div className="hero-corner absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2">
        <div className="titan-label">SCROLL TO ENTER</div>
        <ChevronDown className="h-4 w-4 text-titan-ember animate-bounce" />
      </div>

      {/* Corner brackets */}
      {[
        "top-4 left-4",
        "top-4 right-4",
        "bottom-4 left-4",
        "bottom-4 right-4",
      ].map((pos, i) => (
        <div
          key={i}
          className={`hero-corner absolute ${pos} z-[2] w-6 h-6 border-titan-ember/60 ${
            i === 0
              ? "border-t border-l"
              : i === 1
                ? "border-t border-r"
                : i === 2
                  ? "border-b border-l"
                  : "border-b border-r"
          }`}
        />
      ))}
    </section>
  );
}
