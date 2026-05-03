import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';

const KPI_ITEMS = [
  { suffix: '%',   label: '소비전력량 절감', sub: 'KTR 난방성능 시험',     countTo: 39.4, decimal: 1, prefix: '약 ' },
  { suffix: '',    label: '원적외선 방사율', sub: '2024 KTR 시험성적서',    countTo: 0.91, decimal: 2, prefix: '' },
  { suffix: '%',   label: '항균 성능',       sub: '대장균·포도상구균',     countTo: 99.9, decimal: 1, prefix: '' },
  { suffix: '년+', label: '공공조달 납품',   sub: '2013년 우수제품 지정 이후', countTo: 13,   decimal: 0, prefix: '' },
];

// 카운트업 로직만 담당 — key prop 없이 item만 받음
function KpiCardInner({ item }: { item: typeof KPI_ITEMS[0] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const increment = item.countTo / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= item.countTo) {
        setCount(item.countTo);
        clearInterval(timer);
      } else {
        setCount(parseFloat(current.toFixed(item.decimal)));
      }
    }, 1600 / 60);
    return () => clearInterval(timer);
  }, [inView, item]);

  return (
    <div ref={ref}>
      {/* 수치 + 단위 분리 — 시각 위계 강화 */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '1px', marginBottom: '8px' }}>
        {item.prefix && (
          <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', fontWeight: 700, color: 'var(--red)', opacity: 0.75, marginRight: '1px' }}>
            {item.prefix}
          </span>
        )}
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.6rem, 5vw, 3.8rem)',
            color: 'var(--red)',
            lineHeight: 1,
            fontWeight: 800,
          }}
        >
          {count}
        </span>
        {item.suffix && (
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(1.4rem, 2.8vw, 2rem)', color: 'var(--red)', lineHeight: 1, marginLeft: '2px', opacity: 0.85 }}>
            {item.suffix}
          </span>
        )}
      </div>
      <div style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--navy)', marginBottom: '4px' }}>
        {item.label}
      </div>
      <div style={{ fontSize: '11px', color: 'var(--gray)', lineHeight: 1.4 }}>{item.sub}</div>
    </div>
  );
}

export default function KpiSection() {
  return (
    <section style={{ background: '#fff', padding: '56px 0', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <ScrollReveal>
          <p
            style={{
              fontSize: '13px',
              fontWeight: 800,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--gray)',
              marginBottom: '24px',
            }}
          >
            핵심 성능 지표
          </p>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
          className="kpi-grid"
        >
          {/* key와 variants는 motion.div에, 카운트업은 KpiCardInner에 */}
          {KPI_ITEMS.map((item) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              whileHover={{ y: -8, boxShadow: '0 20px 48px rgba(0,0,0,0.15)', transition: { duration: 0.2 } }}
              style={{
                background: 'var(--off)',
                borderRadius: '12px',
                padding: '28px 20px',
                textAlign: 'center',
                borderTop: '3px solid var(--red)',
                cursor: 'default',
              }}
            >
              <KpiCardInner item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .kpi-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
    </section>
  );
}
