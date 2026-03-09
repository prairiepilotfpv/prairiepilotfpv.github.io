# 2026-03-08: Build initial Astro scaffold for The High Prairie

## Summary
Implemented the first coherent Astro site scaffold with the approved five-page
navigation, content collections for art/words/make, sample entries, and static
build/deploy compatibility for GitHub Pages.

## Changes
- Added Astro project configuration and scripts:
  - `astro.config.mjs`
  - `tsconfig.json`
  - `src/env.d.ts`
  - updated `package.json` scripts/dependencies
- Added architecture-aligned source structure and core components:
  - `src/components/Navigation.astro`
  - `src/components/Layout.astro`
  - `src/layouts/BaseLayout.astro`
  - `src/styles/global.css`
- Added required pages:
  - `src/pages/index.astro`
  - `src/pages/about.astro`
  - `src/pages/art/index.astro`
  - `src/pages/art/[slug].astro`
  - `src/pages/words/index.astro`
  - `src/pages/words/[slug].astro`
  - `src/pages/make/index.astro`
  - `src/pages/make/[slug].astro`
- Added content collections and sample entries:
  - `src/content/config.ts`
  - `src/content/art/prairie-light-study.md`
  - `src/content/words/on-practice-and-place.md`
  - `src/content/make/printed-prototype-one-hitter.md`
- Updated docs and workflows:
  - `README.md` local workflow/build details
  - `.github/workflows/pages.yml` switched from Jekyll to Astro build

## Verification
- `npm install`
- `npm run verify`
- `npm run build`

## Technical Details
- Kept dependencies minimal by adding only `astro`.
- Implemented one shared `BaseLayout` wrapping the required `Layout` component
  so page-level metadata and navigation stay consistent without parallel
  abstractions.
- Added dynamic `[slug]` routes for each collection to match the approved
  architecture while keeping implementation simple.

## Decisions Made
- No section-specific layouts were added because there were not yet meaningful
  rendering differences requiring them.
- Kept design restrained and responsive with plain CSS and no styling framework.
- Kept content examples simple but representative of each collection purpose.

## Questions/Uncertainties
- Current content examples use remote image URLs for simplicity. If local image
  optimization is preferred, replace with assets in `src/assets/`.

## Related Files
- [package.json](../../package.json)
- [astro.config.mjs](../../astro.config.mjs)
- [src/components/Layout.astro](../../src/components/Layout.astro)
- [src/pages/index.astro](../../src/pages/index.astro)
- [src/content/config.ts](../../src/content/config.ts)
- [.github/workflows/pages.yml](../../.github/workflows/pages.yml)
