# Prairie Pilot FPV

Static site for the Prairie Pilot FPV project.

- Authoring guide: [docs/Authoring.md](docs/Authoring.md)
- Development and deployment: [docs/Development.md](docs/Development.md)

## AI Assistants

- GitHub Copilot / Codex instructions: [docs/copilot-instructions.md](docs/copilot-instructions.md)
- Claude instructions: [docs/claude.md](docs/claude.md)

## Front Matter Conventions

Use these optional keys in posts, projects, or features to integrate with the magazine-style homepage:

```
cover: /assets/covers/<file>.jpg
featured: true
categories: FPV
# or
# tags: [FPV]
```

Items marked `featured: true` appear in the homepage's featured section.
`categories` or `tags` are used to populate topic sections.

## Development

Install Ruby 3.3+, Bundler 2.7+, and Node.js 18+.

Run the site locally with:

```
bundle install
npm install
bundle exec jekyll serve
```

Push your changes to the `main` branch to trigger the GitHub Actions workflow, which builds the site and publishes it to GitHub Pages.

## Responsive images via Jampack

Jampack post-processes files in `_site/` to add `srcset`/`sizes`, generate AVIF/WebP versions, create low-quality placeholders, and enable lazy-loading.

### Local usage

Prerequisites: Ruby 3.3+/Jekyll installed and Node 18+.

Commands:

```
bundle install
npm install
npm run build:opt
```

Preview the optimized site by serving the `./_site/` folder locally (for example, using VS Code Live Server).

GitHub Pages' default builder doesn't run Jampack; the CI workflow handles optimization on deploy.

<!-- Intentionally left blank -->

## Deployment (GitHub Pages via Actions)

- Source: repository root on branch `master` or `main`.
- Workflow: `.github/workflows/pages.yml` builds with Jekyll and deploys to Pages.
- Optimize step: runs `@divriots/jampack` on the generated `_site` output.

How to use:
- GitHub → Settings → Pages → Build and deployment → Source: select “GitHub Actions”.
- Push to `master` (or `main`) and check Actions for a green run named “Build and Deploy GitHub Pages”.
- Custom domain is set via `CNAME` (currently `icantstoptalking.com`).

## Repository housekeeping

- Large file cleanup: `webpage.zip` has been removed from git history to keep the repo lean. It is ignored by `.gitignore` to avoid re‑adding it.
- If you still have local clones elsewhere, run `git fetch --all` then force‑reset to the updated branch (after the force‑push from this repo).
