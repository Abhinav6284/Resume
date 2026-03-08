"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dna, Microscope, TestTube, GripHorizontal, Droplets } from "lucide-react";

const techniques = [
  {
    title: "Microbial Culturing",
    description: "Aseptic techniques for cultivating and maintaining pure bacterial strains.",
    icon: TestTube,
  },
  {
    title: "Spectrophotometry",
    description: "Quantitative analysis of samples using UV-Vis spectrophotometry.",
    icon: GripHorizontal,
  },
  {
    title: "Sterility Testing",
    description: "Ensuring the absence of viable microorganisms in products and environments.",
    icon: Droplets,
  },
  {
    title: "Sensitivity Testing",
    description: "Antibiotic sensitivity testing using methods like Kirby-Bauer.",
    icon: Dna,
  },
  {
    title: "Instrumentation",
    description: "Operating centrifuges, autoclaves, and preparing various media.",
    icon: Microscope,
  }
];

export default function LabTechniques() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax effect for the background text
      gsap.to('.tech-bg-text', {
        y: -200,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="techniques" ref={containerRef} className="py-40 px-4 relative w-full overflow-hidden bg-white z-10">
      <div className="tech-bg-text absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl sm:text-[15vw] font-black tracking-tighter text-gray-100 whitespace-nowrap pointer-events-none -z-10">
        METHODOLOGY
      </div>

      <div className="max-w-7xl mx-auto mb-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight text-text">Lab Techniques & Skills</h2>
          <div className="w-24 h-1 bg-accent mx-auto rounded-full shadow-[0_0_10px_rgba(0,194,168,0.5)]" />
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 md:gap-10">
        {techniques.map((tech, i) => (
          <motion.div
            key={tech.title}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1, type: "spring" }}
            whileHover={{ y: -10 }}
            className="group relative w-full sm:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2.5rem)] flex-grow-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative h-full bg-background-secondary border border-gray-200 rounded-3xl p-8 overflow-hidden flex flex-col items-center text-center shadow-lg hover:shadow-xl transition-shadow">

              <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-colors duration-500" />

              <motion.div
                className="w-20 h-20 bg-background border border-white/10 rounded-2xl flex items-center justify-center mb-6 shadow-xl relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-1000 ease-in-out -skew-x-12" />
                <tech.icon size={36} className="text-text group-hover:text-accent transition-colors duration-300" />
              </motion.div>

              <h3 className="text-2xl font-bold mb-3 tracking-tight text-text">{tech.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed font-light">
                {tech.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
