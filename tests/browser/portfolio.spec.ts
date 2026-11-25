import { test, expect, type Page } from '@playwright/test';

async function settled(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
  });
  await page.waitForFunction(() => Array.from(document.images).filter(image => {
    const rect = image.getBoundingClientRect();
    return rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
  }).every(image => image.complete && image.naturalWidth > 0), undefined, { timeout: 15000 });
  await expect(page.locator('h1')).toBeVisible();
  await page.waitForTimeout(1100);
}

for (const locale of ['en', 'ar'] as const) {
  test(`${locale}: gallery filters, grid, keyboard, swipe and case language`, async ({ page, context }, info) => {
    await page.goto(`/${locale}/work`);
    await settled(page);
    const ar = locale === 'ar';
    const caption = page.locator('.active-project-title h3');
    const first = await caption.innerText();
    const next = page.getByRole('button', { name: ar ? 'المشروع التالي' : 'Next project', exact: true });
    for (let index = 0; index < 6; index++) await next.click();
    await expect(caption).toHaveText(first);
    const stage = page.locator('.gallery-stage');
    await stage.focus();
    await page.keyboard.press('ArrowRight');
    await expect(caption).not.toHaveText(first);
    await expect(stage).toBeFocused();
    await page.getByRole('button', { name: ar ? 'عرض الشبكة' : 'Grid view', exact: true }).click();
    for (const [name, count] of [[ar ? 'UI/UX' : 'UI/UX', 1], [ar ? 'التطوير' : 'Development', 1], [ar ? 'الذكاء الاصطناعي' : 'AI', 2], [ar ? 'البيانات' : 'Data', 3]] as const) {
      await page.locator('.filters button').filter({ hasText: name }).click();
      await expect(page.locator('.grid-project')).toHaveCount(count);
    }
    await page.locator('.filters button').first().click();
    await expect(page.locator('.grid-project')).toHaveCount(6);
    await page.getByRole('button', { name: ar ? 'عرض المعرض' : 'Gallery view', exact: true }).click();
    await expect(caption).toHaveText(first);
    const box = await stage.boundingBox();
    if (!box) throw new Error('Gallery stage missing');
    const x = box.x + box.width * .65, y = box.y + box.height / 2;
    if (info.project.name === 'mobile') {
      const cdp = await context.newCDPSession(page);
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] });
      for (let i = 1; i <= 6; i++) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x - i * 24, y }] });
      await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      await cdp.detach();
    } else {
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x - 170, y, { steps: 8 });
      await page.mouse.up();
    }
    await expect(caption).not.toHaveText(first);
    await expect(page).toHaveURL(new RegExp(`/${locale}/work$`));
    await page.locator('.filters button').first().click();
    await page.locator('.gallery-card.is-active .card-link').click();
    await expect(page).toHaveURL(new RegExp(`/${locale}/work/wadi-jeddah-jobs$`));
    await page.locator('.language-switch').click();
    const other = ar ? 'en' : 'ar';
    await expect(page).toHaveURL(new RegExp(`/${other}/work/wadi-jeddah-jobs$`));
    await expect(page.locator('html')).toHaveAttribute('dir', ar ? 'ltr' : 'rtl');
  });

  test(`${locale}: headings and pages fit device widths`, async ({ page }, info) => {
    // This matrix performs up to twenty complete navigations and settled font/image checks.
    test.setTimeout(90_000);
    const widths = info.project.name === 'mobile' ? [320, 375, 414, 768] : [1024, 1280, 1440];
    for (const width of widths) {
      await page.setViewportSize({ width, height: info.project.name === 'mobile' ? 844 : 1000 });
      for (const route of ['', '/work', '/contact', '/work/wadi-jeddah-jobs', '/work/dclean']) {
        await page.goto(`/${locale}${route}`);
        await settled(page);
        const issues = await page.evaluate(() => {
          const problems: string[] = [];
          if (document.documentElement.scrollWidth > innerWidth + 1) problems.push('document horizontal overflow');
          for (const element of document.querySelectorAll('h1, h2, .hero-word, .footer-title-line')) {
            if (element.closest('.gallery-card')) continue;
            const range = document.createRange();
            range.selectNodeContents(element);
            const rect = range.getBoundingClientRect();
            if (rect.width && (rect.left < -1 || rect.right > innerWidth + 1)) problems.push(`${element.textContent}: ${rect.left.toFixed(0)}..${rect.right.toFixed(0)}`);
          }
          return problems;
        });
        expect(issues, `${locale}${route} at ${width}px`).toEqual([]);
      }
    }
  });

  test(`${locale}: contact statement and English punctuation are visually ordered`, async ({ page }) => {
    await page.goto(`/${locale}/work/wadi-jeddah-jobs`);
    await settled(page);
    const direction = await page.locator('.cover-subtitle').evaluate(element => {
      const text = element.firstChild!;
      const first = document.createRange(), last = document.createRange();
      first.setStart(text, 0); first.setEnd(text, 1);
      last.setStart(text, text.textContent!.length - 1); last.setEnd(text, text.textContent!.length);
      return { start: first.getBoundingClientRect().x, stop: last.getBoundingClientRect().x };
    });
    expect(direction.stop).toBeGreaterThan(direction.start);
    await page.goto(`/${locale}`);
    await settled(page);
    const footer = page.locator('.footer:not(.compact)');
    await footer.scrollIntoViewIfNeeded();
    await expect(footer.locator('.eyebrow')).toHaveText(locale === 'ar' ? 'انطلاقًا من مبدأ' : 'ON THE PRINCIPLE THAT');
    await expect(footer.locator('.footer-title-line')).toHaveText(locale === 'ar' ? ['لسّه فيه شيء', 'ما جرّبته.'] : ['There’s still more', 'I haven’t tried.']);
    const lines = await footer.locator('.footer-title-line').evaluateAll(elements => elements.map(e => ({ y: e.getBoundingClientRect().y, h: e.getBoundingClientRect().height, color: getComputedStyle(e).color })));
    expect(lines[1].y).toBeGreaterThanOrEqual(lines[0].y + lines[0].h - 1);
    expect(lines[1].color).toBe('rgb(162, 63, 37)');
    await expect(footer.locator('.contact-mail a').first()).toHaveAttribute('href', 'mailto:razanadil7890@gmail.com');
    await expect(footer.locator('.contact-mail a').last()).toHaveAttribute('href', 'https://wa.me/966502882129');
  });
}

test('mobile menu closes on current route and scrolls in landscape', async ({ page }, info) => {
  test.skip(info.project.name !== 'mobile');
  await page.goto('/ar/about');
  await settled(page);
  await page.locator('.menu-toggle').click();
  await page.locator('.mobile-nav a[href="/ar/about"]').click();
  await expect(page.locator('.mobile-nav')).toHaveCount(0);
  await page.locator('.menu-toggle').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('.mobile-nav')).toHaveCount(0);
  await page.setViewportSize({ width: 844, height: 390 });
  await page.locator('.menu-toggle').click();
  const nav = page.locator('.mobile-nav');
  await expect(nav).toBeVisible();
  const scrollable = await nav.evaluate(e => e.scrollHeight > e.clientHeight && getComputedStyle(e).overflowY === 'auto');
  expect(scrollable).toBeTruthy();
  await nav.getByRole('link', { name: 'خارج إطار المشاريع' }).scrollIntoViewIfNeeded();
  await nav.getByRole('link', { name: 'خارج إطار المشاريع' }).click();
  await expect(page).toHaveURL(/\/ar\/beyond$/);
  await expect(nav).toHaveCount(0);
});

for (const locale of ['en', 'ar'] as const) {
  test(`${locale}: main navigation and contact destinations`, async ({ page }, info) => {
    await page.goto(`/${locale}`);
    await settled(page);
    for (const route of ['work', 'about', 'contact']) {
      if (info.project.name === 'mobile') {
        await page.locator('.menu-toggle').click();
        await page.locator(`.mobile-nav a[href="/${locale}/${route}"]`).click();
      } else await page.locator(`.desktop-nav a[href="/${locale}/${route}"]`).click();
      await expect(page).toHaveURL(new RegExp(`/${locale}/${route}$`));
      await settled(page);
    }
    await expect(page.locator('.contact-methods a[href="mailto:razanadil7890@gmail.com"]')).toBeVisible();
    await expect(page.locator('.contact-methods a[href="tel:+966502882129"]')).toBeVisible();
    await expect(page.locator('.contact-methods a[href="https://wa.me/966502882129"]')).toHaveAttribute('target', '_blank');
    await expect(page.locator('.contact-socials a')).toHaveCount(3);
  });
}

test('reduced motion disables animation and reacts to preference changes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en');
  await settled(page);
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  const first = await page.locator('canvas').evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  await page.waitForTimeout(250);
  const second = await page.locator('canvas').evaluate((canvas: HTMLCanvasElement) => canvas.toDataURL());
  expect(second).toBe(first);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.waitForTimeout(300);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForTimeout(300);
  await expect(page.locator('html')).not.toHaveClass(/lenis/);
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
  await page.goto('/ar');
  await settled(page);
  await expect(page.locator('html')).toHaveAttribute('dir', 'rtl');
  expect(await page.evaluate(() => document.getAnimations().filter(animation => animation.playState === 'running').length)).toBe(0);
});
