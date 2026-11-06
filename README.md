# Lofa24

Frontend for **Lofa24**, a youth-led community media platform telling the
stories of people across Lofa County, Liberia.

Next.js 16 (App Router) · TypeScript · Tailwind v4 · MDX. No backend, no CMS,
no database — every route is prerendered as static HTML.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Design system

Photography first, warm paper underneath. Four rules hold it together:

1. **Forest and cream.** The header, heroes, and support band sit on `canopy`
   (deep green). The rest of the site is a warm canvas (`canvas` / `paper`)
   so white cards float. Gold, not red, is the second accent.
2. **Colour is for structure.** Gold marks the ticker, active nav, and lifted
   phrases. Red is reserved for index numerals. Photographs do the rest.
3. **Two type roles.** Fraunces for every heading and `.accent` italic, Figtree
   for body and UI.
4. **Soft frames.** Cards and photographs use large radii and a rest-state
   `shadow-card`. Full-bleed heroes carry the layout, not hairline grids.

Two shared classes in `src/app/globals.css` carry the small text: `.eyebrow`
(tracked capitals for labels and dates) and `.numeral` (red index numbers).
Use them rather than respelling the styles inline. Inner pages share
`PageHero` so the dark opening band stays consistent.

## Team hierarchy

The team page is structured by rank, and the card sizes carry the hierarchy
before you read a word: the founder gets a full-width feature card, the
executive director a smaller horizontal one, directors sit three across, and
the field team two across. A hairline spine with a red marker at each tier
runs down the left on wide screens.

Rank comes from the `tier` field on each `TeamMember`
(`founder` / `executive` / `directors` / `field`) in `src/content/team.ts`, and
`getTeamByTier()` in `src/lib/content.ts` groups them in order. To move
somebody, change their `tier` — nothing in the page needs editing.

## Where the content lives

| What | File |
|---|---|
| Story metadata (title, dek, date, tags, images) | `src/content/stories/index.ts` |
| Story prose | `src/content/stories/*.mdx` |
| Story slug → body map | `src/content/stories/bodies.ts` |
| Team members and bios | `src/content/team.ts` |
| Mission, tagline, nav, contact details | `src/lib/site.ts` |
| Shared types | `src/content/types.ts` |

Pages never import those files directly — they go through `src/lib/content.ts`
(`getAllStories`, `getStoryBySlug`, `getTeam`, …). If Lofa24 later moves to a
headless CMS, that one module is the only thing that has to change.

### Adding a story

1. Add an entry to `src/content/stories/index.ts`.
2. Create `src/content/stories/<slug>.mdx` with the body.
3. Register the slug in `src/content/stories/bodies.ts`.

Every `ImageRef` needs real `width`/`height` (prevents layout shift) and real
`alt` text describing what is happening in the photograph. `focus` is an
optional CSS `object-position` used when a photo has to be cropped into a card
or banner — set it when a face ends up outside the crop.

Story covers are layout-aware: landscape covers render as a full-width banner,
portrait covers render whole in a narrow column rather than being cropped.

## Images

All static images live under `public/assets/images/`, which serves them at
`/assets/images/...`:

```
public/assets/images/
  brand/     logo.jpg, mark.png          the full lockup and the cropped mark
  hero/      market-visit.jpg            the shared opening photograph
  team/      <person-slug>.jpg           one portrait per team member
  stories/   <story-slug>/<name>.jpg     grouped by the story they belong to
```

Keeping them under `assets/images/` rather than at the root of `public/` also
avoids any overlap between `public/stories/...` and the `/stories/[slug]`
route.

The two app icons are separate: `src/app/icon.png` and `src/app/apple-icon.png`
are Next.js file conventions and must stay in `src/app/`.

Originals stay untouched in the parent folder (`../Team`, `../2026 June 2`,
etc.) as the source archive; `public/` holds slugified working copies.

> **Note:** the dated source folders do not match their contents. The mapping in
> `src/content/stories/index.ts` was corrected against what each photograph
> actually shows — blind family → 19 July, triplets → 2 June, rice delivery →
> 6 August, booth interview → 2 August. Worth a second pair of eyes.

## Contact form

Frontend-only. Set `NEXT_PUBLIC_FORMSPREE_ID` (see `.env.example`) and the form
posts natively to Formspree with no client JavaScript. Leave it unset and the
contact page shows a direct-contact panel instead. Set
`NEXT_PUBLIC_CONTACT_EMAIL` to surface an email address there.

## Still to supply

- Contact email and postal address (`src/lib/site.ts`)
- Social media handles (`src/components/SiteFooter.tsx` lists them unlinked)
- Podcast episodes (`src/app/podcast/page.tsx` is an honest empty state)
- Production domain (`site.url` in `src/lib/site.ts`, used by OG tags and the sitemap)

## Deploying

The site builds two ways from the same source.

### GitHub Pages (static export)

`.github/workflows/deploy-pages.yml` builds and publishes on every push to
`main`. It runs `npm run build:pages`, which sets three variables:

| Variable | Value | Effect |
|---|---|---|
| `GITHUB_PAGES` | `true` | switches `next.config.ts` to `output: "export"` |
| `NEXT_PUBLIC_BASE_PATH` | `/Lofa24` | path prefix for links, assets, and images |
| `NEXT_PUBLIC_SITE_ORIGIN` | `https://fofana459-2023.github.io` | origin for OG tags and the sitemap |

Before the first run, set **Settings → Pages → Source** to **GitHub Actions**.
The workflow cannot do this for itself: `configure-pages` has an `enablement`
input, but it needs a personal access token rather than the built-in
`GITHUB_TOKEN`, so the one-time toggle stays manual.

Live at **https://fofana459-2023.github.io/Lofa24/**. Build it locally with
`npm run build:pages` and serve `out/` from a folder named `Lofa24` to
reproduce the base path exactly.

Three things this setup handles that a plain `output: "export"` does not:

- **Images.** `unoptimized: true` returns `src` untouched, so every photo would
  point at the domain root and 404. `src/lib/image-loader.ts` is a custom
  `next/image` loader that applies the base path instead.
- **Absolute URLs.** `new URL("/stories/x", origin)` silently drops the base
  path, so `absoluteUrl()` in `src/lib/site.ts` concatenates instead. The
  sitemap, robots, and OG image tags all go through it.
- **Jekyll.** `public/.nojekyll` (plus a `touch` in the workflow) stops Pages
  from discarding the `_next` directory, which would serve the site unstyled.

Renaming the repo means updating `NEXT_PUBLIC_BASE_PATH` in the `build:pages`
script. Moving to a custom domain means dropping the base path entirely and
setting `NEXT_PUBLIC_SITE_ORIGIN` to the new domain.

Note that a static export serves the original JPEGs with no resizing — Pages
has no server to optimise them. The photographs are all under 250 KB, but if
the site grows, pre-resizing the sources is the fix.

### Vercel

Import the repo; no configuration. Without `GITHUB_PAGES` set, the config falls
back to a normal server build with image optimisation and no base path, so
`site.url` in `src/lib/site.ts` should point at the production domain.
