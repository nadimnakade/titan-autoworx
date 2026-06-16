import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/components/ui/SplitText";
import { builds } from "@/data/builds";
import { ChevronRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

function BuildPhotoPanel({ build }: { build: (typeof builds)[0] }) {
  return (
    <div className="relative h-full">
      <div className={`absolute inset-0 bg-gradient-to-br ${build.hue}`} />
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_18%,rgba(242,193,78,0.16),transparent_24%)]" />

      <div className="machine-image-shell absolute inset-0 overflow-hidden clip-corner">
        <img
          src={build.image}
          alt={build.imageAlt}
          className="machine-photo h-full w-full object-cover"
          loading="eager"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(10,13,18,0.85)_0%,rgba(10,13,18,0.18)_45%,rgba(10,13,18,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,transparent_10%,rgba(10,13,18,0.35)_70%,rgba(10,13,18,0.9)_100%)]" />
        <div className="machine-flare absolute inset-y-0 -left-1/4 w-1/3 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-2xl opacity-0" />
      </div>

      <div className="absolute inset-y-8 left-8 right-8 pointer-events-none">
        <div className="absolute left-0 top-0 titan-label text-titan-bone/70">
          LIVE BUILD VISUAL
        </div>
        <div className="absolute right-0 top-0 font-mono text-[10px] tracking-[0.35em] text-titan-ember">
          {build.idx}
        </div>
        <div className="absolute left-0 bottom-0 right-0 h-px machine-line bg-gradient-to-r from-titan-ember via-titan-gold to-transparent" />
        <div className="absolute left-0 top-6 bottom-6 w-px machine-line bg-gradient-to-b from-titan-ember to-transparent" />
      </div>

      <div className="absolute right-5 top-20 hidden lg:grid gap-3 w-44 z-10">
        <div className="machine-data-plate clip-corner-sm border border-white/10 bg-black/25 p-2 backdrop-blur-md">
          <img
            src={build.image}
            alt=""
            aria-hidden
            className="h-24 w-full object-cover clip-corner-sm opacity-90"
            style={{ objectPosition: "center 28%" }}
          />
        </div>
        <div className="machine-data-plate clip-corner-sm border border-white/10 bg-black/25 p-2 backdrop-blur-md">
          <img
            src={build.image}
            alt=""
            aria-hidden
            className="h-20 w-full object-cover clip-corner-sm opacity-90"
            style={{ objectPosition: "center 72%" }}
          />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 p-6 md:p-8 bg-gradient-to-t from-titan-void via-titan-void/72 to-transparent">
        <div className="machine-copy titan-label">{build.tag}</div>
        <div className="machine-copy mt-2 flex items-end justify-between gap-4">
          <div>
            <h3 className="titan-display text-titan-bone text-[clamp(3.8rem,9vw,8rem)] leading-[0.8]">
              {build.codename}
            </h3>
            <div className="font-mono text-sm tracking-[0.24em] text-titan-ember mt-2">
              {build.chassis} · {build.year}
            </div>
          </div>
          <div className="hidden md:flex flex-col items-end font-mono text-[10px] tracking-[0.28em] text-titan-steel/70">
            <span>PHOTO PLATE //</span>
            <span>{build.power}</span>
          </div>
        </div>
      </div>
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

      gsap.to(".machines-backdrop", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: ref.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

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

      gsap.utils.toArray<HTMLElement>(".machine-card").forEach((card) => {
        const imageShell = card.querySelector<HTMLElement>(".machine-image-shell");
        const photo = card.querySelector<HTMLElement>(".machine-photo");
        const copy = card.querySelectorAll<HTMLElement>(".machine-copy");
        const stats = card.querySelectorAll<HTMLElement>(".machine-stat");
        const specs = card.querySelectorAll<HTMLElement>(".machine-spec-row");
        const lines = card.querySelectorAll<HTMLElement>(".machine-line");
        const dataPlates = card.querySelectorAll<HTMLElement>(".machine-data-plate");
        const flare = card.querySelector<HTMLElement>(".machine-flare");

        gsap.fromTo(
          card,
          { opacity: 0.35, scale: 0.94, rotateX: -8 },
          {
            opacity: 1,
            scale: 1,
            rotateX: 0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              containerAnimation: horizontalTween,
              start: "left 72%",
              end: "center center",
              scrub: true,
            },
          },
        );

        if (imageShell) {
          gsap.fromTo(
            imageShell,
            { clipPath: "inset(0 100% 0 0)" },
            {
              clipPath: "inset(0 0% 0 0)",
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 82%",
                end: "left 52%",
                scrub: true,
              },
            },
          );
        }

        if (photo) {
          gsap.fromTo(
            photo,
            { scale: 1.28, filter: "brightness(0.38) saturate(0.8)" },
            {
              scale: 1,
              filter: "brightness(0.9) saturate(1.05)",
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            },
          );
        }

        if (flare) {
          gsap.fromTo(
            flare,
            { xPercent: -150, opacity: 0 },
            {
              xPercent: 280,
              opacity: 0.75,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 75%",
                end: "right 20%",
                scrub: true,
              },
            },
          );
        }

        if (copy.length) {
          gsap.fromTo(
            copy,
            { y: 60, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.08,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 75%",
                end: "left 58%",
                scrub: true,
              },
            },
          );
        }

        if (stats.length) {
          gsap.fromTo(
            stats,
            { y: 34, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.05,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 66%",
                end: "left 44%",
                scrub: true,
              },
            },
          );
        }

        if (specs.length) {
          gsap.fromTo(
            specs,
            { x: 28, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 60%",
                end: "left 38%",
                scrub: true,
              },
            },
          );
        }

        if (lines.length) {
          gsap.fromTo(
            lines,
            { scaleX: 0, scaleY: 0, transformOrigin: "left center" },
            {
              scaleX: 1,
              scaleY: 1,
              stagger: 0.06,
              ease: "expo.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 72%",
                end: "left 46%",
                scrub: true,
              },
            },
          );
        }

        if (dataPlates.length) {
          gsap.fromTo(
            dataPlates,
            { x: 32, opacity: 0, rotateY: -16 },
            {
              x: 0,
              opacity: 1,
              rotateY: 0,
              stagger: 0.06,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                containerAnimation: horizontalTween,
                start: "left 62%",
                end: "left 40%",
                scrub: true,
              },
            },
          );
        }
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="machines"
      ref={ref}
      className="relative h-screen w-full overflow-hidden bg-titan-void grain"
    >
      <div className="machines-backdrop absolute inset-0 grid-lines opacity-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(232,69,60,0.12),transparent_30%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_78%,rgba(242,193,78,0.08),transparent_28%)]" />

      <div className="absolute top-20 left-6 md:left-12 z-30">
        <div className="flex items-center gap-3 mb-3">
          <span className="h-1.5 w-1.5 rounded-full bg-titan-ember animate-pulse" />
          <span className="titan-label">SCENE 04 // THE MACHINES WE BUILD</span>
        </div>
        <h2 className="titan-display text-titan-bone text-[clamp(3.5rem,8vw,7.5rem)] leading-[0.82]">
          <SplitText text="REAL MACHINES." trigger as="span" className="block" />
          <span className="block text-titan-ember">REAL PHOTOGRAPHY.</span>
        </h2>
      </div>

      <div className="absolute top-20 right-6 md:right-12 z-30 text-right">
        <div className="titan-label">SHOWING</div>
        <div className="titan-display text-titan-bone text-5xl">
          {String(active + 1).padStart(2, "0")}
          <span className="text-titan-ember text-2xl">
            {" "}
            / {String(builds.length).padStart(2, "0")}
          </span>
        </div>
        <div className="font-mono text-[10px] tracking-[0.28em] text-titan-steel mt-2">
          HORIZONTAL STORY DRIVE
        </div>
      </div>

      <div
        ref={trackRef}
        className="absolute left-0 top-1/2 flex h-[82vh] -translate-y-1/2 gap-10 pl-[6vw] pr-[8vw] will-change-transform"
      >
        {builds.map((build) => (
          <article
            key={build.id}
            className="machine-card relative grid h-full w-[92vw] max-w-[1380px] shrink-0 gap-6 md:w-[86vw] md:grid-cols-12"
          >
            <div className="relative h-full overflow-hidden clip-corner border border-titan-steel/10 md:col-span-7">
              <BuildPhotoPanel build={build} />
            </div>

            <div className="flex h-full flex-col justify-between md:col-span-5">
              <div className="machine-copy">
                <div className="mb-3 titan-label">// BUILD DOSSIER</div>
                <div className="machine-line mb-5 h-px w-24 bg-gradient-to-r from-titan-ember to-transparent" />
                <p className="max-w-lg text-2xl leading-snug text-titan-bone md:text-3xl">
                  {build.description}
                </p>
                <p className="mt-5 max-w-lg text-sm leading-relaxed text-titan-steel md:text-[15px]">
                  {build.story}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-8">
                <div className="machine-stat border-l-2 border-titan-ember/70 pl-3">
                  <div className="titan-label">POWER</div>
                  <div className="titan-display text-5xl leading-none text-titan-ember">
                    {build.power}
                  </div>
                </div>
                <div className="machine-stat border-l-2 border-titan-gold/70 pl-3">
                  <div className="titan-label">TORQUE</div>
                  <div className="titan-display text-5xl leading-none text-titan-bone">
                    {build.torque}
                  </div>
                </div>
                <div className="machine-stat border-l-2 border-titan-steel/70 pl-3">
                  <div className="titan-label">0—100 KM/H</div>
                  <div className="titan-display text-4xl leading-none text-titan-bone">
                    {build.zeroSixty}
                  </div>
                </div>
                <div className="machine-stat border-l-2 border-titan-ember/30 pl-3">
                  <div className="titan-label">TOP SPEED</div>
                  <div className="titan-display text-4xl leading-none text-titan-bone">
                    {build.topSpeed}
                  </div>
                </div>
              </div>

              <div className="space-y-2 border-t border-titan-steel/10 pt-4">
                {build.specs.map((spec) => (
                  <div
                    key={spec.k}
                    className="machine-spec-row grid grid-cols-2 gap-4 border-b border-white/5 pb-2 font-mono text-[11px] tracking-[0.18em]"
                  >
                    <span className="text-titan-steel/60">{spec.k}</span>
                    <span className="text-right text-titan-bone">{spec.v}</span>
                  </div>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="absolute bottom-12 left-6 right-6 z-30 md:left-12 md:right-12">
        <div className="flex items-center gap-4">
          <div className="titan-label whitespace-nowrap">
            {String(active + 1).padStart(2, "0")} / {String(builds.length).padStart(2, "0")}
          </div>
          <div className="relative h-px flex-1 bg-titan-steel/20">
            <div
              className="absolute left-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-titan-ember to-titan-gold"
              style={{
                width: `${(active / (builds.length - 1)) * 100}%`,
                transition: "width 0.35s ease",
              }}
            />
            {builds.map((_, index) => (
              <div
                key={index}
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border"
                style={{
                  left: `${(index / (builds.length - 1)) * 100}%`,
                  background: index <= active ? "#E8453C" : "rgba(170,178,189,0.15)",
                  borderColor: index <= active ? "#E8453C" : "rgba(170,178,189,0.35)",
                  transform: `translate(-50%, -50%) scale(${index === active ? 1.32 : 1})`,
                  transition: "all 0.35s ease",
                }}
              />
            ))}
          </div>
          <div className="flex items-center gap-2 titan-label whitespace-nowrap">
            SCROLL
            <ChevronRight className="h-3 w-3" />
          </div>
        </div>
      </div>
    </section>
  );
}
