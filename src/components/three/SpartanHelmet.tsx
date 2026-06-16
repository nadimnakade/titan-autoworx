import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Programmatic Spartan / racing helmet.
 * Built from primitives — no external models needed.
 */
export function SpartanHelmet() {
  const groupRef = useRef<THREE.Group>(null);
  const visorRef = useRef<THREE.Mesh>(null);
  const crestRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      const mx = state.mouse.x * 0.5;
      const my = state.mouse.y * 0.3;
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mx + t * 0.18,
        0.06,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -my * 0.4 + Math.sin(t * 0.3) * 0.04,
        0.06,
      );
      groupRef.current.position.y = Math.sin(t * 0.6) * 0.08;
    }
    if (visorRef.current) {
      const mat = visorRef.current.material as THREE.MeshPhysicalMaterial;
      if (mat) {
        mat.opacity = 0.55 + Math.sin(t * 1.2) * 0.05;
        mat.emissiveIntensity = 0.6 + Math.sin(t * 0.8) * 0.2;
      }
    }
    if (crestRef.current) {
      crestRef.current.rotation.y = Math.sin(t * 0.5) * 0.05;
    }
  });

  const carbon = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#0A0D12",
        metalness: 0.85,
        roughness: 0.32,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      }),
    [],
  );
  const red = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#C8312A",
        metalness: 0.4,
        roughness: 0.25,
        clearcoat: 1,
        emissive: "#E8453C",
        emissiveIntensity: 0.4,
      }),
    [],
  );
  const gold = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#F2C14E",
        metalness: 1,
        roughness: 0.15,
        emissive: "#F2C14E",
        emissiveIntensity: 0.15,
      }),
    [],
  );
  const visor = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: "#13181F",
        metalness: 0.95,
        roughness: 0.05,
        transmission: 0.4,
        thickness: 0.5,
        opacity: 0.6,
        transparent: true,
        emissive: "#E8453C",
        emissiveIntensity: 0.5,
        ior: 1.5,
      }),
    [],
  );
  const steel = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#AAB2BD",
        metalness: 0.9,
        roughness: 0.4,
      }),
    [],
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Main skull */}
      <mesh material={carbon} castShadow receiveShadow scale={[1.05, 1.15, 1.1]}>
        <sphereGeometry args={[1, 48, 48]} />
      </mesh>

      {/* Cheek guards */}
      <mesh
        material={carbon}
        position={[-0.72, -0.1, 0.4]}
        rotation={[0, 0.4, 0.1]}
      >
        <boxGeometry args={[0.18, 0.7, 0.6]} />
      </mesh>
      <mesh
        material={carbon}
        position={[0.72, -0.1, 0.4]}
        rotation={[0, -0.4, -0.1]}
      >
        <boxGeometry args={[0.18, 0.7, 0.6]} />
      </mesh>

      {/* Visor */}
      <mesh
        ref={visorRef}
        material={visor}
        position={[0, 0.05, 0.95]}
        scale={[0.95, 0.55, 0.4]}
      >
        <sphereGeometry args={[0.92, 32, 16, 0, Math.PI, 0, Math.PI / 2.4]} />
      </mesh>

      {/* Visor trim upper */}
      <mesh material={steel} position={[0, 0.05, 1.04]}>
        <torusGeometry args={[0.78, 0.025, 16, 64, Math.PI]} />
      </mesh>
      {/* Visor trim lower */}
      <mesh material={steel} position={[0, 0.05, 1.04]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.78, 0.025, 16, 64, Math.PI]} />
      </mesh>

      {/* Forehead crest / racing stripe */}
      <group ref={crestRef} position={[0, 0.95, 0.45]}>
        <mesh material={red}>
          <boxGeometry args={[0.14, 0.18, 1.1]} />
        </mesh>
        <mesh material={gold} position={[0, 0, 0.05]}>
          <boxGeometry args={[0.05, 0.16, 1.0]} />
        </mesh>
      </group>

      {/* Top crown plate */}
      <mesh material={carbon} position={[0, 1.0, -0.1]} rotation={[0.1, 0, 0]}>
        <boxGeometry args={[1.4, 0.12, 1.6]} />
      </mesh>

      {/* Side vents */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.78, 0.3, 0.1]}>
          {Array.from({ length: 5 }).map((_, i) => (
            <mesh
              key={i}
              material={steel}
              position={[0, i * 0.08 - 0.16, 0.1 + i * 0.04]}
              rotation={[0, 0.4, 0]}
            >
              <boxGeometry args={[0.08, 0.025, 0.15]} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Chin / mouth guard */}
      <mesh material={carbon} position={[0, -0.78, 0.6]}>
        <boxGeometry args={[0.9, 0.45, 0.55]} />
      </mesh>
      <mesh material={steel} position={[0, -0.78, 0.88]}>
        <boxGeometry args={[0.7, 0.06, 0.04]} />
      </mesh>
      {[-0.3, -0.15, 0, 0.15, 0.3].map((x, i) => (
        <mesh key={i} material={steel} position={[x, -0.78, 0.88]}>
          <boxGeometry args={[0.025, 0.32, 0.04]} />
        </mesh>
      ))}
      <mesh material={red} position={[0, -0.78, 0.9]}>
        <boxGeometry args={[0.45, 0.05, 0.02]} />
      </mesh>

      {/* Ear caps */}
      <mesh material={carbon} position={[-0.95, 0.0, 0.0]} scale={[0.6, 1.1, 1.0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
      </mesh>
      <mesh material={carbon} position={[0.95, 0.0, 0.0]} scale={[0.6, 1.1, 1.0]}>
        <sphereGeometry args={[0.28, 32, 32]} />
      </mesh>
      <mesh material={gold} position={[-0.95, 0.0, 0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
      </mesh>
      <mesh material={gold} position={[0.95, 0.0, 0.15]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
      </mesh>

      {/* Number plate */}
      <group position={[0, 0.7, 1.05]}>
        <mesh material={steel}>
          <planeGeometry args={[0.35, 0.18]} />
        </mesh>
        <mesh material={red} position={[0, 0, 0.001]}>
          <planeGeometry args={[0.3, 0.13]} />
        </mesh>
      </group>
    </group>
  );
}
