# EDUS Media

**Exceptional Designs for Us** — a community-focused web design studio site.

This repository is the source for [edusdesigns.com](https://edusdesigns.com): a Next.js 16 static export with a marketing site, five fully navigable demonstration client sites, an archived copy of the previous Near Me Web Designs site, case-study pages, and an nginx image for Dokploy.

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | Next.js 16 (App Router) + React 19 | File-based routing, metadata APIs, `output: "export"` |
| Language | TypeScript (strict, `noUncheckedIndexedAccess`) | Typed content modules and component props |
| Styling | Tailwind CSS v4 | `@theme` tokens, no runtime CSS-in-JS |
| Fonts | `next/font/google` | Self-hosted, scoped per route group so demo faces stay off marketing pages |
| Forms | react-hook-form + zod + Formspree | Client validation, honeypot, explicit loading / success / error |
| Tests | Jest + React Testing Library via `next/jest` | Content invariants, form paths, shared UI |
| Deploy | Multi-stage Docker → `nginx:1.27-alpine` | Zero Node runtime in production; matches the existing Dokploy setup |

The marketing site uses a warm editorial-brutalist system: paper / ink / ember tokens, Fraunces + Inter + JetBrains Mono, hard 1px rules, and an SVG `feTurbulence` grain overlay. Motion is CSS-first (`animation-timeline: view()`) with a `useInView` IntersectionObserver fallback and a `prefers-reduced-motion` guard.

## What is in the repo

```
src/
  app/
    (marketing)/          Shared nav + footer. Home, work, services, pricing, about, contact, legal, sitemap
    (demos)/demo/         Five chrome-free client sites, each with its own fonts and palette
public/archive/         Sanitized static archive of the previous studio site
    sitemap.ts            /sitemap.xml
    robots.ts             /robots.txt
  components/             Shared UI, contact form, SEO JSON-LD, theme toggle
  config/site.ts          Single source of truth for public contact details (env-backed)
  content/                Typed services, pricing, case studies, testimonials, FAQ
  lib/                    Fonts, metadata helper, useInView, class-name join
public/work/<slug>/       Real screenshots of each finished demo
```

Demonstration builds (fictional businesses, labelled as such in the UI):

| Site | Routes | Identity |
| --- | --- | --- |
| Verde & Vine | home, catalogue, café, visit | Forest / cream / terracotta · Young Serif + Karla |
| Northside Barbell | home, schedule, coaches, membership | Near-black / safety orange · Archivo Black |
| Rosalía | home, menu, story, reservations | Clay / cochineal / bone · Playfair Display |
| Meridian Dental | home, services, team, book | Soft cyan / slate · Outfit |
| Fathom Coffee | home, shop, product, cart | Ink navy / copper · Spectral + IBM Plex Sans |
| Near Me Web Designs | archived previous studio site | Violet / paper · Geist. Contact details are placeholders |

Fathom's cart is a `useReducer` + `sessionStorage` drawer. There is no backend and no payment.

Legacy `/portfolio/` URLs 301 to `/work/` in `nginx.conf`.

## Local development

Requires Node 20.9 or newer (Node 24 is what the Docker builder uses).

1. `cd` into this repository.
2. Copy the example env file:

   ```bash
   cp .env.example .env.local
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

Useful scripts:

| Script | Purpose |
| --- | --- |
| `npm run dev` | Next.js development server |
| `npm run build` | Static export into `out/` |
| `npm run lint` | ESLint (`next/core-web-vitals` + TypeScript) |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Jest + React Testing Library |
| `npm run audit:contrast` | WCAG contrast check of design tokens |
| `npm run audit:export` | Broken-link / metadata / JSON-LD audit of `out/` |

## Environment variables

Every public value is a `NEXT_PUBLIC_*` variable. **They are inlined at build time.** Passing them as runtime `-e` flags to the container has no effect on the already-compiled HTML.

See `.env.example` for the full list. The important ones:

| Variable | Role |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin (no trailing slash). Metadata, JSON-LD, sitemap |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Public email |
| `NEXT_PUBLIC_CONTACT_PHONE` | E.164 `tel:` href |
| `NEXT_PUBLIC_CONTACT_PHONE_DISPLAY` | Formatted phone shown in the UI |
| `NEXT_PUBLIC_CONTACT_CITY` / `_REGION` / `_COUNTRY` | Address used in the footer and LocalBusiness JSON-LD |
| `NEXT_PUBLIC_FORMSPREE_ID` | Formspree form id. Blank disables submit and shows an email fallback |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager container. Blank omits GTM entirely |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Search Console token. Blank omits the meta tag |

Unset contact fields fall back to a `REPLACE_ME__` sentinel so a misconfigured deploy is obvious in review. GTM and Formspree are skipped when empty rather than posting into the void.

Never put a secret in a `NEXT_PUBLIC_*` variable. Formspree and GTM ids are public by design.

## Architecture decisions

- **`output: "export"` + `trailingSlash: true` + `images.unoptimized: true`** — preserves the previous URL shape and the zero-runtime nginx deployment Dokploy already runs. `next/image` has no optimizer under a static export.
- **`(marketing)` vs `(demos)` route groups** — demo sites get their own layouts with no EDUS chrome, so a demo looks like a separate client site. A floating "EDUS demo build" badge is the honesty requirement.
- **`src/config/site.ts`** — one file reads every `NEXT_PUBLIC_*` value. Components do not hardcode contact details.
- **Pricing vs JSON-LD** — `priceRange` is derived from `pricingTiers` so structured data cannot drift from the published numbers (the previous site advertised `$2500-$3500` while the page said `$1,200`).
- **`app/sitemap.ts` and `app/sitemap/page.tsx` coexist** — the metadata route emits `/sitemap.xml`; the page is the human-readable `/sitemap/`.

## Testing

```bash
npm test
```

Coverage is intentionally focused:

- Content-module invariants (unique slugs, featured pricing tier, screenshot files on disk)
- Contact schema validation, including the honeypot
- Contact form submit success / 422 / timeout / network-error paths
- Shared UI rendering (button, accordion, skip link, wordmark)
- `useInView` observer behaviour

`npm run audit:contrast` and `npm run audit:export` (after a build) catch token-level contrast failures and broken internal links that a unit test will not see.

## Production build

```bash
npm run build
```

The export lands in `out/`. Preview it locally with any static server, or use the Docker image below.

## Docker and Dokploy

`NEXT_PUBLIC_*` values must be supplied as **build args**, not runtime env.

```bash
docker build -t edus-designs --build-arg NEXT_PUBLIC_SITE_URL=https://edusdesigns.com --build-arg NEXT_PUBLIC_CONTACT_EMAIL=hello@edusdesigns.com --build-arg NEXT_PUBLIC_CONTACT_PHONE=+19093336812 --build-arg NEXT_PUBLIC_CONTACT_PHONE_DISPLAY="(909) 333-6812" --build-arg NEXT_PUBLIC_CONTACT_CITY="Rancho Cucamonga" --build-arg NEXT_PUBLIC_CONTACT_REGION=CA --build-arg NEXT_PUBLIC_CONTACT_COUNTRY=US --build-arg NEXT_PUBLIC_FORMSPREE_ID= --build-arg NEXT_PUBLIC_GTM_ID= .
```

```bash
docker run --rm -p 8080:80 edus-designs
```

Open [http://localhost:8080](http://localhost:8080). The image serves `out/` from nginx 1.27, sends security headers, caches `/_next/static/` forever, and redirects `/portfolio/` to `/work/`. A `wget` healthcheck hits `/`.

### Dokploy

1. Connect this repository to a Dokploy **Application** with **Docker** build type.
2. Set the build context to the repo root and the Dockerfile to `./Dockerfile`.
3. Add the `NEXT_PUBLIC_*` values as **build arguments** (not container env).
4. Expose container port **80** and attach the domain with HTTPS.
5. Deploy. Dokploy builds the nginx image and serves the static export.

## Contributing

This is a small studio site. If you are working in the repo:

1. Keep contact details and third-party ids in `src/config/site.ts` / env — do not hardcode them in components.
2. Add or change copy in `src/content/*.ts`, not inline in pages, unless the text is unique to that page.
3. New demo sites belong under `src/app/(demos)/demo/<slug>/` with a token block in `demo/themes.css` and a case-study record in `src/content/work.ts`.
4. Recapture `public/work/<slug>/{home,detail}.png` after visual changes to a demo. Cards and Open Graph images use those files.
5. Run `npm run typecheck`, `npm test`, and `npm run lint` before opening a pull request.
6. After a production-shaped change, run `npm run build`, then `npm run audit:export` and `npm run audit:contrast`.

Do not commit `.env.local`, `out/`, `.next/`, or real credentials.
