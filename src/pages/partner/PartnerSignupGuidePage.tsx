import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, BadgeCheck, ClipboardList, FileCheck2, LockKeyhole, UserPlus } from 'lucide-react';

const PROCESS = [
  { step: '01', title: '회원가입 신청', desc: '회사명, 담당자, 연락처, 관심 분야를 입력해 파트너 가입을 신청합니다.' },
  { step: '02', title: '관리자 확인', desc: '썬레이텍 담당자가 신청 정보를 확인하고 협력 목적과 자료 권한을 검토합니다.' },
  { step: '03', title: '파트너 승인', desc: '승인 후 파트너 포털에서 전용 자료와 본인 정보를 확인할 수 있습니다.' },
];

const BENEFITS = [
  { icon: FileCheck2, title: '전용 자료 접근', desc: '제품 자료, 제안 검토 자료, 협력사 대상 파일을 한 곳에서 확인합니다.' },
  { icon: ClipboardList, title: '상담·프로젝트 연계', desc: '현장 조건, 관심 제품, 협력 분야를 바탕으로 담당자 확인이 쉬워집니다.' },
  { icon: LockKeyhole, title: '승인 기반 운영', desc: '파트너 자료는 관리자 승인 후 접근하도록 분리해 운영합니다.' },
];

export default function PartnerSignupGuidePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <section style={{ background: 'linear-gradient(150deg, #0A1628 0%, #16233A 55%, #2B1818 100%)', color: '#fff', padding: '58px 0 72px' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'rgba(255,255,255,0.48)', marginBottom: 22 }}>
              <Link to="/" style={{ color: 'rgba(255,255,255,0.48)' }}>홈</Link>
              <span>/</span>
              <strong style={{ color: 'rgba(255,255,255,0.82)' }}>파트너·협력회사 회원가입 안내</strong>
            </div>

            <div className="partner-guide-hero" style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 34, alignItems: 'center' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '7px 11px', borderRadius: 8, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', fontSize: 13, fontWeight: 800, marginBottom: 18 }}>
                  <UserPlus size={15} /> Partner Guide
                </div>
                <h1 style={{ fontSize: '2.45rem', lineHeight: 1.16, fontWeight: 900, marginBottom: 18 }}>
                  파트너·협력회사 회원가입 안내
                </h1>
                <p style={{ color: 'rgba(255,255,255,0.74)', fontSize: '1.02rem', lineHeight: 1.78, maxWidth: 590 }}>
                  협력사, 대리점, 설계·시공 파트너는 회원가입 후 관리자 승인 절차를 거쳐 파트너 전용 자료와 협업 정보를 확인할 수 있습니다.
                </p>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 28 }}>
                  <Link to="/signup" className="btn btn-primary" style={{ borderRadius: 8 }}>
                    회원가입 신청 <ArrowRight size={16} />
                  </Link>
                  <Link to="/login" className="btn btn-outline" style={{ borderRadius: 8 }}>
                    기존 파트너 로그인
                  </Link>
                </div>
              </div>

              <div style={{ background: '#fff', color: 'var(--navy)', borderRadius: 8, padding: 24, boxShadow: '0 28px 80px rgba(0,0,0,0.24)' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: 18 }}>가입 후 이용 흐름</h2>
                <div style={{ display: 'grid', gap: 12 }}>
                  {PROCESS.map((item) => (
                    <div key={item.step} style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: 12, padding: 14, border: '1px solid #E2E8F0', borderRadius: 8, background: '#F8FAFC' }}>
                      <span style={{ display: 'inline-flex', width: 42, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: '#FEE2E2', color: 'var(--red)', fontSize: 12, fontWeight: 900 }}>
                        {item.step}
                      </span>
                      <div>
                        <h3 style={{ fontSize: 15, fontWeight: 900, marginBottom: 5 }}>{item.title}</h3>
                        <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.62, fontWeight: 700 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '68px 0 78px', background: '#F8FAFC' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 34 }}>
            <p style={{ fontSize: 12, color: 'var(--red)', fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>Partner Access</p>
            <h2 style={{ color: 'var(--navy)', fontSize: '2rem', fontWeight: 900 }}>파트너 회원에게 제공되는 기능</h2>
          </div>

          <div className="partner-guide-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {BENEFITS.map(({ icon: Icon, title, desc }) => (
              <article key={title} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 14px 34px rgba(15,34,65,0.06)' }}>
                <Icon size={30} color="var(--red)" style={{ marginBottom: 16 }} />
                <h3 style={{ color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 900, marginBottom: 9 }}>{title}</h3>
                <p style={{ color: '#526173', fontSize: 14, lineHeight: 1.72 }}>{desc}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 24, display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: 14, alignItems: 'center', background: '#fff', border: '1px solid #FED7AA', borderRadius: 8, padding: 24 }} className="partner-guide-cta">
            <BadgeCheck size={30} color="var(--amber)" />
            <div>
              <h2 style={{ color: 'var(--navy)', fontSize: '1.16rem', fontWeight: 900, marginBottom: 5 }}>가입 신청 후 승인 상태는 별도 안내됩니다</h2>
              <p style={{ color: '#64748B', fontSize: 14 }}>승인 전에는 대기 페이지로 안내되며, 승인 완료 후 파트너 포털 이용이 가능합니다.</p>
            </div>
            <Link to="/signup" className="btn btn-primary" style={{ borderRadius: 8, flexShrink: 0 }}>
              회원가입 바로가기 <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .partner-guide-hero,
          .partner-guide-grid,
          .partner-guide-cta {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
