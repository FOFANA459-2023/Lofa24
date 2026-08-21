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

Mostly white, with depth rather than colour. Four rules hold it together:

1. **Two grounds.** Pure white and a warm off-white (`paper`). Sections
   alternate between them so white cards float and the page has rhythm.
   The dark ink footer and the one dark marquee band are the only heavy blocks.
2. **Colour is rationed.** Red marks index numerals, the full stop in the
   tagline, and the "Latest" chip. The photographs carry everything else.
3. **Three type roles.** Bricolage Grotesque (heavy, tight) for every heading,
   Inter for body and UI, and Instrument Serif *italic* for the single lifted
   phrase inside a large statement (`.accent`).
4. **Depth over decoration.** Cards use a hairline border plus `shadow-lift` on
   hover with a 1px rise; images scale slowly inside their frame. No gradients,
   no drop shadows at rest.

Two shared classes in `src/app/globals.css` carry the small text: `.eyebrow`
(tracked capitals for labels and dates) and `.numeral` (red index numbers).
Use them rather than respelling the styles inline.

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

Import the repo on Vercel; no configuration needed. Every route is static, so
any static host works too — add `output: 'export'` to `next.config.ts` first,
which disables `next/image` optimisation.
