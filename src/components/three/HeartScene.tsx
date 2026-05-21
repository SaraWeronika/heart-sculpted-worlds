import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";

function HeartMesh({ mouse }: { mouse: { x: number; y: number } }) {
  const ref = useRef<THREE.Mesh>(null);
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    // breathing scale
    const s = 1 + Math.sin(t * 1.4) * 0.04 + Math.sin(t * 2.8) * 0.015;
    ref.current.scale.set(s, s, s);
    // soft mouse parallax
    targetRot.current.x += (mouse.y * 0.25 - targetRot.current.x) * 0.05;
    targetRot.current.y += (mouse.x * 0.4 - targetRot.current.y) * 0.05;
    ref.current.rotation.x = targetRot.current.x;
    ref.current.rotation.y = targetRot.current.y + t * 0.05;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.6}>
      <mesh ref={ref} castShadow>
        <icosahedronGeometry args={[1.6, 6]} />
        <meshPhysicalMaterial
          color={new THREE.Color("#3A0A14")}
          metalness={0.85}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.15}
          reflectivity={0.7}
          emissive={new THREE.Color("#8B0A1A")}
          emissiveIntensity={0.25}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const count = 220;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
  }
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color="#F2EBDD" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

export function HeartScene() {
  const [mounted, setMounted] = useState(false);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const onMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  if (!mounted) return null;

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <color attach="background" args={["#0B0B0D"]} />
      <fog attach="fog" args={["#0B0B0D", 5, 14]} />
      <ambientLight intensity={0.15} />
      <spotLight position={[5, 5, 5]} angle={0.4} penumbra={1} intensity={2.4} color="#8B0A1A" castShadow />
      <spotLight position={[-6, -2, 3]} angle={0.5} penumbra={1} intensity={1} color="#F2EBDD" />
      <pointLight position={[0, 0, 3]} intensity={0.4} color="#3A0A14" />
      <Suspense fallback={null}>
        <Environment preset="night" />
        <HeartMesh mouse={mouseRef.current} />
        <Particles />
      </Suspense>
    </Canvas>
  );
}
