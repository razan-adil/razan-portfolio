# Razan Adil — Design. Develop. Intelligence.

A bilingual creative portfolio for **Razan Adil Alghamdi**, at the intersection of UI/UX, front-end development, data science and AI agents.

## Run locally

Requires Node.js 22.13 or newer.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3000/en` or `/ar`.

```sh
npm run typecheck
npm run build
npm start
```

With the production server running, `npm test` checks the actual HTTP output of all 24 localized pages, document language and direction, page landmarks, attribution, public media and 404 responses. `TEST_BASE_URL` can target a deployed site.

After `npm run build`, run `npm run test:browser` for Playwright checks of desktop/mobile navigation, filters, gallery/grid, mouse drag and touch swipe, language switching, 320–1440px layouts, contact links and reduced motion. The suite uses an isolated installed Edge on Windows; on other platforms install Chromium with `npx playwright install chromium`. It starts a production preview if none is running.

With a preview server running, `npm run screenshots` captures the home, work, Jobs case study, contact page and yellow contact section in both languages on desktop and mobile. Set `TEST_BASE_URL` to capture the published site. Captures wait for fonts, visible images and entrance/scroll animations; screenshots and reports are saved under ignored `artifacts/`.

## Implementation

- Next.js App Router, TypeScript and Tailwind CSS 4.
- GSAP and ScrollTrigger for entrance and scroll motion; Lenis for desktop wheel scrolling.
- Original Canvas brass sculpture; no stock template or copied reference source/assets.
- Perspective gallery with category filters, grid mode, swipe controls and keyboard navigation.
- English/Arabic routes, server-rendered `lang`/`dir`, route-preserving language switching.
- Six independent case studies; About, Beyond Projects, Contact and Privacy pages.
- Self-hosted open-source fonts and optimized project images; reduced-motion support.
- Localized metadata, alternate-language links, sitemap, robots and social preview.

## Content and media

Approved bilingual content lives in `lib/content.ts`. The source ledger is `docs/sources-research.md`.

The Jobs case study retains its editorial cover and adds real public captures of the opportunities board and opportunity details, each explaining Razan's front-end contribution. DClean screenshots come from its public repository and show fictional demonstration data. Road Accident Severity Classification includes a verbatim, attributed preprocessing excerpt from the public team repository. Editorial covers remain explicitly labeled and are not fabricated product interfaces. The leadership assessment link opens the **original product**, not Razan's redesign. Individual contributions and team ownership are distinguished in each case study. No internal employer records are included. See `docs/media-needed.md` for the remaining real media.

Font packages carry their original open-source license notices in `node_modules/@fontsource*`.

## Deploy on Vercel

The repository is configured as a standard Next.js application. Import it into Vercel or run:

```sh
npx vercel --prod
```

On Windows PowerShell use `npx.cmd`. `NEXT_PUBLIC_SITE_URL` may be set to a custom production domain. Without it, canonical metadata and the sitemap use Vercel's production project URL. No API keys are needed by the portfolio.

## Verification limits

Build, TypeScript and HTTP checks can be performed without browser access. Browser screenshots, device overflow checks and live animation/interaction verification require a working permitted browser connection. See `docs/verification.md` for the delivery evidence.
