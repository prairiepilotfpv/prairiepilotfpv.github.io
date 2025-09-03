# Prairie Pilot FPV

## Front Matter Conventions

Use these optional keys in posts, projects, or features to integrate with the magazine-style homepage:

```
cover: /assets/covers/<file>.jpg
featured: true
category: FPV
# or
# tags: [FPV]
```

Items marked `featured: true` appear in the homepage's featured section.
`category` or `tags` are used to populate topic sections.

## Development

Run the site locally with:

```
npm install
bundle exec jekyll serve
```

The `after_init` hook automatically invokes `npm run build:images` during startup.
Push your changes to the `main` branch to trigger the GitHub Actions workflow, which builds the site and publishes it to GitHub Pages.
