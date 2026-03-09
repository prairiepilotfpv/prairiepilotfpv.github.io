# Testing Standards for The High Prairie

This document defines what must be tested, how to test it, and when to test it. All code changes must pass testing before being merged.

## Testing Philosophy

Testing for The High Prairie follows these principles:

1. **Build must succeed**: `npm run build` must complete without errors or warnings
2. **Site must be functional**: Pages render, navigation works, content displays
3. **Content must be valid**: All Markdown frontmatter is correct, no broken links
4. **Images handled appropriately**: Local assets use Astro `<Image>` when needed, remote-only images are handled with practical markup
5. **Manual spot-checking**: Key pages must be reviewed in browser

**We do NOT require**:
- Unit tests for every function
- Integration tests for every feature
- 100% code coverage
- Snapshot tests

This keeps the test suite simple and practical.

## Required Testing

### 1. Build Verification (Required for Every Change)

Before committing or opening a PR:

```bash
npm run build
```

**What it checks**:
- Astro compilation succeeds
- All pages render without errors
- All components load correctly
- TypeScript type checking passes
- All assets are processed

**What counts as "build failure"**:
- Compilation errors
- TypeScript errors
- Missing imports or broken references
- Broken content collection schemas
- Broken image paths

**What to do if build fails**:
1. Read the error message carefully
2. Locate the file and line mentioned in the error
3. Fix the issue
4. Re-run `npm run build` to verify
5. Do not commit broken code

### 2. Content Validation

**Frontmatter**: Every content file must have valid frontmatter matching its collection schema.

**Schema example** (in `src/content/config.ts`):
```typescript
const art = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: z.string(),
  }),
});
```

If you add content that doesn't match the schema, the build will fail.

**Link checking**: Verify all internal links work
```bash
# Manual: Click through the site and verify links work
# Or use a tool: npm install -D linkchecker
linkchecker dist/
```

### 3. Manual Verification

**For new pages or components**:
1. Run `npm run dev`
2. Navigate to the page in a browser
3. Verify:
   - Page renders without JavaScript errors
   - Layout looks correct
   - Images load
   - Links work
   - Mobile layout is readable
4. Check the browser console for warnings

**For content changes**:
1. View the rendered page
2. Verify text, images, formatting are correct
3. Check responsive layout (mobile/tablet/desktop)

### 4. Astro Linting (If Configured)

If the project has ESLint or TypeScript checking:

```bash
npm run lint
```

Or for specific file types:
```bash
npm run typecheck
```

Fix any errors before committing.

## Optional: Unit Testing

If the project adds unit tests, they should test:

- **Utility functions**: Date formatting, slug generation, string manipulation
- **Collection queries**: Sorting, filtering, pagination
- **Component behavior**: Prop handling, conditional rendering

**Testing framework**: Vitest or Jest are both acceptable.

**Example test**:
```typescript
import { describe, it, expect } from 'vitest';
import { slugify } from '../utils/slugify';

describe('slugify', () => {
  it('converts strings to kebab-case', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('handles special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });
});
```

**Test file location**: Place tests next to the code they test, or in a `tests/` folder.

**Running tests**:
```bash
npm run test
npm run test:watch  # For development
```

## Continuous Integration (CI)

If the project uses GitHub Actions or similar:

**.github/workflows/build.yml** should run:
1. Install dependencies
2. Run `npm run build`
3. Verify no build errors
4. Optionally: Run linting
5. Optionally: Run tests

**Example workflow**:
```yaml
name: Build

on: [push, pull_request]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm run lint  # Optional
      - run: npm run test  # Optional
```

## Testing Checklist

Before submitting a PR:

- [ ] Ran `npm run build` and it succeeded
- [ ] Verified pages render correctly in browser
- [ ] Checked mobile layout is readable
- [ ] Verified links work
- [ ] Checked for browser console errors
- [ ] Ran `npm run lint` (if configured) and fixed errors
- [ ] Ran `npm run test` (if configured) and all tests pass
- [ ] No console.log() left in code
- [ ] All new content has valid frontmatter

## Performance Testing

The site is static, so runtime performance is not a concern. However, **build time** and **image sizes** matter.

### Build Time

Build should complete in < 10 seconds.

```bash
time npm run build
```

If build time increases significantly, investigate:
- New dependencies with slow plugins
- Large number of new pages
- Image processing bottlenecks

### Image Sizes

For local assets rendered with Astro `<Image>`, verify optimized outputs in the generated `dist/` folder:

```bash
# Check generated image sizes
ls -lh dist/_astro/*.jpg
ls -lh dist/_astro/*.webp
```

Images should be significantly smaller than originals (use WebP when possible).

## Debugging Failed Tests/Builds

### Step 1: Read the Error Message

Error messages from Astro often point to the exact line and file. Read the full message.

### Step 2: Check the File

Open the file mentioned in the error:
- Is the import correct?
- Is the syntax valid?
- Are all required props passed to components?

### Step 3: Verify Content Frontmatter

If content fails, check the frontmatter:
```yaml
---
title: "My Post"        # String, required
date: 2026-03-08        # Date format, required
description: "..."      # String, required
# Other fields per schema
---
```

All required fields in the schema must be present.

### Step 4: Check TypeScript

If TypeScript errors appear:
```bash
npm run typecheck
```

Fix type mismatches (wrong types passed to props, undefined variables, etc.).

### Step 5: Clear Cache and Rebuild

Sometimes the build cache gets corrupted:

```bash
rm -rf node_modules/.astro
npm run build
```

## What NOT to Test

❌ **Don't test CSS manually**: CSS is scoped, so no conflicts
❌ **Don't test async layout shifts**: Astro pre-renders everything
❌ **Don't test JavaScript in old browsers**: This is a static site
❌ **Don't test things without changing code**: If you didn't change it, you don't need to test it

## Test-Driven Development (Optional)

If you prefer TDD:

1. Write a test that fails
2. Write code to make it pass
3. Refactor if needed

Example:
```typescript
// Before: write the test
it('returns sorted posts by date', async () => {
  const posts = await getCollection('words');
  const sorted = sortByDate(posts);
  expect(sorted[0].date > sorted[1].date).toBe(true);
});

// Then: write the function
export function sortByDate(posts) {
  return posts.sort((a, b) =>
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}
```

## Reporting Issues

When you find a bug:

1. **Reproduce it**: Create a minimal test case
2. **Capture evidence**: Error messages, screenshots, browser console logs
3. **Propose a root cause**: Not a guess, but based on evidence
4. **Suggest a fix**: Only after you understand the problem

See [docs/standards/error-reporting-standards.md](error-reporting-standards.md) for detailed guidance.

## Checklist for Code Reviewers

When reviewing a PR:

- [ ] Build succeeds without errors
- [ ] All tests pass (if applicable)
- [ ] Manual spot-check: key pages render correctly
- [ ] No console errors in browser
- [ ] Mobile layout is readable
- [ ] All links work
- [ ] New content has valid frontmatter
- [ ] Documentation is updated

---

See [AGENTS.md](../../AGENTS.md) for when to test and [docs/standards/error-reporting-standards.md](error-reporting-standards.md) for debugging approach.
