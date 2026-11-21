"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useReduced } from "./scroll";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";

type Photo = { src: string; alt: string; width: number; height: number };

/** The big one: group photo and the facts. */
const communityDay = {
  title: "AWS Student Community Day",
  edition: "South Summit 2026",
  tagline: "Cloud × AI: Build. Grow. Lead.",
  facts: [
    { label: "Date", value: "Oct 7, 2026" },
    { label: "Attendees", value: "200" },
    { label: "Role", value: "Event Director" },
    { label: "Venue", value: "Biñan People's Center Auditorium" },
  ],
  contributions: [
    "Led an event, managing 80 volunteers and 200 attendees",
    "Brought in the sponsors that supported the event",
  ],
  group: {
    src: "/scd-south-group.webp",
    alt: "Attendees and organizers posing together on stage in front of the South Summit 2026 screen",
    width: 2962,
    height: 1664,
  },
};

/**
 * Chapter events at AWS Student Builder Group – PUP Biñan.
 * Add new events to the top of this list.
 */
const chapterEvents: { type: string; title: string; meta: string; body: string; image: Photo }[] = [
  {
    type: "Workshop",
    title: "PROPMPT. SPEC. DEPLOY: Building your first app with Amazon Kiro",
    meta: "Organizer",
    body: "A lab session for chapter members. I ran the room and helped attendees work through the exercises on their own machines.",
    image: { src: "/workshop1.jpg", alt: "Lex helping attendees at a hands-on workshop", width: 2048, height: 1716 },
  },
  {
    type: "Seminar",
    title: "Cloud 101: Introduction to AWS",
    meta: "Organizer and main speaker · 100 participants",
    body: "An introduction to AWS for new members, delivered as the main speaker to a room of 100 participants.",
    image: {
      src: "/intro-to-aws.jpg",
      alt: "Lex speaking at Cloud 101 beside a slide reading Navigating your way into the Cloud",
      width: 2048,
      height: 1365,
    },
  },
];

const stats = [
  { value: 300, label: "Chapter members" },
  { value: chapterEvents.length + 1, label: "Events organized" },
  { value: 200, label: "Community Day attendees" },
  { value: null, text: "Zenith", label: "AWS SBG Leader badge" },
];

/** Issued by AWS Community. Descriptions follow the badge pages on Credly. */
const badges = [
  {
    src: "/aws-sbg-zenith-badge.png",
    name: "AWS SBG Zenith",
    alt: "AWS Student Builder Group Zenith badge",
    how: "Earned by Student Builder Group Leaders after hosting a Student Community Day and nominating a successor.",
    href: "https://www.credly.com/org/aws-community/badge/aws-sbg-zenith-badge",
  },
  {
    src: "/aws-sbg-surge-badge.png",
    name: "AWS SBG Surge",
    alt: "AWS Student Builder Group Surge badge",
    how: "Earned by Student Builder Group Leaders after hosting their third event.",
    href: "https://www.credly.com/org/aws-community/badge/aws-sbg-surge-badge",
  },
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

/** Small label with a hairline running to the edge. Separates the block groups. */
function GroupLabel({ children, note }: { children: React.ReactNode; note?: string }) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h3 className="chapter-eyebrow !mb-0 shrink-0">{children}</h3>
      <span aria-hidden="true" className="h-px flex-1 bg-[var(--color-border)]" />
      {note && <p className="hidden shrink-0 text-[12px] text-[var(--color-muted-light)] sm:block">{note}</p>}
    </div>
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
          intro="AWS Student Community Day, which I directed, and the workshops I run as founder of AWS Student Builder Group – PUP Biñan."
        />

        {/* Numbers: no boxes, just figures separated by hairlines */}
        <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-y border-[var(--color-border)] py-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              y={12}
              className="lg:border-l lg:border-[var(--color-border)] lg:pl-6 lg:first:border-l-0 lg:first:pl-0"
            >
              <dd className="font-[family-name:var(--font-pixel)] text-[clamp(1.25rem,3vw,1.75rem)] text-[var(--accent)]">
                {s.value !== null ? <CountUp to={s.value} /> : s.text}
              </dd>
              <dt className="mt-3 text-[11px] uppercase tracking-wider text-[var(--color-muted)]">{s.label}</dt>
            </Reveal>
          ))}
        </dl>

        {/* AWS Student Community Day */}
        <article className="mt-16 md:mt-24" aria-labelledby="community-day-title">
          <Reveal>
            <p className="chapter-eyebrow">Community Day</p>
            <h3
              id="community-day-title"
              className="text-display text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.05]"
            >
              {communityDay.title}
            </h3>
            <p className="text-display mt-1 text-[clamp(1.75rem,4.5vw,3rem)] leading-[1.05] text-[var(--accent)]">
              {communityDay.edition}
            </p>
            <p className="mt-6 text-base text-[var(--color-muted)]">{communityDay.tagline}</p>
          </Reveal>

          <Reveal delay={0.08} className="mt-10 grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
            <img
              src={communityDay.group.src}
              alt={communityDay.group.alt}
              width={communityDay.group.width}
              height={communityDay.group.height}
              loading="lazy"
              className="aspect-[16/10] w-full rounded-[6px] object-cover lg:col-span-7"
            />
            <div className="lg:col-span-5">
              <dl className="grid grid-cols-2 gap-x-6 gap-y-6 border-t border-[var(--color-border)] pt-6">
                {communityDay.facts.map((f) => (
                  <div key={f.label} className={f.label === "Venue" ? "col-span-2" : ""}>
                    <dt className="text-[11px] uppercase tracking-wider text-[var(--color-muted-light)]">{f.label}</dt>
                    <dd className="mt-2 text-base font-semibold text-[var(--color-text)]">{f.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 border-t border-[var(--color-border)] pt-6">
                <p className="text-[11px] uppercase tracking-wider text-[var(--color-muted-light)]">What I did</p>
                <ul className="mt-3 space-y-3 text-base text-[var(--color-text)]">
                  {communityDay.contributions.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </article>

        {/* Chapter events: one row each, image beside text */}
        <div className="mt-20 md:mt-28">
          <GroupLabel note="AWS SBG PUP Biñan">Chapter events</GroupLabel>
          <ul>
            {chapterEvents.map((e) => (
              <li
                key={e.title}
                className="grid items-center gap-6 border-t border-[var(--color-border)] py-8 first:border-t-0 first:pt-0 md:grid-cols-12 md:gap-10 md:py-10"
              >
                <img
                  src={e.image.src}
                  alt={e.image.alt}
                  width={e.image.width}
                  height={e.image.height}
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-[6px] object-cover md:col-span-5"
                />
                <Reveal className="md:col-span-7">
                  <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--tone)]">{e.type}</p>
                  <h4 className="text-display text-lg md:text-xl">{e.title}</h4>
                  <p className="mt-2 text-[13px] text-[var(--color-muted-light)]">{e.meta}</p>
                  <p className="mt-4 max-w-[52ch] text-sm leading-relaxed text-[var(--color-muted)]">{e.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        {/* Recognition */}
        <div className="mt-20 md:mt-28">
          <GroupLabel>AWS Community badges</GroupLabel>
          <ul className="grid gap-10 md:grid-cols-2 md:gap-16">
            {badges.map((b, i) => (
              <li key={b.name}>
                <Reveal delay={i * 0.06} y={12} className="flex items-start gap-5">
                  <img
                    src={b.src}
                    alt={b.alt}
                    width={88}
                    height={88}
                    loading="lazy"
                    className="h-[72px] w-[72px] shrink-0 rounded-[4px] sm:h-[88px] sm:w-[88px]"
                  />
                  <div className="min-w-0">
                    <h4 className="text-display text-base">{b.name}</h4>
                    <p className="mt-2 max-w-[44ch] text-sm leading-relaxed text-[var(--color-muted)]">{b.how}</p>
                    <a
                      href={b.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex min-h-11 items-center gap-1 text-[13px] font-bold text-[var(--accent)] underline-offset-4 hover:underline"
                    >
                      View on Credly
                      <ArrowUpRight size={14} aria-hidden="true" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
