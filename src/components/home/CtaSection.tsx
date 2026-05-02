import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

export default function CtaSection() {
  return (
    /* Apple: full-bleed dark tile — near-black surface, white text, pill CTA */
    <section style={{ background: 'var(--apple-surface-dark)', padding: 'var(--as-section) 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto' }}>
            <h2
              style={{
                fontFamily: 'var(--font-apple)',
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 600,
                color: '#f5f5f7',
                lineHeight: 1.1,
                letterSpacing: '-1px',
                marginBottom: '16px',
              }}
            >
              지금 바로 무료 상담 · 견적 문의
            </h2>
            <p style={{
              fontFamily: 'var(--font-apple)',
              fontSize: '17px',
              fontWeight: 400,
              color: 'var(--apple-mid)',
              lineHeight: 1.6,
              marginBottom: '36px',
            }}>
              면적과 용도만 알려주시면 최적 모델과 견적을 빠르게 제안해 드립니다.
            </p>

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {/* Apple primary: pill-shaped blue */}
              <motion.div whileHover={{ opacity: 0.85 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/products/excellence"
                  style={{
                    background: 'var(--apple-blue)',
                    color: '#fff',
                    padding: '12px 28px',
                    borderRadius: 'var(--ar-pill)',
                    fontFamily: 'var(--font-apple)',
                    fontWeight: 400,
                    fontSize: '17px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    transition: 'opacity 0.15s',
                  }}
                >
                  제품 카탈로그 보기
                </Link>
              </motion.div>

              {/* Apple secondary: same blue, no fill */}
              <motion.div whileHover={{ opacity: 0.75 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="tel:16882520"
                  style={{
                    background: 'transparent',
                    color: 'var(--apple-blue)',
                    padding: '12px 28px',
                    borderRadius: 'var(--ar-pill)',
                    fontFamily: 'var(--font-apple)',
                    fontWeight: 400,
                    fontSize: '17px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    textDecoration: 'none',
                    transition: 'opacity 0.15s',
                  }}
                >
                  1688-2520 전화하기 ›
                </a>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
