"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowCard from "@/components/GlowCard";
import { Briefcase, Activity, FlaskConical } from "lucide-react";

export default function InternshipSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <section id="experience" ref={sectionRef} className="py-32 px-4 relative max-w-7xl mx-auto z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-text">Experience</h2>
        <div className="w-24 h-1 bg-accent mx-auto rounded-full shadow-[0_0_10px_rgba(0,194,168,0.8)]" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-4xl mx-auto"
      >
        <GlowCard className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20">
              <Briefcase className="text-primary w-10 h-10" />
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                <h3 className="text-3xl font-bold text-text">Biotechnologist Intern</h3>
                <span className="text-accent font-semibold px-4 py-1 bg-accent/10 rounded-full text-sm mt-2 md:mt-0 w-fit">
                  Fortis Hospital, Ludhiana
                </span>
              </div>
              <p className="text-text-secondary leading-relaxed mt-4 text-lg">
                Worked on microbiology, biochemistry, and hematology diagnostics. Operated advanced laboratory instruments including spectrophotometer, centrifuge, and autoclave.
              </p>
              
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center gap-2 text-primary font-medium bg-background-secondary px-3 py-1.5 rounded-lg border border-gray-100">
                  <Activity size={16} /> Diagnostics
                </div>
                <div className="flex items-center gap-2 text-primary font-medium bg-background-secondary px-3 py-1.5 rounded-lg border border-gray-100">
                  <FlaskConical size={16} /> Instrumentation
                </div>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </section>
  );
}
