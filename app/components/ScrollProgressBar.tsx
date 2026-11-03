"use client";

import { useEffect, useState, useRef } from "react";

export default function ScrollProgressBar() {
  const [progress, setProgress] = useState(0);
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
          setProgress(height ? (winScroll / height) * 100 : 0);
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
      className="fixed top-0 left-0 right-0 h-[3px] bg-[var(--color-border)] z-[60] overflow-hidden"
    >
      <div
        className="h-full bg-[var(--color-accent)] transition-all duration-100 ease-out"
        style={{ transform: `scaleX(${progress / 100})` }}
      />
    </div>
  );
}
