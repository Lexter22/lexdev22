"use client";

import Reveal from "./Reveal";
import { Cloud, GitBranch, BarChart3, ExternalLink, Code2, Pin } from "lucide-react";

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
    body: "Created during the Agora Hackathon 2025 securing the TOP 10 place. InterVueAI is an powered interview preparation platform that generates personalized interview questions and provides feedback to help users improve their performance.",
    tags: ["Agora", "Grok", "AI"],
    caseId: "EVID-002",
    links: {
      github: "https://github.com/Lexter22/cicd-pipelines",
      live: null,
    },
  },
  {
    icon: BarChart3,
    title: "IntelliSched",
    body: "Developed a university academic scheduling system using the TALL stack (Laravel 11, Livewire 3, Alpine.js, Tailwind CSS), automating conflict-free timetable generation for 80 professors across [X] departments and [X]+ sections per semester",
    tags: ["Prometheus", "Grafana", "Kubernetes"],
    caseId: "EVID-003",
    links: {
      github: "https://github.com/Lexter22/observability-stack",
      live: null,
    },
  },
];

const rotations = ["md:rotate-[-0.8deg] md:translate-y-1", "md:rotate-[0.6deg] md:translate-y-[-4px]", "md:rotate-[-0.4deg] md:translate-y-2"];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> ls ~/projects/
            </p>
            <h2 className="text-pixel-header">Projects</h2>
          </div>
        </Reveal>

        <div className="relative bg-[var(--bg-alt)] border border-[var(--color-border)] p-4 md:p-8">
          <div className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='none' stroke='%23f0f0f0' stroke-width='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: "20px 20px",
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {projects.map((project, i) => (
              <Reveal key={project.title} delay={i * 0.08}>
                <div
                  className={`relative bg-[var(--bg)] border border-[var(--color-border)] p-4 md:p-6 h-full flex flex-col group transition-all duration-300 ${rotations[i]}`}
                >
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                    <Pin
                      size={16}
                      className="text-[var(--color-muted-light)] drop-shadow-sm"
                    />
                  </div>

                  <span className="monokai text-[10px] tracking-[0.15em] text-[var(--color-muted-light)] mb-4">
                    {project.caseId}
                  </span>

                  <div className="flex items-center justify-center w-10 h-10 border border-[var(--color-border)] bg-[var(--bg-alt)] mb-4 group-hover:border-[var(--color-accent)]/40 transition-colors">
                    <project.icon size={16} className="text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors" />
                  </div>

                  <h3 className="text-display text-xl md:text-2xl text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-[var(--color-muted)] flex-1 mb-3">
                    {project.body}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-2">
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
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
