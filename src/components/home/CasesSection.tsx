import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

const CASES = [
  { icon: '🏭', title: '인천공항 FedEx 물류센터',  category: '산업·물류', model: 'SUR-3600D' },
  { icon: '📬', title: '대전 우편물류센터',          category: '산업·물류', model: 'SUR-2400T' },
  { icon: '⚔️', title: '포항 00부대 정비창',         category: '국방·특수', model: 'SUR-3600D' },
  { icon: '🎓', title: '연무초등학교 급식실',         category: '공공·교육', model: 'SUR-1800T' },
  { icon: '🚌', title: '한국도로공사 버스정류장',     category: '공공·교육', model: 'SUR-1200T' },
  { icon: '🚗', title: '자동차 출고센터 세차장',      category: '상업',     model: 'SUR-2400T' },
];

const CATEGORY_COLOR: Record<string, string> = {
  '산업·물류': 'var(--amber)',
  '국방·특수': 'var(--red)',
  '공공·교육': '#60A5FA',
  '상업':       '#4ADE80',
};

export default function CasesSection() {
  return (
    <section style={{ background: 'var(--navy2)', padding: '72px 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--amber2)', marginBottom: '10px' }}>
                Installation Cases
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
                검증된 시공 실적
              </h2>
              <p style={{ color: 'rgba(255,255,255,.5)', marginTop: '6px', fontSize: '0.9rem' }}>
                공공기관·산업현장에서 신뢰로 쌓아온 납품 실적
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.04 }}>
              <Link
                to="/cases"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1.5px solid rgba(255,255,255,.3)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  textDecoration: 'none',
                }}
              >
                시공사례 전체보기 →
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}
          className="cases-grid"
        >
          {CASES.map((c) => (
            <motion.div
              key={c.title}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,.06)',
                border: '1px solid rgba(255,255,255,.1)',
                cursor: 'pointer',
              }}
            >
              <Link to="/cases">
                {/* 이미지 영역 — hover 시 이모지 확대 */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: '140px',
                    background: 'linear-gradient(135deg, var(--navy) 0%, #1A3A6B 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    overflow: 'hidden',
                  }}
                >
                  {c.icon}
                </motion.div>

                <div style={{ padding: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: CATEGORY_COLOR[c.category] || 'var(--gray)', marginBottom: '6px', display: 'block' }}>
                    {c.category}
                  </span>
                  <p style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginBottom: '6px' }}>
                    {c.title}
                  </p>
                  <span style={{ fontSize: '11px', background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.6)', padding: '2px 8px', borderRadius: '4px' }}>
                    {c.model}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) { .cases-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .cases-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
