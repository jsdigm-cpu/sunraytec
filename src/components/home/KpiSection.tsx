import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';

const KPI_ITEMS = [
  { suffix: '%',   label: '에너지 절감',   sub: '고천장·대공간 기준', countTo: 60,   decimal: 0, prefix: '최대 ' },
  { suffix: '%',   label: '결로 방지',     sub: '완전 해결',          countTo: 100,  decimal: 0, prefix: '' },
  { suffix: '%',   label: '항균·탈취',     sub: '대장균·포도상구균', countTo: 99.9, decimal: 1, prefix: '' },
  { suffix: '년+', label: '공공조달 납품', sub: '검증된 실적',        countTo: 13,   decimal: 0, prefix: '' },
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
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(2rem, 4vw, 2.8rem)',
          color: 'var(--red)',
          lineHeight: 1,
          marginBottom: '6px',
        }}
      >
        {item.prefix}{count}{item.suffix}
      </div>
      <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--navy)', marginBottom: '3px' }}>
        {item.label}
      </div>
      <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{item.sub}</div>
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
