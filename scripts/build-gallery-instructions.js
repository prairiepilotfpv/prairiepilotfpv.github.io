/*
  Generate a PDF with instructions for using the reusable image gallery.
  Output: docs/gallery-instructions.pdf
*/

const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

function addHeading(doc, text, level = 1) {
  const sizes = { 1: 22, 2: 16, 3: 13 };
  const margins = { 1: 12, 2: 10, 3: 8 };
  doc.moveDown(0.5);
  doc.font('Helvetica-Bold').fontSize(sizes[level]).fillColor('#111');
  doc.text(text, { continued: false });
  doc.moveDown(margins[level] / 24);
}

function addParagraph(doc, text) {
  doc.font('Helvetica').fontSize(11).fillColor('#222');
  doc.text(text, { align: 'left' });
  doc.moveDown(0.6);
}

function addBulletList(doc, items) {
  const bulletIndent = 14;
  const textIndent = 8;
  const x = doc.x;
  items.forEach((line) => {
    doc.font('Helvetica').fontSize(11).fillColor('#222');
    doc.text('•', x, doc.y, { continued: true });
    doc.text(' '.repeat(textIndent) + line, { align: 'left' });
  });
  doc.moveDown(0.4);
}

function addCodeBlock(doc, lines) {
  const startY = doc.y;
  const left = doc.x;
  const right = doc.page.width - doc.page.margins.right;
  const width = right - left;

  // background
  const padding = 6;
  const lineHeight = 14;
  const height = padding * 2 + lineHeight * lines.length;
  doc.save();
  doc.rect(left, startY, width, height).fill('#f6f8fa');
  doc.restore();

  // code
  doc.moveDown(0.2);
  doc.font('Courier').fontSize(10).fillColor('#111');
  lines.forEach((l) => doc.text(l, { indent: 6 }));
  doc.moveDown(0.6);
}

function build() {
  const outDir = path.join(process.cwd(), 'docs');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'gallery-instructions.pdf');

  const doc = new PDFDocument({ size: 'LETTER', margins: { top: 54, bottom: 54, left: 54, right: 54 } });
  const stream = fs.createWriteStream(outPath);
  doc.pipe(stream);

  // Metadata
  doc.info.Title = 'Reusable Image Gallery – Usage Guide';
  doc.info.Author = 'Site Documentation';

  // Title
  doc.font('Helvetica-Bold').fontSize(26).fillColor('#111');
  doc.text('Reusable Image Gallery – Usage Guide');
  doc.moveDown(0.5);
  doc.font('Helvetica').fontSize(11).fillColor('#444');
  doc.text('This guide explains how to use the reusable image-card gallery include that powers the Projects page.');

  addHeading(doc, 'Locations', 2);
  addBulletList(doc, [
    'Include: `_includes/image_gallery.html`',
    'Styles: `assets/css/custom-styles.css` (projects-grid, project-card*)',
    'Usage example: `projects.html`',
  ]);

  addHeading(doc, 'Core Concept', 2);
  addParagraph(doc, 'Pass a list of items and specify which keys to use for title, URL, and image. The include outputs a responsive grid of rounded cards with a background image and overlay text.');

  addHeading(doc, 'Quick Start (Projects Collection)', 2);
  addBulletList(doc, [
    'Add/edit files in `_projects/` with: `title` (required), `subtitle` (optional), `cover` (optional), `permalink` (optional).',
  ]);
  addParagraph(doc, 'Include call used by the Projects page:');
  addCodeBlock(doc, [
    "{% include image_gallery.html",
    "   items=site.projects",
    "   title_key='title'",
    "   url_key='url'",
    "   image_key='cover'",
    "   subtitle_key='subtitle'",
    "   class='projects-grid'",
    "%}",
  ]);

  addHeading(doc, 'Add/Remove Cards', 2);
  addBulletList(doc, [
    'Add: create a new Markdown file in `_projects/` with the front matter above.',
    'Remove: delete/rename the file or set `published: false`.',
  ]);

  addHeading(doc, 'Image Tips', 2);
  addBulletList(doc, [
    'Cards use `aspect-ratio: 16/9`; prefer landscape images.',
    'Store images under `assets/img/...` and reference with `/assets/img/...jpg`.',
    'If no `cover` is provided, a fallback gradient is shown.',
  ]);

  addHeading(doc, 'Use With Any List', 2);
  addParagraph(doc, 'You can pass any array (collection, data file, page var) and map keys:');
  addCodeBlock(doc, [
    "{% assign items = site.data.links %}",
    "{% include image_gallery.html",
    "   items=items",
    "   title_key='name'",
    "   url_key='href'",
    "   image_key='image'",
    "   class='projects-grid'",
    "%}",
  ]);
  addBulletList(doc, [
    'Required per item: title (title_key), URL (url_key).',
    'Image is optional (image_key).',
  ]);

  addHeading(doc, 'Include Parameters', 2);
  addBulletList(doc, [
    '`items`: array to render',
    '`title_key`: defaults to `title`',
    '`url_key`: defaults to `url`',
    '`image_key`: defaults to `image`',
    '`subtitle_key`: none by default',
    '`class`: container class, defaults to `projects-grid`',
  ]);

  addHeading(doc, 'Styling Hooks', 2);
  addBulletList(doc, [
    'Grid: `.projects-grid`',
    'Card: `.project-card` (+ `--noimg`)',
    'Text wrappers: `.project-card__text`, `.project-card__title`, `.project-card__subtitle`',
  ]);

  addHeading(doc, 'Accessibility Notes', 2);
  addBulletList(doc, [
    'Cards use background images; ensure link text (title) is descriptive.',
    'Keep titles concise; entire card is the link.',
  ]);

  addHeading(doc, 'Troubleshooting', 2);
  addBulletList(doc, [
    'No image: verify `cover` path and file exists.',
    'Cropping: images are center-cropped; use 16:9 or wider.',
    'No cards: ensure `items` is non-empty and include is invoked.',
  ]);

  doc.end();

  stream.on('finish', () => {
    console.log(`Wrote: ${outPath}`);
  });
}

build();

