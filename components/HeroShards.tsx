"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { shards } from "@/lib/content";

/**
 * Fragments of live photographs scattered behind the wordmark. Each shard sits
 * at its own depth and drifts against the pointer, so the landing has parallax
 * instead of empty black.
 */
export default function HeroShards() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const tick = () => {
      // ease toward the pointer so the drift keeps moving after it stops
      x += (targetX - x) * 0.045;
      y += (targetY - y) * 0.045;
      el.style.setProperty("--px", x.toFixed(4));
      el.style.setProperty("--py", y.toFixed(4));
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="shards" ref={ref} aria-hidden="true">
      {shards.map((s, i) => (
        <figure
          key={s.src}
          className="shard"
          data-i={i + 1}
          style={
            {
              "--depth": s.depth,
              "--rot": `${s.rot}deg`,
              "--delay": `${i * 220}ms`,
            } as React.CSSProperties
          }
        >
          <Image src={s.src} alt="" width={s.w} height={s.h} priority={i < 2} />
        </figure>
      ))}
    </div>
  );
}
