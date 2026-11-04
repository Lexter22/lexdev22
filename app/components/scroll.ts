"use client";

import { useSyncExternalStore } from "react";
import { useTransform, type MotionValue } from "motion/react";

const QUERY = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/**
 * Hydration-safe reduced-motion flag. The server snapshot is `false`, so the
 * first client render matches the HTML and React swaps trees right after.
 */
export function useReduced() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(QUERY).matches,
    () => false,
  );
}

/*
 * Function-form transforms. Array-form useTransform on scroll progress gets
 * offloaded to native scroll timelines, which drop back to the base style once
 * you scroll past the range (pinned scenes "rewind"). These always clamp.
 */

const clamp01 = (t: number) => Math.min(1, Math.max(0, t));
const progressIn = (v: number, [a, b]: [number, number]) => clamp01((v - a) / (b - a));

export function useLerp(p: MotionValue<number>, input: [number, number], output: [number, number]) {
  return useTransform(p, (v) => output[0] + (output[1] - output[0]) * progressIn(v, input));
}

type Box = [number, number, number, number];

/** Interpolates a clip-path inset(top right bottom left) in percent. */
export function useInset(p: MotionValue<number>, input: [number, number], from: Box, to: Box = [0, 0, 0, 0]) {
  return useTransform(p, (v) => {
    const t = progressIn(v, input);
    const [a, b, c, d] = from.map((f, i) => f + (to[i] - f) * t);
    return `inset(${a}% ${b}% ${c}% ${d}%)`;
  });
}

/** Clamped copy of a progress value, safe to bind to scale. */
export function useClamped(p: MotionValue<number>) {
  return useTransform(p, (v) => clamp01(v));
}
