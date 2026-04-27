import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import emailjs from '@emailjs/browser';

interface Profile {
  id: string;
  email: string;
  full_name: string;
  company_name: string;
  phone: string;
  organization: string | null;
  position: string | null;
  interest_area: string | null;
  login_count: number | null;
  last_login_at: string | null;
  portal_visit_count: number | null;
  last_portal_visited_at: string | null;
  role: 'admin' | 'partner';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  approved_at: string | null;
}

interface SignupRequest {
  id: string;
  auth_user_id: string | null;
  email: string;
  full_name: string;
  company_name: string;
  phone: string;
  organization: string | null;
  position: string | null;
  interest_area: string | null;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

type MemberRow =
  | { kind: 'profile'; item: Profile }
  | { kind: 'request'; item: SignupRequest };

const STATUS_LABEL: Record<string, { label: string; color: string; bg: string }> = {
  pending:  { label: '대기',   color: '#92400E', bg: '#FEF3C7' },
  approved: { label: '승인',   color: '#065F46', bg: '#D1FAE5' },
  rejected: { label: '거절',   color: '#991B1B', bg: '#FEE2E2' },
};

export default function MemberManager() {
  const [members, setMembers] = useState<Profile[]>([]);
  const [requests, setRequests] = useState<SignupRequest[]>([]);
  const [selectedRow, setSelectedRow] = useState<MemberRow | null>(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [saving, setSaving] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [requestLedgerReady, setRequestLedgerReady] = useState(true);

  async function load() {
    if (!supabase) {
      setLoading(false);
      return;
    }
    const [{ data: profileData, error: profileError }, { data: requestData, error: requestError }] = await Promise.all([
      supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false }),
      supabase
        .from('partner_signup_requests')
        .select('*')
        .order('created_at', { ascending: false }),
    ]);

    if (profileError) setNotice(`회원 목록을 불러오지 못했습니다: ${profileError.message}`);
    if (requestError) {
      setRequestLedgerReady(false);
      const isMissingTable = requestError.message.includes('partner_signup_requests') || requestError.code === 'PGRST205';
      setNotice(
        isMissingTable
          ? '가입 신청 접수 대장 테이블이 아직 API에 반영되지 않았습니다. supabase_create_signup_requests_table.sql 전체 실행 후 1분 뒤 새로고침해 주세요.'
          : `가입 신청 목록을 불러오지 못했습니다: ${requestError.message}`,
      );
    } else {
      setRequestLedgerReady(true);
    }
    if (profileData) setMembers(profileData as Profile[]);
    if (requestData) setRequests(requestData as SignupRequest[]);
    setSelectedRow((current) => {
      if (!current) return null;
      if (current.kind === 'profile') {
        const next = (profileData as Profile[] | null)?.find((item) => item.id === current.item.id);
        return next ? { kind: 'profile', item: next } : null;
      }
      const next = (requestData as SignupRequest[] | null)?.find((item) => item.id === current.item.id);
      return next ? { kind: 'request', item: next } : null;
    });
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

  async function deleteProfile(member: Profile) {
    if (!supabase) return;
    if (member.role === 'admin') {
      setNotice('관리자 계정은 이 화면에서 삭제할 수 없습니다.');
      return;
    }
    if (!window.confirm(`${member.email} 회원을 탈퇴(삭제) 처리할까요? Auth 계정과 프로필이 함께 삭제됩니다.`)) return;

    setSaving(member.id);
    setNotice('');
    const { error } = await supabase.rpc('admin_delete_auth_user', { target_user_id: member.id });

    if (error) {
      setNotice(`회원 삭제 실패: ${error.message}`);
      setSaving(null);
      return;
    }

    setNotice('회원 계정이 삭제됐습니다.');
    setSaving(null);
    load();
  }

  async function deleteSignupRequest(request: SignupRequest) {
    if (!supabase) return;
    if (!window.confirm(`${request.email} 가입 신청 접수를 삭제할까요?`)) return;

    setSaving(request.id);
    setNotice('');
    const { error } = await supabase
      .from('partner_signup_requests')
      .delete()
      .eq('id', request.id);

    if (error) {
      setNotice(`가입 신청 삭제 실패: ${error.message}`);
      setSaving(null);
      return;
    }

    setNotice('가입 신청 접수가 삭제됐습니다.');
    setSaving(null);
    load();
  }

  const memberEmails = new Set(members.map((m) => m.email.toLowerCase()));
  const requestOnlyRows: MemberRow[] = requests
    .filter((request) => !memberEmails.has(request.email.toLowerCase()))
    .map((request) => ({ kind: 'request', item: request }));
  const rows: MemberRow[] = [
    ...members.map((member) => ({ kind: 'profile' as const, item: member })),
    ...requestOnlyRows,
  ].sort((a, b) => {
    const aDate = new Date(a.item.created_at).getTime();
    const bDate = new Date(b.item.created_at).getTime();
    return bDate - aDate;
  });
  const filtered = filter === 'all' ? rows : rows.filter((row) => row.item.status === filter);
  const pendingCount = rows.filter((row) => row.item.status === 'pending').length;
  const formatDateTime = (value?: string | null) => value ? new Date(value).toLocaleString('ko-KR') : '-';
  const selected = selectedRow?.item ?? null;
  const selectedProfile = selectedRow?.kind === 'profile' ? selectedRow.item : null;

  return (
    <div>
      {notice && (
        <div style={{ marginBottom: '14px', padding: '10px 14px', borderRadius: '8px', background: notice.includes('실패') || notice.includes('못했습니다') ? '#FEF2F2' : '#EFF6FF', color: notice.includes('실패') || notice.includes('못했습니다') ? '#B91C1C' : '#1E40AF', fontSize: '0.84rem', fontWeight: 700 }}>
          {notice}
        </div>
      )}

      {!requestLedgerReady && (
        <div style={{ marginBottom: '14px', padding: '10px 14px', borderRadius: '8px', background: '#FFFBEB', color: '#92400E', border: '1px solid #FDE68A', fontSize: '0.84rem', fontWeight: 700 }}>
          Supabase SQL Editor에서 <code>supabase_create_signup_requests_table.sql</code> 전체 실행 후, SQL 맨 아래의 schema reload까지 적용되어야 가입 신청 접수 대장이 표시됩니다.
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
        <div style={{ display: 'grid', gridTemplateColumns: selectedRow ? 'minmax(0, 1fr) 360px' : '1fr', gap: '16px', alignItems: 'start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map((row) => {
              const member = row.item;
              const st = STATUS_LABEL[member.status];
              const profile = row.kind === 'profile' ? row.item : null;
              const isSelected = selectedRow?.kind === row.kind && selectedRow.item.id === member.id;
              return (
                <div
                  key={`${row.kind}-${member.id}`}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedRow(row)}
                  onKeyDown={(e) => { if (e.key === 'Enter') setSelectedRow(row); }}
                  style={{ background: '#fff', border: isSelected ? '2px solid var(--navy)' : '1px solid #E5E7EB', borderRadius: '10px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer' }}
                >
                  <span style={{ flexShrink: 0, fontSize: '11px', fontWeight: 700, color: st.color, background: st.bg, padding: '3px 10px', borderRadius: '999px' }}>
                    {st.label}
                  </span>

                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1F2937', marginBottom: '2px' }}>
                      {member.company_name} · {member.full_name}
                      {row.kind === 'request' && (
                        <span style={{ marginLeft: '8px', fontSize: '11px', color: '#92400E', background: '#FEF3C7', padding: '2px 7px', borderRadius: '999px' }}>
                          접수 대장
                        </span>
                      )}
                    </p>
                    <p style={{ fontSize: '0.78rem', color: '#6B7280' }}>
                      {member.email} · {member.phone}
                    </p>
                    <p style={{ fontSize: '0.72rem', color: '#9CA3AF', marginTop: '2px' }}>
                      신청: {new Date(member.created_at).toLocaleDateString('ko-KR')}
                      {member.interest_area && ` · 관심: ${member.interest_area}`}
                      {profile?.approved_at && ` · 승인: ${new Date(profile.approved_at).toLocaleDateString('ko-KR')}`}
                      {profile && ` · 로그인 ${profile.login_count ?? 0}회 · 자료실 ${profile.portal_visit_count ?? 0}회`}
                      {row.kind === 'request' && ' · Auth/profile 생성 확인 필요'}
                    </p>
                  </div>

                  {profile && profile.status === 'pending' && (
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                      <button onClick={() => updateStatus(profile, 'approved')} disabled={saving === profile.id} style={{ padding: '7px 16px', background: '#059669', color: '#fff', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                        ✓ 승인
                      </button>
                      <button onClick={() => updateStatus(profile, 'rejected')} disabled={saving === profile.id} style={{ padding: '7px 16px', background: '#EF4444', color: '#fff', border: 'none', borderRadius: '7px', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer' }}>
                        ✕ 거절
                      </button>
                    </div>
                  )}
                  {row.kind === 'request' && (
                    <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }} onClick={(e) => e.stopPropagation()}>
                      <span style={{ fontSize: '0.78rem', color: '#92400E', background: '#FFFBEB', border: '1px solid #FDE68A', padding: '6px 10px', borderRadius: '7px' }}>
                        이메일 인증/프로필 대기
                      </span>
                      <button onClick={() => deleteSignupRequest(row.item)} disabled={saving === row.item.id} style={{ padding: '6px 12px', background: 'none', border: '1px solid #FCA5A5', color: '#EF4444', borderRadius: '7px', fontSize: '0.78rem', cursor: 'pointer' }}>
                        접수 삭제
                      </button>
                    </div>
                  )}
                  {profile && profile.status === 'approved' && (
                    <button onClick={(e) => { e.stopPropagation(); updateStatus(profile, 'rejected'); }} style={{ padding: '6px 14px', background: 'none', border: '1px solid #FCA5A5', color: '#EF4444', borderRadius: '7px', fontSize: '0.78rem', cursor: 'pointer' }}>
                      승인 취소
                    </button>
                  )}
                  {profile && profile.status === 'rejected' && (
                    <button onClick={(e) => { e.stopPropagation(); updateStatus(profile, 'approved'); }} style={{ padding: '6px 14px', background: 'none', border: '1px solid #6EE7B7', color: '#059669', borderRadius: '7px', fontSize: '0.78rem', cursor: 'pointer' }}>
                      재승인
                    </button>
                  )}
                  {profile && profile.role !== 'admin' && (
                    <button onClick={(e) => { e.stopPropagation(); deleteProfile(profile); }} disabled={saving === profile.id} style={{ padding: '6px 12px', background: '#FFF1F2', border: '1px solid #FDA4AF', color: '#BE123C', borderRadius: '7px', fontSize: '0.78rem', cursor: 'pointer' }}>
                      탈퇴/삭제
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          {selected && (
            <aside style={{ position: 'sticky', top: '92px', background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '18px', boxShadow: '0 8px 24px rgba(15,34,65,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'start', marginBottom: '14px' }}>
                <div>
                  <p style={{ fontSize: '0.76rem', color: '#6B7280', marginBottom: '4px' }}>{selectedRow?.kind === 'profile' ? '회원 상세' : '가입 신청 상세'}</p>
                  <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0F2241', margin: 0 }}>{selected.company_name}</h3>
                </div>
                <button onClick={() => setSelectedRow(null)} style={{ border: 'none', background: '#F3F4F6', borderRadius: '7px', padding: '5px 8px', cursor: 'pointer', color: '#4B5563' }}>닫기</button>
              </div>

              <div style={{ display: 'grid', gap: '9px', fontSize: '0.82rem' }}>
                <Detail label="상태" value={STATUS_LABEL[selected.status].label} />
                <Detail label="담당자" value={selected.full_name} />
                <Detail label="이메일" value={selected.email} />
                <Detail label="연락처" value={selected.phone} />
                <Detail label="조직(부서)" value={selected.organization} />
                <Detail label="직책(직위)" value={selected.position} />
                <Detail label="관심 사항" value={selected.interest_area} />
                <Detail label="신청일" value={formatDateTime(selected.created_at)} />
                {selectedProfile && (
                  <>
                    <Detail label="승인일" value={formatDateTime(selectedProfile.approved_at)} />
                    <Detail label="로그인 횟수" value={`${selectedProfile.login_count ?? 0}회`} />
                    <Detail label="마지막 로그인" value={formatDateTime(selectedProfile.last_login_at)} />
                    <Detail label="자료실 방문" value={`${selectedProfile.portal_visit_count ?? 0}회`} />
                    <Detail label="마지막 자료실 방문" value={formatDateTime(selectedProfile.last_portal_visited_at)} />
                  </>
                )}
              </div>
            </aside>
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '104px minmax(0, 1fr)', gap: '8px', borderBottom: '1px solid #F3F4F6', paddingBottom: '8px' }}>
      <span style={{ color: '#6B7280', fontWeight: 700 }}>{label}</span>
      <span style={{ color: '#111827', wordBreak: 'break-word' }}>{value || '-'}</span>
    </div>
  );
}
