import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function PartnerPendingPage() {
  const { profile, signOut } = useAuth();
  const isRejected = profile?.status === 'rejected';

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0A1628 0%, #152035 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <div style={{ background: '#fff', borderRadius: '16px', padding: '48px 36px', maxWidth: '460px', width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>
          {isRejected ? '❌' : '⏳'}
        </div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F2241', marginBottom: '12px' }}>
          {isRejected ? '가입이 거절됐습니다' : '승인 대기 중입니다'}
        </h2>
        <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '12px' }}>
          {isRejected
            ? '협력업체 가입 신청이 승인되지 않았습니다.\n문의사항은 아래 연락처로 연락해주세요.'
            : `${profile?.company_name ?? ''} 담당자님, 신청해주셔서 감사합니다.\n관리자 확인 후 승인이 완료되면 자료실 접근이 가능합니다.`
          }
        </p>
        <p style={{ color: '#9CA3AF', fontSize: '0.82rem', marginBottom: '28px' }}>📞 1688-2520 | ✉️ sunraytec@sunraytec.co.kr</p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ padding: '10px 22px', background: 'var(--navy)', color: '#fff', borderRadius: '8px', fontWeight: 700, textDecoration: 'none', fontSize: '0.875rem' }}>
            홈으로
          </Link>
          <button onClick={signOut} style={{ padding: '10px 22px', background: 'none', border: '2px solid #D1D5DB', color: '#6B7280', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', fontSize: '0.875rem' }}>
            로그아웃
          </button>
        </div>
      </div>
    </main>
  );
}
