import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

type Tone = 'red' | 'amber' | 'navy' | 'green' | 'gray';

const TIMELINE: Array<{
  year: string;
  category: string;
  title: string;
  body: string;
  tone: Tone;
}> = [
  {
    year: '2025',
    category: '조달 우수제품',
    title: '조달청 우수제품 3차 재지정',
    body: '세 번째 우수제품 지정으로 공공기관 조달 공급 경쟁력을 2028년까지 이어갑니다.',
    tone: 'red',
  },
  {
    year: '2020',
    category: '품질·환경 인증',
    title: 'ISO 9001·ISO 14001 동시 취득',
    body: '품질경영(QMS)과 환경경영(EMS) 국제표준을 동시 인증받아 공급망 신뢰도와 ESG 운영 기반을 확보했습니다.',
    tone: 'amber',
  },
  {
    year: '2020',
    category: '혁신제품',
    title: '조달청 혁신시제품 지정',
    body: '공공기관 시범구매가 가능한 혁신제품으로 등재되어 신기술 적용 사례를 확대했습니다.',
    tone: 'amber',
  },
  {
    year: '2019',
    category: '조달 우수제품',
    title: '조달청 우수제품 2차 재지정',
    body: '재심사를 통과해 우수제품 지정을 두 번째로 갱신. 기술력과 사후관리 체계를 다시 검증했습니다.',
    tone: 'red',
  },
  {
    year: '2019',
    category: '표창',
    title: '서울지방조달청장 표창',
    body: '공공조달 우수공급사로 서울지방조달청장 표창을 수상했습니다.',
    tone: 'navy',
  },
  {
    year: '2016',
    category: '표창',
    title: '조달청장 표창',
    body: '공공기관 납품 품질과 사후관리 우수성으로 조달청장 표창을 수상했습니다.',
    tone: 'navy',
  },
  {
    year: '2013',
    category: '조달 우수제품',
    title: '조달청 우수제품 1차 지정',
    body: '원적외선 복사난방패널의 기술력과 품질을 인정받아 공공조달 진입의 발판을 마련했습니다.',
    tone: 'red',
  },
  {
    year: '2009',
    category: '법인 설립',
    title: '(주)썬레이텍 법인 설립',
    body: '2002년부터 이어진 기술개발 경험을 바탕으로 원적외선 방사 천장형 복사난방패널 전문기업으로 사업화했습니다.',
    tone: 'gray',
  },
];

const HONORS = [
  { label: 'K마크 성능인증', value: 'SUR-D300P / 600P / 1200P / 1800P / 2400P / 3600P (6종)' },
  { label: '방폭 인증', value: 'EX emb II T1 (한국가스안전공사 KGS)' },
  { label: '방진·방수 시험', value: 'IP65 시험성적서 ECU-2024-014357 (KTR, SUR-1800-D 시험대상)' },
  { label: '유럽 인증', value: 'CE · RoHS (SUR-1200 / 2400 / 3600)' },
  { label: '특허·디자인', value: '국내 등록 특허 9건 + 디자인 1건 (총 10건)' },
  { label: '시험 성적서', value: '원적외선 방사율 0.91, 항균 99.9%, 암모니아 탈취 최대 89%, 저소음 35~37 dB' },
];

const TONE_BADGE: Record<Tone, { bg: string; color: string }> = {
  red:   { bg: '#FEE2E2', color: '#B91C1C' },
  amber: { bg: '#FEF3C7', color: '#92400E' },
  navy:  { bg: '#E0E7FF', color: '#1E3A8A' },
  green: { bg: '#DCFCE7', color: '#166534' },
  gray:  { bg: '#F1F5F9', color: '#334155' },
};

export default function MediaPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sub-Hero */}
      <section style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #152035 100%)', color: '#fff', padding: '58px 0 64px' }}>
        <div className="container">
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>홈</Link>
            {' › '}회사소개{' › '}
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>수상·언론보도</span>
          </p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p style={{ color: 'var(--amber2)', fontSize: 12, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Awards & Media</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, lineHeight: 1.18, marginBottom: 14 }}>
              매년 다시 받아낸 외부 검증
            </h1>
            <p style={{ maxWidth: 760, color: 'rgba(255,255,255,0.7)', lineHeight: 1.85 }}>
              조달청 우수제품 3차 지정, 혁신시제품 등재, K마크 6종 성능인증, 방폭(EX emb II T1) 인증까지.
              자체 자랑이 아니라 외부 기관이 매년 다시 확인한 기록입니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section style={{ padding: '52px 0 32px' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <h2 style={{ color: 'var(--navy)', fontSize: '1.5rem', fontWeight: 900, marginBottom: 22 }}>주요 수상·인증 이력</h2>

          <div style={{ position: 'relative', paddingLeft: 26 }}>
            <div style={{ position: 'absolute', left: 9, top: 6, bottom: 6, width: 2, background: '#E5E7EB' }} />
            <div style={{ display: 'grid', gap: 14 }}>
              {TIMELINE.map((item, idx) => {
                const tone = TONE_BADGE[item.tone];
                return (
                  <motion.article
                    key={`${item.year}-${item.title}`}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.35, delay: idx * 0.04 }}
                    style={{ position: 'relative', background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: '20px 24px' }}
                  >
                    <span style={{ position: 'absolute', left: -22, top: 24, width: 12, height: 12, borderRadius: '50%', background: tone.color, boxShadow: '0 0 0 4px #fff' }} />
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 900 }}>{item.year}</span>
                      <span style={{ display: 'inline-block', padding: '3px 10px', background: tone.bg, color: tone.color, borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5 }}>
                        {item.category}
                      </span>
                    </div>
                    <h3 style={{ color: 'var(--navy)', fontSize: '1.1rem', fontWeight: 800, marginBottom: 8 }}>{item.title}</h3>
                    <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>{item.body}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Honors list */}
      <section style={{ padding: '32px 0' }}>
        <div className="container">
          <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 18 }}>인증·시험성적서 보유 현황</h2>
          <div className="media-honor-grid">
            {HONORS.map((h) => (
              <article key={h.label} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 22 }}>
                <p style={{ color: 'var(--red)', fontSize: 12, fontWeight: 900, marginBottom: 8 }}>{h.label}</p>
                <p style={{ color: '#1F2937', fontWeight: 700, lineHeight: 1.6 }}>{h.value}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Press note + CTA */}
      <section style={{ padding: '32px 0 80px' }}>
        <div className="container">
          <article style={{ background: 'linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)', border: '1px solid #BFDBFE', borderRadius: 14, padding: 28 }}>
            <p style={{ color: '#1E3A8A', fontSize: 12, fontWeight: 900, letterSpacing: 1, marginBottom: 8 }}>PRESS · MEDIA</p>
            <h2 style={{ color: 'var(--navy)', fontSize: '1.3rem', fontWeight: 900, marginBottom: 12 }}>보도자료·전시회 자료 운영 안내</h2>
            <p style={{ color: '#475569', lineHeight: 1.85, marginBottom: 16 }}>
              개별 보도자료, 전시회 참가 자료, 공공기관 납품 사례별 PDF는 정리되는 대로 자료실에 순차 게시합니다.
              사전 검토용 자료가 필요하시면 견적 문의 또는 패스트트랙 라운지를 통해 요청해 주세요.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/about/certifications" style={{ display: 'inline-flex', padding: '11px 18px', background: 'var(--navy)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                인증서·특허 보기
              </Link>
              <Link to="/resources/catalog" style={{ display: 'inline-flex', padding: '11px 18px', background: '#fff', color: 'var(--navy)', border: '1px solid #CBD5E1', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                자료실 이동
              </Link>
              <Link to="/contact" style={{ display: 'inline-flex', padding: '11px 18px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                보도자료 요청
              </Link>
            </div>
          </article>
        </div>
      </section>

      <style>{`
        .media-honor-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 12px; }
        @media (max-width: 760px) { .media-honor-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
