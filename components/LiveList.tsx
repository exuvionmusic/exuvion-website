"use client";

import { useRef, useState } from "react";
import { shows } from "@/lib/content";

/**
 * Archive of past shows. On pointer devices, hovering a row floats that
 * night's photo under the cursor; touch devices get a swipeable strip instead.
 */
export default function LiveList() {
  const [active, setActive] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const move = (e: React.MouseEvent) => {
    const el = previewRef.current;
    if (!el) return;
    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.left = `${clientX}px`;
      el.style.top = `${clientY}px`;
    });
  };

  return (
    <>
      <div className="live__list" onMouseMove={move}>
        {shows.map((show) => (
          <div
            key={`${show.title}-${show.city}-${show.year}`}
            className="live__row"
            onMouseEnter={() => setActive(show.image)}
            onMouseLeave={() => setActive(null)}
          >
            <span className="mono">{show.year}</span>
            <span className="live__title">{show.title}</span>
            <span className="live__city label">{show.city}</span>
          </div>
        ))}
      </div>

      <div className="live__preview" ref={previewRef} data-show={Boolean(active)} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        {active ? <img src={active} alt="" /> : null}
      </div>

      <div className="live__strip" aria-hidden="true">
        {shows
          .filter((s) => s.image)
          .map((s) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={s.image} src={s.image as string} alt="" loading="lazy" />
          ))}
      </div>
    </>
  );
}
