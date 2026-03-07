"use client";
import React from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(
    350px circle at ${mouseX}px ${mouseY}px,
    rgba(46, 107, 255, 0.1),
    transparent 80%
  )`;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative rounded-2xl border border-gray-200 bg-white/80 backdrop-blur-md shadow-sm overflow-hidden ${className}`}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      <div className="relative z-10 h-full w-full">{children}</div>
    </motion.div>
  );
}
