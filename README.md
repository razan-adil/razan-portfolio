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

With the production server running, `npm test` checks the actual HTTP output of all 24 localized pages, document language and direction, page landmarks, attribution, public media and 404 responses. `TEST_BASE_URL` can target a deployed site. These checks do not substitute for visual browser or interaction testing.

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

DClean screenshots come from its public repository and show fictional demonstration data. Other project covers are original editorial illustrations, explicitly labeled as covers. They are not screenshots or fabricated product interfaces. The leadership assessment link opens the **original product**, not Razan's redesign. Individual contributions and team ownership are distinguished in each case study. No internal employer records are included.

Font packages carry their original open-source license notices in `node_modules/@fontsource*`.

## Deploy on Vercel

The repository is configured as a standard Next.js application. Import it into Vercel or run:

```sh
npx vercel --prod
```

On Windows PowerShell use `npx.cmd`. `NEXT_PUBLIC_SITE_URL` may be set to a custom production domain. Without it, canonical metadata and the sitemap use Vercel's production project URL. No API keys are needed by the portfolio.

## Verification limits

Build, TypeScript and HTTP checks can be performed without browser access. Browser screenshots, device overflow checks and live animation/interaction verification require a working permitted browser connection. See `docs/verification.md` for the delivery evidence.
