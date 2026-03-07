"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function PetriDishColonies() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  // Scale of the colonies growing as user scrolls
  const scaleIn = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const opacityIn = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  const colonies = [
    { size: 120, x: 20, y: 30, color: "bg-primary/40", delay: 0 },
    { size: 80, x: 60, y: 50, color: "bg-accent/40", delay: 0.1 },
    { size: 150, x: 40, y: 70, color: "bg-primary/30", delay: 0.2 },
    { size: 90, x: 75, y: 25, color: "bg-blue-300/40", delay: 0.3 },
    { size: 110, x: 25, y: 65, color: "bg-teal-300/40", delay: 0.4 },
  ];

  return (
    <div ref={containerRef} className="relative w-64 h-64 md:w-96 md:h-96 mx-auto my-12 hidden md:block group z-0 pointer-events-none">
      {/* Dish Base */}
      <div className="absolute inset-0 rounded-full border-[8px] border-white/40 shadow-[inset_0_0_50px_rgba(46,107,255,0.2),0_0_20px_rgba(255,255,255,0.5)] backdrop-blur-sm bg-white/10" />
      
      {/* Dish Fluid/Highlight */}
      <div className="absolute inset-2 rounded-full border border-white/20 bg-gradient-to-br from-transparent to-primary/5 shadow-inner" />

      {/* Colonies growing on scroll */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {colonies.map((colony, i) => (
          <motion.div
            key={i}
            style={{ 
              scale: scaleIn, 
              opacity: opacityIn,
              left: `${colony.x}%`,
              top: `${colony.y}%` 
            }}
            className={`absolute rounded-full filter blur-sm ${colony.color}`}
            initial={{ width: colony.size, height: colony.size, translateX: '-50%', translateY: '-50%' }}
            animate={{ 
              scale: [1, 1.05, 1], 
              opacity: [0.8, 1, 0.8] 
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Glare effect */}
      <div className="absolute top-[10%] left-[10%] w-[30%] h-[15%] bg-white/30 rounded-[100%] rotate-[-45deg] blur-md mix-blend-overlay" />
    </div>
  );
}
