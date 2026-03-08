"use client";
import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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

interface TimelineEvent {
  year: string;
  title: string;
  institution: string;
  description: string;
}

const TimelineEventCard = ({ event, index }: { event: TimelineEvent, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });
  const isEven = index % 2 === 0;
  return (
    <div
      ref={ref}
      className={`flex flex-col md:flex-row items-center justify-between w-full relative min-h-[150px] md:min-h-[200px] group ${isEven ? "md:flex-row-reverse" : ""
        }`}
    >
      {/* Spacer for alternating layout on desktop */}
      <div className="hidden md:block md:w-[45%]" />

      {/* Central Timeline Node (Visible on Desktop) */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 justify-center items-center w-8 h-8 z-20">
        <motion.div
          animate={{ scale: isInView ? 1 : 0.5, opacity: isInView ? 1 : 0.3 }}
          transition={{ duration: 0.5 }}
          className="w-4 h-4 rounded-full bg-primary relative"
        >
          {/* Outer glow ping */}
          <motion.div
            animate={isInView ? { scale: [1, 2, 1], opacity: [0.5, 0, 0.5] } : { scale: 1, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full bg-primary blur-md"
          />
        </motion.div>
      </div>

      {/* Content Card */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 flex items-center relative z-10 ${isEven ? "md:pr-12 md:justify-end" : "md:pl-12 md:justify-start"
        }`}>
        {/* Mobile Node (Visible only on Mobile) */}
        <div className="md:hidden absolute left-0 top-1/2 -translate-y-1/2 w-6 h-6 flex justify-center items-center z-20">
          <motion.div
            animate={{ scale: isInView ? 1 : 0.5, opacity: isInView ? 1 : 0.3 }}
            transition={{ duration: 0.5 }}
            className="w-3 h-3 rounded-full bg-primary"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, x: isEven ? 20 : -20, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (isEven ? 20 : -20), y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 100 }}
          className={`bg-white border border-gray-100 p-6 md:p-8 rounded-3xl relative overflow-hidden shadow-sm hover:border-primary/50 transition-all hover:shadow-xl w-full xl:w-[90%] ${isEven ? "md:text-right" : "md:text-left"
            }`}
        >
          <h4 className="text-secondary font-bold text-lg md:text-xl mb-2">{event.year}</h4>
          <h3 className="text-xl md:text-2xl font-bold text-text mb-1">{event.title}</h3>
          <p className="text-primary font-medium text-xs md:text-sm mb-4 tracking-wider">{event.institution}</p>
          <p className="text-text-secondary leading-relaxed font-light text-sm md:text-base">{event.description}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="timeline" ref={containerRef} className="py-32 px-4 max-w-5xl mx-auto relative w-full z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-text">
          Academic Timeline
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto mt-16 md:mt-32">
        {/* Continuous Central Line Background */}
        <div className="absolute left-[11px] md:left-1/2 top-0 bottom-0 w-[2px] bg-gray-200 -translate-x-1/2 z-0" />

        {/* Animated Fill Line */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-[11px] md:left-1/2 top-0 w-[4px] bg-gradient-to-b from-primary via-accent to-secondary -translate-x-1/2 z-10 rounded-full origin-top"
        />

        <div className="relative z-10 flex flex-col gap-16 md:gap-24 py-16">
          {timelineEvents.map((event, index) => (
            <TimelineEventCard key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
