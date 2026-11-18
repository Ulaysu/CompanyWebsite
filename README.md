# SOFORR website

Public website of SOFORR, an international software engineering company founded in The Gambia, with two equal divisions: **Engineering Services** (client-funded) and **Proprietary Products** (independently owned).

*Duniyai ka Soforr.* (Jola-Bulluf: “This world is all about helping one another.”)

Vue 3 + Vite + Tailwind CSS v4, statically pre-rendered with `vite-ssg` so every page ships real HTML with its own SEO and Open Graph metadata.

## Commands

```bash
npm install
npm run dev               # local dev server
npm run build             # sync redirects, type-check, pre-render all pages to dist/
npm run preview           # serve dist/ locally
npm run sync:redirects    # regenerate vercel.json and public/_redirects from src/redirects.json
node scripts/og-image.mjs # regenerate public/og-image.png (set CHROMIUM_PATH if Playwright's browser is not installed)
```

There is no test suite or linter; `npm run build` runs the TypeScript/Vue type check (`vue-tsc`).

## Configuration (build-time env, see `.env.example`)

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Canonical production URL. **Required before launch**: otherwise canonical/OG URLs and the sitemap use `https://www.example.com` (the build warns). |
| `VITE_CONTACT_EMAIL` | Company-controlled inbox. No default: when unset, no email address is shown anywhere. |
| `VITE_CONTACT_ENDPOINT` | Form backend accepting a JSON POST (Formspree, Basin, own API). The form shows success only after a 2xx response. |
| `VITE_SOCIAL_GITHUB/LINKEDIN/X` | Optional social links; unset ones are hidden. |

Form behaviour: endpoint set → POSTs JSON; else email set → opens a pre-filled email (and says it has not been sent yet); else the page states that backend integration is still required and nothing is sent.

## Structure

```
src/
  config/site.ts          Brand, positioning, navigation, env-driven contact settings
  content/
    company.ts            Divisions, services, engagement models, methodology, capabilities, principles, values, founder
    products.ts           Products (one detail page each at /products/<slug>)
    caseStudies.ts        Client case studies (/our-work/<slug>); only entries with permission: true render
    photos.json, images.ts  Photography and generated illustrations
  redirects.json          Retired URLs -> current (source for vercel.json and public/_redirects)
  components/             ui/, layout/, sections/, product/
  pages/                  One file per route
```

Routes: `/`, `/engineering`, `/products`, `/products/<slug>`, `/our-work`, `/our-work/<slug>`, `/about`, `/contact`. Old URLs (`/approach`, `/work`, `/work/<slug>`, …) redirect.

## Content rules

- Do not invent customers, revenue, adoption, staff numbers, certifications or product capabilities.
- Product screenshots go in `screenshots` on a product (files under `public/`); the section appears only when real ones exist. Illustrations are always labelled as illustrations.
- Case studies: publish a client only with permission; leave `technologies`, `implementation` and `outcomes` unset until true. Never list employment or internship work as SOFORR client work.
- Geography: SOFORR was founded in The Gambia and serves clients worldwide. Do not imply offices elsewhere; client locations are labelled as the client’s.

## Design

Light, confident surfaces (paper and mist) with deep river-navy bands. Colours come from the Gambian flag and the River Gambia: river blue for links, focus and the hero pulse; navy for text and dark bands; mangrove green for live status; the red, blue and green **tri-band** (the flag's structure) is the one cultural mark, used on the header, hero card, global section and footer. Bricolage Grotesque for display, Geist for text, Instrument Serif italic only for *Duniyai ka Soforr*. Tokens live in `src/style.css`; `.surface-dark` re-points them for navy bands. Only real sequences are numbered (the delivery methodology). Motion is limited to the hero pipeline pulse and short page fades, disabled under `prefers-reduced-motion`.

Photography is from Unsplash (free licence), fetched by `scripts/fetch-photos.mjs`. Replace the founder portrait with `node scripts/add-founder-photo.mjs <photo>`.
