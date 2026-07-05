"use client";

import Reveal from "./Reveal";
import { Cloud, GitBranch, BarChart3, ExternalLink, Code2 } from "lucide-react";

const projects = [
  {
    icon: Cloud,
    title: "AWS Account Foundation",
    body: "Multi-account AWS organization with centralized logging, networking, and IAM baselines. Terraform modules for repeatable environment provisioning.",
    tags: ["AWS", "Terraform", "IAM"],
    links: {
      github: "https://github.com/Lexter22/aws-foundation",
      live: null,
    },
  },
  {
    icon: GitBranch,
    title: "CI/CD Pipeline Suite",
    body: "GitHub Actions workflows for testing, building, and deploying infrastructure and applications. Consistent across staging and production environments.",
    tags: ["GitHub Actions", "CI/CD", "Docker"],
    links: {
      github: "https://github.com/Lexter22/cicd-pipelines",
      live: null,
    },
  },
  {
    icon: BarChart3,
    title: "Observability Stack",
    body: "Metrics, logs, and alerting pipeline for Kubernetes workloads. Dashboards that reduce time-to-detection and runbooks for common failure modes.",
    tags: ["Prometheus", "Grafana", "Kubernetes"],
    links: {
      github: "https://github.com/Lexter22/observability-stack",
      live: null,
    },
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="prompt-tag mb-3">Projects</p>
            <h2 className="text-pixel-header">
              Projects
            </h2>
            <p className="mt-4 max-w-[520px] text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
              Infrastructure and platform work that shaped how teams ship and
              operate.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
          {projects.map((project, i) => (
            <Reveal key={project.title} delay={i * 0.08}>
              <div className="bg-[var(--bg)] p-5 md:p-6 h-full flex flex-col group hover:bg-[var(--bg-alt)] transition-colors duration-300">
                <div className="flex items-center justify-center w-10 h-10 border border-[var(--color-border)] bg-[var(--bg-alt)] mb-4 group-hover:border-[var(--green)]/40 transition-colors">
                  <project.icon size={16} className="text-[var(--color-text)] group-hover:text-[var(--green)] transition-colors" />
                </div>

                <h3 className="text-display text-xl md:text-2xl text-[var(--color-text)] mb-3 group-hover:text-[var(--green)] transition-colors">
                  {project.title}
                </h3>

                <p className="text-sm leading-relaxed text-[var(--color-muted)] flex-1 mb-3">
                  {project.body}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-[10px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[var(--color-border)]">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-wider text-[var(--color-muted)] hover:text-[var(--green)] transition-colors"
                    >
                      <Code2 size={13} />
                      Source
                    </a>
                  )}
                  {project.links.live && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-[12px] font-bold tracking-wider text-[var(--color-muted)] hover:text-[var(--green)] transition-colors"
                    >
                      <ExternalLink size={13} />
                      Live
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
