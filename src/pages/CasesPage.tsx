import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabase';

interface CaseItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image_url: string;
  summary?: string;
  featured?: boolean;
}

const CATEGORIES = ['전체', '교육 및 공공 복지', '국방 및 특수 시설', '산업 및 물류 거점', '스마트 시티 솔루션', '주거 및 라이프 스타일', '상업 및 서비스 공간'];

const CATEGORY_COLOR: Record<string, string> = {
  '교육 및 공공 복지':    '#60A5FA',
  '국방 및 특수 시설':    '#EF4444',
  '산업 및 물류 거점':    '#F59E0B',
  '스마트 시티 솔루션':   '#34D399',
  '주거 및 라이프 스타일':'#F472B6',
  '상업 및 서비스 공간':  '#A78BFA',
};

const CATEGORY_TEXT_DARK = new Set(['스마트 시티 솔루션', '주거 및 라이프 스타일']);

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
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('전체');

  useEffect(() => {
    async function fetchCases() {
      if (!supabase) { setLoading(false); return; }
      const { data, error } = await supabase
        .from('case_studies')
        .select('id, title, category, location, image_url, summary, featured')
        .order('created_at', { ascending: true });
      if (!error && data) setCases(data as CaseItem[]);
      setLoading(false);
    }
    fetchCases();
  }, []);

  const filtered = activeCategory === '전체'
    ? cases
    : cases.filter(c => c.category === activeCategory);

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

          {/* 로딩 상태 */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#9CA3AF', fontSize: '0.95rem' }}>
              불러오는 중...
            </div>
          )}

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
                    {cases.filter(c => c.category === cat).length}
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
                      src={item.image_url}
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
                      color: CATEGORY_TEXT_DARK.has(item.category) ? '#1F2937' : '#fff',
                      padding: '3px 10px', borderRadius: '999px',
                    }}>
                      {item.category}
                    </span>
                  </div>

                  {/* 텍스트 */}
                  <div style={{ padding: '18px 20px' }}>
                    <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.95rem', marginBottom: '6px' }}>
                      {item.title}
                    </p>
                    {item.summary && (
                      <p style={{ fontSize: '0.78rem', color: '#6B7280', marginBottom: '8px', lineHeight: 1.4 }}>
                        {item.summary}
                      </p>
                    )}
                    <span style={{ fontSize: '12px', color: '#9CA3AF' }}>📍 {item.location}</span>
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
