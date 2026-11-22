"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { useInset, useLerp, useReduced } from "./scroll";

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
};

/**
 * The frame opens and the photo settles as it scrolls into view,
 * so the further you scroll the more of the image you see.
 */
export default function ScrollImage({ src, alt, width, height, className = "", imgClassName = "", priority }: Props) {
  const reduce = useReduced();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center 55%"] });
  const clipPath = useInset(scrollYProgress, [0, 1], [16, 12, 16, 12]);
  const scale = useLerp(scrollYProgress, [0, 1], [1.22, 1]);

  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      className={`h-full w-full object-cover ${imgClassName}`}
    />
  );

  if (reduce) return <div className={`overflow-hidden ${className}`}>{img}</div>;

  return (
    <motion.div ref={ref} className={`overflow-hidden ${className}`} style={{ clipPath }}>
      <motion.div className="h-full w-full" style={{ scale }}>
        {img}
      </motion.div>
    </motion.div>
  );
}
