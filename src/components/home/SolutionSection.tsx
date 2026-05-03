import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

const SOLUTIONS = [
  {
    icon: '🏛️',
    title: '공공·교육 시설',
    desc: '학교 급식실·체육관, 관공서, 복지관. 바람 없는 복사열로 분진 비산을 줄이고 쾌적한 체감 난방을 제공합니다. 조달청 우수제품·MAS 계약 기반으로 공공 구매 검토가 가능합니다.',
    tags: ['조달청 우수제품', 'MAS 계약', '무풍 난방'],
    color: 'var(--blue)',
    to: '/solutions/public-edu',
  },
  {
    icon: '🏭',
    title: '산업·물류 현장',
    desc: '천장 8m 이상 대형 창고·격납고. 열이 위로 뜨는 대류난방과 달리 복사열은 바닥 작업자까지 직접 도달. 결로로 인한 물류 손상도 차단.',
    tags: ['8m↑ 고천장 가능', '결로 방지', '무분진'],
    color: 'var(--amber)',
    to: '/solutions/industrial-logistics',
  },
  {
    icon: '⚔️',
    title: '국방·특수 시설',
    desc: '탄약고·화약 취급 시설. 방폭 인증(EX emb II T1) 제품군과 IP65 시험성적서 등 검증 자료를 바탕으로 위험 환경 난방 검토에 대응합니다.',
    tags: ['방폭 EX 인증', 'KTR IP65', '탄약고 검토'],
    color: 'var(--red)',
    to: '/solutions/defense-special',
  },
  {
    icon: '🚌',
    title: '야외·반개방 공간',
    desc: '버스정류장, 세차장, 항만 야적장, 축사. 복사난방은 공기가 아닌 물체를 직접 데워 개방 공간에서도 체감 온도를 효과적으로 높입니다.',
    tags: ['야외 설치 가능', '반개방 공간', '항만·축사'],
    color: '#2E7D32',
    to: '/technology/zero',
  },
];

export default function SolutionSection() {
  return (
    <section style={{ background: '#fff', padding: '72px 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp} style={{ marginBottom: '48px' }}>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              color: 'var(--red)',
              marginBottom: '10px',
            }}
          >
            Solutions
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
              fontWeight: 900,
              color: 'var(--navy)',
              lineHeight: 1.2,
            }}
          >
            업종별 맞춤 솔루션
          </h2>
          <p style={{ color: 'var(--gray)', marginTop: '8px', fontSize: '0.9rem' }}>
            어떤 공간이든 썬레이텍이 최적의 난방 솔루션을 제안합니다
          </p>
        </ScrollReveal>

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
          className="solution-grid"
        >
          {SOLUTIONS.map((s) => (
            <motion.div key={s.title} variants={staggerItem}>
              <Link to={s.to} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 48px rgba(0,0,0,0.12)', transition: { duration: 0.2 } }}
                  style={{
                    background: '#fff',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: '28px 22px',
                    boxShadow: 'var(--sh)',
                    borderTop: `4px solid ${s.color}`,
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    height: '100%',
                  }}
                >
                  <motion.div
                    whileHover={{ rotate: 10, scale: 1.15 }}
                    transition={{ duration: 0.2 }}
                    style={{ fontSize: '2.2rem', marginBottom: '14px', display: 'inline-block' }}
                  >
                    {s.icon}
                  </motion.div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--navy)', marginBottom: '10px' }}>
                    {s.title}
                  </h3>
                  <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.8, flex: 1 }}>
                    {s.desc}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '16px' }}>
                    {s.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          background: 'var(--off)',
                          color: 'var(--gray)',
                          padding: '3px 9px',
                          borderRadius: '999px',
                          border: '1px solid var(--border)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .solution-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .solution-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
