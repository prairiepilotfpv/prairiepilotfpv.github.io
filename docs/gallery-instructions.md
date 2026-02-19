# Reusable Image Gallery – Usage Guide

This guide explains how to use the reusable image-card gallery include that powers the Projects page. The gallery renders rounded, image-backed cards with text overlaid, matching the home page’s style.

Location summary
- Include: `_includes/image_gallery.html`
- Styles: `assets/css/custom-styles.css` (classes: `projects-grid`, `project-card*`)
- Usage example: `projects.html`

Core concept
- You pass a list of items plus which keys to use for title, URL, and image.
- The include outputs a responsive grid of rounded “cards” with a background image and overlay text.

Quick start (Projects collection)
1) Add or edit files in `_projects/` with front matter:
   - `title:` required
   - `subtitle:` optional
   - `cover:` optional background image (path like `/assets/img/...jpg`)
   - `permalink:` optional (defaults from `_config.yml` collection settings)
2) The Projects page calls the include with the right keys:
   ```liquid
   {% include image_gallery.html
      items=site.projects
      title_key='title'
      url_key='url'
      image_key='cover'
      subtitle_key='subtitle'
      class='projects-grid'
   %}
   ```

Add/remove cards
- Add: create a new Markdown file in `_projects/` with the front matter above.
- Remove: delete or rename the file (or set `published: false`).

Image tips
- Use landscape images for best results; cards use `aspect-ratio: 16/9`.
- Store images under `assets/img/...` and reference with an absolute site path (e.g. `/assets/img/march/example.jpg`).
- If `cover` is missing, the card shows a fallback gradient background.

Using the gallery with any list
- You can pass any array of items (from a collection, page variable, or data file) and map keys:
  ```liquid
  {% assign items = site.data.links %}
  {% include image_gallery.html
     items=items
     title_key='name'
     url_key='href'
     image_key='image'
     class='projects-grid'
  %}
  ```
- Required keys per item:
  - Title (controlled by `title_key`)
  - URL (controlled by `url_key`)
  - Image (optional, controlled by `image_key`)

Include parameters (all optional except `items`)
- `items:` array to render
- `title_key:` key for the item title (default: `title`)
- `url_key:` key for the link URL (default: `url`)
- `image_key:` key for the background image (default: `image`)
- `subtitle_key:` key for a subtitle line (no default)
- `class:` container class (default: `projects-grid`)

Styling hooks (CSS)
- Container grid: `.projects-grid`
- Card: `.project-card`
- Overlay text wrapper: `.project-card__text`
- Title text: `.project-card__title`
- Subtitle text: `.project-card__subtitle`
- No-image variant: `.project-card--noimg`

Accessibility notes
- Cards use background images, so there’s no `<img alt>`; make link text descriptive via the title.
- Keep titles concise; the entire card is a link.

Troubleshooting
- Card shows no image: verify `cover` (or `image_key`) points to a valid path and exists under `assets/img/`.
- Odd cropping: images are center-cropped; prefer 16:9 or wider landscape.
- No cards appear: ensure `items` is a non-empty array and the include is invoked in a rendered context.

