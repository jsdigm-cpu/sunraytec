import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const MATERIALS = [
  { title: '일위대가표', desc: '공공기관 설계·견적 검토용 기본 산출 자료', status: '인증 후 제공' },
  { title: '도면·CAD 원본', desc: '제품 배치와 시공 검토에 필요한 원본 자료', status: '요청 검토' },
  { title: '제안서 양식', desc: '기관 내부 검토와 품의에 활용할 수 있는 기본 문서', status: '준비중' },
  { title: '시방·인증 자료', desc: '방폭·조달·성능 인증 관련 제출 자료 묶음', status: '인증 후 제공' },
];

const STEPS = [
  '공공기관 또는 교육기관 이메일로 회원가입',
  '담당자 승인 후 파트너 권한 부여',
  '파트너 포털에서 자료 열람 및 다운로드',
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
                <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
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
                  <p style={{ color: '#334155', fontWeight: 700 }}>{step}</p>
                </div>
              ))}
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
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        @media (max-width: 900px) {
          .fasttrack-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .fasttrack-steps {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px) {
          .fasttrack-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  );
}
