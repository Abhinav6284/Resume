"use client";
import React from "react";

export const MicroscopeIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M6 18h8" />
    <path d="M3 22h18" />
    <path d="M14 22a7 7 0 1 0 0-14h-1" />
    <path d="M9 14h2" />
    <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
    <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
  </svg>
);

export const PetriDishIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <ellipse cx="12" cy="12" rx="10" ry="5" />
    <ellipse cx="12" cy="14" rx="10" ry="5" opacity="0.5" />
    <path d="M7 12a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
    <path d="M13 13a1.5 1.5 0 1 0 3 0 1.5 1.5 0 1 0-3 0" />
  </svg>
);

export const TestTubeIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 2v17.5A2.5 2.5 0 0 1 6.5 22v0A2.5 2.5 0 0 1 4 19.5V2" />
    <path d="M20 2v17.5a2.5 2.5 0 0 1-2.5 2.5v0a2.5 2.5 0 0 1-2.5-2.5V2" />
    <path d="M3 2h7" />
    <path d="M14 2h7" />
    <path d="M4 14h5" />
    <path d="M15 14h5" />
  </svg>
);

export const DnaIcon = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m14.5 2-.5.5" />
    <path d="m18.5 2-6 6" />
    <path d="m22 5.5-3 3" />
    <path d="m3 14 3-3" />
    <path d="m2 18.5 6-6" />
    <path d="m5.5 22 3-3" />
    <path d="m2 2 20 20" />
    <path d="m22 2-20 20" />
  </svg>
);

export function FloatingLabIcons() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    import("gsap").then(({ default: gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
          const icons = gsap.utils.toArray<HTMLElement>('.lab-svg-icon');
          
          icons.forEach((icon, i) => {
            gsap.fromTo(icon, 
              { 
                opacity: 0, 
                x: i % 2 === 0 ? -150 : 150, 
                rotation: -45,
                filter: 'drop-shadow(0px 0px 0px rgba(0,0,0,0))'
              },
              {
                opacity: 0.2, // Subtle background opacity
                x: 0,
                rotation: 0,
                filter: 'drop-shadow(0px 0px 20px rgba(46,107,255,0.6))',
                duration: 1.5,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: icon,
                  start: "top 90%",
                  toggleActions: "play none none reverse",
                }
              }
            );

            // Add continuous slow floating after slide-in
            gsap.to(icon, {
              y: "+=30",
              rotation: "+=15",
              duration: 3 + i,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          });
        }, containerRef);

        return () => ctx.revert();
      });
    });
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden text-primary/20">
      <div className="absolute top-[20%] left-[10%] lab-svg-icon drop-shadow-2xl">
        <PetriDishIcon className="w-32 h-32" />
      </div>
      <div className="absolute top-[60%] right-[15%] lab-svg-icon drop-shadow-2xl">
        <DnaIcon className="w-40 h-40" />
      </div>
      <div className="absolute top-[80%] left-[20%] lab-svg-icon drop-shadow-2xl">
        <TestTubeIcon className="w-24 h-24" />
      </div>
    </div>
  );
}
