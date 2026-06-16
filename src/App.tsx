import { useLenis } from "@/hooks/useLenis";
import { useEffect, useRef, useState } from "react";
import { SceneAwakening } from "@/scenes/SceneAwakening";
import { SceneCapability } from "@/scenes/SceneCapability";
import { SceneEcosystem } from "@/scenes/SceneEcosystem";
import { SceneMachines } from "@/scenes/SceneMachines";
import { SceneProcess } from "@/scenes/SceneProcess";
import { SceneNetwork } from "@/scenes/SceneNetwork";
import { Dock } from "@/components/layout/Dock";
import { Cursor } from "@/components/layout/Cursor";
import { Loader } from "@/components/layout/Loader";
import { MarqueeTicker } from "@/components/transition/MarqueeTicker";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function App() {
  useLenis();
  const [loaded, setLoaded] = useState(false);
  const transitionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = transitionRef.current;
    if (!el) return;

    const flash = () => {
      gsap.killTweensOf(el);
      const scan = el.querySelector(".tfx-scan");
      const vignette = el.querySelector(".tfx-vignette");
      const tl = gsap.timeline();
      tl.set(el, { autoAlpha: 1 })
        .fromTo(
          scan,
          { yPercent: -120, opacity: 0 },
          { yPercent: 120, opacity: 0.9, duration: 0.42, ease: "expo.out" },
          0,
        )
        .fromTo(
          vignette,
          { opacity: 0 },
          { opacity: 1, duration: 0.22, ease: "power2.out" },
          0,
        )
        .to(vignette, { opacity: 0, duration: 0.35, ease: "power2.inOut" }, 0.2)
        .to(el, { autoAlpha: 0, duration: 0.2, ease: "power2.out" }, 0.4);
    };

    const ids = ["capability", "ecosystem", "machines", "process", "network"];
    const triggers = ids.map((id) =>
      ScrollTrigger.create({
        trigger: `#${id}`,
        start: "top 70%",
        onEnter: flash,
        onEnterBack: flash,
      }),
    );

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div
        ref={transitionRef}
        className="pointer-events-none fixed inset-0 z-[140] opacity-0 relative grain"
      >
        <div className="tfx-vignette absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,69,60,0.14),transparent_62%)] opacity-0" />
        <div className="tfx-scan absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-titan-ember to-transparent opacity-0" />
      </div>
      <Cursor />
      <Dock />
      <main className="relative">
        <SceneAwakening />
        <MarqueeTicker
          items={[
            "BUILT TO HANDLE ANYTHING",
            "EST. 2008",
            "427 BUILDS",
            "BERLIN — DUBAI — DETROIT",
            "ENGINEERED — NOT ASSEMBLED",
            "ON FOUR WHEELS",
          ]}
        />
        <SceneCapability />
        <MarqueeTicker
          reverse
          items={[
            "FULL ENGINE BUILDS",
            "AERO & WIDEBODY",
            "ECU CALIBRATION",
            "CHASSIS GEOMETRY",
            "BESPOKE INTERIORS",
            "TRACK VALIDATION",
          ]}
        />
        <SceneEcosystem />
        <SceneMachines />
        <MarqueeTicker
          items={[
            "RHEA — 720 HP",
            "NYX — 1,250 HP",
            "ATLAS — 880 HP",
            "ORION — 680 HP",
            "FLAGSHIP // ATELIER // KING",
          ]}
        />
        <SceneProcess />
        <SceneNetwork />
      </main>
    </>
  );
}

export default App;
