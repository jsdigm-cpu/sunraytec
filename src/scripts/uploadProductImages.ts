import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ENV_CANDIDATES = [
  '.env.local',
  '../../../.env.local',
  'C:/projects/sunraytec/.env.local',
];

for (const candidate of ENV_CANDIDATES) {
  if (fs.existsSync(candidate)) {
    dotenv.config({ path: candidate });
    console.log(`🔑 환경변수 로드: ${candidate}`);
    break;
  }
}

const SOURCE_DIR = 'C:/projects/homepage_low_data/product_images';
const BUCKET = 'product-images';
const IMAGE_EXTENSIONS = new Set(['jpg', 'jpeg', 'png', 'webp', 'gif', 'avif']);

const MAX_DIMENSION = 1600;
const JPEG_QUALITY = 82;
const WEBP_QUALITY = 82;

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY ||
  '';
const adminEmail = process.env.ADMIN_EMAIL || '';
const adminPassword = process.env.ADMIN_PASSWORD || '';

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ .env.local에 Supabase 환경변수(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)가 설정되어 있지 않습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function signInAsAdmin() {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('🔐 Service Role Key 사용 중 (로그인 생략)');
    return;
  }
  if (!adminEmail || !adminPassword) {
    console.error('❌ .env.local에 ADMIN_EMAIL, ADMIN_PASSWORD가 필요합니다.');
    process.exit(1);
  }
  const { error } = await supabase.auth.signInWithPassword({
    email: adminEmail,
    password: adminPassword,
  });
  if (error) {
    console.error(`❌ 관리자 로그인 실패: ${error.message}`);
    process.exit(1);
  }
  console.log(`🔐 관리자 로그인 성공: ${adminEmail}`);
}

type ParsedFile = {
  filePath: string;
  fileName: string;
  modelName: string;
  order: number;
  ext: string;
};

const CONTENT_TYPES: Record<string, string> = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
  gif: 'image/gif',
  avif: 'image/avif',
};

function parseFileName(fileName: string): ParsedFile | null {
  const match = fileName.match(/^(.+?)(?:_(\d+))?\.([a-zA-Z0-9]+)$/);
  if (!match) return null;
  const ext = match[3].toLowerCase();
  if (!IMAGE_EXTENSIONS.has(ext)) return null;
  return {
    filePath: '',
    fileName,
    modelName: match[1],
    order: match[2] ? parseInt(match[2], 10) : 1,
    ext,
  };
}

async function main() {
  await signInAsAdmin();

  console.log(`\n📁 원본 폴더: ${SOURCE_DIR}`);

  if (!fs.existsSync(SOURCE_DIR)) {
    console.error(`❌ 폴더를 찾을 수 없습니다: ${SOURCE_DIR}`);
    console.error('   먼저 폴더를 만들고 사진 파일을 넣은 뒤 다시 실행해주세요.');
    process.exit(1);
  }

  const allFiles = fs.readdirSync(SOURCE_DIR);
  const parsed: ParsedFile[] = [];
  const skipped: string[] = [];

  for (const fileName of allFiles) {
    const fullPath = path.join(SOURCE_DIR, fileName);
    if (!fs.statSync(fullPath).isFile()) continue;
    const p = parseFileName(fileName);
    if (!p) {
      skipped.push(fileName);
      continue;
    }
    p.filePath = fullPath;
    parsed.push(p);
  }

  if (parsed.length === 0) {
    console.error('❌ 처리할 이미지 파일이 없습니다.');
    process.exit(1);
  }

  console.log(`📷 이미지 파일 ${parsed.length}개 발견`);
  if (skipped.length > 0) {
    console.log(`⚠️  무시된 파일 (이미지 아님): ${skipped.join(', ')}`);
  }

  const byModel = new Map<string, ParsedFile[]>();
  for (const p of parsed) {
    const list = byModel.get(p.modelName) ?? [];
    list.push(p);
    byModel.set(p.modelName, list);
  }
  for (const list of byModel.values()) {
    list.sort((a, b) => a.order - b.order);
  }

  console.log(`📦 모델 ${byModel.size}종 그룹화 완료`);

  const { data: products, error: prodErr } = await supabase
    .from('products')
    .select('id, name');

  if (prodErr) {
    console.error('❌ 제품 목록 조회 실패:', prodErr.message);
    process.exit(1);
  }

  const byName = new Map<string, string>();
  for (const p of products ?? []) {
    byName.set(p.name.trim(), p.id);
  }

  let successProducts = 0;
  let totalUploaded = 0;
  const unmatched: string[] = [];
  const failed: string[] = [];

  for (const [modelName, files] of byModel) {
    const productId = byName.get(modelName.trim());

    if (!productId) {
      unmatched.push(`${modelName} (${files.length}장)`);
      continue;
    }

    console.log(`\n🔄 [${modelName}] (id: ${productId}) - ${files.length}장 처리 중`);

    const { data: existing, error: listErr } = await supabase
      .storage
      .from(BUCKET)
      .list(productId);

    if (!listErr && existing && existing.length > 0) {
      const toRemove = existing.map((f) => `${productId}/${f.name}`);
      const { error: rmErr } = await supabase.storage.from(BUCKET).remove(toRemove);
      if (rmErr) {
        console.warn(`  ⚠️  기존 파일 삭제 일부 실패: ${rmErr.message}`);
      } else {
        console.log(`  🗑️  기존 ${toRemove.length}개 삭제`);
      }
    }

    const urls: string[] = [];
    let uploadFailed = false;

    for (const file of files) {
      const originalBuffer = fs.readFileSync(file.filePath);
      const originalKB = Math.round(originalBuffer.length / 1024);

      const { buffer: optimizedBuffer, ext: outExt } = await optimizeImage(
        originalBuffer,
        file.ext,
      );
      const optimizedKB = Math.round(optimizedBuffer.length / 1024);

      const safeName = file.modelName.toLowerCase().replace(/[^a-z0-9_-]+/g, '-');
      const objectPath = `${productId}/${Date.now()}-${safeName}_${file.order}.${outExt}`;

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(objectPath, optimizedBuffer, {
          contentType: CONTENT_TYPES[outExt] ?? 'application/octet-stream',
          cacheControl: '31536000',
          upsert: false,
        });

      if (upErr) {
        console.error(`  ❌ ${file.fileName} 업로드 실패: ${upErr.message}`);
        failed.push(file.fileName);
        uploadFailed = true;
        continue;
      }

      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(objectPath);
      urls.push(pub.publicUrl);
      console.log(
        `  ✅ ${file.fileName} → 업로드 완료 (순번 ${file.order}, ${originalKB}KB → ${optimizedKB}KB)`,
      );
      totalUploaded++;
    }

    if (urls.length === 0) continue;

    const { error: updateErr } = await supabase
      .from('products')
      .update({
        thumbnail_image: urls[0],
        detail_image: urls[0],
        image_gallery: urls,
        updated_at: new Date().toISOString(),
      })
      .eq('id', productId);

    if (updateErr) {
      console.error(`  ❌ DB 업데이트 실패: ${updateErr.message}`);
      failed.push(`${modelName} (DB 업데이트)`);
      continue;
    }

    console.log(`  💾 DB 업데이트 완료 (대표 사진: ${urls[0].split('/').pop()})`);
    if (!uploadFailed) successProducts++;
  }

  console.log('\n=========================================');
  console.log(`✅ 성공: 제품 ${successProducts}종, 사진 ${totalUploaded}장 업로드 완료`);

  if (unmatched.length > 0) {
    console.log(`\n⚠️  매칭 안된 모델 (DB에 해당 모델명이 없음):`);
    unmatched.forEach((m) => console.log(`   - ${m}`));
    console.log(`   → 파일명의 모델명 부분이 DB의 모델명과 정확히 일치하는지 확인해주세요.`);
    console.log(`   → 예: SUR-2400-D_1.jpg → DB에 'SUR-2400-D' 모델이 있어야 함`);
  }

  if (failed.length > 0) {
    console.log(`\n❌ 실패한 파일/작업:`);
    failed.forEach((f) => console.log(`   - ${f}`));
  }

  console.log('=========================================\n');
}

async function optimizeImage(
  input: Buffer,
  inputExt: string,
): Promise<{ buffer: Buffer; ext: string }> {
  const pipeline = sharp(input, { failOn: 'none' })
    .rotate()
    .resize({
      width: MAX_DIMENSION,
      height: MAX_DIMENSION,
      fit: 'inside',
      withoutEnlargement: true,
    });

  if (inputExt === 'png') {
    const metadata = await sharp(input).metadata();
    if (metadata.hasAlpha) {
      const buffer = await pipeline.png({ compressionLevel: 9, palette: true }).toBuffer();
      return { buffer, ext: 'png' };
    }
    const buffer = await pipeline
      .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
      .toBuffer();
    return { buffer, ext: 'jpg' };
  }

  if (inputExt === 'webp') {
    const buffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    return { buffer, ext: 'webp' };
  }

  if (inputExt === 'gif' || inputExt === 'avif') {
    const buffer = await pipeline.toFormat(inputExt as 'gif' | 'avif').toBuffer();
    return { buffer, ext: inputExt };
  }

  const buffer = await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();
  return { buffer, ext: 'jpg' };
}

main().catch((err) => {
  console.error('❌ 예기치 않은 오류:', err);
  process.exit(1);
});
