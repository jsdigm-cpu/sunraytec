import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseItem {
  id: number;
  title: string;
  category: string;
  model: string;
  location: string;
  image: string;
}

const CASES: CaseItem[] = [
  { id: 1,  title: '인천공항 FedEx 물류센터',   category: '산업·물류', model: 'SUR-3600D', location: '인천',  image: '/images/hero/hero_1.jpg' },
  { id: 2,  title: '대전 우편물류센터',          category: '산업·물류', model: 'SUR-2400T', location: '대전',  image: '/images/hero/hero_2.jpg' },
  { id: 3,  title: '포항 00부대 정비창',          category: '국방·특수', model: 'SUR-3600D', location: '포항',  image: '/images/hero/hero_3.jpg' },
  { id: 4,  title: '연무초등학교 급식실',         category: '공공·교육', model: 'SUR-1800T', location: '논산',  image: '/images/hero/hero_4.jpg' },
  { id: 5,  title: '한국도로공사 버스정류장',     category: '공공·교육', model: 'SUR-1200T', location: '전국',  image: '/images/hero/hero_5.jpg' },
  { id: 6,  title: '자동차 출고센터 세차장',      category: '상업',      model: 'SUR-2400T', location: '경기',  image: '/images/hero/hero_6.jpg' },
  { id: 7,  title: '서울 공공기관 교육시설',      category: '공공·교육', model: 'SUR-1800D', location: '서울',  image: '/images/hero/hero_7.jpg' },
  { id: 8,  title: '대형 물류창고 난방 시스템',   category: '산업·물류', model: 'SUR-3600T', location: '경기',  image: '/images/hero/hero_8.jpg' },
  { id: 9,  title: '제조공장 작업장 난방',        category: '산업·물류', model: 'SUR-2400D', location: '충남',  image: '/images/hero/hero_9.jpg' },
  { id: 10, title: '상업시설 매장 난방',          category: '상업',      model: 'SUR-1200D', location: '부산',  image: '/images/hero/hero_10.jpg' },
];

const CATEGORIES = ['전체', '산업·물류', '공공·교육', '국방·특수', '상업'];

const CATEGORY_COLOR: Record<string, string> = {
  '산업·물류': '#F59E0B',
  '국방·특수': '#EF4444',
  '공공·교육': '#60A5FA',
  '상업':       '#4ADE80',
};

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

export default function CasesPage() {
  const [activeCategory, setActiveCategory] = useState('전체');

  const filtered = activeCategory === '전체'
    ? CASES
    : CASES.filter(c => c.category === activeCategory);

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>

      {/* ① Sub-Hero */}
      <section style={{
        background: 'linear-gradient(160deg, var(--navy) 0%, #152035 60%, #0E1E3A 100%)',
        padding: '56px 0 64px',
      }}>
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '20px' }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>홈</Link>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>시공사례</span>
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 800, color: '#fff', marginBottom: '12px' }}>
              시공사례
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)' }}>
              공공기관·산업현장에서 신뢰로 쌓아온 납품 실적
            </p>
          </motion.div>

          {/* KPI 배지 */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: 'flex', gap: '24px', marginTop: '36px', flexWrap: 'wrap' }}
          >
            {[
              { value: '2,000+', label: '누적 시공 건수' },
              { value: '30+',    label: '시공 연수' },
              { value: '전국',   label: '서비스 지역' },
            ].map(kpi => (
              <div key={kpi.label} style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: 900, color: '#fff' }}>{kpi.value}</span>
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)' }}>{kpi.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ② 필터 탭 + 갤러리 */}
      <section style={{ padding: '56px 0 80px', background: '#F8FAFC' }}>
        <div className="container">

          {/* 필터 탭 */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: `2px solid ${activeCategory === cat ? 'var(--navy)' : '#E5E7EB'}`,
                  background: activeCategory === cat ? 'var(--navy)' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#6B7280',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat}
                {cat !== '전체' && (
                  <span style={{ marginLeft: '6px', fontSize: '0.75rem', opacity: 0.7 }}>
                    {CASES.filter(c => c.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* 갤러리 그리드 */}
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
                <motion.div
                  key={item.id}
                  variants={cardVariant}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    background: '#fff',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  {/* 이미지 */}
                  <div style={{ height: '200px', overflow: 'hidden', position: 'relative' }}>
                    <motion.img
                      src={item.image}
                      alt={item.title}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.4 }}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.style.background = 'linear-gradient(135deg, var(--navy) 0%, #1A3A6B 100%)';
                          parent.style.display = 'flex';
                          parent.style.alignItems = 'center';
                          parent.style.justifyContent = 'center';
                          parent.innerHTML = '<span style="font-size:3rem">🏭</span>';
                        }
                      }}
                    />
                    {/* 카테고리 배지 */}
                    <span style={{
                      position: 'absolute', top: '12px', left: '12px',
                      fontSize: '11px', fontWeight: 700,
                      background: CATEGORY_COLOR[item.category] || '#6B7280',
                      color: item.category === '공공·교육' || item.category === '상업' ? '#1F2937' : '#fff',
                      padding: '3px 10px', borderRadius: '999px',
                    }}>
                      {item.category}
                    </span>
                  </div>

                  {/* 텍스트 */}
                  <div style={{ padding: '18px 20px' }}>
                    <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.95rem', marginBottom: '8px' }}>
                      {item.title}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{
                        fontSize: '11px', background: '#F1F5F9',
                        color: '#374151', padding: '3px 10px', borderRadius: '6px', fontWeight: 600,
                      }}>
                        {item.model}
                      </span>
                      <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📍 {item.location}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* 문의 CTA */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{
              marginTop: '64px', textAlign: 'center',
              background: 'linear-gradient(160deg, var(--navy) 0%, #1A3A6B 100%)',
              borderRadius: '20px', padding: '48px 32px', color: '#fff',
            }}
          >
            <p style={{ fontSize: '0.85rem', letterSpacing: '2px', color: 'rgba(255,255,255,0.5)', marginBottom: '12px', textTransform: 'uppercase' }}>
              Contact Us
            </p>
            <h3 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 800, marginBottom: '12px' }}>
              우리 시설에도 적용하고 싶다면?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '28px', fontSize: '0.95rem' }}>
              전문가가 현장 조건에 맞는 최적 솔루션을 제안합니다
            </p>
            <Link
              to="/contact"
              style={{
                display: 'inline-block',
                padding: '14px 36px',
                borderRadius: '10px',
                background: 'var(--red)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.95rem',
                textDecoration: 'none',
              }}
            >
              📋 견적 문의하기
            </Link>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px)  { .cases-page-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px)  { .cases-page-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}
