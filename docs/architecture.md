# Architecture: The High Prairie

This document defines the approved structure, patterns, and extension rules for The High Prairie. All code changes must align with this architecture.

## Folder Structure (Approved)

```
src/
├── pages/
│   ├── index.astro              # Home page (root landing)
│   ├── art/
│   │   ├── index.astro          # Art section index/listing
│   │   └── [slug].astro         # Individual art posts
│   ├── words/
│   │   ├── index.astro          # Words section index/listing
│   │   └── [slug].astro         # Individual word posts
│   ├── make/
│   │   ├── index.astro          # Make section index/listing
│   │   └── [slug].astro         # Individual make posts
│   ├── about.astro              # About page (standalone)
│   └── [utility pages]          # 404, RSS, etc. (justified in architecture updates)
├── components/
│   ├── Navigation.astro         # Main nav (used in Layout)
│   ├── Layout.astro             # Base page wrapper
│   ├── Footer.astro             # Footer (optional, used in Layout)
│   └── [section-specific]/
│       ├── ArticleCard.astro    # Reusable card component
│       ├── [Feature]Header.astro
│       └── [other components]
├── layouts/
│   ├── Base.astro               # Root layout (if needed)
│   ├── BlogPost.astro           # For article/essay pages
│   ├── [SectionName]Post.astro  # For section-specific layouts
│   └── [other layouts]
├── content/
│   ├── art/                     # Art content collection
│   │   └── [slug].md/.mdx       # Individual art posts
│   ├── words/                   # Words content collection
│   │   └── [slug].md/.mdx       # Individual essays/posts
│   ├── make/                    # Make content collection
│   │   └── [slug].md/.mdx       # Individual project posts
│   └── config.ts                # Content collection schema definitions
├── styles/
│   ├── global.css               # Global styles
│   └── [section-specific]/      # Section-scoped styles (optional)
├── utils/
│   └── [utilities]              # Only if they're used in multiple places
└── env.d.ts                     # Type definitions (Astro auto-generated)

docs/                           # Outside src/ - documentation only
├── architecture.md             # This file
├── decisions/
│   └── 0001-site-architecture.md
├── standards/
│   ├── coding-standards.md
│   ├── testing-standards.md
│   ├── documentation-standards.md
│   └── error-reporting-standards.md
└── task-journal/
    ├── README.md               # Template and guidelines
    └── [YYYY-MM-DD]_[task].md  # Individual task logs
```

## Content Collections

### Art Collection
**Purpose**: Visual work, photography, and photo-centric artistic posts

**Frontmatter schema**:
```yaml
---
title: string          # Required
date: Date             # Required
description: string    # Required (used in listings)
image: string          # Recommended (featured image path)
alt: string            # Recommended (image alt text)
---
```

**Notes**:
- Art should be visual-first, with minimal text
- Use Astro's image component for optimization
- Image paths relative to `src/assets/` or from URLs

### Words Collection
**Purpose**: Essays, blog posts, reflections, and text-first pieces

**Frontmatter schema**:
```yaml
---
title: string          # Required
date: Date             # Required
description: string    # Required (used in listings)
excerpt: string        # Recommended (short preview)
---
```

**Notes**:
- Words should be text-first, editorial in nature
- Use semantic HTML (h2, h3, blockquote, etc.)
- Avoid excessive markdown extensions

### Make Collection
**Purpose**: Handmade or 3D-printed smoking accessories, crafts, build logs, and process documentation

**Frontmatter schema**:
```yaml
---
title: string          # Required
date: Date             # Required
description: string    # Required (used in listings)
image: string          # Optional (featured image or product shot)
process: boolean       # Optional (is this a process/build log?)
---
```

**Notes**:
- Can be visual (product photos) or text-heavy (build logs)
- Process pages should document steps clearly
- Include materials, tools, and techniques when relevant

## Pages and Routes

### Home (`/`)
- Entry point to the site
- Links to main sections (Art, Words, Make, About)
- Visual philosophy: welcoming, editorial, not generic

### Art Section (`/art`)
- `/art` → Collection listing (grid or gallery view)
- `/art/[slug]` → Individual post with full image(s) and description
- Visual philosophy: photography-first, minimal text, clean layout

### Words Section (`/words`)
- `/words` → Collection listing (essay index, reverse chronological)
- `/words/[slug]` → Individual essay/post with typography-focused reading experience
- Visual philosophy: text-first, readable, editorial

### Make Section (`/make`)
- `/make` → Collection listing (project index)
- `/make/[slug]` → Individual project/craft with step-by-step documentation
- Visual philosophy: process-focused, hands-on, instructional

### About (`/about`)
- Standalone page (not a collection)
- Project information, contact, etc.
- Visual philosophy: consistent with overall site aesthetic

## Components and Reusability

### Core Components (Required)

- **Navigation.astro**: Main site navigation
  - Must include links to all five sections
  - Should be consistent across all pages
  - Responsive on mobile/tablet/desktop

- **Layout.astro**: Base page wrapper
  - Includes Navigation
  - Handles metadata, SEO basics
  - Scoped styles or global styles
  - Includes Footer if present

### Section-Specific Components (Optional, but Recommended)

- **ArticleCard.astro**: Reusable card for listing posts (used in collection indices)
- **[SectionName]Header.astro**: Section intro/header component
- **ImageOptimized.astro**: Wrapper for responsive images

### Component Rules

1. **Single responsibility**: Each component does one thing well
2. **Reusability**: If a component is used in 2+ places, make it reusable
3. **Props**: Document required/optional props
4. **No parallel abstractions**: Check that a similar component doesn't exist
5. **Naming**: PascalCase for component filenames, descriptive names

### Anti-Patterns

- ❌ Creating components for one-off uses
- ❌ Creating multiple variants of the same component (consolidate with props)
- ❌ Deeply nested component hierarchies (keep it flat)

## Styling Philosophy

### Visual Direction
The site rejects generic "SEO blog" design in favor of editorial, media-aware presentation:

- **Art**: Photography-first, generous whitespace, high-quality images
- **Words**: Typography-focused, readable line lengths, clean formatting
- **Make**: Process-focused, visual steps, clear documentation
- **Overall**: Cohesive aesthetic that reflects personal taste, not trends

### Styling Approach

1. **Global styles** in `src/styles/global.css` (resets, base typography)
2. **Component-scoped styles** in `.astro` files (component-specific rules)
3. **CSS Modules** if needed for complex styling
4. **Avoid**: Utility-first CSS frameworks that encourage generic design

### Colors, Typography, Layout

These should be defined in your CSS and documented in [docs/decisions/0001-site-architecture.md](0001-site-architecture.md).

**Update this architecture if**:
- You establish a color palette
- You define a typography system
- You establish spacing/layout rules

## Adding New Features

### New Page (Not a Collection)
1. Create `src/pages/[name].astro`
2. Update Navigation to link to it
3. Update `README.md` and `docs/architecture.md`
4. Document the page's purpose and links in a task journal entry

### New Section (Art, Words, Make Only)
1. This requires consensus with the project maintainer
2. Do not create new content collections without approval
3. File an issue first explaining why the new section is needed

### New Component
1. Check that a similar component doesn't exist
2. Place in `src/components/` (or `src/components/[section]/` if section-specific)
3. Document props with JSDoc or TypeScript
4. Use in at least one place before committing
5. Update `docs/standards/coding-standards.md` if it's a new pattern

### New Utility Function
1. Check that this function doesn't already exist
2. Only create if used in 2+ files
3. Place in `src/utils/`
4. Export with clear names
5. Document with JSDoc comments

## Build and Deployment

**Build command**: `npm run build`
**Preview command**: `npm run preview`

All commits must pass the build without errors or warnings (per [docs/standards/testing-standards.md](standards/testing-standards.md)).

## Data Flow

1. **Content**: Markdown/MDX files in `src/content/` collections
2. **Frontmatter**: Parsed by Astro as collection schema
3. **Pages**: `.astro` files in `src/pages/` use `getCollection()` to fetch content
4. **Components**: Receive content props from pages
5. **Rendering**: Astro renders to static HTML at build time

No runtime data fetching; all content is static.

## What NOT to Do

❌ Create new top-level folders in `src/` without documentation
❌ Create new content collections beyond art, words, make
❌ Add navigation items beyond Home, Art, Words, Make, About
❌ Use runtime JavaScript for content that should be static
❌ Create utility files for single-use functions
❌ Add build dependencies without documenting why
❌ Create pages without updating Navigation
❌ Ignore the visual philosophy and design for generic SEO

## Enforcing This Architecture

CI should validate:
- All pages are in `src/pages/` (except for utility files)
- Content is in `src/content/art|words|make/` only
- No arbitrary folders created in `src/`
- Components follow naming conventions
- Build succeeds without errors

See [docs/standards/testing-standards.md](standards/testing-standards.md) for CI validation details.

## Updating This Document

When you:
- Add a new component type
- Establish styling standards
- Add a new top-level section
- Change the page structure
- Create a new pattern

...you MUST update this document. Changes to architecture are not optional documentation.
