import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const KPIS = [
  { value: '2009', label: '법인 설립' },
  { value: '2002', label: '기술개발 시작' },
  { value: '3회', label: '조달 우수제품 지정' },
  { value: '10건', label: '특허·디자인 등록' },
];

const ESG_PILLARS = [
  {
    tag: 'Environment',
    title: '에너지 절감으로 탄소 감축',
    body: '복사난방 특성상 고천장·대공간에서 불필요한 공기 가열을 줄이고, 현장 조건에 따라 에너지 사용과 결로 관리 부담을 낮춥니다.',
  },
  {
    tag: 'Social',
    title: '사람 중심의 따뜻한 환경',
    body: '바람·먼지 없는 복사열로 학교·병원·민원실·작업장 등 사람이 머무는 공간의 호흡과 위생을 지킵니다.',
  },
  {
    tag: 'Governance',
    title: '투명한 공공조달 운영',
    body: '13년 이상 조달청 우수제품 지정 이력을 바탕으로 사양·인증·시공 자료를 공개하고 검증 가능한 구조로 운영합니다.',
  },
];

const MESSAGE_BLOCKS = [
  {
    title: '복사난방 한 분야에 쌓아온 전문성',
    body: `2002년 원적외선 복사난방 기술 조사와 개발을 시작한 뒤, 2009년 12월 22일 (주)썬레이텍 법인을 설립했습니다.
천장형 원적외선 복사난방패널의 자체 개발부터 매립형·노출형·방폭형·스마트 제어 라인업까지, 한 분야의 깊이를 만드는 데 자원을 투자해왔습니다. 학교, 군 시설, 물류센터, 공공시설 등 다양한 현장에서 바람 없이 체감되는 난방 환경을 검증해왔습니다.`,
  },
  {
    title: '사람과 공간을 함께 보는 기술',
    body: `난방은 단순히 온도를 올리는 장치가 아니라 그 공간에서 일어나는 호흡, 위생, 작업의 질을 결정짓는 설비입니다. 썬레이텍은 공기를 먼저 데우는 대신 사람·바닥·구조물에 직접 열을 전달해 분진 비산, 결로, 곰팡이, 정전기 등 현장 운영 부담을 줄이는 방식을 표준으로 삼고 있습니다. 이 철학은 항균 99.9%, 암모니아 탈취 최대 89%, 2024년 KTR IP65 방진·방수 시험성적서 등 검증 자료로 구체화되고 있습니다.`,
  },
  {
    title: '공공의 신뢰가 곧 우리의 검증',
    body: `2013년·2019년·2025년 세 번에 걸친 조달청 우수제품 지정, 혁신시제품 선정, K마크 6종 성능인증, 방폭(EX emb II T1) 인증, 유럽 CE·RoHS 인증은 내부의 자랑이 아니라 매년 다시 받아야 하는 외부 검증입니다. 공공기관 담당자가 우리 제품을 의심 없이 도면에 올릴 수 있도록 인증·시방·일위대가 자료를 정비된 형태로 제공하는 것을 회사의 의무라고 생각합니다.`,
  },
  {
    title: '앞으로의 약속',
    body: `IoT 128회로 중앙제어, 스마트시티 옥외 난방, 친환경 코팅 소재 등 차세대 영역으로 기술을 확장하면서도 여전히 가장 중요한 기준은 ‘현장의 작업자와 시민이 추위에 떨지 않는가’ 입니다. 더 효율적인 운전, 더 안전한 시공, 더 정직한 자료 — 이 세 가지를 흔들리지 않게 가져가겠습니다.`,
  },
];

export default function CeoMessagePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      {/* Sub-Hero */}
      <section style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #152035 100%)', color: '#fff', padding: '58px 0 66px' }}>
        <div className="container">
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none' }}>홈</Link>
            {' › '}회사소개{' › '}
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>CEO 메시지</span>
          </p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p style={{ color: 'var(--amber2)', fontSize: 12, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>CEO Message</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4.2vw, 3rem)', fontWeight: 900, lineHeight: 1.16, marginBottom: 16 }}>
              원적외선 복사난방의 기준을 세우는 기업
            </h1>
            <p style={{ maxWidth: 760, color: 'rgba(255,255,255,0.72)', lineHeight: 1.85 }}>
              (주)썬레이텍은 2009년 법인 설립 이후 원적외선 복사난방 한 분야에 집중해 온 전문기업입니다.
              2002년부터 이어진 기술개발 경험과 공공·산업·교육·국방 현장 적용 경험을 바탕으로 ‘바람 없이 따뜻한 공간’을 만들고 있습니다.
            </p>
          </motion.div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, marginTop: 32 }}>
            {KPIS.map((k) => (
              <div key={k.label} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, color: '#fff' }}>{k.value}</span>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)' }}>{k.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Long-form message */}
      <section style={{ padding: '58px 0 32px' }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div style={{ display: 'grid', gap: 22 }}>
            {MESSAGE_BLOCKS.map((block, idx) => (
              <motion.article
                key={block.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: '28px 32px', boxShadow: '0 10px 26px rgba(15,34,65,0.05)' }}
              >
                <span style={{ display: 'inline-block', color: 'var(--red)', fontSize: 11, fontWeight: 900, letterSpacing: 1.2, marginBottom: 10 }}>
                  {String(idx + 1).padStart(2, '0')}
                </span>
                <h2 style={{ color: 'var(--navy)', fontSize: '1.35rem', fontWeight: 900, marginBottom: 14, lineHeight: 1.35 }}>{block.title}</h2>
                <p style={{ color: '#475569', lineHeight: 1.95, whiteSpace: 'pre-line' }}>{block.body}</p>
              </motion.article>
            ))}
          </div>

          {/* Signature */}
          <div style={{ marginTop: 32, padding: '26px 32px', background: 'linear-gradient(135deg, #FFF7E6 0%, #FFE9D5 100%)', border: '1px solid #FCD9B6', borderRadius: 14 }}>
            <p style={{ color: '#9A4C12', fontSize: 13, fontWeight: 700, marginBottom: 6 }}>(주)썬레이텍 임직원 일동</p>
            <p style={{ color: 'var(--navy)', fontSize: '1.15rem', fontWeight: 900, lineHeight: 1.5 }}>
              “바람 없이, 사람을 먼저 데웁니다.”
            </p>
          </div>
        </div>
      </section>

      {/* ESG */}
      <section style={{ padding: '32px 0 76px' }}>
        <div className="container">
          <div style={{ marginBottom: 22 }}>
            <p style={{ color: 'var(--red)', fontSize: 12, fontWeight: 900, letterSpacing: 1.2, marginBottom: 8 }}>ESG VISION</p>
            <h2 style={{ color: 'var(--navy)', fontSize: '1.6rem', fontWeight: 900, lineHeight: 1.35 }}>
              에너지·사람·신뢰, 세 축의 약속
            </h2>
          </div>

          <div className="ceo-esg-grid">
            {ESG_PILLARS.map((p) => (
              <article key={p.tag} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 14, padding: 24 }}>
                <span style={{ display: 'inline-block', padding: '4px 10px', background: '#FEF2F2', color: 'var(--red)', borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 1, marginBottom: 12 }}>
                  {p.tag}
                </span>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.1rem', fontWeight: 900, marginBottom: 10, lineHeight: 1.4 }}>{p.title}</h3>
                <p style={{ color: '#64748B', lineHeight: 1.8, fontSize: '0.95rem' }}>{p.body}</p>
              </article>
            ))}
          </div>

          {/* CTA row */}
          <div style={{ marginTop: 36, display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link to="/about/history" style={{ display: 'inline-flex', padding: '13px 22px', background: 'var(--navy)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              회사 연혁 보기
            </Link>
            <Link to="/about/certifications" style={{ display: 'inline-flex', padding: '13px 22px', background: '#fff', color: 'var(--navy)', border: '1px solid #CBD5E1', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              인증·특허 보기
            </Link>
            <Link to="/contact" style={{ display: 'inline-flex', padding: '13px 22px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              상담 문의
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .ceo-esg-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
        @media (max-width: 860px) { .ceo-esg-grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}

