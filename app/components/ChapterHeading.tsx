"use client";

import { motion, type Variants } from "motion/react";
import { useReduced } from "./scroll";

const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
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
  /** Put the intro beside the title on wide screens. */
  split?: boolean;
  className?: string;
};

/** Chapter number + plain title + optional intro. Colors come from the section's tone. */
export default function ChapterHeading({ index, path, title, intro, split = true, className = "" }: Props) {
  const reduce = useReduced();
  const anim = reduce
    ? {}
    : { initial: "hidden" as const, whileInView: "show" as const, viewport: { once: true, amount: 0.5 } };

  return (
    <motion.div
      className={`chapter-head ${split && intro ? "chapter-head--split" : ""} ${className}`}
      variants={container}
      {...anim}
    >
      <div>
        <motion.p className="chapter-eyebrow" variants={fade} aria-hidden="true">
          <span>{index}</span>&nbsp;&nbsp;~/{path}
        </motion.p>
        <h2 className="chapter-title flex items-center gap-3">
          <motion.span
            aria-hidden="true"
            className="inline-block h-[0.7em] w-[0.7em] shrink-0 bg-[var(--tone)]"
            variants={fade}
          />
          <span className="block overflow-hidden pb-[0.1em]">
            <motion.span className="block" variants={rise}>
              {title}
            </motion.span>
          </span>
        </h2>
      </div>
      {intro && (
        <motion.p className="chapter-intro" variants={fade}>
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
