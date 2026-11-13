import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.resolve(rootDir, 'dist');
const slidesDir = path.resolve(rootDir, 'slides');
const brandDir = path.resolve(rootDir, 'assets', 'brand');

const SITE_URL = 'https://slide-cp-junior.vercel.app';
const APP_NAME = 'CODEPOLITAN Junior';
const HOME_TITLE = 'CODEPOLITAN Junior — Slide Materi Code Explorer';
const HOME_DESCRIPTION =
  'Slide presentasi interaktif belajar komputer dan dasar coding untuk anak usia 5–7 tahun bersama Maskot Biko.';
const OG_IMAGE_URL = `${SITE_URL}/og-cover.png`;

if (!fs.existsSync(distDir)) {
  console.error('[postbuild] dist directory does not exist!');
  process.exit(1);
}

const indexHtmlPath = path.resolve(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('[postbuild] dist/index.html does not exist!');
  process.exit(1);
}

function escapeAttr(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

function extractSlideTitle(slideDirName) {
  const slideFile = path.resolve(slidesDir, slideDirName, 'index.tsx');
  if (!fs.existsSync(slideFile)) return slideDirName;
  const source = fs.readFileSync(slideFile, 'utf8');
  const match = source.match(/export\s+const\s+meta\s*:\s*SlideMeta\s*=\s*\{[\s\S]*?title:\s*(['"`])([\s\S]*?)\1/);
  if (match && match[2]) return match[2].trim();
  return slideDirName;
}

function applyBrandingToHtml(rawHtml, { title, description, pageUrl }) {
  const safeTitle = escapeAttr(title);
  const safeDesc = escapeAttr(description);
  const safeUrl = escapeAttr(pageUrl);
  const safeOgImage = escapeAttr(OG_IMAGE_URL);

  const brandMetaBlock = [
    `<title>${safeTitle}</title>`,
    `    <meta name="description" content="${safeDesc}" />`,
    `    <meta name="theme-color" content="#10B981" />`,
    `    <meta property="og:type" content="website" />`,
    `    <meta property="og:locale" content="id_ID" />`,
    `    <meta property="og:site_name" content="${escapeAttr(APP_NAME)}" />`,
    `    <meta property="og:url" content="${safeUrl}" />`,
    `    <meta property="og:title" content="${safeTitle}" />`,
    `    <meta property="og:description" content="${safeDesc}" />`,
    `    <meta property="og:image" content="${safeOgImage}" />`,
    `    <meta property="og:image:type" content="image/png" />`,
    `    <meta property="og:image:width" content="1200" />`,
    `    <meta property="og:image:height" content="630" />`,
    `    <meta property="og:image:alt" content="CODEPOLITAN Junior Slides bersama Maskot Biko" />`,
    `    <meta name="twitter:card" content="summary_large_image" />`,
    `    <meta name="twitter:title" content="${safeTitle}" />`,
    `    <meta name="twitter:description" content="${safeDesc}" />`,
    `    <meta name="twitter:image" content="${safeOgImage}" />`,
  ].join('\n');

  let html = rawHtml;
  html = html.replace('<html lang="en">', '<html lang="id">');
  html = html.replace(/\s*<link rel="icon"[^>]*\/>/g, '');
  html = html.replace(
    '<meta charset="UTF-8" />',
    '<meta charset="UTF-8" />\n    <link rel="icon" href="/brand-icon.svg" type="image/svg+xml" />',
  );
  // Strip any existing OG/Twitter/description tags if re-run, then set title + OG tags
  html = html.replace(/<meta\s+(?:name|property)="(?:description|theme-color|og:[^"]+|twitter:[^"]+)"[^>]*>\s*/g, '');
  html = html.replace(/<title>[\s\S]*?<\/title>/, brandMetaBlock);
  return html;
}

// 1. Copy CODEPOLITAN Junior brand assets (icon + OG image) to dist/
const iconSrc = path.resolve(brandDir, 'cpj-icon.svg');
const ogSrc = path.resolve(brandDir, 'og-cover.png');
if (fs.existsSync(iconSrc)) {
  fs.copyFileSync(iconSrc, path.resolve(distDir, 'brand-icon.svg'));
}
if (fs.existsSync(ogSrc)) {
  fs.copyFileSync(ogSrc, path.resolve(distDir, 'og-cover.png'));
}

// 2. Patch runtime open-slide branding strings & sidebar icon in built JS bundle
const distAssetsDir = path.resolve(distDir, 'assets');
if (fs.existsSync(distAssetsDir)) {
  for (const file of fs.readdirSync(distAssetsDir)) {
    if (!/^index-.*\.js$/.test(file)) continue;
    const bundlePath = path.resolve(distAssetsDir, file);
    let js = fs.readFileSync(bundlePath, 'utf8');

    // Replace sidebar/app title across all locale tables
    js = js.replaceAll('appTitle:`open-slide`', `appTitle:\`${APP_NAME}\``);

    // Replace runtime document.title default fallback (`DEFAULT_DOCUMENT_TITLE`)
    js = js.replace(
      /var ([A-Za-z0-9_$]+)=`open-slide`;function ([A-Za-z0-9_$]+)\(([A-Za-z0-9_$]+)\)\{return \3\?\.trim\(\)\|\|`open-slide`\}/g,
      `var $1=\`${HOME_TITLE}\`;function $2($3){return $3?.trim()||\`${HOME_TITLE}\`}`,
    );

    // Replace inlined open-slide orange icon SVG data URI with custom CODEPOLITAN Junior icon
    js = js.replace(
      /`data:image\/svg\+xml,[^`]*slide-sheen[^`]*`/g,
      '"/brand-icon.svg"',
    );

    fs.writeFileSync(bundlePath, js, 'utf8');
    console.log(`[postbuild] Applied CODEPOLITAN Junior branding to ${file}`);
  }
}

// 3. Apply SEO & OpenGraph metadata to index.html, 404.html, and every slide static route
const baseIndexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
const brandedHomeHtml = applyBrandingToHtml(baseIndexHtml, {
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  pageUrl: `${SITE_URL}/`,
});

fs.writeFileSync(indexHtmlPath, brandedHomeHtml, 'utf8');
fs.writeFileSync(path.resolve(distDir, '404.html'), brandedHomeHtml, 'utf8');

if (fs.existsSync(slidesDir)) {
  const slideDirs = fs
    .readdirSync(slidesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.resolve(slidesDir, d.name, 'index.tsx')))
    .map((d) => d.name);

  for (const slide of slideDirs) {
    const slideTitle = extractSlideTitle(slide);
    const fullTitle = `${slideTitle} | ${APP_NAME}`;
    const slideDescription = `Slide materi interaktif ${slideTitle} — ${APP_NAME} (Level 1: Code Explorer, usia 5–7 tahun).`;

    const slideDistDir = path.resolve(distDir, 's', slide);
    fs.mkdirSync(slideDistDir, { recursive: true });
    fs.writeFileSync(
      path.resolve(slideDistDir, 'index.html'),
      applyBrandingToHtml(baseIndexHtml, {
        title: fullTitle,
        description: slideDescription,
        pageUrl: `${SITE_URL}/s/${slide}`,
      }),
      'utf8',
    );

    const presenterDistDir = path.resolve(slideDistDir, 'presenter');
    fs.mkdirSync(presenterDistDir, { recursive: true });
    fs.writeFileSync(
      path.resolve(presenterDistDir, 'index.html'),
      applyBrandingToHtml(baseIndexHtml, {
        title: `Presenter: ${fullTitle}`,
        description: slideDescription,
        pageUrl: `${SITE_URL}/s/${slide}/presenter`,
      }),
      'utf8',
    );

    console.log(`[postbuild] Created static routes & OG metadata for: /s/${slide}`);
  }
}
