import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import SubHero from '../../components/layout/SubHero';
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
            <SubHero
        breadcrumb={[{ label: '파트너 가입 안내' }]}
        badge="Partner Sign-up"
        title="파트너·협력회사 회원가입 안내"
        keywords={['파트너 등록 절차', '전용 자료 접근', '승인 기반 운영', '상담·프로젝트 연계']}
      />

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
