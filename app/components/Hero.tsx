"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useDarkPassenger } from "./DarkPassengerProvider";

export default function Hero() {
  const reduce = useReducedMotion();
  const { active: darkPassenger } = useDarkPassenger();

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

      <div className="container-site w-full py-8 md:py-14">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-8">
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
                className="text-[clamp(1.8rem,8vw,3.5rem)] font-[family-name:var(--font-pixel)] text-[var(--color-accent)] leading-[1.1]"
                style={{ imageRendering: "pixelated" }}
              >
                LexDev22
              </span>
              {!reduce && (
                <span className="inline-block w-[0.6ch] h-[0.85em] bg-[var(--color-accent)] ml-1.5 animate-[blink_1s_step-end_infinite] align-middle" />
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-2 text-[13px] font-[family-name:var(--font-mono)] text-[var(--color-muted-light)]"
            >
              <span className="text-[var(--color-accent-red)]">#</span> John Lexter Reyes
            </motion.p>

            <motion.div variants={fadeUp} className="mt-6 space-y-1">
              {darkPassenger ? (
                <>
                  <p className="text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
                    Every system has a dark side.
                  </p>
                  <p className="text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
                    Clean execution. No evidence.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
                    Infrastructure that never skips a rep.
                  </p>
                  <p className="text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
                    I follow a code — clean, tested, shipped.
                  </p>
                </>
              )}
              <p className="text-[15px] md:text-[17px] leading-relaxed text-[var(--color-muted)]">
                AWS Student Builder Group Lead.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-accent)] text-[#000] text-[13px] font-bold uppercase tracking-widest hover:brightness-110 active:scale-[0.97] transition-all"
              >
                Reach Out
                <ArrowRight size={14} />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--color-border-strong)] text-[var(--color-text)] text-[13px] font-bold uppercase tracking-widest hover:bg-[var(--color-surface-alt)] hover:border-[var(--color-accent)]/50 active:scale-[0.97] transition-all"
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
                    className="px-3 py-1.5 text-[11px] font-[family-name:var(--font-mono)] font-semibold tracking-wider border border-[var(--color-border)] text-[var(--color-muted)] hover:border-[var(--color-accent)]/40 hover:text-[var(--color-accent)] transition-colors cursor-default"
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
            <div className="w-[180px] h-[180px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px]">
              <img
                src="/profile.png"
                alt="LexDev22"
                className="w-full h-full object-cover animate-[glitch_12s_ease-in-out_infinite]"
                style={{
                  clipPath: `polygon(
                    0% 0%, 100% 0%,
                    100% 98%,
                    95% 98%, 95% 100%,
                    90% 100%, 90% 98%,
                    85% 98%, 85% 100%,
                    80% 100%, 80% 98%,
                    75% 98%, 75% 100%,
                    70% 100%, 70% 98%,
                    65% 98%, 65% 100%,
                    60% 100%, 60% 98%,
                    55% 98%, 55% 100%,
                    50% 100%, 50% 98%,
                    45% 98%, 45% 100%,
                    40% 100%, 40% 98%,
                    35% 98%, 35% 100%,
                    30% 100%, 30% 98%,
                    25% 98%, 25% 100%,
                    20% 100%, 20% 98%,
                    15% 98%, 15% 100%,
                    10% 100%, 10% 98%,
                    5% 98%, 5% 100%,
                    0% 100%
                  )`,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-[var(--color-accent)]/30" />
    </section>
  );
}
