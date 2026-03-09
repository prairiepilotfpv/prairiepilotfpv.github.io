# Coding Standards for The High Prairie

This document defines code style, organization, and patterns for the project. All code changes must align with these standards.

## File Organization

### Naming Conventions

**Astro components**: PascalCase
```
Navigation.astro
ArticleCard.astro
SectionHeader.astro
```

**Utility functions**: camelCase
```
formatDate.ts
slugify.ts
getImageDimensions.ts
```

**Pages**: lowercase with hyphens if multi-word
```
pages/index.astro
pages/art/index.astro
pages/[slug].astro
```

**Content files**: lowercase with hyphens
```
content/art/sunset-at-prairie.md
content/words/on-making-things.md
content/make/3d-printed-pipe.md
```

**Styles**: Scoped in components (preferred) or in `styles/` folder with descriptive names
```
styles/global.css
styles/typography.css  # Only if used across many components
```

### File Placement Rules

**Components**: `src/components/`
- Core components (Navigation, Layout, Footer) in root
- Section-specific components in subdirectories
```
src/components/
├── Navigation.astro
├── Layout.astro
├── Footer.astro
├── art/
│   ├── ArticleCard.astro
│   └── ImageGallery.astro
├── words/
│   └── EssayCard.astro
└── make/
    └── ProcessStep.astro
```

**Pages**: `src/pages/`
- Follow folder structure that matches URLs
- Use `[slug].astro` for dynamic routes
- Use `index.astro` for collection indices

**Layouts**: `src/layouts/`
- Base layouts for content types
- Example: `BlogPost.astro`, `ProjectPage.astro`

**Utilities**: `src/utils/`
- Only if used in multiple files
- One function per file OR related functions in a module
- Export with clear names

**Styles**: `src/styles/`
- Global CSS in `global.css`
- Component-scoped styles in `.astro` files (preferred)
- Only shared/complex styles in separate files

## Astro Component Standards

### Basic Structure

```astro
---
// 1. Imports
import Layout from '../layouts/Base.astro';
import Card from '../components/Card.astro';
import { getCollection } from 'astro:content';

// 2. Type definitions
interface Props {
  title: string;
  items: any[];
}

// 3. Component logic
const { title, items } = Astro.props;
const allItems = await getCollection('art');

// 4. Derived data
const sorted = allItems.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<!-- HTML -->
<Layout>
  <h1>{title}</h1>
  {items.map(item => <Card {...item} />)}
</Layout>

<style>
  /* Component styles (scoped) */
  h1 {
    font-size: 2rem;
  }
</style>
```

### Props and Type Safety

Always document props:

```astro
---
interface Props {
  title: string;      // Page title
  date: Date;        // Publication date
  featured?: boolean; // Optional: feature on homepage
}

const { title, date, featured = false } = Astro.props;
---
```

For TypeScript files, use exported types:

```typescript
// utils/types.ts
export interface BlogPost {
  title: string;
  date: Date;
  slug: string;
}

// components/PostCard.astro
---
import type { BlogPost } from '../utils/types';

interface Props {
  post: BlogPost;
}
---
```

### Fragment Imports (Astro 3.0+)

Use the `?raw` import for content:

```astro
---
import { Image } from 'astro:assets';
---

<Image src={...} alt="..." />
```

## Styling Standards

### Scoped Styles (Preferred)

Keep styles in component `<style>` blocks:

```astro
---
import type { Props } from './types';

interface Props {
  variant: 'primary' | 'secondary';
}

const { variant } = Astro.props;
---

<button class={variant}>Click me</button>

<style>
  button {
    padding: 1rem;
    border: none;
    cursor: pointer;
  }

  button.primary {
    background-color: var(--color-primary);
  }

  button.secondary {
    background-color: var(--color-secondary);
  }
</style>
```

**Avoid**:
- Global classes that style multiple components
- Inline styles (`style="color: red"`)
- Utility-first CSS frameworks (Tailwind)

### Global Styles

Use `src/styles/global.css` for:
- CSS reset
- Base typography (font, line-height, color)
- Spacing/margin defaults
- CSS custom properties (colors, fonts)

```css
/* src/styles/global.css */

:root {
  --color-primary: #333;
  --color-accent: #0066cc;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-serif: Georgia, serif;
  --spacing-unit: 1rem;
}

* {
  margin: 0;
  padding: 0;
}

body {
  font-family: var(--font-sans);
  font-size: 1rem;
  line-height: 1.6;
  color: var(--color-primary);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  line-height: 1.2;
  margin: var(--spacing-unit) 0 calc(var(--spacing-unit) / 2) 0;
}
```

### Images

Always use Astro's `<Image>` component:

```astro
---
import { Image } from 'astro:assets';
import heroImage from '../assets/hero.jpg';
---

<Image src={heroImage} alt="Hero image" />

<!-- For remote images, use the width/height props -->
<Image
  src="https://example.com/image.jpg"
  alt="Remote image"
  width={1200}
  height={800}
/>
```

**Why**:
- Automatic optimization
- Responsive images
- Lazy loading
- Format conversion (WebP, AVIF)

## JavaScript/TypeScript Standards

### Variables and Constants

```typescript
// Use const by default
const MAX_ITEMS = 10;
const itemList: string[] = [];

// Use let for loop variables
for (let i = 0; i < items.length; i++) {
  // ...
}
```

### Function Style

Prefer function declarations or arrow functions, consistently:

```typescript
// Function declaration
function formatDate(date: Date): string {
  return date.toLocaleDateString();
}

// Arrow function
const slugify = (text: string): string => {
  return text.toLowerCase().replace(/\s+/g, '-');
};
```

Always add return types:

```typescript
// ❌ Bad - no return type
function calculate(a, b) {
  return a + b;
}

// ✅ Good - return type specified
function calculate(a: number, b: number): number {
  return a + b;
}
```

### Async/Await

```typescript
// ✅ Prefer async/await
async function getContent() {
  const collection = await getCollection('art');
  return collection;
}

// ❌ Avoid .then() chains
function getContent() {
  return getCollection('art').then(collection => {
    return collection;
  });
}
```

## Code Comments

### When to Comment

Add comments:
- **Complex logic**: Explain *why*, not what
- **Non-obvious patterns**: "Why does this work this way?"
- **Important constraints**: "This must run before X"

### When NOT to Comment

Don't comment:
- **Obvious code**: `const x = 1; // Set x to 1` is noise
- **What the code does**: Code structure should be clear
- **Disabled code**: Delete it, don't leave commented out code

### Comment Style

```typescript
// Use single-line comments for brief explanations
const result = complexFunction(); // Returns filtered items

/*
 * Use multi-line comments for complex explanations
 * explaining the reasoning or approach
 */
const items = data.filter(item => {
  // Complex filter logic that needs explanation
  return item.date > threshold && item.published;
});
```

## Imports and Organization

### Organize imports by group:

1. Astro/framework imports
2. Internal component imports
3. Utility/type imports
4. Relative imports

```astro
---
// Astro
import { getCollection } from 'astro:content';
import { Image } from 'astro:assets';

// Components
import Layout from '../layouts/Base.astro';
import Card from '../components/Card.astro';

// Utils
import { formatDate } from '../utils/formatDate';
import type { BlogPost } from '../utils/types';

// Assets
import styles from './page.module.css';
---
```

### Avoid unnecessary imports

```typescript
// ❌ Importing unused items
import { getCollection, reference } from 'astro:content'; // only use getCollection

// ✅ Only import what you need
import { getCollection } from 'astro:content';
```

## Common Patterns

### Iterating Content

```astro
---
import { getCollection } from 'astro:content';

const allPosts = await getCollection('words');
const sorted = allPosts.sort((a, b) =>
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

{sorted.map(post => (
  <article>
    <h2>{post.data.title}</h2>
    <p>{post.data.description}</p>
  </article>
))}
```

### Dynamic Routes

```astro
---
// pages/art/[slug].astro
import { getCollection } from 'astro:content';
import ArticleLayout from '../../layouts/ArticleLayout.astro';

export async function getStaticPaths() {
  const articles = await getCollection('art');
  return articles.map(article => ({
    params: { slug: article.slug },
    props: { article },
  }));
}

interface Props {
  article: any;
}

const { article } = Astro.props;
---

<ArticleLayout>
  <h1>{article.data.title}</h1>
  {article.body && <article.Content />}
</ArticleLayout>
```

## What to Avoid

❌ **Global state**: Use Astro props for data passing
❌ **Over-abstraction**: Keep components simple
❌ **Prop drilling**: If props are nested too deep, reconsider structure
❌ **Magic strings**: Use constants or enums
❌ **Side effects in components**: Keep render pure
❌ **Nested ternaries**: Use if-statements or switch for clarity
❌ **Shadowing variables**: Don't reuse variable names

## Refactoring Rules

Only refactor if:
1. The code is duplicated (appears 3+ times)
2. The change doesn't affect behavior
3. Tests pass after refactoring
4. The refactor makes the code easier to understand

Do not refactor:
- Code you're not actively working on
- Code just to "improve" it
- Code to match a different style

## Prettier / Formatting

If the project uses Prettier:
```bash
npm run format
```

If not, manually maintain consistent indentation (2 spaces) and line length (~80 characters).

## Checklist Before Committing Code

- [ ] Code follows naming conventions (camelCase, PascalCase, etc.)
- [ ] All files are organized in correct folders
- [ ] Imports are organized and minimal
- [ ] Props are documented with types
- [ ] Component styles are scoped (no global side effects)
- [ ] No commented-out code left behind
- [ ] No magic strings (use constants)
- [ ] TypeScript: all variables have types
- [ ] Build succeeds: `npm run build`
- [ ] No console.log() left in production code

---

See [docs/standards/documentation-standards.md](documentation-standards.md) for how to document code changes.
