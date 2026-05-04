import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fadeInUp, staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { Link } from 'react-router-dom';
import { ArrowRight, BadgeCheck, ShieldCheck, Factory, School, RadioTower } from 'lucide-react';

const SEGMENTS = [
  {
    id: 'public',
    icon: School,
    title: '공공·교육 시설',
    badge: 'Public & Education',
    headline: '학생들의 건강과 예산 절감을 동시에',
    desc: '급식실과 체육관은 먼지 비산과 소음이 가장 민감한 곳입니다. 썬레이텍의 무풍 난방은 미세먼지를 줄이고, 조달청 우수제품 등록으로 구매 절차까지 간소화합니다.',
    benefits: [
      '항균 99.9% · 탈취 88% 성적서 보유 (급식실 최적)',
      '팬 소음 없는 정숙한 수업 환경 구현',
      '조달청 우수제품 · MAS 등록으로 직접 도달 구매 가능',
    ],
    metric: { value: '3회', label: '우수제품 지정' },
    link: '/solutions/public-edu',
    color: 'var(--blue)',
  },
  {
    id: 'industrial',
    icon: Factory,
    title: '산업·물류 현장',
    badge: 'Industrial & Logistics',
    headline: '고천장 대공간 난방비 57% 절감 실증',
    desc: '열이 천장으로만 모이는 EHP 온풍기는 대형 창고에서 비효율적입니다. 복사열은 바닥 작업자에게 직접 도달하여 에너지 낭비를 막고 결로 피해를 원천 차단합니다.',
    benefits: [
      '에너지 절감 57% 실증 데이터 (가나에너지 사례)',
      '출입문이 자주 열리는 하역장에서도 체감 온도 유지',
      'IP65 방진방수 등급으로 거친 현장에서도 장기 운용',
    ],
    metric: { value: '57%', label: '에너지 절감' },
    link: '/solutions/industrial-logistics',
    color: 'var(--amber)',
  },
  {
    id: 'defense',
    icon: ShieldCheck,
    title: '국방·특수 시설',
    badge: 'Defense & Special',
    headline: '안전 인증이 필수인 까다로운 현장 대응',
    desc: '탄약고, 정비창, 특수 창고는 일반 난방기를 쓸 수 없습니다. 방폭 인증과 국방부 신기술 선정을 완료한 썬레이텍이 가장 안전한 선택지를 제안합니다.',
    benefits: [
      '방폭 인증 EX emb II T1 (한국가스안전공사)',
      '탄약고 결로 방지 및 정비창 혹한기 난방 최적화',
      '혁신제품 시범사용 만족도 96점 (육군 12개 사단)',
    ],
    metric: { value: '96점', label: '사용 만족도' },
    link: '/solutions/defense-special',
    color: 'var(--red)',
  },
];

export default function SolutionSection() {
  const [activeTab, setActiveTab] = useState(SEGMENTS[0].id);
  const activeData = SEGMENTS.find((s) => s.id === activeTab)!;

  return (
    <section style={{ background: '#fff', padding: '80px 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
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
            Target Solutions
          </p>
          <h2
            style={{
              fontSize: 'clamp(1.8rem, 4vw, 2.4rem)',
              fontWeight: 900,
              color: 'var(--navy)',
              lineHeight: 1.2,
            }}
          >
            누가 썬레이텍을 찾는가?
          </h2>
          <p style={{ color: 'var(--gray)', marginTop: '8px', fontSize: '1rem', maxWidth: '600px', margin: '12px auto 0' }}>
            단순한 난방기 판매가 아닌, 현장의 고질적인 문제를 해결하는 맞춤형 설득력을 제공합니다.
          </p>
        </ScrollReveal>

        {/* 탭 네비게이션 */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '12px', 
          marginBottom: '40px',
          flexWrap: 'wrap' 
        }}>
          {SEGMENTS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveTab(s.id)}
              style={{
                padding: '12px 24px',
                borderRadius: '999px',
                border: '1px solid',
                borderColor: activeTab === s.id ? s.color : 'var(--border)',
                background: activeTab === s.id ? s.color : '#fff',
                color: activeTab === s.id ? '#fff' : 'var(--text)',
                fontWeight: 700,
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: activeTab === s.id ? `0 8px 24px ${s.color}33` : 'none',
              }}
            >
              <s.icon size={18} />
              {s.title}
            </button>
          ))}
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div style={{ 
          background: '#F8FAFC', 
          borderRadius: '24px', 
          overflow: 'hidden',
          border: '1px solid var(--border)',
          boxShadow: 'var(--sh-lg)'
        }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1.2fr 1fr',
                minHeight: '440px'
              }}
              className="solution-display-grid"
            >
              {/* 왼쪽: 설명 텍스트 */}
              <div style={{ padding: '48px' }}>
                <span style={{ 
                  display: 'inline-block',
                  padding: '5px 14px',
                  borderRadius: '6px',
                  background: `${activeData.color}15`,
                  color: activeData.color,
                  fontSize: '12px',
                  fontWeight: 800,
                  marginBottom: '20px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase'
                }}>
                  {activeData.badge}
                </span>
                <h3 style={{ 
                  fontSize: '2rem', 
                  fontWeight: 900, 
                  color: 'var(--navy)',
                  marginBottom: '20px',
                  lineHeight: 1.2,
                  wordBreak: 'keep-all'
                }}>
                  {activeData.headline}
                </h3>
                <p style={{ 
                  fontSize: '1.05rem', 
                  color: 'var(--gray)', 
                  lineHeight: 1.8,
                  marginBottom: '32px'
                }}>
                  {activeData.desc}
                </p>

                <div style={{ display: 'grid', gap: '16px', marginBottom: '40px' }}>
                  {activeData.benefits.map((benefit, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <BadgeCheck size={20} color={activeData.color} />
                      <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>{benefit}</span>
                    </div>
                  ))}
                </div>

                <Link to={activeData.link} style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--navy)',
                  color: '#fff',
                  padding: '14px 28px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = activeData.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--navy)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  {activeData.title} 상세 솔루션 보기 <ArrowRight size={18} />
                </Link>
              </div>

              {/* 오른쪽: 하이라이트 지표 또는 비주얼 */}
              <div style={{ 
                background: 'linear-gradient(135deg, var(--navy) 0%, var(--slate-900) 100%)',
                padding: '48px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* 배경 장식 */}
                <div style={{ 
                  position: 'absolute', 
                  width: '300px', 
                  height: '300px', 
                  borderRadius: '50%', 
                  background: `${activeData.color}20`,
                  filter: 'blur(60px)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }} />

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  style={{ position: 'relative', zIndex: 2 }}
                >
                  <div style={{ 
                    fontFamily: "'Bebas Neue', sans-serif", 
                    fontSize: '6rem', 
                    color: activeData.color,
                    lineHeight: 1,
                    textShadow: `0 10px 40px ${activeData.color}44`
                  }}>
                    {activeData.metric.value}
                  </div>
                  <div style={{ 
                    fontSize: '1.4rem', 
                    fontWeight: 800, 
                    marginTop: '10px',
                    letterSpacing: '2px',
                    textTransform: 'uppercase',
                    opacity: 0.9
                  }}>
                    {activeData.metric.label}
                  </div>
                  <p style={{ marginTop: '24px', color: 'rgba(255,255,255,0.6)', fontSize: '14px', lineHeight: 1.6 }}>
                    공인 기관 성적서와 실증 데이터로<br />검증된 결과만을 제시합니다.
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .solution-display-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .solution-display-grid { padding: 0 !important; }
        }
      `}</style>
    </section>
  );
}
