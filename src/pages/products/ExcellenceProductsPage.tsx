import { Link, useOutletContext } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';
import ScrollReveal from '../../components/ui/ScrollReveal';
import ExcellenceProductCard from '../../components/ui/ExcellenceProductCard';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';
import type { CmsState } from '../../types/cms';

// 조달 3단계 프로세스
const PROCUREMENT_STEPS = [
  {
    step: '01',
    icon: '🏛️',
    title: '나라장터 검색',
    desc: '조달청 나라장터에서\n"썬레이텍" 또는 제품식별번호로 검색',
  },
  {
    step: '02',
    icon: '📋',
    title: '견적·상담 요청',
    desc: '전화 또는 온라인 문의로\n맞춤 견적 및 기술 상담 진행',
  },
  {
    step: '03',
    icon: '✅',
    title: '수의계약 체결',
    desc: '우수제품 수의계약으로\n입찰 없이 간편하게 구매 가능',
  },
];

export default function ExcellenceProductsPage() {
  const { products } = useOutletContext<CmsState>();
  const excellenceProducts = products.filter((product) => product.productLine === 'excellent');

  return (
    <div>
      <SubHero
        breadcrumb={[{ label: '제품안내', to: '/products' }, { label: '조달청 우수제품' }]}
        badge="Government Procurement"
        title="정부조달 우수제품"
        lead="조달청이 기술력·품질·사후관리를 심사해 선정하는 최고 권위의 조달 인증 제품입니다. 매립형과 노출형을 모델별로 비교해 보세요."
        keywords={['2013·2019·2025 지정', '조달청 수의계약', '매립형·노출형', '나라장터 검색']}
      />
      {/* ── 제품 그리드 ──────────────────────────────────────────────── */}
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
                우수제품 라인업
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
                총 {excellenceProducts.length}개 모델
              </span>
            </div>
          </ScrollReveal>

          {/* 카드 그리드 */}
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
            {excellenceProducts.map((product) => (
              <motion.div key={product.id} variants={staggerItem}>
                <ExcellenceProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 조달 정보 섹션 ───────────────────────────────────────────── */}
      <section style={{ background: '#fff', padding: '72px 0' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p
              style={{
                fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: 'var(--red)', marginBottom: '10px',
              }}
            >
              Procurement Guide
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.4rem, 3vw, 1.9rem)',
                fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2,
              }}
            >
              조달 구매 절차 안내
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--gray)', marginTop: '10px' }}>
              우수제품 수의계약은 복잡한 입찰 없이 3단계로 간편하게 진행됩니다.
            </p>
          </ScrollReveal>

          {/* 3단계 인포그래픽 */}
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
            {PROCUREMENT_STEPS.map((s, i) => (
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
                {/* 연결 화살표 (마지막 제외) */}
                {i < PROCUREMENT_STEPS.length - 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '50%',
                      right: '-16px',
                      transform: 'translateY(-50%)',
                      fontSize: '20px',
                      color: 'var(--red)',
                      zIndex: 1,
                      display: 'block',
                    }}
                    className="step-arrow"
                  >
                    →
                  </div>
                )}

                <div
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    background: 'var(--navy)', color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '22px', margin: '0 auto 16px',
                    boxShadow: '0 4px 16px rgba(10,22,40,0.2)',
                  }}
                >
                  {s.icon}
                </div>
                <div
                  style={{
                    fontSize: '11px', fontWeight: 700, color: 'var(--red)',
                    letterSpacing: '1px', marginBottom: '8px',
                  }}
                >
                  STEP {s.step}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--navy)', marginBottom: '10px' }}>
                  {s.title}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.7, whiteSpace: 'pre-line', margin: 0 }}>
                  {s.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA 버튼 2개 */}
          <ScrollReveal variants={fadeInUp}>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a
                href="https://shop.g2b.go.kr"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(10,22,40,0.25)' }}
                whileTap={{ scale: 0.97 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '10px',
                  background: 'var(--navy)', color: '#fff',
                  fontSize: '14px', fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 4px 16px rgba(10,22,40,0.15)',
                }}
              >
                🏛️ 나라장터 바로가기
              </motion.a>
              <motion.div
                whileHover={{ scale: 1.04, boxShadow: '0 8px 32px rgba(200,57,43,0.3)' }}
                whileTap={{ scale: 0.97 }}
              >
                <a
                  href="tel:16882520"
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '14px 28px', borderRadius: '10px',
                    background: 'var(--red)', color: '#fff',
                    fontSize: '14px', fontWeight: 700, textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(200,57,43,0.2)',
                  }}
                >
                  📞 전화 문의하기
                </a>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── 다른 카테고리 바로가기 ──────────────────────────────────── */}
      <section style={{ background: 'var(--off)', padding: '56px 0' }}>
        <div className="container">
          <ScrollReveal variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy)' }}>
              다른 제품 카테고리
            </h3>
          </ScrollReveal>

          <div
            style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '20px', maxWidth: '700px', margin: '0 auto',
            }}
            className="category-grid"
          >
            {[
              {
                to: '/products',
                icon: '📋',
                title: '전체 제품 보기',
                desc: '현재 구현된 제품 목록과 스펙 비교 보기',
                color: 'var(--blue)',
              },
              {
                to: '/products/mas',
                icon: '📋',
                title: 'MAS 제품 보기',
                desc: '다수공급자계약(MAS) 라인업과 모델 구분 확인',
                color: 'var(--blue)',
              },
            ].map((cat) => (
              <div key={cat.to}>
              <ScrollReveal variants={fadeInUp}>
                <motion.div
                  whileHover={{ y: -4, boxShadow: '0 12px 36px rgba(0,0,0,0.14)' }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    to={cat.to}
                    style={{
                      display: 'block', textDecoration: 'none',
                      background: '#fff', borderRadius: '14px',
                      padding: '28px 24px', border: '1px solid var(--border)',
                      boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    }}
                  >
                    <div style={{ fontSize: '28px', marginBottom: '12px' }}>{cat.icon}</div>
                    <div
                      style={{
                        fontSize: '15px', fontWeight: 800,
                        color: 'var(--navy)', marginBottom: '6px',
                      }}
                    >
                      {cat.title}
                    </div>
                    <p style={{ fontSize: '13px', color: 'var(--gray)', margin: 0, lineHeight: 1.5 }}>
                      {cat.desc}
                    </p>
                    <div
                      style={{
                        marginTop: '16px', fontSize: '12px', fontWeight: 700,
                        color: cat.color,
                      }}
                    >
                      제품 보기 →
                    </div>
                  </Link>
                </motion.div>
              </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .product-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .steps-grid   { grid-template-columns: 1fr !important; }
          .step-arrow   { display: none !important; }
        }
        @media (max-width: 560px) {
          .product-grid  { grid-template-columns: 1fr !important; }
          .category-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
