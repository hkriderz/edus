# syntax=docker/dockerfile:1

# ---------------------------------------------------------------------------
# Stage 1 — build the static export.
#
# NEXT_PUBLIC_* values are inlined into the client bundle at build time, so
# they must be supplied as build args. Passing them as runtime `-e` env vars
# would have no effect on the already-compiled output.
# ---------------------------------------------------------------------------
FROM node:24-alpine AS builder

WORKDIR /app

# Copy manifests first so the dependency layer caches independently of source.
COPY package.json package-lock.json ./
RUN npm ci

ARG NEXT_PUBLIC_SITE_URL=https://edusdesigns.com
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_CONTACT_PHONE
ARG NEXT_PUBLIC_CONTACT_PHONE_DISPLAY
ARG NEXT_PUBLIC_CONTACT_CITY
ARG NEXT_PUBLIC_CONTACT_REGION
ARG NEXT_PUBLIC_CONTACT_COUNTRY
ARG NEXT_PUBLIC_FORMSPREE_ID
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL \
    NEXT_PUBLIC_CONTACT_PHONE=$NEXT_PUBLIC_CONTACT_PHONE \
    NEXT_PUBLIC_CONTACT_PHONE_DISPLAY=$NEXT_PUBLIC_CONTACT_PHONE_DISPLAY \
    NEXT_PUBLIC_CONTACT_CITY=$NEXT_PUBLIC_CONTACT_CITY \
    NEXT_PUBLIC_CONTACT_REGION=$NEXT_PUBLIC_CONTACT_REGION \
    NEXT_PUBLIC_CONTACT_COUNTRY=$NEXT_PUBLIC_CONTACT_COUNTRY \
    NEXT_PUBLIC_FORMSPREE_ID=$NEXT_PUBLIC_FORMSPREE_ID \
    NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID \
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=$NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION \
    NEXT_TELEMETRY_DISABLED=1

COPY . .
RUN npm run build

# ---------------------------------------------------------------------------
# Stage 2 — serve the export. No Node runtime ships to production.
# ---------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/ >/dev/null 2>&1 || exit 1
