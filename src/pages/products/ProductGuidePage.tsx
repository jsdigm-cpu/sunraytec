import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';
import PageSEO from '../../components/seo/PageSEO';

type ProductGuideId = 'special' | 'personal-bath' | 'smart-control' | 'compare';

interface ProductGuidePageProps {
  pageId: ProductGuideId;
}

const DATA: Record<ProductGuideId, {
  eyebrow: string;
  title: string;
  desc: string;
  cards: Array<{ title: string; body: string; tag: string }>;
}> = {
  special: {
    eyebrow: 'Special Products',
    title: '방폭·특수 제품',
    desc: '위험물 취급, 분진, 습기, 옥외·반옥외 등 까다로운 현장 조건에 맞춘 특수 복사난방 제품군입니다.',
    cards: [
      { title: '방폭형 EX', tag: 'EX emb II T1', body: '화학공장, 도장공장, 위험물 저장 시설 등 방폭 검토가 필요한 현장에 적용하는 제품군입니다.' },
      { title: '방진·방수 옵션', tag: 'KTR IP65 시험', body: '2024년 KTR 방진·방수 시험성적서 기준을 바탕으로 세차장, 축사, 물류 하역장처럼 습기와 먼지 노출이 있는 공간을 검토합니다.' },
      { title: '고천장 작업자 난방', tag: '국소 난방', body: '공장과 물류센터에서 작업 위치 중심으로 열을 전달해 전체 공조 부담을 낮춥니다.' },
    ],
  },
  'personal-bath': {
    eyebrow: 'Personal & Bath',
    title: '개인용·욕실형 복사난방',
    desc: '개인 사무공간, 탈의실, 욕실, 소형 공간에 맞춘 소형 복사난방 제품 구성 초안입니다.',
    cards: [
      { title: '책상형 개인 난방', tag: '소형 공간', body: '근무자 주변을 직접 데우는 보조 난방 용도로 활용할 수 있습니다.' },
      { title: '욕실·탈의실 난방', tag: '쾌적성', body: '짧은 사용 시간과 습도 조건을 고려해 적용 제품과 설치 위치를 검토합니다.' },
      { title: '리모델링 현장', tag: '간편 적용', body: '기존 공조 설비를 크게 변경하기 어려운 소규모 현장에 적합한 구성을 준비합니다.' },
    ],
  },
  'smart-control': {
    eyebrow: 'Smart Control',
    title: '스마트 제어 시스템',
    desc: 'WiFi 원격 제어, 구역별 운전, 128회로 중앙제어 등 운영 효율을 높이는 제어 솔루션입니다.',
    cards: [
      { title: '구역별 제어', tag: 'Zone Control', body: '공간별 사용 시간과 점유 여부에 따라 난방 운전을 나눠 관리합니다.' },
      { title: '중앙 모니터링', tag: '128회로', body: '대형 시설의 다수 패널을 중앙에서 상태 확인하고 운전할 수 있도록 구성합니다.' },
      { title: '원격 운전', tag: 'IoT', body: '관리자가 현장에 상주하지 않아도 기본 운전 상태를 확인할 수 있는 방향으로 확장합니다.' },
    ],
  },
  compare: {
    eyebrow: 'Product Comparison',
    title: '제품 비교',
    desc: '공간 규모, 천장고, 설치 목적, 전원 조건에 따라 적합한 제품군을 비교할 수 있는 안내 페이지입니다.',
    cards: [
      { title: '공공·교육 시설', tag: '학생·민원 공간', body: '쾌적성, 안전성, 유지관리 편의성을 우선 고려합니다.' },
      { title: '산업·물류 시설', tag: '고천장·작업자', body: '작업 위치, 천장고, 개방도, 전원 조건에 맞춰 용량을 검토합니다.' },
      { title: '특수 환경', tag: '방폭·IP65', body: '위험물, 습기, 먼지 등 현장 조건에 맞는 인증과 시험성적서 적용 범위를 우선 확인합니다.' },
    ],
  },
};

export default function ProductGuidePage({ pageId }: ProductGuidePageProps) {
  const page = DATA[pageId];

  const SEO_META: Record<ProductGuideId, { title: string; desc: string; kw: string[] }> = {
    special:        { title: '방폭·특수 제품 - 썬레이텍', desc: '화학공장·도장·위험물 시설 방폭형, IP65 방진·방수, 고천장 작업자 난방 제품군 안내.', kw: ['방폭 복사난방', 'EX emb II T1', 'IP65 패널히터', '특수 복사난방'] },
    'personal-bath':{ title: '개인용·욕실형 복사난방 - 썬레이텍', desc: '소형 사무공간, 욕실, 탈의실에 맞춘 소형 복사난방 제품 구성 안내.', kw: ['욕실 복사난방', '개인 난방', '소형 패널히터', '탈의실 난방'] },
    'smart-control':{ title: '스마트 제어 시스템 - 썬레이텍', desc: 'WiFi 원격 제어, 구역별 운전, 128회로 중앙제어 등 복사난방 스마트 제어 솔루션.', kw: ['스마트 난방 제어', '128회로', 'IoT 복사난방', '원격 제어'] },
    compare:        { title: '제품 비교 - 공간별 추천 복사난방', desc: '공간 규모·천장고·설치 목적에 따라 복사난방 제품을 비교하고 선택하세요.', kw: ['복사난방 비교', '제품 선택', '공간별 추천', '패널히터 비교'] },
  };
  const seo = SEO_META[pageId];

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <PageSEO title={seo.title} description={seo.desc} keywords={seo.kw} canonical={`/products/${pageId}`} />
      <SubHero
        breadcrumb={[{ label: '제품안내' }, { label: '제품 선택 가이드' }]}
        badge="Product Guide"
        title="제품 선택 가이드"
        lead="공간 면적과 천장 높이에 따라 적합한 모델을 추천해 드립니다."
        keywords={['제품 선정 가이드', '설치 방식 비교', '공간별 추천', '용량 산출 기준']}
      />

      <section style={{ padding: '52px 0 78px' }}>
        <div className="container">
          <div className="product-guide-grid">
            {page.cards.map((card) => (
              <article key={card.title} style={{ background: '#fff', borderRadius: 12, border: '1px solid #E5E7EB', padding: 26, boxShadow: '0 12px 34px rgba(15,34,65,0.07)' }}>
                <span style={{ display: 'inline-block', color: 'var(--red)', fontSize: 12, fontWeight: 900, marginBottom: 12 }}>{card.tag}</span>
                <h2 style={{ color: 'var(--navy)', fontSize: '1.25rem', fontWeight: 900, marginBottom: 10 }}>{card.title}</h2>
                <p style={{ color: '#64748B', lineHeight: 1.75 }}>{card.body}</p>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 26, textAlign: 'center' }}>
            <Link to="/contact" style={{ display: 'inline-flex', padding: '13px 24px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              현장 조건 상담하기
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .product-guide-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        @media (max-width: 840px) {
          .product-guide-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
