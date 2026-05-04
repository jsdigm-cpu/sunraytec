import { useState, useEffect } from 'react';
import type React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

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

interface PartnerFile {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string | null;
  file_size: string | null;
  updated_at?: string;
}

const CATEGORY_COLOR: Record<string, string> = {
  '가격표': '#EF4444',
  '기술자료': '#3B82F6',
  '인증서': '#10B981',
  '파트너 자료': '#7C3AED',
  '기타': '#6B7280',
};

export default function PartnerPortalPage() {
  const { profile, signOut, refreshProfile } = useAuth();
  const [files, setFiles] = useState<PartnerFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [fileNotice, setFileNotice] = useState('');
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeTab, setActiveTab] = useState<'files' | 'profile'>('files');
  const [profileForm, setProfileForm] = useState({
    full_name: '',
    company_name: '',
    phone: '',
    organization: '',
    position: '',
    interest_area: INTEREST_OPTIONS[0],
  });
  const [passwordForm, setPasswordForm] = useState({ password: '', password2: '' });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileNotice, setProfileNotice] = useState('');

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from('resource_documents')
      .select('id,title,description,category,file_url,file_size,sort_order,updated_at')
      .eq('category', '파트너 자료')
      .order('sort_order', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          setFileNotice(`파트너 자료를 불러오지 못했습니다: ${error.message}`);
          setLoading(false);
          return;
        }
        if (data) setFiles(data as PartnerFile[]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!supabase) return;
    supabase.rpc('track_partner_portal_visit').then(({ error }) => {
      if (error) console.warn('[Partner] track_partner_portal_visit failed:', error.message);
    });
  }, []);

  useEffect(() => {
    if (!profile) return;
    setProfileForm({
      full_name: profile.full_name ?? '',
      company_name: profile.company_name ?? '',
      phone: profile.phone ?? '',
      organization: profile.organization ?? '',
      position: profile.position ?? '',
      interest_area: profile.interest_area || INTEREST_OPTIONS[0],
    });
  }, [profile]);

  async function saveProfile(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setProfileNotice('');
    if (!/^0\d{1,2}-?\d{3,4}-?\d{4}$/.test(profileForm.phone.trim())) {
      setProfileNotice('연락처 형식을 확인해주세요. 예: 010-0000-0000');
      return;
    }

    setProfileSaving(true);
    const { error } = await supabase.rpc('update_own_partner_profile', {
      new_full_name: profileForm.full_name.trim(),
      new_company_name: profileForm.company_name.trim(),
      new_phone: profileForm.phone.trim(),
      new_organization: profileForm.organization.trim(),
      new_position: profileForm.position.trim(),
      new_interest_area: profileForm.interest_area,
    });
    setProfileSaving(false);

    if (error) {
      setProfileNotice(`정보 저장 실패: ${error.message}`);
      return;
    }
    await refreshProfile();
    setProfileNotice('내 정보가 저장되었습니다.');
  }

  async function updatePassword(e: React.FormEvent) {
    e.preventDefault();
    if (!supabase) return;
    setProfileNotice('');
    if (passwordForm.password.length < 8) {
      setProfileNotice('비밀번호는 8자 이상이어야 합니다.');
      return;
    }
    if (passwordForm.password !== passwordForm.password2) {
      setProfileNotice('비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    setProfileSaving(true);
    const { error } = await supabase.auth.updateUser({ password: passwordForm.password });
    setProfileSaving(false);

    if (error) {
      setProfileNotice(`비밀번호 변경 실패: ${error.message}`);
      return;
    }
    setPasswordForm({ password: '', password2: '' });
    setProfileNotice('비밀번호가 변경되었습니다.');
  }

  const categories = ['전체', ...Array.from(new Set(files.map((f) => f.category)))];
  const filtered = activeCategory === '전체' ? files : files.filter((f) => f.category === activeCategory);

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* 헤더 */}
      <header style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #152035 100%)', padding: '0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/images/copmany_logo.png" alt="썬레이텍" style={{ height: '32px', objectFit: 'contain' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>|</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 700 }}>🔒 협력업체 전용 자료실</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
              {profile?.company_name} · {profile?.full_name}
            </span>
            <button
              onClick={signOut}
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: '6px', padding: '5px 12px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 서브 히어로 */}
      <section style={{ background: 'linear-gradient(160deg, #0F2241 0%, #1A3A6B 100%)', padding: '40px 0 48px' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(200,57,43,0.35)', border: '1px solid rgba(200,57,43,0.6)', borderRadius: '999px', padding: '4px 14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FCA5A5' }}>🔐 협력업체 전용</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>파트너 전용 자료실</h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>
              승인된 협력업체에게만 제공되는 자료입니다. 외부 유출을 금합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 파일 목록 */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveTab('files')}
              style={{ padding: '8px 18px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 700, background: activeTab === 'files' ? 'var(--navy)' : '#E5E7EB', color: activeTab === 'files' ? '#fff' : '#374151' }}
            >
              자료실
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              style={{ padding: '8px 18px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '0.86rem', fontWeight: 700, background: activeTab === 'profile' ? 'var(--navy)' : '#E5E7EB', color: activeTab === 'profile' ? '#fff' : '#374151' }}
            >
              내 정보
            </button>
          </div>

          {activeTab === 'files' ? (
            <>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '6px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none',
                      background: activeCategory === cat ? 'var(--navy)' : '#E5E7EB',
                      color: activeCategory === cat ? '#fff' : '#374151',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {loading ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>불러오는 중...</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {fileNotice && (
                    <div style={{ padding: '14px 16px', borderRadius: '8px', background: '#FEF2F2', border: '1px solid #FCA5A5', color: '#B91C1C', fontSize: '0.84rem', fontWeight: 700 }}>
                      {fileNotice}
                    </div>
                  )}
                  {filtered.map((file) => (
                    <motion.div
                      key={file.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
                    >
                      <div style={{ flexShrink: 0, width: '48px', height: '48px', background: '#FEE2E2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                        📄
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontSize: '10px', fontWeight: 700, background: CATEGORY_COLOR[file.category] || '#6B7280', color: '#fff', padding: '2px 8px', borderRadius: '999px' }}>
                            {file.category}
                          </span>
                          {file.updated_at && <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{file.updated_at.slice(0, 10)}</span>}
                        </div>
                        <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.95rem', marginBottom: '3px' }}>{file.title}</p>
                        {file.description && <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>{file.description}</p>}
                      </div>

                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        {file.file_size && <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '8px' }}>{file.file_size}</p>}
                        {file.file_url ? (
                          <a
                            href={file.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--navy)', color: '#fff', padding: '8px 18px', borderRadius: '7px', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
                          >
                            다운로드
                          </a>
                        ) : (
                          <span style={{ display: 'inline-flex', alignItems: 'center', background: '#F3F4F6', color: '#9CA3AF', padding: '8px 18px', borderRadius: '7px', fontSize: '0.82rem', fontWeight: 700 }}>
                            준비중
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {filtered.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF', fontSize: '0.9rem' }}>
                      해당 카테고리의 자료가 없습니다.
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(280px, 420px)', gap: '18px', alignItems: 'start' }}>
              <form onSubmit={saveProfile} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                <h2 style={{ margin: '0 0 18px', color: '#0F2241', fontSize: '1.1rem', fontWeight: 800 }}>기본 정보</h2>
                <ProfileRow label="담당자명">
                  <input required style={inputStyle} value={profileForm.full_name} onChange={(e) => setProfileForm((f) => ({ ...f, full_name: e.target.value }))} />
                </ProfileRow>
                <ProfileRow label="회사명">
                  <input required style={inputStyle} value={profileForm.company_name} onChange={(e) => setProfileForm((f) => ({ ...f, company_name: e.target.value }))} />
                </ProfileRow>
                <ProfileRow label="조직(부서명)">
                  <input style={inputStyle} value={profileForm.organization} onChange={(e) => setProfileForm((f) => ({ ...f, organization: e.target.value }))} />
                </ProfileRow>
                <ProfileRow label="직책(직위)">
                  <input style={inputStyle} value={profileForm.position} onChange={(e) => setProfileForm((f) => ({ ...f, position: e.target.value }))} />
                </ProfileRow>
                <ProfileRow label="연락처">
                  <input required style={inputStyle} value={profileForm.phone} onChange={(e) => setProfileForm((f) => ({ ...f, phone: e.target.value }))} />
                </ProfileRow>
                <ProfileRow label="관심 사항">
                  <select style={inputStyle} value={profileForm.interest_area} onChange={(e) => setProfileForm((f) => ({ ...f, interest_area: e.target.value }))}>
                    {INTEREST_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                </ProfileRow>
                <button type="submit" disabled={profileSaving} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: profileSaving ? '#9CA3AF' : 'var(--navy)', color: '#fff', fontWeight: 800, cursor: profileSaving ? 'not-allowed' : 'pointer' }}>
                  정보 저장
                </button>
              </form>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <form onSubmit={updatePassword} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
                  <h2 style={{ margin: '0 0 18px', color: '#0F2241', fontSize: '1.1rem', fontWeight: 800 }}>비밀번호 변경</h2>
                  <ProfileRow label="새 비밀번호">
                    <input type="password" minLength={8} style={inputStyle} value={passwordForm.password} onChange={(e) => setPasswordForm((f) => ({ ...f, password: e.target.value }))} />
                  </ProfileRow>
                  <ProfileRow label="비밀번호 확인">
                    <input type="password" minLength={8} style={inputStyle} value={passwordForm.password2} onChange={(e) => setPasswordForm((f) => ({ ...f, password2: e.target.value }))} />
                  </ProfileRow>
                  <button type="submit" disabled={profileSaving} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: 'none', background: profileSaving ? '#9CA3AF' : 'var(--red)', color: '#fff', fontWeight: 800, cursor: profileSaving ? 'not-allowed' : 'pointer' }}>
                    비밀번호 변경
                  </button>
                </form>

                <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', color: '#4B5563', fontSize: '0.84rem', lineHeight: 1.7 }}>
                  <strong style={{ color: '#0F2241' }}>접속 정보</strong>
                  <p style={{ marginTop: '8px' }}>로그인 횟수: {profile?.login_count ?? 0}회</p>
                  <p>자료실 방문: {profile?.portal_visit_count ?? 0}회</p>
                  <p>이메일: {profile?.email}</p>
                </div>

                {profileNotice && (
                  <div style={{ padding: '12px 14px', borderRadius: '8px', background: profileNotice.includes('실패') || profileNotice.includes('확인') ? '#FEF2F2' : '#ECFDF5', border: `1px solid ${profileNotice.includes('실패') || profileNotice.includes('확인') ? '#FCA5A5' : '#A7F3D0'}`, color: profileNotice.includes('실패') || profileNotice.includes('확인') ? '#B91C1C' : '#047857', fontSize: '0.84rem', fontWeight: 700 }}>
                    {profileNotice}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function ProfileRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#374151', marginBottom: '5px' }}>{label}</label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = { width: '100%', border: '1.5px solid #D1D5DB', borderRadius: '8px', padding: '10px 12px', fontSize: '0.9rem', color: '#1F2937', outline: 'none', boxSizing: 'border-box', background: '#fff' };
