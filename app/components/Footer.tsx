import { ExternalLink, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-4 md:py-6">
      <div className="container-site flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-[family-name:var(--font-mono)] text-[var(--color-muted)]">
          <span className="text-[var(--green)]">$</span> whoami &mdash; John Lexter Reyes
        </p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/Lexter22"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-sm font-[family-name:var(--font-mono)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <ExternalLink size={13} />
            GitHub
          </a>
          <a
            href="mailto:johnlexterreyesss@gmail.com"
            className="flex items-center gap-1.5 text-sm font-[family-name:var(--font-mono)] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
          >
            <Mail size={13} />
            Email
          </a>
        </div>
        <p className="text-xs font-[family-name:var(--font-mono)] text-[var(--color-muted)]">
          <span className="text-[var(--green)]">$</span> date &mdash; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
