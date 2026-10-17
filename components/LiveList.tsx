"use client";

import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import { shows } from "@/lib/content";

/**
 * Exuvion's shows. Each one carries the photographs from that night's
 * Instagram post, laid out as a strip you can drag through.
 */
export default function LiveList() {
  return (
    <div className="live__list">
      {shows.map((show, i) => (
        <Reveal
          key={`${show.title}-${show.city}-${show.date}`}
          from={i % 2 === 0 ? "left" : "right"}
          delay={i * 90}
          className="live__block"
        >
          <div className="live__row">
            <span className="mono live__date">{show.date}</span>
            <span className="live__title">{show.title}</span>
            {show.note ? <span className="label live__note">{show.note}</span> : null}
            <span className="live__where label">
              {show.venue} — {show.city}
            </span>
          </div>

          {show.images.length > 0 ? (
            <>
              <Gallery images={show.images} label={`${show.title}, ${show.city}`} />
              {show.credit ? (
                <p className="label live__credit">Photography — @{show.credit}</p>
              ) : null}
            </>
          ) : null}
        </Reveal>
      ))}
    </div>
  );
}
