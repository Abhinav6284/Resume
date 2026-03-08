"use client";
import React, { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({
  children,
  className = "",
  intensity = 0.2,
  onClick,
  href,
  type = "button"
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();

    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    setPosition({
      x: middleX * intensity,
      y: middleY * intensity
    });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick, type };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className="inline-block"
    >
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(props as any)}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className={className}
      >
        {children}
      </Component>
    </div>
  );
}
