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
    <section style={{ background: 'var(--canvas)', padding: '64px 0', borderTop: '1px solid var(--hairline)' }}>
      <div className="container">
        {/* Notion navy dark band */}
        <div
          style={{
            background: 'var(--notion-navy)',
            borderRadius: 'var(--nr-xl)',
            padding: '48px 52px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap',
            position: 'relative',
            overflow: 'hidden',
          }}
          className="fasttrack-inner"
        >
          {/* Subtle purple glow */}
          <div style={{
            position: 'absolute',
            top: '-40px',
            right: '-40px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(124,58,237,0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }} />

          <ScrollReveal variants={slideInLeft} style={{ flex: 1, minWidth: '280px', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(124,58,237,0.2)',
              border: '1px solid rgba(124,58,237,0.4)',
              borderRadius: 'var(--nr-full)',
              padding: '4px 14px',
              fontSize: '11px',
              fontWeight: 600,
              color: '#C4B5FD',
              letterSpacing: '1px',
              textTransform: 'uppercase',
              marginBottom: '16px',
              fontFamily: 'var(--font-notion)',
            }}>
              공공기관 전용
            </div>
            <h2 style={{
              fontFamily: 'var(--font-notion)',
              fontSize: 'clamp(1.4rem, 2.8vw, 1.875rem)',
              fontWeight: 600,
              color: 'var(--on-dark)',
              lineHeight: 1.2,
              letterSpacing: '-0.5px',
              marginBottom: '10px',
            }}>
              패스트트랙 라운지
            </h2>
            <p style={{
              fontFamily: 'var(--font-notion)',
              fontSize: '14px',
              color: 'var(--on-dark-muted)',
              lineHeight: 1.7,
              maxWidth: '480px',
            }}>
              <strong style={{ color: 'rgba(255,255,255,.85)', fontWeight: 500 }}>공공기관 이메일 (.go.kr · .mil.kr · .edu)</strong>로
              인증하면 일위대가표 · 도면 원본 · 제안서 양식을 원클릭으로 받아보실 수 있습니다.
            </p>
          </ScrollReveal>

          <ScrollReveal variants={slideInRight} style={{ flexShrink: 0, position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {PERKS.map((item) => (
                <div key={item} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13px',
                  color: 'var(--on-dark-muted)',
                  fontFamily: 'var(--font-notion)',
                }}>
                  <span style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    background: 'rgba(124,58,237,0.3)',
                    border: '1px solid rgba(124,58,237,0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: '#C4B5FD',
                    flexShrink: 0,
                  }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
            <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/fasttrack"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--on-dark)',
                  color: 'var(--ink)',
                  padding: '10px 22px',
                  borderRadius: 'var(--nr-md)',
                  fontFamily: 'var(--font-notion)',
                  fontWeight: 500,
                  fontSize: '14px',
                  textDecoration: 'none',
                }}
              >
                라운지 입장하기 →
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .fasttrack-inner {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
