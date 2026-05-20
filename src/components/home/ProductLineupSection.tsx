import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

const PRODUCTS = [
  { model: 'SUR-3600D',  watt: '3,600W',    desc: '대형 물류창고·격납고·체육관', badge: '우수제품', badgeColor: 'var(--red)',   tags: ['나라장터 검토', '방폭 옵션'] },
  { model: 'SUR-2400T/D', watt: '2,400W',   desc: '중대형 공장·창고·군 시설',    badge: '우수제품', badgeColor: 'var(--red)',   tags: ['나라장터 검토', '특수환경'] },
  { model: 'SUR-1800T/D', watt: '1,800W',   desc: '중형 작업장·학교·공공시설',   badge: '우수제품', badgeColor: 'var(--red)',   tags: ['나라장터 검토'] },
  { model: 'SUR-D300A',   watt: '300W',      desc: '책상형 개인용·욕실형',        badge: 'MAS',      badgeColor: 'var(--blue)',  tags: ['MAS 계약', '개인용'] },
];

export default function ProductLineupSection() {
  return (
    <section style={{ background: '#fff', padding: '72px 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '30px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '10px' }}>
                대표 제품
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2 }}>
                공간 규모에 따라 먼저 검토하는 모델
              </h2>
              <p style={{ color: 'var(--gray)', marginTop: '6px', fontSize: '0.95rem', maxWidth: '560px', lineHeight: 1.7 }}>
                홈에서는 전체 목록을 다 보여주기보다, 자주 검토되는 대표 모델만 먼저 안내합니다.
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/products"
                style={{
                  padding: '12px 20px',
                  borderRadius: '999px',
                  border: '1.5px solid var(--red)',
                  color: 'var(--red)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                }}
              >
                  전체 제품 보기
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
          className="product-grid"
        >
          {PRODUCTS.map((p) => (
            <motion.div
              key={p.model}
              variants={staggerItem}
              whileHover={{ y: -6, boxShadow: '0 16px 40px rgba(0,0,0,0.13)', transition: { duration: 0.2 } }}
              style={{
                background: '#fff',
                borderRadius: '12px',
                padding: '20px',
                boxShadow: '0 18px 46px rgba(15,23,42,0.08)',
                border: '1px solid var(--border)',
                position: 'relative',
                cursor: 'default',
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  top: '14px',
                  right: '14px',
                  background: p.badgeColor,
                  color: '#fff',
                  fontSize: '10px',
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: '4px',
                }}
              >
                {p.badge}
              </span>
              <div style={{ fontSize: '1.25rem', letterSpacing: '-0.02em', color: 'var(--red)', marginBottom: '2px', fontWeight: 900, fontVariantNumeric: 'tabular-nums' }}>
                {p.model}
              </div>
              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--amber)', marginBottom: '8px' }}>
                {p.watt}
              </div>
              <p style={{ fontSize: '12.5px', color: 'var(--gray)', lineHeight: 1.7, marginBottom: '12px' }}>
                {p.desc}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {p.tags.map((tag) => (
                  <span key={tag} style={{ fontSize: '10.5px', background: 'var(--off)', color: 'var(--gray)', padding: '2px 7px', borderRadius: '999px', border: '1px solid var(--border)' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) { .product-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .product-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
