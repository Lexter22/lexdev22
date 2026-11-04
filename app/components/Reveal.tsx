"use client";

import { motion } from "motion/react";
import { useReduced } from "./scroll";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  /** Vertical travel in px. */
  y?: number;
};

/** Fades and lifts content once as it enters the viewport. */
export default function Reveal({ children, className = "", delay = 0, y = 24 }: Props) {
  const reduce = useReduced();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
