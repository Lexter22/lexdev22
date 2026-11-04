"use client";

import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";

const education = {
  institution: "Polytechnic University of the Philippines – Biñan Campus",
  location: "Biñan, Laguna",
  program: "BS Information Technology",
  year: "2023 – Present",
};

const certifications = [
  { title: "Foundational C# with Microsoft", issuer: "freeCodeCamp", year: "Nov 2025" },
  { title: "SQL Associate", issuer: "DataCamp", year: "Jun 2025" },
];

const skillGroups = [
  { label: "Cloud & infra", tone: "tone-amber", items: ["AWS", "Azure", "Terraform", "Kubernetes", "Docker", "Linux"] },
  { label: "Delivery", tone: "tone-green", items: ["CI/CD", "GitHub Actions", "Azure DevOps", "Observability", "Automation"] },
  {
    label: "Backend & data",
    tone: "tone-blue",
    items: ["Python", "C#", "ASP.NET Core", "FastAPI", "Supabase", "PostgreSQL", "SQL"],
  },
  { label: "Frontend", tone: "tone-pink", items: ["React", "TypeScript"] },
  { label: "Community", tone: "tone-violet", items: ["Public speaking"] },
];

export default function EducationSection() {
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

            <h3 className="monokai mb-1 mt-7 !text-[11px] !text-[var(--color-muted-light)]">Certifications</h3>
            <ul className="divide-y divide-[var(--color-border)]">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex items-baseline justify-between gap-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-[var(--color-text)]">{cert.title}</p>
                    <p className="text-[12px] text-[var(--color-muted-light)]">{cert.issuer}</p>
                  </div>
                  <span className="shrink-0 text-[12px] font-semibold text-[var(--tone)]">{cert.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.08} className="panel p-5 sm:p-6">
            <h3 className="monokai mb-4 !text-[11px] !text-[var(--color-muted-light)]">Skills</h3>
            <dl className="divide-y divide-[var(--color-border)]">
              {skillGroups.map((g) => (
                <div key={g.label} className={`${g.tone} grid gap-2 py-3 first:pt-0 last:pb-0 sm:grid-cols-[8.5rem_1fr] sm:gap-4`}>
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
