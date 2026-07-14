"use client";

import Reveal from "./Reveal";
import { Briefcase, GraduationCap, Award, Terminal } from "lucide-react";

const entries = [
  {
    icon: Briefcase,
    title: "Junior Software Engineer",
    org: "Dewise Solutions Philippines",
    location: "Hybrid / Mandaluyong City, Philippines",
    year: "Dec 2025 — April 2026",
    body: "Developed and maintained web applications using .NET. Collaborated with cross-functional teams to deliver high-quality software solutions. Implemented responsive designs and optimized performance for better user experience.",
  },
  {
    icon: GraduationCap,
    title: "BS Information Technology",
    org: "Major in Software Engineering",
    location: "",
    year: "Ongoing",
    body: "",
  },
  {
    icon: Award,
    title: "Foundational C# Microsoft Certification",
    org: "FreeCodeCamp",
    location: "",
    year: "2025",
    body: "",
  },
  {
    icon: Terminal,
    title: "SQL Associate",
    org: "SQL, Data Analysis, and Database Management",
    location: "",
    year: "2025",
    body: "",
  },
  {
    icon: Terminal,
    title: "The Legend of Python",
    org: "Python, Programming, Data Structures and Algorithms",
    location: "",
    year: "2025",
    body: "",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> cat experience.log
            </p>
            <h2 className="text-pixel-header">Experience</h2>
          </div>
        </Reveal>

        <div className="border-t border-[var(--color-border)]">
          {entries.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="py-4 md:py-6 border-b border-[var(--color-border)] last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 shrink-0 border border-[var(--color-border)] bg-[var(--bg-alt)]">
                    <item.icon size={14} className="text-[var(--color-text)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                      <h3 className="text-display text-lg md:text-xl text-[var(--color-text)]">
                        {item.title}
                      </h3>
                      <span className="text-[12px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)] mt-0.5 md:mt-0 md:ml-4 whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)] mb-1.5">
                      {item.org}
                      {item.location && <span> &mdash; {item.location}</span>}
                    </p>
                    {item.body && (
                      <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-muted)] max-w-[600px]">
                        {item.body}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
