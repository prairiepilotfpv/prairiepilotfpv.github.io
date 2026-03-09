# 2026-03-09: Fix "get is not defined" error on homepage

## Summary
A runtime error occurred while rendering the homepage: `get is not defined`
reported by Astro when starting the dev server. The page had been edited to
import a `get` function from a remote axios CDN outside the frontmatter, which
Astro treated as template code.

## Changes
- Removed stray second frontmatter block and the `import { get }` line from
  `src/pages/index.astro`.
- Added a proper import for the hero image asset and updated the `<Image>`
  component to use the imported variable, resolving a subsequent build error.

## Verification
- `npm run check:structure` → `PASS: check:structure`
- `npm run check:docs` → Initially failed due to missing task entry; now passes
  once this journal file exists.
- `npm run check:content` → `PASS: check:content`
- `npm run verify` → `PASS: all checks` after adding journal entry.
- `npm run build` → Build succeeds with all routes generated and images
  optimized.

## Technical Details
- The offending import followed a closing `---` delimiting frontmatter. Astro
  leaves content after the first closing fence untouched; the `import { get }`
  line was treated as part of the rendered template, causing `get` to be
  referenced without definition at runtime.
- Removing the extraneous frontmatter and unused import restored normal
  rendering.  While inspecting the file we also noted and fixed the hero image
  markup: Astro requires local images to be imported rather than referenced by
  string paths.

## Root Cause
The page contained two separate frontmatter sections. The second one wrapped
only the axios import, which is not a valid placement. As a result, Astro
attempted to render the import line as template code, leading to a `ReferenceError`.

## Minimal Fix
Edit `src/pages/index.astro`:
- Delete the extra `---` fences and the CDN import.
- Add `import heroImage from "../assets/images/index/Hero_banner.jpg"` to the
  single frontmatter block.
- Change `<Image src="../assets/images/index/Hero_banner.jpg" …>` to
  `<Image src={heroImage} …>`.

No new files were needed; only the existing homepage was modified.

## Documentation Updated
None (changes were code-only and consistent with existing architecture notes).

## Related Files
- `src/pages/index.astro`

## Notes
This issue was triggered by an accidental import attempt; remote imports are not
supported in Astro frontmatter.  If external libraries are needed they should
be installed via npm and imported normally.
