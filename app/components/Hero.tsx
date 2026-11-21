import { ArrowRight } from "lucide-react";

function HeroContent() {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14">
      <div className="mx-auto w-3/5 max-w-[340px] overflow-hidden rounded-[6px] border border-[var(--color-border-strong)] md:mx-0 md:w-full">
        <img
          src="/profile.png"
          alt="John Lexter B. Reyes"
          width={400}
          height={400}
          className="h-auto w-full object-cover"
          fetchPriority="high"
        />
      </div>

      <div className="max-w-[600px]">
        <p className="prompt-tag mb-3">whoami</p>
        <h1 className="chapter-title mb-4 !text-[clamp(1.5rem,4vw,2.75rem)]">
          <span className="block text-[var(--color-text)]">John Lexter</span>
          <span className="block text-[var(--accent)]">B. Reyes</span>
        </h1>
        <p className="mb-5 text-sm font-semibold sm:text-base">
          <span className="text-[var(--color-muted)]">AWS Student Builder Group Lead</span>
          <span className="text-[var(--color-muted-light)]"> · </span>
          <span className="text-[var(--color-text)]">DevOps · Data · QA Automation</span>
        </p>
        <p className="mb-7 max-w-[52ch] leading-relaxed text-[var(--color-muted)]">
          I lead the AWS Student Builder Group at PUP Bi&ntilde;an, bridging academics and industry through hands-on
          workshops. I focus on DevOps, data, and QA automation.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary">
            View projects
            <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a href="#contact" className="btn btn-ghost">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

/** Opening chapter: the intro, shown straight away. */
export default function Hero() {
  return (
    <section id="top" className="relative pt-14">
      <div className="container-site flex min-h-[calc(100svh-3.5rem)] items-center py-12">
        <HeroContent />
      </div>
    </section>
  );
}
