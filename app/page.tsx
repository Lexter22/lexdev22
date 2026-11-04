import Hero from "./components/Hero";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ExperienceSection from "./components/ExperienceSection";
import EventsSection from "./components/EventsSection";
import EducationSection from "./components/EducationSection";
import BlogSection from "./components/BlogSection";
import ContactSection from "./components/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <EventsSection />
      <EducationSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
