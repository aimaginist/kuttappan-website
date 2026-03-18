const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const BRAND = path.join(__dirname, '..', 'public', 'images', 'brand');
const DECO = path.join(__dirname, '..', 'public', 'images', 'brand', 'decorations');
const PUBLIC = path.join(__dirname, '..', 'public');

// ─── LOGO WORDMARK (Kerala Green) ─────────────────────────────────────────────
const logoWordmarkSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 520 80" width="520" height="80">
  <text x="10" y="66" font-family="Fredoka One, Arial, sans-serif" font-size="72" font-weight="400" fill="#1B7A3D" letter-spacing="-1">KUTTAPPAN</text>
</svg>`;

const logoWordmarkLightSVG = logoWordmarkSVG.replace(/#1B7A3D/g, '#FFF8E7');

// ─── LOGO ICON MARK ────────────────────────────────────────────────────────────
const logoIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="#1B7A3D"/>
  <text x="50" y="72" font-family="Fredoka One, Arial, sans-serif" font-size="68" font-weight="400" fill="#FFF8E7" text-anchor="middle">K</text>
</svg>`;

const logoIconLightSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <rect x="0" y="0" width="100" height="100" rx="20" ry="20" fill="#FFF8E7" stroke="#1B7A3D" stroke-width="4"/>
  <text x="50" y="72" font-family="Fredoka One, Arial, sans-serif" font-size="68" font-weight="400" fill="#1B7A3D" text-anchor="middle">K</text>
</svg>`;

// ─── OG IMAGE SVG (1200×630) ─────────────────────────────────────────────────
const ogImageSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <!-- Background -->
  <rect width="1200" height="630" fill="#1B7A3D"/>
  <!-- Subtle palm leaf silhouettes -->
  <ellipse cx="120" cy="80" rx="90" ry="18" fill="#156130" opacity="0.5" transform="rotate(-35 120 80)"/>
  <ellipse cx="120" cy="80" rx="90" ry="18" fill="#156130" opacity="0.5" transform="rotate(-20 120 80)"/>
  <ellipse cx="120" cy="80" rx="90" ry="18" fill="#156130" opacity="0.5" transform="rotate(-5 120 80)"/>
  <ellipse cx="1080" cy="550" rx="90" ry="18" fill="#156130" opacity="0.5" transform="rotate(145 1080 550)"/>
  <ellipse cx="1080" cy="550" rx="90" ry="18" fill="#156130" opacity="0.5" transform="rotate(160 1080 550)"/>
  <ellipse cx="1080" cy="550" rx="90" ry="18" fill="#156130" opacity="0.5" transform="rotate(175 1080 550)"/>
  <!-- Logo text -->
  <text x="600" y="290" font-family="Fredoka One, Arial, sans-serif" font-size="120" font-weight="400" fill="#FFF8E7" text-anchor="middle" letter-spacing="2">KUTTAPPAN</text>
  <!-- Tagline -->
  <text x="600" y="380" font-family="Nunito, Arial, sans-serif" font-size="36" font-weight="700" fill="#F5A623" text-anchor="middle">Big Plans. Bigger Fails. Biggest Heart.</text>
  <!-- Studio -->
  <text x="600" y="560" font-family="Nunito, Arial, sans-serif" font-size="22" fill="#FFF8E7" text-anchor="middle" opacity="0.7">AImaginist Studio  ·  kuttappan.in</text>
  <!-- Accent bar -->
  <rect x="540" y="410" width="120" height="4" rx="2" fill="#F5A623"/>
</svg>`;

// ─── DECORATIVE SVGs ──────────────────────────────────────────────────────────
const coconutPalmSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 160" width="80" height="160">
  <!-- Trunk -->
  <path d="M40 160 Q38 120 42 80 Q40 40 38 20" stroke="#1B7A3D" stroke-width="5" fill="none" stroke-linecap="round"/>
  <!-- Leaves -->
  <ellipse cx="38" cy="20" rx="32" ry="10" fill="#1B7A3D" transform="rotate(-40 38 20)"/>
  <ellipse cx="38" cy="20" rx="32" ry="10" fill="#1B7A3D" transform="rotate(-20 38 20)"/>
  <ellipse cx="38" cy="20" rx="32" ry="10" fill="#1B7A3D" transform="rotate(0 38 20)"/>
  <ellipse cx="38" cy="20" rx="32" ry="10" fill="#1B7A3D" transform="rotate(20 38 20)"/>
  <ellipse cx="38" cy="20" rx="32" ry="10" fill="#1B7A3D" transform="rotate(40 38 20)"/>
  <!-- Coconuts -->
  <circle cx="36" cy="28" r="5" fill="#6D4C41"/>
  <circle cx="44" cy="30" r="5" fill="#6D4C41"/>
</svg>`;

const mangoSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 70" width="50" height="70">
  <!-- Mango body -->
  <path d="M25 8 C10 8 4 22 5 38 C6 54 15 65 25 65 C35 65 44 54 45 38 C46 22 40 8 25 8 Z" fill="#1B7A3D"/>
  <!-- Mango stem -->
  <line x1="25" y1="8" x2="28" y2="0" stroke="#6D4C41" stroke-width="2.5" stroke-linecap="round"/>
  <!-- Leaf -->
  <ellipse cx="34" cy="4" rx="10" ry="4" fill="#1B7A3D" transform="rotate(-30 34 4)"/>
</svg>`;

const bananaLeafSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 200" width="120" height="200">
  <path d="M60 200 C20 150 5 90 15 30 C30 10 50 5 60 5 C70 5 90 10 105 30 C115 90 100 150 60 200 Z" fill="#1B7A3D" opacity="0.8"/>
  <!-- Midrib -->
  <path d="M60 200 C55 140 52 80 60 5" stroke="#156130" stroke-width="3" fill="none"/>
  <!-- Veins -->
  <line x1="60" y1="60"  x2="25" y2="50"  stroke="#156130" stroke-width="1.5" opacity="0.6"/>
  <line x1="60" y1="90"  x2="20" y2="82"  stroke="#156130" stroke-width="1.5" opacity="0.6"/>
  <line x1="60" y1="120" x2="22" y2="115" stroke="#156130" stroke-width="1.5" opacity="0.6"/>
  <line x1="60" y1="60"  x2="95" y2="50"  stroke="#156130" stroke-width="1.5" opacity="0.6"/>
  <line x1="60" y1="90"  x2="100" y2="82" stroke="#156130" stroke-width="1.5" opacity="0.6"/>
  <line x1="60" y1="120" x2="98" y2="115" stroke="#156130" stroke-width="1.5" opacity="0.6"/>
</svg>`;

const waveDividerSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 80" width="1440" height="80" preserveAspectRatio="none">
  <path d="M0 40 C240 80 480 0 720 40 C960 80 1200 0 1440 40 L1440 80 L0 80 Z" fill="#1B7A3D"/>
</svg>`;

async function writeSVG(content, filePath) {
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✓ ${path.basename(filePath)}`);
}

async function generateFavicons() {
  // Convert icon SVG to various PNG sizes
  const svgBuffer = Buffer.from(logoIconSVG);

  const sizes = [
    { size: 32,  name: 'favicon-32.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'icon-192.png' },
    { size: 512, name: 'icon-512.png' },
  ];

  for (const { size, name } of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(PUBLIC, name));
    console.log(`✓ ${name}`);
  }

  // Copy 32px as favicon.ico (simplified — PNG renamed)
  fs.copyFileSync(path.join(PUBLIC, 'favicon-32.png'), path.join(PUBLIC, 'favicon.ico'));
  console.log('✓ favicon.ico');
}

async function generateOGImage() {
  const svgBuffer = Buffer.from(ogImageSVG);
  await sharp(svgBuffer)
    .resize(1200, 630)
    .png({ quality: 90 })
    .toFile(path.join(BRAND, 'og-image.png'));
  console.log('✓ og-image.png');
}

async function main() {
  console.log('\n=== Generating Brand Assets ===');

  await writeSVG(logoWordmarkSVG,      path.join(BRAND, 'logo-wordmark.svg'));
  await writeSVG(logoWordmarkLightSVG, path.join(BRAND, 'logo-wordmark-light.svg'));
  await writeSVG(logoIconSVG,          path.join(BRAND, 'logo-icon.svg'));
  await writeSVG(logoIconLightSVG,     path.join(BRAND, 'logo-icon-light.svg'));

  console.log('\n=== Generating Decorative SVGs ===');
  await writeSVG(coconutPalmSVG,  path.join(DECO, 'coconut-palm.svg'));
  await writeSVG(mangoSVG,        path.join(DECO, 'mango.svg'));
  await writeSVG(bananaLeafSVG,   path.join(DECO, 'banana-leaf.svg'));
  await writeSVG(waveDividerSVG,  path.join(DECO, 'wave-divider.svg'));

  console.log('\n=== Generating Favicons ===');
  await generateFavicons();

  console.log('\n=== Generating OG Image ===');
  await generateOGImage();

  console.log('\nAll brand assets generated!\n');
}

main().catch(console.error);
