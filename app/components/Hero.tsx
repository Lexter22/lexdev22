"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LOCATION } from "../site";
import { useLerp, useReduced } from "./scroll";
import { GITHUB, LINKEDIN, RESUME } from "./links";

/** Secondary actions: plain text links so the one button stays the clear first step. */
const links = [
  { label: "Résumé", href: RESUME },
  { label: "GitHub", href: GITHUB },
  { label: "LinkedIn", href: LINKEDIN },
];

/** Chapter 00: name, role and location, one sentence, then where to go next. */
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
        <div className="mx-auto grid w-full max-w-[1080px] items-center gap-8 sm:gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,300px)] md:gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)]">
          <motion.div
            className="order-2 md:order-1"
            style={reduce ? { y: 0, opacity: 1 } : { y: textY, opacity: textO }}
          >
            <p className="prompt-tag mb-5">whoami</p>
            <h1 className="font-[family-name:var(--font-pixel)] text-[clamp(1.75rem,5vw,3.5rem)] uppercase leading-[1.2] text-[var(--color-text)]">
              <span className="block">John Lexter</span>
              <span className="block text-[var(--accent)]">B. Reyes</span>
            </h1>
            <p className="mt-6 text-sm font-semibold sm:text-base">
              <span className="text-[var(--color-text)]">Software Engineer</span>
              {/* Own line on phones so the place name never breaks in the middle */}
              <span className="block text-[var(--color-muted-light)] sm:inline">
                <span aria-hidden="true" className="hidden sm:inline"> · </span>
                {LOCATION}
              </span>
            </p>
            <p className="mt-4 max-w-[46ch] text-base leading-relaxed text-[var(--color-muted)] sm:text-lg">
              I build backend services, the cloud they run on, and the tests that keep them working.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="#projects" className="btn btn-primary">
                View projects
                <ArrowRight size={14} aria-hidden="true" />
              </a>
              <ul className="flex flex-wrap items-center gap-x-5">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-1 text-[13px] font-semibold text-[var(--color-muted)] hover:text-[var(--accent)]"
                    >
                      {l.label}
                      <ArrowUpRight size={13} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            style={reduce ? { y: 0, scale: 1 } : { y: photoY, scale: photoScale }}
            className="order-1 w-[42%] max-w-[180px] overflow-hidden rounded-[6px] border border-[var(--color-border-strong)] sm:w-1/2 sm:max-w-[260px] md:order-2 md:w-full md:max-w-none [@media(max-height:700px)]:w-24"
          >
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
