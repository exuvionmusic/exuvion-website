// Walks each carousel on the public post page, capturing every slide the
// browser actually loads. Usage: node tools/ig-full.mjs <shortcode> [...]
import puppeteer from "puppeteer-core";
import { writeFileSync, mkdirSync } from "node:fs";

mkdirSync("tools/ig", { recursive: true });

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

const browser = await puppeteer.launch({
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
  headless: "new",
});

const out = {};
for (const code of process.argv.slice(2)) {
  const page = await browser.newPage();
  await page.setUserAgent(UA);
  await page.setViewport({ width: 1400, height: 1100 });

  // Keep every full-size photo the page fetches, keyed by media id.
  const slides = new Map();
  page.on("response", async (res) => {
    const url = res.url();
    if (!/\/v\/t51\.\d+-15\/.*\.(jpg|webp|heic)/.test(url)) return;
    if (/s150x150|s240x240|s320x320|\/t51\.\d+-19\//.test(url)) return;
    const id = url.match(/\/v\/t51\.\d+-15\/(\d+_\d+_\d+)/)?.[1];
    if (!id || slides.has(id)) return;
    try {
      const buf = await res.buffer();
      if (buf.length > 60_000) slides.set(id, buf);
    } catch {
      /* response already discarded */
    }
  });

  await page.goto(`https://www.instagram.com/p/${code}/`, {
    waitUntil: "networkidle2",
    timeout: 60000,
  });
  await new Promise((r) => setTimeout(r, 2500));

  // advance through the carousel until the arrow disappears
  for (let i = 0; i < 15; i++) {
    const next = await page.$('button[aria-label="Next"]');
    if (!next) break;
    try {
      await next.click();
    } catch {
      break;
    }
    await new Promise((r) => setTimeout(r, 1200));
  }
  await new Promise((r) => setTimeout(r, 1500));

  let n = 0;
  for (const buf of slides.values()) {
    writeFileSync(`tools/ig/${code}-s${String(++n).padStart(2, "0")}.jpg`, buf);
  }
  out[code] = [...slides.keys()];
  console.log(code, "captured", n);
  await page.close();
}

writeFileSync("tools/ig/full.json", JSON.stringify(out, null, 1));
await browser.close();
