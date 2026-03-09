# Error Reporting and Debugging Standards for The High Prairie

This document defines how to debug problems, report errors, and investigate issues. All debugging must follow an evidence-first approach.

## Core Principle: Evidence First

**Never guess**. Before proposing a fix:

1. **Reproduce** the problem with a clear test case
2. **Capture** error messages and stack traces
3. **Investigate** the root cause with evidence
4. **Propose** a fix based on what you found
5. **Verify** the fix actually works

**Example good debugging flow**:
```
Symptom: Build fails with image error
Evidence: Run `npm run build` and capture error message
Investigation: Error mentions Image component in Art post
Root cause: Image path is incorrect in frontmatter
Fix: Correct the image path
Verification: `npm run build` succeeds
```

**Example bad debugging flow**:
```
Symptom: Build fails
Guess: Maybe it's a plugin issue
Action: Update plugins
Result: Build still fails, now you've made things worse
```

## Types of Errors

### Build Errors

When `npm run build` fails:

1. **Read the error message** completely
   - It tells you the file and line number
   - It explains what went wrong

2. **Locate the problem file**
   ```bash
   npm run build
   # Error: src/pages/art/[slug].astro:23
   # "title" is required but missing
   ```
   - Open `src/pages/art/[slug].astro` at line 23

3. **Check the code**
   - Look at that line and surrounding context
   - Check for missing imports, typos, syntax errors

4. **Fix it**
   - If it's a missing import: add the import
   - If it's a syntax error: fix the syntax
   - If it's a content issue: see "Content Errors" below

5. **Re-build to verify**
   ```bash
   npm run build
   ```
   - If it still fails, repeat from step 1
   - If it succeeds, you fixed it

### Content Errors

If build fails because of content (Markdown frontmatter):

1. **Identify which content file** caused the error
   ```
   Error: src/content/art/my-file.md
   Frontmatter validation failed: "date" is required
   ```

2. **Open the content file** and check frontmatter
   ```yaml
   ---
   title: "My Art"
   # Missing: date
   description: "..."
   ---
   ```

3. **Add missing required fields** based on the collection schema
   ```yaml
   ---
   title: "My Art"
   date: 2026-03-08
   description: "..."
   ---
   ```

4. **Rebuild to verify**

**Content schema** is defined in `src/content/config.ts`. Check there if you're unsure what fields are required.

### Runtime Errors (In Browser)

If the site renders but has JavaScript errors:

1. **Open browser DevTools** (F12, right-click → Inspect)
2. **Go to Console tab**
3. **Reproduce the error** (navigate to the page, click buttons, etc.)
4. **Read the error message** in the console
   ```
   TypeError: Cannot read property 'title' of undefined
   ```
5. **Find the code** causing the error (stack trace shows file and line)
6. **Fix the code** (usually a missing prop check or null coalescing)

**Common browser errors**:
- `Cannot read property 'X' of undefined` → Variable is null/undefined, check initialization
- `Unexpected token` → Syntax error in JavaScript or JSON
- `Failed to fetch` → Network error or CORS issue
- `404 Not Found` → Wrong image path or missing file

### Performance Issues

If the site is slow:

1. **Measure build time**
   ```bash
   time npm run build
   # Took 8 seconds
   ```

2. **Check image sizes**
   ```bash
   ls -lh dist/_astro/*.webp
   # See generated image file sizes
   ```

3. **Check page load time** in browser DevTools (Network tab)
   - Look for largest files
   - Check if images are optimized
   - See if CSS/JS is minified

4. **Look for bottlenecks**
   - Are there many large images not being optimized?
   - Is the CSS huge?
   - Are there unnecessary JavaScript files?

5. **Propose a fix** based on what's slow
   - Optimize images with <Image> component
   - Reduce CSS
   - Remove unused JavaScript

## Debugging Workflow

### Step 1: Reproduce Consistently

**Can you make the error happen again?**

- Yes → You can fix it
- No → It might be intermittent (harder to debug)
- Not sure → Try different scenarios

**Example reproduction**:
```
Build fails when I add a new Art post without an image field
Steps:
1. Create src/content/art/test.md
2. Add title and date, but no image field
3. Run `npm run build`
4. Error: "image" is required in Art collection
```

### Step 2: Isolate the Problem

**Is it related to**:
- A specific file or component?
- A specific content type (Art/Words/Make)?
- A specific build configuration?
- A dependency version?
- A browser or OS?

**Example isolation**:
```
Problem: Image not loading on Safari
Is it all images? No, just images on Art pages.
Is it in development or production? Both.
Is it a specific image format? No, different formats fail.
→ Likely issue: Image component configuration
```

### Step 3: Gather Evidence

**Capture relevant information**:

- **Build output**: Full error message from `npm run build`
- **Code snippet**: The relevant lines from the file
- **Content**: The frontmatter or markdown causing the issue
- **Browser console**: Any JavaScript errors (F12)
- **Screenshots**: Visual problems (wrong layout, missing images)
- **System info**: OS, Node version, npm version

**DO NOT say**:
- "It's broken"
- "Doesn't work"
- "Something is wrong"

**DO say**:
- "Build fails with error: [full error message]"
- "Image doesn't load on Art page [slug]"
- "Layout breaks on mobile (tested in Chrome DevTools)"

### Step 4: Analyze the Root Cause

**Ask**:
- What changed before the error started? (Git history)
- What does the error message say exactly?
- Is this a code issue, content issue, or configuration issue?
- Did this ever work? (If yes, what changed?)

**Common root causes**:
- Missing import
- Typo in variable name
- Missing required frontmatter field
- Incorrect file path
- Incompatible dependency version
- Broken CSS or HTML

### Step 5: Propose a Fix

**Only after understanding the cause**:

```
Root cause: Image path in frontmatter is incorrect
Proposed fix: Update frontmatter to correct path
Verification method: Build succeeds, image renders correctly
```

Do NOT say "Let me try X and see if it fixes it."

### Step 6: Verify the Fix

**After applying the fix**:

1. Re-run the failing command
2. Verify it succeeds (no errors)
3. Verify the fix doesn't break something else
4. Test the feature works as expected

**Example verification**:
```bash
# Build succeeds
npm run build
# ✅ Passed

# Manual test: navigate to page in browser
# ✅ Image displays correctly
# ✅ Layout is correct
# ✅ No console errors
```

## Common Debugging Scenarios

### Scenario 1: "Build Fails with No Clear Error"

1. Check that you have all dependencies:
   ```bash
   npm install
   ```

2. Clear the cache and rebuild:
   ```bash
   rm -rf node_modules/.astro
   npm run build
   ```

3. Check Node.js version:
   ```bash
   node --version
   # Should be 18+ for this project
   ```

4. Check for syntax errors in frontmatter (YAML):
   ```yaml
   # ❌ Wrong quotes/indentation
   title: "My Post

   # ✅ Correct
   title: "My Post"
   ```

### Scenario 2: "Image Doesn't Load"

1. **Check the image path**:
   ```astro
   <Image src={imageUrl} alt="..." />

   // Is imageUrl defined?
   // Does the path actually exist?
   ```

2. **Check the browser Network tab**:
   - Right-click image → Inspect
   - Look for 404 or failed request

3. **Verify the image file exists**:
   ```bash
   ls src/assets/my-image.jpg
   # If not found, the path is wrong
   ```

4. **Check Astro image configuration**:
   - Is the image component imported?
   - Are width/height specified for remote images?

### Scenario 3: "Page Layout is Broken"

1. **Check browser responsive mode** (F12 → mobile icon)
   - Is it a mobile issue specifically?
   - Or broken on all sizes?

2. **Check the CSS** in the component
   - Are there conflicting global styles?
   - Is the width/height properly set?

3. **Check the HTML structure**
   - Are elements properly nested?
   - Are required attributes present?

4. **Test in different browser** (if possible)
   - Chrome, Firefox, Safari - CSS varies

### Scenario 4: "Content Collection Validation Fails"

1. **Check the schema** in `src/content/config.ts`
   ```typescript
   const art = defineCollection({
     schema: z.object({
       title: z.string(),
       date: z.date(),  // ← Must be date format
       description: z.string(),
     }),
   });
   ```

2. **Check your frontmatter** matches the schema
   ```yaml
   ---
   title: "My Post"      # ✅ String
   date: 2026-03-08      # ✅ Date format
   description: "..."    # ✅ String
   ---
   ```

3. **Run build** to validate
   ```bash
   npm run build
   ```

## Documenting Bugs

When you find and fix a bug, create an entry in [docs/task-journal/](../task-journal/README.md):

```markdown
# 2026-03-08: Fixed image loading in Art posts

## Symptom
Images failed to load on Safari on Art section pages.

## Investigation
- Reproduced on Safari 15+
- Other browsers (Chrome, Firefox) worked fine
- Error: Server returned 403 Forbidden for image requests

## Root Cause
Image path used relative URL without proper base prefix.
Safari was stricter about CORS/origin validation.

## Fix
Updated `<Image>` component to use absolute paths for remote images.
Added width/height attributes for proper image sizing.

## Verification
- Build succeeds
- Tested on Safari 15, Chrome, Firefox
- Images load correctly across all browsers
```

## Debugging Tools

**Available in terminal**:
```bash
# Check build process
npm run build

# Run dev server with logs
npm run dev

# Type checking
npm run typecheck

# Linting (if configured)
npm run lint
```

**Available in browser** (F12):
- **Console tab**: JavaScript errors and logs
- **Network tab**: Failed requests, image loading
- **Elements tab**: HTML structure and CSS
- **Lighthouse**: Performance and accessibility audits

**Useful CLI commands**:
```bash
# Check Node version
node --version

# Check npm version
npm --version

# List installed packages
npm list

# Clear npm cache
npm cache clean --force

# Check for outdated packages
npm outdated
```

## When to Ask for Help

Ask for help or file an issue if:

1. **You've reproduced the problem** but don't understand the root cause
2. **Multiple things might be causing it** and you're not sure where to look
3. **The error message is unclear** after reading the docs
4. **You've tried the fix** but it didn't work
5. **The fix breaks something else**

**When asking for help, provide**:
- Full error message or description
- Steps to reproduce
- What you've already tried
- Relevant code snippets

**Example good issue**:
```
Title: Image optimization fails on Art posts with SVG

Symptom: Build fails with "Sharp: unsupported image format"

Reproduction:
1. Add SVG file to src/assets/
2. Reference in Art post frontmatter: image: /svg-file.svg
3. Run `npm run build`

Error message:
```
Error [ValidationError]: [src/content/art/test.md]
Image optimization failed: unsupported format
```

Attempted fix:
- Converted SVG to PNG, same error
- Tried PNG in different path, still fails

System: macOS, Node 18.14, npm 9.3
```

---

See [AGENTS.md](../../AGENTS.md) for the evidence-first debugging philosophy and [docs/standards/testing-standards.md](testing-standards.md) for testing before merging.
