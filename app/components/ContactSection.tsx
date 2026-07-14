"use client";

import Reveal from "./Reveal";
import { Mail, ExternalLink, Download } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-8 md:py-12">
      <div className="container-site">
        <Reveal>
          <div className="mb-6">
            <p className="text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted)] mb-1">
              <span className="text-[var(--color-accent)]">$</span> cat ~/.contact
            </p>
            <h2 className="text-pixel-header">Contact</h2>
          </div>
        </Reveal>

        <div className="border-t border-[var(--color-border)]">
          <Reveal>
            <a
              href="mailto:johnlexterreyesss@gmail.com"
              className="flex items-center gap-3 md:gap-4 py-4 md:py-6 border-b border-[var(--color-border)] group hover:bg-[var(--bg-alt)]/50 transition-colors duration-300 -mx-6 px-6"
            >
              <div className="flex items-center justify-center w-10 h-10 shrink-0 border border-[var(--color-border)] bg-[var(--bg-alt)] group-hover:border-[var(--green)] transition-colors">
                <Mail size={16} className="text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="monokai block mb-1 group-hover:text-[var(--color-accent)] transition-colors">Email</span>
                <span className="text-display text-xl md:text-2xl text-[var(--color-text)]">
                  Reach Out
                </span>
                <p className="text-sm text-[var(--color-muted)] mt-1">
                  I&apos;ll get back to you within a day or two.
                </p>
              </div>
              <ExternalLink size={14} className="text-[var(--color-muted-light)] shrink-0 group-hover:text-[var(--color-accent)] transition-colors" />
            </a>
          </Reveal>

          <Reveal delay={0.06}>
            <a
              href="https://github.com/Lexter22"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 md:gap-4 py-4 md:py-6 border-b border-[var(--color-border)] group hover:bg-[var(--bg-alt)]/50 transition-colors duration-300 -mx-6 px-6"
            >
              <div className="flex items-center justify-center w-10 h-10 shrink-0 border border-[var(--color-border)] bg-[var(--bg-alt)] group-hover:border-[var(--color-accent)] transition-colors">
                <ExternalLink size={16} className="text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="monokai block mb-1 group-hover:text-[var(--color-accent)] transition-colors">GitHub</span>
                <span className="text-display text-xl md:text-2xl text-[var(--color-text)]">
                  View Profile
                </span>
                <p className="text-sm text-[var(--color-muted)] mt-1">
                  Check out my repositories and contributions.
                </p>
              </div>
              <ExternalLink size={14} className="text-[var(--color-muted-light)] shrink-0 group-hover:text-[var(--color-accent)] transition-colors" />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-6">
            <a
              href="/lexdev.pdf"
              download
              className="inline-flex items-center gap-2 px-5 py-3.5 border border-[var(--color-border-strong)] text-[var(--color-text)] text-[13px] font-bold tracking-widest hover:bg-[var(--color-surface-alt)] transition-colors"
            >
              <Download size={14} />
              Download CV
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
