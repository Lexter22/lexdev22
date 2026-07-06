"use client";

import Reveal from "./Reveal";
import { Award, Terminal } from "lucide-react";

const certifications = [
  {
    icon: Award,
    title: "AWS Certified Solutions Architect",
    subtitle: "Associate level",
    year: "2024",
  },
  {
    icon: Terminal,
    title: "Cloud Infrastructure Training",
    subtitle: "Terraform, Kubernetes, CI/CD",
    year: "2023",
  },
];

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> apt list --installed
            </p>
            <h2 className="text-pixel-header">Certifications</h2>
          </div>
        </Reveal>

        <div className="border-t border-[var(--color-border)]">
          {certifications.map((item, i) => (
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
