"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import GlowCard from "@/components/GlowCard";
import { GraduationCap, Download } from "lucide-react";

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Add any complex scroll animations here if needed, simple ones done with framer-motion
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-32 px-4 relative max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4">About Me</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full shadow-[0_0_10px_rgba(91,140,255,0.8)]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="md:col-span-4"
        >
          <GlowCard className="h-full p-8 flex flex-col items-center justify-center text-center">
            {/* Profile Image */}
            <div className="w-56 h-56 rounded-full bg-gradient-to-br from-primary to-accent mb-6 flex items-center justify-center overflow-hidden shadow-[0_0_30px_rgba(46,107,255,0.3)] border-4 border-white">
              <Image src="/profile.jpeg" alt="Anshika Pal" width={224} height={224} className="w-full h-full object-cover object-center" />
            </div>
            <h3 className="text-2xl font-bold mb-2 text-text">Anshika Pal</h3>
            <p className="text-primary font-medium mb-4">Ludhiana, Punjab</p>
            <p className="text-text-secondary text-sm leading-relaxed mb-8">
              Biotechnology graduate specialized in Microbiology with hands-on experience in laboratory diagnostics, microbial analysis, and quality testing.
            </p>
            <a
              href="/anshika resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-text text-background font-bold tracking-widest rounded-xl hover:bg-primary px-6 py-3 transition-colors duration-300 w-full justify-center"
            >
              <Download size={18} />
              VIEW RESUME
            </a>
          </GlowCard>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="md:col-span-8 flex flex-col gap-8"
        >
          <GlowCard className="p-8 h-full flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <GraduationCap className="text-accent" /> Professional Summary
            </h3>
            <p className="text-text-secondary text-lg leading-relaxed mb-6">
              Skilled in aseptic techniques, spectrophotometry, and laboratory instrumentation. Dedicated to maintaining high standards of quality and precision in microbial isolation and analysis.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-auto">
              <div className="bg-background-secondary p-4 rounded-xl border border-gray-100">
                <span className="font-semibold text-primary">Microbial Analysis</span>
                <p className="text-sm text-text-secondary mt-1">Pathogen isolation and enumeration.</p>
              </div>
              <div className="bg-background-secondary p-4 rounded-xl border border-gray-100">
                <span className="font-semibold text-primary">Lab Diagnostics</span>
                <p className="text-sm text-text-secondary mt-1">Biochemical, hematology testing.</p>
              </div>
              <div className="bg-background-secondary p-4 rounded-xl border border-gray-100">
                <span className="font-semibold text-primary">Quality Testing</span>
                <p className="text-sm text-text-secondary mt-1">Water and beverage quality analysis.</p>
              </div>
              <div className="bg-background-secondary p-4 rounded-xl border border-gray-100">
                <span className="font-semibold text-primary">Instrumentation</span>
                <p className="text-sm text-text-secondary mt-1">Spectrophotometry, Autoclave, Centrifuge.</p>
              </div>
            </div>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}
