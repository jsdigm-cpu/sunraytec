import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

export default function CtaSection() {
  return (
    <section
      style={{
        background:
          'radial-gradient(circle at 18% 12%, rgba(251,191,36,0.22), transparent 30%), linear-gradient(135deg, var(--red-dark) 0%, #7F1D1D 100%)',
        padding: '68px 0',
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
                현장 조건에 맞는 모델부터 확인해 드립니다
              </h2>
              <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.75)', lineHeight: 1.7 }}>
                면적, 천장 높이, 설치 환경을 알려주시면 적정 용량과 조달 검토 방향을 함께 안내해 드립니다.
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
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                  }}
                >
                  우수제품 보기
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
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.95rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  1688-2520
                </a>
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
