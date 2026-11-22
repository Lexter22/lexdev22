"use client";

import { useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { chapters } from "./chapters";
import { useClamped, useReduced } from "./scroll";
import { useActiveChapter } from "./useActiveChapter";

/**
 * Slim chapter index on the right edge (xl+). The line fills with overall scroll,
 * the active chapter is blue, and its name shows once the margin is wide enough.
 * Hovering or focusing a node previews the chapter.
 */
export default function ChapterRail() {
  const active = useActiveChapter();
  const [hovered, setHovered] = useState<string | null>(null);
  const reduce = useReduced();
  const { scrollYProgress } = useScroll();
  const fill = useClamped(scrollYProgress);

  return (
    <nav aria-label="Chapters" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ol className="relative flex flex-col gap-1">
        <span aria-hidden="true" className="absolute bottom-3 right-[4px] top-3 w-px bg-[var(--color-border-strong)]" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-3 right-[4px] top-3 w-px origin-top bg-[var(--sky)]"
          style={{ scaleY: fill }}
        />
        {chapters.map((c) => {
          const isActive = c.id === active;
          const isOpen = hovered === c.id && !isActive;
          return (
            <li key={c.id} onMouseEnter={() => setHovered(c.id)} onMouseLeave={() => setHovered(null)}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "location" : undefined}
                className="group relative flex min-h-8 items-center justify-end gap-3"
                onFocus={() => setHovered(c.id)}
                onBlur={() => setHovered(null)}
              >
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={reduce ? false : { opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 6 }}
                      transition={{ duration: 0.16 }}
                      className="panel absolute right-16 flex w-[184px] items-center gap-3 overflow-hidden p-2"
                    >
                      <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-[3px] bg-[var(--bg)]">
                        {c.image ? (
                          <img src={c.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-sm font-bold text-[var(--sky)]">
                            {c.n}
                          </span>
                        )}
                      </span>
                      <span className="truncate text-[12px] font-semibold uppercase tracking-wider text-[var(--color-text)]">
                        {c.label}
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active chapter name: only where the side margin has room for it */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="hidden text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--accent)] min-[1440px]:inline"
                  >
                    {c.label}
                  </span>
                )}
                <span
                  aria-hidden="true"
                  className={`w-5 text-right text-[10px] font-semibold tabular-nums ${
                    isActive ? "text-[var(--accent)]" : "text-[var(--color-muted-light)] group-hover:text-[var(--color-text)]"
                  }`}
                >
                  {c.n}
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-[9px] w-[9px] rotate-45 border transition-colors duration-300 ${
                    isActive
                      ? "border-[var(--accent)] bg-[var(--accent)]"
                      : "border-[var(--color-border-strong)] bg-[var(--bg)] group-hover:border-[var(--sky)]"
                  }`}
                />
                <span className="sr-only">
                  {c.n} {c.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
