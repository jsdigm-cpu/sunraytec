import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

export default function CtaSection() {
  return (
    <section style={{ background: 'var(--surface)', padding: '72px 0', borderTop: '1px solid var(--hairline)' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp}>
          {/* Notion yellow-bold high-emphasis banner */}
          <div
            style={{
              background: 'var(--tint-yellow-bold)',
              borderRadius: 'var(--nr-xl)',
              padding: '48px 52px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              flexWrap: 'wrap',
            }}
            className="cta-inner"
          >
            <div>
              <p style={{
                fontFamily: 'var(--font-notion)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: 'var(--charcoal)',
                opacity: 0.6,
                marginBottom: '8px',
              }}>
                무료 상담 · 견적 문의
              </p>
              <h2
                style={{
                  fontFamily: 'var(--font-notion)',
                  fontSize: 'clamp(1.4rem, 3vw, 2rem)',
                  fontWeight: 600,
                  color: 'var(--ink-deep)',
                  lineHeight: 1.2,
                  letterSpacing: '-0.5px',
                  marginBottom: '10px',
                }}
              >
                지금 바로 최적 모델과 견적을 받아보세요
              </h2>
              <p style={{
                fontFamily: 'var(--font-notion)',
                fontSize: '14px',
                color: 'var(--charcoal)',
                lineHeight: 1.6,
                opacity: 0.75,
              }}>
                면적과 용도만 알려주시면 빠르게 제안해 드립니다.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', flexShrink: 0 }}>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/products/excellence"
                  style={{
                    background: 'var(--notion-purple)',
                    color: '#fff',
                    padding: '10px 22px',
                    borderRadius: 'var(--nr-md)',
                    fontFamily: 'var(--font-notion)',
                    fontWeight: 500,
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
                    transition: 'background 0.15s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--notion-purple-pressed)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--notion-purple)')}
                >
                  우수제품 보기
                </Link>
              </motion.div>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="tel:16882520"
                  style={{
                    background: 'transparent',
                    color: 'var(--ink)',
                    border: '1px solid var(--hairline-strong)',
                    padding: '10px 22px',
                    borderRadius: 'var(--nr-md)',
                    fontFamily: 'var(--font-notion)',
                    fontWeight: 500,
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                  }}
                >
                  1688-2520 전화
                </a>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .cta-inner {
            padding: 32px 24px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}
