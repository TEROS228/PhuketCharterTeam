import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';

async function optimizeImage(inputPath, outputPath, width = null) {
  try {
    let pipeline = sharp(inputPath);

    if (width) {
      pipeline = pipeline.resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    await pipeline
      .webp({ quality: 85 })
      .toFile(outputPath);

    const inputStats = await fs.stat(inputPath);
    const outputStats = await fs.stat(outputPath);
    const saved = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);

    console.log(`✓ ${path.basename(outputPath)}: ${(inputStats.size/1024).toFixed(0)}KB → ${(outputStats.size/1024).toFixed(0)}KB (saved ${saved}%)`);
  } catch (error) {
    console.error(`✗ Error processing ${inputPath}:`, error.message);
  }
}

async function main() {
  console.log('🖼️  Optimizing images to WebP...\n');

  // Hero image - критическое для LCP
  await optimizeImage(
    'public/images/hero/catamaran-hero-bg.jpg',
    'public/images/hero/catamaran-hero-bg.webp',
    1920 // Максимальная ширина для desktop
  );

  // Fleet images
  await optimizeImage(
    'public/images/catamaran1.jpg',
    'public/images/catamaran1.webp',
    1200
  );

  await optimizeImage(
    'public/images/catamaran2.jpg',
    'public/images/catamaran2.webp',
    1200
  );

  // Logo (PNG to WebP)
  await optimizeImage(
    'public/images/logo.png',
    'public/images/logo.webp',
    200 // Маленький размер для logo
  );

  console.log('\n✅ Done! All images optimized to WebP');
}

main().catch(console.error);
