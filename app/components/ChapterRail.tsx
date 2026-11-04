"use client";

import { useEffect, useState } from "react";
import { motion, useScroll } from "motion/react";
import { useClamped } from "./scroll";

const chapters = [
  { id: "top", label: "Start" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "events", label: "Events" },
  { id: "education", label: "Education" },
  { id: "articles", label: "Articles" },
  { id: "contact", label: "Contact" },
];

/** Fixed chapter index on wide screens; tracks the chapter in view. */
export default function ChapterRail() {
  const [active, setActive] = useState("top");
  const { scrollYProgress } = useScroll();
  const fill = useClamped(scrollYProgress);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.4;
      let current = chapters[0].id;
      for (const c of chapters) {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= line) current = c.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <nav aria-label="Chapters" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ol className="relative flex flex-col gap-[18px]">
        <span aria-hidden="true" className="absolute bottom-1 right-[5px] top-1 w-px bg-[var(--color-border-strong)]" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-1 right-[5px] top-1 w-px origin-top bg-[var(--color-accent)]"
          style={{ scaleY: fill }}
        />
        {chapters.map((c) => {
          const isActive = c.id === active;
          return (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "location" : undefined}
                className="group relative flex items-center justify-end gap-3"
              >
                <span
                  className={`text-[10px] font-semibold uppercase tracking-[0.18em] transition-opacity duration-300 ${
                    isActive
                      ? "text-[var(--color-text)] opacity-100"
                      : "text-[var(--color-muted)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
                  }`}
                >
                  {c.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`relative h-[11px] w-[11px] rotate-45 border transition-all duration-300 ${
                    isActive
                      ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                      : "border-[var(--color-border-strong)] bg-[var(--bg)] group-hover:border-[var(--color-accent)]"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
