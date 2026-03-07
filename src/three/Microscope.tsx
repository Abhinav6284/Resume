"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function Microscope() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Slow continuous rotation
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    // Subtle floating
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  // Material for the sleek scientific look
  const bodyMaterial = new THREE.MeshStandardMaterial({ 
    color: "#ffffff", 
    roughness: 0.1, 
    metalness: 0.8 
  });
  
  const accentMaterial = new THREE.MeshStandardMaterial({ 
    color: "#2E6BFF", 
    roughness: 0.2, 
    metalness: 0.5 
  });

  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: "#00C2A8",
    emissive: "#00C2A8",
    emissiveIntensity: 0.8,
    toneMapped: false,
    transmission: 0.9,
    opacity: 1,
    metalness: 0.2,
    roughness: 0.1,
    ior: 1.5,
    thickness: 0.5,
  });

  return (
    <group ref={groupRef} scale={1.5} position={[0, -1, 0]}>
      {/* Base */}
      <mesh position={[0, -1.5, 0]} material={bodyMaterial}>
        <boxGeometry args={[2, 0.4, 3]} />
      </mesh>
      
      {/* Arm */}
      <mesh position={[0, 0, -1]} rotation={[-0.2, 0, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.3, 0.4, 3]} />
      </mesh>
      <mesh position={[0, 1.4, -0.6]} rotation={[0.4, 0, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.3, 0.3, 1.5]} />
      </mesh>

      {/* Stage */}
      <mesh position={[0, -0.2, 0.2]} material={bodyMaterial}>
        <boxGeometry args={[1.5, 0.1, 1.8]} />
      </mesh>
      
      {/* Slide on Stage */}
      <mesh position={[0, -0.12, 0.2]} material={lensMaterial}>
        <boxGeometry args={[0.6, 0.05, 0.3]} />
      </mesh>

      {/* Eyepiece / Head */}
      <mesh position={[0, 1.8, 0]} material={bodyMaterial}>
        <boxGeometry args={[1, 0.6, 1]} />
      </mesh>
      <mesh position={[-0.2, 2.3, 0.2]} rotation={[0.5, 0, 0]} material={accentMaterial}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
      </mesh>
      <mesh position={[0.2, 2.3, 0.2]} rotation={[0.5, 0, 0]} material={accentMaterial}>
        <cylinderGeometry args={[0.1, 0.1, 1]} />
      </mesh>

      {/* Objective Lenses Setup */}
      <mesh position={[0, 1.2, 0.2]} material={accentMaterial}>
        <cylinderGeometry args={[0.4, 0.4, 0.2]} />
      </mesh>
      
      {/* Lens 1 */}
      <mesh position={[0, 0.8, 0.4]} rotation={[0.2, 0, 0]} material={bodyMaterial}>
        <cylinderGeometry args={[0.1, 0.05, 0.8]} />
      </mesh>
      {/* Lens 2 */}
      <mesh position={[-0.3, 0.8, 0]} rotation={[0, 0, 0.3]} material={bodyMaterial}>
        <cylinderGeometry args={[0.1, 0.05, 0.8]} />
      </mesh>
      {/* Lens 3 */}
      <mesh position={[0.3, 0.8, 0]} rotation={[0, 0, -0.3]} material={bodyMaterial}>
        <cylinderGeometry args={[0.1, 0.05, 0.8]} />
      </mesh>
    </group>
  );
}
