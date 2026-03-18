const sharp = require('sharp');
const path = require('path');

const SRC = 'C:\\Users\\10tre\\Downloads\\Kuttappan Brand\\';
const DEST = path.join(__dirname, '..', 'public', 'images', 'world');

async function resize({ src, dest, width, quality = 85 }) {
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest);
  console.log(`✓ ${path.basename(dest)}`);
}

async function resizeAndBlur({ src, dest, width, blurSigma, quality = 85 }) {
  await sharp(src)
    .resize({ width, withoutEnlargement: true })
    .blur(blurSigma)
    .webp({ quality })
    .toFile(dest);
  console.log(`✓ ${path.basename(dest)}`);
}

async function thumb({ src, dest, quality = 75 }) {
  await sharp(src)
    .resize({ width: 400, withoutEnlargement: true })
    .webp({ quality })
    .toFile(dest);
  console.log(`✓ ${path.basename(dest)} [thumb]`);
}

async function main() {
  console.log('\n=== Processing Environment Images ===');

  const homeExteriorSrc = SRC + '3d_animated_environment_pixar_style_establishing_s_delpmaspu (2).png';
  await resize({ src: homeExteriorSrc, dest: path.join(DEST, 'home-exterior.webp'), width: 1920 });
  await resizeAndBlur({ src: homeExteriorSrc, dest: path.join(DEST, 'home-exterior-blur.webp'), width: 1920, blurSigma: 20 });
  await thumb({ src: homeExteriorSrc, dest: path.join(DEST, 'home-exterior-thumb.webp') });

  const homeInteriorSrc = SRC + '3d_animated_environment_interior_pixar_style_insid_delpmaspu.png';
  await resize({ src: homeInteriorSrc, dest: path.join(DEST, 'home-interior.webp'), width: 1200 });
  await thumb({ src: homeInteriorSrc, dest: path.join(DEST, 'home-interior-thumb.webp') });

  const schoolSrc = SRC + '3d_animated_environment_pixar_style_a_1990s_kerala_delpmaspu.png';
  await resize({ src: schoolSrc, dest: path.join(DEST, 'school.webp'), width: 1200 });
  await thumb({ src: schoolSrc, dest: path.join(DEST, 'school-thumb.webp') });

  const shopSrc = SRC + 'the-shop.png';
  await resize({ src: shopSrc, dest: path.join(DEST, 'village-shop.webp'), width: 1200 });
  await thumb({ src: shopSrc, dest: path.join(DEST, 'village-shop-thumb.webp') });

  const paddySrc = SRC + '3d_animated_environment_pixar_style_panoramic_land_delpmaspu (1).png';
  await resize({ src: paddySrc, dest: path.join(DEST, 'paddy-fields.webp'), width: 1200 });
  await resize({ src: paddySrc, dest: path.join(DEST, 'paddy-fields-wide.webp'), width: 1920 });
  await thumb({ src: paddySrc, dest: path.join(DEST, 'paddy-fields-thumb.webp') });

  const backwatersSrc = SRC + 'Extract_high_resolution_frame_of_row_3_column_3_2k_delpmaspu (1).png';
  await resize({ src: backwatersSrc, dest: path.join(DEST, 'backwaters.webp'), width: 1200 });
  await thumb({ src: backwatersSrc, dest: path.join(DEST, 'backwaters-thumb.webp') });

  const villageSrc = SRC + '3d_animated_environment_pixar_style_wide_shot_a_be_delpmaspu (2).png';
  await resize({ src: villageSrc, dest: path.join(DEST, 'village-road.webp'), width: 1200 });
  await resize({ src: villageSrc, dest: path.join(DEST, 'village-road-wide.webp'), width: 1920 });
  await thumb({ src: villageSrc, dest: path.join(DEST, 'village-road-thumb.webp') });

  console.log('\nAll environment images processed!\n');
}

main().catch(console.error);
