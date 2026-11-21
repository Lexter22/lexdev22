import { ArrowRight } from "lucide-react";

function HeroContent() {
  return (
    <div className="grid items-center gap-5 sm:gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14">
      <div className="mx-auto w-[42%] max-w-[180px] [@media(max-height:700px)]:w-24 overflow-hidden sm:w-3/5 sm:max-w-[340px] rounded-[6px] border border-[var(--color-border-strong)] md:mx-0 md:w-full">
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
        <p className="mb-4 text-sm font-semibold sm:mb-5 sm:text-base">
          <span className="text-[var(--color-muted)]">Software Engineer</span>
          <span className="text-[var(--color-muted-light)]"> · </span>
          <span className="text-[var(--color-text)]">Backend · Cloud · QA Automation</span>
        </p>
        <p className="mb-6 max-w-[52ch] leading-relaxed sm:mb-7 text-[var(--color-muted)]">
          I build backend services and the cloud they run on: APIs, PostgreSQL, Docker deploys and CI pipelines, plus
          the automated tests that keep them working. I also lead the AWS Student Builder Group at PUP Bi&ntilde;an.
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
      <div className="container-site flex min-h-[calc(100svh-3.5rem)] items-center py-6 sm:py-12 [@media(max-height:700px)]:py-3">
        <HeroContent />
      </div>
    </section>
  );
}
