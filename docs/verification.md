# Delivery verification — 26 November 2026

Production: https://razan-portfolio-kappa.vercel.app

Source: https://github.com/razan-adil/razan-portfolio

## Actual checks

- Production build and TypeScript passed after the changes.
- All 5 HTTP test groups passed: 24 localized pages, document language/direction, project attribution, public media/security headers and 404 responses.
- Playwright used isolated headless Microsoft Edge contexts after the user explicitly authorized this method. The native browser connector remained unavailable; browser testing was not skipped.
- The full local production-browser suite passed 19 tests, with one desktop instance of the mobile-menu test skipped as inapplicable.
- The same full browser suite then passed against the public Vercel production URL: 19 passed, 1 inapplicable desktop menu case skipped, 0 failures. The 5 HTTP test groups also passed against that URL.
- EN/AR layouts checked at 320, 375, 414, 768, 1024, 1280 and 1440px. The mobile menu was additionally checked at 844×390 in landscape.
- Actual browser actions covered every project filter, gallery/grid switching, six-project wraparound, keyboard focus, mouse dragging, CDP touch swiping, opening projects, nested route language switching, main navigation and contact destinations.
- Contact statement verified as two lines, with the approved exact Arabic wording and rust-colored second line. Latin punctuation order was measured in the actual browser.
- Reduced motion was tested at initial load and when toggling the preference. A real bug was found: ScrollTrigger restores an inline `scroll-behavior:smooth` after preference changes. The reduced-motion rule now overrides that inline value. The regression passed on desktop and mobile.
- Source review found two mobile-menu issues, now corrected: landscape overflow and selecting the already-open route without closing the menu.
- Twenty real screenshots were captured after fonts, visible images and entrance/scroll animations settled. Arabic views were visually reviewed by the main agent; English views and the contact section at 320/390/1440px were independently inspected. No clipping, collisions, missing images or unintended page overflow was observed in those captures.
- The final 20 screenshot files were recaptured from the public production URL, with loaded fonts and no page errors recorded in `capture-report.json`. The delivery archive is `artifacts/portfolio-screenshots-2026-11-26.zip`.
- Footer email/WhatsApp touch targets measured 44px high. Contact-page email targets measured 77–101px in the diagnostic review.

## Evidence and limits

- Jobs uses two authentic captures of the public opportunities board and one public detail page, with scoped front-end contribution captions. No sign-in, application submission or internal dashboard access was used.
- DClean displays public fictional-demo images and team attribution. Road Accident Severity Classification displays a verbatim, attributed source excerpt without invented evaluation results.
- Leadership screenshots from the original product are not presented as Razan’s redesign.
- Remaining authentic media is itemized in `media-needed.md`; provenance is in `sources-research.md`.
- Mobile checks use browser device emulation, not physical phone hardware. Safari and Firefox were not tested.
- Browser reports, traces and screenshots are under ignored `artifacts/`. They are verification artifacts, not product assets.
- CLI deployment works. Automatic deployments on GitHub push are not claimed because the initial provider connection failed.
