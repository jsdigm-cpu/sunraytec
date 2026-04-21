import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import ScrollReveal from '../ui/ScrollReveal';
import { slideInLeft, slideInRight } from '../../utils/animations';

const CEILING_OPTIONS = ['3m 이하', '3~5m', '5~8m', '8m 이상'];
const INSULATION_OPTIONS = ['우수 (신축)', '보통 (일반)', '불량 (노후)'];

// 간이 계산 로직 (W/m² 기준)
function calcWatts(area: number, ceiling: string, insulation: string): number {
  let base = 60; // W/m²
  if (ceiling === '3~5m') base = 80;
  if (ceiling === '5~8m') base = 110;
  if (ceiling === '8m 이상') base = 150;
  if (insulation === '보통 (일반)') base *= 1.15;
  if (insulation === '불량 (노후)') base *= 1.3;
  return Math.ceil((area * base) / 100) * 100;
}

function recommendModel(watts: number): string {
  if (watts <= 600)  return 'SUR-600T';
  if (watts <= 1200) return 'SUR-1200T/D';
  if (watts <= 1800) return 'SUR-1800T/D';
  if (watts <= 2400) return 'SUR-2400T/D';
  if (watts <= 3600) return 'SUR-3600D';
  return `SUR-3600D × ${Math.ceil(watts / 3600)}대`;
}

export default function CalcSection() {
  const [area, setArea] = useState('');
  const [ceiling, setCeiling] = useState(CEILING_OPTIONS[0]);
  const [insulation, setInsulation] = useState(INSULATION_OPTIONS[0]);
  const [result, setResult] = useState<{ watts: number; model: string } | null>(null);

  const handleCalc = () => {
    const a = parseFloat(area);
    if (!a || a <= 0) return;
    const watts = calcWatts(a, ceiling, insulation);
    setResult({ watts, model: recommendModel(watts) });
  };

  const inputStyle: CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1.5px solid var(--border)',
    fontSize: '14px',
    color: 'var(--text)',
    background: '#fff',
    outline: 'none',
  };

  const labelStyle: CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 700,
    color: 'var(--gray)',
    marginBottom: '6px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  };

  return (
    <section style={{ background: 'var(--off)', padding: '72px 0' }}>
      <div className="container">
        <div
          style={{
            display: 'grid',

            gridTemplateColumns: '1fr 1fr',
            gap: '40px',
            alignItems: 'center',
          }}
          className="calc-layout"
        >
          {/* 왼쪽: 설명 */}
          <ScrollReveal variants={slideInLeft}>
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
              Free Calculator
            </p>
            <h2
              style={{
                fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                fontWeight: 900,
                color: 'var(--navy)',
                lineHeight: 1.25,
                marginBottom: '16px',
              }}
            >
              🧮 무료 난방 용량<br />자동 계산기
            </h2>
            <p style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: '0.9rem', marginBottom: '24px' }}>
              면적과 천장 높이만 입력하면 필요한 난방 용량과 추천 모델을 자동으로 알려드립니다.
              전문 상담사가 최종 견적을 확인해 드립니다.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['면적·천장높이 입력', '필요 용량 자동 계산', '추천 모델 제안', '전문가 상담 연결'].map(
                (step, i) => (
                  <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--red)',
                        color: '#fff',
                        fontSize: '11px',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {i + 1}
                    </div>
                    <span style={{ fontSize: '13.5px', color: 'var(--text)', fontWeight: 500 }}>{step}</span>
                  </div>
                )
              )}
            </div>
          </ScrollReveal>

          {/* 오른쪽: 계산기 */}
          <ScrollReveal variants={slideInRight}>
          <div
            style={{
              background: '#fff',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: 'var(--sh-lg)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* 면적 입력 */}
              <div>
                <label style={labelStyle}>난방 면적 (㎡)</label>
                <input
                  type="number"
                  placeholder="예: 500"
                  value={area}
                  onChange={(e) => { setArea(e.target.value); setResult(null); }}
                  style={inputStyle}
                  min="1"
                />
              </div>

              {/* 천장 높이 */}
              <div>
                <label style={labelStyle}>천장 높이</label>
                <select
                  value={ceiling}
                  onChange={(e) => { setCeiling(e.target.value); setResult(null); }}
                  style={inputStyle}
                >
                  {CEILING_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              {/* 단열 상태 */}
              <div>
                <label style={labelStyle}>단열 상태</label>
                <select
                  value={insulation}
                  onChange={(e) => { setInsulation(e.target.value); setResult(null); }}
                  style={inputStyle}
                >
                  {INSULATION_OPTIONS.map((o) => <option key={o}>{o}</option>)}
                </select>
              </div>

              {/* 계산 버튼 */}
              <motion.button
                onClick={handleCalc}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  background: 'var(--red)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '13px',
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  width: '100%',
                }}
              >
                🧮 난방 용량 계산하기
              </motion.button>
            </div>

            {/* 결과 */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                style={{
                  marginTop: '20px',
                  background: 'linear-gradient(135deg, var(--navy), var(--blue))',
                  borderRadius: '10px',
                  padding: '20px',
                  color: '#fff',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '2rem',
                        color: 'var(--amber2)',
                        lineHeight: 1,
                      }}
                    >
                      {result.watts.toLocaleString()}W
                    </div>
                    <div style={{ fontSize: '11px', opacity: 0.65, marginTop: '4px' }}>필요 난방 용량</div>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: '1.5rem',
                        color: 'var(--amber2)',
                        lineHeight: 1,
                      }}
                    >
                      {result.model}
                    </div>
                    <div style={{ fontSize: '11px', opacity: 0.65, marginTop: '4px' }}>추천 모델</div>
                  </div>
                </div>
                <a
                  href="tel:16882520"
                  style={{
                    display: 'block',
                    textAlign: 'center',
                    background: 'var(--red)',
                    color: '#fff',
                    padding: '10px',
                    borderRadius: '7px',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                  }}
                >
                  📞 이 결과로 전화 문의하기
                </a>
              </motion.div>
            )}
          </div>
          </ScrollReveal>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .calc-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
