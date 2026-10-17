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
    "With four hard-hitting singles released, the band delivers a high-octane fifty-minute live set of all-original material. In 2026 they rebranded as Exuvion, and are currently finishing their debut full-length album, set for release in mid-2026.",
  ],
  facts: [
    { k: "Formed", v: "2020" },
    { k: "Singles", v: "Four" },
    { k: "Live set", v: "50 min, all original" },
    { k: "Debut LP", v: "Mid 2026" },
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

export const artworks = [
  {
    title: "Plague Birth",
    image: "/img/art-plague-birth.webp",
    bw: "/img/art-plague-birth-bw.webp",
  },
  {
    title: "Red Citadel",
    image: "/img/art-red-citadel.webp",
    bw: "/img/art-red-citadel-bw.webp",
  },
];

export type Show = {
  year: string;
  title: string;
  city: string;
  image: string | null;
};

export const shows: Show[] = [
  {
    year: "2026",
    title: "The Humming Tree",
    city: "Bangalore",
    image: null,
  },
  {
    year: "2025",
    title: "Opening for Northlane",
    city: "Bangalore",
    image: "/img/live-northlane.webp",
  },
  {
    year: "2025",
    title: "Hisaab Barabar India Tour",
    city: "Bangalore",
    image: "/img/live-hisaab-bangalore.webp",
  },
  {
    year: "2025",
    title: "Hisaab Barabar India Tour",
    city: "Kolkata",
    image: "/img/live-hisaab-kolkata.webp",
  },
  {
    year: "2023",
    title: "Slaughterfest v1",
    city: "Bangalore",
    image: "/img/live-slaughterfest.webp",
  },
  {
    year: "2022",
    title: "The Pit v10.0",
    city: "Kolkata",
    image: "/img/live-the-pit.webp",
  },
  {
    year: "—",
    title: "Modern Machines v2",
    city: "Bangalore",
    image: "/img/live-modern-machines.webp",
  },
];

export const merch = {
  status: "Forthcoming",
  note: "Shirts, oversized tees and shorts. The drop is announced on Instagram first.",
  items: [
    { title: "Red Citadel Tee — Front", image: "/img/merch-tee-front.webp" },
    { title: "Red Citadel Tee — Back", image: "/img/merch-tee-back.webp" },
    { title: "Oversized Tee", image: "/img/merch-oversized.webp" },
    { title: "Shorts", image: "/img/merch-shorts.webp" },
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
