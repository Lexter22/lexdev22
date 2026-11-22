import { ArrowUpRight, FileText, Mail } from "lucide-react";
import Reveal from "./Reveal";
import { chapter } from "./chapters";
import { EMAIL, GITHUB, GithubIcon as Github, LINKEDIN, LinkedinIcon as Linkedin, RESUME } from "./links";

/** Each row says what the channel is for, so nobody has to guess. */
const channels = [
  { icon: Mail, action: "Email me", value: EMAIL, href: `mailto:${EMAIL}`, external: false, note: "Fastest" },
  {
    icon: Linkedin,
    action: "Message me on LinkedIn",
    value: "in/lexter-reyes",
    href: LINKEDIN,
    external: true,
  },
  {
    icon: Github,
    action: "Browse my code on GitHub",
    value: "Lexter22",
    href: GITHUB,
    external: true,
  },
  {
    icon: FileText,
    action: "Read my résumé",
    value: "Google Drive",
    href: RESUME,
    external: true,
  },
];

/** Closing chapter: the ask on the left, a plain list of ways to reach me on the right. */
export default function ContactSection() {
  return (
    <section id="contact" className="chapter">
      <div className="container-site grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
        <Reveal>
          <p className="chapter-eyebrow">
            <span>{chapter("contact").n}</span>
            <span aria-hidden="true" className="chapter-eyebrow-rule" />
            {chapter("contact").label}
          </p>
          <h2 className="text-balance font-[family-name:var(--font-mono)] text-[clamp(1.75rem,4vw,3rem)] font-bold leading-[1.1] tracking-tight text-[var(--color-text)]">
            Got a challenge? <span className="text-[var(--accent)]">Let&apos;s build it.</span>
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
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[6px] bg-[var(--color-surface-alt)] text-[var(--sky)]">
                    <c.icon size={17} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2 text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--accent)]">
                      {c.action}
                      {c.note && (
                        <span className="rounded-[3px] bg-[var(--accent)] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[var(--on-accent)]">
                          {c.note}
                        </span>
                      )}
                    </span>
                    <span className="mt-0.5 block text-[13px] text-[var(--color-muted)] sm:text-sm">{c.value}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-muted-light)] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
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
