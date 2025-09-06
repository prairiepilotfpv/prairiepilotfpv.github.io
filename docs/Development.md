# Development

Install Ruby 3.3+, Bundler 2.7+, and Node.js 18+.

Run the site locally with:

```bash
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

```bash
bundle install
npm install
npm run build:opt
```

Preview the optimized site by serving the `./_site/` folder locally (for example, using VS Code Live Server).

GitHub Pages' default builder doesn't run Jampack; the CI workflow handles optimization on deploy.