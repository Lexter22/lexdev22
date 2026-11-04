"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import { useClamped, useReduced } from "./scroll";

const roles = [
  {
    company: "Dewise Solutions Philippines",
    role: "Junior Software Engineer",
    year: "Dec 2025 – Apr 2026",
    location: "Mandaluyong City",
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
    <section id="experience" className="chapter tone-green">
      <div className="container-site">
        <ChapterHeading
          index="03"
          path="experience"
          title="Experience"
          intro="Three teams in one year: enterprise apps on Azure, a startup directory, and a recruitment dashboard."
        />

        <ol ref={list} className="relative">
          {/* Timeline rail draws itself as you read down the list */}
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-[var(--color-border-strong)] md:left-[11rem]" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-[var(--tone)] md:left-[11rem]"
            style={{ scaleY: reduce ? 1 : railScale }}
          />

          {roles.map((job) => (
            <li key={job.company} className="relative pb-10 pl-8 last:pb-0 md:grid md:grid-cols-[11rem_1fr] md:pl-0">
              {/* Marker fills in once the rail reaches it */}
              <span
                aria-hidden="true"
                className="absolute left-[7px] top-1 h-3 w-3 -translate-x-1/2 rotate-45 border border-[var(--tone)] bg-[var(--bg)] md:left-[11rem]"
              >
                <motion.span
                  className="absolute inset-[1px] bg-[var(--tone)]"
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
                <ul className="max-w-[72ch] list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[var(--color-muted)] marker:text-[var(--tone)]">
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
