"use client";

import Reveal from "./Reveal";
import { Megaphone, Ruler, Users, CircleDot } from "lucide-react";
import { Pin, EvidenceTape } from "./EvidenceBoard";

const imageCard = {
  icon: Megaphone,
  label: "What I Do",
  title: "Public Speaking",
  body: "Leading workshops, presenting at meetups, and running hands-on labs for the AWS student community. Breaking down infrastructure into clear, practical sessions.",
  caseId: "CASE-001",
  image: "/public-speaking.jpeg",
};

const terminalCards = [
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
    title: "Build things that help other builders",
    body: "Open source, workshops, docs that actually work. If what I build or share saves someone a few hours, that's a good day.",
    caseId: "CASE-003",
  },
];

const skills = [
  "AWS", "Terraform", "Kubernetes", "CI/CD",
  "Observability", "Linux", "GitHub Actions", "Docker", "Python", "Automation",
  "Public Speaking", "Progressive Overload", "Consistency",
];

export default function AboutSection() {
  return (
    <section id="about" className="py-12 md:py-20">
      <div className="container-site">
        <Reveal>
          <div className="mb-8 md:mb-10">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> whoami
            </p>
            <h2 className="text-pixel-header">About Me</h2>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            className="relative border-[3px] border-[#2a2520] rounded-sm shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_0_1px_rgba(255,255,255,0.03)] p-4 md:p-6 lg:p-8"
            style={{
              background: `
                url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E"),
                linear-gradient(135deg, #12100e 0%, #1a1614 50%, #0f0d0b 100%)
              `,
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

            <div className="relative group mb-4 md:mb-6">
              <Pin className="top-[-6px] left-8 md:left-12" />
              <Pin className="top-[-6px] right-8 md:right-12" />
              <div className="overflow-hidden border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-colors duration-500 rotate-[-0.3deg] hover:rotate-0">
                <div className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden">
                  <img
                    src={imageCard.image}
                    alt={imageCard.title}
                    className="w-full h-full object-cover brightness-[0.7] contrast-[1.1] group-hover:brightness-[0.85] group-hover:scale-[1.02] transition-all duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg)] via-[var(--bg)]/40 to-transparent" />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <EvidenceTape>{imageCard.caseId}</EvidenceTape>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 lg:p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <imageCard.icon size={13} className="text-[var(--color-accent)] shrink-0" />
                    <span className="monokai text-[12px] text-[var(--color-accent)]">
                      {imageCard.label}
                    </span>
                  </div>
                  <h3 className="text-display text-lg md:text-2xl lg:text-3xl text-[var(--color-text)] mb-2">
                    {imageCard.title}
                  </h3>
                  <p className="text-sm md:text-base leading-relaxed text-[var(--color-muted)] max-w-[55ch] line-clamp-3 md:line-clamp-none">
                    {imageCard.body}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <svg className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" aria-hidden="true">
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="var(--color-border-strong)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  opacity="0.4"
                />
              </svg>

              {terminalCards.map((card, i) => (
                <Reveal key={card.label} delay={0.1 + i * 0.06}>
                  <div className={`group relative bg-[var(--bg-alt)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-500 hover:-translate-y-0.5 h-full flex flex-col ${i === 0 ? "md:rotate-[-0.4deg]" : "md:rotate-[0.4deg]"}`}>
                    <Pin className="top-[-6px] left-1/2 -translate-x-1/2" />

                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--color-border)]">
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-border-strong)]" />
                      </div>
                      <div className="flex items-center gap-2 ml-1">
                        <CircleDot size={10} className="text-[var(--color-accent)]" />
                        <span className="monokai text-[10px] text-[var(--color-muted-light)]">
                          {card.caseId}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 md:p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-3">
                        <card.icon size={15} className="text-[var(--color-accent)] shrink-0" />
                        <span className="monokai text-[12px] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                          {card.label}
                        </span>
                      </div>
                      <h3 className="text-display text-base md:text-lg text-[var(--color-text)] mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--color-muted)] flex-1">
                        {card.body}
                      </p>
                    </div>

                    <div className="h-[2px] w-0 group-hover:w-full bg-[var(--color-accent)] transition-all duration-500 ease-out" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-8 md:mt-12">
            <span className="monokai block mb-3">Skills &amp; Tools</span>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-[12px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)] bg-[var(--bg-alt)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors cursor-default"
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
