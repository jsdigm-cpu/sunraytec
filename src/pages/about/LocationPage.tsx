import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const COMPANY_ADDRESS = '서울특별시 서초구 능안말길 40, 2층';
const COMPANY_TEL = '1688-2520';
const COMPANY_FAX = '02-3461-2521';
const COMPANY_EMAIL = 'master@sunraytec.net';
const BUSINESS_HOURS = '평일 09:00 – 18:00 (점심 12:00 – 13:00, 주말·공휴일 휴무)';

const CONTACT_BLOCKS: Array<{ label: string; value: string; href?: string }> = [
  { label: '주소', value: COMPANY_ADDRESS },
  { label: '대표전화', value: COMPANY_TEL, href: `tel:${COMPANY_TEL.replace(/-/g, '')}` },
  { label: '팩스', value: COMPANY_FAX },
  { label: '이메일', value: COMPANY_EMAIL, href: `mailto:${COMPANY_EMAIL}` },
  { label: '운영 시간', value: BUSINESS_HOURS },
];

const TRANSPORT = [
  {
    icon: '🚇',
    title: '지하철',
    body: '신분당선·3호선 양재역 → 마을버스 4번 환승 7분 / 도보 14분',
  },
  {
    icon: '🚌',
    title: '버스',
    body: '간선 405·462, 마을 4·11번 ‘능안말길 입구’ 정류장 하차 후 도보 3분',
  },
  {
    icon: '🚗',
    title: '자가용',
    body: '경부고속도로 양재IC → 매헌로 → 능안말길 진입 (방문 주차 가능, 사전 예약 권장)',
  },
];

const VISIT_TIPS = [
  {
    title: '방문 전 알려주시면 도움됩니다',
    body: '적용 현장의 면적·천장고·전원 조건·사용 시간대를 미리 공유해 주시면 첫 미팅에서 바로 적합 모델군과 예상 용량을 제시해드립니다.',
  },
  {
    title: '공공기관 담당자 방문',
    body: '조달 우수제품·MAS 구매 검토, 일위대가표·시방서·도면 검토는 패스트트랙 라운지 또는 파트너 포털에서 사전 자료를 확인한 뒤 방문하시면 시간이 절약됩니다.',
  },
  {
    title: '원격 검토도 가능',
    body: '도면(PDF/CAD)과 사진을 보내주시면 화상 회의로 1차 검토를 진행할 수 있습니다. 견적 문의 양식 또는 이메일로 연락 주세요.',
  },
];

export default function LocationPage() {
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(COMPANY_ADDRESS)}&output=embed`;

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sub-Hero */}
      <section style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #152035 100%)', color: '#fff', padding: '58px 0 64px' }}>
        <div className="container">
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>홈</Link>
            {' › '}회사소개{' › '}
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>찾아오시는 길</span>
          </p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p style={{ color: 'var(--amber2)', fontSize: 12, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Location</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, lineHeight: 1.18, marginBottom: 14 }}>
              현장에서 가장 가까운 본사
            </h1>
            <p style={{ maxWidth: 720, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>
              서울 서초구에 위치한 본사에서 제품 상담, 도면 검토, 자료 수령이 가능합니다. 방문 전 전화 또는 이메일로 일정을 공유해 주시면 가장 빠르게 도와드릴 수 있습니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact + Map */}
      <section style={{ padding: '52px 0 28px' }}>
        <div className="container">
          <div className="loc-grid">
            {/* Contact card */}
            <article style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 28 }}>
              <h2 style={{ color: 'var(--navy)', fontSize: '1.25rem', fontWeight: 900, marginBottom: 18 }}>본사 연락처</h2>
              <div style={{ display: 'grid', gap: 16 }}>
                {CONTACT_BLOCKS.map((b) => (
                  <div key={b.label} style={{ display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16, alignItems: 'baseline', borderBottom: '1px dashed #E5E7EB', paddingBottom: 12 }}>
                    <span style={{ color: 'var(--red)', fontSize: 12, fontWeight: 900, letterSpacing: 0.5 }}>{b.label}</span>
                    {b.href ? (
                      <a href={b.href} style={{ color: 'var(--navy)', fontWeight: 700, textDecoration: 'none' }}>{b.value}</a>
                    ) : (
                      <span style={{ color: '#1F2937', fontWeight: 600, lineHeight: 1.6 }}>{b.value}</span>
                    )}
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 22 }}>
                <Link to="/contact" style={{ display: 'inline-flex', padding: '11px 18px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                  견적 문의 작성
                </Link>
                <a href={`tel:${COMPANY_TEL.replace(/-/g, '')}`} style={{ display: 'inline-flex', padding: '11px 18px', background: '#fff', color: 'var(--navy)', border: '1px solid #CBD5E1', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                  전화 연결
                </a>
              </div>
            </article>

            {/* Map */}
            <article style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 0, overflow: 'hidden', minHeight: 360 }}>
              <iframe
                title="썬레이텍 본사 위치"
                src={mapUrl}
                style={{ width: '100%', height: '100%', minHeight: 360, border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </article>
          </div>
        </div>
      </section>

      {/* Transportation */}
      <section style={{ padding: '32px 0' }}>
        <div className="container">
          <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 18 }}>오시는 방법</h2>
          <div className="loc-transport-grid">
            {TRANSPORT.map((t) => (
              <article key={t.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 22 }}>
                <span style={{ fontSize: 26, marginBottom: 8, display: 'inline-block' }}>{t.icon}</span>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.1rem', fontWeight: 900, marginBottom: 8 }}>{t.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Visit tips */}
      <section style={{ padding: '32px 0 80px' }}>
        <div className="container">
          <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 18 }}>방문 상담 팁</h2>
          <div style={{ display: 'grid', gap: 14 }}>
            {VISIT_TIPS.map((t) => (
              <article key={t.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 22 }}>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.08rem', fontWeight: 900, marginBottom: 8 }}>{t.title}</h3>
                <p style={{ color: '#64748B', lineHeight: 1.8 }}>{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .loc-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 18px; }
        .loc-transport-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        @media (max-width: 900px) {
          .loc-grid { grid-template-columns: 1fr; }
          .loc-transport-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
