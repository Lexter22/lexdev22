"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { chapter } from "./chapters";
import { useLerp, useReduced } from "./scroll";

/** Final position. Set explicitly: the server HTML starts faded, and dropping the style would leave it faded. */
const REST = { y: 0, opacity: 1 };

type Props = {
  /** Chapter id from chapters.ts; supplies the number and story label. */
  id: string;
  title: string;
  intro?: string;
  className?: string;
};

/**
 * Chapter number and story label, then the title and an optional intro, as one left-aligned unit.
 * Scroll-driven: as the heading travels from the bottom of the screen to about 55% up, the rule
 * beside the chapter number draws, the title rises into place and the intro follows. Scrolling
 * back up reverses it. With reduced motion everything is simply shown.
 */
export default function ChapterHeading({ id, title, intro, className = "" }: Props) {
  const reduce = useReduced();
  const c = chapter(id);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 55%"] });

  // Each line moves over its own slice of the same scroll, so they arrive one after another.
  const rule = useLerp(scrollYProgress, [0.1, 0.7], [0, 1]);
  const titleY = useLerp(scrollYProgress, [0, 0.8], [40, 0]);
  const titleO = useLerp(scrollYProgress, [0, 0.6], [0.15, 1]);
  const introY = useLerp(scrollYProgress, [0.25, 1], [24, 0]);
  const introO = useLerp(scrollYProgress, [0.25, 1], [0.15, 1]);

  return (
    <div ref={ref} className={`chapter-head ${className}`}>
      <p className="chapter-eyebrow">
        <span>{c.n}</span>
        <motion.span
          aria-hidden="true"
          className="chapter-eyebrow-rule origin-left"
          style={reduce ? { scaleX: 1 } : { scaleX: rule }}
        />
        {c.label}
      </p>
      <motion.h2 className="chapter-title" style={reduce ? REST : { y: titleY, opacity: titleO }}>
        {title}
      </motion.h2>
      {intro && (
        <motion.p className="chapter-intro" style={reduce ? REST : { y: introY, opacity: introO }}>
          {intro}
        </motion.p>
      )}
    </div>
  );
}
