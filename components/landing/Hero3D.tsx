"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function CoreOrb() {
  const ref = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.1;
    if (inner.current) {
      inner.current.rotation.y -= t * 0.02;
      const s = 1 + Math.sin(t * 0.8) * 0.04;
      inner.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={ref}>
      <Float speed={1.3} rotationIntensity={0.5} floatIntensity={1.1}>
        <mesh>
          <icosahedronGeometry args={[1.55, 1]} />
          <meshStandardMaterial
            color="#312e81"
            wireframe
            transparent
            opacity={0.85}
            emissive="#7c3aed"
            emissiveIntensity={0.7}
          />
        </mesh>
        <mesh ref={inner}>
          <sphereGeometry args={[0.95, 48, 48]} />
          <meshStandardMaterial
            color="#4338ca"
            emissive="#6d28d9"
            emissiveIntensity={0.35}
            roughness={0.12}
            metalness={0.4}
          />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshBasicMaterial color="#c4b5fd" transparent opacity={0.14} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

function Ring({ radius, color, emissive, tilt, speed = 1, tube = 0.018 }: {
  radius: number;
  color: string;
  emissive: string;
  tilt: [number, number, number];
  speed?: number;
  tube?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * 0.15 * speed;
  });
  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, tube, 16, 128]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive}
        emissiveIntensity={1.4}
        roughness={0.3}
      />
    </mesh>
  );
}

type OrbiterProps = {
  position: [number, number, number];
  color: string;
  emissive: string;
  size?: number;
  speed?: number;
};

function Orbiter({ position, color, emissive, size = 0.16, speed = 1 }: OrbiterProps) {
  const ref = useRef<THREE.Mesh>(null);
  const floatRef = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current || !floatRef.current) return;
    const t = state.clock.elapsedTime * speed;
    floatRef.current.position.x = position[0] + Math.sin(t * 0.7) * 0.35;
    floatRef.current.position.y = position[1] + Math.cos(t * 0.55) * 0.3;
    floatRef.current.position.z = position[2] + Math.sin(t * 0.4) * 0.25;
    ref.current.rotation.x += 0.01 * speed;
    ref.current.rotation.y += 0.015 * speed;
  });

  return (
    <group ref={floatRef} position={position}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={emissive}
          emissiveIntensity={2.2}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

function Scene() {
  const orbiters = useMemo<OrbiterProps[]>(
    () => [
      { position: [2.6, 1.4, -0.5], color: "#f0abfc", emissive: "#d946ef", size: 0.18 },
      { position: [-2.5, 1.8, -1], color: "#67e8f9", emissive: "#0891b2", size: 0.15 },
      { position: [2.9, -1.2, 0.4], color: "#a5b4fc", emissive: "#6366f1", size: 0.2 },
      { position: [-2.8, -1.4, 0.6], color: "#fdba74", emissive: "#ea580c", size: 0.16 },
      { position: [1.6, -2.4, 0.8], color: "#6ee7b7", emissive: "#059669", size: 0.13 },
      { position: [-1.4, 2.5, 0.2], color: "#fca5a5", emissive: "#e11d48", size: 0.17 },
      { position: [3.1, 0.4, -1.4], color: "#c4b5fd", emissive: "#8b5cf6", size: 0.14 },
      { position: [-3.2, -0.3, -1.2], color: "#7dd3fc", emissive: "#0284c7", size: 0.15 },
    ],
    [],
  );

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={120} color="#a78bfa" />
      <pointLight position={[-6, -2, 4]} intensity={90} color="#22d3ee" />
      <pointLight position={[0, 5, -6]} intensity={70} color="#f472b6" />

      <Stars radius={60} depth={40} count={2200} factor={4} saturation={0.6} fade speed={1.2} />

      <CoreOrb />

      <Ring radius={2.35} color="#22d3ee" emissive="#0891b2" tilt={[Math.PI / 2.1, 0.25, 0]} speed={1} />
      <Ring radius={2.85} color="#e879f9" emissive="#a21caf" tilt={[Math.PI / 2.5, -0.4, 0.4]} speed={-0.8} tube={0.014} />
      <Ring radius={3.3} color="#818cf8" emissive="#4f46e5" tilt={[Math.PI / 2.25, 0.7, -0.2]} speed={0.6} tube={0.012} />

      {orbiters.map((o, i) => (
        <Orbiter key={i} {...o} />
      ))}
    </>
  );
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 7.2], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Scene />
    </Canvas>
  );
}
