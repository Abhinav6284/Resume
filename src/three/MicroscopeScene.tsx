"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import Microscope from "@/three/Microscope";

export default function MicroscopeScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 45 }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[10, 10, 10]} intensity={2} />
      <Environment preset="studio" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <Microscope />
      </Float>
    </Canvas>
  );
}
