import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Factory, Flame, Gauge, RadioTower, ShieldCheck, Sparkles, ThermometerSun, Wind } from 'lucide-react';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';
import ScrollReveal from '../../components/ui/ScrollReveal';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';

const FLOW_LINES = [
  { x1: 180, y1: 88, x2: 86, y2: 274, delay: 0.0 },
  { x1: 210, y1: 88, x2: 160, y2: 282, delay: 0.2 },
  { x1: 240, y1: 88, x2: 240, y2: 286, delay: 0.1 },
  { x1: 270, y1: 88, x2: 320, y2: 282, delay: 0.3 },
  { x1: 300, y1: 88, x2: 394, y2: 274, delay: 0.15 },
];

const CONVECTION_PATHS = [
  'M 520 284 C 494 210 510 126 582 92 C 654 58 766 80 784 160 C 800 232 754 278 700 286',
  'M 566 278 C 544 222 554 156 610 128 C 666 100 736 122 744 178 C 752 232 724 266 684 278',
];

const PRINCIPLES = [
  { title: '공기를 데우는 것이 아니라', value: '사람과 표면을 직접', desc: '원적외선은 공기보다 바닥, 벽, 장비, 인체에 먼저 흡수되어 체감 온도를 빠르게 만듭니다.' },
  { title: '열이 위로 도망가지 않고', value: '작업면까지 직진', desc: '고천장 공간에서도 따뜻한 공기가 천장에 고이는 손실을 줄이고 필요한 구역에 열을 전달합니다.' },
  { title: '표면 온도가 안정되며', value: '결로와 냉기 저감', desc: '차가운 표면을 직접 데워 습기, 곰팡이, 바닥 냉감을 줄이는 데 유리합니다.' },
];

const DIFFERENCES = [
  { label: '열 전달', radiant: '복사파가 사람·물체에 직접 흡수', convection: '공기를 데운 뒤 순환' },
  { label: '체감 속도', radiant: '점등 후 빠르게 체감', convection: '공간 전체 온도 상승까지 지연' },
  { label: '고천장', radiant: '작업면·동선 중심 난방', convection: '따뜻한 공기가 상부에 정체' },
  { label: '공기질', radiant: '무바람·저분진', convection: '송풍으로 먼지 확산 가능' },
  { label: '운영 방식', radiant: '구역별 선택 난방', convection: '전체 공간 가열 중심' },
];

const SCENARIOS = [
  { icon: Building2, title: '학교·공공시설', desc: '급식실, 체육관, 민원실처럼 조용하고 쾌적한 체감 난방이 필요한 공간' },
  { icon: Factory, title: '산업·물류센터', desc: '고천장, 대공간, 출입문 개방이 잦아 공기난방 손실이 큰 작업 현장' },
  { icon: ShieldCheck, title: '국방·특수환경', desc: '정비창, 격납고, 방폭·방수 조건 등 내구성과 안정성이 중요한 현장' },
  { icon: RadioTower, title: 'IoT 중앙제어', desc: '구역별 스케줄, 피크 관리, 에너지 사용량 모니터링이 필요한 운영 환경' },
];

function RadiantDiagram() {
  return (
    <div
      style={{
        position: 'relative',
        minHeight: 430,
        background: 'linear-gradient(180deg, #F8FAFC 0%, #EEF2F7 100%)',
        border: '1px solid rgba(15,34,65,0.1)',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 24px 70px rgba(15,34,65,0.14)',
      }}
    >
      <svg viewBox="0 0 900 380" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="radiantWarm" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#E8574A" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F39C12" stopOpacity="0.18" />
          </linearGradient>
          <linearGradient id="airBlue" x1="0" x2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.72" />
            <stop offset="100%" stopColor="#1A3A6B" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <rect x="42" y="42" width="396" height="286" rx="18" fill="#FFFFFF" stroke="#D8DEE8" />
        <rect x="462" y="42" width="396" height="286" rx="18" fill="#FFFFFF" stroke="#D8DEE8" />
        <rect x="150" y="52" width="180" height="32" rx="8" fill="#0A1628" />
        <rect x="604" y="252" width="112" height="28" rx="8" fill="#2C3E50" />

        <text x="240" y="30" textAnchor="middle" fill="#0A1628" fontSize="18" fontWeight="800">원적외선 복사난방</text>
        <text x="660" y="30" textAnchor="middle" fill="#0A1628" fontSize="18" fontWeight="800">일반 대류난방</text>
        <text x="240" y="354" textAnchor="middle" fill="#C8392B" fontSize="14" fontWeight="800">열이 필요한 곳으로 직접 도달</text>
        <text x="660" y="354" textAnchor="middle" fill="#64748B" fontSize="14" fontWeight="700">공기 순환 후 천장에 열 정체</text>

        <motion.ellipse
          cx="240"
          cy="296"
          rx="142"
          ry="18"
          fill="#F39C12"
          animate={{ opacity: [0.16, 0.42, 0.16], scaleX: [0.84, 1.08, 0.84] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '240px 296px' }}
        />

        {FLOW_LINES.map((line) => (
          <motion.line
            key={`${line.x1}-${line.x2}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#radiantWarm)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray="12 14"
            animate={{ strokeDashoffset: [0, -52], opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: line.delay }}
          />
        ))}

        {[88, 160, 240, 318, 384].map((cx, index) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy="106"
            r="5"
            fill="#C8392B"
            animate={{ y: [0, 174], opacity: [0, 0.9, 0] }}
            transition={{ duration: 2.1, repeat: Infinity, ease: 'easeIn', delay: index * 0.28 }}
          />
        ))}

        <motion.rect
          x="486"
          y="56"
          width="344"
          height="44"
          rx="10"
          fill="#F59E0B"
          animate={{ opacity: [0.08, 0.24, 0.08] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />

        {CONVECTION_PATHS.map((d, index) => (
          <motion.path
            key={d}
            d={d}
            fill="none"
            stroke="url(#airBlue)"
            strokeWidth="5"
            strokeDasharray="15 15"
            strokeLinecap="round"
            animate={{ strokeDashoffset: [0, 60] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay: index * 0.25 }}
          />
        ))}

        {[536, 584, 642, 706, 770].map((cx, index) => (
          <motion.circle
            key={cx}
            cx={cx}
            cy="266"
            r={index % 2 ? 4 : 5}
            fill="#94A3B8"
            animate={{ y: [0, -186], opacity: [0.72, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut', delay: index * 0.34 }}
          />
        ))}
      </svg>

    </div>
  );
}

export default function PrinciplePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <SubHero
        breadcrumb={[{ label: '기술·솔루션' }, { label: '복사난방 원리' }]}
        badge="Far Infrared Radiant Heating"
        title="공기를 흔들지 않고 필요한 곳에 열을 꽂아 넣는 방식"
        lead="썬레이텍 복사난방은 뜨거운 공기를 순환시키는 대신 원적외선 에너지를 사람, 바닥, 장비 표면에 직접 전달합니다. 그래서 고천장·대공간에서도 열 손실을 줄이고 체감 난방을 빠르게 만듭니다."
        keywords={['사람·표면 직접 가열', '고천장 열 손실 최소화', '무바람·저분진', '결로·냉기 저감']}
      />

      {/* 복사난방 다이어그램 (히어로에서 본문으로 이동) */}
      <section style={{ padding: '56px 0', background: '#F8FAFC' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 34 }}>
            <p style={{ fontSize: 12, color: 'var(--red)', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Radiant vs Convection</p>
            <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 900 }}>복사난방과 대류난방의 차이</h2>
          </ScrollReveal>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            <RadiantDiagram />
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28, justifyContent: 'center' }}>
            <Link to="/products" className="btn btn-primary" style={{ borderRadius: 8 }}>
              제품 보기 <ArrowRight size={16} />
            </Link>
            <Link to="/contact" className="btn btn-outline" style={{ borderRadius: 8, color: 'var(--navy)', borderColor: '#CBD5E1' }}>
              현장 상담 요청
            </Link>
          </div>
        </div>
      </section>

      <section style={{ padding: '68px 0', background: '#F8FAFC' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 34 }}>
            <p style={{ fontSize: 12, color: 'var(--red)', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Core Mechanism</p>
            <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 900 }}>원리는 세 문장으로 끝납니다</h2>
          </ScrollReveal>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }} className="principle-card-grid">
            {PRINCIPLES.map((item, index) => (
              <motion.article key={item.title} variants={staggerItem} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 14px 34px rgba(15,34,65,0.06)' }}>
                <span style={{ display: 'inline-flex', width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: '#FFF1ED', color: 'var(--red)', fontWeight: 900, marginBottom: 18 }}>
                  {index + 1}
                </span>
                <p style={{ color: '#64748B', fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{item.title}</p>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.2rem', fontWeight: 900, marginBottom: 10 }}>{item.value}</h3>
                <p style={{ color: '#526173', fontSize: 14, lineHeight: 1.7 }}>{item.desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '76px 0', background: '#fff' }}>
        <div className="container">
          <div className="principle-split" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 34, alignItems: 'center' }}>
            <ScrollReveal variants={fadeInUp}>
              <p style={{ fontSize: 12, color: 'var(--red)', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Radiant vs Convection</p>
              <h2 style={{ fontSize: '2rem', color: 'var(--navy)', fontWeight: 900, lineHeight: 1.25, marginBottom: 16 }}>
                대류난방은 공기를 돌리고,<br />복사난방은 열을 전달합니다
              </h2>
              <p style={{ color: '#526173', lineHeight: 1.8, marginBottom: 22 }}>
                대류난방은 실내 공기를 먼저 데워야 하므로 천장이 높거나 문이 자주 열리는 현장에서는 손실이 커집니다. 복사난방은 작업자와 작업면에 직접 도달해 필요한 구역을 빠르게 따뜻하게 만듭니다.
              </p>
              <div style={{ display: 'grid', gap: 10 }}>
                {[
                  { icon: Gauge, text: '체감 난방 응답이 빠름' },
                  { icon: Wind, text: '송풍이 없어 먼지 확산이 적음' },
                  { icon: ThermometerSun, text: '벽·바닥 표면 냉기를 줄임' },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#26384F', fontWeight: 800 }}>
                    <Icon size={18} color="var(--red)" /> {text}
                  </div>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: 8, overflow: 'hidden', boxShadow: '0 18px 44px rgba(15,34,65,0.08)' }}>
                <div className="principle-compare-head" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr 1.2fr', background: 'var(--navy)', color: '#fff', fontSize: 13, fontWeight: 900 }}>
                  <div style={{ padding: 14 }}>구분</div>
                  <div style={{ padding: 14, color: '#FFD3C8' }}>복사난방</div>
                  <div style={{ padding: 14, color: '#BFD7F5' }}>대류난방</div>
                </div>
                {DIFFERENCES.map((row) => (
                  <div key={row.label} className="principle-compare-row" style={{ display: 'grid', gridTemplateColumns: '0.8fr 1.2fr 1.2fr', borderTop: '1px solid #E2E8F0', fontSize: 13.5 }}>
                    <div style={{ padding: 14, fontWeight: 900, color: 'var(--navy)', background: '#F8FAFC' }}>{row.label}</div>
                    <div style={{ padding: 14, color: '#C8392B', fontWeight: 800 }}>{row.radiant}</div>
                    <div style={{ padding: 14, color: '#64748B' }}>{row.convection}</div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section style={{ padding: '76px 0', background: 'linear-gradient(180deg, #0A1628 0%, #14233A 100%)', color: '#fff' }}>
        <div className="container">
          <ScrollReveal style={{ textAlign: 'center', marginBottom: 36 }}>
            <p style={{ fontSize: 12, color: '#E8574A', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Field Fit</p>
            <h2 style={{ fontSize: '2rem', fontWeight: 900 }}>어떤 현장에서 특히 강한가</h2>
          </ScrollReveal>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.12 }} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }} className="principle-scenario-grid">
            {SCENARIOS.map(({ icon: Icon, title, desc }) => (
              <motion.article key={title} variants={staggerItem} whileHover={{ y: -5 }} style={{ border: '1px solid rgba(255,255,255,0.11)', borderRadius: 8, padding: 22, background: 'rgba(255,255,255,0.05)' }}>
                <Icon size={28} color="#F39C12" style={{ marginBottom: 14 }} />
                <h3 style={{ fontSize: '1rem', fontWeight: 900, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.64)', fontSize: 13.5, lineHeight: 1.65 }}>{desc}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '68px 0', background: '#FFF7ED' }}>
        <div className="container">
          <ScrollReveal>
            <div className="principle-cta" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 22, background: '#fff', border: '1px solid #FED7AA', borderRadius: 8, padding: 30, boxShadow: '0 18px 44px rgba(194,65,12,0.1)' }}>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 52, height: 52, borderRadius: 8, background: '#FFF1ED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Flame size={28} color="var(--red)" />
                </div>
                <div>
                  <h2 style={{ color: 'var(--navy)', fontSize: '1.35rem', fontWeight: 900, marginBottom: 4 }}>현장 조건을 알려주시면 난방 방식부터 같이 검토합니다</h2>
                  <p style={{ color: '#64748B', fontSize: 14 }}>면적, 천장고, 개방 빈도, 작업자 동선을 기준으로 적합한 제품과 제어 방식을 제안합니다.</p>
                </div>
              </div>
              <Link to="/contact" className="btn btn-primary" style={{ borderRadius: 8, flexShrink: 0 }}>
                견적 문의 <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <style>{`
        @media (max-width: 980px) {
          .principle-hero-grid,
          .principle-split {
            grid-template-columns: 1fr !important;
          }
          .principle-card-grid,
          .principle-scenario-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 640px) {
          .principle-card-grid,
          .principle-scenario-grid {
            grid-template-columns: 1fr !important;
          }
          .principle-compare-head,
          .principle-compare-row {
            grid-template-columns: 1fr !important;
          }
          .principle-compare-head > div,
          .principle-compare-row > div {
            padding: 11px 14px !important;
          }
          .principle-cta {
            align-items: flex-start !important;
            flex-direction: column !important;
          }
        }
      `}</style>
    </main>
  );
}
