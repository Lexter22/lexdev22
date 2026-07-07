"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouse = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      raf = requestAnimationFrame(animate);
    };

    document.body.style.cursor = "none";

    document.documentElement.style.setProperty("--custom-cursor", "none");

    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    window.addEventListener("mousemove", onMouse);
    let raf = requestAnimationFrame(animate);

    return () => {
      document.body.style.cursor = "";
      document.documentElement.style.removeProperty("--custom-cursor");
      style.remove();
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-[6px] h-[6px] bg-[var(--color-accent)] rounded-full pointer-events-none z-[9999]"
        style={{ transform: "translate(-100px, -100px)", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-[var(--color-accent)]/50 rounded-full pointer-events-none z-[9998]"
        style={{ transform: "translate(-100px, -100px)", willChange: "transform", margin: "-16px 0 0 -16px" }}
      />
    </>
  );
}
