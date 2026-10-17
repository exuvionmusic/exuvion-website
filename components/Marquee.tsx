"use client";

import { useEffect, useRef } from "react";

type Props = { items: string[] };

/**
 * Ticker that reacts to the page: scrolling drags it faster and skews it,
 * then it eases back to its idle crawl when you stop.
 */
export default function Marquee({ items }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let last = window.scrollY;
    let boost = 0;
    let raf = 0;

    const tick = () => {
      const delta = window.scrollY - last;
      last = window.scrollY;

      // chase the scroll speed, then decay back to rest
      boost += (Math.min(Math.abs(delta), 90) - boost) * 0.12;
      if (boost < 0.05) boost = 0;

      el.style.setProperty("--speed", String(1 + boost * 0.11));
      el.style.setProperty("--skew", `${Math.sign(delta) * boost * 0.09}deg`);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Two identical runs so the -50% translation loops seamlessly.
  const run = ["a", "b"].flatMap((key) =>
    items.map((item, i) => (
      <span key={`${key}-${i}`}>
        {item}
        <i aria-hidden="true">◆</i>
      </span>
    )),
  );

  return (
    <div className="marquee" ref={ref} aria-hidden="true">
      {/* skew lives on its own layer: the track's transform is owned by the loop */}
      <div className="marquee__skew">
        <div className="marquee__track">{run}</div>
      </div>
    </div>
  );
}
