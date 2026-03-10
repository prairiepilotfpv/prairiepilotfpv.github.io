# 2026-03-10: Apply Image Text Overlays to Art and Make Splash Sections

## Summary
Extended the homepage splash treatment so Art and Make now match Words by
rendering section title, description, and entry link directly over each banner
image. This keeps the home page more image-led while preserving the existing
architecture and file structure.

## Changes
- Updated [src/pages/index.astro](../../src/pages/index.astro):
- Converted Art splash into a `.splash-media` wrapper with:
- `Image.splash-banner`
- overlay text block (`.splash-overlay`) containing heading, copy, and link
- Converted Make splash into the same overlay structure
- Kept Words in the same overlay pattern and normalized shared class usage
- Consolidated overlay CSS from Words-only selectors to section-wide selectors:
- `.section-splash .splash-media`
- `.section-splash .splash-banner`
- `.section-splash .splash-overlay`
- `.section-splash .splash-overlay .section-text`
- `.section-splash .splash-overlay .section-link`

## Verification
- Build test: `npm run build` passes
- Governance checks: `npm run verify` passes
- `check:structure`: PASS
- `check:docs`: PASS
- `check:content`: PASS

## Technical Details
- No new components or layout abstractions were introduced
- Change is scoped to existing homepage markup/styles in `index.astro`
- Overlay uses the existing gradient scrim and white link text for readability

## Decisions Made
- Reused the existing Words overlay pattern for Art and Make instead of creating
  a section-specific component
- Kept implementation in one file to avoid parallel layout systems and preserve
  predictability

## Questions/Uncertainties
- None

## Related Files
- [src/pages/index.astro](../../src/pages/index.astro)
