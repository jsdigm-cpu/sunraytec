import { motion } from 'motion/react';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const COMPARE_ROWS = [
  { label: '에너지 비용',     sunray: '최대 60% 절감 (조건별)',  conv: '기준 (100%)' },
  { label: '미세먼지·분진',   sunray: 'Zero',          conv: '발생' },
  { label: '결로 방지',       sunray: '100% 해결',     conv: '불가' },
  { label: '항균·탈취',       sunray: '99.9%',         conv: '증식 가능' },
  { label: '고천장 (8m↑)',    sunray: '바닥까지 직접 도달', conv: '열이 천장에 정체' },
  { label: '화재 위험',       sunray: 'Zero',          conv: '위험' },
  { label: '소음',            sunray: 'Zero',          conv: '팬 소음 발생' },
  { label: '유지보수',        sunray: '반영구 사용',   conv: '필터 정기 교체' },
];

// ── 좌측(복사난방) 하강 열선 좌표 ──────────────────────────────────
// viewBox="0 0 840 310" 기준, 패널 중심 cx≈215, cy≈42
const RADIANT_RAYS = [
  { x1: 196, y1: 56, x2: 68,  y2: 255, delay: 0.00 },
  { x1: 205, y1: 56, x2: 148, y2: 258, delay: 0.20 },
  { x1: 214, y1: 56, x2: 214, y2: 260, delay: 0.05 },
  { x1: 223, y1: 56, x2: 282, y2: 258, delay: 0.30 },
  { x1: 232, y1: 56, x2: 362, y2: 255, delay: 0.15 },
];

// ── 우측(대류난방) 대류 경로 ────────────────────────────────────────
// 큰 루프: 바닥 가열 → 좌측 상승 → 천장 이동 → 우측 하강
const CONVECTION_PATHS = [
  {
    d: 'M 490 252 Q 470 190 478 130 Q 486 70 545 46 Q 640 28 720 46 Q 790 68 782 150 Q 774 235 730 252',
    delay: 0.00,
  },
  {
    d: 'M 535 246 Q 520 195 528 148 Q 536 100 580 80 Q 638 62 692 82 Q 740 104 732 165 Q 724 228 695 246',
    delay: 0.30,
  },
];

// ── 우측 먼지·열기 파티클 위치 ──────────────────────────────────────
const DUST = [
  { cx: 518, startY: 235, endY: 85,  r: 2.2, delay: 0.0  },
  { cx: 560, startY: 240, endY: 70,  r: 1.8, delay: 0.6  },
  { cx: 612, startY: 244, endY: 60,  r: 2.5, delay: 1.1  },
  { cx: 660, startY: 238, endY: 72,  r: 1.6, delay: 0.3  },
  { cx: 710, startY: 235, endY: 80,  r: 2.0, delay: 0.8  },
  { cx: 748, startY: 240, endY: 90,  r: 1.4, delay: 0.4  },
];

// ── 복사난방 낙하 파티클 ────────────────────────────────────────────
const HEAT_PARTICLES = [
  { cx: 214, startY: 60, endY: 245, delay: 0.0  },
  { cx: 178, startY: 60, endY: 232, delay: 0.65 },
  { cx: 250, startY: 60, endY: 232, delay: 1.20 },
];

export default function CompareSection() {
  return (
    <section style={{ background: 'var(--off)', padding: '72px 0' }}>
      <div className="container">

        {/* 섹션 헤더 */}
        <ScrollReveal variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--red)',
              marginBottom: '12px',
            }}
          >
            Why Sunraytec
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--navy)',
              lineHeight: 1.2,
            }}
          >
            복사난방 vs 대류난방<br />
            <span style={{ color: 'var(--red)' }}>한눈에 비교</span>
          </h2>
        </ScrollReveal>

        {/* ── 이미지 + 애니메이션 오버레이 ──────────────────────────── */}
        <ScrollReveal variants={fadeInUp} style={{ marginBottom: '40px' }}>
          <motion.div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
              cursor: 'default',
            }}
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* 베이스 이미지 */}
            <img
              src="/images/comparison.png"
              alt="복사난방 vs 대류난방 비교"
              style={{ width: '100%', display: 'block' }}
            />

            {/* ── SVG 애니메이션 오버레이 ── */}
            <svg
              viewBox="0 0 840 310"
              preserveAspectRatio="none"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
              }}
            >
              {/* ════ 왼쪽: 복사난방 ════ */}

              {/* 패널 아래 warm glow */}
              <motion.ellipse
                cx="214" cy="52" rx="60" ry="9"
                fill="rgba(220,75,45,0)"
                animate={{ fill: ['rgba(220,75,45,0)', 'rgba(220,75,45,0.32)', 'rgba(220,75,45,0)'] }}
                transition={{ duration: 2.0, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* 하강 열선 */}
              {RADIANT_RAYS.map((ray, i) => (
                <motion.line
                  key={`ray-${i}`}
                  x1={ray.x1} y1={ray.y1}
                  x2={ray.x2} y2={ray.y2}
                  stroke="rgba(218,72,42,0.55)"
                  strokeWidth="2"
                  strokeDasharray="8 5"
                  strokeLinecap="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  animate={{ strokeDashoffset: [0, -13] }}
                  transition={{
                    opacity: { duration: 0.5, delay: ray.delay },
                    strokeDashoffset: {
                      duration: 0.95,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: ray.delay,
                    },
                  }}
                />
              ))}

              {/* 낙하 열 파티클 */}
              {HEAT_PARTICLES.map((p, i) => (
                <motion.circle
                  key={`hp-${i}`}
                  cx={p.cx}
                  cy={p.startY}
                  r={3}
                  fill="rgba(225,90,55,0.85)"
                  initial={{ cy: p.startY, opacity: 0.9 }}
                  animate={{ cy: [p.startY, p.endY], opacity: [0.9, 0] }}
                  transition={{
                    duration: 1.7,
                    repeat: Infinity,
                    ease: 'easeIn',
                    delay: p.delay,
                    repeatDelay: 0.5,
                  }}
                />
              ))}

              {/* 바닥 온기 글로우 */}
              <motion.ellipse
                cx="214" cy="258" rx="72" ry="9"
                fill="rgba(210,60,40,0)"
                animate={{ fill: ['rgba(210,60,40,0)', 'rgba(210,60,40,0.22)', 'rgba(210,60,40,0)'] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />

              {/* ════ 오른쪽: 대류난방 ════ */}

              {/* 천장 열기 축적 펄스 */}
              <motion.rect
                x="450" y="25" width="370" height="32" rx="5"
                fill="rgba(160,120,70,0)"
                animate={{ fill: ['rgba(160,120,70,0)', 'rgba(160,120,70,0.16)', 'rgba(160,120,70,0)'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* 대류 순환 경로 */}
              {CONVECTION_PATHS.map((p, i) => (
                <motion.path
                  key={`cp-${i}`}
                  d={p.d}
                  stroke="rgba(90,170,235,0.72)"
                  strokeWidth="2.4"
                  strokeDasharray="10 6"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  animate={{ strokeDashoffset: [0, 16] }}
                  transition={{
                    opacity: { duration: 0.6, delay: p.delay },
                    strokeDashoffset: {
                      duration: 1.3,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: p.delay,
                    },
                  }}
                />
              ))}

              {/* 먼지·세균 상승 파티클 */}
              {DUST.map((p, i) => (
                <motion.circle
                  key={`dust-${i}`}
                  cx={p.cx}
                  cy={p.startY}
                  r={p.r}
                  fill="rgba(155,140,115,0.75)"
                  initial={{ cx: p.cx, cy: p.startY, opacity: 0.85 }}
                  animate={{
                    cy: [p.startY, p.endY],
                    opacity: [0.85, 0],
                    cx: [p.cx, p.cx + (i % 2 === 0 ? 14 : -14)],
                  }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'easeOut',
                    delay: p.delay,
                    repeatDelay: 0.3,
                  }}
                />
              ))}

              {/* 중앙 구분선 — 부드러운 글로우 */}
              <motion.line
                x1="422" y1="18" x2="422" y2="292"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>

            {/* 좌하단 뱃지 */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                left: '14px',
                background: 'rgba(200,57,43,0.88)',
                color: '#fff',
                fontSize: '11px',
                fontWeight: 700,
                padding: '4px 10px',
                borderRadius: '6px',
                backdropFilter: 'blur(4px)',
                letterSpacing: '0.3px',
              }}
            >
              ✅ 썬레이텍 복사난방
            </div>

            {/* 우하단 뱃지 */}
            <div
              style={{
                position: 'absolute',
                bottom: '12px',
                right: '14px',
                background: 'rgba(44,62,80,0.82)',
                color: 'rgba(255,255,255,0.75)',
                fontSize: '11px',
                fontWeight: 600,
                padding: '4px 10px',
                borderRadius: '6px',
                backdropFilter: 'blur(4px)',
              }}
            >
              ❌ 일반 대류난방
            </div>
          </motion.div>
        </ScrollReveal>

        {/* ── 비교 테이블 ──────────────────────────────────────────── */}
        <ScrollReveal variants={fadeInUp}>
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--sh-lg)',
            }}
          >
            {/* 헤더 행 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1.2fr 1.2fr',
                background: 'var(--navy)',
                color: '#fff',
              }}
            >
              <div style={{ padding: '16px 20px', fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,.5)' }}>
                비교 항목
              </div>
              <div
                style={{
                  padding: '16px 20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'var(--amber2)',
                  borderLeft: '1px solid rgba(255,255,255,.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                ☀️ 원적외선 복사난방
                <span style={{ fontSize: '11px', background: 'var(--red)', padding: '2px 8px', borderRadius: '4px', color: '#fff' }}>
                  썬레이텍
                </span>
              </div>
              <div
                style={{
                  padding: '16px 20px',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,.7)',
                  borderLeft: '1px solid rgba(255,255,255,.1)',
                }}
              >
                💨 일반 대류난방
              </div>
            </div>

            {/* 데이터 행 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              {COMPARE_ROWS.map((row, i) => (
                <motion.div
                  key={row.label}
                  variants={staggerItem}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1.2fr 1.2fr',
                    background: i % 2 === 0 ? '#fff' : 'var(--off)',
                    borderBottom: '1px solid var(--border)',
                  }}
                >
                  <div style={{ padding: '14px 20px', fontSize: '13.5px', fontWeight: 600, color: 'var(--text)' }}>
                    {row.label}
                  </div>
                  <div
                    style={{
                      padding: '14px 20px',
                      fontSize: '13.5px',
                      fontWeight: 700,
                      color: 'var(--red)',
                      borderLeft: '1px solid var(--border)',
                    }}
                  >
                    ✅ {row.sunray}
                  </div>
                  <div
                    style={{
                      padding: '14px 20px',
                      fontSize: '13.5px',
                      color: 'var(--gray)',
                      borderLeft: '1px solid var(--border)',
                    }}
                  >
                    {row.conv}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
