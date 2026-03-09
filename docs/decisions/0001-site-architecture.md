# ADR 0001: Site Architecture for The High Prairie

**Date**: 2026-03-08
**Status**: Accepted
**Decision**: Astro framework with Art/Words/Make/About sections and dedicated content collections

---

## Problem

We need a website architecture that:
1. Emphasizes visual storytelling and editorial content over generic SEO-driven design
2. Cleanly separates different content types (visual art, essays, craft projects)
3. Is fast, maintainable, and owned by humans and AI agents
4. Prevents architecture drift when worked on by multiple contributors
5. Generates static files for reliable hosting and performance

## Decision

Use **Astro** with **five main sections**:

- **Home**: Entry and overview
- **Art**: Visual work, photography, and photo-centric artistic posts
- **Words**: Essays, blog posts, reflections, text-first pieces
- **Make**: Handmade or 3D-printed smoking accessories, crafts, build logs, process pages
- **About**: Project information and contact

Each section (except Home and About) is backed by a **content collection** (art, words, make) with its own schema, layout, and visual styling.

## Rationale

### Why Astro?

1. **Static-first**: Generates static HTML at build time
   - Fast, reliable, easy to host anywhere
   - No runtime dependencies or complexity
   - Perfect for content-driven sites

2. **Content Collections**: First-class support for organizing content by type
   - Each collection (art, words, make) can have its own schema
   - Type-safe frontmatter with Zod validation
   - Built-in `getCollection()` API

3. **Component-based**: Mix `.astro` files, Markdown, and HTML naturally
   - Editorial content (Markdown) with component layouts
   - Visual design (components) without bloat
   - Selective interactivity (JavaScript only where needed)

4. **File-based routing**: `src/pages/` becomes the site structure
   - URL structure mirrors file structure
   - Easy to understand and maintain
   - No complex routing configuration

5. **Image optimization**: Native `<Image>` component
   - Automatic optimization for photos and visual work
   - Responsive images out of the box
   - Important for Art and Make sections

6. **Editorial-friendly**: Markdown + frontmatter for content
   - Humans and AI agents can both edit content easily
   - Version control works well with text files
   - No database or CMS complexity

### Why This Section Structure?

The five sections reflect different content types and audiences:

#### Art
- **What**: Visual work, photography, artistic images
- **Why separate**: Needs photo-first presentation, large images, minimal text
- **Layout**: Gallery or image-focused views
- **Audience**: People interested in visual creativity

#### Words
- **What**: Essays, blog posts, reflections, long-form text
- **Why separate**: Needs typography focus, readable layouts, chronological ordering
- **Layout**: Article pages with readable typography
- **Audience**: Readers interested in ideas and writing

#### Make
- **What**: Crafts, 3D prints, smoking accessories, build logs, process documentation
- **Why separate**: Needs process-focused layout, step-by-step docs, material/technique callouts
- **Layout**: Project pages with process documentation
- **Audience**: Makers, craftspeople, people interested in process

#### Home
- **What**: Entry point, overview, navigation
- **Why not a collection**: Single page, not dynamic
- **Layout**: Custom landing page design
- **Audience**: All visitors

#### About
- **What**: Project information, contact, biography
- **Why not a collection**: Single page, relatively static
- **Layout**: Standalone page
- **Audience**: People wanting context or to contact you

**This structure rejects**:
- Generic "blog" sections (Words is editorial, not SEO)
- Catch-all categories ("Miscellaneous", "Projects", "Other")
- Arbitrary section proliferation (stick to Art/Words/Make)

### Why Collections Over Pages?

Using Astro's content collections for Art, Words, and Make provides:

1. **Schema validation**: Each collection has explicit frontmatter schema
2. **Type safety**: TypeScript types generated from schema
3. **Querying**: `getCollection()` API to fetch and sort content
4. **Scalability**: Adding 100 posts doesn't require structural changes
5. **Consistency**: All posts in a collection follow the same structure

If a content type is static/one-off, use a page instead (like About).

## Constraints

1. **Static generation**: No server, no database, no dynamic content at runtime
   - This is a feature, not a limitation
   - Enables fast, reliable hosting
   - Simplifies deployment

2. **Five sections maximum**: Do not create new top-level sections without consensus
   - Clarity requires constraints
   - New sections should be very clearly justified
   - If content doesn't fit Art/Words/Make, consider why

3. **Markdown/MDX for content**: Content lives in `src/content/`, not in database
   - Humans and AI agents can edit directly
   - Content is version-controlled
   - Keeps the stack simple

4. **Component-scoped styling**: Avoid utility-first CSS frameworks
   - Maintain visual coherence
   - Make design decisions explicit
   - Avoid generic "SEO blog" aesthetic

## Alternatives Considered

### Next.js with Pages Router
- More complex for static sites
- Stronger towards dynamic features we don't need
- More overhead for simple content

### Hugo or Jekyll
- Simpler for static content, but less flexible for components
- Harder to use modern tooling (Astro components are JavaScript-based)
- Smaller ecosystem

### 11ty (Eleventy)
- Good static site generator
- But less opinionated on content structure
- Less support for componentization (11ty is more template-focused)

### Database-backed CMS
- Unnecessary complexity for static content
- Makes deployment harder
- Harder for humans and AI agents to edit without a UI

### Monolithic blog on a single page
- Loses the editorial distinction between content types
- Makes navigation and discovery harder
- Doesn't reflect the author's interests (visual art, writing, crafting are different)

## Implications

### For Development
- **No database setup**: Content is Markdown files
- **No build time overhead**: Astro is fast
- **No runtime surprises**: Everything is pre-rendered
- **AI-friendly**: Agents can read docs and code easily

### For Hosting
- **Static hosting**: GitHub Pages, Netlify, Vercel, AWS S3, anywhere
- **No server cost**: No database, no backend servers
- **Fast everywhere**: No runtime overhead

### For Content Editing
- **File-based**: Edit in any text editor, or in the repo UI
- **Version control**: Content history in Git
- **No learning curve**: Markdown is simple

### For Visual Design
- **Component-based**: Reusable design pieces
- **Scoped styles**: Can't accidentally break other pages
- **Editorial focus**: Design serves content, not the reverse

## Success Criteria

This architecture is working if:

- ✅ Visual art looks beautiful and loads fast
- ✅ Essays are readable with good typography
- ✅ Make/craft content clearly shows process
- ✅ All sections feel cohesive but distinct
- ✅ Build time is < 10 seconds
- ✅ Site loads fast on mobile and desktop
- ✅ Adding new content requires no code changes
- ✅ Multiple agents can work without conflicting
- ✅ Navigation is clear and intuitive

## Future Decisions Depend On

This ADR establishes constraints for:
- How to add new sections (need approval, explain why)
- How to organize components (in `src/components/`)
- How to style the site (component-scoped, editorial-focused)
- How to handle images (use Astro `<Image>`)
- How to organize content (collections for Art/Words/Make)

See [docs/architecture.md](../architecture.md) for detailed structure.

---

**Related**:
- [Architecture Guide](../architecture.md)
- [Content Model](../architecture.md#content-collections)
- [Astro Docs](https://docs.astro.build)
