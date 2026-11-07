"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "motion/react";
import { useClamped } from "./scroll";

type Chapter = { id: string; label: string; n: string; image?: string };

const chapters: Chapter[] = [
  { id: "top", label: "Start", n: "00" },
  { id: "about", label: "About", n: "01", image: "/public-speaking.jpeg" },
  { id: "projects", label: "Projects", n: "02" },
  { id: "experience", label: "Experience", n: "03" },
  { id: "events", label: "Events", n: "04", image: "/intro-to-aws.jpg" },
  { id: "education", label: "Education", n: "05" },
  { id: "articles", label: "Articles", n: "06" },
  { id: "contact", label: "Contact", n: "07" },
];

/**
 * Gallery-style chapter index (xl+). Each node previews its destination:
 * hovering or focusing a node pops a thumbnail card with the section name.
 */
export default function ChapterRail() {
  const [active, setActive] = useState("top");
  const [hovered, setHovered] = useState<string | null>(null);
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
    <nav aria-label="Chapters" className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ol className="relative flex flex-col gap-2">
        <span aria-hidden="true" className="absolute bottom-2 right-[4px] top-2 w-px bg-[var(--color-border-strong)]" />
        <motion.span
          aria-hidden="true"
          className="absolute bottom-2 right-[4px] top-2 w-px origin-top bg-[var(--c-green)]"
          style={{ scaleY: fill }}
        />
        {chapters.map((c) => {
          const isActive = c.id === active;
          const isOpen = hovered === c.id;
          return (
            <li key={c.id} onMouseEnter={() => setHovered(c.id)} onMouseLeave={() => setHovered(null)}>
              <a
                href={`#${c.id}`}
                aria-current={isActive ? "location" : undefined}
                className="group relative flex items-center justify-end py-1.5 pr-[1px]"
                onFocus={() => setHovered(c.id)}
                onBlur={() => setHovered(null)}
              >
                {/* Gallery preview card */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.span
                      initial={{ opacity: 0, x: 8, scale: 0.96 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                      className="panel absolute right-7 flex w-[188px] items-center gap-3 overflow-hidden p-2"
                    >
                      <span className="relative h-11 w-16 shrink-0 overflow-hidden rounded-[4px] bg-[var(--bg)]">
                        {c.image ? (
                          <img src={c.image} alt="" className="h-full w-full object-cover" />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center font-[family-name:var(--font-mono)] text-sm font-bold text-[var(--c-green)]">
                            {c.n}
                          </span>
                        )}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[10px] text-[var(--color-muted-light)]">~/{c.id}</span>
                        <span className="block truncate text-sm font-semibold text-[var(--color-text)]">{c.label}</span>
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>

                <span
                  aria-hidden="true"
                  className={`relative h-[10px] w-[10px] rotate-45 border transition-all duration-300 ${
                    isActive
                      ? "scale-110 border-[var(--c-green)] bg-[var(--c-green)]"
                      : isOpen
                        ? "border-[var(--c-green)] bg-[var(--bg)]"
                        : "border-[var(--color-border-strong)] bg-[var(--bg)]"
                  }`}
                />
                <span className="sr-only">{c.label}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
