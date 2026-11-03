"use client";

import { useEffect, useState, useRef } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;
          const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
          const p = height ? (winScroll / height) * 100 : 0;
          setProgress(p);
          setVisible(p > 2 && p < 98);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed top-0 left-0 right-0 h-[2px] bg-[var(--color-border)]/40 z-[60] overflow-hidden transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className="h-full bg-[var(--color-accent)] shadow-[0_0_8px_rgba(0,204,74,0.6)] transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
