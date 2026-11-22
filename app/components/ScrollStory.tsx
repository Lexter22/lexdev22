"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";

type Props<T> = {
  items: T[];
  getKey: (item: T) => string;
  /** The picture for a step. */
  visual: (item: T, index: number) => ReactNode;
  /** The words for a step. */
  step: (item: T, index: number) => ReactNode;
  /** Used in labels, e.g. "talk". */
  noun: string;
  /** Small image for the step index. */
  thumb: (item: T) => string;
  /** Short name shown under the active thumbnail. */
  name: (item: T) => string;
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Scroll distance per step, in svh. */
const STEP = 55;

const MOBILE = "(max-width: 767px)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(MOBILE);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** Hydration-safe: the server renders the desktop version, phones switch right after load. */
function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE).matches,
    () => false,
  );
}

/**
 * Scroll-driven story, the same on every screen size. The stage sticks below the header
 * and each stretch of normal vertical scrolling brings in the next item. Plain CSS sticky;
 * the page is never hijacked or snapped.
 * On mobile (<768px) it renders as a simple vertical stack so you see more content at once
 * instead of one giant sticky step per screen.
 */
export default function ScrollStory<T>({ items, getKey, visual, step, noun, thumb, name }: Props<T>) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = items.length;
  const isMobile = useIsMobile();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const travel = r.height - window.innerHeight;
      const p = travel > 0 ? Math.min(0.999, Math.max(0, -r.top / travel)) : 0;
      setActive(Math.floor(p * n));
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
  }, [n]);

  if (isMobile) {
    return (
      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={getKey(item)} className="grid gap-4 lg:grid-cols-12 lg:gap-14">
            <div className="lg:order-2 lg:col-span-7">{visual(item, i)}</div>
            <div className="lg:order-1 lg:col-span-5">{step(item, i)}</div>
          </div>
        ))}
      </div>
    );
  }

  /** Scroll the page to the middle of step i. */
  const goTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const travel = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (travel * (i + 0.5)) / n });
  };

  return (
    <div ref={ref} className="relative" style={{ height: `calc(100svh + ${(n - 1) * STEP}svh)` }}>
      <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] max-h-[60svh] flex-col justify-center py-4">
        <div className="grid">
          {items.map((item, i) => {
            const on = i === active;
            return (
              <div
                key={getKey(item)}
                inert={!on}
                aria-hidden={!on}
                className={`grid items-center gap-5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] [grid-area:1/1] lg:grid-cols-12 lg:gap-14 ${
                  on ? "translate-y-0 opacity-100" : i < active ? "-translate-y-3 opacity-0" : "translate-y-3 opacity-0"
                }`}
              >
                <div className="lg:order-2 lg:col-span-7">{visual(item, i)}</div>
                <div className="lg:order-1 lg:col-span-5">{step(item, i)}</div>
              </div>
            );
          })}
        </div>

        {/* Step index: a thumbnail per item, the current one lit. Tap to jump. */}
        <div className="mt-5 flex items-center gap-3 lg:mt-8 lg:w-5/12 lg:pr-7">
          <ol className="flex gap-2">
            {items.map((item, i) => {
              const on = i === active;
              return (
                <li key={getKey(item)}>
                  <button
                    type="button"
                    onClick={() => goTo(i)}
                    aria-label={`${noun} ${i + 1} of ${n}: ${name(item)}`}
                    aria-current={on ? "step" : undefined}
                    className={`relative block h-11 w-11 overflow-hidden rounded-[6px] border-2 transition-[border-color,opacity] duration-300 sm:w-14 ${
                      on ? "border-[var(--accent)] opacity-100" : "border-transparent opacity-45 hover:opacity-80"
                    }`}
                  >
                    <img src={thumb(item)} alt="" loading="lazy" className="h-full w-full object-cover" />
                  </button>
                </li>
              );
            })}
          </ol>
          <p className="min-w-0 text-[11px] font-semibold tabular-nums" aria-hidden="true">
            <span className="text-[var(--accent)]">{pad(active + 1)}</span>
            <span className="text-[var(--color-muted-light)]"> / {pad(n)}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
