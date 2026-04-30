import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';
import ScrollReveal from '../../components/ui/ScrollReveal';
import ExcellenceProductCard from '../../components/ui/ExcellenceProductCard';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';
import type { CmsState } from '../../types/cms';

const MAS_STEPS = [
  {
    step: '01',
    icon: '🔎',
    title: '종합쇼핑몰 확인',
    desc: '나라장터 종합쇼핑몰에서\nMAS 제품 식별번호를 확인합니다.',
  },
  {
    step: '02',
    icon: '📄',
    title: '규격·수량 협의',
    desc: '현장 용도와 설치 방식에 맞는\n모델과 수량을 협의합니다.',
  },
  {
    step: '03',
    icon: '🤝',
    title: '계약 및 납품',
    desc: '다수공급자계약 절차에 맞춰\n구매를 진행합니다.',
  },
];

export default function MasProductsPage() {
  const { products } = useOutletContext<CmsState>();
  const masProducts = products.filter((product) => product.productLine === 'mas');

  return (
    <div>
      <SubHero
        breadcrumb={[{ label: '제품안내', to: '/products' }, { label: 'MAS 다수공급자' }]}
        badge="MAS Contract"
        title="MAS 다수공급자 제품"
        lead="나라장터 종합쇼핑몰 MAS 계약 기준으로 정리한 제품군입니다. 매립형과 노출형을 모델별로 나눠 바로 비교할 수 있습니다."
      />

      <section style={{ background: 'var(--off)', padding: '72px 0' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <h2
                style={{
                  fontSize: 'clamp(1.4rem, 3vw, 1.8rem)',
                  fontWeight: 900,
                  color: 'var(--navy)',
                }}
              >
                MAS 다수공급자계약 제품
              </h2>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 600,
                  color: 'var(--gray)',
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '2px 12px',
                }}
              >
                총 {masProducts.length}개 모델
              </span>
            </div>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="product-grid"
          >
            {masProducts.map((product) => (
              <motion.div key={product.id} variants={staggerItem}>
                <ExcellenceProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p
              style={{
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: 'var(--blue)',
                marginBottom: '10px',
              }}
            >
              MAS Guide
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                fontWeight: 900,
                color: 'var(--navy)',
                lineHeight: 1.2,
              }}
            >
              MAS 구매 절차 안내
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--gray)', marginTop: '10px' }}>
              다수공급자계약 제품은 규격 확인과 수량 협의 후 종합쇼핑몰 구매 절차에 따라 진행합니다.
            </p>
          </ScrollReveal>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
              marginBottom: '48px',
              position: 'relative',
            }}
            className="steps-grid"
          >
            {MAS_STEPS.map((s, i) => (
              <motion.div
                key={s.step}
                variants={staggerItem}
                style={{
                  textAlign: 'center',
                  padding: '36px 24px',
                  borderRadius: '16px',
                  background: 'var(--off)',
                  border: '1px solid var(--border)',
                  position: 'relative',
                }}
              >
                {i < MAS_STEPS.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '-16px',
                      transform: 'translateY(-50%)',
                      fontSize: '20px',
                      color: 'var(--blue)',
                      zIndex: 1,
                    }}
                    className="step-arrow"
                  >
                    →
                  </div>
                )}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'var(--blue)',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    margin: '0 auto 16px',
                    boxShadow: '0 4px 16px rgba(10,22,40,0.18)',
                  }}
                >
                  {s.icon}
                </div>
                <div style={{ fontSize: '11px', fontWeight: 700, color: 'var(--blue)', letterSpacing: '1px', marginBottom: '8px' }}>
                  STEP {s.step}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px' }}>{s.title}</div>
                <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.7, whiteSpace: 'pre-line', margin: 0 }}>{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <ScrollReveal variants={fadeInUp}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="https://shop.g2b.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(10,22,40,0.25)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  background: 'var(--navy)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(10,22,40,0.15)',
                }}
              >
                📋 종합쇼핑몰 바로가기
              </motion.a>
              <motion.a
                href="tel:16882520"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(200,57,43,0.3)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '14px 28px',
                  borderRadius: '10px',
                  background: 'var(--red)',
                  color: '#fff',
                  fontSize: '14px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(200,57,43,0.2)',
                }}
              >
                📞 전화 문의하기
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .step-arrow { display: none !important; }
        }
        @media (max-width: 560px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
