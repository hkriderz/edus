# Near Me Web Designs — Static Site

Production static export of the [Near Me Web Designs](https://nearmewebdesigns.com) marketing site (Next.js SSG).

## Site overview

| Area | Details |
|------|---------|
| **Business** | Near Me Web Designs (NM Web Designs) — web design & development in Rancho Cucamonga, CA |
| **Stack** | Next.js static export, Tailwind CSS, client-side React hydration |
| **Pages** | Home, About, Portfolio, Contact, Services (+ 4 service detail pages), Privacy, Terms, Sitemap |
| **SEO** | `robots.txt`, `sitemap.xml`, Open Graph/Twitter meta, LocalBusiness JSON-LD |
| **Analytics** | Google Tag Manager (`GTM-5F965JXM`) |

## Deploy on Dokploy

1. Push this repository to GitHub/GitLab (or connect Dokploy to your git remote).
2. In Dokploy, create an **Application** → **Docker** build type.
3. Set **Build context** to the repo root and **Dockerfile** to `./Dockerfile`.
4. Expose container port **80** and map your domain (e.g. `nearmewebdesigns.com`) with HTTPS.
5. Deploy. Dokploy will build the nginx image and serve the static files.

No build step is required in CI—the HTML/JS/CSS in this repo are already built.

## Local preview

```bash
docker build -t nmwd .
docker run --rm -p 8080:80 nmwd
```

Open http://localhost:8080

## Rebuilding from source

This folder is the **`out`** directory from `next build` with `output: 'export'`. To update the site, rebuild from the Next.js source project and replace the contents of this repo (except `Dockerfile`, `nginx.conf`, `README.md`, `.gitignore`).

## Known gaps

- HTML references `/images/logo.webp` and `/favicon.ico`; ensure those assets exist under `images/` and at the site root before deploying, or logos/icons will 404.
- Replace the placeholder `google-site-verification` meta value with your real Search Console code.
