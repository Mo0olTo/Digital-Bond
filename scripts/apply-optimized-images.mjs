import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.join(__dirname, '..', 'public', 'images', '_optimized-tmp');
const manifestPath = path.join(outDir, 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('No manifest found. Run npm run images:optimize first.');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

for (const item of manifest) {
  fs.copyFileSync(item.src, item.dest);
  console.log(`replaced ${item.label}: ${item.before} -> ${item.after}`);
}

fs.rmSync(outDir, { recursive: true, force: true });
console.log('done');
