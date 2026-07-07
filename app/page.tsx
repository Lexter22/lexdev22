import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import EducationSection from "./components/EducationSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import BeyondCodingSection from "./components/BeyondCodingSection";
import CertificationsSection from "./components/CertificationsSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <EducationSection />
      <ProjectsSection />
      <ExperienceSection />
      <BeyondCodingSection />
      <CertificationsSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
