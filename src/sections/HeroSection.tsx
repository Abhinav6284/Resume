"use client";
import React, { useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/MagneticButton";
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
      <div className="relative z-20 flex flex-col items-center justify-center h-full w-full max-w-5xl mx-auto px-6 lg:px-12 pt-32 text-center hero-text-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-[6rem] font-bold leading-[1.1] tracking-tighter text-text flex flex-wrap justify-center gap-x-4">
            {title.split(" ").map((word, index) => (
              <span key={index} className="inline-block whitespace-nowrap">
                {word.split("").map((letter, i) => (
                  <motion.span
                    key={`${index}-${i}`}
                    variants={letterVariants}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="text-lg sm:text-2xl text-text-secondary mb-12 font-light tracking-wide max-w-3xl"
        >
          Research • <span className="text-primary font-medium">Microbial Analysis</span> • Laboratory Science
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3, duration: 0.8, type: "spring" }}
        >
          <MagneticButton
            href="#projects"
            className="hoverable inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-primary rounded-full hover:bg-primary/90 hover:scale-[1.05] transition-all duration-300 shadow-[0_0_20px_rgba(46,107,255,0.3)] hover:shadow-[0_0_30px_rgba(46,107,255,0.5)]"
          >
            Explore Projects
          </MagneticButton>
        </motion.div>
      </div>

      {/* Decorative gradient blur */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
