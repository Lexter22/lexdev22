"use client";

import Reveal from "./Reveal";
import { Users, BookOpen, Lightbulb } from "lucide-react";

const activities = [
  {
    icon: Users,
    label: "Leadership",
    title: "AWS Student Builder Group Lead",
    body: "Leading planning sessions, organizing cloud workshops, helping members unblock on AWS concepts, and keeping shared goals visible across the group.",
  },
  {
    icon: BookOpen,
    label: "Community",
    title: "Knowledge sharing",
    body: "Writing internal documentation, presenting on infrastructure topics, running hands-on labs, and helping peers level up on cloud and DevOps practices.",
  },
  {
    icon: Lightbulb,
    label: "Mentoring",
    title: "Growing the next set of engineers",
    body: "Guiding junior team members through code reviews, architecture discussions, and incident retrospectives. Building a culture of continuous learning.",
  },
];

export default function BeyondCodingSection() {
  return (
    <section id="beyond-coding" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="prompt-tag mb-3">Beyond Coding</p>
            <h2 className="text-pixel-header">
              Beyond Coding
            </h2>
            <p className="mt-4 max-w-[520px] text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
              Community, mentoring, and team coordination — the skills that don&apos;t
              live in a text editor.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-[var(--color-border)]">
          {activities.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="py-4 md:py-6 border-b border-[var(--color-border)] last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="hidden md:flex items-center justify-center w-10 h-10 shrink-0 border border-[var(--color-border)] bg-[var(--bg-alt)] group-hover/card:border-[var(--green)]/40 transition-colors">
                    <item.icon size={16} className="text-[var(--color-text)] group-hover/card:text-[var(--green)] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0 group/card">
                    <span className="monokai block mb-1.5 group-hover/card:text-[var(--green)] transition-colors">{item.label}</span>
                    <h3 className="text-lg md:text-xl font-bold text-[var(--color-text)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-[15px] leading-relaxed text-[var(--color-muted)] max-w-[600px]">
                      {item.body}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
