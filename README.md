# Holy Spirit Ministries website, v1 (site-refresh)

**Live:** https://kingdomb.github.io/hs-website-v1/

The first modern rebuild of the site: responsive, traditional royal-blue and gold look with
scroll animations. React 19 + Vite 6 + Tailwind CSS 3 + React Router 7, for a non-denominational,
event-based ministry. The second version, with a neumorphic look, is in
[hs-website-v2](https://github.com/kingdomb/hs-website-v2).

```bash
npm install
npm run dev      # http://127.0.0.1:5173/
npm run build    # base path /hs-website-v1/ (GitHub Pages)
npm run lint
npm run deploy   # build and publish dist/ to the gh-pages branch
```

## Documentation

- [`docs/site-refresh-v1.md`](docs/site-refresh-v1.md): what this version is, how it is built, what is still open
- [`docs/superpowers/specs/`](docs/superpowers/specs/) and [`docs/superpowers/plans/`](docs/superpowers/plans/): design spec and implementation plan
- [`docs/image-credits.md`](docs/image-credits.md): image provenance

Content lives in `src/data/`. Add or change images with `python3 scripts/optimize-images.py`
(it writes responsive WebP variants into `src/assets/img/`).
Placeholders (Tithe.ly form ID, email, address, socials, leaders) are listed in the v1 doc.
The site is set to `noindex, nofollow` until the owner decides to go live.
