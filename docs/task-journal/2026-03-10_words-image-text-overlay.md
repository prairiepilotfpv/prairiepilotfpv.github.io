# 2026-03-10: Move Words Splash Copy Onto Banner Image

## Summary
Updated the homepage Words splash so its heading, description, and entry link
render as an overlay on top of the Words banner image instead of above it.
This aligns the section with a more editorial, image-led presentation.

## Changes
- Updated [src/pages/index.astro](../../src/pages/index.astro):
- Replaced the standalone Words text block + image with a single `.words-splash-media` wrapper
- Added `.splash-overlay` markup containing:
- `h1#splash-words-title`
- descriptive paragraph
- `Enter Words` link
- Added scoped CSS for:
- relative media container
- absolute overlay positioning
- gradient scrim for readability
- white text/link treatment for contrast

## Verification
- Build test: `npm run build` succeeds with no errors
- Static routes and optimized images generated successfully
- No dependency changes

## Technical Details
- Kept Art and Make splash sections unchanged
- Implemented the change only in `index.astro` to avoid introducing a new
  component for a single-use adjustment
- Used a gradient overlay background to preserve image visibility while
  improving text legibility

## Decisions Made
- Scope this change to Words only, matching the user request
- Reuse existing section structure and styling patterns instead of adding a new
  abstraction

## Questions/Uncertainties
- None

## Related Files
- [src/pages/index.astro](../../src/pages/index.astro)
