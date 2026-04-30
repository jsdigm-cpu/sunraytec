import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';

const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariant = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

interface HistoryEvent {
  year: string;
  month?: string;
  title: string;
  detail: string;
  highlight?: boolean;
}

const HISTORY: HistoryEvent[] = [
  {
    year: '2002',
    title: '원적외선 복사난방 기술개발 시작',
    detail: '원적외선 세라믹 코팅제와 천장형 복사난방패널 개발을 위한 시장조사·기초자료 조사 착수.',
    highlight: false,
  },
  {
    year: '2005',
    title: '천장형 원적외선 난방패널 개발 본격화',
    detail: '천장형 원적외선 음이온 난방패널 개발을 시작하고 매립형·노출형 제품화 기반을 정비.',
    highlight: false,
  },
  {
    year: '2009',
    title: '(주)썬레이텍 법인 설립',
    detail: '2009년 12월 22일 법인 설립. 원적외선 방사 천장형 복사난방패널 전문 제조기업으로 사업화 착수.',
    highlight: true,
  },
  {
    year: '2013',
    title: '조달청 우수제품 1차 지정',
    detail: '조달청 우수제품으로 최초 지정. 공공기관 수의계약 공급 자격 취득. 원적외선 복사난방 분야 최초 사례.',
    highlight: true,
  },
  {
    year: '2019',
    title: '조달청 우수제품 2차 재지정',
    detail: '우수제품 재심사 통과로 2차 지정. 기술력·품질·사후관리 경쟁력 재입증.',
    highlight: true,
  },
  {
    year: '2020',
    title: '혁신제품 지정 · ISO 인증 취득',
    detail: '조달청 혁신제품 지정으로 공공기관 시범구매 대상 선정. ISO 9001(품질경영) · ISO 14001(환경경영) 국제 인증 동시 취득.',
    highlight: true,
  },
  {
    year: '2021~2024',
    title: '스마트 제어·IP65 시험성적서 등 검증 확대',
    detail: '방폭인증(EX emb II T1), CE·RoHS, 국립전파연구원 적합등록, 2024년 KTR IP65 방진·방수 시험성적서 등 특수 환경 대응 근거 확보.',
    highlight: false,
  },
  {
    year: '2025',
    title: '조달청 우수제품 3차 재지정',
    detail: '세 번째 우수제품 지정으로 국내 복사난방 분야 최고 신뢰도 확인. 공공기관 납품 경쟁력 강화.',
    highlight: true,
  },
];

const KPI_ITEMS = [
  { value: '2009',   unit: '',    label: '법인 설립' },
  { value: '2002',   unit: '',    label: '기술개발 시작' },
  { value: '3회',    unit: '',    label: '우수제품 지정' },
  { value: 'IP65',   unit: '',    label: 'KTR 시험성적' },
];

const BUSINESS_AREAS = [
  { icon: '🏛️', title: '공공기관 조달',  desc: '나라장터 우수제품·MAS 수의계약 공급' },
  { icon: '🏭', title: '산업·물류시설', desc: '공장·창고·물류센터 대공간 난방' },
  { icon: '🎓', title: '교육·공공시설', desc: '학교·군부대·행정기관 난방' },
  { icon: '🌍', title: '특수·수출',     desc: '방폭·방수 특수 환경 및 해외 수출' },
];

export default function HistoryPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <SubHero
        breadcrumb={[{ label: '회사소개' }, { label: '회사 연혁' }]}
        badge="Company History"
        title="회사 연혁"
        lead="2002년 기술개발 시작, 2009년 법인 설립 이후 조달청 우수제품 3회 지정으로 검증된 20년 이상의 전문 기술 역량"
        keywords={['2002년 기술개발 시작', '2009년 법인 설립', '우수제품 3회 지정', '등록 특허 10건']}
      />

      {/* 핵심 연혁 수치 바 (히어로에서 본문으로 이동) */}
      <section style={{ background: '#0D1B2E', padding: 0 }}>
        <div className="container">
          <div className="history-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {[
              { value: '2002', label: '기술개발 시작', sub: '복사난방 R&D 착수', color: '#fff' },
              { value: '2009', label: '법인 설립',     sub: '2009년 12월 22일', color: '#fff' },
              { value: '3회',  label: '우수제품 지정', sub: '2013·2019·2025년', color: 'var(--red)' },
              { value: '10건', label: '등록 특허',     sub: '특허 9건+디자인 1건', color: '#fff' },
            ].map((m, i) => (
              <div key={m.label} style={{
                padding: '28px 20px',
                borderRight: i < 3 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  color: m.color, lineHeight: 1, marginBottom: '6px',
                }}>
                  {m.value}
                </div>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: '3px' }}>
                  {m.label}
                </div>
                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.35)' }}>
                  {m.sub}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ② 회사 개요 */}
      <section style={{ padding: '64px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '60px', alignItems: 'center', flexWrap: 'wrap' }}>
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
              style={{ flex: 1, minWidth: '280px' }}
            >
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '12px' }}>
                About Us
              </p>
              <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.3, marginBottom: '20px' }}>
                대한민국 복사난방의<br />기준을 만드는 기업
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#4B5563', lineHeight: 1.8, marginBottom: '16px' }}>
                (주)썬레이텍은 2009년 12월 22일 법인 설립 이후 원적외선 복사난방 기술 하나에 집중해온 전문기업입니다.
                2002년부터 이어진 기술개발 경험을 바탕으로
                에너지 절감·결로 방지·항균 기능을 동시에 갖춘 복사난방 시스템으로 공공기관, 산업시설,
                교육기관에 검증된 열환경을 제공합니다.
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4B5563', lineHeight: 1.8 }}>
                조달청 우수제품 3차 지정(2013·2019·2025)을 비롯해 혁신제품·K마크·ISO 등 국내외
                주요 인증을 보유하며, 공공기관·교육시설·군부대·산업시설 등 다양한 현장 납품실적으로 신뢰를 쌓아왔습니다.
              </p>
            </motion.div>

            {/* 사업 분야 카드 */}
            <motion.div
              variants={staggerContainer}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', width: '360px', flexShrink: 0 }}
              className="biz-grid"
            >
              {BUSINESS_AREAS.map(b => (
                <motion.div
                  key={b.title}
                  variants={itemVariant}
                  style={{
                    background: '#F8FAFC',
                    borderRadius: '14px',
                    padding: '20px 16px',
                    border: '1px solid #E5E7EB',
                  }}
                >
                  <span style={{ fontSize: '1.6rem', display: 'block', marginBottom: '8px' }}>{b.icon}</span>
                  <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.875rem', marginBottom: '4px' }}>{b.title}</p>
                  <p style={{ fontSize: '0.75rem', color: '#6B7280', lineHeight: 1.5 }}>{b.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ③ 연혁 타임라인 */}
      <section style={{ padding: '64px 0 80px', background: '#F8FAFC' }}>
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '10px' }}>
              History
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy)' }}>
              기술개발과 사업화의 발자취
            </h2>
          </motion.div>

          {/* 타임라인 */}
          <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
            {/* 중앙선 */}
            <div style={{
              position: 'absolute', left: '50%', top: 0, bottom: 0,
              width: '2px', background: '#E5E7EB', transform: 'translateX(-50%)',
            }} className="timeline-line" />

            <motion.div
              variants={staggerContainer}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
            >
              {HISTORY.map((item, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    variants={itemVariant}
                    style={{
                      display: 'flex',
                      justifyContent: isLeft ? 'flex-end' : 'flex-start',
                      paddingLeft: isLeft ? 0 : 'calc(50% + 24px)',
                      paddingRight: isLeft ? 'calc(50% + 24px)' : 0,
                      marginBottom: '32px',
                      position: 'relative',
                    }}
                    className="timeline-item"
                  >
                    {/* 중앙 점 */}
                    <div style={{
                      position: 'absolute',
                      left: '50%', top: '20px',
                      transform: 'translateX(-50%)',
                      width: item.highlight ? '16px' : '12px',
                      height: item.highlight ? '16px' : '12px',
                      borderRadius: '50%',
                      background: item.highlight ? 'var(--red)' : 'var(--navy)',
                      border: '3px solid #F8FAFC',
                      boxShadow: item.highlight ? '0 0 0 3px rgba(192,57,43,0.25)' : '0 0 0 3px rgba(15,34,65,0.15)',
                      zIndex: 1,
                    }} className="timeline-dot" />

                    {/* 카드 */}
                    <div style={{
                      background: '#fff',
                      borderRadius: '14px',
                      padding: '20px 22px',
                      border: item.highlight ? '1.5px solid rgba(192,57,43,0.25)' : '1px solid #E5E7EB',
                      boxShadow: item.highlight ? '0 4px 20px rgba(192,57,43,0.08)' : '0 2px 8px rgba(0,0,0,0.05)',
                      maxWidth: '320px',
                      width: '100%',
                    }}>
                      <p style={{
                        fontSize: '0.8rem', fontWeight: 800,
                        color: item.highlight ? 'var(--red)' : 'var(--navy)',
                        marginBottom: '6px', letterSpacing: '0.5px',
                      }}>
                        {item.year}
                        {item.highlight && (
                          <span style={{
                            marginLeft: '8px', fontSize: '9px', fontWeight: 700,
                            background: 'var(--red)', color: '#fff',
                            padding: '1px 7px', borderRadius: '999px', verticalAlign: 'middle',
                          }}>주요</span>
                        )}
                      </p>
                      <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.9rem', marginBottom: '6px' }}>
                        {item.title}
                      </p>
                      <p style={{ fontSize: '0.8rem', color: '#6B7280', lineHeight: 1.6 }}>
                        {item.detail}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ④ 하단 CTA */}
      <section style={{ padding: '0 0 80px', background: '#F8FAFC' }}>
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{
              background: 'linear-gradient(160deg, var(--navy) 0%, #1A3A6B 100%)',
              borderRadius: '20px', padding: '48px 32px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '24px', color: '#fff',
            }}
          >
            <div>
              <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', fontWeight: 800, marginBottom: '8px' }}>
                검증된 복사난방 기술력을 직접 경험해 보세요
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>
                인증서 확인부터 맞춤 견적까지, 전문가가 도와드립니다
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                to="/about/certifications"
                style={{
                  padding: '12px 24px', borderRadius: '10px',
                  border: '2px solid rgba(255,255,255,0.4)', color: '#fff',
                  fontWeight: 700, fontSize: '0.875rem',
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                인증·특허 보기
              </Link>
              <Link
                to="/contact"
                style={{
                  padding: '12px 24px', borderRadius: '10px',
                  background: 'var(--red)', color: '#fff',
                  fontWeight: 700, fontSize: '0.875rem',
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                📋 견적 문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .history-metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          .biz-grid { width: 100% !important; }
          .timeline-line { left: 16px !important; }
          .timeline-dot  { left: 16px !important; transform: translateX(-50%) !important; }
          .timeline-item {
            justify-content: flex-start !important;
            padding-left: 44px !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </main>
  );
}
