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

Run `npm install` to install the dependencies required for image processing before serving the site locally:

```
npm install
bundle exec jekyll serve
```

If you add new images, generate thumbnails with:

```
npm run build:images
```
