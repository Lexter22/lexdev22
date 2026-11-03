"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  const reduce = useReducedMotion();

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const fadeUp = {
    hidden: reduce ? {} : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const } },
  };

  return (
    <section
      id="top"
      className="relative min-h-[100dvh] flex items-center"
      style={{ paddingTop: "64px" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(80vw,700px)] h-auto opacity-[0.015]"
          viewBox="0 0 200 200"
          fill="none"
          stroke="var(--green)"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M20 20 L100 20 L70 80 L130 80 L100 140 L30 140 L60 80 L0 80 Z" />
        </svg>
      </div>

      <div className="container-site w-full py-8 sm:py-12 md:py-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 items-start md:items-start gap-8 md:gap-16 max-w-[1200px]"
        >
          <div className="shrink-0 relative">
            <img
              src="/profile.png"
              alt="John Lexter B. Reyes"
              width={420}
              height={420}
              sizes="(max-width: 640px) 260px, (max-width: 1024px) 340px, 420px"
              className="max-w-full w-[260px] h-[260px] sm:w-[340px] sm:h-[340px] md:w-[420px] md:h-[420px] object-cover rounded-[10px] border border-[var(--color-border)]"
            />
          </div>

          <motion.div variants={fadeUp} className="flex flex-col items-start gap-4 max-w-[560px] flex-1">
            <motion.p variants={fadeUp} className="prompt-tag">
              echo $USER
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="leading-none"
            >
              <span
                className="text-[clamp(1.5rem,7vw,2.75rem)] font-[family-name:var(--font-pixel)] text-[var(--color-accent)] leading-[1.05]"
                style={{ imageRendering: "pixelated" }}
              >
                John Lexter B. Reyes
              </span>
              {!reduce && (
                <span className="inline-block w-[0.8ch] h-[0.9em] bg-[var(--color-accent)] ml-2 animate-[blink_1s_step-end_infinite] align-middle" />
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-sm md:text-base leading-relaxed text-[var(--color-muted)] max-w-[65ch]"
            >
              I'm a BSIT student at PUP Bi&ntilde;an Campus and a tech community builder. I design server-side systems, optimize databases, and ship cloud infrastructure. As AWS Student Builder Group Lead, I bring builders together to learn, build, and ship.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-10 sm:mt-12 flex flex-wrap gap-4"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-3 px-7 sm:px-9 py-4 sm:py-5 bg-[var(--color-accent)] text-[#000] text-[13px] sm:text-sm font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.97] transition-property: color, border-color, background-color, opacity, transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 0.2s"
              >
                View Projects
                <ArrowRight size={14} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-7 sm:px-9 py-4 sm:py-5 border border-[var(--color-border-strong)] text-[var(--color-text)] text-[13px] sm:text-sm font-bold uppercase tracking-widest hover:bg-[var(--color-surface-alt)] hover:border-[var(--color-accent)]/50 active:scale-[0.97] transition-property: color, border-color, background-color, opacity, transform; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 0.2s"
              >
                Reach Out
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
