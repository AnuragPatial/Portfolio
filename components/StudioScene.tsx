import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, ContactShadows } from "@react-three/drei";
import WorkshopFallback from "./WorkshopFallback";
import * as THREE from "three";

function Machine({ active }: { active: boolean }) {
  const assembly = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  useFrame(({ clock, pointer }, delta) => {
    if (!assembly.current || !active) return;
    const t = clock.elapsedTime;
    assembly.current.rotation.y = THREE.MathUtils.damp(
      assembly.current.rotation.y,
      -0.35 + pointer.x * 0.25,
      3,
      delta,
    );
    assembly.current.rotation.x = THREE.MathUtils.damp(
      assembly.current.rotation.x,
      0.15 - pointer.y * 0.12,
      3,
      delta,
    );
    assembly.current.position.y = Math.sin(t * 0.7) * 0.06;
    if (core.current) {
      core.current.rotation.x = t * 0.25;
      core.current.rotation.z = t * 0.18;
    }
  });
  return (
    <group ref={assembly} rotation={[0.15, -0.35, -0.08]}>
      <RoundedBox
        args={[3.8, 2.7, 0.25]}
        radius={0.13}
        position={[0, 0.3, -0.35]}
      >
        <meshStandardMaterial
          color="#c5c7c1"
          metalness={0.75}
          roughness={0.28}
        />
      </RoundedBox>
      <RoundedBox
        args={[3.53, 2.44, 0.06]}
        radius={0.06}
        position={[0, 0.3, -0.19]}
      >
        <meshStandardMaterial color="#202822" roughness={0.8} />
      </RoundedBox>
      {Array.from({ length: 8 }, (_, i) => (
        <mesh key={i} position={[-1.48 + i * 0.42, 0.3, -0.14]}>
          <boxGeometry args={[0.008, 2.1, 0.008]} />
          <meshBasicMaterial color="#465148" />
        </mesh>
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[0, -0.7 + i * 0.4, -0.14]}>
          <boxGeometry args={[3.2, 0.008, 0.008]} />
          <meshBasicMaterial color="#465148" />
        </mesh>
      ))}
      <mesh ref={core} position={[0, 0.38, 0.5]}>
        <torusKnotGeometry args={[0.58, 0.18, 128, 20, 2, 3]} />
        <meshStandardMaterial
          color="#f26534"
          metalness={0.55}
          roughness={0.26}
        />
      </mesh>
      <RoundedBox
        args={[3.95, 0.2, 2]}
        radius={0.07}
        position={[0, -1.12, 0.38]}
      >
        <meshStandardMaterial color="#bbc0b6" metalness={0.8} roughness={0.3} />
      </RoundedBox>
      <RoundedBox
        args={[1.28, 0.035, 0.65]}
        radius={0.02}
        position={[0, -0.994, 0.7]}
      >
        <meshStandardMaterial color="#737a70" metalness={0.7} roughness={0.4} />
      </RoundedBox>
      {[-1, 1].map((x) => (
        <group key={x} position={[x * 1.6, x === -1 ? 0.9 : -0.15, 0.65]}>
          <RoundedBox args={[0.9, 0.6, 0.12]} radius={0.06}>
            <meshStandardMaterial color="#ecece0" roughness={0.5} />
          </RoundedBox>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[-0.22, 0.15 - i * 0.13, 0.07]}>
              <boxGeometry args={[i === 0 ? 0.3 : 0.5, 0.035, 0.012]} />
              <meshBasicMaterial color={i === 0 ? "#e75e31" : "#a6ada0"} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}
export default function StudioScene({ active = true }: { active?: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 1, 7], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      fallback={<WorkshopFallback />}
    >
      <ambientLight intensity={1.8} />
      <directionalLight position={[4, 6, 5]} intensity={4} color="#fff7df" />
      <directionalLight position={[-4, 1, 2]} intensity={2} color="#d7e0d0" />
      <Machine active={active} />
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.24}
        scale={9}
        blur={2.5}
        far={4}
        resolution={256}
        frames={1}
      />
    </Canvas>
  );
}
