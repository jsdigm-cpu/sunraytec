import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const TARGETS = [
  { icon: '⚡', title: '전기·설비 시공사', body: '학교·공공기관 전기/기계 공사 실적 보유, 지역 거점 운영' },
  { icon: '🏗️', title: '건축·인테리어 시공사', body: '리모델링·신축 현장에서 복사난방을 옵션으로 제안할 수 있는 파트너' },
  { icon: '🌬️', title: '냉난방·공조 전문사', body: '기존 공조 라인업에 복사난방을 추가하고자 하는 업체' },
  { icon: '🛒', title: '조달·MRO 유통사', body: '나라장터·MAS·MRO 채널 영업력을 보유한 공급사' },
];

const BENEFITS = [
  { title: '단가·수수료 우대', body: '공급 단계별 단가 정책과 영업 인센티브를 제공합니다.' },
  { title: '영업 자료 패키지', body: '카탈로그·시방서·도면·인증서·제안서 양식을 한 번에 받습니다.' },
  { title: '제품·시공 교육', body: '온라인/오프라인 교육과 기술지원팀의 현장 동행을 지원합니다.' },
  { title: '공동 영업', body: '대형 공공·산업 안건은 본사 기술팀이 함께 검토하고 제안에 동참합니다.' },
  { title: '리드 공유', body: '파트너 권역 내 발생한 견적 문의를 우선 배정합니다.' },
  { title: '시공 후 사후관리', body: '본사·협력사 공동 점검 체계로 사후관리 부담을 분담합니다.' },
];

const STEPS = [
  { step: '01', title: '신청 접수', body: '파트너·협력회사 회원가입 안내 페이지에서 기본 정보를 제출합니다.' },
  { step: '02', title: '담당자 검토', body: '사업자 정보·실적·지역·관심 분야를 본사 영업팀이 1차 검토합니다.' },
  { step: '03', title: '미팅·실사', body: '필요 시 화상 또는 본사 방문 미팅으로 협력 범위를 협의합니다.' },
  { step: '04', title: '계약·교육', body: '협력 계약 체결 후 영업 자료 패키지·제품 교육을 진행합니다.' },
  { step: '05', title: '본격 협업', body: '파트너 포털 권한 부여, 자료 다운로드, 견적 협업을 시작합니다.' },
];

const FAQ = [
  { q: '지역 독점 영업권이 보장되나요?', a: '안건의 규모와 파트너 역량에 따라 권역 우선권을 협의합니다. 완전한 독점보다는 효율적인 분담을 우선합니다.' },
  { q: '소규모 시공사도 신청할 수 있나요?', a: '규모보다 안건 발굴 능력과 시공 품질을 우선합니다. 1인 사업자라도 분야 특화가 명확하면 검토 가능합니다.' },
  { q: '기존 거래처가 있어도 협력이 가능한가요?', a: '경쟁 제품 취급 여부와는 별개로 복사난방 영역 협력이 가능합니다. 기존 거래 보안을 침해하지 않는 범위에서 운영합니다.' },
];

export default function DealersPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <section style={{ background: 'linear-gradient(150deg, #1A3A6B 0%, #0F2241 100%)', color: '#fff', padding: '58px 0 64px' }}>
        <div className="container">
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 12, marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>홈</Link> › 고객센터 ›{' '}
            <span style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>대리점 모집</span>
          </p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p style={{ color: 'var(--amber2)', fontSize: 12, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Dealer Program</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 12 }}>
              지역 영업·시공 파트너를 찾습니다
            </h1>
            <p style={{ maxWidth: 720, color: 'rgba(255,255,255,.72)', lineHeight: 1.85 }}>
              2002년부터 이어진 기술개발 경험과 2009년 법인 설립 이후 축적한 복사난방 영업·시공 노하우를 함께 나눌 지역 파트너를 모집합니다.
              안정적인 단가, 영업 자료, 본사 기술 지원, 공공조달 채널 활용까지 한 번에 제공합니다.
            </p>
          </motion.div>

          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <Link to="/partner/signup-guide" style={{ display: 'inline-flex', padding: '13px 22px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              파트너 신청 안내
            </Link>
            <Link to="/contact" style={{ display: 'inline-flex', padding: '13px 22px', background: 'rgba(255,255,255,0.13)', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              사전 상담 요청
            </Link>
          </div>
        </div>
      </section>

      {/* Targets */}
      <section style={{ padding: '52px 0 28px' }}>
        <div className="container">
          <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 18 }}>모집 대상</h2>
          <div className="dealer-target-grid">
            {TARGETS.map((t) => (
              <article key={t.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 22 }}>
                <span style={{ fontSize: 26, marginBottom: 8, display: 'inline-block' }}>{t.icon}</span>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 900, marginBottom: 8 }}>{t.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.93rem' }}>{t.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section style={{ padding: '28px 0' }}>
        <div className="container">
          <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 18 }}>파트너 혜택</h2>
          <div className="dealer-benefit-grid">
            {BENEFITS.map((b) => (
              <article key={b.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 22 }}>
                <h3 style={{ color: 'var(--red)', fontSize: '0.95rem', fontWeight: 900, marginBottom: 8, letterSpacing: 0.5 }}>{b.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '28px 0' }}>
        <div className="container">
          <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 18 }}>신청부터 협업까지</h2>
          <div className="dealer-step-grid">
            {STEPS.map((s) => (
              <article key={s.step} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20 }}>
                <span style={{ display: 'inline-block', color: 'var(--red)', fontSize: 12, fontWeight: 900, letterSpacing: 1, marginBottom: 8 }}>STEP {s.step}</span>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 900, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.93rem' }}>{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '28px 0 80px' }}>
        <div className="container">
          <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 18 }}>파트너 모집 FAQ</h2>
          <div style={{ display: 'grid', gap: 12 }}>
            {FAQ.map((item) => (
              <article key={item.q} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 22 }}>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.02rem', fontWeight: 800, marginBottom: 8 }}>Q. {item.q}</h3>
                <p style={{ color: '#475569', lineHeight: 1.8 }}>
                  <span style={{ color: 'var(--red)', fontWeight: 900, marginRight: 6 }}>A.</span>
                  {item.a}
                </p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 26, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link to="/signup" style={{ display: 'inline-flex', padding: '12px 22px', background: 'var(--navy)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              파트너 회원가입
            </Link>
            <Link to="/contact" style={{ display: 'inline-flex', padding: '12px 22px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none' }}>
              사전 문의
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        .dealer-target-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
        .dealer-benefit-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
        .dealer-step-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 12px; }
        @media (max-width: 1024px) {
          .dealer-step-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 760px) {
          .dealer-target-grid { grid-template-columns: 1fr; }
          .dealer-benefit-grid { grid-template-columns: 1fr; }
          .dealer-step-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
