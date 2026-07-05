"use client";

import Reveal from "./Reveal";
import { GraduationCap } from "lucide-react";

const education = [
  {
    icon: GraduationCap,
    title: "BS Computer Science",
    subtitle: "Major in software and systems",
    year: "Ongoing",
  },
];

export default function EducationSection() {
  return (
    <section id="education" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="prompt-tag mb-3">Education</p>
            <h2 className="text-pixel-header">
              Education
            </h2>
            <p className="mt-4 max-w-[520px] text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
              Formal background that supports the engineering work.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-[var(--color-border)]">
          {education.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="py-4 md:py-6 border-b border-[var(--color-border)] last:border-b-0">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 shrink-0 border border-[var(--color-border)] bg-[var(--bg-alt)]">
                    <item.icon size={16} className="text-[var(--color-text)]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
                      <h3 className="text-display text-lg md:text-xl text-[var(--color-text)]">
                        {item.title}
                      </h3>
                      <span className="text-[12px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)] whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--color-muted)] mt-0.5">
                      {item.subtitle}
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
