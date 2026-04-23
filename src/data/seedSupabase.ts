import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { initialProducts } from './products';
import { initialSiteContent } from './siteContent';

dotenv.config({ path: '.env.local' });

const INITIAL_CASE_STUDIES = [
  { title: '인천공항 FedEx 물류센터',  category: '산업·물류', location: '인천', summary: '대형 물류센터 고천장 복사난방 시스템 설치', image_url: '/images/hero/hero_1.jpg',  featured: true },
  { title: '대전 우편물류센터',         category: '산업·물류', location: '대전', summary: '우편물류 처리 시설 복사난방 시스템 도입',   image_url: '/images/hero/hero_2.jpg',  featured: true },
  { title: '포항 00부대 정비창',        category: '국방·특수', location: '포항', summary: '군 정비창 특수환경 복사난방 설치',          image_url: '/images/hero/hero_3.jpg',  featured: false },
  { title: '연무초등학교 급식실',       category: '공공·교육', location: '논산', summary: '학교 급식실 위생·효율 중심 복사난방',       image_url: '/images/hero/hero_4.jpg',  featured: true },
  { title: '한국도로공사 버스정류장',   category: '공공·교육', location: '전국', summary: '전국 고속도로 버스정류장 난방 시스템',      image_url: '/images/hero/hero_5.jpg',  featured: false },
  { title: '자동차 출고센터 세차장',    category: '상업',      location: '경기', summary: '차량 출고센터 세차장 복사난방 설치',       image_url: '/images/hero/hero_6.jpg',  featured: false },
  { title: '서울 공공기관 교육시설',    category: '공공·교육', location: '서울', summary: '공공기관 교육시설 실내 쾌적 환경 조성',    image_url: '/images/hero/hero_7.jpg',  featured: false },
  { title: '대형 물류창고 난방 시스템', category: '산업·물류', location: '경기', summary: '대형 물류창고 전체 복사난방 설계 및 시공', image_url: '/images/hero/hero_8.jpg',  featured: true },
  { title: '제조공장 작업장 난방',      category: '산업·물류', location: '충남', summary: '제조 공장 작업자 환경 개선용 복사난방',     image_url: '/images/hero/hero_9.jpg',  featured: false },
  { title: '상업시설 매장 난방',        category: '상업',      location: '부산', summary: '상업시설 매장 쾌적 환경을 위한 복사난방',  image_url: '/images/hero/hero_10.jpg', featured: false },
];

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

  // 3. Case Studies 시드
  console.log('🏗️ 시공사례(Case Studies) 데이터 넣는 중...');
  const { error: casesError } = await supabase
    .from('case_studies')
    .insert(INITIAL_CASE_STUDIES);

  if (casesError) {
    console.error('❌ Case Studies 시드 실패:', casesError);
  } else {
    console.log(`✅ Case Studies ${INITIAL_CASE_STUDIES.length}개 완료!`);
  }

  console.log('🎉 모든 데이터베이스 시딩 작업이 완료되었습니다.');
}

seed();
