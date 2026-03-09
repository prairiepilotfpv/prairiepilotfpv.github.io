# 2026-03-09: Top navigation width and scroll behavior updates

## Summary
Updated the shared top navigation so it spans the full viewport while remaining
in normal document flow (not fixed to the top while scrolling). This keeps
existing routes and active-link behavior while resolving width clipping.

## Changes
- Updated `src/components/Navigation.astro` styles to keep the nav full-width
  on desktop and mobile (`width: 100%`), including the mobile breakpoint.
- Updated `src/components/Navigation.astro` again to use viewport breakout
  sizing (`width: 100vw` and `margin-inline: calc(50% - 50vw)`) so the bar
  reaches the visual viewport edge without right-side clipping.
- Kept all existing nav links and active-path logic unchanged.
- Updated `src/layouts/BaseLayout.astro` so `<Navigation />` is rendered
  outside `.shell`, allowing true edge-to-edge width instead of being limited
  by the shell `max-width`.
- Adjusted layout spacing in `src/layouts/BaseLayout.astro` (`.shell` padding
  and `main` top padding) for the in-flow nav position.

## Verification
- `npm run build` → PASS.
- No new automated tests added (layout/CSS-only change; build validation used).

## Documentation Updated
- Added this task journal entry per governance requirements.

## Files Modified
- `src/components/Navigation.astro`
- `src/layouts/BaseLayout.astro`
- `docs/task-journal/2026-03-09_top-bar-stretch-floating-nav.md`

## Notes
No new components, pages, or dependencies were added. The change remains scoped
to existing layout/navigation files.
