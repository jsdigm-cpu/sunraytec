import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

// SVG 아이콘 컴포넌트들
const IconDust = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
    <path d="M12 20 Q16 14 20 20 Q24 26 28 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <line x1="20" y1="10" x2="20" y2="10.1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="14" cy="15" r="1.5" fill="currentColor" opacity="0.5" />
    <circle cx="26" cy="25" r="1" fill="currentColor" opacity="0.5" />
    <path d="M16 23 L18 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    <path d="M22 19 L24 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
    {/* 금지 사선 */}
    <line x1="10" y1="10" x2="30" y2="30" stroke="var(--red-light)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const IconEMF = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path d="M20 8 L20 32" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
    <path d="M8 20 Q12 12 20 12 Q28 12 32 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M11 25 Q15 17 20 17 Q25 17 29 25" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
    <circle cx="20" cy="30" r="2.5" fill="currentColor" />
    {/* 금지 사선 */}
    <line x1="10" y1="10" x2="30" y2="30" stroke="var(--red-light)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const IconFire = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path
      d="M20 6 C20 6 26 12 26 18 C26 22 24 24 22 24 C23 21 22 18 20 16 C20 20 18 22 17 24 C15 24 14 22 14 18 C14 12 20 6 20 6Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"
    />
    <path
      d="M15 28 C15 25 17 23 20 23 C23 23 25 25 25 28 C25 31 23 33 20 33 C17 33 15 31 15 28Z"
      stroke="currentColor" strokeWidth="1.5" fill="none"
    />
    {/* 금지 사선 */}
    <line x1="10" y1="10" x2="30" y2="30" stroke="var(--red-light)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const IconDew = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
    <path
      d="M20 8 C20 8 12 18 12 24 C12 29.5 15.6 33 20 33 C24.4 33 28 29.5 28 24 C28 18 20 8 20 8Z"
      stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none"
    />
    <path d="M15 25 Q18 22 20 25 Q22 28 25 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.6" />
    {/* 금지 사선 */}
    <line x1="10" y1="10" x2="30" y2="30" stroke="var(--red-light)" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
  </svg>
);

const ZERO_ITEMS = [
  {
    Icon: IconDust,
    title: '분진 비산 저감',
    desc: '팬으로 공기를 강제 순환시키지 않는 복사난방 방식으로 분진과 미세먼지 비산을 줄입니다. 식품공장·의약품 창고·정밀 작업장처럼 무풍 환경이 중요한 공간에 적합합니다.',
    hoverBg: 'rgba(200,57,43,0.15)',
  },
  {
    Icon: IconEMF,
    title: '전파 적합등록',
    desc: '국립전파연구원 방송통신기자재 적합등록을 보유한 전기스토브 제품군으로, 공공·산업 현장에서 요구하는 전기·전파 관련 검토 자료를 제공합니다.',
    hoverBg: 'rgba(26,58,107,0.25)',
  },
  {
    Icon: IconFire,
    title: '방폭 안전성',
    desc: '개방형 화염이 없는 전기 복사난방 방식이며, 방폭 인증(EX emb II T1) 제품군을 통해 탄약고·도장공장·화학창고 등 위험물 취급 현장 검토에 대응합니다.',
    hoverBg: 'rgba(230,126,34,0.18)',
  },
  {
    Icon: IconDew,
    title: '결로 저감',
    desc: '복사열이 벽·바닥 표면을 직접 가열해 표면 온도 관리에 유리합니다. 항만 창고·냉동 물류 인접 공간·지하 시설 등 결로 우려 현장의 난방 대안으로 검토할 수 있습니다.',
    hoverBg: 'rgba(46,125,50,0.18)',
  },
];

export default function ZeroSection() {
  return (
    <section style={{ background: 'var(--navy)', padding: '72px 0' }}>
      <div className="container">
        {/* 섹션 헤더 */}
        <ScrollReveal variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--amber2)',
              marginBottom: '12px',
            }}
          >
            Core Technology
          </p>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '2px',
              color: '#fff',
              lineHeight: 1.1,
            }}
          >
            4대 <span style={{ color: 'var(--red-light)' }}>검증 포인트</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', marginTop: '10px', fontSize: '0.9rem' }}>
            썬레이텍 원적외선 복사난방이 현장에서 검토되는 네 가지 기준
          </p>
        </ScrollReveal>

        {/* 카드 4개 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
          className="zero-grid"
        >
          {ZERO_ITEMS.map(({ Icon, title, desc, hoverBg }) => (
            <motion.div
              key={title}
              variants={staggerItem}
              whileHover={{
                y: -6,
                background: hoverBg,
                borderTopColor: 'var(--amber2)',
                transition: { duration: 0.2 },
              }}
              style={{
                background: 'rgba(255,255,255,.06)',
                border: '1px solid rgba(255,255,255,.1)',
                borderRadius: '14px',
                padding: '28px 22px',
                borderTop: '4px solid var(--red)',
                cursor: 'default',
              }}
            >
              {/* SVG 아이콘 */}
              <motion.div
                whileHover={{ rotate: 8, scale: 1.1 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '52px',
                  height: '52px',
                  borderRadius: '12px',
                  background: 'rgba(255,255,255,.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '16px',
                  color: '#fff',
                }}
              >
                <Icon />
              </motion.div>

              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.4rem',
                  letterSpacing: '1px',
                  color: '#fff',
                  marginBottom: '10px',
                }}
              >
                {title}
              </h3>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,.6)', lineHeight: 1.8 }}>
                {desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .zero-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .zero-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
