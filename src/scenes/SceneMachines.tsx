import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/ui/SplitText";
import { Counter } from "@/components/ui/Counter";
import { builds } from "@/data/builds";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Gauge, Wrench } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function BuildArtwork({ build, index }: { build: (typeof builds)[0]; index: number }) {
  // Generate a procedural car silhouette SVG
  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${build.hue}`}>
      {/* Background grid */}
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(232,69,60,0.2),transparent_60%)]" />

      {/* Procedural car silhouette - varies by index */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 400"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id={`body-${build.id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#13181F" />
            <stop offset="60%" stopColor="#0A0D12" />
            <stop offset="100%" stopColor="#C8312A" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id={`glow-${build.id}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E8453C" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#E8453C" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Spotlight cone */}
        <ellipse cx="400" cy="380" rx="320" ry="20" fill="#E8453C" opacity="0.15" />

        {/* Car body - 911-style */}
        {index % 4 === 0 && (
          <g>
            <path
              d="M120 290 Q 140 220 200 200 L 280 170 Q 360 150 440 150 L 540 160 Q 620 170 660 220 L 690 270 Q 700 290 690 310 L 120 310 Q 110 300 120 290 Z"
              fill={`url(#body-${build.id})`}
              stroke="#E8453C"
              strokeWidth="1"
            />
            <path
              d="M260 200 L 360 175 L 480 175 L 560 200 L 530 220 L 300 220 Z"
              fill="#0A0D12"
              opacity="0.85"
            />
            <ellipse cx="190" cy="305" rx="40" ry="20" fill="#0A0D12" stroke="#F2C14E" strokeWidth="1.5" />
            <ellipse cx="620" cy="305" rx="40" ry="20" fill="#0A0D12" stroke="#F2C14E" strokeWidth="1.5" />
            <ellipse cx="190" cy="305" rx="20" ry="10" fill="#13181F" />
            <ellipse cx="620" cy="305" rx="20" ry="10" fill="#13181F" />
            <path d="M120 280 L 80 290 L 60 285" stroke="#E8453C" strokeWidth="3" fill="none" />
            <path d="M690 280 L 730 290 L 750 285" stroke="#E8453C" strokeWidth="3" fill="none" />
          </g>
        )}

        {/* GT-R style */}
        {index % 4 === 1 && (
          <g>
            <path
              d="M100 290 Q 110 230 160 210 L 250 180 Q 350 160 450 160 L 570 170 Q 660 180 700 230 L 720 280 Q 720 305 705 310 L 110 310 Q 95 305 100 290 Z"
              fill={`url(#body-${build.id})`}
              stroke="#E8453C"
              strokeWidth="1"
            />
            <path
              d="M280 200 L 380 178 L 480 178 L 560 200 L 530 220 L 320 220 Z"
              fill="#0A0D12"
              opacity="0.85"
            />
            <path d="M250 165 L 290 155 L 580 155 L 620 165 L 600 178 L 270 178 Z" fill="#0A0D12" />
            <ellipse cx="180" cy="305" rx="40" ry="20" fill="#0A0D12" stroke="#F2C14E" strokeWidth="1.5" />
            <ellipse cx="640" cy="305" rx="42" ry="22" fill="#0A0D12" stroke="#F2C14E" strokeWidth="1.5" />
            <ellipse cx="180" cy="305" rx="20" ry="10" fill="#13181F" />
            <ellipse cx="640" cy="305" rx="22" ry="11" fill="#13181F" />
            <path d="M100 280 L 60 290" stroke="#E8453C" strokeWidth="3" fill="none" />
          </g>
        )}

        {/* Huracán style */}
        {index % 4 === 2 && (
          <g>
            <path
              d="M100 300 Q 100 240 150 215 L 250 180 Q 360 155 470 155 L 590 165 Q 680 175 720 230 L 730 280 Q 730 305 715 310 L 100 310 Q 90 305 100 300 Z"
              fill={`url(#body-${build.id})`}
              stroke="#E8453C"
              strokeWidth="1"
            />
            <path
              d="M280 195 L 380 175 L 480 175 L 560 195 L 530 220 L 320 220 Z"
              fill="#0A0D12"
              opacity="0.85"
            />
            <path d="M340 200 L 460 200 L 470 215 L 330 215 Z" fill="#E8453C" opacity="0.6" />
            <ellipse cx="180" cy="305" rx="42" ry="22" fill="#0A0D12" stroke="#F2C14E" strokeWidth="1.5" />
            <ellipse cx="640" cy="305" rx="42" ry="22" fill="#0A0D12" stroke="#F2C14E" strokeWidth="1.5" />
            <path d="M100 280 L 60 290" stroke="#E8453C" strokeWidth="3" fill="none" />
          </g>
        )}

        {/* M3 style */}
        {index % 4 === 3 && (
          <g>
            <path
              d="M120 290 Q 130 220 190 200 L 280 175 Q 370 155 460 155 L 560 165 Q 640 180 680 230 L 700 280 Q 700 305 685 310 L 120 310 Q 110 305 120 290 Z"
              fill={`url(#body-${build.id})`}
              stroke="#E8453C"
              strokeWidth="1"
            />
            <path
              d="M270 195 L 370 175 L 480 175 L 550 195 L 520 220 L 310 220 Z"
              fill="#0A0D12"
              opacity="0.85"
            />
            <ellipse cx="190" cy="305" rx="40" ry="20" fill="#0A0D12" stroke="#F2C14E" strokeWidth="1.5" />
            <ellipse cx="630" cy="305" rx="40" ry="20" fill="#0A0D12" stroke="#F2C14E" strokeWidth="1.5" />
            <path d="M120 280 L 80 290" stroke="#E8453C" strokeWidth="3" fill="none" />
            {/* Twin exhaust */}
            <rect x="640" y="270" width="8" height="20" fill="#0A0D12" stroke="#F2C14E" />
            <rect x="660" y="270" width="8" height="20" fill="#0A0D12" stroke="#F2C14E" />
          </g>
        )}

        {/* Index overlay */}
        <text x="40" y="40" fill="#AAB2BD" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="2">
          {build.idx} / 0{builds.length} · {build.codename}
        </text>
        <text x="40" y="370" fill="#F2C14E" fontSize="9" fontFamily="JetBrains Mono" letterSpacing="2">
          [PROCEDURAL PREVIEW — VEHICLE 1:18]
        </text>
        <line x1="40" y1="50" x2="200" y2="50" stroke="#E8453C" strokeWidth="0.5" />
      </svg>
    </div>
  );
}

export function SceneMachines() {
  const ref = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const distance = () => track.scrollWidth - window.innerWidth;

      const horizontalTween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (builds.length - 1));
            setActive((p) => (p === idx ? p : idx));
          },
        },
      });

      // Parallax image inside each panel
      gsap.utils.toArray<HTMLElement>(".machine-art").forEach((art) => {
        gsap.to(art, {
          xPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: art,
            containerAnimation: horizontalTween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="machines"
      ref={ref}
      className="relative w-full h-screen bg-titan-void grain overflow-hidden"
    >
      {/* HUD top */}
      <div className="absolute top-24 left-6 md:left-12 z-30">
        <div className="flex items-center gap-3 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
          <span className="titan-label">SCENE 04 // THE BUILDS</span>
        </div>
        <h2 className="titan-display text-titan-bone text-5xl md:text-7xl">
          <SplitText text="MACHINES" trigger as="span" className="block" />
          <span className="block text-titan-ember">WE FORGE.</span>
        </h2>
      </div>

      <div className="absolute top-24 right-6 md:right-12 z-30 text-right">
        <div className="titan-label">SHOWING</div>
        <div className="titan-display text-titan-bone text-5xl">
          0{active + 1} <span className="text-titan-ember text-2xl">/ 0{builds.length}</span>
        </div>
        <div className="titan-label mt-2">HORIZONTAL SCROLL</div>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="absolute top-1/2 -translate-y-1/2 left-0 flex h-[80vh] gap-8 pl-[6vw] pr-[6vw] will-change-transform"
      >
        {builds.map((b, i) => (
          <article
            key={b.id}
            className="relative shrink-0 w-[88vw] md:w-[80vw] max-w-[1100px] grid md:grid-cols-12 gap-6 h-full"
          >
            {/* Image / Artwork */}
            <div className="md:col-span-7 h-full relative overflow-hidden clip-corner border border-titan-steel/10">
              <div className="machine-art absolute inset-0 scale-110">
                <BuildArtwork build={b} index={i} />
              </div>
              {/* Codename overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-titan-void via-titan-void/70 to-transparent z-10">
                <div className="titan-label">{b.tag}</div>
                <h3 className="titan-display text-titan-bone text-6xl md:text-8xl mt-1">
                  {b.codename}
                </h3>
                <div className="font-mono text-sm text-titan-ember mt-1">
                  {b.chassis} · {b.year}
                </div>
              </div>
              {/* Top-right corner index */}
              <div className="absolute top-4 right-4 titan-mono z-10">{b.idx}</div>
            </div>

            {/* Info */}
            <div className="md:col-span-5 h-full flex flex-col justify-between">
              <div>
                <div className="titan-label mb-2">// BRIEF</div>
                <p className="text-titan-bone text-xl leading-snug">
                  {b.description}
                </p>
                <p className="text-titan-steel text-sm leading-relaxed mt-4">
                  {b.story}
                </p>
              </div>

              {/* Big stats */}
              <div className="grid grid-cols-2 gap-4 my-6">
                <div>
                  <div className="titan-label">POWER</div>
                  <div className="titan-display text-titan-ember text-4xl">
                    {b.power}
                  </div>
                </div>
                <div>
                  <div className="titan-label">TORQUE</div>
                  <div className="titan-display text-titan-bone text-4xl">
                    {b.torque}
                  </div>
                </div>
                <div>
                  <div className="titan-label">0—100 KM/H</div>
                  <div className="titan-display text-titan-bone text-4xl">
                    {b.zeroSixty}
                  </div>
                </div>
                <div>
                  <div className="titan-label">TOP SPEED</div>
                  <div className="titan-display text-titan-bone text-4xl">
                    {b.topSpeed}
                  </div>
                </div>
              </div>

              {/* Specs list */}
              <div className="space-y-1 border-t border-titan-steel/10 pt-3">
                {b.specs.map((s) => (
                  <div
                    key={s.k}
                    className="grid grid-cols-2 gap-2 font-mono text-[11px]"
                  >
                    <span className="text-titan-steel/60">{s.k}</span>
                    <span className="text-titan-bone text-right">{s.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-12 left-6 right-6 md:left-12 md:right-12 z-30">
        <div className="flex items-center gap-4">
          <div className="titan-label whitespace-nowrap">
            {String(active + 1).padStart(2, "0")} / {String(builds.length).padStart(2, "0")}
          </div>
          <div className="flex-1 h-px bg-titan-steel/20 relative">
            {builds.map((_, i) => (
              <div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 h-2 w-2 rounded-full"
                style={{
                  left: `${(i / (builds.length - 1)) * 100}%`,
                  background:
                    i <= active ? "#E8453C" : "rgba(170,178,189,0.3)",
                  transform: `translate(-50%, -50%) scale(${i === active ? 1.4 : 1})`,
                  transition: "all 0.4s",
                }}
              />
            ))}
            <div
              className="absolute top-1/2 -translate-y-1/2 left-0 h-px bg-titan-ember"
              style={{
                width: `${(active / (builds.length - 1)) * 100}%`,
                transition: "width 0.4s",
              }}
            />
          </div>
          <div className="titan-label whitespace-nowrap flex items-center gap-2">
            SCROLL <ChevronRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
