// Renders every theme's artwork: themes/<id>/art/*.html -> wallpapers, preview and element sheets.
// Each HTML file names its output and size in <meta name="out" content="path,width,height,scale,format">.
// Run from the repo root: node tools/render.mjs   (needs Playwright with Chromium)
import { chromium } from 'playwright';
import { readdirSync, readFileSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve('themes');
const browser = await chromium.launch();
for (const id of readdirSync(root)) {
  const art = join(root, id, 'art');
  if (!existsSync(art)) continue;
  for (const file of readdirSync(art).filter(f => f.endsWith('.html'))) {
    const html = readFileSync(join(art, file), 'utf8');
    for (const m of html.matchAll(/<meta name="out" content="([^"]+)">/g)) {
      const [out, w, h, scale, type] = m[1].split(',');
      const page = await browser.newPage({ viewport: { width: +w, height: +h }, deviceScaleFactor: +scale });
      await page.goto('file://' + join(art, file));
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(150);
      const path = join(root, id, out);
      await page.screenshot({ path, type: type || 'png', quality: type === 'jpeg' ? 90 : undefined });
      console.log('wrote', path);
      await page.close();
    }
  }
}
await browser.close();
