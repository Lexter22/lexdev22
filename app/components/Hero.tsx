"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { ArrowRight, FileText } from "lucide-react";
import { useLerp, useReduced } from "./scroll";
import { GITHUB, GithubIcon, LINKEDIN, LinkedinIcon, RESUME } from "./links";

/** Chapter 00: who I am and the two things I do, shown straight away. */
export default function Hero() {
  const reduce = useReduced();
  const ref = useRef<HTMLElement>(null);
  // 0 while the hero fills the screen, 1 once it has scrolled fully out
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useLerp(scrollYProgress, [0, 1], [0, -60]);
  const textO = useLerp(scrollYProgress, [0.1, 0.8], [1, 0.15]);
  const photoY = useLerp(scrollYProgress, [0, 1], [0, -140]);
  const photoScale = useLerp(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <section ref={ref} id="top" className="relative pt-14">
      <div className="container-site flex min-h-[calc(100svh-3.5rem)] flex-col justify-center py-8 sm:py-12 [@media(max-height:700px)]:py-4">
        <div className="mx-auto grid w-full max-w-[1080px] items-center gap-6 sm:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,300px)] md:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,340px)]">
          <motion.div className="order-2 md:order-1" style={reduce ? { y: 0, opacity: 1 } : { y: textY, opacity: textO }}>
            <p className="prompt-tag mb-4">whoami</p>
            <h1 className="font-[family-name:var(--font-pixel)] text-[clamp(1.5rem,4.4vw,3.25rem)] uppercase leading-[1.25] text-[var(--color-text)]">
              <span className="block">John Lexter</span>
              <span className="block text-[var(--accent)]">B. Reyes</span>
            </h1>
            <p className="mt-6 text-balance text-[clamp(1.125rem,2vw,1.5rem)] font-bold leading-snug tracking-[-0.01em] text-[var(--color-text)]">
              I build software. <span className="text-[var(--sky)]">I bring people together.</span>
            </p>
            <p className="mt-4 text-sm font-semibold sm:text-base">
              <span className="text-[var(--color-text)]">Software Engineer</span>
              <span className="text-[var(--color-muted-light)]"> · Backend · Cloud · AI · QA Automation</span>
            </p>
            <p className="mt-3 max-w-[56ch] leading-relaxed text-[var(--color-muted)]">
              I build backend services and the cloud they run on: APIs, PostgreSQL, Docker deploys and CI pipelines, plus
              the automated tests that keep them working. I also lead the AWS Student Builder Group at PUP Bi&ntilde;an.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary">
                View projects
                <ArrowRight size={14} aria-hidden="true" />
              </a>
              <a href={RESUME} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <FileText size={14} aria-hidden="true" />
                Résumé
                <span className="sr-only">(opens in a new tab)</span>
              </a>
              <span className="flex gap-3">
                <a
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost !w-11 !px-0"
                  aria-label="GitHub (opens in a new tab)"
                >
                  <GithubIcon size={17} />
                </a>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost !w-11 !px-0"
                  aria-label="LinkedIn (opens in a new tab)"
                >
                  <LinkedinIcon size={17} />
                </a>
              </span>
            </div>
          </motion.div>

          <motion.div style={reduce ? { y: 0, scale: 1 } : { y: photoY, scale: photoScale }} className="order-1 w-[38%] max-w-[170px] overflow-hidden rounded-[6px] border border-[var(--color-border-strong)] sm:w-1/2 sm:max-w-[260px] md:order-2 md:w-full md:max-w-none [@media(max-height:700px)]:w-24">
            <img
              src="/profile.png"
              alt="John Lexter B. Reyes"
              width={400}
              height={400}
              className="h-auto w-full object-cover"
              fetchPriority="high"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
