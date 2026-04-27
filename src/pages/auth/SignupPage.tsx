import { useState } from 'react';
import type React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';

const INTEREST_OPTIONS = [
  '공공기관 조달/나라장터',
  '교육시설 난방',
  '산업/물류 현장',
  '국방/특수시설',
  '방폭/위험물 시설',
  '전기요금/에너지 절감',
  '제품 견적/대리점 협력',
  '기타 상담',
];

export default function SignupPage() {
  const { signUp } = useAuth();
  const [form, setForm] = useState({ email: '', password: '', password2: '', full_name: '', company_name: '', phone: '', organization: '', position: '', interest_area: INTEREST_OPTIONS[0] });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm((f) => ({ ...f, [k]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (form.password !== form.password2) { setError('비밀번호가 일치하지 않습니다.'); return; }
    if (form.password.length < 8) { setError('비밀번호는 8자 이상이어야 합니다.'); return; }
    if (!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(form.phone.trim())) {
      setError('연락처 형식을 확인해주세요. 예: 010-0000-0000');
      return;
    }
    setLoading(true);
    const err = await signUp(form.email.trim(), form.password, {
      full_name: form.full_name.trim(),
      company_name: form.company_name.trim(),
      phone: form.phone.trim(),
      organization: form.organization.trim(),
      position: form.position.trim(),
      interest_area: form.interest_area,
    });
    setLoading(false);
    if (err) { setError('가입 오류: ' + err); return; }
    setDone(true);
  }

  if (done) {
    return (
      <main style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0A1628 0%, #152035 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ background: '#fff', borderRadius: '16px', padding: '48px 32px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>✅</div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0F2241', marginBottom: '12px' }}>가입 신청이 완료됐습니다!</h2>
          <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '28px' }}>
            입력하신 이메일로 인증 메일을 보냈습니다.<br />
            이메일 인증 후 담당자 승인이 완료되면<br />
            전용 자료실 접근이 가능합니다.<br />
            <strong>영업일 기준 1~2일</strong> 소요됩니다.
          </p>
          <Link to="/" style={{ display: 'inline-block', padding: '12px 28px', background: 'var(--navy)', color: '#fff', borderRadius: '8px', fontWeight: 700, textDecoration: 'none' }}>
            메인 홈페이지로
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', background: 'linear-gradient(160deg, #0A1628 0%, #152035 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 16px' }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ width: '100%', maxWidth: '460px' }}>
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 700, fontSize: '1rem' }}>(주)썬레이텍 협력업체 파트너 신청</p>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.82rem', marginTop: '4px' }}>승인 후 협력업체 전용 자료실에 접근하실 수 있습니다</p>
        </div>

        <div style={{ background: '#fff', borderRadius: '16px', padding: '32px 28px', boxShadow: '0 8px 40px rgba(0,0,0,0.3)' }}>
          <h1 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0F2241', marginBottom: '20px' }}>협력업체 가입 신청</h1>

          <form onSubmit={handleSubmit}>
            <Row label="담당자명">
              <input style={inputStyle} required placeholder="홍길동" value={form.full_name} onChange={set('full_name')} />
            </Row>
            <Row label="회사명">
              <input style={inputStyle} required placeholder="(주)협력업체" value={form.company_name} onChange={set('company_name')} />
            </Row>
            <Row label="조직(부서명)">
              <input style={inputStyle} placeholder="예: 시설관리팀, 조달영업팀" value={form.organization} onChange={set('organization')} />
            </Row>
            <Row label="직책(직위)">
              <input style={inputStyle} placeholder="예: 팀장, 대리, 대표" value={form.position} onChange={set('position')} />
            </Row>
            <Row label="연락처">
              <input style={inputStyle} required placeholder="010-0000-0000" value={form.phone} onChange={set('phone')} />
            </Row>
            <Row label="관심 사항">
              <select
                style={inputStyle}
                required
                value={form.interest_area}
                onChange={(e) => setForm((f) => ({ ...f, interest_area: e.target.value }))}
              >
                {INTEREST_OPTIONS.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </Row>
            <Row label="이메일 (로그인 ID)">
              <input style={inputStyle} type="email" required placeholder="example@company.com" value={form.email} onChange={set('email')} />
            </Row>
            <Row label="비밀번호 (8자 이상)">
              <input style={inputStyle} type="password" required placeholder="비밀번호" value={form.password} onChange={set('password')} />
            </Row>
            <Row label="비밀번호 확인">
              <input style={inputStyle} type="password" required placeholder="비밀번호 재입력" value={form.password2} onChange={set('password2')} />
            </Row>

            {error && (
              <div style={{ background: '#FEE2E2', border: '1px solid #FCA5A5', borderRadius: '8px', padding: '10px 14px', fontSize: '0.85rem', color: '#DC2626', margin: '12px 0' }}>
                {error}
              </div>
            )}

            <button
              type="submit" disabled={loading}
              style={{ width: '100%', padding: '13px', background: loading ? '#9CA3AF' : 'var(--red)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '8px' }}
            >
              {loading ? '처리 중...' : '가입 신청하기'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.82rem', color: '#9CA3AF' }}>
            이미 계정이 있으신가요?{' '}
            <Link to="/login" style={{ color: 'var(--navy)', fontWeight: 700 }}>로그인</Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#374151', marginBottom: '5px' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', border: '1.5px solid #D1D5DB', borderRadius: '8px', padding: '9px 12px', fontSize: '0.875rem', color: '#1F2937', outline: 'none', boxSizing: 'border-box' };
