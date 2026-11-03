"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

type Variant = "fade-up" | "scale-up" | "slide-left" | "stagger";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  delay?: number;
  variant?: Variant;
};

type VariantConfig = {
  hidden: Record<string, unknown>;
  visible: Record<string, unknown>;
  transition?: Record<string, unknown>;
};

const variants: Record<Variant, VariantConfig> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "scale-up": {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-left": {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  stagger: {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  },
};

export default function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  variant = "fade-up",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const Tag = as;

  if (reduce) {
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <Tag ref={ref} className={className}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={variants[variant] as any}
        transition={{
          duration: 0.7,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
