"use client";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
      className={`flex flex-col md:flex-row items-center md:items-stretch ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} w-full relative min-h-[150px]`}
    >

      <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'} flex items-center`}>
        <motion.div
          initial={{ opacity: 0, x: isEven ? -20 : 20 }}
          animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : (isEven ? -20 : 20) }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`bg-white/80 border border-gray-200 p-6 md:p-8 rounded-3xl backdrop-blur-xl relative overflow-hidden shadow-lg group hover:border-primary/50 transition-all hover:shadow-xl ${isEven ? 'md:origin-right origin-left' : 'origin-left'} w-full z-10`}
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
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="timeline" ref={containerRef} className="py-32 px-4 max-w-5xl mx-auto relative w-full z-10">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-text">
          Academic Timeline
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
      </div>

      <div className="relative">
        <div className="relative max-w-4xl mx-auto flex flex-col gap-12 md:gap-24 z-10 py-32">
          {timelineEvents.map((event, index) => (
            <TimelineEventCard key={index} event={event} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
