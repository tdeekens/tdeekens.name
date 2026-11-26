# Migration plan: Vercel + Next.js → Astro + Bunny

Status: code complete on `migrate-to-astro`; Phase 0 spike and cutover need Bunny/Eden/Plausible accounts · Branch: `migrate-to-astro`

## Decisions

| Area | Decision |
|---|---|
| Framework | **Astro**, `output: 'static'`. No hosting adapter, no server rendering. |
| UI | Existing React components are reused. Pages are rendered to HTML at build time; only the interactive parts are hydrated as islands. |
| Styling | Tailwind 4 via `@tailwindcss/vite`. |
| Tests | Jest → **Vitest** (+ React Testing Library). Next.js-specific tests are dropped. |
| Server code | One host-neutral `fetch(Request) → Response` handler (`edge/handler.ts`). Runs on Bunny Edge Scripting, fallback Cloudflare Workers. |
| Markdown (`Accept: text/markdown`) | `.md` per page generated **at build time**, served by the edge handler. |
| Chat context | `context.json` generated **at build time**, bundled into the edge script. |
| AI | AI SDK via `AI_BASE_URL`, `AI_API_KEY`, `AI_MODEL`. Gateway: **Eden AI EU endpoint**. Model: **Claude Haiku 5.5**, `maxOutputTokens: 400`. Spend limit set in Eden. |
| Rate limit | 20 req/h per IP, shared store (Bunny Database). |
| Host | **Bunny**: Storage (Frankfurt, optional Stockholm replica) + global CDN + Edge Script. |
| Deploys | GitHub Actions on `main`: build → upload `dist/` → deploy edge script → purge cache. |
| Staging | `staging.tdeekens.name`, deployed from a manual trigger or the `staging` branch. No password, `X-Robots-Tag: noindex`. Shares the production AI key and rate limits. |
| Analytics | **Plausible** script embedded directly. Vercel Analytics + Speed Insights removed. |
| Logging | Structured JSON to `console`, `pino` removed. |
| DNS | Stays at **all-inkl** (mail stays untouched). `www` → CNAME to Bunny. Apex → all-inkl HTTPS redirect to `www`. |
| URLs | Unchanged: every page, `/cv` redirect, no trailing slashes (308 to the slash-less URL), `sitemap.xml`, `robots.txt`, `blogroll.xml`, `Link` and `Vary: Accept` headers. |

## Phase 0: Bunny spike (decides Bunny vs Cloudflare Workers)

Run before cutover work depends on Bunny. Each item needs a pass; any failure means falling back to Cloudflare Workers with the same handler.

| # | Question | Pass criterion |
|---|---|---|
| S1 | Streaming | A middleware Edge Script on the pull zone streams a chunked response (SSE / AI SDK UI stream) to the browser without buffering. |
| S2 | Cache vs `Vary: Accept` | The middleware runs before the CDN cache; `Accept: text/markdown` gets markdown and a normal request gets HTML, both after warm cache. |
| S3 | Clean URLs | `/bookshelf` serves `bookshelf.html` (or `bookshelf/index.html`), `/bookshelf/` → 308 `/bookshelf`, unknown path → `404.html` with status 404. |
| S4 | Runtime fit | AI SDK + Eden endpoint run in Bunny's Deno runtime; bundled script incl. `context.json` stays under the size limit. |
| S5 | Rate-limit store | Bunny Database is usable from the edge with acceptable latency (< 50 ms p95). Fallback: per-instance limit + Eden spend cap. |

## Phase 1: Astro site (local)

1. Scaffold Astro next to the existing code: `astro.config.mjs`, `src/layouts/base.astro`, `src/pages/*`.
2. Replace Next.js pieces:

| Next.js | Replacement |
|---|---|
| `next/head` (8 files) | `title` prop on the Astro layout |
| `next/image` (6 files + MDX `Image`) | plain `<img>` with `width`/`height` (`loading="lazy"` below the fold) |
| `next/link` (1 file) | `<a>` |
| `next/router` (3 files) | `window.location`, `URLSearchParams`, `history.replaceState`, `location.assign` |
| `_app` (shortcuts, theme sync, help dialog) | `AppChrome` island, `client:load` |
| `_document` theme-init script | inline `<script is:inline>` in `<head>` |
| `next-mdx-remote` | Astro content collection + `@astrojs/mdx`, same component mapping |
| `getStaticProps` / `getStaticPaths` | Astro frontmatter / `getStaticPaths` |
| `next-sitemap` | build script producing the same `sitemap.xml` + `robots.txt` (incl. `Content-Signal`) |
| `next.config.js` headers/redirects | edge handler (Phase 2) |

3. Islands: `AppChrome` (`client:load`), `AskAboutMe` (`client:idle`), blogroll filters (`client:load`), theme toggle (part of `AppChrome`).
4. Draft posts stay reachable by URL but are hidden from the blog list and the sitemap (as today).

## Phase 2: Build-time artifacts + edge handler

1. Build step after `astro build`:
   - `dist/**/*.md` per page: HTML → markdown, stripping `nav`, `footer`, `.no-markdown`, `[data-no-markdown]` (same rules as `accept-md.config.js`).
   - `edge/generated/context.json`: CV, bookshelf, blogroll markdown + post excerpts (400 chars).
   - `dist/blogroll.xml`, `dist/sitemap.xml`, `dist/robots.txt`.
2. `edge/handler.ts` (host-neutral):
   - Redirects: `/cv` → `/curriculum-vitae` (301), trailing slash → 308, plus the remaining `next.config.js` redirects.
   - `Accept: text/markdown` → serve `<path>.md` with `Content-Type: text/markdown`, `Vary: Accept`, `X-Markdown-Tokens`.
   - `POST /api/ask-about-me` → streaming chat (port of `pages/api/ask-about-me`), rate limit, schema validation.
   - Headers: `Vary: Accept` everywhere, `Link` on `/`, `X-Robots-Tag: noindex` on staging host.
3. Thin adapters: `edge/bunny.ts` (Bunny Edge Scripting entry), optional `edge/cloudflare.ts`.

## Phase 3: Tests

- Vitest + jsdom, port `setupTests.ts`, component tests and `lib/` tests.
- New: handler unit tests (redirects, markdown negotiation, rate limit, staging header).
- New: `scripts/parity.ts` (see below).

## Phase 4: CI + staging

- GitHub Actions: lint, typecheck, test, build, deploy (Bunny Storage upload, Edge Script deploy, cache purge).
- GitHub environments `production` and `staging`, each with secrets `BUNNY_API_KEY`, `BUNNY_STORAGE_ZONE`, `BUNNY_STORAGE_PASSWORD`, `BUNNY_SCRIPT_ID`, `BUNNY_STATIC_PULL_ZONE_ID`, `BUNNY_SITE_PULL_ZONE_ID` and variables `SITE_URL`, `BUNNY_STORAGE_HOST` (optional).
- Edge script env (set in Bunny): `STATIC_ORIGIN` (storage pull zone URL), `STAGING_HOSTS`, `AI_PROVIDER`, `AI_BASE_URL`, `AI_API_KEY` (secret), `AI_MODEL`, `BUNNY_DATABASE_URL`, `BUNNY_DATABASE_AUTH_TOKEN` (added by "Add Secrets to Edge Script").
- Bunny setup per environment: storage zone (Frankfurt) → pull zone A (`STATIC_ORIGIN`); standalone edge script with linked pull zone B (custom hostname) and **Run script before cache** on; database with table `rate_limits` (see `edge/rate-limit.ts`).
- Caching: HTML `Cache-Control: public, max-age=0, s-maxage=…` + purge on deploy; `/_astro/*` `immutable`.

## Parity checklist (`scripts/parity.ts`)

Run against `https://www.tdeekens.name` (baseline) and staging; diff the results.

- Status, `Location`, `Link`, `Vary`, `Content-Type` for: every sitemap URL, `/cv`, trailing-slash variants, an unknown path (404), `GET /api/ask-about-me` (405).
- `Accept: text/markdown` for every sitemap URL: status, content type, normalized body.
- `<title>`, meta description, canonical, Open Graph tags.
- `robots.txt`, `sitemap.xml` (URL set), `blogroll.xml` (item count).
- Chat smoke test (opt-in flag): streaming starts, 21st request in an hour → 429.

### Local parity result (`pnpm build && pnpm serve:local`)

All differences against production are intended:

| Difference | Why |
|---|---|
| Sitemap gains `/posts/the-pull-request-isnt-dead-the-diff-isnt-enough` | Production's sitemap is stale; the post is live and not a draft. |
| `Vary`: Next.js RSC values → `Accept` | No React Server Components any more. |
| Post `<title>`s: empty → `Tobias Deekens (@tdeekens) - <title>` | Production lost post titles (bug). |
| Redirects have no `Content-Type` | Empty redirect bodies. |
| Markdown ~34 words shorter per page, image URLs `/me.jpg` instead of `/_next/image?…` | The keyboard-shortcuts dialog no longer leaks into markdown and chat context. |

## Cutover runbook

1. A day before: lower TTL of the `www` CNAME at all-inkl (e.g. 300 s).
2. Parity check on staging until green.
3. Switch `www` CNAME to the Bunny pull zone hostname; configure the apex redirect at all-inkl (HTTPS via Let's Encrypt).
4. Watch Plausible, Bunny logs, Eden dashboard.
5. Rollback: point `www` (and apex) back to Vercel (`cname.vercel-dns.com` / `76.76.21.21`).
6. Before merging to `main`: disconnect the Vercel Git integration (or Vercel tries to build the Astro site). Vercel keeps serving its last production deployment, which is the rollback target.
7. After a week: delete the Vercel project. (Next.js, `@vercel/*`, `next-sitemap`, `pino` and Jest are already removed from the repo.)

## Manual steps (owner)

- Bunny: account, storage zone, pull zone, edge script, database, `staging` pull zone.
- Eden AI: account, EU endpoint key, spend limit.
- Plausible: site for `tdeekens.name`.
- GitHub Actions secrets + Bunny edge script env vars.
- all-inkl: CNAME switch, apex redirect.
