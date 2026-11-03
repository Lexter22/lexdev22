"use client";

import Reveal from "./Reveal";
import { Megaphone, Ruler, Users } from "lucide-react";

const imageCard = {
  icon: Megaphone,
  label: "What I Do",
  title: "Public Speaking",
  body: "Leading workshops, presenting at meetups, and running hands-on labs for the AWS student community. Breaking down infrastructure into clear, practical sessions.",
  image: "/public-speaking.jpeg",
};

const terminalCards = [
  {
    icon: Ruler,
    label: "How I Work",
    title: "Show up. Do the work. Track the data.",
    body: "Don't skip reps or runbooks. Reliability, clean handoffs, and dashboards that tell the truth. Consistency compounds across every set.",
  },
  {
    icon: Users,
    label: "What I Value",
    title: "Build things that help other builders",
    body: "Open source, workshops, docs that actually work. If what I build or share saves someone a few hours, that's a good day.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-8 sm:py-10 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-pixel-header text-wrap balance">About Me</h2>
          </div>
        </Reveal>

        <Reveal delay={0.06}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-start">
            <div className="lg:col-span-1">
              <div className="border border-[var(--color-border)] bg-[var(--bg-alt)] rounded-sm p-4 sm:p-6">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm border border-[var(--color-border)] group">
                  <img
                    src={imageCard.image}
                    alt={imageCard.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-alt)] via-[var(--bg-alt)]/60 to-transparent" />
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 z-10">
                    <span className="monokai px-2 py-0.5 border border-[var(--color-border-strong)] text-[10px] uppercase">
                      {imageCard.label}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 z-10 text-left max-w-[70%]">
                    <h3 className="text-display text-lg md:text-2xl text-[var(--color-text)] mb-2">
                      {imageCard.title}
                    </h3>
                    <p className="text-sm md:text-base leading-relaxed text-[var(--color-muted)] max-w-[55ch]">
                      {imageCard.body}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 sm:space-y-6 min-w-0">
              {terminalCards.map((card, i) => (
                <Reveal key={card.label} delay={0.1 + i * 0.06} variant="fade-up">
                  <div className="flex items-start gap-3 border border-[var(--color-border)] bg-[var(--bg-alt)] rounded-sm p-3 sm:p-4 hover:border-[var(--color-accent)]/40 transition-colors duration-300">
                    <card.icon size={16} className="text-[var(--color-accent)] shrink-0" />
                    <div className="flex-1 min-w-0">
                      <span className="monokai block mb-1.5 text-[var(--color-muted-light)]">
                        {card.label}
                      </span>
                      <h3 className="text-lg md:text-xl text-[var(--color-text)] mb-1.5">
                        {card.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-[var(--color-muted)]">
                        {card.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
