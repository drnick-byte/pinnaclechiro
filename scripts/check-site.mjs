import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const htmlFiles = [
  join(root, 'index.html'),
  ...readdirSync(join(root, 'pages'))
    .filter(file => file.endsWith('.html'))
    .map(file => join(root, 'pages', file))
];
const cssFiles = readdirSync(join(root, 'css'))
  .filter(file => file.endsWith('.css'))
  .map(file => join(root, 'css', file));
const errors = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, 'utf8');
  const renderedHtml = html.replace(/<!--[\s\S]*?-->/g, '');
  const label = relative(root, file);

  if (!html.includes('noindex, nofollow, noarchive')) {
    errors.push(`${label}: missing preview robots meta tag`);
  }

  const ids = [...renderedHtml.matchAll(/\sid="([^"]+)"/g)].map(match => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) {
    errors.push(`${label}: duplicate ids: ${[...new Set(duplicates)].join(', ')}`);
  }

  for (const match of renderedHtml.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="[^"]*"/.test(match[0])) {
      errors.push(`${label}: image is missing alt text`);
    }
  }

  for (const match of renderedHtml.matchAll(/<[^>]+\s(?:href|src)="([^"]+)"[^>]*>/g)) {
    const target = match[1];
    if (/^(?:https?:|tel:|mailto:|#|data:)/.test(target)) continue;
    const cleanTarget = target.split(/[?#]/)[0];
    const absoluteTarget = cleanTarget.startsWith('/')
      ? join(root, cleanTarget)
      : resolve(dirname(file), cleanTarget);
    if (!existsSync(absoluteTarget) && !match[0].includes('onerror=')) {
      errors.push(`${label}: missing local target ${target}`);
    }
  }
}

const css = cssFiles.map(file => readFileSync(file, 'utf8')).join('\n');
const html = htmlFiles.map(file => readFileSync(file, 'utf8')).join('\n');
const definedVariables = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map(match => match[1]));
const usedVariables = new Set([...(css + html).matchAll(/var\((--[\w-]+)/g)].map(match => match[1]));
for (const variable of usedVariables) {
  if (!definedVariables.has(variable)) errors.push(`CSS: undefined variable ${variable}`);
}

const robots = readFileSync(join(root, 'robots.txt'), 'utf8');
if (!/User-agent:\s*\*/i.test(robots) || !/Disallow:\s*\//i.test(robots)) {
  errors.push('robots.txt: preview site must disallow crawling');
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

console.log(`Checked ${htmlFiles.length} pages, ${cssFiles.length} stylesheets, local links, images, IDs, CSS variables, and preview crawl protection.`);
