"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

type Props<T> = {
  items: T[];
  getKey: (item: T) => string;
  getName: (item: T) => string;
  render: (item: T) => ReactNode;
  /** Shown above the row inside the pinned area (e.g. filter chips). */
  before?: ReactNode;
  /** Used in labels, e.g. "project". */
  noun: string;
};

/** Height of the fixed header; the pinned area starts below it. */
const HEADER = 56;

const pad = (v: number) => String(v).padStart(2, "0");

/**
 * Scroll-driven horizontal gallery. The area pins below the header and scrolling down
 * slides the row sideways, one pixel of scroll per pixel of travel. Swiping sideways on the
 * row (touch or trackpad) drives the same page scroll, so both gestures stay in sync.
 * Native scrolling throughout: nothing snaps or locks the page.
 */
export default function ScrollGallery<T>({ items, getKey, getName, render, before, noun }: Props<T>) {
  const outer = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [travel, setTravel] = useState(0);
  const [index, setIndex] = useState(0);
  const progress = useMotionValue(0);
  const x = useTransform(progress, (p) => -p * travel);
  const n = items.length;

  const cards = () => [...(track.current?.querySelectorAll<HTMLElement>(":scope > [data-card]") ?? [])];

  // How far the row has to slide: its full width minus what fits on screen.
  useEffect(() => {
    const measure = () => {
      if (!track.current || !viewport.current) return;
      const cs = getComputedStyle(viewport.current);
      const visible = viewport.current.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      setTravel(Math.max(0, track.current.scrollWidth - visible));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (track.current) ro.observe(track.current);
    if (viewport.current) ro.observe(viewport.current);
    return () => ro.disconnect();
  }, [n]);

  // Page scroll -> progress through the row.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = outer.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const span = r.height - (window.innerHeight - HEADER);
      const p = span > 0 ? Math.min(1, Math.max(0, (HEADER - r.top) / span)) : 0;
      progress.set(p);
      const left = p * travel;
      const list = cards();
      const i = list.findIndex((c) => c.offsetLeft + c.offsetWidth / 2 > left);
      setIndex(p >= 0.999 ? n - 1 : Math.max(0, i));
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
  }, [travel, n, progress]);

  // Sideways swipes and trackpad gestures on the row scroll the page by the same amount.
  useEffect(() => {
    const el = viewport.current;
    if (!el) return;
    let sx = 0;
    let sy = 0;
    let lastX = 0;
    let horizontal: boolean | null = null;
    const onStart = (e: TouchEvent) => {
      sx = lastX = e.touches[0].clientX;
      sy = e.touches[0].clientY;
      horizontal = null;
    };
    const onMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (horizontal === null) {
        const dx = Math.abs(t.clientX - sx);
        const dy = Math.abs(t.clientY - sy);
        if (dx < 6 && dy < 6) return;
        horizontal = dx > dy;
      }
      if (!horizontal) return;
      e.preventDefault();
      window.scrollBy(0, lastX - t.clientX);
      lastX = t.clientX;
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      window.scrollBy(0, e.deltaX);
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: false });
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("wheel", onWheel);
    };
  }, []);

  /** Scroll the page to where card i reaches the left edge. */
  const goTo = useCallback(
    (i: number) => {
      const el = outer.current;
      const card = cards()[i];
      if (!el || !card) return;
      const span = el.offsetHeight - (window.innerHeight - HEADER);
      const p = travel > 0 ? Math.min(1, card.offsetLeft / travel) : 0;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER;
      window.scrollTo({ top: top + p * span + 1 });
    },
    [travel],
  );

  return (
    <div ref={outer} className="relative" style={{ height: `calc(100svh - ${HEADER}px + ${travel}px)` }}>
      <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] flex-col justify-center py-4">
        {before}
        {/* Phones: the row runs to the screen edges. Desktop: clipped to the content column. */}
        <div ref={viewport} className="-mx-4 touch-pan-y overflow-x-clip px-4 md:-mx-6 md:px-6 lg:mx-0 lg:px-0">
          <motion.ul
            ref={track}
            style={{ x }}
            aria-label={`${noun}s: scroll, swipe or use the arrows for more`}
            className="flex w-max gap-4 lg:gap-5"
          >
            {items.map((item, i) => (
              <li
                key={getKey(item)}
                data-card
                onFocus={() => goTo(i)}
                className="w-[min(84vw,22rem)] shrink-0 sm:w-[min(58vw,24rem)] lg:w-[min(36vw,26rem)]"
              >
                {render(item)}
              </li>
            ))}
          </motion.ul>
        </div>

        {n > 1 && (
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ol className="flex items-center">
                {items.map((item, i) => {
                  const on = i === index;
                  return (
                    <li key={getKey(item)}>
                      <button
                        type="button"
                        onClick={() => goTo(i)}
                        aria-label={`Show ${noun} ${i + 1} of ${n}: ${getName(item)}`}
                        aria-current={on ? "true" : undefined}
                        className="group flex h-11 min-w-6 items-center justify-center px-1"
                      >
                        <span
                          className={`block h-1.5 rounded-full transition-all duration-300 ${
                            on ? "w-6 bg-[var(--accent)]" : "w-1.5 bg-[var(--color-border-strong)] group-hover:bg-[var(--sky)]"
                          }`}
                        />
                      </button>
                    </li>
                  );
                })}
              </ol>
              <p className="text-[12px] font-semibold tabular-nums" aria-live="polite">
                <span className="text-[var(--color-text)]">{pad(index + 1)}</span>
                <span className="text-[var(--color-muted-light)]"> / {pad(n)}</span>
                <span className="sr-only"> {noun}s</span>
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                disabled={index === 0}
                aria-label={`Previous ${noun}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowLeft size={16} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                disabled={index >= n - 1}
                aria-label={`Next ${noun}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border-strong)] text-[var(--color-text)] hover:border-[var(--accent)] hover:text-[var(--accent)] disabled:pointer-events-none disabled:opacity-35"
              >
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
