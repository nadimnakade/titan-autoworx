import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  Scanline,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";
import { SpartanHelmet } from "./SpartanHelmet";
import { TelemetryRings } from "./TelemetryRings";
import { ParticleField } from "./ParticleField";
import { VolumetricFog } from "./VolumetricFog";

function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouse.x * 0.6,
      0.04,
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      mouse.y * 0.4 + 0.3,
      0.04,
    );
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function ScanLaser() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.y = -1.5 + Math.sin(state.clock.elapsedTime * 0.4) * 2.4;
      ref.current.rotation.z = state.clock.elapsedTime * 0.2;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[8, 0.02]} />
      <meshBasicMaterial color="#E8453C" transparent opacity={0.5} />
    </mesh>
  );
}

export function HeroCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0.3, 5.5], fov: 38 }}
    >
      <color attach="background" args={["#0A0D12"]} />
      <fog attach="fog" args={["#0A0D12", 5, 18]} />

      {/* Lights */}
      <ambientLight intensity={0.2} />
      <pointLight position={[3, 3, 4]} intensity={2.5} color="#E8453C" />
      <pointLight position={[-3, 2, 2]} intensity={1.8} color="#F2C14E" />
      <pointLight position={[0, -3, 3]} intensity={1.2} color="#AAB2BD" />
      <spotLight
        position={[0, 6, 0]}
        angle={0.4}
        penumbra={0.6}
        intensity={1.2}
        color="#ffffff"
      />

      <SpartanHelmet />
      <TelemetryRings />
      <ParticleField count={1400} />
      <VolumetricFog />
      <ScanLaser />

      <CameraRig />

      <Environment preset="warehouse" />

      <EffectComposer multisampling={0}>
        <Bloom
          intensity={1.3}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.2} darkness={0.85} />
        <Noise opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
        <Scanline density={1.2} opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
      </EffectComposer>
    </Canvas>
  );
}
