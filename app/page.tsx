import Hero from "./components/Hero";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import LeadSection from "./components/LeadSection";
import CommunitySection from "./components/CommunitySection";
import EducationSection from "./components/EducationSection";
import ContactSection from "./components/ContactSection";

/** 00 Intro · 01 Build · 02 Engineer · 03 Lead · 04 Share · 05 Beyond the code · 06 Connect */
export default function Home() {
  return (
    <>
      <Hero />
      <ProjectsSection />
      <ExperienceSection />
      <LeadSection />
      <CommunitySection />
      <EducationSection />
      <ContactSection />
    </>
  );
}
