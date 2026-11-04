import { ArrowUp } from "lucide-react";

/** Terminal status line, like the bar at the bottom of tmux or vim. */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--bg-alt)]">
      <div className="statusline">
        <span className="bg-[var(--c-green)] text-black">lex@portfolio</span>
        <span className="hidden bg-[var(--color-surface-alt)] text-[var(--color-muted)] sm:inline-flex">~/contact</span>
        <span className="min-w-0 flex-1 truncate text-[var(--color-muted-light)]">
          © {year} John Lexter B. Reyes
          <span className="hidden md:inline">&nbsp;·&nbsp;Biñan, Laguna, PH</span>
        </span>
        <span className="hidden bg-[var(--color-surface-alt)] text-[var(--color-muted)] md:inline-flex">utf-8</span>
        <a
          href="#top"
          className="bg-[var(--c-blue)] font-bold text-black hover:bg-[var(--color-text)] focus-visible:!outline-offset-[-3px]"
        >
          <ArrowUp size={13} aria-hidden="true" className="mr-1.5" />
          Top
        </a>
      </div>
    </footer>
  );
}
