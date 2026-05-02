import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';

const KPI_ITEMS = [
  {
    suffix: '%',
    label: '소비전력량 절감',
    sub: 'KTR 난방성능 시험',
    countTo: 39.4,
    decimal: 1,
    prefix: '약 ',
    tint: 'var(--tint-lavender)',
    accent: 'var(--notion-purple)',
    icon: '⚡',
  },
  {
    suffix: '',
    label: '원적외선 방사율',
    sub: '2024 KTR 시험성적서',
    countTo: 0.91,
    decimal: 2,
    prefix: '',
    tint: 'var(--tint-sky)',
    accent: '#1D4ED8',
    icon: '🌡️',
  },
  {
    suffix: '%',
    label: '항균 성능',
    sub: '대장균·포도상구균',
    countTo: 99.9,
    decimal: 1,
    prefix: '',
    tint: 'var(--tint-mint)',
    accent: '#065F46',
    icon: '🛡️',
  },
  {
    suffix: '년+',
    label: '공공조달 납품',
    sub: '2013년 우수제품 지정 이후',
    countTo: 13,
    decimal: 0,
    prefix: '',
    tint: 'var(--tint-peach)',
    accent: '#9A3412',
    icon: '🏛️',
  },
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
    <div ref={ref} style={{ textAlign: 'left' }}>
      <div style={{
        fontSize: '24px',
        marginBottom: '12px',
        lineHeight: 1,
      }}>
        {item.icon}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-notion)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)',
          fontWeight: 600,
          color: item.accent,
          lineHeight: 1,
          letterSpacing: '-0.5px',
          marginBottom: '8px',
        }}
      >
        {item.prefix}{count.toFixed(item.decimal)}{item.suffix}
      </div>
      <div style={{
        fontFamily: 'var(--font-notion)',
        fontWeight: 600,
        fontSize: '15px',
        color: 'var(--charcoal)',
        marginBottom: '4px',
        lineHeight: 1.3,
      }}>
        {item.label}
      </div>
      <div style={{
        fontSize: '12px',
        color: 'var(--slate)',
        fontFamily: 'var(--font-notion)',
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
      background: 'var(--canvas)',
      padding: '72px 0',
      borderBottom: '1px solid var(--hairline)',
    }}>
      <div className="container">
        <ScrollReveal>
          <div style={{ marginBottom: '40px' }}>
            <p style={{
              fontFamily: 'var(--font-notion)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              color: 'var(--notion-purple)',
              marginBottom: '8px',
            }}>
              핵심 성능 지표
            </p>
            <h2 style={{
              fontFamily: 'var(--font-notion)',
              fontSize: 'clamp(1.6rem, 3vw, 2rem)',
              fontWeight: 600,
              color: 'var(--ink)',
              letterSpacing: '-0.5px',
              lineHeight: 1.2,
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
            gap: '12px',
          }}
          className="kpi-grid"
        >
          {KPI_ITEMS.map((item) => (
            <motion.div
              key={item.label}
              variants={staggerItem}
              style={{
                background: item.tint,
                borderRadius: 'var(--nr-lg)',
                padding: '28px 24px',
                cursor: 'default',
                border: '1px solid rgba(0,0,0,0.04)',
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
