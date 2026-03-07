"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const projects = [
  {
    id: "proj-1",
    title: "Antioxidant Activity in Beverages",
    shortDescription: "Comparative Study of Antioxidant Activity in Beverages.",
    fullDescription: "Quantitative analysis of beverage samples using UV-Vis spectrophotometry, preparation of standard curves, and interpretation of antioxidant stability.",
    techniques: ["UV-Vis Spectrophotometry", "Quantitative Analysis", "Standard Curves"],
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "proj-2",
    title: "Water Quality Assessment",
    shortDescription: "Physicochemical analysis of water samples measuring pH, turbidity, TDS, and conductivity.",
    fullDescription: "Physicochemical analysis of water samples measuring pH, turbidity, TDS, and conductivity using laboratory instruments to assess potability and environmental safety.",
    techniques: ["pH/Conductivity", "Turbidity Measurement", "Water Analysis"],
    image: "https://images.unsplash.com/photo-1580828369069-b5f7be8ad4d6?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "proj-3",
    title: "Bioactive Compounds in Singapore Daisy",
    shortDescription: "Multimodal Characterization of Bioactive Compounds in Singapore Daisy.",
    fullDescription: "Spectral interpretation and compound characterization using UV-Vis spectrophotometry to evaluate therapeutic potential and plant extracts.",
    techniques: ["Spectral Interpretation", "Compound Characterization", "Plant Extracts"],
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: "proj-4",
    title: "Hemolysis Under Physiological Conditions",
    shortDescription: "Hemolysis Study Under Different Physiological Conditions.",
    fullDescription: "Evaluation of hemolysis under stress conditions and enzyme kinetics analysis to determine Vmax and Km parameters, assessing cellular stability.",
    techniques: ["Enzyme Kinetics", "Hemolysis Evaluation", "Stress Assays"],
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2068&auto=format&fit=crop"
  },
  {
    id: "proj-5",
    title: "Pathogenic Microbes Isolation from Sewage",
    shortDescription: "Isolation of Pathogenic Microbes from Sewage Samples.",
    fullDescription: "Microbial isolation using aseptic techniques and antibiotic susceptibility testing using Kirby-Bauer method to identify resistance patterns in environmental pathogens.",
    techniques: ["Aseptic Techniques", "Kirby-Bauer Method", "Microbial Culturing"],
    image: "https://images.unsplash.com/photo-1574926054593-df810f135118?q=80&w=2076&auto=format&fit=crop"
  }
];

export default function ProjectShowcase() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
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

  const selectedProject = projects.find((p) => p.id === selectedId);

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

      <div className="max-w-7xl mx-auto grid grid-cols-1 gap-16">
        {projects.map((project) => (
          <motion.div
            key={project.id}
            layoutId={`card-container-${project.id}`}
            onClick={() => setSelectedId(project.id)}
            className="project-card relative cursor-pointer group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 grid grid-cols-1 md:grid-cols-2 min-h-[400px]"
          >
            <div className="relative overflow-hidden w-full h-[300px] md:h-full">
              <motion.img
                layoutId={`card-image-${project.id}`}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r" />
            </div>
            
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <motion.h3 
                layoutId={`card-title-${project.id}`}
                className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-text"
              >
                {project.title}
              </motion.h3>
              <p className="text-text-secondary mb-8 max-w-md">
                {project.shortDescription}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {project.techniques.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto">
                <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wider text-primary group-hover:text-accent transition-colors uppercase">
                  View Details <ExternalLink size={16} />
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="fixed inset-0 bg-white/80 backdrop-blur-xl z-[60]"
            />
            <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
              <motion.div
                layoutId={`card-container-${selectedProject.id}`}
                className="w-full max-w-5xl bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] pointer-events-auto relative"
              >
                <button 
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 z-10 w-10 h-10 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-text-secondary hover:text-text hover:bg-white shadow-sm transition-all"
                >
                  <X size={20} />
                </button>

                <div className="w-full md:w-1/2 relative h-64 md:h-auto">
                  <motion.img
                    layoutId={`card-image-${selectedProject.id}`}
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-black/50 to-transparent md:bg-gradient-to-r" />
                </div>
                
                <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto">
                  <motion.h3 
                    layoutId={`card-title-${selectedProject.id}`}
                    className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-text"
                  >
                    {selectedProject.title}
                  </motion.h3>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-8"
                  >
                    <div>
                      <h4 className="text-xl font-semibold mb-3 text-primary">Overview</h4>
                      <p className="text-text-secondary leading-relaxed font-light">
                        {selectedProject.fullDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xl font-semibold mb-3 text-accent">Lab Techniques & Tools</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.techniques.map((tech) => (
                          <span key={tech} className="px-4 py-2 bg-background-secondary text-primary text-sm rounded-lg border border-gray-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <button className="w-full py-4 mt-8 bg-text text-background font-bold tracking-widest rounded-xl hover:bg-white hover:scale-[1.02] transition-all">
                      VIEW FULL REPORT
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
