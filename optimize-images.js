import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const PUBLIC_DIR = './public/images';
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;

  try {
    const image = sharp(filePath);
    const metadata = await image.metadata();

    // Пропускаем если изображение уже оптимизировано
    if (metadata.width <= MAX_WIDTH) {
      console.log(`⏭️  Пропуск ${filePath} (уже оптимизировано)`);
      return;
    }

    console.log(`🔄 Оптимизация ${filePath}...`);

    await image
      .resize(MAX_WIDTH, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: QUALITY, progressive: true })
      .toFile(filePath + '.tmp');

    // Заменяем оригинал
    await sharp(filePath + '.tmp').toFile(filePath);

    console.log(`✅ Оптимизировано: ${filePath}`);
  } catch (error) {
    console.error(`❌ Ошибка при оптимизации ${filePath}:`, error.message);
  }
}

async function processDirectory(dirPath) {
  const files = await readdir(dirPath);

  for (const file of files) {
    const filePath = join(dirPath, file);
    const stats = await stat(filePath);

    if (stats.isDirectory()) {
      await processDirectory(filePath);
    } else {
      await optimizeImage(filePath);
    }
  }
}

console.log('🚀 Начинаю оптимизацию изображений...\n');
processDirectory(PUBLIC_DIR)
  .then(() => console.log('\n✨ Оптимизация завершена!'))
  .catch(err => console.error('❌ Ошибка:', err));
