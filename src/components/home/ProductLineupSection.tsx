import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

const PRODUCTS = [
  { model: 'SUR-3600D',  watt: '3,600W',    desc: '대형 물류창고·격납고·체육관', badge: '우수제품', badgeColor: 'var(--red)',   tags: ['조달청 3자단가', '방폭 옵션'] },
  { model: 'SUR-2400T/D', watt: '2,400W',   desc: '중대형 공장·창고·군 시설',    badge: '우수제품', badgeColor: 'var(--red)',   tags: ['조달청 3자단가', 'IP-65 옵션'] },
  { model: 'SUR-1800T/D', watt: '1,800W',   desc: '중형 작업장·학교·공공시설',   badge: '우수제품', badgeColor: 'var(--red)',   tags: ['조달청 3자단가'] },
  { model: 'SUR-1200T/D', watt: '1,200W',   desc: '소·중형 사무실·매장·식당',    badge: '우수제품', badgeColor: 'var(--red)',   tags: ['조달청 3자단가'] },
  { model: 'SUR-600T',    watt: '600W',      desc: '소형 공간·개인 사무실',       badge: 'MAS',      badgeColor: 'var(--blue)',  tags: ['MAS 계약'] },
  { model: 'SUR-D300A',   watt: '300W',      desc: '책상형 개인용·욕실형',        badge: 'MAS',      badgeColor: 'var(--blue)',  tags: ['MAS 계약', '개인용'] },
  { model: '방폭형 EX',   watt: '최대 3,600W', desc: '위험물 취급 산업 현장',     badge: '특수',     badgeColor: 'var(--amber)', tags: ['EX emb II T1', '방진방수 IP-65'] },
  { model: '스마트 컨트롤', watt: '—',       desc: 'WiFi 원격조절 · 128회로 중앙제어', badge: 'IoT', badgeColor: '#2E7D32',   tags: ['WiFi 제어', '중앙관리'] },
];

export default function ProductLineupSection() {
  return (
    <section style={{ background: 'var(--off)', padding: '72px 0' }}>
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
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '10px' }}>
                Products
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2 }}>
                SUR 시리즈 제품 라인업
              </h2>
              <p style={{ color: 'var(--gray)', marginTop: '6px', fontSize: '0.9rem' }}>
                용량·용도에 맞는 모델을 선택하세요
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/products"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1.5px solid var(--red)',
                  color: 'var(--red)',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                }}
              >
                전체 제품 보기 →
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}
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
                boxShadow: 'var(--sh)',
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
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.4rem', letterSpacing: '1px', color: 'var(--red)', marginBottom: '2px' }}>
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
