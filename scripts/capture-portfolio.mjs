import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';

const base = (process.env.TEST_BASE_URL || 'http://127.0.0.1:3000').replace(/\/$/, '');
const output = 'artifacts/screenshots';
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  channel: process.platform === 'win32' ? 'msedge' : undefined,
  headless: true,
  args: ['--no-proxy-server'],
});
const report = [];

async function ready(page) {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForFunction(() => Array.from(document.images).filter(image => {
    const rect = image.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
  }).every(image => image.complete && image.naturalWidth > 0), undefined, { timeout: 20000 });
  await page.waitForTimeout(1250);
}

try {
  for (const device of ['desktop', 'mobile']) {
    const context = await browser.newContext({
      viewport: device === 'desktop' ? { width: 1440, height: 1000 } : { width: 390, height: 844 },
      deviceScaleFactor: 1,
      isMobile: device === 'mobile',
      hasTouch: device === 'mobile',
      reducedMotion: 'no-preference',
    });
    for (const locale of ['ar', 'en']) {
      for (const [name, route] of [['home', ''], ['work', '/work'], ['project', '/work/wadi-jeddah-jobs'], ['contact', '/contact']]) {
        const page = await context.newPage();
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        const response = await page.goto(`${base}/${locale}${route}`, { waitUntil: 'load' });
        if (!response?.ok()) throw new Error(`${locale}${route}: HTTP ${response?.status()}`);
        await ready(page);
        if (name !== 'home') {
          const height = await page.evaluate(() => document.documentElement.scrollHeight);
          const step = device === 'mobile' ? 650 : 850;
          for (let top = step; top < height; top += step) {
            await page.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top);
            await ready(page);
          }
          await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
          await ready(page);
        }
        await page.mouse.move(0, 0);
        const path = `${output}/${locale}-${device}-${name}.png`;
        await page.screenshot({ path, fullPage: name !== 'home', animations: 'disabled' });
        report.push({ path, url: page.url(), fonts: await page.evaluate(() => document.fonts.status), errors });
        if (name === 'home') {
          const footer = page.locator('.footer:not(.compact)');
          await footer.scrollIntoViewIfNeeded();
          await ready(page);
          const path = `${output}/${locale}-${device}-contact-section.png`;
          await footer.screenshot({ path, animations: 'disabled' });
          report.push({ path, url: `${page.url()}#contact-section`, errors });
        }
        await page.close();
      }
    }
    await context.close();
  }
  await writeFile(`${output}/capture-report.json`, JSON.stringify({ base, capturedAt: new Date().toISOString(), report }, null, 2));
  if (report.some(item => item.errors.length)) throw new Error('Captured pages reported browser errors; inspect capture-report.json');
  console.log(`Captured ${report.length} real browser screenshots with loaded fonts and visible images.`);
} finally {
  await browser.close();
}
