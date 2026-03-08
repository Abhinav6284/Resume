"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { OrbitControls } from "@react-three/drei";

export default function DNAHelix({ activeIndex = -1 }: { activeIndex?: number }) {
  const groupRef = useRef<THREE.Group>(null);

  // Track the current dynamic target point for our connection line
  const targetPointRef = useRef(new THREE.Vector3(15, 0, 0)); // Card is generally to the right
  const curveRef = useRef<THREE.QuadraticBezierCurve3 | null>(null);
  const lineGeoRef = useRef<THREE.BufferGeometry>(null);

  // Create a mesh for a glowing dot at the connection
  const connectionDotRef = useRef<THREE.Mesh>(null);

  // Generate DNA coordinates
  const { particles, connections } = useMemo(() => {
    const p = [];
    const c = [];
    const count = 40; // number of base pairs
    const radius = 2;
    const heightSpread = 0.4;

    for (let i = 0; i < count; i++) {
      const y = (i - count / 2) * heightSpread;
      const angle = i * 0.3;

      const x1 = Math.cos(angle) * radius;
      const z1 = Math.sin(angle) * radius;

      const x2 = Math.cos(angle + Math.PI) * radius;
      const z2 = Math.sin(angle + Math.PI) * radius;

      p.push([x1, y, z1]);
      p.push([x2, y, z2]);

      c.push([new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2)]);
    }
    return { particles: p, connections: c };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      // Base rotation + scroll-based rotation
      const scrollY = typeof window !== 'undefined' ? window.scrollY : 0;
      groupRef.current.rotation.y = (state.clock.getElapsedTime() * 0.2) + (scrollY * 0.005);
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
    }

    // Dynamic Connection Logic
    if (lineGeoRef.current) {
      if (activeIndex !== -1 && particles.length > 0) {
        // Choose a base pair based on the active index to provide variety
        // Multiplying by 8 to space them out along the helix
        const targetParticleIndex = (activeIndex * 8) % (particles.length / 2);

        // We get the local position of the selected particle
        const localPos = new THREE.Vector3(...particles[targetParticleIndex]);

        // We calculate its true world position (including the group's rotation)
        const worldPos = localPos.clone().applyMatrix4(groupRef.current!.matrixWorld);

        // Decide which side the card is on based on index (even = left, odd = right)
        // Note: The cards alternate left/right. The SVG logic used: isEven? left : right
        // In 3D space, X > 0 is right, X < 0 is left.
        const targetX = activeIndex % 2 === 0 ? -12 : 12;

        // The endpoint should smoothly interpolate towards the target side
        targetPointRef.current.lerp(new THREE.Vector3(targetX, worldPos.y, 0), 0.1);

        // Control point for the bezier curve (pulls the line outward slightly)
        const controlPoint = new THREE.Vector3(
          worldPos.x + (targetX > 0 ? 3 : -3),
          worldPos.y,
          worldPos.z + 5
        );

        if (!curveRef.current) {
          curveRef.current = new THREE.QuadraticBezierCurve3(worldPos, controlPoint, targetPointRef.current);
        } else {
          curveRef.current.v0.copy(worldPos);
          curveRef.current.v1.copy(controlPoint);
          curveRef.current.v2.copy(targetPointRef.current);
        }

        const points = curveRef.current.getPoints(50);
        lineGeoRef.current.setFromPoints(points);

        // Update connection dot position to match the particle
        if (connectionDotRef.current) {
          connectionDotRef.current.position.copy(worldPos);
          connectionDotRef.current.visible = true;
          // Pulse scale
          const pulse = 1 + Math.sin(state.clock.elapsedTime * 5) * 0.3;
          connectionDotRef.current.scale.set(pulse, pulse, pulse);
        }
      } else {
        // Hide line when no card is active
        lineGeoRef.current.setFromPoints([new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)]);
        if (connectionDotRef.current) {
          connectionDotRef.current.visible = false;
        }
      }
    }
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
      <group ref={groupRef}>
        {particles.map((pos, i) => (
          <mesh key={i} position={new THREE.Vector3(...pos)}>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? "#2E6BFF" : "#00C2A8"}
              emissive={i % 2 === 0 ? "#2E6BFF" : "#00C2A8"}
              emissiveIntensity={1.5}
              toneMapped={false}
              roughness={0.2}
              metalness={0.1}
            />
          </mesh>
        ))}
        {connections.map((points, i) => {
          const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
          const mat = new THREE.LineBasicMaterial({ color: 0x444444, transparent: true, opacity: 0.4 });
          const lineMesh = new THREE.Line(lineGeo, mat);
          return <primitive key={`line-${i}`} object={lineMesh} />;
        })}
      </group>

      {/* Dynamic Connection Line (outside the rotating group so it doesn't spin wildly) */}
      <line>
        <bufferGeometry ref={lineGeoRef} />
        <lineBasicMaterial color={activeIndex % 2 === 0 ? "#00C2A8" : "#2E6BFF"} transparent opacity={activeIndex !== -1 ? 0.8 : 0} linewidth={3} />
      </line>

      {/* Glowing attachment point */}
      <mesh ref={connectionDotRef} visible={false}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#00FFD1" transparent opacity={0.8} />
      </mesh>
    </>
  );
}
