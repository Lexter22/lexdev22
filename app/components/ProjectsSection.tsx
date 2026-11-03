"use client";

import { useState } from "react";
import Reveal from "./Reveal";
import { Code2, X } from "lucide-react";

const projects = [
  {
    title: "MemberFlow",
    year: "2026",
    short: "Serverless membership & Digital ID platform for AWS SBG PUP Biñan.",
    stats: [
      { label: "Registrations", value: "300+" },
      { label: "Send success", value: "99%+" },
      { label: "Emails sent", value: "100+" },
    ],
    tags: ["React", "TypeScript", "Supabase", "AWS Lambda"],
    links: { github: null, live: null },
    screenshot: "/coming-soon.svg",
    details:
      "Built with React, TypeScript, Supabase, and AWS Lambda. Processed 300+ registrations with multi-step forms, document uploads, and digital ID issuance. Implemented an email pipeline using Supabase Edge Functions, AWS Lambda, and Gmail SMTP with queued retries and a scheduled GitHub Actions worker; sent 100+ emails with a 99%+ send success rate. Replaced Google Forms and manual acceptance emails with a single approval workflow that sends acceptance emails and generates membership IDs; enforced access controls through JWT authentication and PostgreSQL Row-Level Security.",
  },
  {
    title: "InterVueAI",
    year: "2026",
    short: "AI interview MVP built in 24 hours; Top 10 out of 23 teams at AWS Cloud Club Philippines Innovation Cup.",
    stats: [
      { label: "Placement", value: "Top 10" },
      { label: "Teams", value: "23" },
      { label: "Build time", value: "24 hrs" },
    ],
    tags: ["Supabase", "Agora", "Grok AI"],
    links: { github: null, live: null },
    screenshot: "/coming-soon.svg",
    details:
      "Built an AI interview MVP in 24 hours using Supabase, Agora, and Grok AI to automate simulated interviews and candidate feedback. Placed in the Top 10 out of 23 teams at the AWS Cloud Club Philippines Innovation Cup, held in collaboration with Agora.",
  },
  {
    title: "Articulately",
    year: "2026",
    short: "Flutter and Supabase articulation-practice app with gamified tongue twisters, flashcards, and exercises.",
    stats: [
      { label: "Article views", value: "400" },
      { label: "Platform", value: "Flutter" },
      { label: "Backend", value: "Supabase" },
    ],
    tags: ["Flutter", "Supabase"],
    links: { github: "https://articulately-5c15b.web.app/", live: null },
    screenshot: "/coming-soon.svg",
    details:
      "Built and deployed a Flutter and Supabase articulation-practice application with gamified tongue twisters, flashcards, and exercises. Published an AWS Builder Center article that received 400 views.",
  },
  {
    title: "IntelliSched",
    year: "2026",
    short: "Academic scheduling system for 40 professors, 20 departments, and 12 courses.",
    stats: [
      { label: "Professors", value: "40" },
      { label: "Departments", value: "20" },
      { label: "Courses", value: "12" },
    ],
    tags: ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    links: { github: null, live: null },
    screenshot: "/coming-soon.svg",
    details:
      "Developed an academic scheduling system using Laravel, Livewire, Alpine.js, and Tailwind CSS. Designed to support 40 professors, 20 departments, and 12 courses. Replaced paper-based collection with authenticated forms for professors to submit availability and preferred subjects. Automated schedule generation for subject offerings and sections, rejecting overlapping room, professor, and section schedules; integrated Gemini AI for explanations and suggestions.",
  },
];

type Project = (typeof projects)[number];

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article
      onClick={onOpen}
      onKeyDown={(e) => { if (e.key === "Enter") onOpen(); }}
      role="button"
      tabIndex={0}
      className="flex-shrink-0 w-full sm:w-80 md:w-96 border border-[var(--color-border)] bg-[var(--bg)] rounded-sm p-5 sm:p-6 group cursor-pointer hover:border-[var(--color-accent)]/40 transition-colors duration-300"
    >
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="text-display text-base sm:text-lg text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
            {project.title}
          </h3>
          {project.year && (
            <span className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
              {project.year}
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base leading-relaxed text-[var(--color-muted)] flex-1 mb-4 line-clamp-2">
          {project.short}
        </p>

        <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2 mb-4">
          {project.stats.map((s) => (
            <div key={s.label} className="border border-[var(--color-border)] bg-[var(--bg-alt)] p-2 sm:p-3 min-h-[40px] flex flex-col">
              <p className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-wider text-[var(--color-muted-light)] leading-none mb-0.5">
                {s.label}
              </p>
              <p className="text-[12px] sm:text-[14px] font-bold text-[var(--color-text)] leading-none">
                {s.value}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-[11px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-[var(--bg-alt)] border border-[var(--color-border-strong)] p-4 sm:p-6 shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-[var(--bg-alt)]/80 border border-[var(--color-border-strong)] text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-surface-alt)] transition-all duration-200 backdrop-blur-sm"
          aria-label="Close case"
        >
          <X size={18} strokeWidth={2} />
          <span className="sr-only">Close</span>
        </button>

        <div className="relative h-[35%] overflow-hidden border-b border-[var(--color-border)] mb-5 rounded-t-sm">
          <img
            src={project.screenshot}
            alt={`${project.title} evidence photo`}
            width={800}
            height={600}
            className="w-full h-full object-cover brightness-[0.85]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="p-0 sm:p-0">
          <div className="flex items-start justify-between gap-4 sm:gap-6 mb-4">
            <div>
              <h2 className="text-display text-lg sm:text-xl text-[var(--color-text)] mb-1">
                {project.title}
              </h2>
              {project.year && (
                <span className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                  {project.year}
                </span>
              )}
            </div>
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 border border-[var(--color-accent)] bg-[var(--color-accent)] text-[#000] text-[11px] sm:text-[12px] font-bold uppercase tracking-wider hover:brightness-110 active:scale-[0.97] transition-colors"
              >
                <Code2 size={12} />
                Source
              </a>
            )}
          </div>

          <p className="text-[12px] sm:text-[14px] leading-relaxed text-[var(--color-muted)] mb-6 max-w-none">
            {project.details}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.stats.map((s) => (
              <div key={s.label} className="border border-[var(--color-border)] bg-[var(--bg)] p-3 sm:p-4 min-h-[40px]">
                <p className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-muted-light)] leading-none">
                  {s.label}
                </p>
                <p className="mt-1 text-[14px] sm:text-[16px] font-bold text-[var(--color-text)]">
                  {s.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 sm:mt-6">
            <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  if (openProject) {
    return <ProjectModal project={openProject} onClose={() => setOpenProject(null)} />;
  }

  return (
    <section id="projects" className="py-8 sm:py-10 md:py-14">
      <div className="container-site">
        <Reveal>
          <div className="mb-8 sm:mb-10 md:mb-12">
            <h2 className="text-pixel-header text-wrap balance">Projects</h2>
            <p className="mt-2 max-w-[600px] text-xs sm:text-sm leading-relaxed text-[var(--color-muted)]">
              Case files laid out horizontally. Click a case to open full details.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="relative">
            <div className="flex gap-6 sm:gap-8 overflow-x-auto scrollbar-hide pb-6 sm:pb-8" style={{ scrollbarWidth: "none" }}>
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} onOpen={() => setOpenProject(project)} />
              ))}
            </div>
            <div className="absolute bottom-2 right-2 text-[10px] sm:text-[11px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)]">
              &gt; swipe to browse cases
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
