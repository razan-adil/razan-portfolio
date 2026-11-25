import test from 'node:test';
import assert from 'node:assert/strict';
import { projects } from '../lib/content.ts';

const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:3000';
const locales = ['en', 'ar'] as const;
const pages = ['', '/work', '/about', '/beyond', '/contact', '/privacy', ...projects.map(p => `/work/${p.slug}`)];

test('every public route serves one main landmark and one page heading', async () => {
  for (const locale of locales) for (const page of pages) {
    const response = await fetch(`${base}/${locale}${page}`);
    assert.equal(response.status, 200, `${locale}${page}`);
    const html = await response.text();
    assert.equal((html.match(/<main\b/g) || []).length, 1, `${locale}${page}: main landmark`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${locale}${page}: page heading`);
    assert.ok(!html.includes('NEXT_HTTP_ERROR_FALLBACK'), `${locale}${page}: no server error`);
  }
});

test('Arabic is available in the initial HTML with correct document direction', async () => {
  for (const locale of locales) {
    const html = await (await fetch(`${base}/${locale}`)).text();
    assert.match(html, new RegExp(`<html[^>]*lang="${locale}"`));
    assert.match(html, new RegExp(`<html[^>]*dir="${locale === 'ar' ? 'rtl' : 'ltr'}"`));
    assert.ok(html.includes(locale === 'ar' ? 'رزان' : 'Razan'));
  }
});

test('case study output preserves original product and team attribution', async () => {
  const leadership = await (await fetch(`${base}/en/work/founders-leadership`)).text();
  assert.ok(leadership.includes('View the original product'));
  assert.ok(leadership.includes('not my redesign'));
  for (const slug of ['dclean', 'road-accident-severity']) {
    const html = await (await fetch(`${base}/en/work/${slug}`)).text();
    assert.ok(html.toLowerCase().includes('team project'), `${slug}: collaboration`);
  }
});

test('public media and security headers are served', async () => {
  for (const path of ['/icon.svg', '/projects/dclean-dashboard.png', '/projects/dclean-validation.png']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('x-content-type-options'), 'nosniff');
  }
});

test('invalid locales and project URLs return a not-found response', async () => {
  for (const path of ['/xx', '/en/work/this-project-does-not-exist']) {
    const response = await fetch(base + path);
    assert.equal(response.status, 404, path);
  }
});
