// Pulls every slide of Exuvion's carousel posts out of the public embed page.
// The slide list lives in an escaped contextJSON blob, so unescape then match.
import puppeteer from "puppeteer-core";
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("tools/ig", { recursive: true });

const CODES = process.argv.slice(2);
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

function unescapeDeep(s) {
  for (let i = 0; i < 4; i++) {
    s = s
      .split("\\/").join("/")
      .split('\\"').join('"')
      .split("\\u0025").join("%")
      .split("\\u0026").join("&");
  }
  // the blob is HTML-escaped on top of the JSON escaping
  return s.split("&amp;").join("&");
}

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});

const result = {};
for (const code of CODES) {
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  await page.setViewport({ width: 1000, height: 1200 });
  await page.goto(`https://www.instagram.com/p/${code}/embed/captioned/`, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 1500));

  const html = unescapeDeep(await page.content());
  const found = [
    ...html.matchAll(/https:\/\/instagram\.[a-z0-9.-]+\/v\/t51\.82787-15\/[^"\\ ]+/g),
  ].map((m) => m[0]);

  // one entry per media id, preferring the non-thumbnail variant
  const byId = new Map();
  for (const u of found) {
    const id = u.match(/\/(\d+_\d+_\d+)/)?.[1] ?? u.slice(0, 80);
    const isThumb = u.includes("s640x640");
    if (!byId.has(id) || (isThumb === false && byId.get(id).includes("s640x640"))) {
      byId.set(id, u);
    }
  }

  result[code] = [...byId.values()];
  console.log(code, "slides:", result[code].length);
  await page.close();
  await new Promise((r) => setTimeout(r, 600));
}

writeFileSync("tools/ig/slides.json", JSON.stringify(result, null, 1));
await browser.close();
