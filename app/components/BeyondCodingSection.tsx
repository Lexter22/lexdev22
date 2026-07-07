"use client";

import Reveal from "./Reveal";
import { Users, Dumbbell, Radio } from "lucide-react";

const activities = [
  {
    icon: Users,
    label: "Community Building",
    title: "AWS Student Builder Group Lead",
    body: "Planning sessions, cloud workshops, helping members unblock on AWS concepts. Keeping the group consistent — every week, no excuses, no days off. Building a space where future engineers grow together.",
  },
  {
    icon: Dumbbell,
    label: "Body Building",
    title: "Discipline outside the terminal",
    body: "Progressive overload applies to code and iron alike. Same principle — show up, push harder, track progress. The gym is where I reset, refocus, and remind myself that consistency beats intensity every time.",
  },
  {
    icon: Radio,
    label: "Tech Influencer",
    title: "Sharing knowledge at scale",
    body: "Breaking down cloud infrastructure, career growth, and system design into content that helps others level up. No fluff, no gatekeeping — just real engineering insights for the next generation of builders.",
  },
];

export default function BeyondCodingSection() {
  return (
    <section id="beyond-coding" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> ls ~/hobbies/
            </p>
            <h2 className="text-pixel-header">Beyond Coding</h2>
          </div>
        </Reveal>

        <div className="border-t border-[var(--color-border)]">
          {activities.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.06}>
              <div className="py-4 md:py-6 border-b border-[var(--color-border)] last:border-b-0">
                <div className="flex items-start gap-4">
                  <div className="hidden md:flex items-center justify-center w-10 h-10 shrink-0 border border-[var(--color-border)] bg-[var(--bg-alt)] group-hover/card:border-[var(--green)]/40 transition-colors">
                    <item.icon size={16} className="text-[var(--color-text)] group-hover/card:text-[var(--color-accent)] transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0 group/card">
                    <span className="monokai block mb-1.5 group-hover/card:text-[var(--color-accent)] transition-colors">{item.label}</span>
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
