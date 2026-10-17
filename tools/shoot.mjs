// Screenshots the running site for design review: node tools/shoot.mjs [port]
import puppeteer from "puppeteer-core";
import { mkdirSync } from "node:fs";

const PORT = process.argv[2] ?? "3077";
const CHROME = "C:/Program Files/Google/Chrome/Application/chrome.exe";
const OUT = "tools/shots";
mkdirSync(OUT, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: "new",
  args: ["--hide-scrollbars", "--force-device-scale-factor=1"],
});

const shoot = async (name, width, height, fn) => {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: "networkidle0" });
  await page.evaluate(() => {
    // settle the reveal animations
    document.querySelectorAll(".reveal").forEach((n) => n.setAttribute("data-shown", "true"));
  });
  if (fn) await page.evaluate(fn);
  await new Promise((r) => setTimeout(r, 900));
  await page.screenshot({ path: `${OUT}/${name}.png` });
  console.log(name);
  await page.close();
};

await shoot("desktop-hero", 1440, 900);
await shoot("desktop-origin", 1440, 900, () =>
  document.getElementById("origin").scrollIntoView(),
);
await shoot("desktop-band", 1440, 900, () =>
  document.getElementById("band").scrollIntoView(),
);
await shoot("desktop-records", 1440, 900, () =>
  document.getElementById("records").scrollIntoView(),
);
await shoot("desktop-live", 1440, 900, () =>
  document.getElementById("live").scrollIntoView(),
);
await shoot("desktop-merch", 1440, 900, () =>
  document.getElementById("merch").scrollIntoView(),
);
await shoot("desktop-contact", 1440, 900, () =>
  document.getElementById("contact").scrollIntoView(),
);
await shoot("mobile-hero", 390, 844);
await shoot("mobile-band", 390, 844, () =>
  document.getElementById("band").scrollIntoView(),
);

await browser.close();
