"use client";

import Reveal from "./Reveal";
import { Cloud, GitBranch, BarChart3, ExternalLink, Code2 } from "lucide-react";
import { Pin, EvidenceTape } from "./EvidenceBoard";

const projects = [
  {
    icon: Cloud,
    title: "Articulately",
    body: "A web based application that allows users to practice their articulation skills through gamified tongue-twisters flashcards and exercises.",
    tags: ["Amazon Kiro", "Flutter", "Supabase","CI/CD"],
    caseId: "EVID-001",
    links: {
      github: "https://articulately-5c15b.web.app/",
      live: null,
    },
  },
  {
    icon: GitBranch,
    title: "InterVueAI",
    body: "Created during the Agora Hackathon 2025 securing the TOP 10 place. An AI-powered interview preparation platform that generates personalized interview questions and provides feedback to help users improve their performance.",
    tags: ["Agora", "Grok", "AI"],
    caseId: "EVID-002",
    links: {
      github: null,
      live: null,
    },
  },
  {
    icon: BarChart3,
    title: "IntelliSched",
    body: "University academic scheduling system using the TALL stack (Laravel 11, Livewire 3, Alpine.js, Tailwind CSS), automating conflict-free timetable generation for professors across multiple departments.",
    tags: ["Laravel", "Livewire", "Tailwind CSS"],
    caseId: "EVID-003",
    links: {
      github: null,
      live: null,
    },
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-12 md:py-20">
      <div className="container-site">
        <Reveal>
          <div className="mb-8 md:mb-10">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> ls ~/projects/
            </p>
            <h2 className="text-pixel-header">Projects</h2>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            className="relative border-[3px] border-[#2a2520] rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.03)] p-4 md:p-6 lg:p-8"
            style={{
              background: `
                url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"),
                linear-gradient(135deg, #12100e 0%, #1a1614 50%, #0f0d0b 100%)
              `,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {projects.map((project, i) => (
                <Reveal key={project.title} delay={0.08 + i * 0.06}>
                  <div
                    className={`group relative bg-[var(--bg)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-500 hover:-translate-y-0.5 h-full flex flex-col ${i === 0 ? "md:rotate-[-0.5deg]" : i === 2 ? "md:rotate-[0.5deg]" : ""}`}
                  >
                    <Pin className="top-[-6px] left-1/2 -translate-x-1/2" />

                    <div className="p-4 md:p-6 flex-1 flex flex-col">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center justify-center w-10 h-10 border border-[var(--color-border)] bg-[var(--bg-alt)] group-hover:border-[var(--color-accent)]/40 transition-colors">
                          <project.icon size={16} className="text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors" />
                        </div>
                        <EvidenceTape>{project.caseId}</EvidenceTape>
                      </div>

                      <h3 className="text-display text-xl md:text-2xl text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                        {project.title}
                      </h3>

                      <p className="text-sm leading-relaxed text-[var(--color-muted)] flex-1 mb-4">
                        {project.body}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 text-[10px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-wider text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                          >
                            <Code2 size={13} />
                            Source
                          </a>
                        )}
                        {project.links.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-wider text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors"
                          >
                            <ExternalLink size={13} />
                            Live
                          </a>
                        )}
                      </div>
                    </div>

                    <div className="h-[2px] w-0 group-hover:w-full bg-[var(--color-accent)] transition-all duration-500 ease-out" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
