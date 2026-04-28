import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const MATERIALS = [
  { title: '일위대가표', desc: '공공기관 설계·견적 검토용 기본 산출 자료 (모델별 단가·노무비·재료비 정리)', status: '인증 후 제공' },
  { title: '도면·CAD 원본', desc: '천장 매립형·노출형 시공상세도, 단면도, 배치 도면 원본(DWG/DXF)', status: '요청 검토' },
  { title: '제안서 양식', desc: '기관 내부 검토와 품의에 활용할 수 있는 PowerPoint·Word 양식', status: '준비중' },
  { title: '시방·인증 자료', desc: '방폭(EX emb II T1)·조달 우수제품·K마크·CE 인증 관련 제출 자료 묶음', status: '인증 후 제공' },
  { title: '에너지 절감 시뮬레이션', desc: '면적·천장고 기반 절감률·회수기간 산출 표 (검토 자료 첨부용)', status: '준비중' },
  { title: '시공 사례 PDF', desc: '비슷한 규모·용도 기관의 적용 사례 요약본', status: '인증 후 제공' },
];

const STEPS = [
  '공공기관 또는 교육기관 이메일(.go.kr / .mil.kr / .ac.kr 등)로 회원가입',
  '담당자 승인 후 파트너 권한 부여 (영업일 기준 1~2일 소요)',
  '패스트트랙 라운지에서 일위대가표·도면·제안서 양식 즉시 다운로드',
  '필요 시 본사 기술팀과 화상 회의 또는 방문 상담 연결',
];

const ELIGIBILITY = [
  { tag: '공공', title: '중앙·지자체 행정기관', body: '청사·민원실·복지시설·산하 사업소 도입 검토' },
  { tag: '교육', title: '학교·교육청', body: '교실·체육관·실험실 등 학생 시설 난방 보강' },
  { tag: '국방', title: '군 부대·관련 기관', body: '병영·정비고·방폭 환경 등 특수 시설 난방' },
  { tag: '공공기관', title: '공기업·준정부기관', body: '발전·물류·연구 시설 등 대공간 난방 검토' },
];

const QUICK_LINKS = [
  { title: '나라장터 우수제품 식별', body: '조달 우수제품 단가·식별번호는 본사로 연락 시 즉시 회신해드립니다.' },
  { title: '도입 사례 매칭', body: '비슷한 규모·용도 기관의 도입 사례 PDF를 묶음으로 제공합니다.' },
  { title: '직접 통화 라인', body: '평일 09:00–18:00, 1688-2520 → 공공기관 직통으로 안내됩니다.' },
];

export default function FastTrackPage() {
  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <section
        style={{
          background: 'linear-gradient(135deg, #2B155F 0%, #0F2241 72%)',
          color: '#fff',
          padding: '64px 0 72px',
        }}
      >
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,0.52)', marginBottom: 22 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.52)', textDecoration: 'none' }}>홈</Link>
              <span>›</span>
              <span style={{ color: 'rgba(255,255,255,0.86)', fontWeight: 700 }}>패스트트랙 라운지</span>
            </div>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 14px',
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.22)',
                background: 'rgba(255,255,255,0.1)',
                color: '#FFB23F',
                fontSize: 12,
                fontWeight: 900,
                marginBottom: 18,
              }}
            >
              🔐 공공기관 전용 자료 라운지
            </span>

            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', lineHeight: 1.12, fontWeight: 900, marginBottom: 16 }}>
              설계·견적 검토 자료를
              <br />
              더 빠르게 전달합니다
            </h1>
            <p style={{ maxWidth: 680, color: 'rgba(255,255,255,0.72)', fontSize: '1.02rem', lineHeight: 1.85, marginBottom: 30 }}>
              공공기관·교육기관·군 관련 담당자에게 필요한 일위대가표, 도면 원본, 제안서 양식,
              인증 자료를 파트너 승인 후 한 곳에서 확인할 수 있도록 준비 중입니다.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link
                to="/partner/signup-guide"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'var(--red)',
                  color: '#fff',
                  padding: '13px 22px',
                  borderRadius: 8,
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                회원가입 안내 보기
              </Link>
              <Link
                to="/partner"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  background: 'rgba(255,255,255,0.13)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.3)',
                  padding: '12px 22px',
                  borderRadius: 8,
                  fontWeight: 800,
                  textDecoration: 'none',
                }}
              >
                파트너 포털로 이동
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '54px 0 72px' }}>
        <div className="container">
          <div className="fasttrack-grid">
            {MATERIALS.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.38, delay: index * 0.06 }}
                style={{
                  background: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0 10px 30px rgba(15,34,65,0.07)',
                }}
              >
                <span style={{ display: 'inline-block', color: 'var(--red)', fontSize: 12, fontWeight: 900, marginBottom: 12 }}>
                  {item.status}
                </span>
                <h2 style={{ color: 'var(--navy)', fontSize: '1.2rem', fontWeight: 900, marginBottom: 8 }}>{item.title}</h2>
                <p style={{ color: '#64748B', fontSize: '0.92rem', lineHeight: 1.65 }}>{item.desc}</p>
              </motion.article>
            ))}
          </div>

          {/* Eligibility */}
          <div style={{ marginTop: 28 }}>
            <h2 style={{ color: 'var(--navy)', fontSize: '1.35rem', fontWeight: 900, marginBottom: 14 }}>이용 가능 기관</h2>
            <div className="fasttrack-elig">
              {ELIGIBILITY.map((e) => (
                <article key={e.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20 }}>
                  <span style={{ display: 'inline-block', padding: '3px 10px', background: '#FEF2F2', color: 'var(--red)', borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5, marginBottom: 10 }}>
                    {e.tag}
                  </span>
                  <h3 style={{ color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 900, marginBottom: 6 }}>{e.title}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.93rem' }}>{e.body}</p>
                </article>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div
            style={{
              marginTop: 28,
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: 12,
              padding: 28,
            }}
          >
            <h2 style={{ color: 'var(--navy)', fontSize: '1.35rem', fontWeight: 900, marginBottom: 18 }}>이용 절차</h2>
            <div className="fasttrack-steps">
              {STEPS.map((step, index) => (
                <div key={step} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <span
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#0F2241',
                      color: '#fff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      flexShrink: 0,
                    }}
                  >
                    {index + 1}
                  </span>
                  <p style={{ color: '#334155', fontWeight: 700, lineHeight: 1.55 }}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div style={{ marginTop: 28 }}>
            <h2 style={{ color: 'var(--navy)', fontSize: '1.35rem', fontWeight: 900, marginBottom: 14 }}>빠른 도움 채널</h2>
            <div className="fasttrack-quick">
              {QUICK_LINKS.map((q) => (
                <article key={q.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 20 }}>
                  <h3 style={{ color: 'var(--navy)', fontSize: '1.02rem', fontWeight: 900, marginBottom: 6 }}>{q.title}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.7, fontSize: '0.93rem' }}>{q.body}</p>
                </article>
              ))}
            </div>
            <div style={{ marginTop: 18, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/contact" style={{ display: 'inline-flex', padding: '11px 18px', background: 'var(--red)', color: '#fff', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                견적 문의 작성
              </Link>
              <a href="https://www.g2b.go.kr" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', padding: '11px 18px', background: '#fff', color: 'var(--navy)', border: '1px solid #CBD5E1', borderRadius: 8, fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>
                나라장터 바로가기
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .fasttrack-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }

        .fasttrack-steps {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .fasttrack-elig {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 14px;
        }

        .fasttrack-quick {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
        }

        @media (max-width: 1024px) {
          .fasttrack-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .fasttrack-elig {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .fasttrack-steps {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
          .fasttrack-quick {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .fasttrack-grid,
          .fasttrack-elig,
          .fasttrack-steps {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
