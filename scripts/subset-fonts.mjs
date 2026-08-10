import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(__dirname, '..', 'public', 'fonts', 'sans-serif');

const files = [
  'GoogleSans-Regular.woff2',
  'GoogleSans-Medium.woff2',
  'GoogleSans-SemiBold.woff2',
  'GoogleSans-Bold.woff2',
];

// Latin + digits + punctuation used across the marketing site
const text = [
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  '0123456789',
  " .,;:!?\'\"()-–—…/@#%&*+=<>[]{}|_\\",
  'Digital Bond More than a website Get in Touch Explore',
  'The Bonders Are Home About Us Services Contact',
  'áàâäãåāéèêëēíìîïīóòôöõōúùûüūýÿñçÁÀÂÄÃÅĀÉÈÊËĒÍÌÎÏĪÓÒÔÖÕŌÚÙÛÜŪÝŸÑÇ',
].join('');

for (const file of files) {
  const inputPath = path.join(dir, file);
  const before = fs.statSync(inputPath).size;
  const input = fs.readFileSync(inputPath);
  const output = await subsetFont(input, text, { targetFormat: 'woff2' });
  fs.writeFileSync(inputPath, output);
  const after = fs.statSync(inputPath).size;
  console.log(
    `${file}: ${Math.round(before / 1024)}KB -> ${Math.round(after / 1024)}KB`,
  );
}
