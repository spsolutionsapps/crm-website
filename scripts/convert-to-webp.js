const fs = require('fs');
const path = require('path');

// Intentar usar sharp (viene con Next.js)
let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.error('❌ Sharp no está disponible. Instalando...');
  console.log('Por favor ejecuta: npm install sharp');
  process.exit(1);
}

async function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const reduction = ((1 - newSize / originalSize) * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)} (${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB, -${reduction}%)`);
    return { originalSize, newSize, reduction };
  } catch (error) {
    console.error(`❌ Error convirtiendo ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir, baseDir = '') {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  let totalOriginal = 0;
  let totalNew = 0;
  let converted = 0;

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relativePath = path.join(baseDir, entry.name);

    if (entry.isDirectory()) {
      // Ignorar node_modules y .next
      if (entry.name === 'node_modules' || entry.name === '.next' || entry.name === '.git') {
        continue;
      }
      const result = await processDirectory(fullPath, relativePath);
      totalOriginal += result.originalSize;
      totalNew += result.newSize;
      converted += result.converted;
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        // No convertir favicons ni iconos pequeños
        if (relativePath.includes('favicon') || entry.name.includes('icon')) {
          continue;
        }

        const outputPath = fullPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
        
        // Solo convertir si no existe ya el .webp
        if (!fs.existsSync(outputPath)) {
          const result = await convertToWebP(fullPath, outputPath);
          if (result) {
            totalOriginal += result.originalSize;
            totalNew += result.newSize;
            converted++;
          }
        } else {
          console.log(`⏭️  ${path.basename(fullPath)} ya tiene versión WebP`);
        }
      }
    }
  }

  return { originalSize: totalOriginal, newSize: totalNew, converted };
}

async function main() {
  const imagesDir = path.join(process.cwd(), 'public', 'images');
  
  if (!fs.existsSync(imagesDir)) {
    console.error(`❌ Directorio no encontrado: ${imagesDir}`);
    process.exit(1);
  }

  console.log('🔄 Convirtiendo imágenes a WebP...\n');
  console.log(`📁 Directorio: ${imagesDir}\n`);

  const result = await processDirectory(imagesDir);

  console.log('\n' + '='.repeat(50));
  console.log('📊 Resumen:');
  console.log(`   Imágenes convertidas: ${result.converted}`);
  console.log(`   Tamaño original: ${(result.originalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Tamaño nuevo: ${(result.newSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`   Reducción total: ${((1 - result.newSize / result.originalSize) * 100).toFixed(1)}%`);
  console.log(`   Ahorro: ${((result.originalSize - result.newSize) / 1024 / 1024).toFixed(2)} MB`);
  console.log('='.repeat(50));
  console.log('\n✅ Conversión completada!');
  console.log('⚠️  Recuerda actualizar las referencias en el código para usar .webp');
}

main().catch(console.error);

