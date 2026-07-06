"use client";

import Reveal from "./Reveal";

const experience = [
  {
    title: "AWS Student Builder Group Lead",
    org: "AWS",
    location: "Remote / Manila",
    year: "2024 — Present",
    body: "Leading cloud computing workshops, study groups, and hands-on labs for students. Bridging the gap between academic learning and real-world AWS infrastructure.",
  },
  {
    title: "Platform Engineer",
    org: "Various",
    location: "Remote",
    year: "2023 — Present",
    body: "Designing and maintaining AWS infrastructure using Terraform and Kubernetes. Building CI/CD pipelines that teams actually trust to push with. Improving observability coverage across staging and production.",
  },
  {
    title: "Infrastructure Delivery",
    org: "Various",
    location: "Remote",
    year: "2022 — 2023",
    body: "Streamlining release workflows, removing manual handoffs, and making deployments repeatable. Writing runbooks and dashboards so incidents don't turn into fire drills.",
  },
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> cat experience.log
            </p>
            <h2 className="text-pixel-header">Experience</h2>
          </div>
        </Reveal>

        <div className="border-t border-[var(--color-border)]">
          {experience.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="py-4 md:py-6 border-b border-[var(--color-border)] last:border-b-0">
                <div className="flex items-start gap-4">
                  <span className="hidden md:flex mt-1.5 w-3 h-3 shrink-0 bg-[var(--green)]" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-1">
                      <h3 className="text-display text-lg md:text-xl text-[var(--color-text)]">
                        {item.title}
                      </h3>
                      <span className="text-[12px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)] mt-0.5 md:mt-0 md:ml-4 whitespace-nowrap">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)] mb-1.5">
                      {item.org} &mdash; {item.location}
                    </p>
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
