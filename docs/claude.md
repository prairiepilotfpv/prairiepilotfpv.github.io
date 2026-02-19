# AI Project Instructions (Claude)

This document sets expectations and context for AI assistants (Claude) working in this repository. Follow the site’s conventions and keep diffs minimal and purposeful.

## Project Overview

- Static site built with Jekyll and the remote theme `daattali/beautiful-jekyll@6.0.1`.
- GitHub Pages hosts the site; local dev uses Ruby/Bundler.
- Jampack optimizes built files under `_site/` (AVIF/WebP, srcset, lazy-loading).

## Local Development

```bash
bundle install
npm install
bundle exec jekyll serve
```

Build and optimize for preview of production-like output:

```bash
npm run build:opt
```

## Ground Rules

- Never edit `_site/` directly — it’s build output.
- Keep `remote_theme` and plugin list intact unless explicitly asked to change.
- Retain Windows-friendly gems in `Gemfile` (`tzinfo-data`, `wdm`).
- Use absolute paths for assets under `assets/img/`.
- Prefer `assets/css/custom-styles.css` for style changes and theme overrides.

## Content Structure & Front Matter

- Blog posts: `_posts/YYYY-MM-DD-title.md` (Jekyll standard naming).
- Projects collection: `_projects/` (output at `/projects/:name/`).

Front matter keys:

- Posts (theme header image): `cover-img:`
- Projects (gallery background): `cover:` and optional `subtitle:`
- Optional categorization: `featured: true`, `categories:` or `tags:`

Examples

```yaml
---
layout: post
title: Camera Mount Notes
cover-img: /assets/img/posts/camera-hero.jpg
tags: [fpv, build]
---
```

```yaml
---
title: Frostgrave Warband
subtitle: First campaign log
cover: /assets/img/projects/frostgrave/cover.jpg
permalink: /projects/frostgrave-warband/
---
```

## Reusable Gallery Include

- `_includes/image_gallery.html` renders the card grid used on `projects.html`.
- Pass `items` and key names: `title_key`, `url_key`, `image_key`, optional `subtitle_key`.
- Styling hooks live in `assets/css/custom-styles.css` (`projects-grid`, `project-card*`).
- Reference: [docs/gallery-instructions.md](gallery-instructions.md)

## Safe Changes & Gotchas

- Avoid mass refactors of `_layouts/` and `_includes/`.
- Preserve permalink structure from `_config.yml`.
- Don’t add license headers or unrelated formatting rewrites.
- When adding assets, prefer landscape 16:9 images for gallery cards (center-cropped).

## Common Tasks

- Add a new post: create `_posts/YYYY-MM-DD-title.md`, add `cover-img` if needed, categorize, run local server.
- Add a project: create `_projects/<slug>.md` with `title`, optional `subtitle`, and `cover`; it will appear in the projects gallery.
- Optimize before deploy preview: `npm run build:opt`.

## References

- Development: [docs/Development.md](Development.md)
- Authoring: [docs/Authoring.md](Authoring.md)
- Gallery: [docs/gallery-instructions.md](gallery-instructions.md)

When uncertain, do not modify `_site/`; propose targeted changes to source files and confirm expected outputs via local build.
