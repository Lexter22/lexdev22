import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";

const education = {
  institution: "Polytechnic University of the Philippines – Biñan Campus",
  location: "Biñan, Laguna",
  program: "BS Information Technology",
  year: "2023 – Present",
};

/** Certifications, newest first. */
const certifications: { title: string; issuer: string; year: string }[] = [
  { title: "Foundational C# with Microsoft", issuer: "freeCodeCamp", year: "Nov 2025" },
  { title: "SQL Associate", issuer: "DataCamp", year: "Jun 2025" },
];

/** Only tools used in the roles and projects above. */
const skillGroups = [
  { label: "Cloud & Infrastructure", items: ["AWS", "AWS Lambda", "Azure", "Terraform", "Kubernetes", "Docker", "Linux"] },
  {
    label: "Backend & Databases",
    items: ["Python", "C#", "ASP.NET Core", "FastAPI", "Laravel", "Supabase", "PostgreSQL", "SQL"],
  },
  { label: "Frontend Development", items: ["React", "TypeScript", "Livewire", "Flutter"] },
  { label: "AI & Machine Learning", items: ["Grok AI", "LLM prompting", "AI agents"] },
  { label: "Software Engineering & Quality", items: ["Playwright", "Selenium", "Load testing", "Automation"] },
  { label: "Tools & DevOps", items: ["Git", "GitHub", "GitHub Actions", "CI/CD", "Azure DevOps", "Observability"] },
];

/** Chapter 02, Education & Skills: degree, certifications and tools, kept compact. */
export default function EducationSection() {
  return (
    <section id="education" className="chapter">
      <div className="container-site">
        <ChapterHeading id="education" title="Education & skills" />

        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          <Reveal y={12} className="panel p-6 sm:p-8 lg:col-span-5">
            <h3 className="label mb-4">Education</h3>
            <p className="text-display text-xl">{education.program}</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--color-muted)]">
              {education.institution}, {education.location}
            </p>
            <p className="mt-2 text-[12px] font-semibold text-[var(--accent)]">{education.year}</p>

            <h3 className="label mb-1 mt-8 border-t border-[var(--color-border)] pt-8">Certifications</h3>
            <ul className="divide-y divide-[var(--color-border)]">
              {certifications.map((cert) => (
                <li key={cert.title} className="flex items-baseline justify-between gap-4 py-3">
                  <span>
                    <span className="block text-sm font-semibold text-[var(--color-text)]">{cert.title}</span>
                    <span className="block text-[12px] text-[var(--color-muted-light)]">{cert.issuer}</span>
                  </span>
                  <span className="shrink-0 text-[12px] text-[var(--color-muted-light)]">{cert.year}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal y={12} delay={0.06} className="panel p-6 sm:p-8 lg:col-span-7">
            <h3 className="label mb-1">Skills</h3>
            <dl className="divide-y divide-[var(--color-border)]">
              {skillGroups.map((g) => (
                <div key={g.label} className="grid gap-2 py-4 last:pb-0 sm:grid-cols-[13rem_1fr] sm:gap-6">
                  <dt className="pt-1 text-[13px] font-semibold text-[var(--color-text)]">{g.label}</dt>
                  <dd>
                    <ul className="flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <li key={s} className="tag !text-[12px]">
                          {s}
                        </li>
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
