import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'public');

/**
 * Resize hero/logo assets to ~2× CSS display size.
 * Soft glow/blur assets are omitted — re-encoding often increases their size.
 */
const jobs = [
  { file: 'images/Screens/screen-circle.webp', width: 800 },
  { file: 'images/icons/orange1.webp', width: 600 },
  { file: 'images/icons/lamp1.webp', width: 600 },
  { file: 'images/icons/pc1.webp', width: 600 },
  { file: 'images/logos/logo_black.webp', width: 300 },
  { file: 'images/icons/bond-1-red.webp', width: 320 },
  { file: 'images/icons/bond-2-white.webp', width: 320 },
];

const outDir = path.join(root, 'images', '_optimized-tmp');
fs.mkdirSync(outDir, { recursive: true });

const manifest = [];

for (const job of jobs) {
  const inputPath = path.join(root, job.file);
  const before = fs.statSync(inputPath).size;
  const meta = await sharp(inputPath).metadata();

  if (meta.width != null && meta.width <= job.width) {
    console.log(
      `${path.basename(job.file)}: skip (already ${meta.width}px, ${Math.round(before / 1024)}KB)`,
    );
    continue;
  }

  const safeName = job.file.replace(/[\\/ ]/g, '_');
  const outPath = path.join(outDir, safeName);

  await sharp(inputPath)
    .resize({
      width: job.width,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality: 82, effort: 6 })
    .toFile(outPath);

  const after = fs.statSync(outPath).size;
  if (after >= before) {
    fs.rmSync(outPath, { force: true });
    console.log(
      `${path.basename(job.file)}: skip (re-encode ${Math.round(after / 1024)}KB >= ${Math.round(before / 1024)}KB)`,
    );
    continue;
  }

  const afterMeta = await sharp(outPath).metadata();
  manifest.push({
    dest: inputPath,
    src: outPath,
    label: path.basename(job.file),
    before: `${meta.width}x${meta.height} ${Math.round(before / 1024)}KB`,
    after: `${afterMeta.width}x${afterMeta.height} ${Math.round(after / 1024)}KB`,
  });

  console.log(
    `${path.basename(job.file)}: prepared ${manifest.at(-1).before} -> ${manifest.at(-1).after}`,
  );
}

fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log(
  `\nWrote ${manifest.length} file(s) to ${outDir}.\nReplace originals with:\n  npm run images:optimize:apply`,
);
