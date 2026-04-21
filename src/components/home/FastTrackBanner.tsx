import { motion } from 'motion/react';
import ScrollReveal from '../ui/ScrollReveal';
import { slideInLeft, slideInRight } from '../../utils/animations';

export default function FastTrackBanner() {
  return (
    <section
      style={{
        background: 'linear-gradient(135deg, #3B0764 0%, #1A3A6B 100%)',
        padding: '56px 0',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap',
          }}
        >
          {/* 왼쪽 텍스트 */}
          <ScrollReveal variants={slideInLeft} style={{ flex: 1, minWidth: '280px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255,255,255,.12)',
                border: '1px solid rgba(255,255,255,.2)',
                borderRadius: '999px',
                padding: '4px 14px',
                fontSize: '11px',
                fontWeight: 700,
                color: 'rgba(255,255,255,.8)',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}
            >
              🔐 공공기관 전용
            </div>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 900,
                color: '#fff',
                lineHeight: 1.25,
                marginBottom: '10px',
              }}
            >
              패스트트랙 라운지
            </h2>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,.65)', lineHeight: 1.8, maxWidth: '520px' }}>
              <strong style={{ color: 'rgba(255,255,255,.9)' }}>공공기관 이메일(.go.kr · .mil.kr · .edu)</strong>로
              인증하면 일위대가표 · 도면 원본 · 제안서 양식을{' '}
              <strong style={{ color: 'var(--amber2)' }}>원클릭</strong>으로 받아보실 수 있습니다.
            </p>
          </ScrollReveal>

          {/* 오른쪽 혜택 + 버튼 */}
          <ScrollReveal variants={slideInRight} style={{ flexShrink: 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
              {['일위대가표 즉시 다운로드', '도면·CAD 원본 제공', '제안서 양식 일괄 다운', '다이렉트 전담 상담'].map(
                (item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,.8)' }}>
                    <span style={{ color: 'var(--amber2)', fontSize: '15px' }}>✓</span>
                    {item}
                  </div>
                )
              )}
            </div>
            <motion.a
              href="/fasttrack"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#fff',
                color: '#3B0764',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              🚀 라운지 입장하기
            </motion.a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
