import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

export default function CtaSection() {
  return (
    <section
      style={{
        background: 'linear-gradient(90deg, var(--red-dark) 0%, var(--red) 100%)',
        padding: '64px 0',
      }}
    >
      <div className="container">
        <ScrollReveal variants={fadeInUp}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '32px',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)',
                  fontWeight: 900,
                  color: '#fff',
                  lineHeight: 1.25,
                  marginBottom: '8px',
                }}
              >
                지금 바로 무료 상담 · 견적 문의
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.75)', lineHeight: 1.7 }}>
                면적과 용도만 알려주시면 최적 모델과 견적을 빠르게 제안해 드립니다.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', flexShrink: 0 }}>
              <motion.div whileHover={{ scale: 1.06, y: -2 }} whileTap={{ scale: 0.97 }}>
                <Link
                  to="/products/excellence"
                  style={{
                    background: '#fff',
                    color: 'var(--red)',
                    padding: '13px 26px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  }}
                >
                  📦 우수제품 보기
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="tel:16882520"
                  style={{
                    background: 'rgba(255,255,255,.18)',
                    color: '#fff',
                    border: '1px solid rgba(255,255,255,.35)',
                    padding: '13px 26px',
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  📞 1688-2520
                </a>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
