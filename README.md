# SOFORR — Building world-class technology from Africa to the world

*Duniyai ka Soforr.* (Jola-Bulluf: “This world is all about helping one another.”)

Website for SOFORR, a technology company founded in The Gambia by Sulayman Sanyang (CodeDream). Vue 3 + Vite + Tailwind CSS v4, statically pre-rendered with `vite-ssg` so every page ships real HTML with its own SEO and Open Graph metadata.

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

The images in `public/images/` are generated in code, not stock or AI imagery. Isometric "architectural model" scenes and an abstract line field are drawn on a canvas by `scripts/images/scenes.js` (with `engine.js`), then exported as WebP in dark and light versions, two widths each. Edit a scene and run `node scripts/generate-images.mjs <scene>` to re-render it. `ThemedImage.vue` shows the variant for the current theme, and only that one is downloaded. To use a photo or an AI-generated image instead, drop files with the same names (`{name}-{dark|light}-{width}.webp`) into `public/images/`, or register a new entry in `src/content/images.ts`.

## Photography

Real photos (page headers, products, Built from Africa, final call to action) come from Unsplash under the [Unsplash License](https://unsplash.com/license): free for commercial use, no attribution required. They are listed in `src/content/photos.json` with their Unsplash photo ID, alt text and focal point. `scripts/fetch-photos.mjs` downloads them, resizes them and saves WebP files to `public/photos/`, so the site doesn't hotlink anything. `PhotoBackdrop.vue` applies one consistent treatment (desaturated, toned to the theme, faded into the page) so the photos sit in the brand rather than looking like stock.

To swap a photo, change its `unsplash` ID in `photos.json` and run `node scripts/fetch-photos.mjs <key>`. To use your own photo, save it over `public/photos/<key>-<width>.webp` for each width listed.

## Story and content

The homepage tells one story, in order: hero → 01 Belief → 02 Vision → 03 What we build → 04 Products → 05 Built from Africa → 06 How we build → 07 Work with us → 08 Founder → final call to action.

- `src/config/site.ts`: name, tagline, the philosophy (*Duniyai ka Soforr*), email, socials, navigation.
- `src/content/company.ts`: belief, vision, build areas, Built from Africa, process, engineering focus, stack, partnership, principles, founder.
- `src/content/products.ts`: SOFORR's products and initiatives. **To add one**, append an entry; a page at `/products/<slug>` is generated automatically. Only fill in what's true: leave `technology`, `outcome` and `url` unset until they exist.

**Founder portrait.** To replace it, run `node scripts/add-founder-photo.mjs path/to/photo.jpg`. Set `founder.photo` to `null` to show a designed placeholder frame instead.

Retired URLs (`/work`, `/work/<slug>`, `/contact`, `/services`, `/solutions`, `/how-we-work`) redirect via `vercel.json` (Vercel), `public/_redirects` (Netlify/Cloudflare Pages) and client-side.

The Africa-centred globe (`public/images/globe-dark-*.webp`), with arcs travelling from The Gambia, is drawn by `scripts/images/globe.js` from Natural Earth land data (`world-atlas`); regenerate it with `node scripts/generate-images.mjs globe`.

## Design

Warm near-black and paper surfaces, a single laterite accent (`--color-accent`), Geist for type, and Instrument Serif used only for the philosophy and a few editorial accents. Sharp corners and hairlines rather than rounded cards; no gradient text.

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
