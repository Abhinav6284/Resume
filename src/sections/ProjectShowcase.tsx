"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    id: "proj-1",
    title: "Antioxidant Activity in Beverages",
    shortDescription: "Comparative Study of Antioxidant Activity in Beverages.",
    fullDescription: "Quantitative analysis of beverage samples using UV-Vis spectrophotometry, preparation of standard curves, and interpretation of antioxidant stability.",
    techniques: ["UV-Vis Spectrophotometry", "Quantitative Analysis", "Standard Curves"],
    image: "/beverages.jpg"
  },
  {
    id: "proj-2",
    title: "Water Quality Assessment",
    shortDescription: "Physicochemical analysis of water samples measuring pH, turbidity, TDS, and conductivity.",
    fullDescription: "Physicochemical analysis of water samples measuring pH, turbidity, TDS, and conductivity using laboratory instruments to assess potability and environmental safety.",
    techniques: ["pH/Conductivity", "Turbidity Measurement", "Water Analysis"],
    image: "/Water quality assessment.jpeg"
  },
  {
    id: "proj-3",
    title: "Bioactive Compounds in Singapore Daisy",
    shortDescription: "Multimodal Characterization of Bioactive Compounds in Singapore Daisy.",
    fullDescription: "Spectral interpretation and compound characterization using UV-Vis spectrophotometry to evaluate therapeutic potential and plant extracts.",
    techniques: ["Spectral Interpretation", "Compound Characterization", "Plant Extracts"],
    image: "/singapore-daisy.jpeg"
  },
  {
    id: "proj-4",
    title: "Hemolysis Under Physiological Conditions",
    shortDescription: "Hemolysis Study Under Different Physiological Conditions.",
    fullDescription: "Evaluation of hemolysis under stress conditions and enzyme kinetics analysis to determine Vmax and Km parameters, assessing cellular stability.",
    techniques: ["Enzyme Kinetics", "Hemolysis Evaluation", "Stress Assays"],
    image: "/psylogical condition.jpg"
  },
  {
    id: "proj-5",
    title: "Pathogenic Microbes Isolation from Sewage",
    shortDescription: "Isolation of Pathogenic Microbes from Sewage Samples.",
    fullDescription: "Microbial isolation using aseptic techniques and antibiotic susceptibility testing using Kirby-Bauer method to identify resistance patterns in environmental pathogens.",
    techniques: ["Aseptic Techniques", "Kirby-Bauer Method", "Microbial Culturing"],
    image: ""
  }
];

export default function ProjectShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>('.project-card');

      elements.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, x: -100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={containerRef} className="py-32 px-4 w-full bg-background-secondary relative z-10">
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-text">
          Laboratory Research Projects
        </h2>
        <p className="text-xl text-text-secondary font-light max-w-2xl mx-auto">
          Highlighting innovative methodologies and their analytical application.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-container-${project.id}`}
            className="project-card relative group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col min-h-[450px]"
          >
            <div className="relative overflow-hidden w-full h-[250px] shrink-0 bg-gradient-to-br from-gray-100 to-gray-300">
              {project.image && (
                <motion.img
                  layoutId={`card-image-${project.id}`}
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              {/* Optional overlay gradient */}
              {project.image && <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />}
            </div>

            <div className="p-6 md:p-8 flex flex-col flex-grow">
              <motion.h3
                layoutId={`card-title-${project.id}`}
                className="text-2xl font-bold mb-3 tracking-tight text-text leading-tight"
              >
                {project.title}
              </motion.h3>
              <p className="text-text-secondary mb-6 text-sm flex-grow">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techniques.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
