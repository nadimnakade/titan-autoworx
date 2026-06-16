import { useLenis } from "@/hooks/useLenis";
import { useEffect, useState } from "react";
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

function App() {
  useLenis();
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
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
