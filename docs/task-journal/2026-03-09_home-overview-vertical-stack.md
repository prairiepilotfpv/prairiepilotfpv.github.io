# 2026-03-09: Stack homepage overview items vertically

## Summary
Updated the homepage "What I do" overview cards to stay stacked vertically at all
viewport sizes and stretch wider within the section for better readability.

## Changes
- Updated `src/pages/index.astro` scoped styles:
  - Added `.section-overview .section-inner { max-width: 64rem; }` so overview
    cards can stretch wider horizontally.
  - Removed the desktop media-query rule that switched `.overview-list` to
    three columns.
- Cleaned minor spacing in two overview paragraph lines.

## Verification
- Baseline before change: `npm run lint && npm run test && npm run build`
  failed early at `lint` with `FAIL: check:structure - top-level file not approved: .git`.
- After change: `npm run test && npm run build` succeeded.

## Technical Details
- Reused existing `.overview-list` grid with a single-column default and removed
  only the breakpoint override, which keeps the change minimal and behavior
  predictable.

## Decisions Made
- Chose CSS-only adjustments in `src/pages/index.astro` to avoid structural
  template changes.
- No dedicated tests were added because this is a scoped presentation change;
  repository checks and build validation were used.

## Questions/Uncertainties
- `npm run lint` currently fails in this worktree due to repository governance
  expectations about top-level files (`.git`).

## Related Files
- [src/pages/index.astro](../../src/pages/index.astro)
- [docs/task-journal/2026-03-09_home-overview-vertical-stack.md](2026-03-09_home-overview-vertical-stack.md)
