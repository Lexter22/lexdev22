"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronRight, X } from "lucide-react";
import ChapterHeading from "./ChapterHeading";
import ScrollGallery from "./ScrollGallery";
import { useReduced } from "./scroll";

/**
 * Projects, newest or most important first.
 * - `categories` drive the filter chips; a new category shows up as a chip automatically.
 * - Projects with an `image` get a screenshot card; the rest go in the compact list.
 * They sit in a swipeable row; tapping a project opens its case study.
 */
const projects = [
  {
    title: "AWS SCD South Website",
    year: "2026",
    categories: ["Web", "QA & Testing"],
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
    title: "Articulately",
    year: "2026",
    categories: ["Mobile"],
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
    categories: ["Web", "Backend & Cloud", "QA & Testing"],
    short:
      "Academic scheduling system for 94 faculty, 84 sections, and 283 subjects, containerized and deployed to Render.",
    stats: [
      { label: "Faculty", value: "94" },
      { label: "Sections", value: "84" },
      { label: "Subjects", value: "283" },
    ],
    tags: ["Laravel", "Livewire", "PostgreSQL", "Docker", "Playwright", "Selenium"],
    live: null,
    image: "/projects/intellisched.jpg",
    imageAlt: "IntelliSched sign-in page for PUP Biñan, with the system name and a Welcome Back login form",
    details: [
      "Managed the PostgreSQL schema (16 tables, 42 migrations) and the seeders that load 10 program curricula from CSV, supporting 94 faculty, 84 sections and 283 subjects.",
      "Built and optimized Laravel and Livewire backend services. I removed a database write and up to two extra queries per schedule row from the Course Offering render path, and trimmed unused eager loads on the professor query.",
      "Containerized the app with Docker (nginx, php-fpm) and deployed it to Render with managed PostgreSQL. I added a GitHub Actions CI pipeline and a 16-item deployment readiness checklist for client handover.",
      "Fixed production failures, including blank pages on 578 KB responses (nginx FastCGI temp-directory permissions, resolved with directory ownership and 1 MB response buffers) and PDF export 502s (PHP memory raised from 256 MB to 512 MB).",
      "Automated QA with Selenium and Playwright, covering authentication, session, professor-management and faculty-availability flows. Load-tested the live site: 50 concurrent users loaded the availability form with zero errors, and 50 concurrent submissions caused no deadlocks or data loss.",
    ],
  },
  {
    title: "InterVueAI",
    year: "2026",
    categories: ["AI", "Hackathon"],
    short: "AI interview MVP built in 24 hours; Top 10 out of 23 teams at AWS Cloud Club Philippines Innovation Cup.",
    stats: [
      { label: "Placement", value: "Top 10" },
      { label: "Teams", value: "23" },
      { label: "Build time", value: "24 hrs" },
    ],
    tags: ["Supabase", "Agora", "Grok AI"],
    live: null,
    image: "/projects/intervueai.jpg",
    imageAlt: "InterVueAI home page: Build your AI HR Interviewer with Agora real-time voice, with an AI interview call preview and an application form",
    details:
      "Built an AI interview MVP in 24 hours using Supabase, Agora, and Grok AI to automate simulated interviews and candidate feedback. Placed in the Top 10 out of 23 teams at the AWS Cloud Club Philippines Innovation Cup, held in collaboration with Agora.",
  },
  {
    title: "MemberFlow",
    year: "2026",
    categories: ["Web", "Backend & Cloud"],
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
];

type Project = (typeof projects)[number];

const ALL = "All";

const host = (url: string) => new URL(url).host;

/** Chips in order of how many projects use them, so the biggest groups come first. */
const categories = (() => {
  const count = new Map<string, number>();
  for (const p of projects) for (const c of p.categories) count.set(c, (count.get(c) ?? 0) + 1);
  return [...count.entries()].sort((a, b) => b[1] - a[1]);
})();

/** Screenshot in a browser frame whose address bar shows the real URL. */
function BrowserShot({ project }: { project: Project }) {
  return (
    <div className="overflow-hidden rounded-[6px] border border-[var(--color-border-strong)] bg-[var(--bg)]">
      <div className="flex h-6 items-center gap-1.5 border-b border-[var(--color-border)] px-3">
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-strong)]" />
        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-border-strong)]" />
        <span className="ml-1.5 truncate text-[10px] text-[var(--color-muted-light)]">
          {project.live ? host(project.live) : project.title.toLowerCase()}
        </span>
      </div>
      <img
        src={project.image!}
        alt={project.imageAlt}
        width={1440}
        height={900}
        loading="lazy"
        className="aspect-[16/10] w-full object-cover object-top"
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

/** Screenshot card. The whole card opens the write-up; the live link sits above that layer. */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <article className="panel panel-hover group relative flex h-full flex-col p-3 sm:p-4">
      <BrowserShot project={project} />
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <p className="label !text-[10px]">{project.categories.join(" · ")}</p>
        <h3 className="mt-2">
          <button
            type="button"
            onClick={onOpen}
            aria-haspopup="dialog"
            className="text-display text-left text-lg after:absolute after:inset-0 after:rounded-[8px] after:content-[''] group-hover:text-[var(--accent)]"
          >
            {project.title}
          </button>
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--color-muted)]">{project.short}</p>
        <div className="mt-auto flex min-h-11 items-center justify-between gap-3 pt-4 text-[12px] font-semibold">
          <span className="inline-flex items-center gap-1 text-[var(--color-muted-light)] group-hover:text-[var(--color-text)]">
            See more
            <ChevronRight size={14} aria-hidden="true" />
          </span>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex min-h-11 items-center gap-1 px-1 text-[var(--accent)] hover:underline"
            >
              Live site
              <ArrowUpRight size={14} aria-hidden="true" />
              <span className="sr-only">: {host(project.live)} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

/** One row per project without a screenshot. */
function ProjectRow({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button type="button" onClick={onOpen} aria-haspopup="dialog" className="group flex w-full items-center gap-4 py-4 text-left">
      <span className="min-w-0 flex-1">
        <span className="label block !text-[10px]">{project.categories.join(" · ")}</span>
        <span className="text-display mt-1.5 block text-base group-hover:text-[var(--accent)]">{project.title}</span>
        <span className="mt-1 block text-sm leading-relaxed text-[var(--color-muted)]">{project.short}</span>
      </span>
      <span className="hidden shrink-0 text-right sm:block">
        <span className="block text-base font-bold text-[var(--accent)]">{project.stats[0].value}</span>
        <span className="label block !text-[10px]">{project.stats[0].label}</span>
      </span>
      <ChevronRight
        size={18}
        aria-hidden="true"
        className="shrink-0 text-[var(--color-muted-light)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
      />
    </button>
  );
}

/** The full write-up: every bullet, the stack, and the live site. */
function ProjectDialog({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduce = useReduced();

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#0b131b]/85 p-6"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        className="panel relative max-h-[92svh] w-full max-w-2xl overflow-y-auto rounded-[8px] p-6 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
        onClick={(e) => e.stopPropagation()}
        initial={reduce ? false : { y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          onClick={onClose}
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-[4px] border border-[var(--color-border-strong)] bg-[var(--bg-alt)] text-[var(--color-text)] hover:border-[var(--color-text)]"
          aria-label="Close details"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <p className="label mb-2">{project.year}</p>
        <h3 id="project-dialog-title" className="text-display pr-12 text-2xl">
          {project.title}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-[var(--color-text)]">{project.short}</p>
        {project.image && (
          <div className="mt-5">
            <BrowserShot project={project} />
          </div>
        )}

        <div className="mt-6">
          {Array.isArray(project.details) ? (
            <ul className="list-disc space-y-3 pl-5 text-sm leading-relaxed text-[var(--color-muted)] marker:text-[var(--accent)]">
              {project.details.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">{project.details}</p>
          )}
        </div>

        <div className="mt-6">
          <Stats stats={project.stats} />
        </div>

        <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Built with">
          {project.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>

        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-7 w-full sm:w-auto">
            Visit live site
            <ArrowUpRight size={14} aria-hidden="true" />
            <span className="sr-only">: {host(project.live)} (opens in a new tab)</span>
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

/** Horizontal swipe row: native scrolling with snap points, plus previous/next buttons.
 * The parent keys it by filter, so changing the filter starts again at the first card. */
function ProjectCarousel({ items, onOpen }: { items: Project[]; onOpen: (p: Project) => void }) {
  const track = useRef<HTMLUListElement>(null);
  const [index, setIndex] = useState(0);
  const reduce = useReduced();
  const n = items.length;


  const cards = () => [...(track.current?.querySelectorAll<HTMLElement>(":scope > [data-card]") ?? [])];

  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const left = el.scrollLeft + parseFloat(getComputedStyle(el).paddingLeft);
    const list = cards();
    const i = list.findIndex((c) => c.offsetLeft + c.offsetWidth / 2 > left);
    setIndex(Math.max(0, i));
  };

  const goTo = (i: number) => {
    const el = track.current;
    const card = cards()[i];
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - parseFloat(getComputedStyle(el).paddingLeft), behavior: reduce ? "auto" : "smooth" });
  };

  const pad = (v: number) => String(v).padStart(2, "0");
  const atEnd = index >= n - 1;

  return (
    <div>
      <ul
        ref={track}
        onScroll={onScroll}
        aria-label="Projects, swipe or use the arrows for more"
        className="relative -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-4 px-4 pb-2 [scrollbar-width:none] md:-mx-6 md:scroll-px-6 md:px-6 lg:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p) => (
          <li key={p.title} data-card className="w-[84%] shrink-0 snap-start sm:w-[58%] lg:w-[40%]">
            <ProjectCard project={p} onOpen={() => onOpen(p)} />
          </li>
        ))}
        {/* Room after the last card, so every card (the last one too) can reach the left edge */}
        <li aria-hidden="true" className="w-[calc(16%-2rem)] shrink-0 sm:w-[calc(42%-2rem)] lg:w-[calc(60%-2.5rem)]" />
      </ul>

      {n > 1 && (
        <div className="mt-5 flex items-center justify-between gap-4">
          {/* One pill per project; the current one is longer and blue. Tap to jump. */}
          <div className="flex items-center gap-3">
            <ol className="flex items-center">
              {items.map((p, i) => {
                const on = i === index;
                return (
                  <li key={p.title}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={`Show project ${i + 1} of ${n}: ${p.title}`}
                      aria-current={on ? "true" : undefined}
                      className="group flex h-11 min-w-6 items-center justify-center px-1"
                    >
                      <span
                        className={`block h-1.5 rounded-full transition-all duration-300 ${
                          on ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-[var(--color-border-strong)] group-hover:bg-[var(--sky)]"
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ol>
            <p className="text-[12px] font-semibold tabular-nums" aria-live="polite">
              <span className="text-[var(--color-text)]">{pad(index + 1)}</span>
              <span className="text-[var(--color-muted-light)]"> / {pad(n)}</span>
              <span className="sr-only"> projects</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              disabled={index === 0}
              aria-label="Previous project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              disabled={atEnd}
              aria-label="Next project"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowRight size={16} aria-hidden="true" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Chapter 01, Build. */
export default function ProjectsSection() {
  const [filter, setFilter] = useState(ALL);
  const [open, setOpen] = useState<Project | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const reduce = useReduced();

  const shown = filter === ALL ? projects : projects.filter((p) => p.categories.includes(filter));
  const withImage = shown.filter((p) => p.image);
  const withoutImage = shown.filter((p) => !p.image);
  const chips: [string, number][] = [[ALL, projects.length], ...categories];

  // Filter chips. Scroll sideways on small screens rather than wrapping into rows.
  const filters = (
          <div
            role="group"
            aria-label="Filter projects by type"
            className="-mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] md:mx-0 md:flex-wrap md:px-0 [&::-webkit-scrollbar]:hidden"
          >
            {chips.map(([c, n]) => {
              const on = c === filter;
              return (
                <button
                    key={c}
                    type="button"
                    onClick={() => setFilter(c)}
                    aria-pressed={on}
                    className={`inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full border px-4 text-[12px] font-semibold ${
                      on
                        ? "border-[var(--accent)] bg-[var(--accent)] text-[var(--on-accent)]"
                        : "border-[var(--color-border-strong)] text-[var(--color-muted)] hover:border-[var(--color-text)] hover:text-[var(--color-text)]"
                    }`}
                >
                    {c}
                    <span className={`tabular-nums ${on ? "opacity-70" : "text-[var(--color-muted-light)]"}`}>{n}</span>
                </button>
              );
            })}
          </div>
  );

  return (
    <section id="projects" className="chapter">
      <div className="container-site">
        <ChapterHeading id="projects" title="Selected projects" intro="Swipe through my work and open any project for the case study." />

        <p className="sr-only" aria-live="polite">
          Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        </p>

        {/* Scroll-driven row; a plain swipe row when the visitor prefers reduced motion */}
        {withImage.length > 0 && !reduce && (
          <ScrollGallery
            key={filter}
            items={withImage}
            noun="project"
            getKey={(p) => p.title}
            getName={(p) => p.title}
            before={filters}
            render={(p) => <ProjectCard project={p} onOpen={() => setOpen(p)} />}
          />
        )}
        {(reduce || withImage.length === 0) && filters}
        {withImage.length > 0 && reduce && <ProjectCarousel key={filter} items={withImage} onOpen={setOpen} />}

        {withoutImage.length > 0 && (
          <ul className={`divide-y divide-[var(--color-border)] border-y border-[var(--color-border)] ${withImage.length ? "mt-6" : ""}`}>
            {withoutImage.map((p) => (
              <li key={p.title}>
                <ProjectRow project={p} onOpen={() => setOpen(p)} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <AnimatePresence>{open && <ProjectDialog key={open.title} project={open} onClose={close} />}</AnimatePresence>
    </section>
  );
}
