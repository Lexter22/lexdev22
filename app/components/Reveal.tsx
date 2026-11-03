"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";

type Variant = "fade-up" | "scale-up" | "slide-left" | "stagger" | "pop-in";

type Props = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div" | "article";
  delay?: number;
  variant?: Variant;
};

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

// Mobile reduces travel distance and blur so reveals don't feel overwhelming
// on narrow screens where 60px is a large fraction of the viewport.
const variants: Record<Variant, any> = {
  "fade-up": {
    hidden: {
      opacity: 0,
      y: isMobile ? 30 : 60,
      filter: `blur(${isMobile ? 4 : 8}px)`,
    },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  "scale-up": {
    hidden: {
      opacity: 0,
      scale: isMobile ? 0.95 : 0.9,
      filter: `blur(${isMobile ? 4 : 8}px)`,
    },
    visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
  },
  "slide-left": {
    hidden: {
      opacity: 0,
      x: isMobile ? -30 : -60,
      filter: `blur(${isMobile ? 4 : 8}px)`,
    },
    visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  },
  stagger: {
    hidden: {
      opacity: 0,
      y: isMobile ? 30 : 60,
      filter: `blur(${isMobile ? 4 : 8}px)`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  },
  "pop-in": {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 },
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
        viewport={{ once: true, amount: isMobile ? 0.18 : 0.12 }}
        variants={variants[variant] as any}
        transition={{
          duration: isMobile ? 0.6 : 0.8,
          delay,
          ease: [0.25, 0.1, 0.25, 1],
        }}
      >
        {children}
      </motion.div>
    </Tag>
  );
}
