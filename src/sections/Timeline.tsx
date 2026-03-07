"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineEvents = [
  {
    year: "2025 - 2026",
    title: "M.Sc. Microbiology",
    institution: "Lovely Professional University",
    description: "CGPA: 8.01. Specializing in advanced microbial genetics and laboratory diagnostics.",
  },
  {
    year: "2022 - 2025",
    title: "B.Sc. Biotechnology",
    institution: "Punjab College of Technical Education",
    description: "CGPA: 8.68. Core focus on molecular biology and quality testing methodologies.",
  },
  {
    year: "High School",
    title: "12th (PCB)",
    institution: "Board of Education",
    description: "85.4%. Focused on Physics, Chemistry, and Biology.",
  },
  {
    year: "Secondary",
    title: "10th",
    institution: "Board of Education",
    description: "91%. General science foundation.",
  }
];

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" ref={containerRef} className="py-32 px-4 max-w-5xl mx-auto relative w-full">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-text">
          Academic Timeline
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="relative">
        <motion.div 
          className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -translate-x-1/2 rounded-full origin-top"
        />
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-[20px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-primary to-accent -translate-x-1/2 rounded-full origin-top shadow-[0_0_15px_rgba(46,107,255,0.5)]"
        />

        <div className="flex flex-col gap-12 md:gap-24 relative z-10">
          {timelineEvents.map((event, index) => {
            const isEven = index % 2 === 0;
            return (
              <div 
                key={index} 
                className={`flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-8 md:gap-16 w-full`}
              >
                {/* Visual Dot */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                  className="absolute left-[20px] md:left-1/2 -content-[''] w-6 h-6 rounded-full bg-white border-4 border-primary shadow-[0_0_10px_rgba(46,107,255,0.4)] -translate-x-1/2 z-20 mt-1 md:mt-0"
                />

                <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className={`bg-white border border-gray-200 p-8 rounded-3xl backdrop-blur-md relative overflow-hidden shadow-lg group hover:border-primary/50 transition-all hover:shadow-xl ${isEven ? 'origin-right' : 'origin-left'}`}
                  >
                    {/* Hover Glow Background */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    <h4 className="text-accent font-bold text-xl mb-2">{event.year}</h4>
                    <h3 className="text-2xl font-bold text-text mb-1">{event.title}</h3>
                    <p className="text-primary font-medium text-sm mb-4 uppercase tracking-wider">{event.institution}</p>
                    <p className="text-text-secondary leading-relaxed font-light">{event.description}</p>
                  </motion.div>
                </div>
                
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
