"use client";

import { useEffect, useState } from "react";
import { links, sections } from "@/lib/content";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setStuck(window.scrollY > 40);
        const max = document.body.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty(
          "--progress",
          String(max > 0 ? window.scrollY / max : 0),
        );
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav className="nav" data-stuck={stuck} aria-label="Primary">
        <a className="nav__mark" href="#top" aria-label="Exuvion — top of page">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img/emblem.webp" alt="" width={26} height={36} />
          <span>Exuvion</span>
        </a>

        <ul className="nav__list">
          {sections.map((s) => (
            <li key={s.id}>
              <a className="nav__link" href={`#${s.id}`}>
                <sup>{s.index}</sup>
                <span>{s.label}</span>
              </a>
            </li>
          ))}
        </ul>

        <button
          className="nav__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <i />
          <i />
        </button>

        <span className="nav__progress" aria-hidden="true" />
      </nav>

      <div className="drawer" id="drawer" data-open={open} aria-hidden={!open}>
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="display"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
          >
            <sup>{s.index}</sup>
            {s.label}
          </a>
        ))}
        <div className="drawer__foot label">
          <a href={links.instagram} target="_blank" rel="noreferrer" tabIndex={open ? 0 : -1}>
            Instagram ↗
          </a>
        </div>
      </div>
    </>
  );
}
