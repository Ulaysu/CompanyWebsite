# Sulayman Sanyang — Custom Software & Automation

Marketing site for a custom software engineering studio. Vue 3 + Vite + Tailwind CSS v4, statically pre-rendered with `vite-ssg` so every page ships real HTML with its own SEO and Open Graph metadata.

## Commands

```bash
npm install
npm run dev        # local dev server
npm run build      # type-check + pre-render all pages to dist/
npm run preview    # serve dist/ locally
node scripts/og-image.mjs   # regenerate public/og-image.png from scripts/og-image.html
```

`dist/` is a plain static site and can be deployed to any static host (Netlify, Vercel, Cloudflare Pages, S3, etc.). The build also writes `sitemap.xml`, `robots.txt` and `404.html`.

## Configuration

Copy `.env.example` to `.env` and set:

- `VITE_SITE_URL` — canonical production URL (used for canonical links, Open Graph and the sitemap).
- `VITE_CONTACT_ENDPOINT` — optional form backend that accepts a JSON POST (Formspree, Basin, your own API). If it's unset, the contact form opens a pre-filled email instead.

**Before launch**, update `src/config/site.ts`:

- `email`: currently the placeholder `hello@example.com`
- `social.github` / `social.linkedin`: currently `null`, which hides them

## Structure

```
src/
  config/site.ts        Brand name, descriptor, email, socials, navigation. Rebrand here.
  content/              All copy and data: services, solutions, process, problems, capabilities
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
