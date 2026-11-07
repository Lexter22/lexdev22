"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";

const education = {
  institution: "Polytechnic University of the Philippines – Biñan Campus",
  location: "Biñan, Laguna",
  program: "BS Information Technology",
  year: "2023 – Present",
};

/**
 * Certifications, newest first. The list stays compact no matter how many you
 * add: only the first VISIBLE_CERTS show, with a toggle to reveal the rest.
 */
const certifications: { title: string; issuer: string; year: string }[] = [
  { title: "Foundational C# with Microsoft", issuer: "freeCodeCamp", year: "Nov 2025" },
  { title: "SQL Associate", issuer: "DataCamp", year: "Jun 2025" },
];

const VISIBLE_CERTS = 4;

const skillGroups = [
  { label: "Cloud & infra", items: ["AWS", "Azure", "Terraform", "Kubernetes", "Docker", "Linux"] },
  { label: "Delivery", items: ["Git", "GitHub", "GitHub Actions", "CI/CD", "Azure DevOps", "Observability", "Automation"] },
  {
    label: "Backend & data",
    items: ["Python", "C#", "ASP.NET Core", "FastAPI", "Supabase", "PostgreSQL", "SQL"],
  },
  { label: "Frontend", items: ["React", "TypeScript"] },
  { label: "Community", items: ["Public speaking"] },
];

export default function EducationSection() {
  const [showAllCerts, setShowAllCerts] = useState(false);
  const hiddenCount = certifications.length - VISIBLE_CERTS;
  const visibleCerts = showAllCerts ? certifications : certifications.slice(0, VISIBLE_CERTS);

  return (
    <section id="education" className="chapter tone-violet">
      <div className="container-site">
        <ChapterHeading index="05" path="education" title="Education & Skills" />

        <div className="grid gap-4 lg:grid-cols-2">
          <Reveal className="panel p-5 sm:p-6">
            <h3 className="monokai mb-4 !text-[11px] !text-[var(--color-muted-light)]">Education</h3>
            <p className="mb-1 text-[12px] font-semibold text-[var(--tone)]">{education.year}</p>
            <p className="text-display text-xl">{education.program}</p>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {education.institution}, {education.location}
            </p>

            <div className="mb-1 mt-7 flex items-baseline justify-between gap-3">
              <h3 className="monokai !text-[11px] !text-[var(--color-muted-light)]">Certifications</h3>
              <span className="text-[11px] tabular-nums text-[var(--color-muted-light)]">{certifications.length}</span>
            </div>
            <ul className="divide-y divide-[var(--color-border)]">
              {visibleCerts.map((cert) => (
                <li key={cert.title} className="flex items-baseline justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{cert.title}</p>
                    <p className="text-[12px] text-[var(--color-muted-light)]">{cert.issuer}</p>
                  </div>
                  <span className="shrink-0 text-[12px] font-semibold text-[var(--tone)]">{cert.year}</span>
                </li>
              ))}
            </ul>
            {hiddenCount > 0 && (
              <button
                type="button"
                onClick={() => setShowAllCerts((v) => !v)}
                aria-expanded={showAllCerts}
                className="mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold text-[var(--tone)] hover:underline"
              >
                {showAllCerts ? "Show less" : `Show ${hiddenCount} more`}
                <ChevronDown
                  size={14}
                  aria-hidden="true"
                  className={`transition-transform ${showAllCerts ? "rotate-180" : ""}`}
                />
              </button>
            )}
          </Reveal>

          <Reveal delay={0.08} className="panel p-5 sm:p-6">
            <h3 className="monokai mb-4 !text-[11px] !text-[var(--color-muted-light)]">Skills</h3>
            <dl className="divide-y divide-[var(--color-border)]">
              {skillGroups.map((g) => (
                <div key={g.label} className="grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
                  <dt className="flex items-center gap-2 text-[12px] font-semibold text-[var(--color-text)]">
                    <span aria-hidden="true" className="h-2 w-2 bg-[var(--tone)]" />
                    {g.label}
                  </dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <li key={s} className="tag !text-[12px]">{s}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
