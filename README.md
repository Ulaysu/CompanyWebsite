# Sulayman Sanyang — Custom Software & Automation

Marketing site for a custom software engineering studio. Vue 3 + Vite + Tailwind CSS v4, statically pre-rendered with `vite-ssg` so every page ships real HTML with its own SEO and Open Graph metadata.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + pre-render all pages to dist/
npm run preview    # serve dist/ locally
node scripts/og-image.mjs   # regenerate public/og-image.png from scripts/og-image.html
node scripts/generate-images.mjs [scene ...]   # regenerate the illustrations in public/images/
```

`dist/` is a plain static site and can be deployed to any static host (Netlify, Vercel, Cloudflare Pages, S3, etc.). The build also writes `sitemap.xml`, `robots.txt` and `404.html`.

## Configuration

Copy `.env.example` to `.env` and set:

- `VITE_SITE_URL` — canonical production URL (used for canonical links, Open Graph and the sitemap).
- `VITE_CONTACT_ENDPOINT` — optional form backend that accepts a JSON POST (Formspree, Basin, your own API). If it's unset, the contact form opens a pre-filled email instead.

**Before launch**, update `src/config/site.ts`:

- `email`: currently the placeholder `hello@example.com`
- `social.github` / `social.linkedin`: currently `null`, which hides them

## Themes

The site has a dark and a light theme. The first visit follows the system setting, and the toggle in the header remembers the visitor's choice (`localStorage`). All colours are tokens in `src/style.css`; the light theme re-points the same tokens under `[data-theme='light']`. Components use `edge/<opacity>` for hairlines and tints, so they work in both themes without changes. Use the `light:` / `dark:` variants for anything that has to differ.

## Illustrations

The images in `public/images/` are generated in code, not stock or AI imagery. Isometric "architectural model" scenes and an abstract line field are drawn on a canvas by `scripts/images/scenes.js` (with `engine.js`), then exported as WebP in dark and light versions, two widths each. Edit a scene and run `node scripts/generate-images.mjs <scene>` to re-render it. `ThemedImage.vue` shows the variant for the current theme, and only that one is downloaded. To use a photo or an AI-generated image instead, drop files with the same names (`{name}-{dark|light}-{width}.webp`) into `public/images/`, or register a new entry in `src/content/images.ts`.

## Structure

```
src/
  config/site.ts        Brand name, descriptor, email, socials, navigation. Rebrand here.
  content/              All copy and data: services, solutions, process, problems, capabilities, images
  components/
    ui/                 Primitives: AppButton, SectionHeader, WindowFrame, StatusPill, FormField, ...
    layout/             SiteHeader (incl. mobile nav), SiteFooter
    visuals/            CSS/SVG product-interface visuals (no images)
    sections/           Page sections composed from the above
  pages/                One file per route
  composables/          usePageMeta (SEO/OG), motion helpers
  directives/reveal.ts  Scroll reveal (off under prefers-reduced-motion)
  style.css             Design tokens (@theme) and base styles
```

To change the positioning, services, industries or copy, edit `src/content/*` and `src/config/site.ts`. You shouldn't need to touch any components. The data shown in the mock interfaces is illustrative and says so on the page.
