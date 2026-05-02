import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';

const KPI_ITEMS = [
  { suffix: '%',   label: '소비전력량 절감', sub: 'KTR 난방성능 시험',          countTo: 39.4, decimal: 1, prefix: '약 ' },
  { suffix: '',    label: '원적외선 방사율', sub: '2024 KTR 시험성적서',         countTo: 0.91, decimal: 2, prefix: '' },
  { suffix: '%',   label: '항균 성능',       sub: '대장균·포도상구균',          countTo: 99.9, decimal: 1, prefix: '' },
  { suffix: '년+', label: '공공조달 납품',   sub: '2013년 우수제품 지정 이후',  countTo: 13,   decimal: 0, prefix: '' },
];

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
          fontFamily: 'var(--font-apple)',
          fontSize: 'clamp(2.2rem, 4vw, 3rem)',
          fontWeight: 600,
          color: 'var(--apple-near-black)',
          lineHeight: 1,
          letterSpacing: '-1.5px',
          marginBottom: '8px',
        }}
      >
        {item.prefix}{count.toFixed(item.decimal)}{item.suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-apple)',
        fontSize: '17px',
        fontWeight: 400,
        color: 'var(--apple-near-black)',
        marginBottom: '4px',
        lineHeight: 1.4,
      }}>
        {item.label}
      </div>
      <div style={{
        fontFamily: 'var(--font-apple)',
        fontSize: '14px',
        color: 'var(--apple-muted)',
        lineHeight: 1.4,
      }}>
        {item.sub}
      </div>
    </div>
  );
}

export default function KpiSection() {
  return (
    <section style={{
      background: 'var(--apple-parchment)',
      padding: 'var(--as-section) 0',
    }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ marginBottom: '48px', textAlign: 'center' }}>
            <p style={{
              fontFamily: 'var(--font-apple)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--apple-blue)',
              marginBottom: '12px',
            }}>
              핵심 성능 지표
            </p>
            <h2 style={{
              fontFamily: 'var(--font-apple)',
              fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
              fontWeight: 600,
              color: 'var(--apple-near-black)',
              letterSpacing: '-1px',
              lineHeight: 1.1,
            }}>
              수치로 증명한 성능
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '2px',
            background: 'var(--apple-parchment2)',
            borderRadius: 'var(--ar-lg)',
            overflow: 'hidden',
          }}
          className="kpi-grid"
        >
          {KPI_ITEMS.map((item) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              style={{
                background: 'var(--apple-white)',
                padding: '36px 28px',
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
          .kpi-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
