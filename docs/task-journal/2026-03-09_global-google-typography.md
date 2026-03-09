# 2026-03-09: Add global Google-hosted typography

## Summary
Implemented site-wide Google-hosted typography by loading fonts in the shared
base layout and mapping heading/body typography through existing global CSS
variables.

## Changes
- Updated `src/layouts/BaseLayout.astro` to add Google Fonts `preconnect` and
  stylesheet links in the shared `<head>`.
- Updated `src/styles/global.css` to define:
  - `--font-heading`: `"Goudy Bookletter 1911", serif`
  - `--font-body`: `"Lora", serif`
- Applied `--font-body` globally to `html, body`.
- Applied `--font-heading` globally to `h1` through `h6`.
- Enabled Lora optical sizing globally for body text with
  `font-optical-sizing: auto`.
- Set default body font weight to `400`.
- Updated `docs/architecture.md` to document the typography tokens and where
  fonts are loaded/applied.

## Verification
- `npm run check:structure` -> `PASS: check:structure`
- `npm run check:docs` -> `PASS: check:docs`
- `npm run check:content` -> `PASS: check:content`
- `npm run verify` -> `PASS: check:structure`, `PASS: check:docs`, `PASS: check:content`
- `npm run build` -> Astro build succeeded, `8 page(s) built`

## Technical Details
- Kept font loading in one location (`BaseLayout`) to avoid duplicate requests
  and per-page `<head>` drift.
- Extended existing `global.css` instead of creating new style files.
- Preserved existing style direction and changed only typography tokens and
  global type selectors.

## Decisions Made
- Reused the existing shared layout and stylesheet architecture.
- Added no new dependencies and did not use Astro experimental Fonts API.
- No new unit tests were added because this is a global typography/styling
  change; validation used required governance checks and full Astro build.

## Questions/Uncertainties
- None.

## Related Files
- [src/layouts/BaseLayout.astro](../../src/layouts/BaseLayout.astro)
- [src/styles/global.css](../../src/styles/global.css)
- [docs/architecture.md](../architecture.md)
