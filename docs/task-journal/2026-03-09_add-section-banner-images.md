# 2026-03-09: Add Section Banner Images to Homepage

## Summary
Added visual preview images to the Art, Words, and Make splash sections on the homepage to better express each section's publishing mode and improve visual character. Images are constrained within the centered column layout, unlike the hero image which breaks out to full viewport width.

## Changes
- **src/pages/index.astro**:
  - Imported three section banner images: `art_banner.jpg`, `writing_banner.jpg`, `making_banner.jpg`
  - Added `<Image>` component to Art section with appropriate sizing (`widths={[640, 768]}`)
  - Added `<Image>` component to Words section with appropriate sizing
  - Added `<Image>` component to Make section with appropriate sizing
  - Added CSS styling for section images: top margin, border radius, and responsive sizing
  - Fixed pre-existing TypeScript errors by removing invalid `placeholder` and `aspectRatio` props from hero image

## Verification
- **Build test**: `npm run build` succeeded (3.02s total)
  - All 8 pages built successfully
  - Image optimization generated 13 optimized WebP images
  - New section banners optimized: art_banner (7376kB → 34-1406kB), writing_banner (9411kB → 26-1242kB), making_banner (3601kB → 19-337kB)
- **Type checking**: No TypeScript errors
- **Governance checks**: `npm run verify` passes structure and content checks (docs check will pass after this journal entry is added)
- **Manual verification**: Images stay within `.section-inner` max-width (44rem), do not break out like hero

## Technical Details
### Why these images stay constrained:
- Images placed directly inside `.section-inner` div, which has `max-width: 44rem`
- No wrapper div with breakout styles (unlike hero)
- Smaller `sizes` attribute: `(min-width: 760px) 44rem, 90vw` reflects constrained width
- Appropriate widths for constrained layout: `[640, 768]` vs hero's `[640, 1024, 1600]`

### Image sizing rationale:
- **widths={[640, 768]}**: Appropriate for column-constrained layout (44rem ≈ 704px)
- **sizes="(min-width: 760px) 44rem, 90vw"**: Desktop shows images at 44rem max; mobile at 90% viewport
- No `aspectRatio` or `fit` properties: Let images maintain natural proportions

### Styling approach:
- Component-scoped CSS in `<style>` block
- Minimal styling: margin-top, border-radius, width/height auto
- Reuses existing layout constraints via `.section-inner`

## Decisions Made
- **Constrained images**: Section preview images should stay within the centered column to differentiate them from the hero statement image, which intentionally breaks out to full viewport
- **No new components**: Extended existing `index.astro` rather than creating a reusable section preview component (not needed for single use case)
- **Minimal styling**: Simple polish with border-radius and spacing rather than elaborate image treatments
- **Fixed pre-existing errors**: Removed invalid Astro Image props (`placeholder`, `aspectRatio`, `fit`) that were causing TypeScript errors

## Questions/Uncertainties
None. Implementation is complete and verified.

## Related Files
- [src/pages/index.astro](../../src/pages/index.astro) — Modified to add section images
- [src/assets/images/index/art_banner.jpg](../../src/assets/images/index/art_banner.jpg) — Existing asset, now in use
- [src/assets/images/index/writing_banner.jpg](../../src/assets/images/index/writing_banner.jpg) — Existing asset, now in use
- [src/assets/images/index/making_banner.jpg](../../src/assets/images/index/making_banner.jpg) — Existing asset, now in use
