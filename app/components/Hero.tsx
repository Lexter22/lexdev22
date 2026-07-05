"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";

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
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
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

      <div className="container-site w-full py-10 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 md:gap-8">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="max-w-[600px]"
          >
            <motion.p variants={fadeUp} className="prompt-tag mb-4">
              echo $USER
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="leading-none"
            >
              <span
                className="text-[clamp(1.8rem,6vw,3.5rem)] font-[family-name:var(--font-pixel)] text-[var(--green)] leading-[1.1]"
                style={{ imageRendering: "pixelated" }}
              >
                LexDev22
              </span>
              {!reduce && (
                <span className="inline-block w-[0.6ch] h-[0.85em] bg-[var(--green)] ml-1.5 animate-[blink_1s_step-end_infinite] align-middle" />
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-2 text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)]"
            >
              # John Lexter Reyes
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 space-y-1">
              <p className="text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
                Cloud infrastructure that scales.
              </p>
              <p className="text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
                Communities that grow.
              </p>
              <p className="text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
                AWS Student Builder Group Lead.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--green)] text-[#000] text-[13px] font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.97] transition-all"
              >
                Reach Out
                <ArrowRight size={14} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border-strong)] text-[var(--color-text)] text-[13px] font-bold uppercase tracking-widest hover:bg-[var(--color-surface-alt)] hover:border-[var(--green)]/50 active:scale-[0.97] transition-all"
              >
                View Projects
                <ArrowDown size={14} />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {["AWS", "Terraform", "Kubernetes", "CI/CD", "Community Building"].map(
                (skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-[11px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--green)]/40 hover:text-[var(--green)] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ),
              )}
            </motion.div>
          </motion.div>

          <motion.div
            initial={reduce ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay: 0.3 }}
            className="relative shrink-0 self-center md:self-auto"
          >
            <div className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]">
              <img
                src="/profile.png"
                alt="LexDev22"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--green)]/30" />
    </section>
  );
}
