import { motion } from 'motion/react';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const COMPARE_ROWS = [
  { label: '에너지 비용', sunray: '최대 60% 절감 (조건별)', conv: '기준 (100%)' },
  { label: '미세먼지·분진', sunray: 'Zero', conv: '발생' },
  { label: '결로 방지', sunray: '100% 해결', conv: '불가' },
  { label: '항균·탈취', sunray: '99.9%', conv: '증식 가능' },
  { label: '고천장 (8m↑)', sunray: '바닥까지 직접 도달', conv: '열이 천장에 정체' },
  { label: '화재 위험', sunray: 'Zero', conv: '위험' },
  { label: '소음', sunray: 'Zero', conv: '팬 소음 발생' },
  { label: '유지보수', sunray: '반영구 사용', conv: '필터 정기 교체' },
];

const RADIANT_WAVES = [
  { d: 'M 138 72 C 118 102, 98 132, 72 166', delay: 0 },
  { d: 'M 178 72 C 166 108, 152 142, 130 182', delay: 0.14 },
  { d: 'M 218 72 C 218 112, 218 148, 214 192', delay: 0.28 },
  { d: 'M 258 72 C 276 108, 294 142, 318 180', delay: 0.42 },
  { d: 'M 298 72 C 322 104, 344 132, 370 166', delay: 0.56 },
];

function Label({
  x,
  y,
  width,
  text,
  tone = 'warm',
}: {
  x: number;
  y: number;
  width: number;
  text: string;
  tone?: 'warm' | 'cool';
}) {
  const isWarm = tone === 'warm';

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height="28"
        rx="7"
        fill={isWarm ? '#FFF7ED' : '#EFF6FF'}
        stroke={isWarm ? '#FDBA74' : '#93C5FD'}
      />
      <text
        x={x + width / 2}
        y={y + 18}
        textAnchor="middle"
        fill={isWarm ? '#9A3412' : '#1D4ED8'}
        fontSize="12"
        fontWeight="900"
      >
        {text}
      </text>
    </g>
  );
}

function ComparisonDiagram() {
  return (
    <motion.div
      className="compare-diagram"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <article className="compare-diagram-panel compare-diagram-panel-radiant">
        <div className="compare-diagram-header">
          <div>
            <p className="compare-diagram-kicker compare-diagram-kicker-warm">Radiant Heating</p>
            <h3>썬레이텍 원적외선 복사난방</h3>
          </div>
          <span>가로형 패널 1대</span>
        </div>

        <svg
          viewBox="0 0 420 252"
          role="img"
          aria-label="썬레이텍 복사난방은 긴 가로형 패널에서 보이지 않는 원적외선 파장이 직진하고 피사체 흡수와 난반사로 공간을 데우는 원리"
        >
          <defs>
            <linearGradient id="panelMetal" x1="0" x2="1">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="54%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <linearGradient id="floorWarm" x1="0" x2="1">
              <stop offset="0%" stopColor="#FDBA74" stopOpacity="0.08" />
              <stop offset="50%" stopColor="#F97316" stopOpacity="0.24" />
              <stop offset="100%" stopColor="#FDBA74" stopOpacity="0.08" />
            </linearGradient>
            <marker id="warmArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#EA580C" />
            </marker>
          </defs>

          <rect x="18" y="24" width="384" height="194" rx="10" fill="#FFFFFF" stroke="#FED7AA" />
          <rect x="18" y="170" width="384" height="48" rx="10" fill="url(#floorWarm)" />
          <line x1="18" y1="170" x2="402" y2="170" stroke="#FDBA74" strokeDasharray="5 7" />

          <rect x="104" y="40" width="212" height="40" rx="8" fill="url(#panelMetal)" stroke="#94A3B8" strokeWidth="2" />
          <rect x="116" y="50" width="188" height="18" rx="4" fill="#F8FAFC" stroke="#CBD5E1" />
          <text x="210" y="32" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="900">
            실제 제품 비율에 가까운 긴 직사각형 패널
          </text>
          <text x="210" y="98" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="800">
            1200 x 300 x 48mm / 표면은 붉게 보이지 않음
          </text>

          {RADIANT_WAVES.map((wave) => (
            <motion.path
              key={wave.d}
              d={wave.d}
              fill="none"
              stroke="#F97316"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeDasharray="7 8"
              markerEnd="url(#warmArrow)"
              initial={{ opacity: 0.3, pathLength: 0.45 }}
              animate={{ opacity: [0.3, 0.75, 0.3], pathLength: [0.45, 1, 0.45] }}
              transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut', delay: wave.delay }}
            />
          ))}

          <circle cx="86" cy="178" r="17" fill="#FFEDD5" stroke="#FB923C" />
          <circle cx="210" cy="187" r="20" fill="#FFEDD5" stroke="#FB923C" />
          <circle cx="334" cy="178" r="17" fill="#FFEDD5" stroke="#FB923C" />
          <path
            d="M 72 207 C 116 188, 164 190, 206 207 S 312 224, 370 192"
            fill="none"
            stroke="#EA580C"
            strokeWidth="2.1"
            strokeDasharray="5 7"
            opacity="0.62"
          />
          <path
            d="M 78 170 C 126 154, 166 158, 204 174 M 228 177 C 270 158, 314 156, 350 170"
            fill="none"
            stroke="#FB923C"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeDasharray="4 7"
            opacity="0.7"
          />

          <Label x={30} y={120} width={96} text="직진성" />
          <Label x={156} y={207} width={108} text="피사체 흡수" />
          <Label x={286} y={120} width={106} text="일부 난반사" />
        </svg>
      </article>

      <article className="compare-diagram-panel compare-diagram-panel-convection">
        <div className="compare-diagram-header">
          <div>
            <p className="compare-diagram-kicker compare-diagram-kicker-cool">Convection Heating</p>
            <h3>일반 대류난방 공기 흐름</h3>
          </div>
          <span>온풍 순환 방식</span>
        </div>

        <svg
          viewBox="0 0 420 252"
          role="img"
          aria-label="일반 대류난방은 토출부의 따뜻한 공기가 상승하고 순환 중 식으면서 바닥에는 냉기가 머무르는 흐름"
        >
          <defs>
            <linearGradient id="ceilingHeat" x1="0" x2="1">
              <stop offset="0%" stopColor="#FED7AA" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#F97316" stopOpacity="0.42" />
            </linearGradient>
            <linearGradient id="floorCold" x1="0" x2="1">
              <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.22" />
              <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.42" />
            </linearGradient>
            <marker id="heatArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#F97316" />
            </marker>
            <marker id="coldArrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
              <path d="M0,0 L8,4 L0,8 Z" fill="#3B82F6" />
            </marker>
          </defs>

          <rect x="18" y="24" width="384" height="194" rx="10" fill="#FFFFFF" stroke="#CBD5E1" />
          <rect x="18" y="24" width="384" height="46" rx="10" fill="url(#ceilingHeat)" />
          <rect x="18" y="174" width="384" height="44" rx="10" fill="url(#floorCold)" />
          <line x1="18" y1="174" x2="402" y2="174" stroke="#93C5FD" strokeDasharray="5 7" />

          <rect x="169" y="42" width="82" height="34" rx="7" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
          <rect x="182" y="58" width="56" height="6" rx="3" fill="#64748B" />
          <text x="210" y="97" textAnchor="middle" fill="#64748B" fontSize="11" fontWeight="800">
            토출부는 따뜻한 공기
          </text>

          <motion.path
            d="M 238 70 C 296 82, 336 106, 348 146"
            fill="none"
            stroke="#F97316"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="9 8"
            markerEnd="url(#heatArrow)"
            animate={{ strokeDashoffset: [0, -34] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'linear' }}
          />
          <motion.path
            d="M 182 70 C 118 86, 82 122, 84 166"
            fill="none"
            stroke="#F97316"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="9 8"
            markerEnd="url(#heatArrow)"
            animate={{ strokeDashoffset: [0, -34] }}
            transition={{ duration: 1.9, repeat: Infinity, ease: 'linear', delay: 0.2 }}
          />
          <motion.path
            d="M 348 146 C 336 188, 286 204, 214 204 C 144 204, 90 190, 84 166"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="9 8"
            markerEnd="url(#coldArrow)"
            animate={{ strokeDashoffset: [0, 34] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
          />

          <Label x={32} y={86} width={112} text="천장 열 정체" />
          <Label x={274} y={86} width={112} text="토출부 고온" />
          <Label x={34} y={184} width={116} text="순환 중 냉각" tone="cool" />
          <Label x={268} y={184} width={116} text="바닥 냉기" tone="cool" />
        </svg>
      </article>
    </motion.div>
  );
}

export default function CompareSection() {
  return (
    <section style={{ background: 'var(--off)', padding: '72px 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '42px' }}>
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
            복사난방 vs 대류난방
            <br />
            <span style={{ color: 'var(--red)' }}>한눈에 비교</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal variants={fadeInUp} style={{ marginBottom: '38px' }}>
          <ComparisonDiagram />
        </ScrollReveal>

        <ScrollReveal variants={fadeInUp}>
          <div
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: 'var(--sh-lg)',
            }}
          >
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

            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }}>
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
                  <div style={{ padding: '14px 20px', fontSize: '13.5px', fontWeight: 600, color: 'var(--text)' }}>{row.label}</div>
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

      <style>{`
        .compare-diagram {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          align-items: stretch;
          max-width: 920px;
          margin: 0 auto;
        }

        .compare-diagram-panel {
          border-radius: 12px;
          padding: 18px;
          box-shadow: 0 16px 44px rgba(15, 34, 65, 0.08);
        }

        .compare-diagram-panel svg {
          width: 100%;
          display: block;
        }

        .compare-diagram-panel-radiant {
          background: linear-gradient(180deg, #fff7ed 0%, #ffffff 100%);
          border: 1px solid #fed7aa;
        }

        .compare-diagram-panel-convection {
          background: linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
          border: 1px solid #cbd5e1;
        }

        .compare-diagram-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }

        .compare-diagram-header h3 {
          color: var(--navy);
          font-size: 1.04rem;
          font-weight: 900;
          line-height: 1.25;
        }

        .compare-diagram-header span {
          background: #fff;
          border-radius: 8px;
          padding: 6px 9px;
          font-size: 12px;
          font-weight: 900;
          white-space: nowrap;
        }

        .compare-diagram-panel-radiant .compare-diagram-header span {
          color: #c2410c;
          border: 1px solid #fdba74;
        }

        .compare-diagram-panel-convection .compare-diagram-header span {
          color: #2563eb;
          border: 1px solid #bfdbfe;
        }

        .compare-diagram-kicker {
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1.6px;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .compare-diagram-kicker-warm {
          color: #c2410c;
        }

        .compare-diagram-kicker-cool {
          color: #2563eb;
        }

        @media (max-width: 820px) {
          .compare-diagram {
            grid-template-columns: 1fr;
            max-width: 560px;
          }
        }

        @media (max-width: 480px) {
          .compare-diagram-panel {
            padding: 14px;
          }

          .compare-diagram-header {
            align-items: flex-start;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
