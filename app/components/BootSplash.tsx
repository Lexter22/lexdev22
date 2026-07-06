"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const bootLines = [
  { text: "Booting LexDev22 kernel v2.6...", delay: 200 },
  { text: "Loading education... OK", delay: 700 },
  { text: "Mounting projects... OK", delay: 1200 },
  { text: "Syncing experience... OK", delay: 1700 },
  { text: "Initializing about module... OK", delay: 2200 },
  { text: "Loading certifications... OK", delay: 2700 },
  { text: "Establishing secure connections... OK", delay: 3200 },
  { text: "System ready.", delay: 3700 },
];

export default function BootSplash() {
  const [dismissed, setDismissed] = useState(false);
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showPrompt, setShowPrompt] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setVisibleLines(bootLines.map((_, i) => i));
      setShowPrompt(true);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, i) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines((prev) => [...prev, i]);
          if (i === bootLines.length - 1) {
            setTimeout(() => setShowPrompt(true), 600);
          }
        }, line.delay),
      );
    });

    return () => timers.forEach(clearTimeout);
  }, [reduce]);

  const dismiss = () => setDismissed(true);

  useEffect(() => {
    if (!showPrompt) return;
    const handleKey = () => dismiss();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [showPrompt]);

  return (
    <AnimatePresence>
      {!dismissed && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={dismiss}
          className="fixed inset-0 z-[100] bg-[var(--bg)] flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="font-[family-name:var(--font-mono)] text-sm space-y-1.5 max-w-[520px] px-6">
            {bootLines.map((line, i) => (
              <motion.p
                key={i}
                initial={reduce ? {} : { opacity: 0, x: -10 }}
                animate={
                  visibleLines.includes(i) ? { opacity: 1, x: 0 } : {}
                }
                transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                className={
                  i === bootLines.length - 1
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-muted)]"
                }
              >
                {">"} {line.text}
              </motion.p>
            ))}
            {showPrompt && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="text-[var(--color-accent)] mt-6"
              >
                <span>PRESS ANY KEY OR CLICK TO BOOT</span>
                <span className="inline-block w-[0.6ch] h-[1em] bg-[var(--color-accent)] ml-2 animate-[blink_1s_step-end_infinite] align-middle" />
              </motion.p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
