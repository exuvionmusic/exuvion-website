"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export type RevealFrom = "up" | "left" | "right" | "mask";

type Props = {
  children: ReactNode;
  /** Direction the block travels in from. "mask" wipes upward without sliding. */
  from?: RevealFrom;
  delay?: number;
  className?: string;
};

/** Animates its children into place once, the first time they are scrolled to. */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`.trim()}
      data-from={from}
      data-shown={shown}
      style={
        delay
          ? ({ transitionDelay: `${delay}ms`, "--d": `${delay}ms` } as React.CSSProperties)
          : undefined
      }
    >
      {children}
    </div>
  );
}
