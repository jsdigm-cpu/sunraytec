import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface CaseItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image_url: string;
  summary?: string;
  featured?: boolean;
  impact?: string;
  impact_color?: string;
}

const CATEGORIES = ['전체', '교육 및 공공 복지', '국방 및 특수 시설', '산업 및 물류 거점', '스마트 시티 솔루션', '주거 및 라이프 스타일', '상업 및 서비스 공간'];

const SLUG_TO_CATEGORY: Record<string, string> = {
  education:  '교육 및 공공 복지',
  defense:    '국방 및 특수 시설',
  industrial: '산업 및 물류 거점',
  smart:      '스마트 시티 솔루션',
  lifestyle:  '주거 및 라이프 스타일',
  commercial: '상업 및 서비스 공간',
};

const CATEGORY_TO_SLUG: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_TO_CATEGORY).map(([slug, cat]) => [cat, slug])
);

const CATEGORY_COLOR: Record<string, string> = {
  '교육 및 공공 복지':    '#3B82F6',
  '국방 및 특수 시설':    '#EF4444',
  '산업 및 물류 거점':    '#F59E0B',
  '스마트 시티 솔루션':   '#10B981',
  '주거 및 라이프 스타일':'#8B5CF6',
  '상업 및 서비스 공간':  '#06B6D4',
};

const CATEGORY_ICON: Record<string, string> = {
  '교육 및 공공 복지':    '🏫',
  '국방 및 특수 시설':    '🛡️',
  '산업 및 물류 거점':    '🏭',
  '스마트 시티 솔루션':   '🚌',
  '주거 및 라이프 스타일':'🏃',
  '상업 및 서비스 공간':  '🏢',
};

const STATIC_CASES: CaseItem[] = [
  {
    id: 'case-001',
    title: '초등학교 급식실 복사난방 시스템',
    category: '교육 및 공공 복지',
    location: '경기도',
    image_url: '',
    summary: '급식실 천장에 복사난방 패널 설치. 기류 없는 위생 환경으로 식품위생 기준 충족, 학생 건강 보호.',
    impact: '미세먼지 Zero',
    impact_color: '#3B82F6',
  },
  {
    id: 'case-002',
    title: '시군구 행정청사 난방 교체',
    category: '교육 및 공공 복지',
    location: '전국 지자체',
    image_url: '',
    summary: '노후 온풍 난방에서 원적외선 복사난방으로 교체. 에너지 비용 절감 및 실내 공기질 개선 효과.',
    impact: '에너지 절감',
    impact_color: '#3B82F6',
  },
  {
    id: 'case-003',
    title: '사회복지관 및 노인정 난방',
    category: '교육 및 공공 복지',
    location: '수도권·지방',
    image_url: '',
    summary: '고령자 이용 시설 특화 복사난방. 바람 없는 쾌적한 열환경으로 관절 건강에 적합한 원적외선 난방.',
    impact: '무소음 무기류',
    impact_color: '#3B82F6',
  },
  {
    id: 'case-004',
    title: '육군 GOP 경계초소 — 12개 사단',
    category: '국방 및 특수 시설',
    location: '전방 지역',
    image_url: '',
    summary: '지상작전사령부 수요자 제안형 혁신제품으로 선정. 전방 12개 사단 경계초소 시범 납품 후 만족도 96점 달성.',
    impact: '만족도 96점',
    impact_color: '#EF4444',
    featured: true,
  },
  {
    id: 'case-005',
    title: '탄약고 결로방지 항온 시스템',
    category: '국방 및 특수 시설',
    location: '군 시설',
    image_url: '',
    summary: '탄약고 내부 결로 발생 차단 목적의 복사난방 적용. 기류 없는 복사열로 온도 균일성 유지 및 결로 억제.',
    impact: '결로방지',
    impact_color: '#EF4444',
  },
  {
    id: 'case-006',
    title: '㈜가나에너지 공장 — 온풍기 대체',
    category: '산업 및 물류 거점',
    location: '경기도',
    image_url: '',
    summary: '200평 천장높이 5m 공장. 온풍기(45kW×3대) 교체 후 연간 난방비 1,130만 원 → 576만 원으로 절감.',
    impact: '57% 절감',
    impact_color: '#F59E0B',
    featured: true,
  },
  {
    id: 'case-007',
    title: '차량 소독소 방수 난방 시스템',
    category: '산업 및 물류 거점',
    location: '전국',
    image_url: '',
    summary: '세척·소독 환경(고압 물 분사)에서도 안정 운영. IP65 방진방수 등급으로 혹독한 산업 현장 대응.',
    impact: 'IP65 방수',
    impact_color: '#F59E0B',
  },
  {
    id: 'case-008',
    title: '시내버스 승강장 대기공간 난방',
    category: '스마트 시티 솔루션',
    location: '도시 지자체',
    image_url: '',
    summary: '버스 정류장 대기실에 복사난방 패널 설치. 기류 없는 복사열로 외부 바람에도 따뜻한 대기 환경 조성.',
    impact: '도시 인프라',
    impact_color: '#10B981',
  },
  {
    id: 'case-009',
    title: '스포츠센터 탈의실·샤워실 난방',
    category: '주거 및 라이프 스타일',
    location: '수도권',
    image_url: '',
    summary: '수분·습기 많은 환경에서도 안정적 난방. IP65 방수 패널 적용, 곰팡이 억제 및 쾌적한 탈의 환경.',
    impact: 'IP65 방수',
    impact_color: '#8B5CF6',
  },
  {
    id: 'case-010',
    title: '대형 물류센터 작업공간 난방',
    category: '상업 및 서비스 공간',
    location: '수도권·지방',
    image_url: '',
    summary: '천장 높이 6~8m 대형 물류창고. 복사난방 특성상 높은 공간에서도 작업자 위치에 충분한 열 전달.',
    impact: '고천장 적합',
    impact_color: '#06B6D4',
  },
];

const HERO_STATS = [
  { value: '3회',    label: '우수제품 지정', sub: '2013·2019·2025년' },
  { value: '12개',   label: '사단 납품',     sub: '혁신제품 시범사용' },
  { value: '57%',    label: '난방비 절감',   sub: '실증 사례 기준' },
  { value: '전국',   label: '서비스 지역',   sub: '공공조달 납품' },
];

const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function CaseCard({ item, onClick }: { item: CaseItem; onClick: () => void }) {
  const color = CATEGORY_COLOR[item.category] || '#6B7280';
  const icon = CATEGORY_ICON[item.category] || '🏢';
  return (
    <motion.div
      variants={cardVariant}
      whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.14)', transition: { duration: 0.2 } }}
      onClick={onClick}
      style={{
        borderRadius: '16px',
        overflow: 'hidden',
        background: '#fff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        border: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
    >
      {/* 이미지 or 컬러 플레이스홀더 */}
      <div style={{ height: '180px', overflow: 'hidden', position: 'relative', background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)` }}>
        {item.image_url ? (
          <motion.img
            src={item.image_url}
            alt={item.title}
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '3.5rem', opacity: 0.6 }}>{icon}</span>
          </div>
        )}

        {/* 카테고리 배지 */}
        <span style={{
          position: 'absolute', top: '12px', left: '12px',
          fontSize: '10px', fontWeight: 700, letterSpacing: '0.5px',
          background: color, color: '#fff',
          padding: '3px 10px', borderRadius: '999px',
        }}>
          {item.category}
        </span>

        {/* 임팩트 배지 */}
        {item.impact && (
          <span style={{
            position: 'absolute', bottom: '12px', right: '12px',
            fontSize: '11px', fontWeight: 800,
            background: 'rgba(0,0,0,0.75)', color: '#fff',
            padding: '4px 10px', borderRadius: '6px',
            backdropFilter: 'blur(4px)',
          }}>
            {item.impact}
          </span>
        )}

        {item.featured && (
          <span style={{
            position: 'absolute', top: '12px', right: '12px',
            fontSize: '10px', fontWeight: 700,
            background: '#F59E0B', color: '#fff',
            padding: '3px 8px', borderRadius: '4px',
          }}>
            ★ 대표 사례
          </span>
        )}
      </div>

      {/* 텍스트 */}
      <div style={{ padding: '18px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.92rem', marginBottom: '8px', lineHeight: 1.4 }}>
          {item.title}
        </p>
        {item.summary && (
          <p style={{ fontSize: '0.775rem', color: '#6B7280', marginBottom: '12px', lineHeight: 1.5, flex: 1 }}>
            {item.summary}
          </p>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: color, fontWeight: 700 }}>●</span>
          <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{item.location}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function CasesPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [dbCases, setDbCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  const slug = searchParams.get('category');
  const activeCategory = slug && SLUG_TO_CATEGORY[slug] ? SLUG_TO_CATEGORY[slug] : '전체';

  const handleCategoryClick = (cat: string) => {
    if (cat === '전체') {
      setSearchParams({});
    } else {
      const targetSlug = CATEGORY_TO_SLUG[cat];
      if (targetSlug) setSearchParams({ category: targetSlug });
    }
  };

  useEffect(() => {
    async function fetchCases() {
      if (!supabase) { setLoading(false); return; }
      const { data, error } = await supabase
        .from('case_studies')
        .select('id, title, category, location, image_url, summary, featured')
        .order('created_at', { ascending: true });
      if (!error && data && data.length > 0) setDbCases(data as CaseItem[]);
      setLoading(false);
    }
    fetchCases();
  }, []);

  const cases = dbCases.length > 0 ? dbCases : STATIC_CASES;

  const filtered = activeCategory === '전체'
    ? cases
    : cases.filter(c => c.category === activeCategory);

  const ganaCase = STATIC_CASES.find(c => c.id === 'case-006');
  const defenseCase = STATIC_CASES.find(c => c.id === 'case-004');

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>

      {/* ① Hero */}
      <section style={{
        background: 'linear-gradient(160deg, var(--navy) 0%, #152035 60%, #0E1E3A 100%)',
        padding: '56px 0 0',
        overflow: 'hidden',
      }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '20px' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>홈</Link>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>시공사례</span>
            </div>
            <p style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '12px' }}>
              Delivery Records
            </p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}>
              시공사례
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.55)', maxWidth: '480px', lineHeight: 1.6 }}>
              군부대·학교·공장·복지시설까지.<br />
              우수제품 지정 이후 전국 공공·민간 현장에 검증된 납품 실적입니다.
            </p>
          </motion.div>

          {/* 히어로 KPI 수치 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0', marginTop: '48px', borderTop: '1px solid rgba(255,255,255,0.08)' }}
            className="hero-stats-grid"
          >
            {HERO_STATS.map((s, i) => (
              <div key={s.label} style={{
                padding: '28px 20px',
                borderRight: i < HERO_STATS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                  color: i === 2 ? 'var(--red)' : '#fff',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}>
                  {s.value}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.75)', marginBottom: '3px' }}>
                  {s.label}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.3px' }}>
                  {s.sub}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ② 대표 실증 사례 Spotlight */}
      <section style={{ background: '#0D1B2E', padding: '56px 0' }}>
        <div className="container">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '3px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '8px' }}
          >
            Featured Cases
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)', fontWeight: 800, color: '#fff', marginBottom: '32px' }}
          >
            수치로 검증된 대표 납품 사례
          </motion.h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="spotlight-grid">

            {/* 가나에너지 공장 사례 */}
            {ganaCase && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                style={{
                  background: 'linear-gradient(135deg, #1A2F4A 0%, #0F2236 100%)',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid rgba(245,158,11,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '160px', height: '160px',
                  background: 'radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#F59E0B', textTransform: 'uppercase' }}>
                  ★ 산업 현장 실증
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: '10px 0 6px' }}>
                  ㈜가나에너지 공장 난방 교체
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
                  200평 · 천장높이 5m · 온풍기(45kW×3대) 대체
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  {[
                    { label: '절감율', value: '57%', sub: 'vs 온풍기(EHP)' },
                    { label: '기존 연간', value: '1,130만', sub: '원/5개월' },
                    { label: '절감 후', value: '576만', sub: '원/5개월' },
                  ].map(m => (
                    <div key={m.label} style={{
                      background: 'rgba(245,158,11,0.08)',
                      borderRadius: '10px',
                      padding: '14px 10px',
                      textAlign: 'center',
                      border: '1px solid rgba(245,158,11,0.15)',
                    }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: '#F59E0B', lineHeight: 1 }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                        {m.label}
                      </div>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
                        {m.sub}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '16px' }}>
                  평당 난방비 13,500원 → 5,760원으로 감소
                </p>
              </motion.div>
            )}

            {/* 군부대 12사단 사례 */}
            {defenseCase && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{
                  background: 'linear-gradient(135deg, #1A2530 0%, #0F1E2E 100%)',
                  borderRadius: '16px',
                  padding: '32px',
                  border: '1px solid rgba(239,68,68,0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '160px', height: '160px',
                  background: 'radial-gradient(circle, rgba(239,68,68,0.08) 0%, transparent 70%)',
                  borderRadius: '50%',
                }} />
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '2px', color: '#EF4444', textTransform: 'uppercase' }}>
                  ★ 국방 혁신제품
                </span>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: '10px 0 6px' }}>
                  육군 전방 12개 사단 경계초소
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '24px' }}>
                  지상작전사령부 수요자 제안형 혁신제품 시범 납품
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  {[
                    { label: '만족도', value: '96점', sub: '/ 100점 만점' },
                    { label: '납품 사단', value: '12개', sub: '전방 GOP 경계' },
                    { label: '지정 방식', value: '혁신', sub: '제품 수요자 제안' },
                  ].map(m => (
                    <div key={m.label} style={{
                      background: 'rgba(239,68,68,0.08)',
                      borderRadius: '10px',
                      padding: '14px 10px',
                      textAlign: 'center',
                      border: '1px solid rgba(239,68,68,0.15)',
                    }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.5rem', color: '#EF4444', lineHeight: 1 }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.7)', marginTop: '4px' }}>
                        {m.label}
                      </div>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.35)', marginTop: '2px' }}>
                        {m.sub}
                      </div>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', marginTop: '16px' }}>
                  조달청 혁신제품 지정번호 기준 · 2020.09 ~ 2023.09
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* ③ 카테고리 현황 인포그래픽 바 */}
      <section style={{ background: '#F1F5F9', borderBottom: '1px solid #E2E8F0', padding: '32px 0' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px' }}
            className="cat-stat-grid"
          >
            {CATEGORIES.filter(c => c !== '전체').map(cat => {
              const count = cases.filter(c => c.category === cat).length;
              const color = CATEGORY_COLOR[cat];
              const icon = CATEGORY_ICON[cat];
              return (
                <motion.button
                  key={cat}
                  whileHover={{ y: -3, transition: { duration: 0.15 } }}
                  onClick={() => handleCategoryClick(cat)}
                  style={{
                    background: activeCategory === cat ? color : '#fff',
                    border: `2px solid ${activeCategory === cat ? color : '#E2E8F0'}`,
                    borderRadius: '12px',
                    padding: '16px 8px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'background 0.2s, border 0.2s',
                  }}
                >
                  <div style={{ fontSize: '1.6rem', marginBottom: '6px' }}>{icon}</div>
                  <div style={{
                    fontSize: '10px', fontWeight: 700,
                    color: activeCategory === cat ? '#fff' : '#374151',
                    lineHeight: 1.3,
                    wordBreak: 'keep-all',
                  }}>
                    {cat}
                  </div>
                  <div style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '1.3rem',
                    color: activeCategory === cat ? '#fff' : color,
                    marginTop: '6px',
                    lineHeight: 1,
                  }}>
                    {count}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ④ 갤러리 그리드 */}
      <section style={{ padding: '56px 0 80px', background: '#F8FAFC' }}>
        <div className="container">

          {/* 필터 탭 (전체 포함) */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{ display: 'flex', gap: '8px', marginBottom: '36px', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <span style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, marginRight: '4px' }}>필터:</span>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  padding: '5px 14px',
                  borderRadius: '999px',
                  border: `2px solid ${activeCategory === cat ? 'var(--navy)' : '#E5E7EB'}`,
                  background: activeCategory === cat ? 'var(--navy)' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#6B7280',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  fontSize: '0.775rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
                {cat !== '전체' && (
                  <span style={{ marginLeft: '5px', fontSize: '0.7rem', opacity: 0.7 }}>
                    {cases.filter(c => c.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>
              불러오는 중...
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
              className="cases-page-grid"
            >
              {filtered.map(item => (
                <div key={item.id}>
                  <CaseCard item={item} onClick={() => navigate(`/cases/${item.id}`)} />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#9CA3AF' }}>
              해당 분야 사례를 준비 중입니다.
            </div>
          )}

          {/* 문의 CTA */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{
              marginTop: '64px', textAlign: 'center',
              background: 'linear-gradient(160deg, var(--navy) 0%, #1A3A6B 100%)',
              borderRadius: '20px', padding: '48px 32px', color: '#fff',
              position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', top: '-40px', right: '-40px',
              width: '200px', height: '200px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />
            <p style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px', textTransform: 'uppercase', fontWeight: 700 }}>
              Contact Us
            </p>
            <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '10px' }}>
              우리 시설에도 적용하고 싶다면?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginBottom: '28px', fontSize: '0.9rem', lineHeight: 1.6 }}>
              공장·학교·군부대·복지시설 어디서든<br />
              현장 조건에 맞는 최적 솔루션을 제안합니다.
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                padding: '14px 40px',
                borderRadius: '10px',
                background: 'var(--red)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
            >
              견적 문의하기 →
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .cases-page-grid  { grid-template-columns: repeat(2, 1fr) !important; }
          .spotlight-grid   { grid-template-columns: 1fr !important; }
          .cat-stat-grid    { grid-template-columns: repeat(3, 1fr) !important; }
          .hero-stats-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .cases-page-grid  { grid-template-columns: 1fr !important; }
          .cat-stat-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .hero-stats-grid  { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  );
}
