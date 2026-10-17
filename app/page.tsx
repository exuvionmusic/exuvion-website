import Image from "next/image";
import LiveList from "@/components/LiveList";
import Marquee from "@/components/Marquee";
import PhotoBand from "@/components/PhotoBand";
import Nav from "@/components/Nav";
import Reveal from "@/components/Reveal";
import {
  artworks,
  band,
  bio,
  etymology,
  links,
  members,
  merch,
  photoBand,
  records,
  sections,
} from "@/lib/content";

function SectionHead({ id }: { id: string }) {
  const s = sections.find((x) => x.id === id)!;
  return (
    <Reveal className="sec-head">
      <span className="label sec-head__idx">{s.index}</span>
      <span className="label">{s.label}</span>
      <span className="sec-head__rule" aria-hidden="true" />
    </Reveal>
  );
}

const marqueeItems = [
  "Exuvion",
  "Order & Chaos",
  `${band.city}, India`,
  "Shedding the old skin",
  "Technical Death Metal",
];

export default function Home() {
  return (
    <>
      <a className="skip" href="#origin">
        Skip to content
      </a>
      <Nav />

      <main id="top">
        {/* ------------------------------------------------ hero */}
        <header className="hero">
          <Image
            className="hero__emblem"
            src="/img/emblem.webp"
            alt=""
            width={1016}
            height={1400}
            priority
          />

          <h1 className="hero__logo">
            <Image
              src="/img/logo.webp"
              alt={`${band.name} — ${band.genre} band from ${band.city}, ${band.country}`}
              width={1800}
              height={780}
              priority
            />
          </h1>

          <div className="hero__corner hero__corner--tl">
            <span className="label">Est. {band.formed}</span>
            <span className="label">Formerly {band.formerName}</span>
          </div>

          <div className="hero__corner hero__corner--tr">
            <span className="label">{band.city}, IN</span>
            <span className="label">{band.coords}</span>
          </div>

          <div className="hero__corner hero__corner--bl">
            <span className="label">{band.genre}</span>
          </div>

          <div className="hero__corner hero__corner--br">
            <div className="hero__scroll">
              <i aria-hidden="true" />
              <span className="label">Scroll</span>
            </div>
          </div>
        </header>

        <Marquee items={marqueeItems} />

        {/* ------------------------------------------------ 01 origin */}
        <section className="section section--flush" id="origin">
          <div className="shell">
            <SectionHead id="origin" />

            <Reveal className="etym">
              <div>
                <h2 className="display etym__word">{etymology.word}</h2>
                <div className="etym__phon">
                  <span className="mono">{etymology.phonetic}</span>
                  <span className="label">{etymology.pos}</span>
                </div>
              </div>
              <div>
                <p className="serif-it etym__def">{etymology.definition}</p>
                <p className="label etym__note">{etymology.note}</p>
              </div>
            </Reveal>

            <div className="bio">
              <div>
                <Reveal>
                  <p className="serif-it bio__lede">{bio.lede}</p>
                </Reveal>
                <Reveal className="bio__body" delay={80}>
                  {bio.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </Reveal>
              </div>

              <Reveal className="bio__media" delay={120}>
                <Image
                  src="/img/band-main.webp"
                  alt={`${band.name} — the four members photographed against a brick wall`}
                  width={2000}
                  height={1335}
                  sizes="(min-width: 1040px) 40vw, 92vw"
                />
                <div className="bio__caption">
                  <span className="label">Fig. 01</span>
                  <span className="label">{band.city}, {band.country}</span>
                </div>
              </Reveal>

              <ul className="facts">
                {bio.facts.map((f) => (
                  <li key={f.k}>
                    <span className="label">{f.k}</span>
                    <b>{f.v}</b>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ 02 band */}
        <section className="section" id="band">
          <div className="shell">
            <SectionHead id="band" />

            <div className="members">
              {members.map((m, i) => (
                <Reveal
                  key={m.name}
                  className="member"
                  from={i % 2 === 0 ? "left" : "right"}
                  delay={i * 130}
                >
                  <figure className="member__fig">
                    <span className="label member__no">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Image
                      src={m.image}
                      alt={`${m.name}, ${m.role.toLowerCase()}`}
                      width={1100}
                      height={1648}
                      sizes="(min-width: 1100px) 23vw, (min-width: 640px) 46vw, 92vw"
                    />
                  </figure>
                  <h3 className="display member__name">{m.name}</h3>
                  <p className="label member__role">{m.role}</p>
                  <p className="member__blurb">{m.blurb}</p>
                  <ul className="member__bands">
                    {m.bands.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ 03 records */}
        <section className="section" id="records">
          <div className="shell">
            <SectionHead id="records" />

            <Reveal className="records__statement" from="mask">
              <h3 className="display">
                {records.heading}
                <br />
                <em>{records.headingEm}</em>
              </h3>
              <p className="records__note">{records.note}</p>
            </Reveal>

            <div className="art-grid">
              {artworks.map((a, i) => (
                <Reveal
                  key={a.title}
                  className="art"
                  from={i % 2 === 0 ? "left" : "right"}
                  delay={i * 120}
                >
                  <div className="art__frame">
                    <Image
                      src={a.image}
                      alt={`Artwork — ${a.title}`}
                      width={1200}
                      height={1697}
                      sizes="(min-width: 820px) 46vw, 92vw"
                    />
                  </div>
                  <div className="art__meta">
                    <h4 className="display art__title">{a.title}</h4>
                    <span className="label">{a.release}</span>
                  </div>
                  {a.text ? <p className="art__text serif-it">{a.text}</p> : null}
                  {a.credit ? (
                    <p className="label art__credit">Art by {a.credit}</p>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <PhotoBand images={photoBand} />

        {/* ------------------------------------------------ 04 live */}
        <section className="section section--flush" id="live">
          <div className="shell">
            <SectionHead id="live" />
            <LiveList />
          </div>
        </section>

        {/* ------------------------------------------------ 05 merch */}
        <section className="section" id="merch">
          <div className="shell">
            <SectionHead id="merch" />

            <Reveal className="merch__head" from="mask">
              <h3 className="display merch__status">{merch.status}</h3>
              <p className="records__note">{merch.note}</p>
            </Reveal>

            <Reveal className="merch__grid" delay={60}>
              {merch.items.map((item) => (
                <figure className="merch__item" key={item.title}>
                  <Image
                    src={item.image}
                    alt={`${item.title} — Exuvion merchandise`}
                    width={1100}
                    height={1100}
                    sizes="(min-width: 900px) 20vw, 46vw"
                  />
                  <figcaption className="merch__cap">
                    <span className="label">{item.title}</span>
                    <span className="label merch__flag">{item.status}</span>
                  </figcaption>
                </figure>
              ))}
            </Reveal>

            <Reveal delay={120}>
              <a
                className="merch__cta label"
                href={links.instagram}
                target="_blank"
                rel="noreferrer"
              >
                DM to pre-order ↗
              </a>
            </Reveal>
          </div>
        </section>

        {/* ------------------------------------------------ 06 contact */}
        <section className="section" id="contact">
          <div className="shell">
            <SectionHead id="contact" />

            <div className="contact">
              <Reveal className="contact__big">
                <a className="contact__link" href={`mailto:${links.email}`}>
                  {links.email}
                </a>
                <a
                  className="contact__link"
                  href={links.instagram}
                  target="_blank"
                  rel="noreferrer"
                >
                  {links.instagramHandle} ↗
                </a>
              </Reveal>

              <Reveal delay={100}>
                <dl className="contact__block">
                  <dt className="label">Booking &amp; management</dt>
                  <dd>{links.booking.name}</dd>
                  <dd>
                    <a href={`mailto:${links.booking.email}`}>{links.booking.email}</a>
                  </dd>
                  <dd>
                    <a href={`tel:${links.booking.phoneHref}`}>{links.booking.phone}</a>
                  </dd>
                </dl>

                <dl className="contact__block">
                  <dt className="label">Live</dt>
                  <dd>50-minute set, all original material</dd>
                  <dd>Available across India</dd>
                </dl>
              </Reveal>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="shell">
          <div className="foot__grid">
            <Image
              className="foot__logo"
              src="/img/logo.webp"
              alt={band.name}
              width={1800}
              height={780}
              sizes="320px"
            />
            <a className="label" href={links.instagram} target="_blank" rel="noreferrer">
              Instagram ↗
            </a>
          </div>
          <div className="foot__meta">
            <span className="label">© {band.copyrightYear} {band.name}</span>
            <span className="label">{band.city}, {band.country}</span>
            <span className="label">Formerly {band.formerName}</span>
          </div>
        </div>
      </footer>
    </>
  );
}
