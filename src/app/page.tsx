import AboutSection from "@/sections/AboutSection";
import ProjectShowcase from "@/sections/ProjectShowcase";
import InternshipSection from "@/sections/InternshipSection";
import LabTechniques from "@/sections/LabTechniques";
import Timeline from "@/sections/Timeline";
import CertificationsSection from "@/sections/CertificationsSection";
import ContactSection from "@/sections/ContactSection";
import { FloatingLabIcons } from "@/components/LabEquipmentIcons";
import HeroSection from "@/sections/HeroSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between relative">
      <FloatingLabIcons />

      <HeroSection />
      <AboutSection />
      <LabTechniques />
      <ProjectShowcase />
      <InternshipSection />
      <Timeline />
      <CertificationsSection />
      <ContactSection />
    </main>
  );
}
