# exuvion.com

Official site for **Exuvion** — progressive technical death metal, Bangalore, India.

Next.js (App Router) + hand-written CSS. No UI framework, no CMS: one content file,
one stylesheet pair, deploys static to Vercel.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
```

## Changing the words

**Everything readable on the site lives in [`lib/content.ts`](lib/content.ts)** — bio,
member credits, show list, merch captions, contact details, section names. Edit that
file, commit, and Vercel redeploys. You do not need to touch any component.

A few specifics:

| What | Where |
| --- | --- |
| Add a show | `shows` array — newest first. `image: null` if there's no photo. Exuvion-era shows only. |
| Add a member | `members` array — then drop the portrait in `public/img/`. |
| Streaming links | Not on the site yet. Add them to `links`, then surface them in `app/page.tsx`. |
| Footer year | `band.copyrightYear` (bumped by hand so the page can stay fully static). |

## Changing the look

- `app/globals.css` — colour tokens, type scale, grain, nav, footer.
- `app/sections.css` — each section, in page order.

The whole palette is five variables at the top of `globals.css`. The site is
deliberately monochrome; the only colour anywhere is the artwork, which desaturates
by default and returns to full colour on hover.

## Images

> **Nothing from the Ksetravid-era press kit may be published.** The old EPK is not a
> source for this site. Gig photos come from Exuvion's own Instagram (raw downloads in
> `../Instagram/`, with the originating captions in `source-posts.json`). The studio
> portraits and group shot are a separate, later shoot and are cleared for use.

Source files live outside this repo. `tools/build_assets.py` in the parent folder
regenerates everything in `public/img/` — resizing, converting to WebP, desaturating
photos, knocking the studio backdrops out of the merch mockups, and building the
favicon and social card.

```bash
python tools/build_assets.py   # run from the parent folder
```

## Screenshots

`node tools/shoot.mjs [port]` captures the page at desktop and mobile widths into
`tools/shots/` (needs a local Chrome and a running `npm start`).
