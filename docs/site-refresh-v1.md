# Site refresh v1 — "dark and ivory" build

Built originally on the `site-refresh` branch of the ministry's first repository (14 commits); this repository starts from that version's final state.
Status: complete and reviewed; deployed to GitHub Pages (see "Deploying" below).
Design spec: `docs/superpowers/specs/2026-09-29-site-refresh-design.md`
Implementation plan: `docs/superpowers/plans/2026-09-29-site-refresh.md`

This document records what this version of the site is, how it is built, and what is
still open, so a different styling approach can be explored on another branch and
compared against it.

## What it is

A responsive, scroll-animated site for Holy Spirit Ministries, a non-denominational,
event-based ministry that facilitates immersive encounters with the Holy Spirit by
calling on the name of Jesus. The site says plainly that an encounter is **not necessary
for salvation**; it is for feeling the Holy Spirit more deeply and seeing spiritual
resistance and strongholds broken.

Pages: `/` (Home), `/about`, `/faqs`, `/give`. There is also an FAQ dialog that opens from
Home and About.

## Visual language

- **Palette** (tokens in `tailwind.config.js`): `navy` 950/900/800/700, `royal` 400/500/600,
  `gold` 300/400/500, `ivory` 50/100. Taken from the logo (royal blue and gold).
- **Type:** Cormorant Garamond for headings (`font-display`), Inter for body (`font-sans`),
  loaded from Google Fonts in `index.html`.
- **Structure:** dark navy sections (`deep`/`mid` tones) alternating with ivory (`light`)
  sections; a light glass header and light footer so the blue logo stays legible.
- **Motion:** `Reveal` fade/slide-up on scroll (IntersectionObserver), staggered inside
  `CardGrid`, hero parallax (`useParallax`), auto-rotating scripture and image carousel
  (pausable). Everything is disabled under `prefers-reduced-motion`.

## Responsive convention

One rule, stated once and enforced by grep: **mobile and tablet share one layout; only `lg:`
(1024px) may change structure.** There are no `sm:`, `md:`, `xl:` or `2xl:` prefixes anywhere
in `src/`. Card grids adapt without breakpoints via `CardGrid`
(`repeat(auto-fit, minmax(min(100%, X), 1fr))`). Full-screen sections use `min-h-dvh`, never
`h-screen`/`100vh`. Header height is one CSS variable, `--header-h` (`4.5rem` in
`src/index.css`); the header uses `h-header` and heroes use `pt-header`, so they cannot drift.

Other layout rules kept: no `position: fixed` element inside a transformed or blurred
ancestor (the mobile menu is a **sibling** of the blurred header; modals use `createPortal`),
mobile menu is `fixed inset-0` with body scroll locked, and menu links close the menu first
and scroll afterward.

## Architecture

```
src/
  main.jsx            BrowserRouter with basename = import.meta.env.BASE_URL
  App.jsx             routes + Header, ScrollManager, Newsletter, Footer
  index.css           Tailwind layers, --header-h, .reveal styles
  data/               ONE module per kind of content (single source of truth)
    site.js  nav.js  socials.js  scripture.js  encounter.js  faqs.js  beliefs.js
    vision.js  leaders.js  giving.js  nextSteps.js  events.js
  hooks/              useReveal  useRotation  useParallax  useScrollLock  useTithelyScript
  utils/              nextEvents.js (recurring-event dates)  mapEvents*/mapNews* (future DB)
                      prefersReducedMotion.js
  components/
    ui/               Section Container SectionHeading Reveal CardGrid Button Accordion
                      ResponsiveImage Field  + tones.js, fieldClasses.js
    layout/           Header MobileMenu ScrollManager
    hero/             PageHero
    home/  about/  give/  faq/  shared/   page sections, dialogs, forms
  pages/              Home About Faqs Give
scripts/optimize-images.py   writes responsive WebP variants to src/assets/img/
public/404.html              GitHub Pages SPA fallback
```

**Content is data-driven.** Nav links, socials, FAQs, beliefs, vision, scripture, events,
giving, Next Steps copy each live in one `src/data/*.js` module and are rendered from there.
Shared UI is reused, not copied.

**Images.** `scripts/optimize-images.py` reads named sources and writes
`src/assets/img/<name>-<width>.webp` (never upscaled). `ResponsiveImage` builds a `srcSet`
from those files by name (`hero-dove`, `dove`, `woman-praying`, `surrender`, `open-door`,
`light-figure`, `worship-service`, `meals-handout`, `thanksgiving-meal`, `christmas-meal`).
To add an image: add a line to `SOURCES`, run `python3 scripts/optimize-images.py`, and use
its name. Provenance is listed in `docs/image-credits.md`. Rule: no depiction of Jesus with a
face.

**Events** are computed, not stored: `src/data/events.js` defines the recurring events
(second-Sunday food outreach, Thanksgiving, Christmas) and `src/utils/nextEvents.js` works
out the next date for each, so dates never go stale. No time-of-day is shown because none was
supplied.

## Run it

```bash
npm install
npm run dev        # http://127.0.0.1:5173/  (base path is / in dev)
npm run build      # production build; base path is /hs-website-v1/
npm run lint
```

Note for tooling that sandboxes network access: the dev server must run outside the sandbox
for a browser to reach it.

## Deploying (GitHub Pages)

Deployed to GitHub Pages from the `gh-pages` branch of `kingdomb/hs-website-v1`:
https://kingdomb.github.io/hs-website-v1/. Run `npm run deploy` to rebuild and republish.
Vite `base` is `/hs-website-v1/` for builds only (`vite.config.js`); `public/404.html` plus a
decoder script in `index.html` restore deep links such as `/hs-website-v1/faqs?x=1#y`.
`robots` is `noindex, nofollow` and stays that way until the owner decides to go live.

## Placeholders to fill

| What | Where | Behavior until filled |
|---|---|---|
| Tithe.ly form ID | `src/data/giving.js` (`TITHELY_FORM_ID`) | Give button shows disabled "Giving coming soon"; no Tithe.ly script loads |
| Email, address | `src/data/site.js` | Footer shows "Email coming soon" / "Address coming soon" |
| Social accounts | `src/data/socials.js` | Nothing renders |
| Leaders | `src/data/leaders.js` | Leadership section hidden |
| Event links, times, venues | `src/data/events.js` | Cards show "Atlanta" only; links are inert |
| Newsletter provider | `NewsletterSignupSection.jsx` (`TODO(owner)`) | Shows a "coming soon" confirmation; nothing is sent |

## Open decisions before going public

1. **Forms discard submissions.** Prayer request, Next Steps forms and the phone "Send Code"
   button send data nowhere (`// TODO: send to backend`; PhoneVerify accepts `123456`). This
   predates the refresh and was not changed. Either disable them or wire a backend.
2. **Draft copy needs the owner's review** (`src/data/`): the description of what happens at
   an encounter, the answer to the "tarrying" objection, the salvation wording, and the phone
   number `678.561.2308`, which was carried over from the old footer and is unconfirmed.
3. **Godhead wording** was deliberately left out of Beliefs until supplied.
4. **"Start a PrayerGroup"** is a no-op (`onStart={() => {}}` in `NextStepsSection`), so
   `StartPrayerGroupForm` is unreachable.
5. Old clutter not touched: `src/assets.zip`, `src/assets/derivatives_bundle.zip` and two
   CSVs (not bundled into the build, only repo weight).

## What was verified

- `npm run lint` clean; `npm run build` passes (about 307 kB JS, 110 kB gzip).
- Widths 360, 480, 600, 768, 900, 1024, 1280 on every page: no horizontal overflow, one `h1`
  per page, hero fills exactly one dynamic viewport on Home.
- Mobile menu (lock, Escape, focus return, `aria-expanded`), all dialogs, form labels, modal
  Tab trap and focus restore, carousel/scripture pause, same-hash re-scroll.
- Sweeps over `src/`: no breakpoint prefixes other than `lg:`, no hex colors in components,
  no `h-screen`/`100vh`, no `http://` URLs, no hotlinked images, none of the previous
  template church's content.
- Not verified in a real GitHub Pages deploy; and hash-scroll could not be observed in the
  automated browser tab used for testing because a backgrounded tab pauses
  `requestAnimationFrame` (it worked in a visible tab).

## Known minor items (deferred)

Mobile menu has Escape and focus return but no Tab trap; `ImageCarousel` caption and dots
would overlap if a caption were ever used; `Button` focus-ring offset assumes a dark
background; `useRotation` has no guard for a shrinking list; `mapEventsToOptions` still emits
an `icon` string that `WorshipOptionCard` ignores; leader photos use a raw `<img>`.

## Using this as a baseline

Everything that defines the look lives in a small set of places, which is what another
styling approach would replace: `tailwind.config.js` (tokens), `src/index.css`,
`src/components/ui/*` (primitives), `src/components/hero/PageHero.jsx`,
`src/components/layout/*`, and the per-section components. The content, routing, data
modules, hooks, image pipeline and form behavior are style-independent and can be kept as is.
