"use client";

import { ArrowUpRight, Download, Mail, MapPin } from "lucide-react";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";

type IconProps = { size?: number; "aria-hidden"?: boolean | "true" | "false" };

// lucide-react 1.x no longer ships brand icons
function Github({ size = 16, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
    </svg>
  );
}

function Linkedin({ size = 16, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const EMAIL = "johnlexterreyesss@gmail.com";
const RESUME = { href: "/lexter.pdf.pdf", filename: "John-Lexter-Reyes-Resume.pdf" };

const channels = [
  { icon: Mail, label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, tone: "tone-green", external: false },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/lexter-reyes",
    href: "https://www.linkedin.com/in/lexter-reyes/",
    tone: "tone-blue",
    external: true,
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/Lexter22",
    href: "https://github.com/Lexter22",
    tone: "tone-violet",
    external: true,
  },
];

export default function ContactSection() {
  return (
    <section id="contact" className="chapter tone-green">
      <div className="container-site grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <ChapterHeading
            index="07"
            path="contact"
            title="Contact"
            intro="Open to open-source contributions and side projects. If you're shipping something, I'd like to hear about it."
            split={false}
            className="!mb-6"
          />
          <Reveal className="flex flex-wrap gap-3">
            <a href={RESUME.href} download={RESUME.filename} className="btn btn-primary">
              <Download size={14} aria-hidden="true" />
              Download résumé (PDF)
            </a>
            <a href={`mailto:${EMAIL}`} className="btn btn-ghost">
              Email me
            </a>
          </Reveal>
          <p className="mt-6 flex items-center gap-2 text-[12px] text-[var(--color-muted-light)]">
            <MapPin size={13} aria-hidden="true" />
            Biñan, Laguna, Philippines
          </p>
        </div>

        <Reveal delay={0.08}>
          <ul className="overflow-hidden rounded-[6px] border border-[var(--color-border)]">
            {channels.map((c) => (
              <li key={c.label} className={`${c.tone} border-b border-[var(--color-border)] last:border-b-0`}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 bg-[var(--bg-alt)] px-4 py-4 hover:bg-[var(--color-surface-alt)] sm:px-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-[var(--tone)] text-black">
                    <c.icon size={17} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-light)]">
                      {c.label}
                    </span>
                    <span className="block truncate text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--tone)]">
                      {c.value}
                    </span>
                  </span>
                  <ArrowUpRight
                    size={16}
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-muted-light)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--tone)]"
                  />
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </li>
            ))}
            <li className="tone-amber">
              <a
                href={RESUME.href}
                download={RESUME.filename}
                className="group flex items-center gap-4 bg-[var(--bg-alt)] px-4 py-4 hover:bg-[var(--color-surface-alt)] sm:px-5"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[4px] bg-[var(--tone)] text-black">
                  <Download size={17} aria-hidden="true" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-light)]">
                    Résumé
                  </span>
                  <span className="block truncate text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--tone)]">
                    {RESUME.filename}
                  </span>
                </span>
                <span className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted-light)] group-hover:text-[var(--tone)]">
                  PDF
                </span>
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
