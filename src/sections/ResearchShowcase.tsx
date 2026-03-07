"use client";
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Dna, Bug, Leaf, Microscope } from "lucide-react";

const researchTopics = [
  {
    id: "genetics",
    title: "Microbial Genetics",
    description: "Unraveling the genetic code of microorganisms to understand mutations, horizontal gene transfer, and the fundamental blueprint of life.",
    icon: Dna,
    color: "from-primary/20",
    shadow: "shadow-[0_0_40px_rgba(91,140,255,0.15)]"
  },
  {
    id: "resistance",
    title: "Antibiotic Resistance",
    description: "Investigating the mechanisms by which bacteria evolve resistance to antibiotics, aiming to develop novel therapeutic strategies.",
    icon: Bug,
    color: "from-accent/20",
    shadow: "shadow-[0_0_40px_rgba(0,255,209,0.15)]"
  },
  {
    id: "environmental",
    title: "Environmental Microbiology",
    description: "Studying the distribution and function of microbes in diverse environments, from deep-sea vents to global biomes.",
    icon: Leaf,
    color: "from-green-500/20",
    shadow: "shadow-[0_0_40px_rgba(34,197,94,0.15)]"
  },
  {
    id: "molecular",
    title: "Molecular Biology",
    description: "Analyzing the molecular basis of biological activity in and between cells, focusing on DNA, RNA, and proteins.",
    icon: Microscope,
    color: "from-purple-500/20",
    shadow: "shadow-[0_0_40px_rgba(168,85,247,0.15)]"
  }
];

export default function ResearchShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const blocks = gsap.utils.toArray<HTMLElement>('.research-block');
    
    blocks.forEach((block) => {
      gsap.fromTo(block, 
        { opacity: 0, y: 100, scale: 0.95 },
        {
          opacity: 1, 
          y: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="research" ref={containerRef} className="py-40 relative px-4 w-full bg-[#030303]">
      <div className="max-w-7xl mx-auto mb-32">
        <motion.div
          initial={{ opacity: 0, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-text via-text to-text/50">
            Research Focus
          </h2>
          <p className="text-xl md:text-2xl text-text/60 font-light max-w-3xl mx-auto">
            Pioneering discoveries at the intersection of biology and technology.
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {researchTopics.map((topic, index) => (
          <div 
            key={topic.id}
            className={`research-block relative rounded-3xl overflow-hidden border border-white/5 bg-background ${topic.shadow} min-h-[60vh] flex flex-col justify-center p-12 md:p-24`}
          >
            {/* Animated graphical background */}
            <div className={`absolute -inset-[100%] bg-gradient-to-br ${topic.color} to-transparent opacity-30 pointer-events-none blur-3xl`} />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className={index % 2 === 0 ? "order-1" : "order-1 lg:order-2"}>
                <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 backdrop-blur-md">
                  <topic.icon size={40} className={index % 2 === 0 ? "text-primary" : "text-accent"} />
                </div>
                <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
                  {topic.title}
                </h3>
                <p className="text-lg md:text-xl text-text/70 leading-relaxed font-light">
                  {topic.description}
                </p>
              </div>
              <div className={index % 2 === 0 ? "order-2" : "order-2 lg:order-1"}>
                {/* Visual placeholder for complex animations/visuals */}
                <div className="w-full aspect-square md:aspect-video lg:aspect-square rounded-3xl bg-gradient-to-tr from-white/5 to-white/10 border border-white/10 backdrop-blur-sm relative overflow-hidden group">
                   <div className="absolute inset-0 flex items-center justify-center">
                     <div className="w-32 h-32 rounded-full bg-white/5 blur-xl group-hover:scale-150 transition-transform duration-1000" />
                   </div>
                   <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
