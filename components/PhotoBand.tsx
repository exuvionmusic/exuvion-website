"use client";

import { useEffect, useRef } from "react";

type Props = { images: string[]; reverse?: boolean };

/**
 * Full-bleed band of photographs that drifts sideways on its own and leans
 * into the direction you're scrolling.
 */
export default function PhotoBand({ images, reverse = false }: Props) {
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
      boost += (Math.min(Math.abs(delta), 80) - boost) * 0.1;
      if (boost < 0.05) boost = 0;
      el.style.setProperty("--speed", String(1 + boost * 0.14));
      el.style.setProperty("--skew", `${Math.sign(delta) * boost * 0.07}deg`);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const run = ["a", "b"].flatMap((key) =>
    images.map((src) => (
      // eslint-disable-next-line @next/next/no-img-element
      <img key={`${key}-${src}`} src={src} alt="" loading="lazy" draggable={false} />
    )),
  );

  return (
    <div className="photoband" ref={ref} data-reverse={reverse} aria-hidden="true">
      <div className="photoband__skew">
        <div className="photoband__track">{run}</div>
      </div>
    </div>
  );
}
