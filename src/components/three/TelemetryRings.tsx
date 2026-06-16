import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Concentric telemetry rings that orbit the helmet.
 */
export function TelemetryRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const ring4 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) ring1.current.rotation.x = t * 0.4;
    if (ring2.current) {
      ring2.current.rotation.x = t * 0.3;
      ring2.current.rotation.y = t * 0.5;
    }
    if (ring3.current) {
      ring3.current.rotation.z = t * 0.25;
      ring3.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.3) * 0.2;
    }
    if (ring4.current) {
      ring4.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group>
      <mesh ref={ring1}>
        <torusGeometry args={[1.9, 0.006, 16, 128]} />
        <meshBasicMaterial color="#E8453C" transparent opacity={0.7} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[2.2, 0.004, 16, 128]} />
        <meshBasicMaterial color="#F2C14E" transparent opacity={0.5} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[2.6, 0.003, 16, 128]} />
        <meshBasicMaterial color="#AAB2BD" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring4}>
        <torusGeometry args={[3.1, 0.002, 16, 128]} />
        <meshBasicMaterial color="#E8E5DD" transparent opacity={0.25} />
      </mesh>

      {/* Dashed orbital markers */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[2.2, 0.01, 8, 64, Math.PI / 1.2]} />
        <meshBasicMaterial color="#E8453C" transparent opacity={0.9} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.6, 0.008, 8, 48, Math.PI / 2]} />
        <meshBasicMaterial color="#F2C14E" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}
