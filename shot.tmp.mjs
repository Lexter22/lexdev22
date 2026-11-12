import { chromium } from "playwright";

const browser = await chromium.launch();
for (const [name, w, h] of [["mobile", 390, 844], ["desktop", 1440, 900]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });
  const sec = page.locator("#about");
  await sec.scrollIntoViewIfNeeded();
  const box = await sec.boundingBox();
  const top = box.y + (await page.evaluate(() => window.scrollY));
  const shots = name === "mobile" ? [0.0, 0.5, 1.0] : [0.0, 0.6];
  let i = 0;
  for (const f of shots) {
    await page.evaluate((v) => window.scrollTo(0, v), top + (box.height - h) * f - 20);
    await page.waitForTimeout(900);
    await page.screenshot({ path: `/tmp/about-${name}-${i++}.png` });
  }
  await page.close();
}
await browser.close();
