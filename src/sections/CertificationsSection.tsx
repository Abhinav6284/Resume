"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowCard from "@/components/GlowCard";
import { Award, Medal, FileText } from "lucide-react";

const certificates = [
  { title: "Introduction to Data Analytics", issuer: "Saylor", link: "/certificates/data analytics.pdf" },
  { title: "Introduction to MS Excel", issuer: "Simplilearn", link: "/certificates/ms excel.pdf" },
  { title: "PCR and Electrophoresis", issuer: "LPU", link: "/certificates/pcr and electrophoresis.pdf" },
  { title: "Good Laboratory Practices (GLP)", issuer: "LPU", link: "/certificates/Good lab practic.pdf" },
  { title: "Oral Presenter", issuer: "MicCon25 International Conference", link: "/certificates/miccon 2025 .pdf" },
  { title: "Participant", issuer: "IDEATHON 4.0 Innovation Challenge", link: "/certificates/IDEATHON_EXTERNAL PARTICIPANT_Final-22.pdf" },
];

export default function CertificationsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <section id="certifications" ref={sectionRef} className="py-32 px-4 relative max-w-7xl mx-auto z-10 w-full mb-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 text-text">Certifications & Awards</h2>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full shadow-[0_0_10px_rgba(46,107,255,0.5)]" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <GlowCard className="p-6 h-full flex flex-col justify-center items-start group">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                {cert.title.includes("Presenter") || cert.title.includes("Participant") ? (
                  <Medal className="text-accent w-6 h-6" />
                ) : (
                  <Award className="text-accent w-6 h-6" />
                )}
              </div>
              <h3 className="text-lg font-bold text-text mb-2 tracking-tight group-hover:text-primary transition-colors">
                {cert.title}
              </h3>
              <p className="text-text-secondary text-sm font-medium mt-auto mb-4">
                {cert.issuer}
              </p>
              {cert.link && (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-primary border border-primary/30 bg-primary/10 hover:bg-primary hover:text-white px-4 py-2 rounded-full transition-all duration-300"
                >
                  <FileText size={14} />
                  View Certificate
                </a>
              )}
            </GlowCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
