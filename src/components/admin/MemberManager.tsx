import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import emailjs from '@emailjs/browser';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  company_name: string;
  phone: string;
  role: 'admin' | 'partner';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  approved_at: string | null;
}

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  pending:  { label: '대기',   color: '#92400E', bg: '#FEF3C7' },
  approved: { label: '승인',   color: '#065F46', bg: '#D1FAE5' },
  rejected: { label: '거절',   color: '#991B1B', bg: '#FEE2E2' },
};

export default function MemberManager() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [saving, setSaving] = useState<string | null>(null);
  const [notice, setNotice] = useState('');

  async function load() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) setNotice(`회원 목록을 불러오지 못했습니다: ${error.message}`);
    if (data) setMembers(data as Profile[]);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(member: Profile, status: 'approved' | 'rejected') {
    if (!supabase) return;
    setSaving(member.id);
    setNotice('');
    const { error } = await supabase.from('profiles').update({
      status,
      approved_at: status === 'approved' ? new Date().toISOString() : null,
    }).eq('id', member.id);

    if (error) {
      setNotice(`상태 변경 실패: ${error.message}`);
      setSaving(null);
      return;
    }

    // DB 업데이트가 성공했고, 상태가 '승인(approved)'인 경우에만 이메일 발송
    if (status === 'approved') {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        setNotice('승인은 저장됐지만 EmailJS 환경변수가 없어 승인 안내 메일은 발송되지 않았습니다.');
        setSaving(null);
        load();
        return;
      }

      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            to_email: member.email,
            to_name: member.full_name,
            company_name: member.company_name,
          },
          publicKey
        );
        setNotice('승인이 저장됐고 안내 메일도 발송됐습니다.');
      } catch (err) {
        console.error('승인 안내 메일 발송 실패:', err);
        setNotice('승인은 저장됐지만 안내 메일 발송에 실패했습니다. EmailJS 설정을 확인해주세요.');
      }
    } else {
      setNotice('회원 상태가 변경됐습니다.');
    }

    setSaving(null);
    load();
  }

  const filtered = filter === 'all' ? members : members.filter((m) => m.status === filter);
  const pendingCount = members.filter((m) => m.status === 'pending').length;

  return (
    <div>
      {notice && (
        <div style={{ marginBottom: '14px', padding: '10px 14px', borderRadius: '8px', background: notice.includes('실패') || notice.includes('못했습니다') ? '#FEF2F2' : '#EFF6FF', color: notice.includes('실패') || notice.includes('못했습니다') ? '#B91C1C' : '#1E40AF', fontSize: '0.84rem', fontWeight: 700 }}>
          {notice}
        </div>
      )}

      {/* 필터 탭 */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
        {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            style={{
              padding: '6px 16px', borderRadius: '999px', border: 'none', cursor: 'pointer', fontSize: '0.82rem', fontWeight: 600,
              background: filter === s ? 'var(--navy)' : '#E5E7EB',
              color: filter === s ? '#fff' : '#374151',
              position: 'relative',
            }}
          >
            {s === 'all' ? '전체' : s === 'pending' ? '대기' : s === 'approved' ? '승인' : '거절'}
            {s === 'pending' && pendingCount > 0 && (
              <span style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#EF4444', color: '#fff', fontSize: '10px', fontWeight: 700, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {pendingCount}
              </span>
            )}
          </button>
        ))}
        <span style={{ marginLeft: 'auto', fontSize: '0.8rem', color: '#9CA3AF', alignSelf: 'center' }}>총 {filtered.length}명</span>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#9CA3AF' }}>불러오는 중...</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#9CA3AF', fontSize: '0.9rem' }}>해당 상태의 회원이 없습니다.</div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((member) => {
            const st = STATUS_LABEL[member.status];
            return (
              <div
                key={member.id}
                style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '10px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px' }}
              >
                {/* 상태 배지 */}
                <span style={{ flexShrink: 0, fontSize: '11px', fontWeight: 700, color: st.color, background: st.bg, padding: '3px 10px', borderRadius: '999px' }}>
                  {st.label}
                </span>

                {/* 정보 */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1F2937', marginBottom: '2px' }}>
                    {member.company_name} · {member.full_name}
                  </p>
                  <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                    {member.email} · {member.phone}
                  </p>
                  <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '2px' }}>
                    신청: {new Date(member.created_at).toLocaleDateString('ko-KR')}
                    {member.approved_at && ` · 승인: ${new Date(member.approved_at).toLocaleDateString('ko-KR')}`}
                  </p>
                </div>

                {/* 액션 버튼 */}
                {member.status === 'pending' && (
                  <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                    <button
                      onClick={() => updateStatus(member, 'approved')}
                      disabled={saving === member.id}
                      style={{ padding: '7px 16px', background: '#059669', color: '#fff', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                    >
                      ✓ 승인
                    </button>
                    <button
                      onClick={() => updateStatus(member, 'rejected')}
                      disabled={saving === member.id}
                      style={{ padding: '7px 16px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}
                    >
                      ✕ 거절
                    </button>
                  </div>
                )}
                {member.status === 'approved' && (
                  <button
                    onClick={() => updateStatus(member, 'rejected')}
                    style={{ padding: '6px 14px', background: 'none', border: '1px solid #FCA5A5', color: '#EF4444', borderRadius: '7px', fontSize: '0.78rem', cursor: 'pointer' }}
                  >
                    승인 취소
                  </button>
                )}
                {member.status === 'rejected' && (
                  <button
                    onClick={() => updateStatus(member, 'approved')}
                    style={{ padding: '6px 14px', background: 'none', border: '1px solid #6EE7B7', color: '#059669', borderRadius: '7px', fontSize: '0.78rem', cursor: 'pointer' }}
                  >
                    재승인
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
