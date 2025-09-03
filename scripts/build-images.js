#!/usr/bin/env node

const fsp = require('fs/promises');
const path = require('path');
const glob = require('glob');
const sharp = require('sharp');

async function build() {
  const srcDir = path.join(__dirname, '..', 'assets', 'img');
  const files = glob.sync('**/*.{jpg,jpeg,png}', { cwd: srcDir, absolute: true });

  await Promise.all(files.map(async (srcPath) => {
    const filename = path.basename(srcPath);
    if (filename.toLowerCase().includes('thumb')) {
      return;
    }

    const dir = path.dirname(srcPath);
    const ext = path.extname(srcPath);
    const base = path.basename(srcPath, ext);
    const destPath = path.join(dir, `${base}-thumb${ext}`);

    try {
      await fsp.access(destPath);
      console.log(`Skipping existing ${path.relative(process.cwd(), destPath)}`);
      return;
    } catch {
      // file does not exist
    }

    await sharp(srcPath)
      .resize(400)
      .toFile(destPath);
    console.log(`Created ${path.relative(process.cwd(), destPath)}`);
  }));
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
