# Documentation Standards for The High Prairie

This document defines when to document, what to document, and how to write documentation. All meaningful changes must include documentation updates.

## What Counts as "Meaningful"?

**Must be documented**:
- New pages or sections
- New components or layouts
- Changes to content model or frontmatter
- Changes to navigation or site structure
- New styling philosophy or visual changes
- New build tools or dependencies
- Changes to deployment process
- New patterns or conventions

**Does NOT need documentation**:
- Bug fixes in isolated functions
- Dependency updates with no API changes
- Refactoring that doesn't change behavior or patterns
- Typo corrections
- Performance improvements with no structural changes

## Documentation Types

### 1. Code Documentation (In-Code Comments)

Use code comments for:
- **Complex algorithms**: Explain the approach, not the syntax
- **Non-obvious patterns**: "Why does it work this way?"
- **Important constraints**: "This must run before X"
- **Gotchas**: "Beware of X behavior"

**Example good comment**:
```astro
---
// We need to sort by date descending, then by title ascending
// to ensure consistent ordering across rebuilds
const sorted = posts.sort((a, b) => {
  const dateDiff = b.date - a.date;
  return dateDiff !== 0 ? dateDiff : a.title.localeCompare(b.title);
});
---
```

**Example bad comment**:
```astro
---
// Sort posts
const sorted = posts.sort(...);
---
```

### 2. Component Documentation (Props & JSDoc)

Document every component's purpose and props:

```astro
---
/**
 * ArticleCard displays a summary of an article for listings.
 *
 * @component
 * @example
 *   const article = { title: "...", date: ..., slug: "..." };
 *   <ArticleCard article={article} />
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Article title
 * @param {Date} props.date - Publication date
 * @param {string} props.slug - URL slug for the article
 */
interface Props {
  title: string;
  date: Date;
  slug: string;
}

const { title, date, slug } = Astro.props;
---
```

**For TypeScript files**:
```typescript
/**
 * Converts a string to URL-friendly slug format.
 *
 * @param {string} text - Input text to slugify
 * @returns {string} Slugified text
 *
 * @example
 *   slugify("Hello, World!") // => "hello-world"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}
```

### 3. Architecture Documentation

Update [docs/architecture.md](../architecture.md) when:
- Adding a new folder or file type
- Creating new components or layouts
- Changing the page/collection structure
- Establishing new patterns or conventions

Example update:

**Before**:
```markdown
### Component Rules
1. Single responsibility
2. Reusability
```

**After**:
```markdown
### Component Rules
1. Single responsibility
2. Reusability
3. Image optimization: Use Astro's <Image> component for all img elements
4. No utility-first CSS: Use scoped component styles instead
```

### 4. Decision Documentation (ADR - Architecture Decision Records)

For significant structural decisions, create an ADR in `docs/decisions/`:

- **Filename**: `NNNN-short-title.md` (e.g., `0002-implement-rss-feeds.md`)
- **Template** (see [0001-site-architecture.md](../decisions/0001-site-architecture.md)):
  1. Problem
  2. Decision
  3. Rationale
  4. Constraints
  5. Alternatives considered
  6. Implications

**When to write an ADR**:
- Adding a new major section
- Changing the content model
- Adding a new technology or tool
- Changing the visual philosophy significantly
- Any decision that affects future agents

### 5. Task Journal Entries

Document your work in `docs/task-journal/` following the template in [docs/task-journal/README.md](../task-journal/README.md).

Each entry records:
- What you changed
- Why you changed it
- How you verified it works
- What decisions you made
- What questions remain

Example entry:
```markdown
# 2026-03-08: Add image optimization to Art section

## Summary
Implemented Astro Image component for all Art collection pages to improve load time.

## Changes
- Updated all ArticleCard components to use <Image>
- Configured image optimization in astro.config.mjs
- Removed img-tag usage from Art layouts

## Verification
- Build succeeds: `npm run build` (no errors)
- Manual testing: Art pages load images correctly
- Performance: Load time improved from 2.3s to 1.1s on 4G

## Decisions
- Use native Astro Image component instead of sharp plugin directly
- Reason: Simpler maintenance, automatic responsive images

## Open Questions
- Should we optimize images on Make section too? (deferred)
```

## Documentation Style Guide

### Markdown Formatting

**Headings**: Use h1 (#) for page title, h2 (##) for sections, h3 (###) for subsections

```markdown
# Page Title

## Section
Text here.

### Subsection
More text.
```

**Code blocks**: Always specify language

```markdown
\`\`\`astro
---
import Layout from '../layouts/Base.astro';
---
\`\`\`

\`\`\`typescript
function example() {
  return true;
}
\`\`\`
```

**Emphasis**: Use markdown formatting
- **Bold**: `**important concept**`
- *Italic*: `*emphasis*`
- `Code`: `` `inline code` ``

**Lists**: Use clear bullet points

```markdown
Benefits of this approach:
- Simpler implementation
- Easier to maintain
- Better performance
```

**Links**: Use descriptive link text

```markdown
❌ See [this](../architecture.md)
✅ See [architecture documentation](../architecture.md) for folder structure
```

### Writing Style

- **Clarity over brevity**: Complete sentences, avoid jargon
- **Active voice**: "The Image component optimizes" not "Images are optimized"
- **Concrete examples**: Show code, structure, or specific files
- **Avoid hedging**: "This is required" not "This might be helpful"

**Example good documentation**:
```markdown
## Adding a New Component

1. Create the component in `src/components/`
2. Document props with JSDoc comments
3. Use scoped `<style>` blocks for styling
4. Export with a clear name matching the filename

Example:
\`\`\`astro
---
// src/components/MyComponent.astro
interface Props {
  title: string;
  featured?: boolean;
}
---
\`\`\`
```

**Example bad documentation**:
```markdown
You can add components. Just put them in the components folder.
Make sure they have props. Use styles. Export them.
```

### File Naming

Documentation files use:
- **Kebab-case**: `image-optimization.md`
- **Descriptive names**: `error-reporting-standards.md` not `rules.md`
- **Versioned decisions**: `0001-site-architecture.md`, `0002-rss-feeds.md`
- **Dated entries**: `2026-03-08_image-optimization.md` for task journal

## What to Document

### When Adding a Component

**In the component file** (JSDoc/TSDoc):
```astro
---
/**
 * Brief description of what this component does.
 * More detailed explanation if needed.
 *
 * @param title - The component title
 * @param featured - Whether to feature this (optional)
 */
interface Props {
  title: string;
  featured?: boolean;
}
---
```

**In architecture.md**:
```markdown
### Component Rules
- [Add your new rule here if it applies broadly]
```

**In task journal**:
```markdown
## Created PhotoCard component

Component for displaying photos in Art section galleries.
Used in pages/art/index.astro and [slug].astro.
```

### When Adding a Page

**In task journal**:
```markdown
## Created About page

Added /about page with project information.
Updated Navigation component to link to it.
```

**In README.md** (if it's a main section):
```markdown
Update the "Quick Start" or "Project Structure" section if needed.
```

### When Changing the Content Model

**In architecture.md**:
```markdown
## Content Collections

### Art Collection
[Add new required fields here]

### Words Collection
[Update schema if changed]
```

**In task journal**:
```markdown
## Updated Words collection schema

Added `excerpt` field (optional).
Migration: All existing posts still valid.
Update: Remember to add excerpts to new posts.
```

### When Changing Styling

**In component** (`<style>` block):
```css
/* When using uncommon CSS features, explain */
.gallery {
  /* CSS Grid auto-fills to create responsive layout */
  /* Items fill available space, 300px minimum */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
```

**In architecture.md**:
```markdown
### Styling Philosophy
- Images: Use Astro's <Image> component for optimization
- Layouts: Component-scoped styles preferred
- Colors: Define in global.css as CSS custom properties
```

**In task journal**:
```markdown
## Implemented dark mode

Added CSS custom properties for light/dark themes.
Toggle stored in localStorage.
Respects prefers-color-scheme.
```

## Documentation Checklist

Before committing:

- [ ] Code has comments for complex logic
- [ ] Components have JSDoc/TypeScript documentation
- [ ] Architecture.md is updated if structure changed
- [ ] Standards files are updated if patterns changed
- [ ] Task journal entry created for significant work
- [ ] All documentation uses clear language
- [ ] All examples are correct and runnable
- [ ] All links in docs are valid (relative paths work)

## Keeping Docs Up-to-Date

When docs go out of sync with code:

1. **First choice**: Update the code to match docs
2. **If code is right**: Update the docs
3. **If both need changing**: Update both in the same commit

**Example**:
```
Bad commit: "Update code" without touching architecture.md
Good commit: "Add image optimization, update architecture.md"
```

Outdated docs are worse than no docs. If you can't update documentation, ask someone who can or file an issue.

## Documentation Tools

- **Markdown**: Write docs in `.md` files
- **Frontmatter**: Can include frontmatter in task journal for easy parsing
- **Code snippets**: Always use proper syntax highlighting
- **Links**: Use relative paths: `../architecture.md`, not absolute URLs

## Documentation and Governance Checks

The repository enforces documentation and structure expectations with npm scripts:

- `npm run check:structure`
  - Fails if top-level or `src/` structure drifts beyond approved architecture
  - Fails on naming convention violations for components/pages
- `npm run check:docs`
  - Fails if required governance/architecture docs are missing
  - Fails if task journal filenames are not in required format
  - Fails if meaningful changes are detected without a dated task journal entry
- `npm run check:content`
  - Fails if content collections are outside `art`, `words`, `make`
  - Fails on invalid content filename conventions
  - Fails when required frontmatter fields are missing/invalid
- `npm run verify`
  - Runs all checks and is the required CI gate

When adding or changing documentation standards, keep these checks in sync.

## Examples of Good Documentation

**Task Journal Entry**: [docs/task-journal/README.md](../task-journal/README.md) template
**Architecture Decision**: [docs/decisions/0001-site-architecture.md](../decisions/0001-site-architecture.md)
**Code Standards**: [docs/standards/coding-standards.md](coding-standards.md)

---

See [AGENTS.md](../../AGENTS.md) for when documentation is required and [docs/standards/error-reporting-standards.md](error-reporting-standards.md) for debugging documentation.
