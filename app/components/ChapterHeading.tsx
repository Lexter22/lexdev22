"use client";

import { motion, type Variants } from "motion/react";
import { useReduced } from "./scroll";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease } },
};
const rise: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.8, ease } },
};

type Props = {
  index: string;
  /** Shown as a terminal path in the eyebrow, e.g. "projects" -> ~/projects */
  path: string;
  title: string;
  intro?: string;
  /** Deprecated: kept for call-site compatibility; header is always stacked now. */
  split?: boolean;
  className?: string;
};

/** Chapter number + title + optional intro, stacked as one left-aligned unit. */
export default function ChapterHeading({ index, path, title, intro, className = "" }: Props) {
  const reduce = useReduced();
  const anim = reduce
    ? {}
    : { initial: "hidden" as const, whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <motion.div className={`chapter-head ${className}`} variants={container} {...anim}>
      <motion.p className="chapter-eyebrow" variants={fade} aria-hidden="true">
        <span>{index}</span>&nbsp;&nbsp;~/{path}
      </motion.p>
      <h2 className="chapter-title">
        <span className="block overflow-hidden pb-[0.1em]">
          <motion.span className="block" variants={rise}>
            {title}
          </motion.span>
        </span>
      </h2>
      {intro && (
        <motion.p className="chapter-intro" variants={fade}>
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
