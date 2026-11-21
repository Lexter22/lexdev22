"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronRight, Code2, X } from "lucide-react";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";

const projects = [
  {
    title: "AWS SCD South Website",
    year: "2026",
    short: "Official website of AWS Student Community Day: South Summit 2026, where I did QA.",
    stats: [
      { label: "Role", value: "QA" },
      { label: "Attendees", value: "200" },
      { label: "Event date", value: "Oct 7" },
    ],
    tags: ["QA", "Event website"],
    live: "https://aws.scd-south.cloud/",
    image: "/projects/scd-south.jpg",
    imageAlt: "The South Summit 2026 website, opening its SouthFest story section",
    details:
      "Did quality assurance on the official website for AWS Student Community Day: South Summit 2026, the Cloud × AI student summit held on October 7, 2026 in Biñan, Laguna. The summit drew 200 attendees, and I also served as its Event Director.",
  },
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
    live: null,
    image: null,
    imageAlt: "",
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
    live: null,
    image: null,
    imageAlt: "",
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
    live: "https://articulately-5c15b.web.app/",
    image: "/projects/articulately.jpg",
    imageAlt: "Articulately home screen with Easy, Medium, Hard and Random difficulty buttons",
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
    live: null,
    image: null,
    imageAlt: "",
    details:
      "Developed an academic scheduling system using Laravel, Livewire, Alpine.js, and Tailwind CSS. Designed to support 40 professors, 20 departments, and 12 courses. Replaced paper-based collection with authenticated forms for professors to submit availability and preferred subjects. Automated schedule generation for subject offerings and sections, rejecting overlapping room, professor, and section schedules; integrated Gemini AI for explanations and suggestions.",
  },
];

type Project = (typeof projects)[number];

const host = (url: string) => new URL(url).host;

/** Screenshot in a browser frame whose address bar shows the real URL. */
function BrowserShot({
  project,
  className = "",
  ratio = "aspect-[16/10]",
}: {
  project: Project;
  className?: string;
  ratio?: string;
}) {
  if (!project.image || !project.live) return null;
  return (
    <div className={`overflow-hidden rounded-[6px] border border-[var(--color-border-strong)] bg-[var(--bg)] ${className}`}>
      <div className="flex h-7 items-center gap-1.5 border-b border-[var(--color-border)] px-3">
        <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="h-2 w-2 rounded-full bg-[var(--color-border-strong)]" />
        <span className="ml-2 truncate rounded-[3px] bg-[var(--bg-alt)] px-2 py-0.5 text-[10px] text-[var(--color-muted-light)]">
          {host(project.live)}
        </span>
      </div>
      <img
        src={project.image}
        alt={project.imageAlt}
        width={1440}
        height={900}
        loading="lazy"
        className={`${ratio} w-full object-cover object-top`}
      />
    </div>
  );
}

function Stats({ stats }: { stats: Project["stats"] }) {
  return (
    <dl className="grid grid-cols-3 border-y border-[var(--color-border)]">
      {stats.map((st, i) => (
        <div key={st.label} className={`py-3 ${i > 0 ? "border-l border-[var(--color-border)] pl-3 sm:pl-4" : ""}`}>
          <dt className="text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-light)]">{st.label}</dt>
          <dd className="mt-1 text-[15px] font-bold text-[var(--color-text)]">{st.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Featured({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="panel grid gap-6 p-4 sm:p-6 lg:grid-cols-12 lg:items-center lg:gap-10 lg:p-8">
      <a
        href={project.live!}
        target="_blank"
        rel="noopener noreferrer"
        className="group block lg:col-span-7"
        aria-label={`${project.title}, open the live site in a new tab`}
      >
        <BrowserShot project={project} className="transition-colors group-hover:border-[var(--accent)]" />
      </a>

      <div className="lg:col-span-5">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-light)]">
          Featured · {project.year}
        </p>
        <h3 className="text-display mt-2 text-xl md:text-2xl">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)] md:text-[15px]">{project.short}</p>
        <div className="mt-5">
          <Stats stats={project.stats} />
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:flex">
          <a href={project.live!} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            Visit site
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <button type="button" onClick={onOpen} aria-haspopup="dialog" className="btn btn-ghost">
            Case study
          </button>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      className="panel panel-hover group flex h-full w-full flex-col gap-5 p-4 text-left sm:p-5"
    >
      <div className="w-full">
        <BrowserShot project={project} ratio="aspect-[2/1]" />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-display text-lg">{project.title}</h3>
          <ArrowUpRight
            size={18}
            aria-hidden="true"
            className="mt-0.5 shrink-0 text-[var(--color-muted-light)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
          />
        </div>
        <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">{project.short}</p>
        <ul className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </div>
      <span className="sr-only">Open case study</span>
    </button>
  );
}

/** Projects without a screenshot: one compact row each, headline number on the right. */
function MoreProjects({ items, onOpen }: { items: Project[]; onOpen: (p: Project) => void }) {
  return (
    <div className="panel h-full p-4 sm:p-5">
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-light)]">
        More projects
      </h3>
      <ul className="mt-3 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
        {items.map((p) => (
          <li key={p.title}>
            <button
              type="button"
              onClick={() => onOpen(p)}
              aria-haspopup="dialog"
              className="group flex w-full items-center gap-4 py-4 text-left"
            >
              <span className="min-w-0 flex-1">
                <span className="text-display block text-base group-hover:text-[var(--accent)]">{p.title}</span>
                <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-[var(--color-muted)]">
                  {p.short}
                </span>
                <span className="mt-2 block text-[11px] text-[var(--color-muted-light)]">{p.tags.join(" · ")}</span>
              </span>
              <span className="hidden shrink-0 text-right sm:block">
                <span className="block text-base font-bold text-[var(--accent)]">{p.stats[0].value}</span>
                <span className="block text-[10px] font-semibold uppercase tracking-wider text-[var(--color-muted-light)]">
                  {p.stats[0].label}
                </span>
              </span>
              <ChevronRight
                size={18}
                aria-hidden="true"
                className="shrink-0 text-[var(--color-muted-light)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
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
        className="panel relative max-h-[90svh] w-full max-w-2xl overflow-y-auto border-t-[3px] !border-t-[var(--accent)] p-5 sm:p-7"
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 16, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-[4px] border border-[var(--color-border-strong)] bg-[var(--bg-alt)] text-[var(--color-text)] hover:border-[var(--color-text)]"
          aria-label="Close case study"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <p className="chapter-eyebrow mb-2">{project.year}</p>
        <h2 id="project-modal-title" className="text-display mb-4 pr-12 text-2xl text-[var(--color-text)]">
          {project.title}
        </h2>
        {project.image && <BrowserShot project={project} className="mb-5" />}
        <p className="mb-6 text-sm leading-relaxed text-[var(--color-muted)]">{project.details}</p>

        <div className="mb-5">
          <Stats stats={project.stats} />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <Code2 size={13} aria-hidden="true" />
              Open project
              <span className="sr-only">(opens in a new tab)</span>
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
  // Projects with a screenshot lead; the rest drop to a compact list. Add an image to promote one.
  const shown = projects.filter((p) => p.image && p.live);
  const listed = projects.filter((p) => !(p.image && p.live));
  const [featured, ...gallery] = shown;
  // The list fills the empty slot next to an odd gallery card, otherwise it gets its own row
  const listSpan = gallery.length % 2 === 0 ? "md:col-span-2" : "";

  return (
    <section id="projects" className="chapter tone-blue">
      <div className="container-site">
        <ChapterHeading
          index="02"
          path="projects"
          title="Selected Projects"
          intro="A selection of 2026 work, from a 24-hour hackathon MVP to a membership platform with 300+ registrations. Open one for the full case."
        />

        {featured && (
          <Reveal y={16}>
            <Featured project={featured} onOpen={() => setOpenProject(featured)} />
          </Reveal>
        )}

        <ul className={`grid gap-4 md:grid-cols-2 lg:gap-5 ${featured ? "mt-4 lg:mt-5" : ""}`}>
          {gallery.map((project, i) => (
            <li key={project.title}>
              <Reveal delay={i * 0.05} y={16} className="h-full">
                <ProjectCard project={project} onOpen={() => setOpenProject(project)} />
              </Reveal>
            </li>
          ))}
          {listed.length > 0 && (
            <li className={listSpan}>
              <Reveal delay={gallery.length * 0.05} y={16} className="h-full">
                <MoreProjects items={listed} onOpen={setOpenProject} />
              </Reveal>
            </li>
          )}
        </ul>
      </div>
      <AnimatePresence>
        {openProject && <ProjectModal key={openProject.title} project={openProject} onClose={close} />}
      </AnimatePresence>
    </section>
  );
}
