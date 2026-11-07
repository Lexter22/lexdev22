import { ArrowUp } from "lucide-react";

/** Deliberately minimal: the contact links live in the section above, not here. */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-[var(--color-border)]">
      <div className="container-site flex items-center justify-between gap-4 py-5 text-[12px] text-[var(--color-muted-light)]">
        <p>© {year} John Lexter B. Reyes</p>
        <a href="#top" className="inline-flex items-center gap-1.5 hover:text-[var(--c-green)]">
          Back to top
          <ArrowUp size={12} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
