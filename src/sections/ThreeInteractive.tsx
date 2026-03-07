"use client";
import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import DNAHelix from "@/three/DNAHelix";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ThreeInteractive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen bg-[#050505] overflow-hidden py-24">
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          <spotLight position={[-10, 10, -5]} intensity={1.5} color="#00FFD1" />
          
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <DNAHelix />
          </Float>

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={true}
            autoRotateSpeed={0.5}
            maxPolarAngle={Math.PI / 1.5}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      <motion.div 
        style={{ opacity }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-end pb-32 pointer-events-none"
      >
        <div className="bg-background/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl max-w-2xl text-center shadow-2xl">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Interactive Structural Biology
          </h2>
          <p className="text-text/70">
            Drag to rotate the DNA double helix. Visualizing complex molecular structures is key to understanding the foundation of microbiology and genetic variation.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
