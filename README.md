# Dr Hitesh Aggarwal — website.

Static site built with Astro. No backend, no database, no server to maintain.
Output is plain HTML and CSS with roughly 2 KB of inlined JavaScript.

## Editing without a developer

Almost everything you will want to change lives in ONE file:

    src/data/site.js

Clinic addresses, timings, phone number, credentials, review counts.
Change it there and it updates on every page automatically.

Shared page furniture (header, footer, nav, sticky bar, schema):

    src/layouts/Base.astro

## Adding a new condition page

1. Copy `src/pages/conditions/hair-loss-men.astro`
2. Rename it — the filename becomes the URL
3. Change the frontmatter fields and write the content
4. Add one line to the list in `src/pages/conditions/index.astro`

The sitemap, schema, author block, breadcrumbs, CTAs and analytics
are all handled by the layout. You only write content.

## Deploying

1. Push this folder to a GitHub repository
2. In Cloudflare Pages: Create project, connect the repo
   - Build command:      npm run build
   - Output directory:   dist
3. Every save in GitHub redeploys in about 30 seconds.
   A broken build does not deploy — the live site stays up.

## Analytics

`src/scripts/analytics.js` holds the Mixpanel PROJECT TOKEN, which is
public by design.

NEVER put the Mixpanel API secret in this repository. It can read and
export the whole dataset and belongs only in a server-side environment
variable.

The module deliberately strips anything resembling a name, phone,
email or free-text concern before sending, and collapses specific
condition slugs into coarse buckets. This is to keep the site clear of
DPDP Act obligations around health data.

## Still to build (Phase 1 completion)

- /treatments/ and treatment pages
- Remaining condition pages listed in conditions/index.astro
- /diet/ index and the acne, pigmentation, PCOS charts
- /for-doctors/, /privacy/, /terms/, /disclaimer/
- Doctor photography and clinic photography
- Google reviews fetched at build time
