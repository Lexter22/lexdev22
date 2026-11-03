"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const roles = [
  {
    company: "Dewise Solutions Philippines",
    role: "Junior Software Engineer",
    year: "Dec 2025 - Apr 2026",
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
    year: "Nov 2025 - Mar 2026",
    location: "Remote",
    bullets: [
      "Designed the Business Requirements Document (BRD) and translated requirements into the website's backend architecture and Supabase database schema, designed to organize 360+ startup profiles and 500+ podcast episodes.",
      "Developed the API functions powering the startup directory, supporting an organization with 18,000+ community members.",
    ],
  },
  {
    company: "AWS Cloud Club PUP Manila",
    role: "Backend Developer",
    year: "Oct 2025 - Jan 2026",
    location: "Remote",
    bullets: [
      "Built a React and FastAPI recruitment dashboard; automated Supabase ingestion for 200+ applicants across 7 departments, with REST API filtering and Recharts analytics.",
    ],
  },
];

const leadership = {
  company: "AWS Student Builder Group - PUP Biñan",
  role: "Founder and Chapter Lead 26-27",
  year: "Nov 2025 - Present",
  location: "Biñan, Laguna",
  bullets: [
    "Founded and led a 300-member campus chapter within AWS's global student program; earned AWS Cloud Clubs Gold Captain recognition.",
    "Organized 1 workshop and 1 seminar; served as the main speaker for Cloud 101: Introduction to AWS at a chapter event attended by 100 participants.",
  ],
};

const education = {
  institution: "Polytechnic University of the Philippines - Biñan Campus",
  location: "Biñan, Laguna",
  program: "Bachelor of Science in Information Technology",
  year: "2023 - Present",
};

const skills = [
  "AWS", "Terraform", "Kubernetes", "CI/CD",
  "Observability", "Linux", "GitHub Actions", "Docker", "Python", "Automation",
  "Public Speaking", "Progressive Overload", "Consistency",
];

const certifications = [
  { title: "Foundational C# with Microsoft", issuer: "freeCodeCamp", year: "Nov 2025" },
  { title: "SQL Associate", issuer: "DataCamp", year: "Jun 2025" },
];

const technicalSpeaking = [
  {
    title: "Getting Hands-on with AWS Console",
    event: "Asia Pacific Colleges",
    image: "/apc1.jpg",
    detail: "Taught tips and tricks for using the AWS Console, especially cost management and checking open resources with Amazon Q.",
  },
  {
    title: "Spec Driven Development with Amazon Kiro",
    event: "AWS Student Builder Group - UPHSL",
    image: "/uphsl1.jpg",
    detail: "Broke down and explained Spec Driven Development, then served as mentor and judge for the projects attendees built during the workshop.",
  },
];

export default function ExperienceSection() {
  const [showAllSkills, setShowAllSkills] = useState(false);

  return (
    <section id="experience" className="py-8 sm:py-10 md:py-14">
      <div className="container-site">
        <Reveal>
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-pixel-header text-wrap balance">Experience</h2>
          </div>
        </Reveal>

        {/* Professional Experience */}
        <Reveal delay={0.04} variant="fade-up">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="space-y-8">
              {roles.map((job) => (
                <article
                  key={job.company}
                  className="border border-[var(--color-border)] bg-[var(--bg-alt)] rounded-sm p-6 sm:p-8 hover:border-[var(--color-accent)]/40 transition-colors duration-500"
                >
                  <div className="flex flex-col gap-2 mb-4">
                    <div className="flex flex-col gap-1">
                      <p className="text-[11px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                        {job.company}
                      </p>
                      <h3 className="text-lg md:text-xl text-[var(--color-text)] text-pixel-header">
                        {job.role}
                      </h3>
                      <p className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold text-[var(--color-text)]">
                        {job.year}
                      </p>
                      <p className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-muted-light)]">
                        {job.location}
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-3 text-sm sm:text-base leading-relaxed text-[var(--color-muted)] list-disc pl-6">
                    {job.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Leadership */}
        <Reveal delay={0.08}>
          <div className="mb-8 sm:mb-10 md:mb-12 border-y border-[var(--color-border)] py-6 sm:py-8 md:py-10">
            <div className="flex flex-col gap-4 mb-6">
              <div>
                <h3 className="text-xl md:text-2xl text-[var(--color-accent)] text-pixel-header">
                  {leadership.role}
                </h3>
                <p className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold text-[var(--color-text)]">
                  {leadership.year}
                </p>
                <p className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-muted-light)]">
                  {leadership.location}
                </p>
              </div>
            </div>
            <p className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-muted-light)] mb-6">
              {leadership.company}
            </p>
            <ul className="space-y-3 text-sm sm:text-base leading-relaxed text-[var(--color-muted)] list-disc pl-6">
              {leadership.bullets.map((bullet, i) => (
                <li key={i}>{bullet}</li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* Education */}
        <Reveal delay={0.12}>
          <div className="mb-8 sm:mb-10 md:mb-12">
            <article className="border border-[var(--color-border)] bg-[var(--bg-alt)] rounded-sm p-6 sm:p-8">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl md:text-2xl text-[var(--color-accent)] text-pixel-header">
                    {education.program}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-muted)]">
                    {education.institution} - {education.location}
                  </p>
                  <p className="mt-2 text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold text-[var(--color-accent)]">
                    {education.year}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </Reveal>

        {/* Skills */}
        <Reveal delay={0.14}>
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {skills.map((skill, i) => (
                <span
                  key={skill}
                  className={`px-3 py-2 sm:px-4 sm:py-2.5 text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)] bg-[var(--bg-alt)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors cursor-default ${!showAllSkills && i >= 3 ? 'hidden md:block' : ''}`}
                >
                  {skill}
                </span>
              ))}
            </div>
            {skills.length > 3 && (
              <button
                onClick={() => setShowAllSkills(!showAllSkills)}
                className="md:hidden mt-3 inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold text-[var(--color-accent)] hover:text-[var(--color-text)] transition-colors"
              >
                {showAllSkills ? "Show less" : `Show all ${skills.length} skills`}
              </button>
            )}
          </div>
        </Reveal>

        {/* Certifications */}
        <Reveal delay={0.14}>
          <div className="mb-8 sm:mb-10 md:mb-12 space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.title}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 sm:pb-6 border-b border-[var(--color-border)] last:border-b-0"
              >
                <div>
                  <h3 className="text-sm text-[var(--color-accent)] text-pixel-header mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-[11px] sm:text-[12px] leading-relaxed text-[var(--color-muted-light)]">
                    {cert.issuer}
                  </p>
                </div>
                <span className="text-[11px] sm:text-[12px] font-[family-name:var(--font-mono)] font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                  {cert.year}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Technical Speaking */}
        <Reveal delay={0.16}>
          <div className="mb-8 sm:mb-10 md:mb-12 border-y border-[var(--color-border)] py-6 sm:py-8 md:py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {technicalSpeaking.map((talk, i) => (
                <article
                  key={talk.title}
                  className="border border-[var(--color-border)] bg-[var(--bg-alt)] rounded-sm overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <img
                      src={talk.image}
                      alt={talk.title}
                      width={600}
                      height={300}
                      className="w-full h-full object-cover brightness-[0.85] group-hover:brightness-[1] transition duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm text-[var(--color-accent)] text-pixel-header mb-2">
                      {talk.title}
                    </h3>
                    <p className="text-[11px] font-[family-name:var(--font-mono)] uppercase tracking-wider text-[var(--color-accent)] mb-1">
                      {talk.event}
                    </p>
                    <p className="text-[11px] leading-relaxed text-[var(--color-muted)]">
                      {talk.detail}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
