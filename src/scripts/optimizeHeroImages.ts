import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const HERO_DIR = path.resolve('public/images/hero');
const MAX_WIDTH = 1920;
const JPEG_QUALITY = 82;

async function run() {
  if (!fs.existsSync(HERO_DIR)) {
    console.error(`❌ ${HERO_DIR} 폴더가 없습니다`);
    process.exit(1);
  }

  const files = fs.readdirSync(HERO_DIR).filter((f) => /\.(jpg|jpeg|png)$/i.test(f));
  console.log(`📷 hero 이미지 ${files.length}개 발견\n`);

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of files) {
    const filePath = path.join(HERO_DIR, file);
    const before = fs.statSync(filePath).size;
    totalBefore += before;

    const buffer = fs.readFileSync(filePath);
    const meta = await sharp(buffer).metadata();

    const optimized = await sharp(buffer)
      .rotate()
      .resize({
        width: meta.width && meta.width > MAX_WIDTH ? MAX_WIDTH : undefined,
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();

    const after = optimized.length;

    if (after >= before) {
      console.log(`  ⏭️  ${file}: 이미 충분히 작음 (${Math.round(before / 1024)}KB) — 건너뜀`);
      totalAfter += before;
      continue;
    }

    fs.writeFileSync(filePath, optimized);
    totalAfter += after;
    const reduction = Math.round(((before - after) / before) * 100);
    console.log(
      `  ✅ ${file}: ${Math.round(before / 1024)}KB → ${Math.round(after / 1024)}KB (-${reduction}%)`,
    );
  }

  const totalReduction = Math.round(((totalBefore - totalAfter) / totalBefore) * 100);
  console.log(
    `\n=========================================\n총 ${Math.round(totalBefore / 1024)}KB → ${Math.round(totalAfter / 1024)}KB (-${totalReduction}%)\n=========================================`,
  );
}

run().catch((err) => {
  console.error('❌ 오류:', err);
  process.exit(1);
});
