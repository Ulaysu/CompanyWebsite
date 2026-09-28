# SOFORR — We build technology for ideas worth building

*Duniyai ka Soforr.* (Jola-Bulluf: “This world is all about helping one another.”)

Website for SOFORR, a technology company founded in The Gambia by Sulayman Sanyang (CodeDream), building globally. Vue 3 + Vite + Tailwind CSS v4, statically pre-rendered with `vite-ssg` so every page ships real HTML with its own SEO and Open Graph metadata.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + pre-render all pages to dist/
npm run preview    # serve dist/ locally
node scripts/og-image.mjs   # regenerate public/og-image.png from scripts/og-image.html
node scripts/generate-images.mjs [scene ...]   # regenerate the illustrations in public/images/
node scripts/fetch-photos.mjs [key ...]        # download + optimise the photos in public/photos/
```

`dist/` is a plain static site and can be deployed to any static host (Netlify, Vercel, Cloudflare Pages, S3, etc.). The build also writes `sitemap.xml`, `robots.txt` and `404.html`.

## Configuration

Copy `.env.example` to `.env` and set:

- `VITE_SITE_URL` — canonical production URL (used for canonical links, Open Graph and the sitemap).
- `VITE_CONTACT_ENDPOINT` — optional form backend that accepts a JSON POST (Formspree, Basin, your own API). If it's unset, the contact form opens a pre-filled email instead.

**Before launch**, update `src/config/site.ts`:

- `email`: currently the placeholder `hello@example.com`
- `social.github` / `social.linkedin` / `social.x`: currently `null`, which hides them. Add the real SOFORR accounts.

## Themes

The site has a dark and a light theme. The first visit follows the system setting, and the toggle in the header remembers the visitor's choice (`localStorage`). All colours are tokens in `src/style.css`; the light theme re-points the same tokens under `[data-theme='light']`. Components use `edge/<opacity>` for hairlines and tints, so they work in both themes without changes. Use the `light:` / `dark:` variants for anything that has to differ.

## Illustrations

The images in `public/images/` are generated in code, not stock or AI imagery. Isometric "architectural model" scenes drawn on a canvas by `scripts/images/scenes.js` (with `engine.js`), then exported as WebP in dark and light versions, two widths each. Edit a scene and run `node scripts/generate-images.mjs <scene>` to re-render it. `ThemedImage.vue` shows the variant for the current theme, and only that one is downloaded. To use a photo or an AI-generated image instead, drop files with the same names (`{name}-{dark|light}-{width}.webp`) into `public/images/`, or register a new entry in `src/content/images.ts`.

## Photography

Real photos (page headers and project imagery, each tied to the place the work happens) come from Unsplash under the [Unsplash License](https://unsplash.com/license): free for commercial use, no attribution required. They are listed in `src/content/photos.json` with their Unsplash photo ID, alt text and focal point. `scripts/fetch-photos.mjs` downloads them, resizes them and saves WebP files to `public/photos/`, so the site doesn't hotlink anything. `PhotoBackdrop.vue` shows photos at full clarity with a very light grade, fading into the page only where text sits on top.

To swap a photo, change its `unsplash` ID in `photos.json` and run `node scripts/fetch-photos.mjs <key>`. To use your own photo, save it over `public/photos/<key>-<width>.webp` for each width listed.

## Story and content

The homepage tells one story, in order: hero (what we do) → 01 Why we exist (Duniyai ka Soforr) → 02 What we build → 03 Work, shown by place → 04 How we build → 05 Engineering → 06 Partner work → 07 Founder → 08 Principles → final call to action.

Navigation: Work, Products, Approach, About, Contact. Africa is the origin story (philosophy, founder, footer), not the headline; the global scope is shown by where the work actually is.

- `src/config/site.ts`: name, tagline, the philosophy (*Duniyai ka Soforr*), email, socials, navigation.
- `src/content/company.ts`: philosophy, what we build, geography, process, engineering practices (with the tools behind them), partner work, principles, founder.
- `src/content/work.ts`: SOFORR's products and partner systems, each with a `place` (name, region, IANA time zone for the live local time). **To add one**, append an entry; a page at `/work/<slug>` is generated automatically. Products marked `SOFORR product` also appear on `/products`. Only fill in what's true: leave `technology`, `outcome` and `url` unset until they exist.

**Founder portrait.** To replace it, run `node scripts/add-founder-photo.mjs path/to/photo.jpg`. Set `founder.photo` to `null` to show a designed placeholder frame instead.

Retired URLs (`/what-we-build`, `/work-with-us`, `/products/<slug>`, `/work/sweetland-farms`, `/services`, `/solutions`, `/how-we-work`) redirect via `vercel.json` (Vercel), `public/_redirects` (Netlify/Cloudflare Pages) and client-side.

The hero globe (`public/images/globe-dark-*.webp`), centred on Africa with arcs travelling from The Gambia to the rest of the world, is drawn by `scripts/images/globe.js` from Natural Earth land data (`world-atlas`); regenerate it with `node scripts/generate-images.mjs globe`.

## Design

Warm near-black and paper surfaces. Geist for type, with Instrument Serif as the brand's second voice (the philosophy, CodeDream, a few editorial words). One warm accent (`--color-accent`), reserved for the mark, live status and focus. Sharp corners and hairlines rather than cards; no gradient text. Background photographs are shown at full clarity (WebP quality 80, up to 2400px for full-bleed headers), with scrims only where text sits and a soft `.on-photo` text shadow for legibility. Motion is limited to headline word reveals, image shutter reveals, rules that draw themselves and quiet hover states, all disabled under `prefers-reduced-motion`.

## Structure

```
src/
  config/site.ts        Brand name, descriptor, email, socials, navigation. Rebrand here.
  content/              All copy and data: company story, products, photos, images
  components/
    ui/                 Primitives: AppButton, LogoMark, PhotoBackdrop, FormField, ...
    layout/             SiteHeader (incl. mobile nav), SiteFooter
    products/           ProductFeature, ProductCard, MoreComing, StatusBadge
    sections/           Page sections composed from the above
  pages/                One file per route
  composables/          usePageMeta (SEO/OG), motion helpers
  directives/reveal.ts  Scroll reveal (off under prefers-reduced-motion)
  style.css             Design tokens (@theme) and base styles
```

To change the copy, edit `src/content/*` and `src/config/site.ts`. You shouldn't need to touch any components.
