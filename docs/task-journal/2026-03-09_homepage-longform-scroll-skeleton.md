# 2026-03-09: Implement homepage long-form scroll skeleton

## Summary
Reworked the homepage into a structural long-form scroll sequence that follows
the approved section order: Hero, page overview links, Art splash, Words
splash, Make splash, and About preview.

## Changes
- Updated `src/pages/index.astro` to replace the prior content-collection feed
  preview layout with six semantic sections in one continuous page.
- Added minimal section-level hooks (`scroll-section`, `section--viewport`) for
  future viewport-style scroll behavior without adding animation logic.
- Kept `BaseLayout` and `Navigation` reuse intact to preserve existing governed
  page and nav architecture.
- Updated `README.md` Home description to reflect the long-form landing
  structure.

## Verification
- `npm run check:structure` -> `PASS: check:structure`
- `npm run check:docs` -> `PASS: check:docs`
- `npm run check:content` -> `PASS: check:content`
- `npm run verify` -> `PASS: check:structure`, `PASS: check:docs`, `PASS: check:content`
- `npm run build` -> Astro build succeeded; `8 page(s) built in 1.31s`

## Technical Details
- Hero is implemented as a full-height placeholder section using accessible
  placeholder markup (`role="img"` + `aria-label`) for future photography.
- Overview links and splash sections use direct links to existing routes:
  `/art`, `/words`, `/make`, `/about`.
- Styling remains minimal and readable, using existing global color tokens and
  scoped page CSS only.

## Decisions Made
- Chose to edit only `src/pages/index.astro` for implementation to avoid new
  abstractions and preserve architecture simplicity.
- Kept the implementation intentionally structural-first (no scroll animation,
  nav hide behavior, or polished visual art direction) per scope.

## Questions/Uncertainties
- None.

## Debug Follow-up (Same Day)
- Symptom: homepage rendered literal text `import BaseLayout from "../layouts/BaseLayout.astro"` at the top.
- Reproduction:
  - `npm run build`
  - `Get-Content dist/index.html -TotalCount 30`
- Evidence captured from generated output:
  - `<!DOCTYPE html>import BaseLayout from "../layouts/BaseLayout.astro"`
- Root cause:
  - `src/pages/index.astro` lost the opening Astro frontmatter fence (`---`) while retaining the closing fence, so the import line was parsed as template text.
- Fix:
  - Added missing opening `---` at the top of `src/pages/index.astro`.
- Post-fix verification:
  - `npm run check:structure` -> `PASS: check:structure`
  - `npm run check:docs` -> `PASS: check:docs`
  - `npm run check:content` -> `PASS: check:content`
  - `npm run verify` -> `PASS: check:structure`, `PASS: check:docs`, `PASS: check:content`
  - `npm run build` -> Astro build succeeded; homepage no longer emits import text.

## Related Files
- [src/pages/index.astro](../../src/pages/index.astro)
- [README.md](../../README.md)
