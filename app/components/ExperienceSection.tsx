"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Plus } from "lucide-react";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import { useClamped, useReduced } from "./scroll";

const roles = [
  {
    company: "Dewise Solutions Philippines",
    role: "Junior Software Engineer",
    year: "Dec 2025 – Apr 2026",
    location: "Mandaluyong City",
    summary: "Azure deployments and C# / ASP.NET Core backend features across 3 applications.",
    bullets: [
      "Contributed to 3 applications, provisioning cloud resources, deploying and monitoring services on Azure App Service, and supporting release pipelines through Azure DevOps.",
      "Developed backend features using C# and ASP.NET Core; assisted with Azure SQL Database schema design and query optimization.",
      "Translated Figma designs into responsive web interfaces using React.",
    ],
  },
  {
    company: "Start Up Network PH",
    role: "Backend Developer",
    year: "Nov 2025 – Mar 2026",
    location: "Remote",
    summary: "Backend architecture and Supabase schema for a startup directory serving an 18,000+ member community.",
    bullets: [
      "Designed the Business Requirements Document (BRD) and translated requirements into the website's backend architecture and Supabase database schema, designed to organize 360+ startup profiles and 500+ podcast episodes.",
      "Developed the API functions powering the startup directory, supporting an organization with 18,000+ community members.",
    ],
  },
  {
    company: "AWS Cloud Club PUP Manila",
    role: "Backend Developer",
    year: "Oct 2025 – Jan 2026",
    location: "Remote",
    summary: "A React and FastAPI recruitment dashboard for 200+ applicants across 7 departments.",
    bullets: [
      "Built a React and FastAPI recruitment dashboard; automated Supabase ingestion for 200+ applicants across 7 departments, with REST API filtering and Recharts analytics.",
    ],
  },
];

export default function ExperienceSection() {
  const reduce = useReduced();
  const list = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 75%", "end 60%"] });
  const railScale = useClamped(scrollYProgress);

  return (
    <section id="experience" className="chapter">
      <div className="container-site">
        <ChapterHeading
          id="experience"
          title="Experience"
          intro="Three overlapping roles between October 2025 and April 2026: enterprise apps on Azure, a startup directory, and a recruitment dashboard."
        />

        <ol ref={list} className="relative">
          {/* Timeline rail draws itself as you read down the list */}
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-[var(--color-border-strong)] md:left-[11rem]" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 -ml-[0.5px] w-0.5 origin-top bg-[var(--accent)] md:left-[11rem]"
            style={{ scaleY: reduce ? 1 : railScale }}
          />

          {roles.map((job) => (
            <li key={job.company} className="relative pb-8 pl-8 last:pb-0 md:grid md:grid-cols-[11rem_1fr] md:pl-0">
              {/* Marker fills in once the rail reaches it */}
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-1 h-3 w-3 -translate-x-1/2 rotate-45 border border-[var(--color-border-strong)] bg-[var(--bg)] md:left-[11rem]"
              >
                <motion.span
                  className="absolute inset-[1px] bg-[var(--accent)]"
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "0px 0px -40% 0px" }}
                  transition={{ duration: 0.3 }}
                />
              </span>
              <Reveal className="mb-2 md:mb-0 md:pr-8 md:text-right">
                <p className="text-[12px] font-semibold text-[var(--color-text)]">{job.year}</p>
                <p className="mt-0.5 text-[11px] uppercase tracking-wider text-[var(--color-muted-light)]">{job.location}</p>
              </Reveal>
              <Reveal delay={0.08} className="md:pl-10">
                <p className="chapter-eyebrow mb-1">{job.company}</p>
                <h3 className="text-display mb-3 text-lg text-[var(--color-text)] md:text-xl">{job.role}</h3>
                <p className="max-w-[64ch] text-sm leading-relaxed text-[var(--color-muted)]">{job.summary}</p>
                <details className="group mt-2">
                  <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 text-[12px] font-semibold text-[var(--accent)] [&::-webkit-details-marker]:hidden">
                    Responsibilities &amp; scope
                    <Plus size={14} aria-hidden="true" className="transition-transform group-open:rotate-45" />
                  </summary>
                  <ul className="mt-2 max-w-[72ch] list-disc space-y-2 pl-5 text-sm leading-relaxed text-[var(--color-muted)] marker:text-[var(--accent)]">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </details>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
