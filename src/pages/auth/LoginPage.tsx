import { useState, useEffect } from 'react';
import type React from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginPage() {
  const { signIn, user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginAttempted, setLoginAttempted] = useState(false);

  // profile이 완전히 로드된 후 역할에 맞는 페이지로 이동
  useEffect(() => {
    if (!loginAttempted) return;
    if (authLoading) return;      // 아직 로딩 중
    if (user && !profile) {
      setError('로그인은 되었지만 회원 프로필을 찾을 수 없습니다. 관리자에게 문의해 주세요.');
      return;
    }
    if (profile.role === 'admin') navigate('/admin');
    else navigate('/partner');
  }, [loginAttempted, authLoading, user, profile, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const err = await signIn(form.email, form.password);
    setLoading(false);
    if (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
      return;
    }
    // 로그인 성공 플래그 설정 → useEffect가 profile 로드 완료 후 이동
    setLoginAttempted(true);
  }

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0A1628 0%, #152035 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '100%', maxWidth: '420px' }}
      >
        {/* 로고 */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/">
            <img src="/images/copmany_logo.png" alt="썬레이텍" style={{ height: '48px', objectFit: 'contain' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
          </Link>
          <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginTop: '8px' }}>(주)썬레이텍 파트너 포털</p>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '36px 32px', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
          <h1 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0F2241', marginBottom: '24px', textAlign: 'center' }}>로그인</h1>

          {searchParams.get('verified') === '1' && (
            <div style={{ background: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', padding: '10px 14px', fontSize: '0.85rem', color: '#047857', marginBottom: '16px', fontWeight: 700 }}>
              이메일 인증이 완료되었습니다. 관리자 승인 후 전용 자료실을 이용하실 수 있습니다.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label style={labelStyle}>이메일</label>
              <input
                type="email" required autoComplete="email"
                style={inputStyle}
                placeholder="example@company.com"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              />
            </div>
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>비밀번호</label>
              <input
                type="password" required autoComplete="current-password"
                style={inputStyle}
                placeholder="비밀번호 입력"
                value={form.password}
                onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              />
            </div>

            {error && (
              <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '10px 14px', fontSize: '0.85rem', color: '#DC2626', marginBottom: '16px' }}>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{ width: '100%', padding: '13px', background: loading ? '#9CA3AF' : 'var(--navy)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? '로그인 중...' : '로그인'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.85rem', color: '#6B7280' }}>
            협력업체 등록 신청이 필요하신가요?{' '}
            <Link to="/signup" style={{ color: 'var(--navy)', fontWeight: 700 }}>가입 신청</Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <Link to="/" style={{ fontSize: '0.8rem', color: '#9CA3AF' }}>← 메인 홈페이지로</Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

const labelStyle: React.CSSProperties = { display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '6px' };
const inputStyle: React.CSSProperties = { width: '100%', border: '1.5px solid #D1D5DB', borderRadius: '8px', padding: '10px 12px', fontSize: '0.9rem', color: '#1F2937', outline: 'none', boxSizing: 'border-box' };
