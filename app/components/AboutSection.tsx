"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import ChapterHeading from "./ChapterHeading";
import { useInset, useLerp, useReduced } from "./scroll";

const talks = [
  {
    image: "/public-speaking.jpeg",
    alt: "Lex speaking at the Asia Pacific College podium",
    where: "Asia Pacific College",
    title: "Getting hands-on with the AWS Console",
    body: "Tips for using the console well, especially cost management and finding open resources with Amazon Q.",
  },
  {
    image: "/uphsl1.jpg",
    alt: "Lex talking with attendees at the UPHSL Kiro workshop",
    where: "AWS Student Builder Group, UPHSL",
    title: "Spec-driven development with Kiro",
    body: "Explained spec-driven development, then mentored and judged the projects attendees built during the workshop.",
  },
];

const N = talks.length;

const heading = {
  index: "01",
  path: "about",
  title: "About",
  intro:
    "I'm a BSIT student at PUP Biñan and founder of the AWS Student Builder Group on campus. I build backend systems and cloud infrastructure, and I give talks on AWS and developer tooling at other schools.",
};

/** Each photo fades in over the previous one, then its frame opens up as you keep scrolling. */
function ReelImage({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const t = talks[i];
  // Offsets must stay inside 0..1: motion hands these to WAAPI scroll timelines
  const enter = Math.max(0, (i - 0.2) / N);
  const settle = (i + 0.7) / N;
  const opacity = useLerp(progress, i === 0 ? [0, 1] : [enter, i / N], i === 0 ? [1, 1] : [0, 1]);
  const clipPath = useInset(progress, [enter, settle], [12, 10, 12, 10]);
  const scale = useLerp(progress, [enter, (i + 1) / N], [1.2, 1]);

  return (
    <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity, clipPath, zIndex: i }}>
      <motion.img
        src={t.image}
        alt=""
        width={1600}
        height={900}
        className="h-full w-full object-cover"
        style={{ scale }}
        loading={i === 0 ? "eager" : "lazy"}
      />
    </motion.div>
  );
}

function StepBar({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const scaleX = useTransform(progress, (p) => Math.min(1, Math.max(0, p * N - i)));
  return (
    <span className="relative h-0.5 flex-1 overflow-hidden bg-[var(--color-border-strong)]">
      <motion.span className="absolute inset-0 origin-left bg-[var(--tone)]" style={{ scaleX }} />
    </span>
  );
}

export default function AboutSection() {
  const reduce = useReduced();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(N - 1, Math.floor(p * N));
    setActive((cur) => (cur === next ? cur : next));
  });

  if (reduce) {
    return (
      <section id="about" className="chapter tone-amber">
        <div className="container-site">
          <ChapterHeading {...heading} />
          <div className="grid gap-4 md:grid-cols-2">
            {talks.map((t) => (
              <article key={t.image} className="panel overflow-hidden">
                <img src={t.image} alt={t.alt} width={1600} height={900} className="aspect-video w-full object-cover" loading="lazy" />
                <div className="p-4">
                  <p className="chapter-eyebrow mb-1.5">Talk · {t.where}</p>
                  <h3 className="text-base font-bold text-[var(--color-text)]">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--color-muted)]">{t.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const talk = talks[active];

  return (
    <section id="about" className="tone-amber relative border-t border-[var(--color-border)]">
      <div ref={track} className="relative h-[230svh]">
        <div className="sticky top-14 flex h-[calc(100svh-3.5rem)] items-center overflow-hidden py-6">
          <div className="container-site grid w-full items-center gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
            <div>
              <ChapterHeading {...heading} split={false} className="!mb-6" />

              <div className="border-t border-[var(--color-border)] pt-4" aria-live="polite">
                <div className="min-h-[7.5rem]">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--tone)]">
                        Talk {active + 1} of {N} · {talk.where}
                      </p>
                      <h3 className="text-base font-bold leading-snug text-[var(--color-text)] md:text-lg">{talk.title}</h3>
                      <p className="mt-1.5 max-w-[50ch] text-sm leading-relaxed text-[var(--color-muted)]">{talk.body}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="mt-3 flex gap-2" aria-hidden="true">
                  {talks.map((t, i) => (
                    <StepBar key={t.image} i={i} progress={scrollYProgress} />
                  ))}
                </div>
              </div>
            </div>

            <figure className="relative">
              <div
                role="img"
                aria-label={talk.alt}
                className="relative aspect-video max-h-[40svh] w-full overflow-hidden rounded-[6px] border border-[var(--color-border-strong)] bg-[var(--bg-alt)] lg:aspect-[4/3] lg:max-h-[72svh]"
              >
                {talks.map((t, i) => (
                  <ReelImage key={t.image} i={i} progress={scrollYProgress} />
                ))}
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
