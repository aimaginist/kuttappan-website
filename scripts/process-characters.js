const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const SRC = 'C:\\Users\\10tre\\Downloads\\Kuttappan Brand\\';
const DEST_CHARS = path.join(__dirname, '..', 'public', 'images', 'characters');
const DEST_EXPR = path.join(__dirname, '..', 'public', 'images', 'expressions');

async function getDimensions(filePath) {
  const meta = await sharp(filePath).metadata();
  return { width: meta.width, height: meta.height };
}

async function cropPanel({ src, dest, row, col, totalRows, totalCols, resizeHeight, resizeWidth, resizeSquare, quality = 90 }) {
  const { width, height } = await getDimensions(src);
  const panelW = Math.floor(width / totalCols);
  const panelH = Math.floor(height / totalRows);
  const left = (col - 1) * panelW;
  const top = (row - 1) * panelH;

  let pipeline = sharp(src).extract({ left, top, width: panelW, height: panelH });

  if (resizeHeight) {
    pipeline = pipeline.resize({ height: resizeHeight, withoutEnlargement: true });
  } else if (resizeWidth) {
    pipeline = pipeline.resize({ width: resizeWidth, withoutEnlargement: true });
  } else if (resizeSquare) {
    pipeline = pipeline.resize(resizeSquare, resizeSquare, { fit: 'cover' });
  }

  await pipeline.webp({ quality }).toFile(dest);
  console.log(`✓ ${path.basename(dest)}`);
}

async function main() {
  console.log('\n=== Processing Character Turnarounds ===');

  // kuttappan.png — 2 rows × 5 cols
  const kuttappanSrc = SRC + 'kuttappan.png';
  await cropPanel({ src: kuttappanSrc, dest: path.join(DEST_CHARS, 'kuttappan-hero.webp'),       row: 1, col: 2, totalRows: 2, totalCols: 5, resizeHeight: 600, quality: 90 });
  await cropPanel({ src: kuttappanSrc, dest: path.join(DEST_CHARS, 'kuttappan-face.webp'),       row: 2, col: 1, totalRows: 2, totalCols: 5, resizeSquare: 400, quality: 85 });
  await cropPanel({ src: kuttappanSrc, dest: path.join(DEST_CHARS, 'kuttappan-full-front.webp'), row: 1, col: 1, totalRows: 2, totalCols: 5, resizeHeight: 800, quality: 90 });

  // shambhu.png — 2 rows × 5 cols
  const shambhuSrc = SRC + 'shambhu.png';
  await cropPanel({ src: shambhuSrc, dest: path.join(DEST_CHARS, 'shambhu-hero.webp'), row: 1, col: 2, totalRows: 2, totalCols: 5, resizeHeight: 600, quality: 90 });
  await cropPanel({ src: shambhuSrc, dest: path.join(DEST_CHARS, 'shambhu-face.webp'), row: 2, col: 1, totalRows: 2, totalCols: 5, resizeSquare: 400, quality: 85 });

  // pakru.png — 2 rows × 5 cols
  const pakruSrc = SRC + 'pakru.png';
  await cropPanel({ src: pakruSrc, dest: path.join(DEST_CHARS, 'pakru-hero.webp'), row: 1, col: 2, totalRows: 2, totalCols: 5, resizeHeight: 600, quality: 90 });
  await cropPanel({ src: pakruSrc, dest: path.join(DEST_CHARS, 'pakru-face.webp'), row: 2, col: 1, totalRows: 2, totalCols: 5, resizeSquare: 400, quality: 85 });

  console.log('\n=== Processing Expression Sheets (1×4 strips) ===');

  const expressions = [
    { src: SRC + 'Prompt_kuttappan__excited__scheming_the_brilliant__delpmaspu.png', dest: 'kuttappan-excited.webp', resizeHeight: 700 },
    { src: SRC + '3d_animated_character_expression_sheet_pixar_style_delpmaspu (2).png', dest: 'kuttappan-proud.webp',   resizeHeight: 500 },
    { src: SRC + '3d_animated_character_expression_sheet_pixar_style_delpmaspu (1).png', dest: 'kuttappan-scared.webp',  resizeHeight: 500 },
    { src: SRC + '3d_animated_character_expression_sheet_pixar_style_delpmaspu (4).png', dest: 'kuttappan-shocked.webp', resizeHeight: 500 },
    { src: SRC + '3d_animated_character_expression_sheet_pixar_style_delpmaspu (6).png', dest: 'kuttappan-sad.webp',     resizeHeight: 500 },
    { src: SRC + '3d_animated_character_expression_sheet_pixar_style_delpmaspu (8).png', dest: 'kuttappan-laughing.webp',resizeHeight: 500 },
    { src: SRC + '3d_animated_character_expression_sheet_pixar_style_delpmaspu (9).png', dest: 'kuttappan-thinking.webp',resizeHeight: 500 },
  ];

  for (const expr of expressions) {
    await cropPanel({
      src: expr.src,
      dest: path.join(DEST_EXPR, expr.dest),
      row: 1, col: 1, totalRows: 1, totalCols: 4,
      resizeHeight: expr.resizeHeight,
      quality: 90,
    });
  }

  console.log('\nAll character & expression images processed!\n');
}

main().catch(console.error);
