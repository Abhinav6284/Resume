"use client";
import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { OrbitControls } from "@react-three/drei";

export default function DNAHelix() {
  const groupRef = useRef<THREE.Group>(null);
  
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
    </>
  );
}
