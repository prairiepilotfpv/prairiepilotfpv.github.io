# Jampack setup

## Overview

Post-processing site images after Jekyll builds is simpler than Ruby image plugins and works the same across Windows, macOS, and Linux.

## Prerequisites

- Ruby and Jekyll installed
- Node 18+ installed

## One-time setup

```bash
git checkout dev && git pull
git checkout -b feature/jampack
# clean plugin refs (jekyll_picture_tag)
bundle install
npm install
```

## Local build & optimize

```bash
npm run build:opt
```

Open `_site/` to verify responsive `<img>`/`<picture>` elements with `srcset`.

## Dev → Main flow

```bash
git add -A && git commit -m "feat: integrate Jampack for responsive images"
git push -u origin feature/jampack
# open PR: feature/jampack → dev
# after approval, merge dev → main
```

## Troubleshooting

- If images don’t change, ensure `_site/` was rebuilt and `npm run optimize` ran.
- Confirm no lingering `jekyll_picture_tag` remains in `_config.yml` or `Gemfile`.
