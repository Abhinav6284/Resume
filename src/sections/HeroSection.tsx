"use client";
import React, { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import dynamic from "next/dynamic";
import MagneticButton from "@/components/MagneticButton";

const MicroscopeScene = dynamic(() => import("@/three/MicroscopeScene"), { ssr: false });

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const title = "Exploring the Invisible World of Microbiology";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (sectionRef.current) {
        // Text fades out
        gsap.to('.hero-text-content', {
          opacity: 0,
          y: -50,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom center",
            scrub: true,
          },
        });

        // Microscope zooms in massively to act as a transition
        gsap.to('.microscope-canvas-container', {
          scale: 20, // Huge zoom into the lens
          opacity: 0, // Fades out at the very end to reveal next section
          transformOrigin: "center center",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4"
    >
      <div className="absolute inset-0 z-0 opacity-40 microscope-canvas-container pointer-events-none">
        <MicroscopeScene />
      </div>
      
      <div className="z-10 text-center max-w-4xl mx-auto mt-20 hero-text-content">
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-tight text-text"
        >
          {title.split("").map((letter, index) => (
            <motion.span
              key={index}
              variants={letterVariants}
              className={letter === " " ? "inline-block w-[0.3em]" : "inline-block"}
            >
              {letter}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="text-xl md:text-3xl text-text-secondary font-light mb-12 tracking-wide"
        >
          Research • <span className="text-primary font-medium">Microbial Analysis</span> • Laboratory Science
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.8, type: "spring" }}
        >
          <MagneticButton
            href="#research"
            className="hoverable inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary rounded-full hover:bg-primary/90 hover:scale-[1.05] transition-all duration-300 shadow-[0_0_20px_rgba(46,107,255,0.3)] hover:shadow-[0_0_30px_rgba(46,107,255,0.5)]"
          >
            Explore Research
          </MagneticButton>
        </motion.div>
      </div>
      
      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
