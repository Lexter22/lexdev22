"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useReduced } from "./scroll";
import ChapterHeading from "./ChapterHeading";
import Reveal from "./Reveal";
import ScrollStory from "./ScrollStory";

type Photo = { src: string; alt: string; width: number; height: number };

/**
 * Talks I've given and sessions I've run, newest first. Add new ones to the top.
 * They play one at a time as you scroll.
 */
const sessions: { kind: string; where: string; title: string; role: string; body: string; image: Photo }[] = [
  {
    kind: "Talk",
    where: "Asia Pacific College",
    title: "Getting hands-on with the AWS Console",
    role: "Speaker",
    body: "Tips for using the console well, especially cost management and finding open resources with Amazon Q.",
    image: { src: "/public-speaking.jpeg", alt: "Lex speaking at the Asia Pacific College podium", width: 2048, height: 1150 },
  },
  {
    kind: "Workshop",
    where: "AWS Student Builder Group, UPHSL",
    title: "Spec-driven development with Kiro",
    role: "Speaker, mentor and judge",
    body: "Explained spec-driven development, then mentored and judged the projects attendees built during the workshop.",
    image: { src: "/uphsl1.jpg", alt: "Lex talking with attendees at the UPHSL Kiro workshop", width: 1366, height: 768 },
  },
  {
    kind: "Workshop",
    where: "AWS SBG PUP Biñan",
    title: "Prompt. Spec. Deploy: Building your first app with Amazon Kiro",
    role: "Organizer",
    body: "A lab session for chapter members. I ran the room and helped attendees work through the exercises on their own machines.",
    image: { src: "/workshop1.jpg", alt: "Lex helping attendees at a hands-on workshop", width: 2048, height: 1716 },
  },
  {
    kind: "Seminar",
    where: "AWS SBG PUP Biñan",
    title: "Cloud 101: Introduction to AWS",
    role: "Organizer and main speaker · 100 participants",
    body: "An introduction to AWS for new members, delivered as the main speaker to a room of 100 participants.",
    image: {
      src: "/intro-to-aws.jpg",
      alt: "Lex speaking at Cloud 101 beside a slide reading Navigating your way into the Cloud",
      width: 2048,
      height: 1365,
    },
  },
];

const articles: { title: string; excerpt: string; date: string; source: string; url: string; cover: Photo }[] = [
  {
    title: "The AWS SCD South Experience: Built to Build, Grow, and Lead",
    excerpt: "My leadership journey at AWS Student Community Day: South Summit 2026.",
    date: "Oct 21, 2026",
    source: "AWS Builder Center",
    url: "https://builder.aws.com/comment/3L0QScWPOqVpGjSxtVK5TTJyINU",
    cover: { src: "/scd-south-group.webp", alt: "", width: 2962, height: 1664 },
  },
  {
    title: "I Couldn't Articulate Clearly, So I Built This",
    excerpt: "How the struggle to communicate led to building Articulately.",
    date: "Jul 10, 2026 · 6 min read",
    source: "AWS Builder Center",
    url: "https://builder.aws.com/content/3D741qzraId1EC9xYFet80pZPGk/i-couldnt-articulate-clearly-so-i-built-this",
    cover: { src: "/articles/articulately.webp", alt: "", width: 1000, height: 563 },
  },
];

/** Chapter events organized: the two chapter sessions plus Community Day. */
const EVENTS_ORGANIZED = sessions.filter((s) => s.where === "AWS SBG PUP Biñan").length + 1;

const stats: { value: number; label: string }[] = [
  { value: 300, label: "Chapter members" },
  { value: EVENTS_ORGANIZED, label: "Events organized" },
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

/** Chapter 04, Share: talks, workshops and writing. */
export default function CommunitySection() {
  return (
    <section id="community" className="chapter">
      <div className="container-site">
        <ChapterHeading
          id="community"
          title="Community & speaking"
          intro="I founded AWS Student Builder Group – PUP Biñan. I run its workshops and give talks on AWS and developer tooling at other schools."
        />

        <dl className="grid grid-cols-2 border-y border-[var(--color-border)] py-8">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              y={12}
              className={`flex flex-col ${i > 0 ? "border-l border-[var(--color-border)] pl-6" : ""}`}
            >
              <dt className="label order-2 mt-3">{s.label}</dt>
              <dd className="order-1 font-[family-name:var(--font-pixel)] text-[clamp(1.5rem,3.4vw,2.25rem)] leading-none text-[var(--accent)]">
                <CountUp to={s.value} />
              </dd>
            </Reveal>
          ))}
        </dl>

        <div className="mt-6">
          <ScrollStory
            items={sessions}
            getKey={(s) => s.title}
            noun="Talk"
            thumb={(s) => s.image.src}
            name={(s) => s.title}
            visual={(s) => (
              <img
                src={s.image.src}
                alt={s.image.alt}
                width={s.image.width}
                height={s.image.height}
                loading="lazy"
                className="aspect-[16/10] w-full rounded-[8px] border border-[var(--color-border)] object-cover"
              />
            )}
            step={(s) => (
              <>
                <p className="label">
                  <span className="text-[var(--color-text)]">{s.kind}</span>&nbsp;&nbsp;{s.where}
                </p>
                <h3 className="text-display mt-2 text-xl md:text-3xl">{s.title}</h3>
                <p className="mt-2 text-[13px] text-[var(--color-muted-light)]">{s.role}</p>
                <p className="mt-2 max-w-[46ch] text-sm leading-relaxed text-[var(--color-muted)] md:mt-4 md:text-[15px]">{s.body}</p>
              </>
            )}
          />
        </div>

        <div className="mt-10">
          <h3 className="label mb-4">Writing</h3>
          <ul className="grid gap-6 md:grid-cols-2">
            {articles.map((a, i) => (
              <li key={a.url}>
                <Reveal y={16} delay={i * 0.06} className="h-full">
                  <a
                    href={a.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="panel panel-hover group flex h-full flex-col overflow-hidden"
                  >
                    <span className="block overflow-hidden border-b border-[var(--color-border)]">
                      <img
                        src={a.cover.src}
                        alt={a.cover.alt}
                        width={a.cover.width}
                        height={a.cover.height}
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </span>
                    <span className="flex flex-1 flex-col p-5 sm:p-6">
                      <span className="label">{a.date}</span>
                      <span className="mt-3 block text-lg font-bold leading-snug text-[var(--color-text)] group-hover:text-[var(--accent)]">
                        {a.title}
                      </span>
                      <span className="mt-2 block text-sm leading-relaxed text-[var(--color-muted)]">{a.excerpt}</span>
                      <span className="mt-auto flex items-center justify-between pt-5 text-[12px]">
                        <span className="text-[var(--color-muted-light)]">{a.source}</span>
                        <span className="flex items-center gap-1 font-semibold text-[var(--accent)]">
                          Read
                          <ArrowUpRight size={14} aria-hidden="true" />
                        </span>
                      </span>
                      <span className="sr-only">(opens in a new tab)</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
