# Holy Spirit Ministries Site Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the site responsive, modern and scroll-animated, remove all leftover content from the template church it was copied from, and add an FAQs page + modal.

**Architecture:** Foundation first: design tokens, one breakpoint convention, single-source data modules, and a small set of shared UI primitives (`Section`, `Container`, `Reveal`, `CardGrid`, `Accordion`, `ResponsiveImage`, `Button`). Then rebuild the shell (header, mobile menu, footer, routing for GitHub Pages), then restyle pages on top of the primitives.

**Tech Stack:** React 19, Vite 6, Tailwind v3.4, React Router 7, react-icons. No new runtime dependencies. Python 3 + Pillow (already installed) for one-off image optimization.

**Spec:** `docs/superpowers/specs/2026-09-29-site-refresh-design.md`

## Global Constraints

- **One breakpoint convention:** mobile and tablet share one layout; only `lg:` (1024px) may change structure. **No `sm:`, `md:`, `xl:`, `2xl:` prefixes anywhere in `src/`.** Card grids use intrinsic `auto-fit/minmax` (`CardGrid`), not breakpoints. Verified by grep in Task 11.
- **Design tokens only:** colors/fonts come from `tailwind.config.js`. No hex values or `bg-[#...]` in components.
- **DRY / modular:** shared content lives in one module under `src/data/`; shared UI lives in `src/components/ui/`; no copy-pasted blocks; a class string used 3+ times becomes a component.
- **No `position: fixed` inside an ancestor with `backdrop-filter`/`filter`/`transform`.** The mobile menu is a **sibling** of the blurred header. Modals use `createPortal` (already do).
- **`h-dvh`/`min-h-dvh`, never `h-screen`/`100vh`.**
- **Header height comes from one CSS variable** `--header-h` (set in `index.css`); header uses it, hero padding uses it.
- **No `http://` URLs; no hotlinked images from other sites.** Every image is a local file.
- **Deploy target GitHub Pages:** `base` = `/hs-website-v1/` in build only (dev stays at `/`), `BrowserRouter` `basename` from `import.meta.env.BASE_URL`, `public/404.html` SPA fallback, scroll-to-top on route change.
- **`robots` stays `noindex, nofollow`.** Indexing is postponed.
- **No depiction of Jesus with a face.** Motion respects `prefers-reduced-motion`.
- **Copy is DRAFT** for the owner to edit. The ministry is **non-denominational** and **event-based** (no weekly services, so no service times anywhere). Where a fact is unknown (email, address, socials, leaders, Tithe.ly form id, Godhead wording), the data module holds an empty value and the UI shows a clearly-labelled placeholder (e.g. "Email coming soon") or hides the element, as specified per task. Never invent facts.
- **Git:** never `git add -A` / `git add .` (the repo root holds untracked dotfiles like `.bashrc`). Add explicit paths. Before the first commit, ask the owner whether to commit per task on a `site-refresh` branch.
- **Dev server** must run **outside the sandbox** (`dangerouslyDisableSandbox: true`) so the owner's browser can reach it; port 5173, host 127.0.0.1.
- There is **no unit-test framework** in this repo and none is added (YAGNI). Verification per task = `npm run lint`, `npm run build`, targeted `grep` checks, and browser checks at real widths.

## Findings the plan responds to (from reading the repo)

1. The repo is a fork of **Transformation Church, Thunder Bay (Wesleyan)**: name, address, email, socials, Wesleyan beliefs, "Sandra Jagger" leader, and hotlinked cloudfront/wesleyan.ca/tithelysetup images are all still in the code (files: BeliefsSection, WelcomeSection, VisionSection, WhyWeGive, WaysToGive, TopBar, SocialIcons, MainNav, MoreNextStepsDialog, About, Footer, LeadershipSection, RecurringGiving, TithelyAppSection).
2. **`GiveSection` used a Tithe.ly `formId` that may belong to the template church.** Owner decision: use a placeholder. `giving.js` ships with an empty form id; the Give button renders disabled as "Giving coming soon" until the owner supplies their own id.
3. `Jumbotron` shifts content with `-translate-x-80` (breaks on phones); `NextStepCard` is an `<a target=_blank>` used as a button; `RecurringGiving`'s Give button does nothing and uses an undefined `bg-primary`; footer phone displays `678.561.2308` but the `tel:` link dials `1-807-356-4352`; Home's mock event images use `/src/assets/...` strings that break in production builds; mock event dates are in 2025 (past, so replaced by events computed from the real recurring schedule); `ScriptureRotator` and `ImageCarousel` duplicate rotation logic; `Modal` panel can't scroll on short screens; `VisionSection` depends on the Google Material Icons font.
4. Hero image `spirit-of-baptism-bird.jpg` is only 800px wide; use the existing 1500px `...jumbotron-1500x1000-bluegrade.jpg` for the hero.
5. Correction to an earlier remark: `holyspirit-thumbnail-female.jpg` is clean (no text) and usable; only `female2` has baked-in text.

## File Structure

**Create**
- `scripts/optimize-images.py` — writes responsive WebP variants to `src/assets/img/`
- `src/data/site.js`, `nav.js`, `socials.js`, `scripture.js`, `encounter.js`, `faqs.js`, `beliefs.js`, `vision.js`, `leaders.js`, `giving.js`, `nextSteps.js`, `events.js`
- `src/utils/prefersReducedMotion.js`
- `src/hooks/useReveal.js`, `useRotation.js`, `useParallax.js`, `useScrollLock.js`, `useTithelyScript.js`
- `src/components/ui/tones.js`, `Container.jsx`, `Section.jsx`, `SectionHeading.jsx`, `Reveal.jsx`, `CardGrid.jsx`, `Button.jsx`, `Accordion.jsx`, `ResponsiveImage.jsx`
- `src/components/layout/Header.jsx`, `MobileMenu.jsx`, `ScrollManager.jsx`
- `src/components/hero/PageHero.jsx`
- `src/components/faq/FaqDialogButton.jsx`
- `src/components/shared/SalvationNotice.jsx`, `TithelyGiveButton.jsx`
- `src/components/home/HowItWorksSection.jsx`
- `src/pages/Faqs.jsx`
- `public/404.html`, `docs/image-credits.md`

**Modify:** `tailwind.config.js`, `index.html`, `vite.config.js`, `src/index.css`, `src/main.jsx`, `src/App.jsx`, `Modal.jsx`, `Footer.jsx`, `SocialIcons.jsx`, `ScriptureRotator.jsx`, `ImageCarousel.jsx`, `WelcomeSection.jsx`, `SectionTextBlock.jsx`, `NextStepsSection.jsx`, `NextStepCard.jsx`, `MoreNextStepsDialog.jsx`, `WorshipOptionsSection.jsx`, `WorshipOptionCard.jsx`, `UpcomingEventsSection.jsx`, `EventCard.jsx`, `GiveSection.jsx`, `NewsletterSignupSection.jsx`, `BeliefsSection.jsx`, `VisionSection.jsx`, `LeadershipSection.jsx`, `pages/Home.jsx`, `About.jsx`, `Give.jsx`, `give/*.jsx`

**Delete:** `TopBar.jsx`, `MainNav.jsx`, `HeroSection.jsx`, `Jumbotron.jsx`, `shared/Button.jsx` (after replacements land)

---

### Task 1: Branch, baseline, tokens, fonts, global CSS

**Files:**
- Modify: `tailwind.config.js`, `index.html`, `src/index.css`

**Interfaces:**
- Produces: Tailwind colors `navy-{950,900,800,700}`, `royal-{400,500,600}`, `gold-{300,400,500}`, `ivory-{50,100}`; fonts `font-display` (Cormorant Garamond), `font-sans` (Inter); spacing key `header` (`h-header`, `pt-header`) = `var(--header-h)`; CSS classes `.reveal` / `[data-shown='true']`.

- [ ] **Step 1: Create branch and record the lint/build baseline**

```bash
cd <repo root>
git checkout -b site-refresh
npm run lint 2>&1 | tail -15
npm run build 2>&1 | tail -5
```
Expected: build passes. Note the lint error count (baseline); the plan only requires that lint errors in files we touch are zero at the end.

- [ ] **Step 2: Write `tailwind.config.js`**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#050a1c', 900: '#0a1233', 800: '#101c4d', 700: '#182a6e' },
        royal: { 400: '#5b7bff', 500: '#2f54eb', 600: '#2443c4' },
        gold: { 300: '#f0d17a', 400: '#e4b84d', 500: '#d29d22' },
        ivory: { 50: '#fbf9f3', 100: '#f4efe3' },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      spacing: { header: 'var(--header-h)' },
      boxShadow: { glow: '0 0 60px -10px rgba(228, 184, 77, 0.35)' },
    },
  },
  plugins: [],
};
```

- [ ] **Step 3: Write `src/index.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --header-h: 4.5rem; /* single source: Header height AND hero top padding */
  }
  html {
    scroll-behavior: smooth;
    scroll-padding-top: var(--header-h);
  }
  body {
    @apply bg-navy-950 font-sans text-ivory-50 antialiased;
  }
  h1,
  h2,
  h3 {
    @apply font-display;
  }
  img {
    @apply max-w-full;
  }
}

/* Scroll-reveal (see components/ui/Reveal.jsx) */
.reveal {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 0.7s ease, transform 0.7s cubic-bezier(0.2, 0.7, 0.2, 1);
  transition-delay: var(--reveal-delay, 0ms);
}
.reveal[data-shown='true'] {
  opacity: 1;
  transform: none;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

- [ ] **Step 4: Update `index.html` head** (fonts via Google Fonts stylesheet, drop Material Icons, keep `noindex`, add no-JS fallback; the SPA redirect decoder is added in Task 5)

Replace the `<link href="https://fonts.googleapis.com/icon?...Material+Icons">` line with:

```html
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap"
      rel="stylesheet"
    />
    <noscript><style>.reveal{opacity:1;transform:none}</style></noscript>
    <meta name="description" content="Holy Spirit Ministries — an immersive encounter with the Holy Spirit by calling on the name of Jesus." />
```
Also change `<title>` unchanged. (Material Icons is still used by `VisionSection`/`WorshipOptionCard` until Tasks 8-10 remove those uses.)

- [ ] **Step 5: Verify and commit**

```bash
npm run build 2>&1 | tail -4
git add tailwind.config.js index.html src/index.css
git commit -m "feat(foundation): design tokens, fonts, reveal CSS"
```
Expected: build passes.

---

### Task 2: Image pipeline

**Files:**
- Create: `scripts/optimize-images.py`, `docs/image-credits.md`, generated `src/assets/img/*.webp`

**Interfaces:**
- Produces: files `src/assets/img/<name>-<width>.webp` for names `hero-dove`, `dove`, `woman-praying`, `surrender`, `open-door`, `light-figure`, `worship-service`, `meals-handout`, `thanksgiving-meal`, `christmas-meal` (widths never exceed the source width).

- [ ] **Step 1: Write `scripts/optimize-images.py`**

```python
#!/usr/bin/env python3
"""Write responsive WebP variants to src/assets/img/<name>-<width>.webp.

Never upscales. Add a line to SOURCES to publish another image, then re-run:
    python3 scripts/optimize-images.py
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / 'src' / 'assets' / 'img'
WIDTHS = (480, 960, 1600)

# name -> source path relative to repo root
SOURCES = {
    'hero-dove': 'src/assets/spirit-of-baptism-bird-jumbotron-1500x1000-bluegrade.jpg',
    'dove': 'images/spirit-of-baptism-bird.jpg',
    'woman-praying': 'images/holyspirit-thumbnail-female.jpg',
    'surrender': 'images/surrender-male3.jpg',
    'open-door': 'images/open-door1.jpg',
    'light-figure': 'images/jesus-light.jpg',
    'worship-service': 'src/assets/worshiping-service-cross-1280x720_bottom-preserved.webp',
    'meals-handout': 'src/assets/meals-handout.webp',
    'thanksgiving-meal': 'src/assets/thanksgiving-meal.webp',
    'christmas-meal': 'src/assets/christmas-meal.jpg',
}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    for name, rel in SOURCES.items():
        src = Image.open(ROOT / rel).convert('RGB')
        widths = sorted({min(w, src.width) for w in WIDTHS})
        for w in widths:
            h = round(src.height * w / src.width)
            path = OUT / f'{name}-{w}.webp'
            src.resize((w, h), Image.LANCZOS).save(path, 'WEBP', quality=80, method=6)
            print(f'{path.relative_to(ROOT)}  {w}x{h}  {path.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
```

- [ ] **Step 2: Run it**

```bash
python3 scripts/optimize-images.py
```
Expected: one line per variant, no errors; hero-dove has 480/960/1500 variants.

- [ ] **Step 3: Visually check three outputs** with the Read tool (`hero-dove-1500.webp`, `surrender-736.webp`, `open-door-575.webp`). Confirm no artifacts and no visible faces of Jesus.

- [ ] **Step 4: Write `docs/image-credits.md`**

```markdown
# Image credits

Every image on the site is listed here with its origin and license.

| Name | Source | License |
|---|---|---|
| hero-dove, dove, woman-praying, surrender, open-door, light-figure | Supplied by the site owner (`images/`) | Owner-supplied; owner to confirm rights (several appear AI-generated) |
| worship-service, meals-handout, thanksgiving-meal, christmas-meal | Supplied by the site owner (`src/assets/`) | Owner-supplied |

Add new stock photos here with URL, photographer, and license (Unsplash / Pexels / Pixabay only).
```

- [ ] **Step 5: Commit**

```bash
git add scripts/optimize-images.py docs/image-credits.md src/assets/img
git commit -m "feat(images): responsive WebP pipeline"
```

---

### Task 3: Single-source data modules (with draft copy)

**Files:** Create all `src/data/*.js` listed above.

**Interfaces (Produces):**
- `site.js`: `SITE {name, tagline, phone:{display,href}, email, address}`, `SALVATION_NOTICE` (string)
- `nav.js`: `NAV_LINKS [{label,to}]`, `NAV_CTA {label,to}`
- `socials.js`: `SOCIAL_LINKS [{href,label,Icon}]` (empty until owner supplies)
- `scripture.js`: `HERO_SCRIPTURE [{quote,ref}]`, `PRACTICE_VERSES [{quote,ref}]`
- `encounter.js`: `ENCOUNTER_STEPS [{title,body}]`
- `faqs.js`: `FAQS [{title, body, refs?}]` (Accordion item shape)
- `beliefs.js`: `BELIEFS [{title, body, refs?}]`
- `vision.js`: `VISION_ITEMS [{title, body}]` (Accordion item shape)
- `leaders.js`: `LEADERS []` of `{name, role, photo?}`
- `giving.js`: `GIVING {tithelyFormId, enabled, formUrl, kioskUrl, appLinks[]}` (empty/false until the owner adds a Tithe.ly form id)
- `nextSteps.js`: `NEXT_STEP_CARDS`, `FORM_COPY`, `FORM_IMAGES`
- `events.js`: `EVENT_DEFS` (recurring events; rule `second-sunday` | `thanksgiving` | `christmas`); `utils/nextEvents.js`: `getUpcomingEventRows(defs, from?) => rows` for `mapEventsToCards` (`imageUrl` holds an image *name* from Task 2)

- [ ] **Step 1: `src/data/site.js`**

```js
export const SITE = {
  name: 'Holy Spirit Ministries',
  tagline: 'Encounter the Holy Spirit by calling on the name of Jesus.',
  phone: { display: '678.561.2308', href: 'tel:+16785612308' },
  email: '', // PLACEHOLDER: footer shows "Email coming soon" until set
  address: null, // PLACEHOLDER: { lines: ['Street', 'City, ST ZIP'], mapUrl: 'https://…' } — footer shows "Address coming soon" until set
};

// One statement, reused on Home, Beliefs and FAQs.
export const SALVATION_NOTICE =
  'A Holy Spirit encounter is an immersive experience — it is not necessary for salvation. Salvation is by grace through faith in Jesus. An encounter is for feeling the Holy Spirit more deeply and for seeing spiritual resistance and strongholds broken.';
```

- [ ] **Step 2: `src/data/nav.js`**

```js
export const NAV_LINKS = [
  { label: 'Encounter', to: '/#encounter' },
  { label: 'Events', to: '/#events' },
  { label: 'About', to: '/about' },
  { label: 'FAQs', to: '/faqs' },
  { label: 'Give', to: '/give' },
];

export const NAV_CTA = { label: 'Take a next step', to: '/#next-steps' };
```

- [ ] **Step 3: `src/data/socials.js`**

```js
// Owner: add the ministry's real accounts. Shape:
// { href: 'https://…', label: 'YouTube', Icon: FaYoutube }  (Icon from react-icons/fa)
// Rendered by SocialIcons; nothing renders while this is empty.
export const SOCIAL_LINKS = [];
```

- [ ] **Step 4: `src/data/scripture.js`**

```js
export const HERO_SCRIPTURE = [
  { quote: 'He will teach you everything and will remind you of everything I have told you.', ref: 'John 14:26 (NLT)' },
  { quote: 'When the Spirit of truth comes, he will guide you into all truth.', ref: 'John 16:13 (NLT)' },
  { quote: 'The Holy Spirit helps us in our weakness.', ref: 'Romans 8:26 (NLT)' },
];

// KJV (public domain)
export const PRACTICE_VERSES = [
  { quote: 'And it shall come to pass, that whosoever shall call on the name of the Lord shall be saved.', ref: 'Acts 2:21 (KJV)' },
  { quote: 'If ye then, being evil, know how to give good gifts unto your children: how much more shall your heavenly Father give the Holy Spirit to them that ask him?', ref: 'Luke 11:13 (KJV)' },
  { quote: 'And be not drunk with wine, wherein is excess; but be filled with the Spirit.', ref: 'Ephesians 5:18 (KJV)' },
];
```

- [ ] **Step 5: `src/data/encounter.js`** (DRAFT — owner to confirm what actually happens)

```js
export const ENCOUNTER_STEPS = [
  {
    title: 'Come as you are',
    body: 'Whether you are seeking, returning, or already walking with Jesus, you are welcome. Nothing is required of you to belong here.',
  },
  {
    title: 'Call on His name',
    body: 'Together we call on the name of Jesus — unhurried, sincere, and for as long as your heart wants to. There is no script and no pressure.',
  },
  {
    title: 'Receive and respond',
    body: 'We make room for the Holy Spirit to meet you: to comfort, to fill, and to break what has held you back. Then we help you take your next step.',
  },
];
```

- [ ] **Step 6: `src/data/faqs.js`** (DRAFT copy; scripture KJV)

```js
import { SALVATION_NOTICE } from './site';

export const FAQS = [
  {
    title: 'Do I have to do this to be saved?',
    body: `No. ${SALVATION_NOTICE} If you believe in Jesus, you already belong to Him.`,
    refs: ['Ephesians 2:8-9', 'Romans 10:9'],
  },
  {
    title: 'When do you meet?',
    body: 'We are event-based, not a weekly-service church. Encounters and community outreach are announced on our home page. Our regular outreach includes a homeless food outreach every second Sunday of the month, plus community meals at Thanksgiving and Christmas.',
  },
  {
    title: 'What happens at an encounter?',
    body: 'We gather, hear a short word from Scripture, and then invite everyone to call on the name of Jesus together. You can join in fully, sit quietly, or step out at any time. Prayer team members are available if you would like someone to pray with you.',
  },
  {
    title: 'Why call on the name of Jesus over and over?',
    body: 'Scripture invites us to call on the name of the Lord, and He hears us the first time we ask sincerely. We are not trying to be heard louder. Repeating His name is a way of quieting distractions and turning our whole attention toward Him, the way a person might repeat a name they love. It is a posture of dependence, not a formula that forces God’s hand.',
    refs: ['Joel 2:32', 'Acts 2:21', 'Psalm 116:13', '1 John 5:14-15'],
  },
  {
    title: 'Some say “tarrying” is not biblical. What do you say?',
    body: 'We agree on much of it. In Acts the Spirit came suddenly, at different times and in different ways, and no one waited in order to earn Him. He can fill a person at any time and in any place, and He is never bound to a method. We do not teach that you must tarry, and we do not ask you to earn anything. What we offer is an unhurried, expectant time of prayer, because Scripture also shows believers praying together, asking, and being filled. Faithful believers see this differently, and we respect that.',
    refs: ['Acts 1:14', 'Acts 2:2', 'Acts 4:31', 'Acts 10:44', 'Luke 11:13'],
  },
  {
    title: 'What do you mean by resistance and strongholds?',
    body: 'Scripture speaks of strongholds: patterns of fear, pride, unforgiveness, habit or bondage that resist God in our lives. We believe the Holy Spirit is gentle but not passive; He comforts, and He also refines and frees. An encounter is a time of surrender where we ask Him to do that work. It is not a guarantee of a particular result, and it does not replace medical or professional counseling care.',
    refs: ['2 Corinthians 10:4', '2 Corinthians 3:17'],
  },
  {
    title: 'How will I know the Holy Spirit has met me?',
    body: 'People experience Him differently: peace, tears, stillness, joy, or nothing they can feel in the moment. Not feeling something does not mean He is absent. Over time, look for the fruit: changed desires, new freedom, and growing love for Jesus and for people.',
    refs: ['Galatians 5:22-23'],
  },
  {
    title: 'Who can come?',
    body: 'Anyone. If you have been away, are unsure what you believe, or have never been to anything like this, you are welcome. If you are ready to give or recommit your life to Christ, you can tell us through the Next Steps on our home page.',
  },
];
```

- [ ] **Step 7: `src/data/beliefs.js`** (DRAFT — non-denominational; Godhead wording deliberately omitted until the owner supplies it)

```js
export const BELIEFS = [
  { title: 'Non-denominational', body: 'We are a non-denominational ministry, open to believers from every church background. Our focus is Jesus, the Word, and the work of the Holy Spirit.' },
  { title: 'Salvation by grace', body: 'We are saved by grace through faith in Jesus Christ alone — not by works, and not by any experience.', refs: ['Ephesians 2:8-9'] },
  { title: 'The Word of God', body: 'The Bible is God’s Word and our authority for faith and life.' },
  { title: 'The Holy Spirit', body: 'The Holy Spirit is our Helper, Teacher and Comforter. He lives in believers and empowers them to live for Jesus.', refs: ['John 14:26'] },
  { title: 'Being filled with the Spirit', body: 'Believers are invited to go deeper — to be filled with the Spirit and to walk in holiness. An encounter is one way we seek this together; it is a gift to receive, not a requirement.', refs: ['Ephesians 5:18', 'Acts 2:38'] },
  { title: 'Calling on the name of Jesus', body: 'We call on the name of Jesus as Scripture invites us to, in sincere and expectant prayer.', refs: ['Romans 10:13'] },
  { title: 'Comforter and refiner', body: 'The Spirit is gentle and He is holy. He comforts us, and He also corrects and frees us so that we become more like Jesus.', refs: ['Galatians 5:22-23'] },
];
```

- [ ] **Step 8: `src/data/vision.js`**

```js
export const VISION_ITEMS = [
  { title: 'Welcome', body: 'Everyone is welcome — whether you are seeking, returning, or already walking with Jesus.' },
  { title: 'Encounter', body: 'We make unhurried space to call on the name of Jesus and to meet the Holy Spirit.' },
  { title: 'Walk', body: 'An encounter is a beginning. We help you walk daily in the Spirit through prayer, Scripture, and community.' },
  { title: 'Serve', body: 'We carry His love into Atlanta through community meals and outreach.' },
];
```

- [ ] **Step 9: `src/data/leaders.js`, `giving.js`**

```js
// leaders.js — owner: add { name, role, photo? }. The Leadership section is hidden while empty.
export const LEADERS = [];
```

```js
// giving.js
// PLACEHOLDER (owner decision): paste the ministry's own Tithe.ly form id below.
// While empty, the Give button renders disabled as "Giving coming soon" and the
// form/kiosk links and app badges are hidden.
const TITHELY_FORM_ID = '';

export const GIVING = {
  tithelyFormId: TITHELY_FORM_ID,
  enabled: Boolean(TITHELY_FORM_ID),
  formUrl: TITHELY_FORM_ID ? `https://give.tithe.ly/?formId=${TITHELY_FORM_ID}` : '',
  kioskUrl: TITHELY_FORM_ID ? `https://give.tithe.ly/?formId=${TITHELY_FORM_ID}&kiosk=true` : '',
  // App-store badges are only useful once a Tithe.ly account exists; owner adds them later.
  appLinks: [],
};
```

- [ ] **Step 10: `src/data/nextSteps.js`** (moved out of `NextStepsSection` so cards, modal and forms share one source)

```js
import prayerIcon from '../assets/yellow-prayer-hands.png';
import groupsIcon from '../assets/green-join-groups.png';
import moreIcon from '../assets/next-steps-hamburger.png';
import servingImg from '../assets/Serving.jpg';
import givingImg from '../assets/Giving.jpg';
import commitImg from '../assets/Commit.jpg';
import recommitImg from '../assets/Recommit.jpg';

export const NEXT_STEP_CARDS = [
  { id: 'prayer', title: 'Ask for Prayer', text: "We'd love to pray with you.", img: prayerIcon },
  { id: 'group', title: 'Join a PrayerGroup', text: 'Find the people you can grow, laugh, and pray with.', img: groupsIcon },
  { id: 'more', title: 'More Next Steps', text: 'Find the next step on your journey.', img: moreIcon },
];

export const FORM_COPY = {
  serving: { title: 'Start Serving', subtitle: 'Use your gifts to be part of what God is doing here.', submitLabel: 'Start Serving' },
  giving: { title: 'Start Giving', subtitle: 'Put God first in your finances.', submitLabel: 'Start Giving' },
  commit: { title: 'Commit to Christ', subtitle: 'Share your decision to follow Jesus so we can support you.', submitLabel: 'Share My Decision' },
  recommit: { title: 'Recommit to Christ', subtitle: 'Tell us about your decision and we’ll help build your faith.', submitLabel: 'Share My Decision' },
};

export const FORM_IMAGES = { serving: servingImg, giving: givingImg, commit: commitImg, recommit: recommitImg };
```

- [ ] **Step 11: `src/data/events.js` and `src/utils/nextEvents.js`** (events are computed from the recurring schedule, so dates never go stale. No time-of-day is shown because none was supplied.)

```js
// data/events.js — the ministry is event-based; these are its recurring events.
// rule: 'second-sunday' (every month) | 'thanksgiving' (4th Thursday of November) | 'christmas' (Dec 25)
export const EVENT_DEFS = [
  { id: 'second-sunday-serve', name: 'Second Sunday Serve — Homeless Food Outreach', city: 'Atlanta', image: 'meals-handout', rule: 'second-sunday', link: '#' },
  { id: 'thanksgiving', name: 'Thanksgiving Community Meal', city: 'Atlanta', image: 'thanksgiving-meal', rule: 'thanksgiving', link: '#' },
  { id: 'christmas', name: 'Christmas Community Meal', city: 'Atlanta', image: 'christmas-meal', rule: 'christmas', link: '#' },
];
```

```js
// utils/nextEvents.js — dates are local calendar days (no time-of-day).
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

// n-th given weekday (0=Sun) of a month; month may overflow (12 -> next January).
const nthWeekday = (year, month, weekday, n) => {
  const first = new Date(year, month, 1);
  const offset = (weekday - first.getDay() + 7) % 7;
  return new Date(year, month, 1 + offset + (n - 1) * 7);
};

const RULES = {
  'second-sunday': (from) => {
    let d = nthWeekday(from.getFullYear(), from.getMonth(), 0, 2);
    if (d < startOfDay(from)) d = nthWeekday(from.getFullYear(), from.getMonth() + 1, 0, 2);
    return d;
  },
  thanksgiving: (from) => {
    let d = nthWeekday(from.getFullYear(), 10, 4, 4);
    if (d < startOfDay(from)) d = nthWeekday(from.getFullYear() + 1, 10, 4, 4);
    return d;
  },
  christmas: (from) => {
    let d = new Date(from.getFullYear(), 11, 25);
    if (d < startOfDay(from)) d = new Date(from.getFullYear() + 1, 11, 25);
    return d;
  },
};

// -> rows in the shape mapEventsToCards expects, soonest first.
export function getUpcomingEventRows(defs, from = new Date()) {
  return defs
    .map((def) => ({
      id: def.id,
      name: def.name,
      city: def.city,
      imageUrl: def.image, // an image *name* (see ResponsiveImage)
      link: def.link,
      startsOn: RULES[def.rule](from).toISOString(),
    }))
    .sort((a, b) => new Date(a.startsOn) - new Date(b.startsOn));
}
```
`startsOn` is a local-midnight instant; `mapEventsToCards` reads it back with `new Date(...)` in the local zone, so the displayed day is correct. Step 12 checks this.

- [ ] **Step 12: Verify and commit**

```bash
node --input-type=module -e "const m = await import('./src/utils/nextEvents.js'); const { EVENT_DEFS } = await import('./src/data/events.js'); for (const from of ['2026-09-29','2026-12-26']) console.log(from, m.getUpcomingEventRows(EVENT_DEFS, new Date(from+'T12:00:00')).map(r => r.id+' '+new Date(r.startsOn).toDateString()))"
# Expected 2026-09-29: second-sunday-serve Sun Oct 11 2026, thanksgiving Thu Nov 26 2026, christmas Fri Dec 25 2026
# Expected 2026-12-26: second-sunday-serve Sun Jan 10 2027, thanksgiving Thu Nov 25 2027, christmas Sat Dec 25 2027
npm run lint 2>&1 | grep -E "src/data|src/utils" || echo "data: clean"
npm run build 2>&1 | tail -3
git add src/data
git commit -m "feat(data): single-source content modules with draft copy"
```

---

### Task 4: Hooks and UI primitives

**Files:** Create `src/utils/prefersReducedMotion.js`, `src/hooks/*.js`, `src/components/ui/*`. Modify `Modal.jsx`, `ScriptureRotator.jsx`, `ImageCarousel.jsx`.

**Interfaces (Produces):**
- `prefersReducedMotion(): boolean`
- `useReveal(opts?) => [ref, shown]`; `useRotation(length, intervalMs?, fadeMs?) => {index, visible, goTo(n)}`; `useParallax(factor?) => ref`; `useScrollLock(locked: boolean)`
- `TONES` = `{deep|mid|light: {section, eyebrow}}`
- `<Container className>`; `<Section tone id className>`; `<SectionHeading eyebrow title subtitle tone className>`; `<Reveal as delay className>`; `<CardGrid min className>`; `<Button variant='primary'|'outline'|'dark' to|href|onClick>`; `<Accordion items tone>` items = `{title, body, refs?}`; `<ResponsiveImage name alt sizes className …img props>`

- [ ] **Step 1: `src/utils/prefersReducedMotion.js`**

```js
export default function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
```

- [ ] **Step 2: `src/hooks/useReveal.js`**

```js
import { useEffect, useRef, useState } from 'react';
import prefersReducedMotion from '../utils/prefersReducedMotion';

export default function useReveal({ threshold = 0.15, rootMargin = '0px 0px -8% 0px' } = {}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(
    () => prefersReducedMotion() || typeof IntersectionObserver === 'undefined'
  );

  useEffect(() => {
    const node = ref.current;
    if (shown || !node) return undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [shown, threshold, rootMargin]);

  return [ref, shown];
}
```

- [ ] **Step 3: `src/hooks/useRotation.js`** (replaces duplicated timers in ScriptureRotator and ImageCarousel)

```js
import { useCallback, useEffect, useRef, useState } from 'react';
import prefersReducedMotion from '../utils/prefersReducedMotion';

export default function useRotation(length, intervalMs = 6000, fadeMs = 350) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [still] = useState(prefersReducedMotion);
  const fadeTimer = useRef();

  const goTo = useCallback(
    (next) => {
      clearTimeout(fadeTimer.current);
      setVisible(false);
      fadeTimer.current = setTimeout(() => {
        setIndex(((next % length) + length) % length);
        setVisible(true);
      }, fadeMs);
    },
    [length, fadeMs]
  );

  useEffect(() => {
    if (length < 2 || still || !visible) return undefined;
    const t = setTimeout(() => goTo(index + 1), intervalMs);
    return () => clearTimeout(t);
  }, [index, visible, length, still, intervalMs, goTo]);

  useEffect(() => () => clearTimeout(fadeTimer.current), []);

  return { index, visible, goTo };
}
```

- [ ] **Step 4: `src/hooks/useParallax.js`, `useScrollLock.js`**

```js
// useParallax.js — translate an element by scrollY * factor (rAF-throttled, off under reduced motion)
import { useEffect, useRef } from 'react';
import prefersReducedMotion from '../utils/prefersReducedMotion';

export default function useParallax(factor = 0.12) {
  const ref = useRef(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || prefersReducedMotion()) return undefined;
    let raf = 0;
    const update = () => {
      raf = 0;
      node.style.transform = `translate3d(0, ${Math.round(window.scrollY * factor)}px, 0)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [factor]);
  return ref;
}
```

```js
// useScrollLock.js — lock <body> scroll while `locked` (used by MobileMenu and Modal)
import { useEffect } from 'react';

export default function useScrollLock(locked) {
  useEffect(() => {
    if (!locked) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [locked]);
}
```

- [ ] **Step 5: `src/components/ui/tones.js`, `Container.jsx`, `Section.jsx`, `SectionHeading.jsx`, `Reveal.jsx`, `CardGrid.jsx`**

```js
// tones.js
export const TONES = {
  deep: { section: 'bg-navy-950 text-ivory-50', eyebrow: 'text-gold-400' },
  mid: { section: 'bg-navy-900 text-ivory-50', eyebrow: 'text-gold-400' },
  light: { section: 'bg-ivory-50 text-navy-900', eyebrow: 'text-royal-600' },
};
```

```jsx
// Container.jsx
const Container = ({ className = '', children }) => (
  <div className={`mx-auto w-full max-w-6xl px-5 lg:px-8 ${className}`}>{children}</div>
);
export default Container;
```

```jsx
// Section.jsx
import { TONES } from './tones';

const Section = ({ tone = 'deep', id, className = '', children }) => (
  <section id={id} className={`${TONES[tone].section} py-20 lg:py-28 ${className}`}>
    {children}
  </section>
);
export default Section;
```

```jsx
// Reveal.jsx
import useReveal from '../../hooks/useReveal';

const Reveal = ({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) => {
  const [ref, shown] = useReveal();
  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={{ '--reveal-delay': `${delay}ms` }}
      className={`reveal ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};
export default Reveal;
```

```jsx
// SectionHeading.jsx
import Reveal from './Reveal';
import { TONES } from './tones';

const SectionHeading = ({ eyebrow, title, subtitle, tone = 'deep', className = '' }) => (
  <Reveal className={`mx-auto mb-12 max-w-2xl text-center ${className}`}>
    {eyebrow && (
      <p className={`mb-3 text-sm font-semibold uppercase tracking-[0.2em] ${TONES[tone].eyebrow}`}>
        {eyebrow}
      </p>
    )}
    <h2 className='text-4xl font-semibold leading-tight lg:text-5xl'>{title}</h2>
    {subtitle && <p className='mt-4 text-lg opacity-80'>{subtitle}</p>}
  </Reveal>
);
export default SectionHeading;
```

```jsx
// CardGrid.jsx — intrinsic responsive grid (no breakpoints) with staggered reveal
import { Children } from 'react';
import Reveal from './Reveal';

const CardGrid = ({ min = '16rem', className = '', children }) => (
  <div
    className={`grid gap-6 ${className}`}
    style={{ gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))` }}
  >
    {Children.toArray(children).map((child, i) => (
      <Reveal key={child.key ?? i} delay={i * 80} className='h-full'>
        {child}
      </Reveal>
    ))}
  </div>
);
export default CardGrid;
```

- [ ] **Step 6: `src/components/ui/Button.jsx`**

```jsx
import { Link } from 'react-router-dom';

const VARIANTS = {
  primary: 'bg-gold-400 text-navy-950 hover:bg-gold-300',
  outline: 'border border-ivory-50/60 text-ivory-50 hover:bg-ivory-50 hover:text-navy-950',
  dark: 'bg-navy-900 text-ivory-50 hover:bg-navy-800',
};
const BASE =
  'inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950';

export default function Button({ variant = 'primary', to, href, className = '', children, ...rest }) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type='button' className={cls} {...rest}>{children}</button>;
}
```

- [ ] **Step 7: `src/components/ui/Accordion.jsx`** (used by Vision, Beliefs and FAQs)

```jsx
import { useId, useState } from 'react';
import { FiChevronDown } from 'react-icons/fi';

const Accordion = ({ items, tone = 'deep' }) => {
  const [open, setOpen] = useState(null);
  const base = useId();
  const divider = tone === 'light' ? 'divide-navy-900/15' : 'divide-ivory-50/15';
  const ref = tone === 'light' ? 'text-royal-600' : 'text-gold-400';

  return (
    <div className={`divide-y ${divider}`}>
      {items.map((item, i) => {
        const isOpen = open === i;
        const panelId = `${base}-${i}`;
        return (
          <div key={item.title}>
            <h3 className='m-0'>
              <button
                type='button'
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className='flex w-full items-center justify-between gap-4 py-5 text-left font-display text-2xl font-semibold'
              >
                {item.title}
                <FiChevronDown className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
              </button>
            </h3>
            <div
              id={panelId}
              role='region'
              className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className='overflow-hidden'>
                <p className='pb-2 leading-relaxed opacity-90'>{item.body}</p>
                {item.refs && (
                  <p className={`pb-5 text-sm font-medium ${ref}`}>{item.refs.join(' · ')}</p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default Accordion;
```

- [ ] **Step 8: `src/components/ui/ResponsiveImage.jsx`**

```jsx
// Builds srcSet from the WebP variants written by scripts/optimize-images.py.
const files = import.meta.glob('../../assets/img/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
});

const variants = {};
Object.entries(files).forEach(([path, url]) => {
  const m = path.match(/\/([^/]+)-(\d+)\.webp$/);
  if (!m) return;
  if (!variants[m[1]]) variants[m[1]] = [];
  variants[m[1]].push({ width: Number(m[2]), url });
});
Object.values(variants).forEach((list) => list.sort((a, b) => a.width - b.width));

const ResponsiveImage = ({ name, alt, sizes = '100vw', className = '', ...rest }) => {
  const list = variants[name];
  if (!list) {
    if (import.meta.env.DEV) console.warn(`ResponsiveImage: no variants for "${name}"`);
    return null;
  }
  return (
    <img
      src={list[list.length - 1].url}
      srcSet={list.map((v) => `${v.url} ${v.width}w`).join(', ')}
      sizes={sizes}
      alt={alt}
      loading='lazy'
      decoding='async'
      className={className}
      {...rest}
    />
  );
};
export default ResponsiveImage;
```

- [ ] **Step 9: Refactor `Modal.jsx`** — use `useScrollLock`, make the panel scrollable on short screens, retheme.

Replace the `useEffect` block with:

```jsx
import useScrollLock from '../../hooks/useScrollLock';
// …
  useScrollLock(isOpen);
  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);
```
Change overlay class to `fixed inset-0 z-50 flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm` and panel class to `relative w-full ${maxWidth} max-h-[90dvh] overflow-y-auto rounded-2xl bg-ivory-50 p-6 text-left text-navy-900 shadow-xl`. Change the title class `text-gray-900` → `text-navy-900` and the title tag to `font-display text-2xl`. Remove the trailing commented example block.

- [ ] **Step 10: Refactor `ScriptureRotator.jsx` and `ImageCarousel.jsx` to `useRotation`**

```jsx
// ScriptureRotator.jsx
import useRotation from '../../hooks/useRotation';

const ScriptureRotator = ({ items = [], intervalMs = 6000, className = '' }) => {
  const { index, visible } = useRotation(items.length, intervalMs);
  if (!items.length) return null;
  const { quote, ref } = items[index];
  return (
    <div className={`mx-auto mt-6 min-h-[7rem] max-w-2xl text-lg italic text-ivory-50 lg:text-xl ${className}`}>
      <div className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
        <span className='block'>&ldquo;{quote}&rdquo;</span>
        <span className='mt-2 block text-sm not-italic text-gold-300'>{ref}</span>
      </div>
    </div>
  );
};
export default ScriptureRotator;
```

```jsx
// ImageCarousel.jsx — items: [{ name, alt, caption? }] (name = ResponsiveImage name)
import ResponsiveImage from '../ui/ResponsiveImage';
import useRotation from '../../hooks/useRotation';

const ImageCarousel = ({ items = [], intervalMs = 6000 }) => {
  const { index, visible, goTo } = useRotation(items.length, intervalMs, 300);
  if (!items.length) return null;
  const { name, alt, caption } = items[index];
  const arrow =
    'absolute top-1/2 -translate-y-1/2 rounded-full bg-navy-950/50 px-3 py-2 text-ivory-50 backdrop-blur-sm hover:bg-navy-950/80';

  return (
    <div className='relative overflow-hidden rounded-2xl bg-navy-900 shadow-glow'>
      <ResponsiveImage
        name={name}
        alt={alt}
        sizes='(min-width: 1024px) 560px, 100vw'
        className={`aspect-[16/10] w-full object-cover transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
      />
      {caption && <div className='absolute inset-x-0 bottom-0 bg-navy-950/60 p-2 text-sm'>{caption}</div>}
      <button type='button' aria-label='Previous image' onClick={() => goTo(index - 1)} className={`${arrow} left-2`}>‹</button>
      <button type='button' aria-label='Next image' onClick={() => goTo(index + 1)} className={`${arrow} right-2`}>›</button>
      <div className='absolute inset-x-0 bottom-3 flex justify-center gap-2'>
        {items.map((it, i) => (
          <button
            key={it.name}
            type='button'
            aria-label={`Show image ${i + 1}`}
            onClick={() => goTo(i)}
            className={`h-2 w-2 rounded-full ${i === index ? 'bg-ivory-50' : 'bg-ivory-50/50'}`}
          />
        ))}
      </div>
    </div>
  );
};
export default ImageCarousel;
```

- [ ] **Step 11: Verify and commit**

```bash
npm run lint 2>&1 | grep -E "src/(hooks|components/ui|utils)|Modal|Rotator|Carousel" || echo "clean"
npm run build 2>&1 | tail -3
git add src/utils src/hooks src/components/ui src/components/shared/Modal.jsx src/components/shared/ScriptureRotator.jsx src/components/home/ImageCarousel.jsx
git commit -m "feat(ui): shared hooks and primitives; dedupe rotation and scroll lock"
```
(Expected: build passes; `ImageCarousel` is temporarily used with old `src` items until Task 8 updates `WelcomeSection`, so build still passes — it only renders at runtime.)

---

### Task 5: Routing and GitHub Pages deploy plumbing

**Files:**
- Modify: `vite.config.js`, `src/main.jsx`, `index.html`
- Create: `public/404.html`, `src/components/layout/ScrollManager.jsx`

**Interfaces:**
- Produces: `<ScrollManager />` (place inside the router): scrolls to top on path change, or to `#hash` target on the next frame.

- [ ] **Step 1: `vite.config.js`**

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project site lives under /hs-website-v1/; local dev stays at /.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/hs-website-v1/' : '/',
  plugins: [react()],
}));
```

- [ ] **Step 2: `src/main.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

- [ ] **Step 3: `public/404.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Holy Spirit Ministries</title>
    <script>
      // GitHub Pages SPA fallback: turn /repo/about into /repo/?/about, decoded in index.html.
      var pathSegmentsToKeep = 1;
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
          l.pathname.split('/').slice(0, 1 + pathSegmentsToKeep).join('/') + '/?/' +
          l.pathname.slice(1).split('/').slice(pathSegmentsToKeep).join('/').replace(/&/g, '~and~') +
          (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
          l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

- [ ] **Step 4: Add the decoder to `index.html` `<head>`** (before the module script)

```html
    <script>
      (function (l) {
        if (l.search[1] === '/') {
          var decoded = l.search.slice(1).split('&').map(function (s) { return s.replace(/~and~/g, '&'); }).join('?');
          window.history.replaceState(null, null, l.pathname.slice(0, -1) + decoded + l.hash);
        }
      })(window.location);
    </script>
```

- [ ] **Step 5: `src/components/layout/ScrollManager.jsx`**

```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

// Runs after route commit (and after any scroll lock has been released).
export default function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      return undefined;
    }
    const raf = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    });
    return () => cancelAnimationFrame(raf);
  }, [pathname, hash]);
  return null;
}
```

- [ ] **Step 6: Verify production build paths and 404 file**

```bash
npm run build 2>&1 | tail -3
grep -o 'href="[^"]*favicon[^"]*"' dist/index.html | head -3
ls dist/404.html
```
Expected: favicon hrefs start with `/hs-website-v1/`; `dist/404.html` exists. (`dist` is gitignored — confirm with `git check-ignore dist`.)

- [ ] **Step 7: Commit**

```bash
git add vite.config.js src/main.jsx index.html public/404.html src/components/layout/ScrollManager.jsx
git commit -m "feat(routing): GitHub Pages base, SPA fallback, scroll manager"
```

---

### Task 6: Shell — Header, MobileMenu, Footer, SocialIcons, App

**Files:**
- Create: `src/components/layout/Header.jsx`, `MobileMenu.jsx`
- Modify: `Footer.jsx`, `SocialIcons.jsx`, `App.jsx`, `NewsletterSignupSection.jsx`
- Delete: `TopBar.jsx`, `MainNav.jsx`

**Interfaces:**
- Consumes: `NAV_LINKS`, `NAV_CTA`, `SITE`, `SOCIAL_LINKS`, `useScrollLock`, `Button`, `Container`
- Produces: `<Header />` (returns a fragment: `<header>` **and** `<MobileMenu>` as siblings)

- [ ] **Step 1: `MobileMenu.jsx`** (viewport-anchored, scroll-locked, close-then-navigate)

```jsx
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import useScrollLock from '../../hooks/useScrollLock';
import { NAV_LINKS, NAV_CTA } from '../../data/nav';
import Button from '../ui/Button';

// Rendered as a SIBLING of <header> (never inside its backdrop-filter).
const MobileMenu = ({ open, onClose }) => {
  useScrollLock(open);
  if (!open) return null;
  return (
    <div className='fixed inset-0 z-[60] flex flex-col bg-navy-950 p-6 lg:hidden' role='dialog' aria-modal='true' aria-label='Menu'>
      <button type='button' aria-label='Close menu' onClick={onClose} className='self-end p-2 text-ivory-50'>
        <FiX size={28} />
      </button>
      <ul className='mt-8 flex flex-col gap-6 font-display text-4xl'>
        {NAV_LINKS.map((l) => (
          <li key={l.label}>
            <Link to={l.to} onClick={onClose} className='block text-ivory-50 hover:text-gold-300'>{l.label}</Link>
          </li>
        ))}
      </ul>
      <Button to={NAV_CTA.to} onClick={onClose} className='mt-auto'>{NAV_CTA.label}</Button>
    </div>
  );
};
export default MobileMenu;
```

- [ ] **Step 2: `Header.jsx`**

```jsx
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { NAV_LINKS, NAV_CTA } from '../../data/nav';
import { SITE } from '../../data/site';
import logo from '../../assets/hs-letter-logo-nav.png';
import Button from '../ui/Button';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Logo: same behavior on every route and size — go home, or scroll to top if already there.
  const onLogo = (e) => {
    if (pathname === '/' && !hash) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 h-header border-b transition-colors duration-300 ${
          scrolled ? 'border-navy-900/10 bg-ivory-50/95 shadow-md backdrop-blur' : 'border-transparent bg-ivory-50/90 backdrop-blur'
        }`}
      >
        <div className='mx-auto flex h-full max-w-6xl items-center justify-between px-5 lg:px-8'>
          <Link to='/' onClick={onLogo} className='h-full py-3'>
            <img src={logo} alt={SITE.name} className='h-full w-auto' />
          </Link>
          <nav aria-label='Main' className='hidden items-center gap-8 lg:flex'>
            {NAV_LINKS.map((l) => (
              <Link key={l.label} to={l.to} className='font-medium text-navy-900 hover:text-royal-600'>{l.label}</Link>
            ))}
            <Button to={NAV_CTA.to} className='!py-2'>{NAV_CTA.label}</Button>
          </nav>
          <button type='button' aria-label='Open menu' onClick={() => setOpen(true)} className='p-2 text-navy-900 lg:hidden'>
            <FiMenu size={26} />
          </button>
        </div>
      </header>
      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
};
export default Header;
```

- [ ] **Step 3: `SocialIcons.jsx`** — render from `SOCIAL_LINKS`, hide when empty

```jsx
import { SOCIAL_LINKS } from '../../data/socials';

const SocialIcons = ({ size = 18, className = '' }) => {
  if (!SOCIAL_LINKS.length) return null;
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <a key={label} href={href} target='_blank' rel='noopener noreferrer' aria-label={label} className='hover:text-royal-600'>
          <Icon style={{ fontSize: size }} />
        </a>
      ))}
    </div>
  );
};
export default SocialIcons;
```

- [ ] **Step 4: `Footer.jsx`** — light footer (blue logo reads on ivory), data-driven, hides unknown fields

```jsx
import { Link } from 'react-router-dom';
import { NAV_LINKS } from '../../data/nav';
import { SITE } from '../../data/site';
import logo from '../../assets/hs-logo-combo.png';
import Container from '../ui/Container';
import SocialIcons from './SocialIcons';

const Footer = () => (
  <footer className='bg-ivory-50 text-navy-900'>
    <Container className='grid gap-10 py-14' >
      <div className='flex flex-col items-center gap-8 lg:flex-row lg:items-start lg:justify-between'>
        <img src={logo} alt={SITE.name} className='max-h-40 w-auto' />
        <div className='grid gap-8 text-center lg:grid-cols-3 lg:text-left'>
          <div>
            <h2 className='mb-2 text-xl'>Explore</h2>
            <ul className='space-y-1 text-sm'>
              {NAV_LINKS.map((l) => (
                <li key={l.label}><Link to={l.to} className='hover:text-royal-600'>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className='mb-2 text-xl'>Address</h2>
            {SITE.address ? (
              <p className='text-sm'>
                {SITE.address.lines.map((line) => (<span key={line} className='block'>{line}</span>))}
                {SITE.address.mapUrl && (
                  <a href={SITE.address.mapUrl} target='_blank' rel='noopener noreferrer' className='text-royal-600 underline'>View map</a>
                )}
              </p>
            ) : (
              <p className='text-sm opacity-60'>Address coming soon</p>
            )}
          </div>
          <div>
            <h2 className='mb-2 text-xl'>Contact</h2>
            <ul className='space-y-1 text-sm'>
              <li><a href={SITE.phone.href} className='hover:text-royal-600'>{SITE.phone.display}</a></li>
              <li>{SITE.email ? <a href={`mailto:${SITE.email}`} className='hover:text-royal-600'>{SITE.email}</a> : <span className='opacity-60'>Email coming soon</span>}</li>
            </ul>
            <SocialIcons className='mt-4 justify-center lg:justify-start' />
          </div>
        </div>
      </div>
    </Container>
    <div className='border-t border-navy-900/10 bg-ivory-100 py-3 text-center text-sm'>
      © {new Date().getFullYear()} {SITE.name}. All rights reserved.
    </div>
  </footer>
);
export default Footer;
```

- [ ] **Step 5: `App.jsx`**

```jsx
import { Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import ScrollManager from './components/layout/ScrollManager';
import Footer from './components/shared/Footer';
import NewsletterSignupSection from './components/shared/NewsletterSignupSection';
import Home from './pages/Home';
import About from './pages/About';
import Give from './pages/Give';
import Faqs from './pages/Faqs';

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/faqs' element={<Faqs />} />
          <Route path='/give' element={<Give />} />
        </Routes>
      </main>
      <NewsletterSignupSection />
      <Footer />
    </>
  );
}
```
(`Faqs` page is created in Task 9; until then create a one-line stub `export default () => null;` so the build passes, and replace it in Task 9.)

- [ ] **Step 6: Restyle `NewsletterSignupSection.jsx`** using `Section tone='mid'`, `Container`, tokens. Remove the hidden Rails inputs (`utf8`, `authenticity_token`) and the trailing commented notes. Keep a controlled email input and, until a provider is chosen, prevent the default submit and show an inline "Thanks — newsletter signup is coming soon." message (no fake POST to `/subscribers`, which doesn't exist on a static host).

```jsx
import { useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';

const NewsletterSignupSection = () => {
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault(); // TODO(owner): wire to a mailing-list provider; static hosting has no /subscribers endpoint
    setSent(true);
  };
  return (
    <Section tone='mid' className='!py-14'>
      <Container>
        <Reveal className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
          <div className='lg:w-1/2'>
            <h2 className='mb-2 text-3xl'>Stay in the loop</h2>
            <p className='opacity-80'>Get updates on encounters and outreach.</p>
          </div>
          <form onSubmit={onSubmit} className='flex flex-col gap-3 lg:w-1/2 lg:flex-row'>
            <label htmlFor='newsletter-email' className='sr-only'>Email address</label>
            <input
              id='newsletter-email' type='email' required placeholder='Your email'
              className='w-full rounded-full border border-ivory-50/30 bg-navy-950 px-5 py-3 text-ivory-50 placeholder:text-ivory-50/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300'
            />
            <button type='submit' className='rounded-full bg-gold-400 px-6 py-3 font-semibold text-navy-950 hover:bg-gold-300'>Subscribe</button>
          </form>
        </Reveal>
        {sent && <p role='status' className='mt-4 text-gold-300'>Thank you — newsletter signup is coming soon.</p>}
      </Container>
    </Section>
  );
};
export default NewsletterSignupSection;
```
(The `TODO(owner)` comment is the one intentional marker; it is called out in the final report.)

- [ ] **Step 7: Delete replaced files and verify**

```bash
git rm src/components/shared/TopBar.jsx src/components/shared/MainNav.jsx
npm run lint 2>&1 | grep -E "layout|Footer|SocialIcons|App.jsx|Newsletter" || echo "clean"
npm run build 2>&1 | tail -3
```

- [ ] **Step 8: Browser check (dev server outside sandbox)** at 360, 768, 1280 wide: header height equals `--header-h`; menu opens full-screen, page behind does not scroll, menu closes on link click and `/#next-steps` scrolls after closing; logo works from `/about`.

- [ ] **Step 9: Commit**

```bash
git add src/components/layout src/components/shared/Footer.jsx src/components/shared/SocialIcons.jsx src/components/shared/NewsletterSignupSection.jsx src/App.jsx src/pages/Faqs.jsx
git commit -m "feat(shell): header, mobile menu, footer, routing shell"
```

---

### Task 7: PageHero (replaces HeroSection + Jumbotron)

**Files:**
- Create: `src/components/hero/PageHero.jsx`
- Delete (after Tasks 8, 10 stop using them): `HeroSection.jsx`, `Jumbotron.jsx`, `shared/Button.jsx`

**Interfaces:**
- Consumes: `ResponsiveImage`, `useParallax`, `Container`
- Produces: `<PageHero eyebrow title subtitle image size='full'|'short' actions>{children}</PageHero>` — `children` render between subtitle and actions (scripture).

- [ ] **Step 1: Write `PageHero.jsx`**

```jsx
import useParallax from '../../hooks/useParallax';
import ResponsiveImage from '../ui/ResponsiveImage';
import Container from '../ui/Container';

const SIZES = { full: 'min-h-dvh', short: 'min-h-[60dvh]' };

const PageHero = ({ eyebrow, title, subtitle, image = 'hero-dove', size = 'short', actions, children }) => {
  const bg = useParallax(0.12);
  return (
    <section className={`relative isolate flex ${SIZES[size]} items-center overflow-hidden bg-navy-950 pt-header`}>
      <div ref={bg} className='absolute inset-x-0 -top-[15%] -z-10 h-[130%]' aria-hidden='true'>
        <ResponsiveImage name={image} alt='' sizes='100vw' loading='eager' fetchPriority='high' className='h-full w-full object-cover' />
      </div>
      <div className='absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/70 via-navy-950/40 to-navy-950' aria-hidden='true' />
      <Container className='py-16 text-center'>
        {eyebrow && <p className='mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-gold-400'>{eyebrow}</p>}
        <h1 className='mx-auto max-w-4xl text-5xl font-semibold leading-[1.05] lg:text-7xl'>{title}</h1>
        {subtitle && <p className='mx-auto mt-6 max-w-2xl text-lg opacity-90 lg:text-xl'>{subtitle}</p>}
        {children}
        {actions && <div className='mt-8 flex flex-col items-center justify-center gap-4 lg:flex-row'>{actions}</div>}
      </Container>
    </section>
  );
};
export default PageHero;
```

- [ ] **Step 2: Commit** (`git add src/components/hero && git commit -m "feat(hero): PageHero with parallax dove"`). Verified together with Task 8.

---

### Task 8: Home page

**Files:**
- Create: `SalvationNotice.jsx`, `HowItWorksSection.jsx`, `FaqDialogButton.jsx` (its dialog content uses Task 9's `FAQS`; write the file here)
- Modify: `pages/Home.jsx`, `WelcomeSection.jsx`, `SectionTextBlock.jsx`, `NextStepsSection.jsx`, `NextStepCard.jsx`, `MoreNextStepsDialog.jsx`, `WorshipOptionsSection.jsx`, `WorshipOptionCard.jsx`, `UpcomingEventsSection.jsx`, `EventCard.jsx`, `GiveSection.jsx`
- Create: `TithelyGiveButton.jsx`, `hooks/useTithelyScript.js`

**Interfaces:**
- Produces: `<SalvationNotice tone />`, `<FaqDialogButton variant>children</FaqDialogButton>`, `<TithelyGiveButton className>`, `useTithelyScript()`

- [ ] **Step 1: `SalvationNotice.jsx`**

```jsx
import { SALVATION_NOTICE } from '../../data/site';

const SalvationNotice = ({ tone = 'deep', className = '' }) => (
  <aside
    className={`rounded-2xl border-l-4 border-gold-400 p-5 text-lg leading-relaxed ${
      tone === 'light' ? 'bg-ivory-100 text-navy-900' : 'bg-ivory-50/5 text-ivory-50'
    } ${className}`}
  >
    {SALVATION_NOTICE}
  </aside>
);
export default SalvationNotice;
```

- [ ] **Step 2: `FaqDialogButton.jsx`** (self-contained button + modal; reuses `Modal` and `Accordion`)

```jsx
import { useState } from 'react';
import Modal from '../shared/Modal';
import Accordion from '../ui/Accordion';
import Button from '../ui/Button';
import SalvationNotice from '../shared/SalvationNotice';
import { FAQS } from '../../data/faqs';

const FaqDialogButton = ({ variant = 'outline', children = 'Common questions' }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant={variant} onClick={() => setOpen(true)}>{children}</Button>
      <Modal isOpen={open} onClose={() => setOpen(false)} title='Common questions' maxWidth='max-w-3xl'>
        <SalvationNotice tone='light' className='mb-4 !text-base' />
        <Accordion items={FAQS} tone='light' />
      </Modal>
    </>
  );
};
export default FaqDialogButton;
```

- [ ] **Step 3: `HowItWorksSection.jsx`**

```jsx
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import { ENCOUNTER_STEPS } from '../../data/encounter';

const HowItWorksSection = () => (
  <Section id='encounter' tone='mid'>
    <Container>
      <SectionHeading eyebrow='The encounter' title='Unhurried. Expectant. Open to Him.' subtitle='An encounter is a time set apart to call on the name of Jesus and make room for the Holy Spirit.' />
      <CardGrid min='17rem'>
        {ENCOUNTER_STEPS.map((step, i) => (
          <div key={step.title} className='h-full rounded-2xl border border-ivory-50/10 bg-navy-950/60 p-8'>
            <span className='font-display text-5xl text-gold-400'>{i + 1}</span>
            <h3 className='mt-2 text-2xl font-semibold'>{step.title}</h3>
            <p className='mt-3 opacity-80'>{step.body}</p>
          </div>
        ))}
      </CardGrid>
    </Container>
  </Section>
);
export default HowItWorksSection;
```

- [ ] **Step 4: Rewrite `SectionTextBlock.jsx` and `WelcomeSection.jsx`**

```jsx
// SectionTextBlock.jsx
import Button from '../ui/Button';

const SectionTextBlock = ({ heading, paragraph, buttonText, buttonTo, children }) => (
  <div>
    <h2 className='mb-4 text-4xl font-semibold lg:text-5xl'>{heading}</h2>
    <p className='mb-6 text-lg opacity-90'>{paragraph}</p>
    {children}
    {buttonText && <Button to={buttonTo} variant='outline'>{buttonText}</Button>}
  </div>
);
export default SectionTextBlock;
```

```jsx
// WelcomeSection.jsx
import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import ImageCarousel from './ImageCarousel';
import SectionTextBlock from './SectionTextBlock';
import SalvationNotice from '../shared/SalvationNotice';

const carouselItems = [
  { name: 'woman-praying', alt: 'A woman in prayer as light gathers around her' },
  { name: 'surrender', alt: 'A silhouetted figure kneeling in surrender at dusk' },
  { name: 'open-door', alt: 'A softly lit open doorway' },
  { name: 'light-figure', alt: 'A figure wrapped in white light' },
];

const WelcomeSection = () => (
  <Section tone='deep'>
    <Container className='flex flex-col items-center gap-12 lg:flex-row'>
      <Reveal className='w-full lg:w-1/2'>
        <ImageCarousel items={carouselItems} />
      </Reveal>
      <Reveal delay={120} className='w-full lg:w-1/2'>
        <SectionTextBlock
          heading='A deeper encounter with the Holy Spirit'
          paragraph='Whether you are exploring faith or returning to it, this is a place to meet Jesus and to make room for the Helper He promised — who comforts, guides, and frees.'
          buttonText='About the ministry'
          buttonTo='/about'
        >
          <SalvationNotice className='mb-6' />
        </SectionTextBlock>
      </Reveal>
    </Container>
  </Section>
);
export default WelcomeSection;
```

- [ ] **Step 5: Rewrite `NextStepCard.jsx`** (a real `<button>`, no `target=_blank`) and `NextStepsSection.jsx` (data-driven; replaces the nested ternary)

```jsx
// NextStepCard.jsx
const NextStepCard = ({ title, text, img, onClick }) => (
  <button
    type='button'
    onClick={onClick}
    className='flex h-full w-full items-center gap-4 rounded-2xl bg-ivory-50 p-4 text-left text-navy-900 shadow-lg transition hover:-translate-y-1 hover:shadow-glow focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-300'
  >
    {img && <img src={img} alt='' className='h-20 w-20 shrink-0 rounded-lg object-cover' />}
    <span>
      <span className='block font-display text-xl font-semibold leading-tight'>{title}</span>
      <span className='block text-sm text-navy-800'>{text}</span>
    </span>
  </button>
);
export default NextStepCard;
```

```jsx
// NextStepsSection.jsx
import { useState } from 'react';
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import Modal from '../shared/Modal';
import MoreNextStepsDialog from '../shared/MoreNextStepsDialog';
import NextStepForm from '../shared/NextStepForm';
import PrayerGroupDialog from '../shared/PrayerGroupDialog';
import PrayerRequestForm from './PrayerRequestForm';
import NextStepCard from './NextStepCard';
import { NEXT_STEP_CARDS, FORM_COPY } from '../../data/nextSteps';

const groups = []; // replace with real data when ready; empty shows the "No PrayerGroups yet" state

const NextStepsSection = () => {
  const [dialog, setDialog] = useState(null); // 'prayer' | 'group' | 'more' | null
  const [formKind, setFormKind] = useState(null); // key of FORM_COPY | null
  const close = () => setDialog(null);
  const form = formKind ? FORM_COPY[formKind] : null;

  return (
    <Section id='next-steps' tone='mid'>
      <Container>
        <SectionHeading eyebrow='Your next step' title='Take a step toward Him' subtitle='Ask for prayer, find a group, or tell us about a decision you have made.' />
        <CardGrid min='17rem'>
          {NEXT_STEP_CARDS.map((c) => (
            <NextStepCard key={c.id} {...c} onClick={() => setDialog(c.id)} />
          ))}
        </CardGrid>
      </Container>

      <Modal isOpen={dialog === 'prayer'} onClose={close} title='Ask for Prayer'>
        <PrayerRequestForm requirePhoneVerification={false} onSubmitted={close} />
      </Modal>
      <PrayerGroupDialog isOpen={dialog === 'group'} onClose={close} onStart={() => {}} groups={groups} title='Join a PrayerGroup' />
      <MoreNextStepsDialog
        isOpen={dialog === 'more'}
        onClose={close}
        onSelect={(kind) => { close(); setFormKind(kind); }}
      />
      <Modal isOpen={!!form} onClose={() => setFormKind(null)} title={form?.title ?? ''}>
        {form && (
          <NextStepForm {...form} requirePhoneVerification={false} onSubmitted={() => setFormKind(null)} />
        )}
      </Modal>
    </Section>
  );
};
export default NextStepsSection;
```

- [ ] **Step 6: Update `MoreNextStepsDialog.jsx`** — derive `items` from data (drop the `items` prop), remove the commented "Life.Church" block and the `sm:` class, use `CardGrid`.

```jsx
import Modal from './Modal';
import NextStepCard from '../home/NextStepCard';
import CardGrid from '../ui/CardGrid';
import logo from '../../assets/hs-letter-logo-nav.png';
import { FORM_COPY, FORM_IMAGES } from '../../data/nextSteps';

const items = Object.entries(FORM_COPY).map(([key, def]) => ({
  key, title: def.title, text: def.subtitle, img: FORM_IMAGES[key],
}));

export default function MoreNextStepsDialog({ isOpen, onClose, onSelect, title = 'More Next Steps' }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth='max-w-4xl'>
      <div className='space-y-4 p-2'>
        <img src={logo} alt='' className='h-7 w-auto' />
        <CardGrid min='15rem'>
          {items.map((it) => (
            <NextStepCard key={it.key} title={it.title} text={it.text} img={it.img} onClick={() => onSelect?.(it.key)} />
          ))}
        </CardGrid>
      </div>
    </Modal>
  );
}
```

- [ ] **Step 7: Restyle `EventCard.jsx`, `UpcomingEventsSection.jsx`** (uses the computed recurring events; shows a fallback line if none)

```jsx
// EventCard.jsx
import ResponsiveImage from '../ui/ResponsiveImage';

const EventCard = ({ title, date, month, location, image, href }) => (
  <a href={href} className='group block h-full overflow-hidden rounded-2xl bg-navy-900 shadow-lg transition hover:-translate-y-1 hover:shadow-glow'>
    <ResponsiveImage name={image} alt='' sizes='(min-width: 1024px) 360px, 100vw' className='h-48 w-full object-cover transition duration-500 group-hover:scale-105' />
    <div className='relative p-5'>
      <div className='absolute -top-8 right-5 flex h-14 w-14 flex-col items-center justify-center rounded-xl bg-gold-400 text-navy-950 shadow'>
        <span className='text-xs uppercase leading-tight'>{month}</span>
        <span className='text-xl font-bold leading-none'>{date}</span>
      </div>
      <h3 className='pr-14 text-xl font-semibold'>{title}</h3>
      {location && <p className='mt-1 text-sm opacity-70'>{location}</p>}
    </div>
  </a>
);
export default EventCard;
```

```jsx
// UpcomingEventsSection.jsx
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import EventCard from './EventCard';
import { EVENT_DEFS } from '../../data/events';
import { getUpcomingEventRows } from '../../utils/nextEvents';
import { mapEventsToCards } from '../../utils/mapEventsToCards';

// DB wiring later: pass `rows` from a fetch instead of the computed recurring events.
const UpcomingEventsSection = ({
  rows = getUpcomingEventRows(EVENT_DEFS),
  title = 'Serve with us',
  subtitle = 'Our homeless food outreach is every second Sunday, with community meals at Thanksgiving and Christmas. Bring a friend.',
}) => {
  const upcoming = rows.filter((r) => new Date(r.startsOn) >= new Date()).slice(0, 3);
  const cards = mapEventsToCards(upcoming);
  return (
    <Section id='events' tone='deep'>
      <Container>
        <SectionHeading eyebrow='Events' title={title} subtitle={subtitle} />
        {cards.length > 0 ? (
          <CardGrid min='17rem'>
            {cards.map((c) => (<EventCard key={c.title} {...c} />))}
          </CardGrid>
        ) : (
          <p className='text-center text-lg opacity-80'>Upcoming events will be posted here.</p>
        )}
      </Container>
    </Section>
  );
};
export default UpcomingEventsSection;
```
Update `mapEventsToCards.js` doc comment: `imageUrl` now holds an image **name** (see `ResponsiveImage`).

- [ ] **Step 8: Restyle `WorshipOptionsSection.jsx` / `WorshipOptionCard.jsx`** — keep the props API (`options`, `subtitle`) and the "coming soon" default; remove the hotlinked background image, `bg-fixed` (breaks on iOS), Material Icons. Card uses a react-icons component passed as `Icon` (update `mapEventsToOptions.js` to output `Icon` instead of an icon-name string only if it's used — otherwise leave; card falls back to `FiPlayCircle`).

```jsx
// WorshipOptionCard.jsx
import { FiPlayCircle } from 'react-icons/fi';

const WorshipOptionCard = ({ Icon = FiPlayCircle, title, description, link }) => (
  <a href={link} target='_blank' rel='noopener noreferrer' className='group block h-full rounded-2xl border border-ivory-50/10 p-8 text-center transition hover:bg-ivory-50/5'>
    <Icon className='mx-auto mb-4 text-4xl text-gold-400' aria-hidden='true' />
    <h3 className='text-xl font-semibold'>{title}</h3>
    <p className='mt-2 text-sm opacity-80'>{description}</p>
  </a>
);
export default WorshipOptionCard;
```

```jsx
// WorshipOptionsSection.jsx
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import WorshipOptionCard from './WorshipOptionCard';

// DB wiring later: <WorshipOptionsSection options={mapEventsToOptions(rows)} />  (see utils/mapEventsToOptions.js)
const WorshipOptionsSection = ({ options = [], subtitle = 'YouTube & TikTok channels coming soon for prayer and sharing.' }) => {
  const shown = options.slice(0, 3);
  const title = shown.length
    ? `${shown.length} upcoming ${shown.length === 1 ? 'event' : 'events'}`
    : 'Events coming soon — stay tuned and pray with us!';
  return (
    <Section tone='mid'>
      <Container>
        <SectionHeading title={title} subtitle={subtitle} />
        {shown.length > 0 && (
          <CardGrid min='16rem'>{shown.map((o) => (<WorshipOptionCard key={o.title} {...o} />))}</CardGrid>
        )}
      </Container>
    </Section>
  );
};
export default WorshipOptionsSection;
```

- [ ] **Step 9: Tithe.ly — `useTithelyScript.js`, `TithelyGiveButton.jsx`, `GiveSection.jsx`**

```js
// hooks/useTithelyScript.js — call ONCE per page that renders TithelyGiveButton(s).
// Re-adds the script on mount so Tithe.ly re-scans buttons after route changes.
import { useEffect } from 'react';
import { GIVING } from '../data/giving';

export default function useTithelyScript() {
  useEffect(() => {
    if (!GIVING.enabled) return undefined; // placeholder mode: load nothing from Tithe.ly
    const s = document.createElement('script');
    s.src = 'https://static.tithely.com/give/give.js';
    s.defer = true;
    document.body.appendChild(s);
    return () => s.remove();
  }, []);
}
```

```jsx
// shared/TithelyGiveButton.jsx
import { GIVING } from '../../data/giving';

const BASE = 'rounded-full px-10 py-3.5 text-lg font-bold transition';

const TithelyGiveButton = ({ children = 'Give', className = '' }) =>
  GIVING.enabled ? (
    <button type='button' data-form={GIVING.tithelyFormId} className={`tithely-give-button ${BASE} bg-gold-400 text-navy-950 hover:bg-gold-300 ${className}`}>
      {children}
    </button>
  ) : (
    <button type='button' disabled className={`${BASE} cursor-not-allowed border border-current opacity-60 ${className}`}>
      Giving coming soon
    </button>
  );
export default TithelyGiveButton;
```

```jsx
// shared/GiveSection.jsx
import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import TithelyGiveButton from './TithelyGiveButton';
import { GIVING } from '../../data/giving';

const GiveSection = () => (
  <Section tone='light' className='text-center'>
    <Container>
      <Reveal>
        <h2 className='mb-8 text-3xl font-semibold lg:text-4xl'>Thank you for supporting our community.</h2>
        <TithelyGiveButton />
        {GIVING.enabled && (
        <p className='mt-8 text-sm text-navy-800'>
          <a href={GIVING.formUrl} target='_blank' rel='noopener noreferrer' className='underline hover:text-royal-600'>View giving form</a>
          {' | '}
          <a href={GIVING.kioskUrl} target='_blank' rel='noopener noreferrer' className='underline hover:text-royal-600'>Open kiosk mode</a>
        </p>
        )}
      </Reveal>
    </Container>
  </Section>
);
export default GiveSection;
```

- [ ] **Step 10: Rewrite `pages/Home.jsx`**

```jsx
import PageHero from '../components/hero/PageHero';
import ScriptureRotator from '../components/shared/ScriptureRotator';
import FaqDialogButton from '../components/faq/FaqDialogButton';
import Button from '../components/ui/Button';
import WelcomeSection from '../components/home/WelcomeSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import NextStepsSection from '../components/home/NextStepsSection';
import WorshipOptionsSection from '../components/home/WorshipOptionsSection';
import UpcomingEventsSection from '../components/home/UpcomingEventsSection';
import GiveSection from '../components/shared/GiveSection';
import useTithelyScript from '../hooks/useTithelyScript';
import { HERO_SCRIPTURE } from '../data/scripture';
import { NAV_CTA } from '../data/nav';

const Home = () => {
  useTithelyScript();
  return (
    <>
      <PageHero
        size='full'
        eyebrow='Holy Spirit Ministries'
        title='Encounter the Holy Spirit'
        subtitle='An immersive, unhurried time of calling on the name of Jesus — to feel Him more deeply and to see resistance and strongholds broken.'
        actions={
          <>
            <Button to={NAV_CTA.to}>{NAV_CTA.label}</Button>
            <FaqDialogButton />
          </>
        }
      >
        <ScriptureRotator items={HERO_SCRIPTURE} />
      </PageHero>
      <WelcomeSection />
      <HowItWorksSection />
      <NextStepsSection />
      <WorshipOptionsSection />
      <UpcomingEventsSection />
      <GiveSection />
    </>
  );
};
export default Home;
```
(The old `LatestNewsSection` stays unused; its wiring comments and `mapNewsToItems.js` are left as-is because news is out of scope. The static file remains in the repo; restyle only if the owner wants it.)

- [ ] **Step 11: Verify**

```bash
npm run lint 2>&1 | grep -E "home/|shared/|hero/|pages/Home" || echo "clean"
npm run build 2>&1 | tail -3
grep -rn -E "\b(sm|md|xl|2xl):" src && echo "BREAKPOINT VIOLATIONS" || echo "breakpoints ok"
```
Browser check at 360 / 600 / 768 / 900 / 1024 / 1280: hero fills one `dvh` on phone; no horizontal scroll (`document.documentElement.scrollWidth === window.innerWidth`); CardGrid columns change intrinsically; reveals fire on scroll; all four dialogs open, scroll inside on short viewport, and close by Esc/overlay/X; ScriptureRotator and carousel rotate and can be advanced manually.

- [ ] **Step 12: Delete replaced files and commit**

```bash
git rm src/components/shared/HeroSection.jsx src/components/shared/Jumbotron.jsx src/components/shared/Button.jsx
git add src/components src/pages/Home.jsx src/hooks src/utils/mapEventsToCards.js
git commit -m "feat(home): rebuilt homepage on new primitives"
```
(About and Give still import `HeroSection`/`Jumbotron` until Task 10, so do this deletion + commit **after Task 10**, then run the build.)

---

### Task 9: FAQs page

**Files:**
- Create/replace: `src/pages/Faqs.jsx`

**Interfaces:**
- Consumes: `FAQS`, `PageHero`, `Section`, `Container`, `Accordion`, `SalvationNotice`, `Reveal`

- [ ] **Step 1: `Faqs.jsx`**

```jsx
import PageHero from '../components/hero/PageHero';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import Accordion from '../components/ui/Accordion';
import SalvationNotice from '../components/shared/SalvationNotice';
import { FAQS } from '../data/faqs';

const Faqs = () => (
  <>
    <PageHero eyebrow='FAQs' title='Common questions' subtitle='Honest answers about the encounter, calling on the name of Jesus, and what Scripture says.' image='dove' />
    <Section tone='light'>
      <Container className='max-w-3xl'>
        <Reveal><SalvationNotice tone='light' className='mb-10' /></Reveal>
        <Reveal delay={100}><Accordion items={FAQS} tone='light' /></Reveal>
      </Container>
    </Section>
  </>
);
export default Faqs;
```

- [ ] **Step 2: Verify** `/faqs` loads directly (dev server) and via the nav; accordion opens/closes, `aria-expanded` toggles, keyboard Enter/Space work. Commit: `git add src/pages/Faqs.jsx && git commit -m "feat(faq): FAQs page"`.

---

### Task 10: About and Give pages — restyle and remove template content

**Files:**
- Modify: `pages/About.jsx`, `pages/Give.jsx`, `about/BeliefsSection.jsx`, `about/VisionSection.jsx`, `about/LeadershipSection.jsx`, `give/WhyWeGiveSection.jsx`, `give/WaysToGiveSection.jsx`, `give/RecurringGivingSection.jsx`, `give/TithelyAppSection.jsx`

- [ ] **Step 1: `About.jsx`** (the invented "Our Story" about Thunder Bay is removed; a short factual intro from the tagline replaces it)

```jsx
import PageHero from '../components/hero/PageHero';
import BeliefsSection from '../components/about/BeliefsSection';
import VisionSection from '../components/about/VisionSection';
import LeadershipSection from '../components/about/LeadershipSection';
import FaqDialogButton from '../components/faq/FaqDialogButton';
import Section from '../components/ui/Section';
import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import { SITE } from '../data/site';

const About = () => (
  <>
    <PageHero eyebrow='About' title={SITE.name} subtitle='Beliefs and vision' image='dove' />
    <Section tone='deep' className='text-center'>
      <Container className='max-w-3xl'>
        <Reveal>
          <h2 className='mb-4 text-4xl font-semibold'>Who we are</h2>
          <p className='mb-8 text-lg opacity-90'>{SITE.tagline} We facilitate encounters with the Holy Spirit — unhurried times of calling on the name of Jesus — and help people walk with Him afterward.</p>
          <FaqDialogButton>Read the common questions</FaqDialogButton>
        </Reveal>
      </Container>
    </Section>
    <BeliefsSection />
    <VisionSection />
    <LeadershipSection />
  </>
);
export default About;
```

- [ ] **Step 2: `BeliefsSection.jsx`** (data-driven; Wesleyan text, links and hotlinked logo removed)

```jsx
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Accordion from '../ui/Accordion';
import Reveal from '../ui/Reveal';
import SalvationNotice from '../shared/SalvationNotice';
import { BELIEFS } from '../../data/beliefs';

const BeliefsSection = () => (
  <Section tone='light'>
    <Container className='max-w-3xl'>
      <SectionHeading tone='light' eyebrow='What we believe' title='Our beliefs' />
      <Reveal><SalvationNotice tone='light' className='mb-10' /></Reveal>
      <Reveal delay={100}><Accordion items={BELIEFS} tone='light' /></Reveal>
    </Container>
  </Section>
);
export default BeliefsSection;
```

- [ ] **Step 3: `VisionSection.jsx`** (reuses `Accordion`; hotlinked image replaced by local `worship-service`; Material Icons gone)

```jsx
import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import Accordion from '../ui/Accordion';
import ResponsiveImage from '../ui/ResponsiveImage';
import { VISION_ITEMS } from '../../data/vision';

const VisionSection = () => (
  <Section tone='mid'>
    <Container className='flex flex-col gap-10 lg:flex-row lg:items-center'>
      <Reveal className='lg:w-2/5'>
        <ResponsiveImage name='worship-service' alt='Worshipers lifting their hands in a service' sizes='(min-width: 1024px) 420px, 100vw' className='aspect-[4/3] w-full rounded-2xl object-cover' />
      </Reveal>
      <Reveal delay={120} className='lg:w-3/5'>
        <h2 className='mb-6 text-4xl font-semibold'>Our vision</h2>
        <Accordion items={VISION_ITEMS} />
      </Reveal>
    </Container>
  </Section>
);
export default VisionSection;
```

- [ ] **Step 4: `LeadershipSection.jsx`** — hidden while `LEADERS` is empty

```jsx
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import CardGrid from '../ui/CardGrid';
import { LEADERS } from '../../data/leaders';

const LeadershipSection = () => {
  if (!LEADERS.length) return null;
  return (
    <Section tone='deep'>
      <Container>
        <SectionHeading eyebrow='Leadership' title='Meet our ministry leaders' />
        <CardGrid min='12rem'>
          {LEADERS.map((l) => (
            <div key={l.name} className='text-center'>
              {l.photo && <img src={l.photo} alt={l.name} className='mx-auto h-32 w-32 rounded-full object-cover' loading='lazy' />}
              <p className='mt-4 font-display text-xl font-semibold'>{l.name}</p>
              <p className='text-sm opacity-70'>{l.role}</p>
            </div>
          ))}
        </CardGrid>
      </Container>
    </Section>
  );
};
export default LeadershipSection;
```

- [ ] **Step 5: `Give.jsx` and give sections**

```jsx
// Give.jsx
import PageHero from '../components/hero/PageHero';
import WhyWeGiveSection from '../components/give/WhyWeGiveSection';
import WaysToGiveSection from '../components/give/WaysToGiveSection';
import TithelyAppSection from '../components/give/TithelyAppSection';
import useTithelyScript from '../hooks/useTithelyScript';

const Give = () => {
  useTithelyScript();
  return (
    <>
      <PageHero eyebrow='Give' title='Why and how we give' image='hero-dove' />
      <WhyWeGiveSection />
      <WaysToGiveSection />
      <TithelyAppSection />
    </>
  );
};
export default Give;
```
`RecurringGivingSection` is **merged into `WaysToGiveSection`** (it duplicated the same Give action, and its button was inert). Delete `RecurringGivingSection.jsx`.

```jsx
// WhyWeGiveSection.jsx
import Section from '../ui/Section';
import Container from '../ui/Container';
import Reveal from '../ui/Reveal';
import ResponsiveImage from '../ui/ResponsiveImage';
import { SITE } from '../../data/site';

const reasons = [
  { title: 'Give your time and talent', body: 'Serve alongside us at an encounter or in community outreach across Atlanta.' },
  { title: 'Give your treasure', body: `Your gifts help ${SITE.name} host encounters, serve our neighbors, and share the gospel.` },
];

const WhyWeGiveSection = () => (
  <Section tone='light'>
    <Container className='flex flex-col items-center gap-10 lg:flex-row'>
      <Reveal className='lg:w-1/2'>
        <ResponsiveImage name='meals-handout' alt='Volunteers handing out meals' sizes='(min-width: 1024px) 520px, 100vw' className='aspect-[4/3] w-full rounded-2xl object-cover' />
      </Reveal>
      <Reveal delay={120} className='lg:w-1/2'>
        <h2 className='mb-4 text-4xl font-semibold'>Why we give</h2>
        <p className='mb-6 text-lg'>Giving is worship. God has given us everything, and we joyfully give back.</p>
        {reasons.map((r, i) => (
          <div key={r.title} className='mb-4'>
            <h3 className='text-2xl font-semibold'>{i + 1}. {r.title}</h3>
            <p className='text-navy-800'>{r.body}</p>
          </div>
        ))}
      </Reveal>
    </Container>
  </Section>
);
export default WhyWeGiveSection;
```

```jsx
// WaysToGiveSection.jsx  (only online/app giving; e-transfer and in-person from the template church are removed until the owner adds real methods)
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import TithelyGiveButton from '../shared/TithelyGiveButton';
import { GIVING } from '../../data/giving';

const WaysToGiveSection = () => (
  <Section tone='deep' className='text-center'>
    <Container>
      <SectionHeading eyebrow='Ways to give' title='Give online' subtitle={GIVING.enabled ? 'Use a debit or credit card to give once or set up recurring giving.' : 'Online giving is being set up. Please check back soon.'} />
      <Reveal><TithelyGiveButton /></Reveal>
    </Container>
  </Section>
);
export default WaysToGiveSection;
```

```jsx
// TithelyAppSection.jsx  (local text buttons instead of hotlinked template badge images)
import Section from '../ui/Section';
import Container from '../ui/Container';
import SectionHeading from '../ui/SectionHeading';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import { GIVING } from '../../data/giving';

const TithelyAppSection = () => GIVING.appLinks.length === 0 ? null : (
  <Section tone='mid' className='text-center'>
    <Container>
      <SectionHeading eyebrow='On the go' title='Download the Tithe.ly giving app' subtitle='Give from your phone.' />
      <Reveal className='flex flex-col items-center justify-center gap-4 lg:flex-row'>
        {GIVING.appLinks.map((a) => (
          <Button key={a.label} href={a.href} target='_blank' rel='noopener noreferrer' variant='outline'>{a.label}</Button>
        ))}
      </Reveal>
    </Container>
  </Section>
);
export default TithelyAppSection;
```

- [ ] **Step 6: Delete leftovers, then run the leftover-content audit**

```bash
git rm src/components/give/RecurringGivingSection.jsx
git rm src/components/shared/HeroSection.jsx src/components/shared/Jumbotron.jsx src/components/shared/Button.jsx
grep -rn -i -E "thunder|transformation|transformtbay|wesleyan|life\.church|lifechurch|cloudfront|tithelysetup|807|sandra|material-icons|material icons" src index.html public && echo "LEFTOVERS FOUND" || echo "template content gone"
grep -rn -E "https?://" src --include=*.jsx --include=*.js | grep -v -E "https://(give\.tithe\.ly|static\.tithely\.com|itunes\.apple\.com|play\.google\.com)" || echo "no other hard-coded URLs"
npm run lint 2>&1 | tail -20
npm run build 2>&1 | tail -4
```
Expected: no leftovers (the only allowed URLs are the Tithe.ly/app-store ones in `giving.js` and the hook). Fix any remaining hit (e.g. `PrayerGroupDialog`, `StartPrayerGroupForm`, `PrayerRequestForm`, `NextStepForm`, `PhoneVerify` — read each hit and replace with `SITE` values or remove).

- [ ] **Step 7: Commit**

```bash
git add src/pages src/components
git commit -m "feat(pages): About, Give restyled; template-church content removed"
```
(Then commit the Task 8 files not yet committed.)

---

### Task 11: Restyle remaining forms/dialogs, verify at real widths, final checks

**Files:**
- Modify (retheme to tokens only, no logic changes): `PrayerRequestForm.jsx`, `NextStepForm.jsx`, `PrayerGroupDialog.jsx`, `PrayerGroupCard.jsx`, `StartPrayerGroupForm.jsx`, `PhoneVerify.jsx`, `CloseButton.jsx`
- Create: none (dev-only viewport harness lives in `$TMPDIR`, not the repo)

- [ ] **Step 1: Retheme the form/dialog files.** Read each file, then in each: replace `sm:`/`md:` prefixes with intrinsic layout (`CardGrid`/flex-wrap) or `lg:`; replace hex/gray/indigo/orange/cyan classes with tokens (`bg-ivory-50`, `text-navy-900`, `border-navy-900/15`, `focus-visible:ring-royal-500`, `bg-royal-600 text-ivory-50 hover:bg-royal-500` for primary submit); keep all handlers and props. Extract one shared class string only if 3+ inputs use it: `src/components/ui/fieldClasses.js` exporting `FIELD = 'w-full rounded-lg border border-navy-900/20 bg-white px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-royal-500'` and use it in the forms instead of repeating.

- [ ] **Step 2: Static gates**

```bash
grep -rn -E "\b(sm|md|xl|2xl):" src && echo "BREAKPOINT VIOLATIONS" || echo "breakpoints ok"
grep -rn -E "bg-\[#|text-\[#|border-\[#|h-screen|100vh|min-h-screen" src && echo "TOKEN/VIEWPORT VIOLATIONS" || echo "tokens ok"
grep -rn -E "backdrop-blur|filter|transform" src/components/layout src/components/ui/Reveal.jsx
npm run lint 2>&1 | tail -20
npm run build 2>&1 | tail -4
```
Expected: first two print "ok". In the third, confirm `MobileMenu` is not a descendant of an element with `backdrop-blur` (it's a sibling of `<header>`), and note `.reveal` sets `transform`: no `fixed` element may be a child of a `Reveal` (modals are portaled; the mobile menu is outside).

- [ ] **Step 3: Start the dev server outside the sandbox** (`npx vite --host 127.0.0.1 --port 5173`, `dangerouslyDisableSandbox: true`, background). Confirm `curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:5173/faqs` is 200.

- [ ] **Step 4: Browser verification** (Chrome tools; load them with one ToolSearch call). For **each** page (`/`, `/about`, `/faqs`, `/give`) at widths **360, 480, 600, 768, 900, 1024, 1280** (use `resize_window`; if the window can't reach exact widths, use an iframe harness page in `$TMPDIR` with explicit `width`/`height`) record via `javascript_tool`:

```js
({
  w: window.innerWidth,
  overflowX: document.documentElement.scrollWidth - window.innerWidth,   // must be 0
  headerH: document.querySelector('header').getBoundingClientRect().height,
  cssVar: getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
  heroH: document.querySelector('section').getBoundingClientRect().height, // Home: ≈ innerHeight
})
```
Pass criteria: `overflowX === 0` everywhere; header height equals the CSS variable's computed pixels; Home hero height ≈ viewport height. Then interaction checks: mobile menu (opens full-viewport, body scroll locked, `Close` and link click close it, `/#next-steps` scrolls after close); each Next Steps dialog and the FAQ dialog (Esc, overlay click, X; panel scrolls at 360×500); scroll reveals (elements start hidden, appear once scrolled; with `emulateMedia reduced motion` they show immediately); logo click from `/about` navigates home; direct load of `/faqs`; reload on `/about`. Take a screenshot per page at 360 and 1280 and read them for visual defects (clipped text, low contrast, awkward gaps).

- [ ] **Step 5: Production preview + fallback check**

```bash
npm run build && npx vite preview --host 127.0.0.1 --port 4173   # outside sandbox, background
```
Open `http://127.0.0.1:4173/hs-website-v1/about` directly. (`vite preview` does not emulate GitHub's 404 handoff; verify `dist/404.html` exists and that in-app navigation and reload of `/hs-website-v1/` work. Full 404 fallback is confirmed after the first real GitHub Pages deploy.)

- [ ] **Step 6: Final commit and report.** Commit remaining files by explicit path. Report to the owner: what changed; the placeholders to fill (Tithe.ly form id in `data/giving.js`, email/address in `data/site.js`, socials, leaders, Godhead wording, event times/locations, newsletter provider); the private-repo Pages limitation; and how to view (`http://127.0.0.1:5173/`).

---

## Self-review

**Spec coverage:** goal/responsive → Tasks 1, 4, 6, 7, 11; single breakpoint convention → Global Constraints + grep gates (Tasks 8, 11); scroll animations → Tasks 4 (`Reveal`, `CardGrid`, `useParallax`), 7 (hero parallax); reduced motion → Tasks 1, 4; GitHub Pages (base, `BrowserRouter` basename, 404 fallback, scroll restoration/scroll to top) → Task 5; `noindex` retained → Global Constraints; header/mobile menu rules (fixed inset-0, scroll lock, sibling overlay, close-then-scroll, logo Link, shared header var) → Tasks 1, 4, 5, 6; `h-dvh` → Tasks 1, 7; nav/social single source → Tasks 3, 6; FAQs page + modal from one data source → Tasks 3, 8, 9; not-for-salvation statement visible on Home/Beliefs/FAQ → Tasks 3, 8, 9, 10; images (optimize, credits, no Jesus faces, gaps via free stock) → Task 2 (stock sourcing is deferred: no gap identified yet; add rows to `docs/image-credits.md` if any are sourced); DRY/modular → Global Constraints, Tasks 3–4; verification at intermediate widths, computed values → Task 11; draft copy → Task 3; template-church content removal → Task 10 audit; out-of-scope items untouched.

**Placeholders (owner-approved):** Tithe.ly form id, email, address, socials, leaders. The only other intentional markers are `TODO(owner)` in the newsletter handler (no backend exists) and empty-value data fields that hide their UI (email, address, socials, leaders). Task 11 Step 1 tells the executor to read and retheme files not shown here (`PrayerRequestForm`, `NextStepForm`, etc.) with explicit, mechanical rules and a gate, rather than showing code for files that only need class swaps.

**Type consistency:** `Accordion` item shape `{title, body, refs?}` is used by `FAQS`, `BELIEFS`, `VISION_ITEMS`; `CardGrid` takes `min`; `ImageCarousel` items use `{name, alt}`; `mapEventsToCards` `imageUrl` → `EventCard` `image` (a `ResponsiveImage` name); `NextStepCard` props `{title,text,img,onClick}` consumed identically in `NextStepsSection` and `MoreNextStepsDialog`; `Button` supports `to|href|onClick`; `useRotation` returns `{index, visible, goTo}` and both consumers use that.

**Known risks to watch in execution:** (1) the blue logo on the light header/footer must be eyeballed in Task 6 (if it looks poor, tell the owner which logo file to supply); (2) `import.meta.glob` `query: '?url'` syntax requires Vite ≥ 5 (repo has 6.3.5); (3) `min-h-dvh` requires Tailwind ≥ 3.4 (repo has 3.4.17).
