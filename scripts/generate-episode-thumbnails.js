const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const WORLD = path.join(__dirname, '..', 'public', 'images', 'world');
const EXPR  = path.join(__dirname, '..', 'public', 'images', 'expressions');
const DEST  = path.join(__dirname, '..', 'public', 'images', 'episodes');

const W = 1280;
const H = 720;

const episodes = [
  { num: '01', title: 'Kuttappan & The Mango Heist',    bg: 'paddy-fields-wide.webp',  expr: 'kuttappan-excited.webp'  },
  { num: '02', title: 'Kuttappan & The School Day',     bg: 'school.webp',             expr: 'kuttappan-scared.webp'   },
  { num: '03', title: 'Kuttappan & The Big Race',       bg: 'village-road-wide.webp',  expr: 'kuttappan-excited.webp'  },
  { num: '04', title: 'Kuttappan & The Festival Plan',  bg: 'home-exterior.webp',      expr: 'kuttappan-proud.webp'    },
  { num: '05', title: 'Kuttappan & The Lost Treasure',  bg: 'backwaters.webp',         expr: 'kuttappan-thinking.webp' },
  { num: '06', title: 'Kuttappan & The Coconut Climb',  bg: 'paddy-fields-wide.webp',  expr: 'kuttappan-shocked.webp'  },
];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function makeThumbnailSVG(episodeNum, title) {
  // Split title for two-line display if needed
  const words = title.split(' ');
  let line1 = escapeXml(words.slice(0, 4).join(' '));
  let line2 = escapeXml(words.slice(4).join(' '));

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
    <!-- Dark gradient overlay on right side for text readability -->
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.0"/>
        <stop offset="45%" stop-color="#000000" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.82"/>
      </linearGradient>
      <linearGradient id="gradBottom" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.55"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#grad)"/>
    <rect width="${W}" height="${H}" fill="url(#gradBottom)"/>

    <!-- Episode badge (top left) -->
    <circle cx="70" cy="70" r="50" fill="#1B7A3D"/>
    <text x="70" y="62" font-family="Fredoka One, Arial, sans-serif" font-size="14" fill="#FFF8E7" text-anchor="middle" font-weight="400">EP</text>
    <text x="70" y="88" font-family="Fredoka One, Arial, sans-serif" font-size="28" fill="#FFF8E7" text-anchor="middle" font-weight="400">${episodeNum}</text>

    <!-- Mango Yellow accent bar (bottom) -->
    <rect x="0" y="${H - 8}" width="${W}" height="8" fill="#F5A623"/>

    <!-- Episode title (right side) -->
    <text x="${W - 60}" y="${H - 160}" font-family="Fredoka One, Arial, sans-serif" font-size="52" fill="#FFF8E7" text-anchor="end" filter="url(#shadow)">${line1}</text>
    ${line2 ? `<text x="${W - 60}" y="${H - 95}" font-family="Fredoka One, Arial, sans-serif" font-size="52" fill="#FFF8E7" text-anchor="end">${line2}</text>` : ''}

    <!-- "KUTTAPPAN" brand -->
    <text x="${W - 60}" y="${H - 30}" font-family="Fredoka One, Arial, sans-serif" font-size="22" fill="#F5A623" text-anchor="end" opacity="0.9">KUTTAPPAN</text>
  </svg>`;
}

async function compositeEpisode(ep) {
  const bgPath   = path.join(WORLD, ep.bg);
  const exprPath = path.join(EXPR, ep.expr);
  const outPath  = path.join(DEST, `ep${ep.num}.webp`);

  // 1. Resize background to thumbnail size
  const bgResized = await sharp(bgPath)
    .resize(W, H, { fit: 'cover', position: 'centre' })
    .toBuffer();

  // 2. Resize character expression to fit left side (roughly 45% width, full height)
  const exprH = H;
  const exprResized = await sharp(exprPath)
    .resize({ height: exprH, withoutEnlargement: true })
    .toBuffer();

  // Get expression width after resize
  const exprMeta = await sharp(exprResized).metadata();
  const exprW = exprMeta.width;

  // Position expression on left side, vertically centered, slight offset down
  const exprLeft = 80;
  const exprTop = Math.max(0, Math.floor((H - exprH) / 2));

  // 3. Create the SVG overlay
  const svgOverlay = Buffer.from(makeThumbnailSVG(ep.num, ep.title));

  // 4. Composite: bg → expr → svg overlay
  await sharp(bgResized)
    .composite([
      { input: exprResized, left: exprLeft, top: exprTop, blend: 'over' },
      { input: svgOverlay,  left: 0,        top: 0,       blend: 'over' },
    ])
    .webp({ quality: 88 })
    .toFile(outPath);

  console.log(`✓ ep${ep.num}.webp — ${ep.title}`);
}

async function main() {
  console.log('\n=== Generating Episode Thumbnails ===');

  for (const ep of episodes) {
    await compositeEpisode(ep);
  }

  console.log('\nAll episode thumbnails generated!\n');
}

main().catch(console.error);
