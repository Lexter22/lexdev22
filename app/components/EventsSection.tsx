"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { useReduced } from "./scroll";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import ScrollImage from "./ScrollImage";

/**
 * Events organized as founder of AWS Student Builder Group – PUP Biñan.
 * Add new events to the top of this list; `image` is optional.
 */
const events: {
  type: string;
  title: string;
  meta: string;
  body: string;
  image?: { src: string; alt: string; width: number; height: number };
  badge?: string;
}[] = [
  {
    type: "Workshop",
    title: "Hands-on AWS workshop",
    meta: "AWS SBG PUP Biñan · Organizer",
    body: "A lab session for chapter members. I ran the room and helped attendees work through the exercises on their own machines.",
    image: { src: "/workshop1.jpg", alt: "Lex helping attendees at a hands-on workshop", width: 2048, height: 1716 },
  },
  {
    type: "Seminar",
    title: "Cloud 101: Introduction to AWS",
    meta: "AWS SBG PUP Biñan · Organizer and main speaker",
    body: "An introduction to AWS for new members of the chapter, with 100 participants in the room.",
    badge: "100",
  },
];

const stats = [
  { value: 300, label: "Chapter members" },
  { value: events.length, label: "Events organized" },
  { value: 100, label: "Attendees at Cloud 101" },
  { value: null, text: "Gold", label: "AWS Cloud Clubs Captain" },
];

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReduced();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration: 1.2, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return (
    <span ref={ref} className="tabular-nums">
      {reduce ? to : n}
    </span>
  );
}

export default function EventsSection() {
  return (
    <section id="events" className="chapter tone-pink">
      <div className="container-site">
        <ChapterHeading
          index="04"
          path="events"
          title="Events"
          intro="Events I've organized as founder and chapter lead of AWS Student Builder Group – PUP Biñan, Nov 2025 to present."
        />

        <div className="mb-6 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-[var(--color-border)] bg-[var(--color-border)] lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06} y={12} className="bg-[var(--bg)] px-4 py-5 sm:px-5">
              <p className="font-[family-name:var(--font-pixel)] text-[clamp(1.25rem,3vw,1.75rem)] text-[var(--tone)]">
                {s.value !== null ? <CountUp to={s.value} /> : s.text}
              </p>
              <p className="mt-2 text-[11px] uppercase tracking-wider text-[var(--color-muted)]">{s.label}</p>
            </Reveal>
          ))}
        </div>

        <ul className="grid gap-4 md:grid-cols-2">
          {events.map((e) => (
            <li key={e.title} className="panel flex flex-col overflow-hidden">
              {e.image ? (
                <ScrollImage {...e.image} className="aspect-[16/10] w-full" />
              ) : (
                <div className="flex aspect-[16/10] w-full flex-col justify-between border-b border-[var(--color-border)] bg-[var(--bg)] p-5">
                  <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-[var(--color-muted-light)]">
                    Attendees
                  </span>
                  <span className="font-[family-name:var(--font-pixel)] text-[clamp(3rem,8vw,5.5rem)] leading-none text-[var(--tone)]">
                    {e.badge}
                  </span>
                </div>
              )}
              <div className="flex flex-1 flex-col p-5">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--tone)]">{e.type}</p>
                <h3 className="text-display text-lg text-[var(--color-text)]">{e.title}</h3>
                <p className="mt-1 text-[12px] text-[var(--color-muted-light)]">{e.meta}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">{e.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
