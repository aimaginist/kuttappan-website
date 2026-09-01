import { access, readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const htmlFiles = [];

async function walk(directory) {
  const entries = await readdir(directory, {withFileTypes: true});
  await Promise.all(entries.map(async (entry) => {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) await walk(file);
    else if (entry.name.endsWith('.html')) htmlFiles.push(file);
  }));
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

await walk(root);
const missing = [];

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = match[1].split(/[?#]/)[0];
    if (!value.startsWith('/') || value === '/' || value.startsWith('//')) continue;

    const target = path.join(root, decodeURIComponent(value));
    const candidates = [target, path.join(target, 'index.html'), `${target}.html`];
    if (!(await Promise.all(candidates.map(exists))).some(Boolean)) {
      missing.push({page: path.relative(root, file), value});
    }
  }
}

if (missing.length) {
  console.error('[build-audit] Missing local references:');
  missing.forEach(({page, value}) => console.error(`- ${page}: ${value}`));
  process.exitCode = 1;
} else {
  console.log(`[build-audit] Verified local references across ${htmlFiles.length} HTML files.`);
}
