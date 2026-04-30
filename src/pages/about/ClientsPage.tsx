import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';
import { supabase } from '../../lib/supabase';

interface CaseRow {
  id: string;
  title: string;
  category: string;
  location: string;
}

const CLIENT_GROUPS: Array<{
  key: string;
  title: string;
  badge: string;
  desc: string;
  matchCategories: string[];
  fallback: string[];
}> = [
  {
    key: 'public-edu',
    title: '공공·교육',
    badge: 'Public · Education',
    desc: '학교, 군 시설, 행정·복지시설 등 사람이 머무는 공간을 위한 안전·쾌적 우선 적용처입니다.',
    matchCategories: ['교육 및 공공 복지', '국방 및 특수 시설'],
    fallback: ['전국 초·중·고 교실 난방', '지자체 청사 및 복지관', '국방부 산하 군 시설', '대학 실험실·체육관'],
  },
  {
    key: 'industry-logistics',
    title: '산업·물류',
    badge: 'Industry · Logistics',
    desc: '고천장·대공간·작업자 중심 난방이 필요한 공장, 물류센터, 작업장 적용처입니다.',
    matchCategories: ['산업 및 물류 거점'],
    fallback: ['수도권 대형 물류센터', '자동차·정밀 부품 공장', '냉장·냉동 작업 구역', '도장·코팅 라인'],
  },
  {
    key: 'smartcity-special',
    title: '스마트시티·특수',
    badge: 'Smart City · Special',
    desc: '버스정류장, 옥외 휴게시설, 방폭·습기 환경 등 일반 난방으로 풀기 어려운 특수 적용처입니다.',
    matchCategories: ['스마트 시티 솔루션'],
    fallback: ['도심 스마트 버스정류장', '관공서 옥외 흡연·휴게실', '방폭 인증 산업 라인', '습기 관리 필요 작업장'],
  },
  {
    key: 'commercial-life',
    title: '상업·라이프',
    badge: 'Commercial · Lifestyle',
    desc: '상가, 카페, 헬스장, 욕실, 개인 사무공간 등 쾌적성과 디자인을 동시에 고려하는 공간입니다.',
    matchCategories: ['주거 및 라이프 스타일', '상업 및 서비스 공간'],
    fallback: ['프리미엄 카페·갤러리', '피트니스·요가 스튜디오', '리모델링 욕실·탈의실', '개인 사무공간 보조 난방'],
  },
];

const TRUST_NUMBERS = [
  { value: '2,000+', label: '누적 시공 현장' },
  { value: '13년+', label: '조달청 우수제품 공급' },
  { value: '6종', label: 'K마크 성능인증 모델' },
  { value: '10건', label: '특허·디자인 등록' },
];

export default function ClientsPage() {
  const [cases, setCases] = useState<CaseRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from('case_studies')
      .select('id,title,category,location')
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setCases(data as CaseRow[]);
        setLoading(false);
      });
  }, []);

  const grouped = useMemo(() => {
    return CLIENT_GROUPS.map((g) => ({
      ...g,
      items: cases.filter((c) => g.matchCategories.includes(c.category)),
    }));
  }, [cases]);

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <SubHero
        breadcrumb={[{ label: '회사소개' }, { label: '주요 납품처' }]}
        badge="Reference Clients"
        title="2,000곳 이상의 현장에서 검증된 복사난방"
        lead="학교 교실에서부터 물류센터, 군 시설, 도심 스마트 버스정류장까지. (주)썬레이텍은 공간의 용도와 사용자에 맞춰 복사난방을 설계하고 시공해 왔습니다."
        keywords={['2,000+ 누적 시공', '13년+ 조달청 공급', 'K마크 6종 인증', '특허·디자인 10건']}
      />

      {/* Group cards */}
      <section style={{ padding: '52px 0 32px' }}>
        <div className="container">
          <div className="clients-grid">
            {grouped.map((g) => (
              <article key={g.key} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 26, display: 'flex', flexDirection: 'column' }}>
                <span style={{ display: 'inline-block', color: 'var(--red)', fontSize: 11, fontWeight: 900, letterSpacing: 1.2, marginBottom: 10 }}>
                  {g.badge}
                </span>
                <h2 style={{ color: 'var(--navy)', fontSize: '1.3rem', fontWeight: 900, marginBottom: 10 }}>{g.title}</h2>
                <p style={{ color: '#64748B', lineHeight: 1.75, marginBottom: 16, fontSize: '0.95rem' }}>{g.desc}</p>

                <div style={{ display: 'grid', gap: 8, marginBottom: 12 }}>
                  {g.items.length > 0 ? (
                    g.items.slice(0, 6).map((item) => (
                      <Link key={item.id} to={`/cases/${item.id}`} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderTop: '1px solid #EEF2F7', textDecoration: 'none', color: 'inherit' }}>
                        <span style={{ color: '#1F2937', fontWeight: 700, fontSize: 14, flex: 1, minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.title}</span>
                        <span style={{ color: '#94A3B8', fontSize: 12, flexShrink: 0 }}>{item.location}</span>
                      </Link>
                    ))
                  ) : (
                    g.fallback.map((label) => (
                      <div key={label} style={{ padding: '10px 0', borderTop: '1px solid #EEF2F7', color: '#475569', fontSize: 14, fontWeight: 600 }}>
                        {label}
                      </div>
                    ))
                  )}
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 8 }}>
                  <Link to="/cases" style={{ display: 'inline-flex', color: 'var(--navy)', fontSize: 13, fontWeight: 800, textDecoration: 'none' }}>
                    전체 사례 보기 →
                  </Link>
                </div>
              </article>
            ))}
          </div>
          {!loading && cases.length === 0 && (
            <p style={{ marginTop: 18, color: '#94A3B8', fontSize: 13 }}>
              ※ 현재 시공사례 DB가 비어 있어 대표 적용처를 임시 표기로 표시 중입니다. 관리자 화면에서 사례를 등록하면 자동으로 노출됩니다.
            </p>
          )}
        </div>
      </section>

      {/* Procurement note */}
      <section style={{ padding: '32px 0 80px' }}>
        <div className="container">
          <article style={{ background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)', border: '1px solid #FCD34D', borderRadius: 14, padding: 30 }}>
            <p style={{ color: '#92400E', fontSize: 12, fontWeight: 900, letterSpacing: 1, marginBottom: 8 }}>PUBLIC PROCUREMENT</p>
            <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 12 }}>공공기관 구매 채널</h2>
            <p style={{ color: '#475569', lineHeight: 1.85, marginBottom: 18 }}>
              나라장터 우수제품(3차 지정), MAS 다수공급자 계약, 혁신시제품 시범구매를 통해 별도 입찰 없이 수의계약으로 도입할 수 있습니다. 일위대가표·시방서·도면 자료는 패스트트랙 라운지 또는 파트너 포털에서 확인 가능합니다.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/products/excellence" style={{ display: 'inline-flex', padding: '11px 18px', background: 'var(--navy)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                조달 우수제품 보기
              </Link>
              <Link to="/fasttrack" style={{ display: 'inline-flex', padding: '11px 18px', background: '#fff', color: 'var(--navy)', border: '1px solid #CBD5E1', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                패스트트랙 라운지
              </Link>
              <a href="https://www.g2b.go.kr" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', padding: '11px 18px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                나라장터 바로가기
              </a>
            </div>
          </article>
        </div>
      </section>

      <style>{`
        .clients-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
        @media (max-width: 760px) { .clients-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
