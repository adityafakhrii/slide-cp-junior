import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const slidesDir = path.resolve(rootDir, 'slides');

if (!fs.existsSync(distDir)) {
  console.error('[postbuild] dist directory does not exist!');
  process.exit(1);
}

const indexHtmlPath = path.resolve(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('[postbuild] dist/index.html does not exist!');
  process.exit(1);
}

const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
fs.writeFileSync(path.resolve(distDir, '404.html'), indexHtml, 'utf8');

if (fs.existsSync(slidesDir)) {
  const slideDirs = fs
    .readdirSync(slidesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.resolve(slidesDir, d.name, 'index.tsx')))
    .map((d) => d.name);

  for (const slide of slideDirs) {
    const slideDistDir = path.resolve(distDir, 's', slide);
    fs.mkdirSync(slideDistDir, { recursive: true });
    fs.writeFileSync(path.resolve(slideDistDir, 'index.html'), indexHtml, 'utf8');

    const presenterDistDir = path.resolve(slideDistDir, 'presenter');
    fs.mkdirSync(presenterDistDir, { recursive: true });
    fs.writeFileSync(path.resolve(presenterDistDir, 'index.html'), indexHtml, 'utf8');

    console.log(`[postbuild] Created static routes for: /s/${slide}`);
  }
}

