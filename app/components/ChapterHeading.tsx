"use client";

import { motion, type Variants } from "motion/react";
import { chapter } from "./chapters";
import { useReduced } from "./scroll";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

type Props = {
  /** Chapter id from chapters.ts; supplies the number and story label. */
  id: string;
  title: string;
  intro?: string;
  className?: string;
};

/** Chapter number and story label, then the title and an optional intro, as one left-aligned unit. */
export default function ChapterHeading({ id, title, intro, className = "" }: Props) {
  const reduce = useReduced();
  const c = chapter(id);
  // Reduced motion: show immediately. (The server render starts hidden, so it must be set explicitly.)
  const anim = reduce
    ? { initial: false as const, animate: "show" as const, transition: { duration: 0 } }
    : { initial: "hidden" as const, whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <motion.div className={`chapter-head ${className}`} variants={container} {...anim}>
      <motion.p className="chapter-eyebrow" variants={fade}>
        <span>{c.n}</span>
        <span aria-hidden="true" className="chapter-eyebrow-rule" />
        {c.label}
      </motion.p>
      <motion.h2 className="chapter-title" variants={fade}>
        {title}
      </motion.h2>
      {intro && (
        <motion.p className="chapter-intro" variants={fade}>
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
