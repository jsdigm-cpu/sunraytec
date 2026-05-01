import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';
import PageSEO from '../../components/seo/PageSEO';

const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const MAIN_CERTS = [
  {
    icon: '🏆',
    title: '정부조달 우수제품 지정',
    detail: '2013 · 2019 · 2025 (3회 지정)',
    description: '조달청이 기술력·품질·사후관리를 심사해 선정하는 최고 권위의 조달 인증. 수의계약으로 공공기관 납품 가능.',
    badge: '핵심',
    badgeColor: '#C0392B',
  },
  {
    icon: '💡',
    title: '혁신제품 지정',
    detail: '2020년 조달청 지정',
    description: '기존 제품 대비 혁신적 성능 개선을 인정받은 제품에 부여. 공공기관 시범구매 대상.',
    badge: '핵심',
    badgeColor: '#C0392B',
  },
  {
    icon: '🔵',
    title: 'K마크 성능인증',
    detail: 'SUR-D300P ~ SUR-3600',
    description: '산업통상자원부 산하 공인기관의 KS 기준 성능 시험을 통과한 제품에 부여되는 국가 인증.',
    badge: '품질',
    badgeColor: '#2563EB',
  },
  {
    icon: '📋',
    title: 'ISO 9001:2015',
    detail: '품질경영시스템 인증',
    description: '국제 표준화기구(ISO)의 품질경영 시스템 요구사항을 충족하는 기업에 부여되는 국제 인증.',
    badge: '국제',
    badgeColor: '#059669',
  },
  {
    icon: '🌿',
    title: 'ISO 14001:2015',
    detail: '환경경영시스템 인증',
    description: '환경 영향 최소화를 위한 경영 시스템을 갖춘 기업에 부여. 친환경 제조 공정 입증.',
    badge: '국제',
    badgeColor: '#059669',
  },
  {
    icon: '🔥',
    title: '방폭인증 EX emb II T1',
    detail: '위험 환경 특수 제품',
    description: '폭발 위험 환경(화학·석유화학 공장 등)에서 안전하게 사용 가능한 제품임을 인증.',
    badge: '특수',
    badgeColor: '#D97706',
  },
  {
    icon: '💧',
    title: '방진·방수 IP-65',
    detail: '2024 KTR 시험성적서',
    description: 'KTR 성적서 ECU-2024-014357 기준, SUR-1800-D 시험대상에서 IP65 방진·방수 성능 확인.',
    badge: '특수',
    badgeColor: '#D97706',
  },
  {
    icon: '🇪🇺',
    title: 'CE · RoHS',
    detail: 'SUR-1200 / 2400 / 3600',
    description: 'EU 시장 출시 요건(CE)과 유해물질 제한지침(RoHS)을 충족. 해외 수출 기반 마련.',
    badge: '해외',
    badgeColor: '#7C3AED',
  },
  {
    icon: '🌡️',
    title: '원적외선 방사율 · 항균 · 탈취 성적서',
    detail: '한국원적외선협회',
    description: '원적외선 방사율, 대장균·포도상구균 항균 시험, 탈취율 측정 성적서 보유. 기능성 난방 입증.',
    badge: '시험',
    badgeColor: '#0891B2',
  },
  {
    icon: '🏅',
    title: '조달청장 표창장',
    detail: '2016 · 2019 (2회)',
    description: '조달청장(2016) 및 서울지방조달청장(2019) 표창장 수상. 공공조달 기여 공식 인정.',
    badge: '수상',
    badgeColor: '#B45309',
  },
];

const PATENTS = [
  { title: '원적외선 난방장치',                                   number: '제10-1028910호', year: '등록' },
  { title: '원적외선 방열패널 및 그 제조방법을 이용한 난방장치', number: '제10-1043542호', year: '등록' },
  { title: '책상에 설치되는 난방 패널',                          number: '제10-1378499호', year: '등록' },
  { title: '난방장치',                                           number: '제10-1625578호', year: '등록' },
  { title: '천장부착형 복사난방히터',                            number: '제10-1640866호', year: '등록' },
  { title: '원적외선 방열패널 코팅용 조성물 및 방열패널',        number: '제10-1651925호', year: '등록' },
  { title: '협소공간에 설치되는 난방시스템',                     number: '제10-2137929호', year: '등록' },
  { title: '열처리 광물 포함 원적외선 방열패널 코팅 조성물',     number: '제10-2299104호', year: '등록' },
  { title: '버스 정류장용 원적외선 난방장치',                    number: '제10-2640644호', year: '등록' },
  { title: '전기히터 (디자인)',                                  number: '디자인 제30-0856398호', year: '등록' },
];

const TIMELINE = [
  { year: '2002', event: '원적외선 복사난방 기술개발 시작' },
  { year: '2009', event: '썬레이텍 법인 설립' },
  { year: '2013', event: '조달청 우수제품 1차 지정' },
  { year: '2019', event: '조달청 우수제품 2차 지정' },
  { year: '2020', event: '혁신제품 지정 · ISO 9001/14001 인증 취득' },
  { year: '2024', event: 'KTR IP65 방진·방수 등 시험성적서 확보' },
  { year: '2025', event: '조달청 우수제품 3차 지정 (최신)' },
];

const CERT_METRICS = [
  { value: '15+', label: '인증·시험성적서',  sub: '국내외 공인기관', color: '#fff' },
  { value: '10건', label: '등록 특허',        sub: '특허 9건 + 디자인 1건', color: '#fff' },
  { value: '3회',  label: '우수제품 지정',    sub: '2013·2019·2025년', color: 'var(--red)' },
  { value: '2종',  label: 'ISO 국제인증',     sub: '품질·환경경영 동시 보유', color: '#fff' },
];

export default function CertificationsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <PageSEO
        title="인증·특허 - 조달청 우수제품 3회, 특허 10건"
        description="조달청 우수제품 3회(2013·2019·2025) 지정, 등록 특허 10건, ISO·CE·KC·방폭 인증. 썬레이텍 원적외선 복사난방의 기술력을 수치로 입증합니다."
        keywords={['우수제품 지정', '특허 등록', 'ISO 인증', 'CE 인증', 'KC 인증', '방폭 인증', '인증서']}
        canonical="/about/certifications"
      />
      <SubHero
        breadcrumb={[{ label: '회사소개' }, { label: '인증·특허' }]}
        badge="Certifications & Patents"
        title="인증 · 특허"
        lead="조달청 우수제품 3회 지정, 10건 등록 특허, ISO·CE·KC·방폭 인증까지. 원적외선 복사난방 기술력을 수치로 입증합니다."
        keywords={['우수제품 3회 지정', '등록 특허 10건', 'ISO 국제인증 2종', '인증·시험성적서 15건+']}
      />

      {/* 핵심 수치 바 (히어로에서 본문으로 이동) */}
      <section style={{ background: '#0D1B2E', padding: 0 }}>
        <div className="container">
          <div className="cert-metrics-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {CERT_METRICS.map((m, i) => (
              <div key={m.label} style={{
                padding: '28px 20px',
                borderRight: i < CERT_METRICS.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                textAlign: 'center',
              }}>
                <div style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)',
                  color: m.color,
                  lineHeight: 1, marginBottom: '6px',
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

      {/* ② 인증 카드 그리드 */}
      <section style={{ padding: '64px 0', background: '#F8FAFC' }}>
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{ marginBottom: '40px' }}
          >
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '10px' }}>
              Certifications
            </p>
            <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy)' }}>
              보유 인증 현황
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden" whileInView="visible" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}
            className="cert-page-grid"
          >
            {MAIN_CERTS.map(cert => (
              <motion.div
                key={cert.title}
                variants={cardVariant}
                whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)', transition: { duration: 0.2 } }}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  padding: '24px 20px',
                  border: '1px solid #E5E7EB',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '2rem' }}>{cert.icon}</span>
                  <span style={{
                    fontSize: '10px', fontWeight: 700,
                    background: cert.badgeColor + '1A',
                    color: cert.badgeColor,
                    padding: '2px 8px', borderRadius: '999px',
                  }}>
                    {cert.badge}
                  </span>
                </div>
                <div>
                  <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.875rem', marginBottom: '4px' }}>
                    {cert.title}
                  </p>
                  <p style={{ fontSize: '11px', color: cert.badgeColor, fontWeight: 600, marginBottom: '8px' }}>
                    {cert.detail}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#6B7280', lineHeight: 1.6 }}>
                    {cert.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ③ 특허 현황 */}
      <section style={{ padding: '64px 0', background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '60px', alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* 특허 목록 */}
            <div style={{ flex: 1, minWidth: '280px' }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '10px' }}>
                  Patents
                </p>
                <h2 style={{ fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy)', marginBottom: '32px' }}>
                  등록 특허
                </h2>
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}
              >
                {PATENTS.map((p, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariant}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '16px',
                      padding: '16px 20px',
                      background: '#F8FAFC',
                      borderRadius: '12px',
                      border: '1px solid #E5E7EB',
                    }}
                  >
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '10px',
                      background: 'var(--navy)', color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 800, fontSize: '0.8rem', flexShrink: 0,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.875rem', marginBottom: '2px' }}>
                        {p.title}
                      </p>
                      <p style={{ fontSize: '11px', color: '#9CA3AF' }}>{p.number} · {p.year}</p>
                    </div>
                    <span style={{
                      fontSize: '10px', fontWeight: 700,
                      background: '#D1FAE5', color: '#065F46',
                      padding: '2px 8px', borderRadius: '999px',
                    }}>
                      {p.year}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* 우수제품 타임라인 */}
            <div style={{ width: '300px', flexShrink: 0 }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '10px' }}>
                  History
                </p>
                <h2 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 900, color: 'var(--navy)', marginBottom: '32px' }}>
                  인증 연혁
                </h2>
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                style={{ position: 'relative', paddingLeft: '28px' }}
              >
                {/* 세로선 */}
                <div style={{
                  position: 'absolute', left: '7px', top: '8px', bottom: '8px',
                  width: '2px', background: '#E5E7EB',
                }} />
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariant}
                    style={{ position: 'relative', marginBottom: '24px' }}
                  >
                    {/* 점 */}
                    <div style={{
                      position: 'absolute', left: '-24px', top: '4px',
                      width: '12px', height: '12px', borderRadius: '50%',
                      background: item.year === '2025' ? 'var(--red)' : 'var(--navy)',
                      border: '2px solid #fff',
                      boxShadow: '0 0 0 2px ' + (item.year === '2025' ? 'var(--red)' : 'var(--navy)'),
                    }} />
                    <p style={{
                      fontSize: '12px', fontWeight: 800,
                      color: item.year === '2025' ? 'var(--red)' : 'var(--navy)',
                      marginBottom: '2px',
                    }}>
                      {item.year}
                    </p>
                    <p style={{ fontSize: '0.82rem', color: '#374151', lineHeight: 1.5 }}>
                      {item.event}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ④ 하단 CTA */}
      <section style={{ padding: '0 0 80px', background: '#fff' }}>
        <div className="container">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{
              background: '#F1F5F9',
              borderRadius: '20px',
              padding: '40px 32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '2rem' }}>📄</span>
              <div>
                <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '1rem', marginBottom: '4px' }}>
                  인증서 원본이 필요하신가요?
                </p>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  자료실에서 인증서 파일을 다운로드하거나, 직접 문의해 주세요.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                to="/resources/catalog"
                style={{
                  padding: '12px 24px', borderRadius: '10px',
                  border: '2px solid var(--navy)', color: 'var(--navy)',
                  fontWeight: 700, fontSize: '0.875rem',
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}
              >
                자료실 바로가기
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
                📋 직접 문의하기
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .cert-page-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .cert-metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .cert-page-grid    { grid-template-columns: 1fr !important; }
          .cert-metrics-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </main>
  );
}
