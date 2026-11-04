"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useMotionValueEvent, useScroll, type MotionValue } from "motion/react";
import { useInset, useLerp, useReduced } from "./scroll";

/* ---------- Terminal script ---------- */

type Tone = "text" | "muted" | "green" | "amber" | "blue";
type Step =
  | { kind: "cmd"; host: "local" | "remote"; text: string }
  | { kind: "out"; segs: [string, Tone][] };

const toneClass: Record<Tone, string> = {
  text: "text-[var(--color-text)]",
  muted: "text-[var(--color-muted-light)]",
  green: "text-[var(--c-green)]",
  amber: "text-[var(--c-amber)]",
  blue: "text-[var(--c-blue)]",
};

const script: Step[] = [
  { kind: "cmd", host: "local", text: "ssh lex@portfolio" },
  { kind: "out", segs: [["Connected to portfolio. Last login from Biñan, Laguna.", "muted"]] },
  { kind: "cmd", host: "remote", text: "whoami" },
  { kind: "out", segs: [["John Lexter B. Reyes", "text"]] },
  { kind: "cmd", host: "remote", text: "cat role.txt" },
  {
    kind: "out",
    segs: [
      ["AWS Student Builder Group Lead", "amber"],
      ["  ·  ", "muted"],
      ["Cloud Engineer", "blue"],
    ],
  },
  { kind: "cmd", host: "remote", text: "ls" },
  {
    kind: "out",
    segs: [["about/  projects/  experience/  events/  education/  articles/  contact/", "blue"]],
  },
  { kind: "cmd", host: "remote", text: "./portfolio --open" },
];

/** An output line "costs" this many units, which reads as a short pause. */
const OUT_UNITS = 6;
const starts: number[] = [];
let TOTAL = 0;
for (const s of script) {
  starts.push(TOTAL);
  TOTAL += s.kind === "cmd" ? s.text.length : OUT_UNITS;
}
/** The first command and its output type themselves on load. */
const BOOT = starts[2];
/** Fraction of the pinned scroll spent typing. */
const TYPE_END = 0.55;

function Prompt({ host }: { host: "local" | "remote" }) {
  if (host === "local") {
    return (
      <>
        <span className="text-[var(--c-pink)]">guest@web</span> <span className="text-[var(--c-blue)]">~</span>{" "}
        <span className="text-[var(--color-muted-light)]">%</span>{" "}
      </>
    );
  }
  return (
    <>
      <span className="text-[var(--c-green)]">lex@portfolio</span>
      <span className="text-[var(--color-muted-light)]">:</span>
      <span className="text-[var(--c-blue)]">~</span>
      <span className="text-[var(--color-muted-light)]">$</span>{" "}
    </>
  );
}

function Transcript({ shown }: { shown: number }) {
  const lines: ReactNode[] = [];
  for (let i = 0; i < script.length; i++) {
    const s = script[i];
    const start = starts[i];
    if (s.kind === "out") {
      if (shown < start + 2) break;
      lines.push(
        <div key={i}>
          {s.segs.map(([text, tone], j) => (
            <span key={j} className={toneClass[tone]}>
              {text}
            </span>
          ))}
        </div>,
      );
      continue;
    }
    const typed = Math.max(0, Math.min(s.text.length, shown - start));
    const nextVisible = i + 1 < script.length && shown >= starts[i + 1] + 2;
    lines.push(
      <div key={i}>
        <Prompt host={s.host} />
        {s.text.slice(0, typed)}
        {!nextVisible && <span className="term-caret" />}
      </div>,
    );
    if (!nextVisible) break;
  }
  return <>{lines}</>;
}

function TerminalWindow({ children }: { children: ReactNode }) {
  return (
    <div className="term">
      <div className="term-bar">
        <span className="term-dot bg-[#ff5f57]" />
        <span className="term-dot bg-[#febc2e]" />
        <span className="term-dot bg-[#28c840]" />
        <span className="term-title">lex@portfolio: ~ (zsh)</span>
      </div>
      <div className="term-body">{children}</div>
    </div>
  );
}

/* ---------- Intro that the terminal opens into ---------- */

function HeroContent({ photoClip }: { photoClip?: MotionValue<string> }) {
  return (
    <div className="grid items-center gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:gap-14">
      <motion.div
        className="mx-auto w-3/5 max-w-[340px] overflow-hidden rounded-[6px] border border-[var(--color-border-strong)] md:mx-0 md:w-full"
        style={photoClip ? { clipPath: photoClip } : undefined}
      >
        <img
          src="/profile.png"
          alt="John Lexter B. Reyes"
          width={400}
          height={400}
          className="h-auto w-full object-cover"
          fetchPriority="high"
        />
      </motion.div>

      <div className="max-w-[600px]">
        <p className="prompt-tag mb-3">whoami</p>
        <h1 className="chapter-title mb-4 !text-[clamp(1.5rem,4vw,2.75rem)]">
          <span className="block">John Lexter</span>
          <span className="block text-[var(--c-green)]">B. Reyes</span>
        </h1>
        <p className="mb-5 text-sm font-semibold sm:text-base">
          <span className="text-[var(--c-amber)]">AWS Student Builder Group Lead</span>
          <span className="text-[var(--color-muted-light)]"> · </span>
          <span className="text-[var(--c-blue)]">Cloud Engineer</span>
        </p>
        <p className="mb-7 max-w-[52ch] leading-relaxed text-[var(--color-muted)]">
          BSIT student at PUP Bi&ntilde;an. I design server-side systems, optimize databases, and ship cloud
          infrastructure.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href="#projects" className="btn btn-primary">
            View projects
            <ArrowRight size={14} aria-hidden="true" />
          </a>
          <a href="#contact" className="btn btn-ghost">
            Contact
          </a>
        </div>
      </div>
    </div>
  );
}

/**
 * Opening chapter. A terminal session types itself out as you scroll,
 * then the window minimizes and the intro takes its place.
 */
export default function Hero() {
  const reduce = useReduced();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const [boot, setBoot] = useState(0);
  const [scrolled, setScrolled] = useState(0);
  const [ready, setReady] = useState(false);

  // First command types itself so the page never opens on an empty screen
  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setBoot((b) => {
        if (b >= BOOT) {
          window.clearInterval(id);
          return b;
        }
        return b + 1;
      });
    }, 60);
    return () => window.clearInterval(id);
  }, [reduce]);

  useMotionValueEvent(p, "change", (v) => {
    const units = Math.round(BOOT + (TOTAL - BOOT) * Math.min(1, Math.max(0, v / TYPE_END)));
    setScrolled((cur) => (cur === units ? cur : units));
    setReady(v > 0.62);
  });

  const shown = Math.max(boot, v0(scrolled));

  const termOpacity = useLerp(p, [0.58, 0.72], [1, 0]);
  const termScale = useLerp(p, [0.58, 0.72], [1, 0.92]);
  const termY = useLerp(p, [0.58, 0.72], [0, -40]);
  const hintOpacity = useLerp(p, [0, 0.05], [1, 0]);
  const heroOpacity = useLerp(p, [0.64, 0.8], [0, 1]);
  const heroY = useLerp(p, [0.64, 0.8], [32, 0]);
  const photoClip = useInset(p, [0.66, 0.9], [0, 0, 100, 0]);

  if (reduce) {
    return (
      <section id="top" className="relative pt-14">
        <div className="container-site flex min-h-[calc(100svh-3.5rem)] items-center py-12">
          <HeroContent />
        </div>
      </section>
    );
  }

  // If someone tabs into the intro before it has been revealed, jump to it
  const revealOnFocus = () => {
    const el = ref.current;
    if (ready || !el) return;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: el.offsetTop + range * 0.85, behavior: "auto" });
  };

  return (
    <section id="top" ref={ref} className="relative h-[260svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div
          className="absolute inset-0 flex items-center pt-14"
          style={{ opacity: heroOpacity, y: heroY }}
          onFocusCapture={revealOnFocus}
        >
          <div className="container-site w-full">
            <HeroContent photoClip={photoClip} />
          </div>
        </motion.div>

        <motion.div
          className="pointer-events-none absolute inset-0 flex items-center justify-center px-4 pt-14"
          style={{ opacity: termOpacity, scale: termScale, y: termY }}
          aria-hidden="true"
        >
          <TerminalWindow>
            <Transcript shown={shown} />
          </TerminalWindow>
        </motion.div>

        <motion.div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-[5svh] flex flex-col items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-[var(--color-muted-light)]"
          style={{ opacity: hintOpacity }}
        >
          Scroll to run
          <ChevronDown size={16} className="animate-bounce text-[var(--c-green)]" />
        </motion.div>
      </div>
    </section>
  );
}

/** Scroll units only count once the boot sequence has started. */
function v0(n: number) {
  return n <= BOOT ? 0 : n;
}
