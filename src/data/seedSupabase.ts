import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { initialProducts } from './products';
import { initialSiteContent } from './siteContent';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ Supabase 환경변수가 .env.local에 설정되어 있지 않습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('🌱 Supabase 데이터 시드(Seed) 시작...');

  // 1. Products 시드
  console.log('📦 제품(Products) 데이터 넣는 중...');
  const { error: productsError } = await supabase
    .from('products')
    .upsert(
      initialProducts.map(p => ({
        id: p.id,
        name: p.name,
        category: p.category,
        product_line: p.productLine ?? '',
        installation_type: p.installationType ?? '',
        power_w: p.specs?.powerW ?? null,
        procurement_id: p.procurementId ?? null,
        thumbnail_image: p.thumbnailImage ?? null,
        summary: p.summary ?? null,
        detail_description: p.detailDescription ?? null,
        applications: p.applications ?? null,
        feature_bullets: p.featureBullets ?? null,
        sort_order: 0
      })),
      { onConflict: 'id' }
    );

  if (productsError) {
    console.error('❌ Products 시드 실패:', productsError);
  } else {
    console.log(`✅ Products ${initialProducts.length}개 완료!`);
  }

  // 2. Site Content 시드
  console.log('📝 사이트 콘텐츠(Site Content) 넣는 중...');
  const { error: contentError } = await supabase
    .from('site_content')
    .upsert(
      [
        {
          section_key: 'hero',
          payload: initialSiteContent.hero
        }
      ],
      { onConflict: 'section_key' }
    );

  if (contentError) {
    console.error('❌ Site Content 시드 실패:', contentError);
  } else {
    console.log('✅ Site Content 완료!');
  }

  console.log('🎉 모든 데이터베이스 시딩 작업이 완료되었습니다.');
}

seed();
