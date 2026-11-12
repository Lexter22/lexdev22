"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Code2, X } from "lucide-react";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";

const projects = [
  {
    title: "AWS SCD South Website",
    year: "2026",
    tone: "tone-green",
    short: "Official website of AWS Student Community Day: South Summit 2026, where I did QA.",
    stats: [
      { label: "Role", value: "QA" },
      { label: "Attendees", value: "200" },
      { label: "Event date", value: "Oct 7" },
    ],
    tags: ["QA", "Event website"],
    links: { github: "https://aws.scd-south.cloud/", live: null },
    details:
      "Did quality assurance on the official website for AWS Student Community Day: South Summit 2026, the Cloud × AI student summit held on October 7, 2026 in Biñan, Laguna. The summit drew 200 attendees, and I also served as its Event Director.",
  },
  {
    title: "MemberFlow",
    year: "2026",
    tone: "tone-blue",
    short: "Serverless membership & Digital ID platform for AWS SBG PUP Biñan.",
    stats: [
      { label: "Registrations", value: "300+" },
      { label: "Send success", value: "99%+" },
      { label: "Emails sent", value: "100+" },
    ],
    tags: ["React", "TypeScript", "Supabase", "AWS Lambda"],
    links: { github: null, live: null },
    details:
      "Built with React, TypeScript, Supabase, and AWS Lambda. Processed 300+ registrations with multi-step forms, document uploads, and digital ID issuance. Implemented an email pipeline using Supabase Edge Functions, AWS Lambda, and Gmail SMTP with queued retries and a scheduled GitHub Actions worker; sent 100+ emails with a 99%+ send success rate. Replaced Google Forms and manual acceptance emails with a single approval workflow that sends acceptance emails and generates membership IDs; enforced access controls through JWT authentication and PostgreSQL Row-Level Security.",
  },
  {
    title: "InterVueAI",
    year: "2026",
    tone: "tone-amber",
    short: "AI interview MVP built in 24 hours; Top 10 out of 23 teams at AWS Cloud Club Philippines Innovation Cup.",
    stats: [
      { label: "Placement", value: "Top 10" },
      { label: "Teams", value: "23" },
      { label: "Build time", value: "24 hrs" },
    ],
    tags: ["Supabase", "Agora", "Grok AI"],
    links: { github: null, live: null },
    details:
      "Built an AI interview MVP in 24 hours using Supabase, Agora, and Grok AI to automate simulated interviews and candidate feedback. Placed in the Top 10 out of 23 teams at the AWS Cloud Club Philippines Innovation Cup, held in collaboration with Agora.",
  },
  {
    title: "Articulately",
    year: "2026",
    tone: "tone-pink",
    short: "Flutter and Supabase articulation-practice app with gamified tongue twisters, flashcards, and exercises.",
    stats: [
      { label: "Article views", value: "400" },
      { label: "Platform", value: "Flutter" },
      { label: "Backend", value: "Supabase" },
    ],
    tags: ["Flutter", "Supabase"],
    links: { github: "https://articulately-5c15b.web.app/", live: null },
    details:
      "Built and deployed a Flutter and Supabase articulation-practice application with gamified tongue twisters, flashcards, and exercises. Published an AWS Builder Center article that received 400 views.",
  },
  {
    title: "IntelliSched",
    year: "2026",
    tone: "tone-violet",
    short: "Academic scheduling system for 40 professors, 20 departments, and 12 courses.",
    stats: [
      { label: "Professors", value: "40" },
      { label: "Departments", value: "20" },
      { label: "Courses", value: "12" },
    ],
    tags: ["Laravel", "Livewire", "Alpine.js", "Tailwind CSS"],
    links: { github: null, live: null },
    details:
      "Developed an academic scheduling system using Laravel, Livewire, Alpine.js, and Tailwind CSS. Designed to support 40 professors, 20 departments, and 12 courses. Replaced paper-based collection with authenticated forms for professors to submit availability and preferred subjects. Automated schedule generation for subject offerings and sections, rejecting overlapping room, professor, and section schedules; integrated Gemini AI for explanations and suggestions.",
  },
];

type Project = (typeof projects)[number];

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const [lead, ...rest] = project.stats;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className={`${project.tone} panel panel-hover group flex h-full w-full flex-col p-5 text-left sm:p-6`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="text-[11px] font-semibold text-[var(--color-muted-light)]">{project.year}</span>
        <ArrowUpRight
          size={18}
          aria-hidden="true"
          className="text-[var(--color-muted-light)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
        />
      </div>

      <h3 className="text-display mt-3 text-lg text-[var(--color-text)] md:text-xl">{project.title}</h3>
      <p className="mt-3 max-w-[56ch] text-sm leading-relaxed text-[var(--color-muted)]">{project.short}</p>

      <div className="mt-6 border-t border-[var(--color-border)] pt-4">
        <p className="font-[family-name:var(--font-pixel)] text-lg text-[var(--accent)]">{lead.value}</p>
        <p className="mt-2 text-[11px] uppercase tracking-wider text-[var(--color-muted-light)]">{lead.label}</p>
        <p className="mt-1 text-[11px] text-[var(--color-muted-light)]">
          {rest.map((s) => `${s.value} ${s.label.toLowerCase()}`).join(" · ")}
        </p>
      </div>

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-5">
        {project.tags.map((tag) => (
          <li key={tag} className="tag">{tag}</li>
        ))}
      </ul>
      <span className="sr-only">Open case study</span>
    </button>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b131b]/85 p-4 sm:p-6"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`${project.tone} panel relative max-h-[90svh] w-full max-w-2xl overflow-y-auto border-t-[3px] !border-t-[var(--accent)] p-5 sm:p-7`}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-[4px] border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--color-text)]"
          aria-label="Close case study"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <p className="chapter-eyebrow mb-2">{project.year}</p>
        <h2 id="project-modal-title" className="text-display mb-4 pr-12 text-2xl text-[var(--color-text)]">
          {project.title}
        </h2>
        <p className="mb-6 text-sm leading-relaxed text-[var(--color-muted)]">{project.details}</p>

        <div className="mb-5 grid grid-cols-3 gap-px overflow-hidden rounded-[4px] border border-[var(--color-border)] bg-[var(--color-border)]">
          {project.stats.map((s) => (
            <div key={s.label} className="bg-[var(--bg)] px-3 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-light)]">{s.label}</p>
              <p className="mt-1 text-base font-bold text-[var(--accent)]">{s.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li key={tag} className="tag">{tag}</li>
            ))}
          </ul>
          {project.links.github && (
            <a href={project.links.github} target="_blank" rel="noreferrer" className="btn btn-primary !min-h-10 !py-2">
              <Code2 size={13} aria-hidden="true" />
              Open project
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsSection() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const close = useCallback(() => setOpenProject(null), []);

  return (
    <section id="projects" className="chapter tone-blue">
      <div className="container-site">
        <ChapterHeading
          index="02"
          path="projects"
          title="Selected Projects"
          intro="A selection of 2026 work, from a 24-hour hackathon MVP to a membership platform with 300+ registrations. Open one for the full case."
        />
        {/* Two wide cards on top, three narrower below; the last one fills the row on tablets */}
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5">
          {projects.map((project, i) => (
            <li
              key={project.title}
              className={`${i < 2 ? "lg:col-span-3" : "lg:col-span-2"} ${i === projects.length - 1 ? "md:col-span-2" : ""}`}
            >
              <Reveal delay={i * 0.05} y={16} className="h-full">
                <ProjectCard project={project} onOpen={() => setOpenProject(project)} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {openProject && <ProjectModal key={openProject.title} project={openProject} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
