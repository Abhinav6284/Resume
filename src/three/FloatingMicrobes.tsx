"use client";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Instance, Instances } from "@react-three/drei";
import * as THREE from "three";

const MICROBE_COUNT = 150;

function MicrobeParticles() {
  const ref = useRef<THREE.InstancedMesh>(null);
  const dummy = new THREE.Object3D();
  
  // Create randomized initial positions
  const particles = React.useMemo(() => {
    const temp = [];
    for (let i = 0; i < MICROBE_COUNT; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 40,
          (Math.random() - 0.5) * 20 - 10,
        ],
        rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
        scale: Math.random() * 0.15 + 0.05,
        speed: (Math.random() + 0.5) * 0.01,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    particles.forEach((particle, i) => {
      const t = state.clock.elapsedTime * particle.speed + particle.offset;
      
      dummy.position.set(
        particle.position[0] + Math.sin(t) * 2,
        particle.position[1] + Math.cos(t) * 2,
        particle.position[2] + Math.sin(t * 0.5) * 1
      );
      dummy.rotation.set(
        particle.rotation[0] + t,
        particle.rotation[1] + t * 0.5,
        0
      );
      dummy.scale.setScalar(particle.scale);
      dummy.updateMatrix();
      
      ref.current!.setMatrixAt(i, dummy.matrix);
    });
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <Instances ref={ref} limit={MICROBE_COUNT} castShadow={false} receiveShadow={false}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshPhysicalMaterial 
        color="#00C2A8"
        emissive="#00C2A8"
        emissiveIntensity={0.6}
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        roughness={0.2}
        transmission={0.9}
        thickness={0.5}
      />
      {particles.map((_, i) => (
        <Instance key={i} />
      ))}
    </Instances>
  );
}

import { Canvas } from "@react-three/fiber";

export default function FloatingMicrobes() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 60 }} gl={{ alpha: true }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <MicrobeParticles />
    </Canvas>
  );
}
