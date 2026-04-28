import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

interface ComparisonRow {
  label: string;
  radiant: string;
  convection: string;
  highlight?: boolean;
}

const COMPARISON: ComparisonRow[] = [
  { label: '난방 방식', radiant: '복사 — 물체·사람을 직접 가열', convection: '대류 — 공기를 데워서 순환' },
  { label: '체감 속도', radiant: '점등 즉시 따뜻함 (수 초)', convection: '실내 공기 온도 상승 후 (수십 분)', highlight: true },
  { label: '고천장 효율', radiant: '천장 높이 영향 적음', convection: '뜨거운 공기 상승으로 손실 큼', highlight: true },
  { label: '공기 흐름', radiant: '공기 이동 거의 없음', convection: '먼지·바이러스 확산 가능' },
  { label: '결로 / 곰팡이', radiant: '벽·바닥 표면 온도 상승으로 억제', convection: '온도차로 결로 발생' },
  { label: '에너지 효율', radiant: '필요 구역만 국소 난방 가능', convection: '공간 전체 가열 필수' },
  { label: '소음', radiant: '무소음 (송풍 없음)', convection: '팬·송풍기 소음' },
  { label: '유지보수', radiant: '구동부 없음 — 반영구', convection: '필터·팬·열교환기 정기 점검' },
];

const PRINCIPLE_STEPS = [
  {
    step: '01',
    title: '전기 에너지 입력',
    desc: '발열체에 전기를 인가하면 고온의 표면이 형성되며, 이 표면에서 원적외선이 방출됩니다.',
    icon: '⚡',
  },
  {
    step: '02',
    title: '원적외선 복사',
    desc: '파장 4~1000μm의 원적외선이 직진하며, 공기를 거의 가열하지 않고 멀리 도달합니다.',
    icon: '☀️',
  },
  {
    step: '03',
    title: '물체·인체 흡수',
    desc: '복사파는 사람·바닥·벽·기계 등 물체에 직접 흡수되어 분자 진동을 일으키며 즉시 따뜻함을 느끼게 합니다.',
    icon: '🎯',
  },
  {
    step: '04',
    title: '재방출 — 공간 보온',
    desc: '데워진 물체가 다시 열을 방출해 실내 전체를 균일하게 따뜻하게 유지합니다.',
    icon: '♻️',
  },
];

const ADVANTAGES = [
  {
    icon: '🏭',
    title: '고천장·대공간 적합',
    desc: '천장이 높아 대류난방의 열손실이 큰 물류센터·체육관·공장에서 복사난방은 손실 없이 사람과 작업면을 직접 데웁니다.',
  },
  {
    icon: '💨',
    title: '국소 난방 가능',
    desc: '필요한 구역만 선택적으로 난방하여 에너지 절감. 작업자 위치, 계산대, 출입구 등 핀포인트 적용이 가능합니다.',
  },
  {
    icon: '🦠',
    title: '항균·결로 방지',
    desc: '바닥·벽 표면 온도를 균일하게 유지해 결로와 곰팡이 발생을 억제하고, 공기 순환이 적어 먼지·바이러스 확산을 줄입니다.',
  },
  {
    icon: '🔇',
    title: '무소음 · 무바람',
    desc: '팬이나 송풍기가 없어 소음·먼지·기류가 발생하지 않습니다. 학교, 사무실, 카페에 적합합니다.',
  },
  {
    icon: '🛠️',
    title: '유지보수 최소화',
    desc: '구동부가 없어 반영구적이며, 필터 청소·팬 교체 등 정기 점검 비용이 거의 발생하지 않습니다.',
  },
  {
    icon: '🌱',
    title: '저탄소 · 친환경',
    desc: '연소 과정이 없어 CO₂·NOx 등 배기가스 배출이 없으며, 신재생 전력과 결합하면 완전 무탄소 난방이 가능합니다.',
  },
];

const APPLICATIONS = [
  { icon: '🏛️', label: '공공·교육시설', desc: '학교 급식실·체육관, 어린이집, 행정청사' },
  { icon: '🏭', label: '산업·물류', desc: '물류센터, 공장 작업장, 창고' },
  { icon: '⚔️', label: '국방·특수', desc: '군 정비창, 격납고, 방폭 환경' },
  { icon: '🏢', label: '상업·라이프스타일', desc: '카페, 매장 계산대, 옥상정원' },
];

export default function PrinciplePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      {/* ① Sub-Hero */}
      <section
        style={{
          background: 'linear-gradient(160deg, var(--navy) 0%, #152035 60%, #0E1E3A 100%)',
          padding: '56px 0 64px',
        }}
      >
        <div className="container">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: 'rgba(255,255,255,0.45)',
                marginBottom: '20px',
              }}
            >
              <Link to="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                홈
              </Link>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>기술·솔루션</span>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>복사난방 원리</span>
            </div>
            <h1
              style={{
                fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                fontWeight: 800,
                color: '#fff',
                marginBottom: '12px',
                lineHeight: 1.2,
              }}
            >
              복사난방 원리
            </h1>
            <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.6)', maxWidth: '640px', lineHeight: 1.6 }}>
              공기를 데우지 않고 사람과 물체를 직접 따뜻하게.
              <br />
              원적외선 복사난방의 과학적 원리와 대류난방과의 차이를 정리했습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ② 복사 vs 대류 핵심 비교 */}
      <section style={{ padding: '72px 0', background: '#F7F9FC' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--red)',
                letterSpacing: '3px',
                fontSize: '0.85rem',
                marginBottom: '8px',
              }}
            >
              Radiant vs Convection
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--navy)' }}>
              복사난방 vs 대류난방
            </h2>
            <p style={{ color: '#5B6473', marginTop: '10px', fontSize: '0.95rem' }}>
              두 방식은 같은 "난방"이지만, 열을 전달하는 메커니즘이 근본적으로 다릅니다.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            style={{
              background: '#fff',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 8px 24px rgba(15,34,65,0.06)',
              border: '1px solid #E5E9F0',
            }}
          >
            {/* 헤더 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.1fr 1.4fr 1.4fr',
                background: 'var(--navy)',
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
              className="compare-header"
            >
              <div style={{ padding: '14px 18px' }}>구분</div>
              <div style={{ padding: '14px 18px', background: 'rgba(255,255,255,0.05)' }}>☀️ 복사난방 (썬레이텍)</div>
              <div style={{ padding: '14px 18px' }}>💨 대류난방</div>
            </div>

            {COMPARISON.map((row, idx) => (
              <motion.div
                key={row.label}
                variants={itemVariant}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1.1fr 1.4fr 1.4fr',
                  borderTop: idx === 0 ? 'none' : '1px solid #EEF1F6',
                  background: row.highlight ? '#FFFBF0' : '#fff',
                  fontSize: '0.92rem',
                }}
                className="compare-row"
              >
                <div style={{ padding: '14px 18px', fontWeight: 700, color: 'var(--navy)' }}>{row.label}</div>
                <div style={{ padding: '14px 18px', color: '#1F3759', borderLeft: '3px solid var(--red)' }}>
                  {row.radiant}
                </div>
                <div style={{ padding: '14px 18px', color: '#5B6473' }}>{row.convection}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ③ 작동 원리 4단계 */}
      <section style={{ padding: '80px 0', background: '#fff' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--red)',
                letterSpacing: '3px',
                fontSize: '0.85rem',
                marginBottom: '8px',
              }}
            >
              How It Works
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--navy)' }}>
              원적외선 복사난방 4단계 작동 원리
            </h2>
            <p style={{ color: '#5B6473', marginTop: '10px', fontSize: '0.95rem' }}>
              전기 에너지가 사람과 공간의 따뜻함이 되기까지
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '20px',
            }}
          >
            {PRINCIPLE_STEPS.map(({ step, title, desc, icon }) => (
              <motion.div
                key={step}
                variants={itemVariant}
                style={{
                  background: '#F7F9FC',
                  border: '1px solid #E5E9F0',
                  borderTop: '4px solid var(--red)',
                  borderRadius: '14px',
                  padding: '28px 22px',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    color: 'var(--red)',
                    fontSize: '2rem',
                    letterSpacing: '2px',
                    marginBottom: '10px',
                  }}
                >
                  {step}
                </div>
                <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>
                  {title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#5B6473', lineHeight: 1.55 }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ④ 6대 핵심 강점 */}
      <section
        style={{
          padding: '80px 0',
          background: 'linear-gradient(180deg, #0F2241 0%, #152035 100%)',
        }}
      >
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '48px' }}
          >
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--red-light)',
                letterSpacing: '3px',
                fontSize: '0.85rem',
                marginBottom: '8px',
              }}
            >
              Why Radiant Heating
            </p>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#fff' }}>
              복사난방이 답인 이유
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', marginTop: '10px', fontSize: '0.95rem' }}>
              공공기관·산업현장·교육시설에서 검증된 6대 핵심 강점
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '18px',
            }}
          >
            {ADVANTAGES.map(({ icon, title, desc }) => (
              <motion.div
                key={title}
                variants={itemVariant}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  padding: '26px 22px',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '14px' }}>{icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55 }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⑤ 적용 분야 */}
      <section style={{ padding: '72px 0', background: '#fff' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--red)',
                letterSpacing: '3px',
                fontSize: '0.85rem',
                marginBottom: '8px',
              }}
            >
              Applications
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: 'var(--navy)' }}>
              어디에 적용되나요?
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '16px',
            }}
          >
            {APPLICATIONS.map(({ icon, label, desc }) => (
              <motion.div
                key={label}
                variants={itemVariant}
                style={{
                  background: '#F7F9FC',
                  border: '1px solid #E5E9F0',
                  borderRadius: '12px',
                  padding: '22px 20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2.2rem', marginBottom: '10px' }}>{icon}</div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--navy)', marginBottom: '6px' }}>
                  {label}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#5B6473', lineHeight: 1.5 }}>{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ⑥ CTA */}
      <section
        style={{
          padding: '64px 0',
          background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE9D1 100%)',
        }}
      >
        <div className="container" style={{ textAlign: 'center' }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
            <h2 style={{ fontSize: 'clamp(1.4rem, 2.6vw, 1.9rem)', fontWeight: 800, color: 'var(--navy)', marginBottom: '12px' }}>
              현장에 맞는 복사난방 솔루션을 찾고 계신가요?
            </h2>
            <p style={{ color: '#5B6473', fontSize: '0.95rem', marginBottom: '28px', lineHeight: 1.6 }}>
              30년 경험의 썬레이텍 엔지니어가 공간·용도·예산에 맞춰 최적의 시스템을 제안합니다.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link
                to="/products"
                style={{
                  display: 'inline-block',
                  padding: '13px 28px',
                  background: 'var(--navy)',
                  color: '#fff',
                  borderRadius: '8px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                }}
              >
                제품 보러가기 →
              </Link>
              <Link
                to="/contact"
                style={{
                  display: 'inline-block',
                  padding: '13px 28px',
                  background: '#fff',
                  color: 'var(--navy)',
                  border: '2px solid var(--navy)',
                  borderRadius: '8px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  fontSize: '0.95rem',
                }}
              >
                상담 문의
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 모바일 대응 */}
      <style>{`
        @media (max-width: 768px) {
          .compare-row,
          .compare-header {
            grid-template-columns: 1fr 1fr !important;
            font-size: 0.82rem !important;
          }
          .compare-row > div:first-child,
          .compare-header > div:first-child {
            grid-column: 1 / -1;
            background: #F0F3F8;
            color: var(--navy);
            font-weight: 700;
          }
          .compare-header > div:first-child {
            background: rgba(255,255,255,0.1);
            color: #fff;
          }
          .compare-row > div {
            border-left: none !important;
            padding: 10px 14px !important;
          }
        }
      `}</style>
    </main>
  );
}
