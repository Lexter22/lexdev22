"use client";

import { ArrowUpRight, FileText, Mail } from "lucide-react";
import Reveal from "./Reveal";

type IconProps = { size?: number; "aria-hidden"?: boolean | "true" | "false" };

// lucide-react 1.x no longer ships brand icons
function Github({ size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M12 .3a12 12 0 0 0-3.8 23.38c.6.12.83-.26.83-.57l-.02-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.28-1.55 3.29-1.23 3.29-1.23.64 1.66.24 2.88.12 3.18a4.65 4.65 0 0 1 1.23 3.22c0 4.61-2.8 5.63-5.48 5.92.42.36.81 1.1.81 2.22l-.01 3.29c0 .31.2.69.82.57A12 12 0 0 0 12 .3" />
    </svg>
  );
}

function Linkedin({ size = 18, ...rest }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" {...rest}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const EMAIL = "johnlexterreyesss@gmail.com";

/** Each row says what the channel is for, so nobody has to guess. */
const channels = [
  { icon: Mail, action: "Email me", value: EMAIL, href: `mailto:${EMAIL}`, external: false, note: "Fastest" },
  {
    icon: Linkedin,
    action: "Message me on LinkedIn",
    value: "in/lexter-reyes",
    href: "https://www.linkedin.com/in/lexter-reyes/",
    external: true,
  },
  {
    icon: Github,
    action: "Browse my code on GitHub",
    value: "Lexter22",
    href: "https://github.com/Lexter22",
    external: true,
  },
  {
    icon: FileText,
    action: "Read my résumé",
    value: "PDF",
    href: "/lexter.pdf.pdf",
    external: true,
  },
];

/** Closing chapter: the ask on the left, a plain list of ways to reach me on the right. */
export default function ContactSection() {
  return (
    <section id="contact" className="chapter tone-green">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Reveal>
          <p className="chapter-eyebrow">
            <span>07</span>&nbsp;&nbsp;~/contact
          </p>
          <h2 className="text-balance font-[family-name:var(--font-mono)] text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-[var(--color-text)]">
            Got a challenge? <span className="text-[var(--c-green)]">Let&apos;s build it.</span>
          </h2>
          <p className="mt-4 max-w-[44ch] text-base leading-relaxed text-[var(--color-muted)]">
            Internships, open-source work, or a side project: reach out any way you like and tell me what you&apos;re
            building.
          </p>
        </Reveal>

        <ul className="self-end border-t border-[var(--color-border)]">
          {channels.map((c, i) => (
            <li key={c.action} className="border-b border-[var(--color-border)]">
              <Reveal delay={0.05 * i} y={12}>
                <a
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 px-1 py-4 hover:bg-[var(--bg-alt)] sm:px-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-[var(--color-surface-alt)] text-[var(--c-green)]">
                    <c.icon size={17} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--c-green)]">
                      {c.action}
                      {c.note && (
                        <span className="rounded-[3px] bg-[var(--c-green)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black">
                          {c.note}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-[var(--color-muted)] sm:text-sm">{c.value}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-muted-light)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--c-green)]"
                  />
                  {c.external && <span className="sr-only">(opens in a new tab)</span>}
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
