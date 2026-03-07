import dynamic from "next/dynamic";
import AboutSection from "@/sections/AboutSection";
import ProjectShowcase from "@/sections/ProjectShowcase";
import InternshipSection from "@/sections/InternshipSection";
import LabTechniques from "@/sections/LabTechniques";
import Timeline from "@/sections/Timeline";
import CertificationsSection from "@/sections/CertificationsSection";
import ContactSection from "@/sections/ContactSection";
import { FloatingLabIcons } from "@/components/LabEquipmentIcons";
import HeroSection from "@/sections/HeroSection";
import CustomCursor from "@/components/CustomCursor";

const LiquidBubbles = dynamic(() => import("@/components/LiquidBubbles"), { ssr: false });
const ThreeInteractive = dynamic(() => import("@/sections/ThreeInteractive"), { ssr: false });
const FloatingMicrobes = dynamic(() => import("@/three/FloatingMicrobes"), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <CustomCursor />
      <FloatingLabIcons />
      <LiquidBubbles />
      <div className="fixed inset-0 pointer-events-none z-[-1]">
        <FloatingMicrobes />
      </div>

      <HeroSection />
      <AboutSection />
      <LabTechniques />
      <ProjectShowcase />
      <InternshipSection />
      <ThreeInteractive />
      <Timeline />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}
