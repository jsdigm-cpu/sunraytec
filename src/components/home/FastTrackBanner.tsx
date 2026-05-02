import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../ui/ScrollReveal';
import { slideInLeft, slideInRight } from '../../utils/animations';

const PERKS = [
  '일위대가표 즉시 다운로드',
  '도면·CAD 원본 제공',
  '제안서 양식 일괄 다운',
  '다이렉트 전담 상담',
];

export default function FastTrackBanner() {
  return (
    /* Apple: alternating parchment tile (light after the dark CTA section) */
    <section style={{ background: 'var(--apple-parchment)', padding: 'var(--as-section) 0' }}>
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '48px',
            flexWrap: 'wrap',
          }}
          className="fasttrack-inner"
        >
          <ScrollReveal variants={slideInLeft} style={{ flex: 1, minWidth: '280px' }}>
            <p style={{
              fontFamily: 'var(--font-apple)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: 'var(--apple-blue)',
              marginBottom: '12px',
            }}>
              공공기관 전용
            </p>
            <h2 style={{
              fontFamily: 'var(--font-apple)',
              fontSize: 'clamp(1.5rem, 2.8vw, 2rem)',
              fontWeight: 600,
              color: 'var(--apple-near-black)',
              lineHeight: 1.15,
              letterSpacing: '-0.5px',
              marginBottom: '14px',
            }}>
              패스트트랙 라운지
            </h2>
            <p style={{
              fontFamily: 'var(--font-apple)',
              fontSize: '17px',
              fontWeight: 400,
              color: 'var(--apple-mid)',
              lineHeight: 1.65,
              maxWidth: '480px',
            }}>
              <strong style={{ color: 'var(--apple-near-black)', fontWeight: 500 }}>
                공공기관 이메일 (.go.kr · .mil.kr · .edu)
              </strong>로 인증하면 일위대가표 · 도면 원본 · 제안서 양식을 원클릭으로 받아보실 수 있습니다.
            </p>
          </ScrollReveal>

          <ScrollReveal variants={slideInRight} style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '24px' }}>
              {PERKS.map((item) => (
                <div key={item} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  fontFamily: 'var(--font-apple)',
                  fontSize: '15px',
                  color: 'var(--apple-near-black)',
                }}>
                  {/* Apple-style checkmark in blue */}
                  <span style={{ color: 'var(--apple-blue)', fontWeight: 500, fontSize: '16px' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>

            <motion.div whileHover={{ opacity: 0.8 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/fasttrack"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  background: 'var(--apple-blue)',
                  color: '#fff',
                  padding: '12px 28px',
                  borderRadius: 'var(--ar-pill)',
                  fontFamily: 'var(--font-apple)',
                  fontWeight: 400,
                  fontSize: '17px',
                  textDecoration: 'none',
                  transition: 'opacity 0.15s',
                }}
              >
                라운지 입장하기
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .fasttrack-inner { flex-direction: column !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  );
}
