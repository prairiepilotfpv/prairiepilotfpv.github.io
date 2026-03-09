# 2026-03-09: Full-width hero break-out on homepage

## Summary
The homepage hero image was updated to use a "break-out" layout that spans
100vw while keeping the surrounding text content constrained to the normal
centered column. This improves visual impact without altering existing page
structure or introducing new abstractions.

## Changes
- Wrapped the `<Image>` in a `<div class="hero-wrapper">` inside
  `src/pages/index.astro`.
- Added accompanying CSS rules for `.hero-wrapper` and `.hero-photo` to pull
  the image out of the 44rem `.section-inner` container and enforce a fixed
  height with `object-fit: cover`.
- Added explanatory comments in the markup.

## Rationale
The previous hero used an image that remained inside the narrow content
column, which made it look small and disconnected. A full-width banner better
expresses the site’s visual nature and aligns with the "Art" publishing mode
without requiring a separate layout or component.

## Verification
All repository checks continue to pass:

- `npm run check:structure` → PASS
- `npm run check:docs` → PASS
- `npm run check:content` → PASS
- `npm run verify` → PASS
- `npm run build` → Build succeeds; pages and optimized images generated.

Local dev server confirmed the hero now spans the viewport and the rest of
the page content remains aligned.

## Documentation Updated
No documentation files were affected; changes are consistent with existing
architecture notes.

## Files Modified
- `src/pages/index.astro`

## Notes
This update keeps the default `.section-inner` wrapper and does not require any
new components, preserving the repository’s lightweight, predictable
structure. The break-out technique was chosen because it is easy to tweak and
reversible.
