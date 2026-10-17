"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  images: string[];
  label: string;
};

/**
 * Horizontal film strip. Scrolls with the wheel or a finger, and on pointer
 * devices can be grabbed and thrown — the native scroller keeps the momentum.
 */
export default function Gallery({ images, label }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [scrollable, setScrollable] = useState(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: 0 });

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setScrollable(max > 4);
    setProgress(max > 4 ? el.scrollLeft / max : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    onScroll();
    el.addEventListener("scroll", onScroll, { passive: true });

    // the strip only overflows at some widths, so track resizes too
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", onScroll);
      ro.disconnect();
    };
  }, [onScroll]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "touch") return; // let the browser do native touch scrolling
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: 0,
    };
    el.setPointerCapture(e.pointerId);
    el.dataset.dragging = "true";
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.active) return;
    const dx = e.clientX - drag.current.startX;
    drag.current.moved = Math.abs(dx);
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el) return;
    drag.current.active = false;
    delete el.dataset.dragging;
    if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
  };

  return (
    <div className="gallery">
      <div
        className="gallery__track"
        ref={trackRef}
        role="group"
        aria-label={`Photographs from ${label}`}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt={`${label} — photograph ${i + 1} of ${images.length}`}
            loading="lazy"
            draggable={false}
          />
        ))}
      </div>

      {scrollable ? (
        <div className="gallery__rail" aria-hidden="true">
          <span style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }} />
        </div>
      ) : null}
    </div>
  );
}
