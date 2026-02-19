# AI Project Instructions (GitHub Copilot / Codex)

These instructions guide AI assistants working in this repository. Prefer minimal, focused changes; follow the site’s established structure and tooling.

## Stack & Build

- Jekyll site using the remote theme `daattali/beautiful-jekyll@6.0.1`.
- Hosted on GitHub Pages; local dev via Ruby/Bundler + Jekyll.
- Asset optimization via Jampack on the built `_site/` output.
- Key files: `_config.yml`, `Gemfile`, `package.json`, `_posts/`, `_projects/`, `_includes/`, `_layouts/`, `assets/`.

### Local commands (Windows-friendly)

```bash
bundle install
npm install
bundle exec jekyll serve
```

Build and optimize (generates `_site/` then runs Jampack):

```bash
npm run build:opt
```

## Hard Rules (Do/Don’t)

- Don’t edit files under `_site/` (build output). Make source changes elsewhere and rebuild.
- Don’t remove or replace the `remote_theme` unless explicitly requested.
- Don’t reformat or mass-edit theme/layout files without purpose; keep diffs tight.
- Don’t add license headers to existing files.
- Do keep Windows-specific gems in `Gemfile` (`tzinfo-data`, `wdm`).
- Do preserve permalink structure set in `_config.yml` (`/:year-:month-:day-:title/`).
- Do add new images under `assets/img/` and reference them with absolute site paths (e.g. `/assets/img/...`).

## Authoring Conventions

- Posts live in `_posts/` and must be named `YYYY-MM-DD-title.md`.
- Projects live in `_projects/` (collection configured in `_config.yml`).

### Front matter

- Posts (Beautiful Jekyll): prefer `cover-img:` for header image.
- Projects (gallery include): use `cover:` for the card background.
- Optional shared keys from docs/Authoring: `featured: true`, `categories:` or `tags:`.

Examples:

Post (`_posts/2026-02-19-example.md`)

```yaml
---
layout: post
title: Example Post
cover-img: /assets/img/posts/example-hero.jpg
categories: FPV
tags: [build-log]
---

Post content here…
```

Project (`_projects/my-project.md`)

```yaml
---
title: My Project
subtitle: Optional subtitle
cover: /assets/img/projects/my-project-cover.jpg
permalink: /projects/my-project/
---

Short project intro…
```

## Reusable Gallery Include

- The projects page uses `_includes/image_gallery.html` to render image-backed cards.
- Configure by passing `items` and key names (e.g., `title_key`, `url_key`, `image_key`, `subtitle_key`).
- See usage and CSS hooks in [docs/gallery-instructions.md](gallery-instructions.md).

## Analytics & Comments

- Analytics and comment systems are toggled via `_config.yml`; most are off. Only enable when requested and provide all required IDs.

## Common AI Tasks

- Add a blog post:
  1) Create `_posts/YYYY-MM-DD-title.md` with front matter (see above).
  2) Add images under `assets/img/posts/` and reference with absolute paths.
  3) Run `bundle exec jekyll serve` locally or `npm run build`.

- Add a project card:
  1) Create `_projects/<slug>.md` with `title`, optional `subtitle`, and `cover`.
  2) Ensure `projects.html` uses the gallery include (already present).

- Tweak styles safely:
  - Prefer adding to `assets/css/custom-styles.css`.
  - Avoid modifying third-party theme assets; override via custom CSS.

- Optimize site for deploy:
  - Run `npm run build:opt` to generate and optimize `_site/` with Jampack.

## Liquid, Layouts, and Includes

- Layout defaults: set in `_config.yml` (`layout: post` for posts, `layout: page` for others).
- Use Liquid sparingly and keep compatibility with Jekyll 4 and GitHub Pages.
- Avoid breaking includes or renaming keys consumed by `image_gallery.html`.

## Pull Request Hygiene

- Small, focused changes with clear commit messages.
- No unrelated refactors or dependency flips.
- Preserve whitespace/format where possible.

## Quick Reference

- Dev guide: [docs/Development.md](Development.md)
- Authoring tips: [docs/Authoring.md](Authoring.md)
- Gallery include: [docs/gallery-instructions.md](gallery-instructions.md)

If unsure: prefer adding new files over rewriting core structure, and never touch `_site/` manually.
