/**
 * Every word and link on the site lives here.
 * Edit this file to update the site — no component changes needed.
 */

export const band = {
  name: "Exuvion",
  genre: "Progressive Technical Death Metal",
  city: "Bangalore",
  country: "India",
  coords: "12°58′N  77°35′E",
  formed: "2020",
  formerName: "Ksetravid",
  /** Shown in the footer. Bump by hand each January. */
  copyrightYear: "2026",
};

export const links = {
  instagram: "https://www.instagram.com/exuvion/",
  instagramHandle: "@exuvion",
  email: "exuvion.music@gmail.com",
  booking: {
    name: "Vaishak K",
    email: "connect@beyondzeal.biz",
    phone: "+91 98099 79991",
    phoneHref: "+919809979991",
  },
};

export const etymology = {
  word: "ex·u·vi·a",
  phonetic: "/ɪɡˈzuːvɪə/",
  pos: "noun",
  definition:
    "the cast-off skin or shell of an organism, left behind in the act of growing.",
  note: `Formerly ${band.formerName}. Rebranded in 2026.`,
};

export const bio = {
  lede: "The intricate design of the music compels the listener to explore the fragile balance between order and chaos.",
  paragraphs: [
    `Exuvion is a progressive technical death metal band from ${band.city}, ${band.country}, previously known as ${band.formerName}. The band blends genres across the breadth of metal while keeping technical death metal at its core, with music that delves into self-introspection and challenges materialism and social dogma.`,
    "The band formed in 2020 during the first wave of COVID-19 — a time of isolation and uncertainty that continues to shape their sound and their perspective. Their music explores self-awareness in a constantly shifting world, aiming to connect people through shared experience.",
    "Rebranded as Exuvion in 2026, the band plays a high-octane fifty-minute live set of entirely original material, and is writing and tracking its first record now.",
  ],
  facts: [
    { k: "Formed", v: "2020" },
    { k: "First show as Exuvion", v: "06.09.2026" },
    { k: "Live set", v: "50 min, all original" },
    { k: "First record", v: "In progress" },
  ],
};

export type Member = {
  name: string;
  role: string;
  image: string;
  blurb: string;
  bands: string[];
};

export const members: Member[] = [
  {
    name: "Kiran Vincent",
    role: "Vocals",
    image: "/img/member-kiran.webp",
    blurb:
      "The flamethrower and frontman of the band, well established in the Bangalore music scene.",
    bands: ["Hope Awake", "Valeth Effect"],
  },
  {
    name: "Pritam Middey",
    role: "Guitars · Composition",
    image: "/img/member-pritam.webp",
    blurb:
      "Guitarist and composer, drawn from a long run of hard-hitting metal acts.",
    bands: ["Evil Conscience", "Project Trident"],
  },
  {
    name: "Nikhil Rajkumar",
    role: "Drums",
    image: "/img/member-nikhil.webp",
    blurb:
      "Takes the throne for drum duties — one of the finest metal drummers around, with a virtuosic hand in the tech-death game.",
    bands: ["Demonic Resurrection", "Godless", "Sunflower Tape Machine"],
  },
  {
    name: "Arunav Bhattacharjee",
    role: "Bass · Composition",
    image: "/img/member-arunav.webp",
    blurb:
      "In charge of the lower end and composition, arriving from a wide spread of musical influences and years of session work.",
    bands: [
      "Chaos",
      "My Conscience",
      "Suvankar Plus Other Stories",
      "Nihilus",
      "Kartik Raman",
    ],
  },
];

/** Live-photo fragments scattered behind the hero wordmark. */
export const shards = [
  { src: "/img/shard-01.webp", w: 720, h: 414, depth: 1.0, rot: -3 },
  { src: "/img/shard-02.webp", w: 720, h: 697, depth: 1.8, rot: 2.5 },
  { src: "/img/shard-03.webp", w: 428, h: 720, depth: 0.7, rot: 4 },
  { src: "/img/shard-04.webp", w: 720, h: 487, depth: 2.3, rot: -2 },
  { src: "/img/shard-05.webp", w: 408, h: 480, depth: 1.4, rot: 5.5 },
];

export const records = {
  heading: "First record,",
  headingEm: "in progress",
  note: "Written and tracked between Bangalore and Chennai. Announcements go out on Instagram first.",
};

export const artworks = [
  {
    title: "Plaguebirth",
    release: "Artwork 002",
    image: "/img/art-plague-birth.webp",
    credit: "Saptarshi Das",
    text: "She is neither a demon nor a god — she is born out of pure hatred that her mortal heart could never contain. She is not here to be worshipped or appeased. She is the reckoning.",
  },
  {
    title: "Red Citadel",
    release: "Artwork 001",
    image: "/img/art-red-citadel.webp",
    credit: null,
    text: null,
  },
];

export type Show = {
  date: string;
  title: string;
  venue: string;
  city: string;
  note?: string;
  /** Carousel slides from the band's Instagram post for that night. */
  images: string[];
  credit?: string;
};

/**
 * Exuvion-era shows only — nothing from before the rebrand, and no imagery
 * sourced from the old press kit. Photos come from the band's own Instagram.
 */
export const shows: Show[] = [
  {
    date: "09.10.2026",
    title: "Bangalore Open Air — Warm-Up Party",
    venue: "The Humming Tree",
    city: "Bangalore",
    images: [],
  },
  {
    date: "11.09.2026",
    title: "Aggressive Tendencies",
    venue: "EXT",
    city: "Hyderabad",
    note: "First show in Hyderabad",
    images: ["/img/live-hyderabad-01.webp", "/img/live-hyderabad-02.webp"],
    credit: "clickingitreal",
  },
  {
    date: "06.09.2026",
    title: "Outrage Festival",
    venue: "The Humming Tree",
    city: "Bangalore",
    note: "Debut show as Exuvion",
    images: ["/img/live-debut-01.webp", "/img/live-debut-02.webp"],
  },
];

/** Full-bleed photo band that drifts between sections. */
export const photoBand = [
  "/img/live-debut-01.webp",
  "/img/live-hyderabad-02.webp",
  "/img/live-jam-01.webp",
  "/img/live-debut-02.webp",
  "/img/live-hyderabad-01.webp",
  "/img/live-jam-02.webp",
];

export const merch = {
  status: "Pre-order",
  note: "The Plaguebirth hoodie is open for pre-order — DM on Instagram to claim one. Tees, oversized tees and shorts follow.",
  items: [
    { title: "Plaguebirth Hoodie", image: "/img/merch-hoodie.webp", status: "Pre-order" },
    { title: "Red Citadel Tee — Front", image: "/img/merch-tee-front.webp", status: "Soon" },
    { title: "Red Citadel Tee — Back", image: "/img/merch-tee-back.webp", status: "Soon" },
    { title: "Oversized Tee", image: "/img/merch-oversized.webp", status: "Soon" },
    { title: "Shorts", image: "/img/merch-shorts.webp", status: "Soon" },
  ],
};

export const sections = [
  { id: "origin", index: "01", label: "Origin" },
  { id: "band", index: "02", label: "The Band" },
  { id: "records", index: "03", label: "Records" },
  { id: "live", index: "04", label: "Live" },
  { id: "merch", index: "05", label: "Merch" },
  { id: "contact", index: "06", label: "Contact" },
];
