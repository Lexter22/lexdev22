"use client";

import Reveal from "./Reveal";
import { Megaphone, Ruler, Users, Pin } from "lucide-react";

const cards = [
  {
    icon: Megaphone,
    label: "What I Do",
    title: "Public Speaking",
    body: "Leading workshops, presenting at meetups, and running hands-on labs for the AWS student community. Breaking down infrastructure into clear, practical sessions.",
    caseId: "CASE-001",
    image: "/public-speaking.jpeg",
  },
  {
    icon: Ruler,
    label: "How I Work",
    title: "Show up. Do the work. Track the data.",
    body: "Don't skip reps or runbooks. Reliability, clean handoffs, and dashboards that tell the truth. Consistency compounds across every set.",
    caseId: "CASE-002",
  },
  {
    icon: Users,
    label: "What I Value",
    title: "Clean code, honest reviews, zero drama",
    body: "Teams that trust each other ship faster. Good documentation, clear runbooks, and a code I stick to. The rest is noise.",
    caseId: "CASE-003",
  },
];

const rotations = ["md:rotate-[-0.8deg] md:translate-y-1", "md:rotate-[0.6deg] md:translate-y-[-4px]", "md:rotate-[-0.4deg] md:translate-y-2"];

const skills = [
  "AWS", "Terraform", "Kubernetes", "CI/CD",
  "Observability", "Linux", "GitHub Actions", "Docker", "Python", "Automation",
  "Public Speaking", "Progressive Overload", "Consistency",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> whoami
            </p>
            <h2 className="text-pixel-header">About Me</h2>
          </div>
        </Reveal>

        <div className="relative bg-[var(--bg-alt)] border border-[var(--color-border)] p-4 md:p-8 mb-6">
          <div
            className="absolute inset-0 opacity-[0.015] pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0z' fill='none' stroke='%23f0f0f0' stroke-width='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: "20px 20px",
            }}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {cards.map((card, i) => (
              <Reveal key={card.label} delay={i * 0.06}>
                <div
                  className={`relative bg-[var(--bg)] border border-[var(--color-border)] h-full flex flex-col group transition-all duration-300 ${rotations[i]}`}
                >
                  <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-10">
                    <Pin size={16} className="text-[var(--color-muted-light)] drop-shadow-sm" />
                  </div>

                  {card.image ? (
                    <>
                      <div className="relative w-full aspect-[3/2] overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover brightness-[0.85] contrast-[1.1] group-hover:brightness-100 transition-all duration-500"
                          loading="lazy"
                        />
                        <span className="absolute top-2 left-2 monokai text-[10px] tracking-[0.15em] text-[var(--bg)] bg-[var(--color-accent)] px-2 py-0.5">
                          {card.caseId}
                        </span>
                      </div>
                      <div className="p-4 md:p-5 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                          <card.icon size={13} className="text-[var(--color-accent)] shrink-0" />
                          <span className="monokai text-[10px] group-hover:text-[var(--color-accent)] transition-colors">
                            {card.label}
                          </span>
                        </div>
                        <h3 className="text-display text-lg md:text-xl text-[var(--color-text)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                          {card.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[var(--color-muted)] flex-1">
                          {card.body}
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="p-6 md:p-8 flex-1 flex flex-col items-center text-center">
                      <span className="absolute top-3 left-3 monokai text-[10px] tracking-[0.15em] text-[var(--bg)] bg-[var(--color-accent)] px-2 py-0.5">
                        {card.caseId}
                      </span>
                      <card.icon size={24} className="text-[var(--color-accent)] mb-4 opacity-70 group-hover:opacity-100 transition-opacity duration-300" />
                      <span className="monokai text-[10px] group-hover:text-[var(--color-accent)] transition-colors mb-3">
                        {card.label}
                      </span>
                      <h3 className="text-display text-lg md:text-xl text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                        {card.body}
                      </p>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={0.12}>
          <div className="mt-6">
            <span className="monokai block mb-3">Skills &amp; Tools</span>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-[11px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)] bg-[var(--bg-alt)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors cursor-default"
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
