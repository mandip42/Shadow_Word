import sharp from 'sharp';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const publicDir = join(root, 'public');
const svgPath = join(__dirname, 'icon-source.svg');

const svg = readFileSync(svgPath);

await sharp(svg)
  .resize(512, 512)
  .png()
  .toFile(join(publicDir, 'icon-512.png'));
console.log('Created public/icon-512.png');

await sharp(svg)
  .resize(192, 192)
  .png()
  .toFile(join(publicDir, 'icon-192.png'));
console.log('Created public/icon-192.png');
