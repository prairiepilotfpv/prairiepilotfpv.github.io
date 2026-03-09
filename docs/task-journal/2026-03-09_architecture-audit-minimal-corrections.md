# 2026-03-09: Apply architecture audit minimal corrections

## Summary
Implemented the smallest coherent set of fixes from the architecture audit: structure enforcement now allows Astro-generated cache, layout naming is clarified by removing the `Layout.astro`/`BaseLayout.astro` duality, and image standards now distinguish local-vs-remote practical usage.

## Changes
- Updated structure enforcement in `scripts/repo-checks.mjs`:
  - Added top-level allowance for `.astro`
  - Added `.astro` to ignored generated directories
- Simplified layout architecture:
  - Removed `src/components/Layout.astro`
  - Moved wrapper HTML/head/global-shell logic directly into `src/layouts/BaseLayout.astro`
  - Kept `src/components/Navigation.astro` as the nav component
- Updated architecture and standards docs for clarity:
  - `README.md`
  - `docs/architecture.md`
  - `docs/decisions/0001-site-architecture.md`
  - `docs/standards/coding-standards.md`
  - `docs/standards/documentation-standards.md`

## Verification
- Reproduced original failure:
  - `npm run check:structure`
  - Output before fix: `FAIL: check:structure` and `top-level directory not approved: .astro`
- After fix and implementation:
  - `npm run check:structure` -> `PASS: check:structure`
  - `npm run check:docs` -> initially failed until this task journal entry was added (expected governance behavior)
  - `npm run check:content` -> `PASS: check:content`
  - `npm run verify` -> pass after this entry was added
  - `npm run build` -> pass

## Technical Details
- Kept enforcement strict for user-authored structure while allowing known generated Astro cache output.
- Avoided rename churn by consolidating into the already-imported `BaseLayout.astro` path and deleting only the extra wrapper component.
- Image guidance now aligns with practical implementation:
  - Prefer Astro `<Image>` for local assets
  - Allow plain `<img>` for remote-only images when optimization is not practical

## Decisions Made
- No new abstractions or dependencies were introduced.
- No section-specific layout/components were added; this change only resolves identified audit issues.

## Questions/Uncertainties
- None.

## Related Files
- [scripts/repo-checks.mjs](../../scripts/repo-checks.mjs)
- [src/layouts/BaseLayout.astro](../../src/layouts/BaseLayout.astro)
- [README.md](../../README.md)
- [docs/architecture.md](../architecture.md)
- [docs/standards/coding-standards.md](../standards/coding-standards.md)
- [docs/standards/documentation-standards.md](../standards/documentation-standards.md)
- [docs/decisions/0001-site-architecture.md](../decisions/0001-site-architecture.md)
