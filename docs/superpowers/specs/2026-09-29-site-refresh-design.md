# Holy Spirit Ministries site refresh — design

Date: 2026-09-29
Status: draft, awaiting owner review

## Goal

Make the existing React/Vite/Tailwind site responsive, modern-looking, and animated on scroll, without losing working features (routes, Next Steps forms, modals, data utils). Represent a ministry that facilitates immersive encounters with the Holy Spirit by calling on the name of Jesus consecutively.

## Approach

Foundation-first refresh: replace tokens, layout primitives, nav and animation system, then restyle each section on top of them. Not a restyle-in-place (would leave per-component breakpoint drift) and not a full rebuild (would risk working features).

Stack stays: React 19, Vite 6, Tailwind **v3** (the prompt templates assume v4; migrating gains nothing here), React Router 7, `react-icons`. No new runtime dependencies.

Guardrails come from the owner's website rebuild prompt template (not included), adapted as below.

## Doctrinal framing (owner decisions)

- Voice: warm invitation, scripture-anchored (e.g. Acts 2:21, Rom 10:13, Joel 2:32), plus an open "Common questions" section answering the objection that tarrying / calling on the name repeatedly is unbiblical.
- The site states plainly and visibly (home page and Beliefs) that this is an immersive Holy Spirit experience, **not necessary for salvation**, aimed at feeling the Holy Spirit more deeply and breaking spiritual resistance and strongholds.
- truthrightlydivided.com is reference for topics and structure only. Its stance opposes the practice; no copy or framing is taken from it.
- No depictions of Jesus with a face or racial identity.

## Code standards (owner requirement)

- Modular: small single-purpose components; page files only compose sections.
- DRY is a must: shared content (nav links, socials, FAQ entries, scripture, next-step copy) lives in one data module each and is rendered from there; shared UI (Section, Container, Reveal, Button, Modal, cards) is reused, never copied; repeated class strings become components or shared constants.

## 1. Foundation

- Design tokens in `tailwind.config.js` (navy, royal blue, gold from the logo; warm off-white text). No ad hoc color values in components.
- **Breakpoint convention (declared once):** mobile and tablet share one layout; only `lg` (1024px) changes structure. Any component using another breakpoint is a bug.
- Shared `Section` and `Container` components own gutters and vertical rhythm.
- Sections that must fill a phone viewport use `h-dvh`, never `h-screen`/`100vh`.
- Where mobile and desktop need different structure, both blocks are driven from the same data, never hand-duplicated.

## 2. Shell and routing

- Deployment: **GitHub Pages**. `BrowserRouter`, Vite `base` set to `/hs-website-v1/` (existing private repo `kingdomb/hs-website-v1`), `404.html` redirect-and-decode SPA fallback, `history.scrollRestoration = 'manual'`, scroll to top on route change.
- `robots` `noindex, nofollow` and matching canonical stay in place; making the site indexable is postponed (owner decision), which harms nothing.
- Nav rebuilt: mobile menu is `fixed inset-0` with body scroll locked while open; rendered as a sibling of any blurred/transformed parent (no `fixed` inside `backdrop-filter`/`filter`/`transform` ancestors). Menu links close the menu first, then scroll on the next animation frame.
- Header height and content offset come from one shared value.
- Logo link uses router `Link` to `/`, scrolling to top if already home, identical on all routes and sizes.
- Nav links and social icons live in one shared data file, rendered everywhere from that source.
- No `http://` asset URLs.

## 3. Motion

- One `Reveal` component (IntersectionObserver): fade + slide-up, with staggered children.
- Gentle parallax on the hero dove only.
- Everything disabled under `prefers-reduced-motion`.
- Any scroll-triggered floating UI uses a plain `scroll` listener with `getBoundingClientRect()`.

## 4. Pages

- **Home:** hero, "what this is" (with the not-for-salvation statement), how an encounter works, Next Steps (existing cards and modal kept), events, give, newsletter.
- **About:** vision, beliefs.
- **FAQs:** a dedicated `/faqs` page answering the tarrying / calling-on-the-name objections, with scripture, plus the not-for-salvation statement. The same Q&A data also feeds a `FaqDialog` modal (reusing the existing `Modal`) that opens from Home and About, so the content exists once.
- **Give:** existing content, restyled.
- Existing mock event data and "coming soon" worship state are preserved.

## 5. Images

- Source: what remains in `images/`, optimized to WebP at responsive sizes (I do the cropping, resizing, grading, compression).
- Gaps filled with free-commercial-license photos (Unsplash / Pexels / Pixabay), no identifiable face of Jesus, all logged in a credits file with source and license.
- Not usable without owner edits: images with baked-in text or logos (two female thumbnails), any watermarked image. Watermark removal is out of scope for me; flagged to the owner when relevant.
- `breaking-habitual-sin.jpg` is a low-resolution text tile: usable as a small card only.

## 6. Verification

Before any responsive work is called done:
- Check computed values (element sizes, scroll positions), not just class names.
- Iframe harness at exact widths: 360, 600, 768, 900, 1024, 1280, including in-between widths.
- Exercise mobile menu, reveal animations, modals, route changes, and 404 fallback.
- `npm run build` and `npm run lint` clean.

## Out of scope

Backend/DB wiring (events, worship, news stay mock/static), CMS, Tailwind v4 migration, dependency vulnerability cleanup (47 audit findings noted, untouched).

## Open items

- Copy for Beliefs, the practice, and FAQs: I draft, owner edits.
- GitHub Pages on a **private** repo needs a paid GitHub plan; otherwise the repo must be made public, or another host used. Owner to decide before deploy.
- Production go-live (flips `robots`/canonical), postponed.
