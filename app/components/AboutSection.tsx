"use client";

import Reveal from "./Reveal";
import { Code, Ruler, Users } from "lucide-react";

const cards = [
  {
    icon: Code,
    label: "What I Do",
    title: "Cloud engineering with a product mindset",
    body: "I work across AWS infrastructure, deployment pipelines, and developer tooling. Systems that are simple to operate and strong enough to scale with the team.",
  },
  {
    icon: Ruler,
    label: "How I Work",
    title: "Structured, practical, calm under load",
    body: "Reliability, cost, and usability together. Clean handoffs, readable Terraform, dashboards that help during incidents.",
  },
  {
    icon: Users,
    label: "What I Value",
    title: "Clear handoffs and maintainable systems",
    body: "Improvements that remove friction without ceremony. Good documentation, clear runbooks, and pipelines engineers trust.",
  },
];

const skills = [
  "AWS", "Terraform", "Kubernetes", "CI/CD",
  "Observability", "Linux", "GitHub Actions", "Docker", "Python", "Automation",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="prompt-tag mb-3">About</p>
            <h2 className="text-pixel-header">
              About Me
            </h2>
            <p className="mt-4 max-w-[520px] text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
              Cloud engineer who builds infrastructure that stays out of the way
              — reliable, observable, and boring in all the right ways.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-[var(--color-border)]">
          {cards.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.06}>
              <div className="py-4 md:py-6 border-b border-[var(--color-border)] last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="hidden md:flex items-center justify-center w-10 h-10 shrink-0 border border-[var(--color-border)] bg-[var(--bg-alt)] group-hover/card:border-[var(--green)]/40 transition-colors">
                    <card.icon size={16} className="text-[var(--color-text)] group-hover/card:text-[var(--green)] transition-colors" />
                  </div>
                    <div className="flex-1 min-w-0 group/card">
                    <span className="monokai block mb-1.5 group-hover/card:text-[var(--green)] transition-colors">{card.label}</span>
                    <h3 className="text-lg md:text-xl font-bold text-[var(--color-text)] mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-muted)] max-w-[600px]">
                      {card.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-6">
            <span className="monokai block mb-3">Skills &amp; Tools</span>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                    className="px-3 py-1.5 text-[11px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)] bg-[var(--bg-alt)] hover:border-[var(--green)]/40 hover:text-[var(--green)] transition-colors cursor-default"
                  >
                    {skill}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
