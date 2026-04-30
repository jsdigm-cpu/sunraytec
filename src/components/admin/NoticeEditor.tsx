import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Notice, NoticeTone, NoticeCategory } from '../../types/notice';
import { NOTICE_TONE_STYLE, NOTICE_CATEGORIES, NOTICE_TONES } from '../../types/notice';

const TONE_LABEL: Record<NoticeTone, string> = {
  red: '빨강', amber: '노랑', navy: '파랑', green: '초록', gray: '회색',
};

const EMPTY: Omit<Notice, 'id' | 'created_at' | 'updated_at'> = {
  category: '공지', tone: 'gray', title: '', body: '', pinned: false, published: true,
};

export default function NoticeEditor() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Notice> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNoticeMsg] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Notice | null>(null);

  const load = () => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('notices')
      .select('*')
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setNotices((data as Notice[]) ?? []);
        setLoading(false);
      });
  };

  useEffect(load, []);

  const startNew = () => { setEditing({ ...EMPTY }); setIsNew(true); setNoticeMsg(''); };
  const startEdit = (n: Notice) => { setEditing({ ...n }); setIsNew(false); setNoticeMsg(''); };
  const cancelEdit = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!editing?.title?.trim() || !editing?.body?.trim()) {
      setNoticeMsg('제목과 내용을 입력해주세요.'); return;
    }
    setSaving(true);
    setNoticeMsg('');
    if (!supabase) { setNoticeMsg('Supabase 미연결'); setSaving(false); return; }

    if (isNew) {
      const { error } = await supabase.from('notices').insert({
        category: editing.category ?? '공지',
        tone: editing.tone ?? 'gray',
        title: editing.title,
        body: editing.body,
        pinned: editing.pinned ?? false,
        published: editing.published ?? true,
      });
      if (error) { setNoticeMsg(`저장 실패: ${error.message}`); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('notices').update({
        category: editing.category,
        tone: editing.tone,
        title: editing.title,
        body: editing.body,
        pinned: editing.pinned,
        published: editing.published,
        updated_at: new Date().toISOString(),
      }).eq('id', editing.id!);
      if (error) { setNoticeMsg(`수정 실패: ${error.message}`); setSaving(false); return; }
    }

    setSaving(false);
    setEditing(null);
    setIsNew(false);
    load();
    setNoticeMsg(isNew ? '공지가 등록되었습니다.' : '공지가 수정되었습니다.');
  };

  const confirmDelete = async () => {
    if (!deleteTarget || !supabase) return;
    const { error } = await supabase.from('notices').delete().eq('id', deleteTarget.id);
    if (error) { setNoticeMsg(`삭제 실패: ${error.message}`); }
    else { setNoticeMsg('공지가 삭제되었습니다.'); load(); }
    setDeleteTarget(null);
  };

  const togglePin = async (n: Notice) => {
    if (!supabase) return;
    await supabase.from('notices').update({ pinned: !n.pinned }).eq('id', n.id);
    load();
  };

  const togglePublish = async (n: Notice) => {
    if (!supabase) return;
    await supabase.from('notices').update({ published: !n.published }).eq('id', n.id);
    load();
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>공지사항 관리</h2>
        <button
          onClick={startNew}
          style={{ padding: '8px 18px', background: '#0F2241', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}
        >
          + 새 공지 작성
        </button>
      </div>

      {notice && (
        <div style={{ marginBottom: '1rem', padding: '10px 14px', borderRadius: 8, background: notice.includes('실패') ? '#FEF2F2' : '#ECFDF5', color: notice.includes('실패') ? '#B91C1C' : '#047857', border: `1px solid ${notice.includes('실패') ? '#FCA5A5' : '#A7F3D0'}`, fontWeight: 700, fontSize: '0.875rem' }}>
          {notice}
        </div>
      )}

      {/* 편집 폼 */}
      {editing && (
        <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '1rem', color: '#111827' }}>
            {isNew ? '새 공지 작성' : '공지 수정'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
            {/* 카테고리 */}
            <label style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>카테고리</span>
              <select
                value={editing.category ?? '공지'}
                onChange={e => setEditing(p => ({ ...p, category: e.target.value as NoticeCategory }))}
                style={{ padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem' }}
              >
                {NOTICE_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>

            {/* 색상 톤 */}
            <label style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>배지 색상</span>
              <select
                value={editing.tone ?? 'gray'}
                onChange={e => setEditing(p => ({ ...p, tone: e.target.value as NoticeTone }))}
                style={{ padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem' }}
              >
                {NOTICE_TONES.map(t => <option key={t} value={t}>{TONE_LABEL[t]}</option>)}
              </select>
            </label>

            {/* 옵션 */}
            <div style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>옵션</span>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center', paddingTop: 6 }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={editing.pinned ?? false} onChange={e => setEditing(p => ({ ...p, pinned: e.target.checked }))} />
                  고정
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: '0.85rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={editing.published ?? true} onChange={e => setEditing(p => ({ ...p, published: e.target.checked }))} />
                  공개
                </label>
              </div>
            </div>
          </div>

          {/* 제목 */}
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>제목</span>
              <input
                type="text"
                value={editing.title ?? ''}
                onChange={e => setEditing(p => ({ ...p, title: e.target.value }))}
                placeholder="공지 제목을 입력하세요"
                style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.9rem', width: '100%' }}
              />
            </label>
          </div>

          {/* 본문 */}
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>내용</span>
              <textarea
                value={editing.body ?? ''}
                onChange={e => setEditing(p => ({ ...p, body: e.target.value }))}
                placeholder="공지 내용을 입력하세요"
                rows={6}
                style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem', resize: 'vertical', width: '100%', lineHeight: 1.7 }}
              />
            </label>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={save} disabled={saving}
              style={{ padding: '9px 20px', background: saving ? '#9CA3AF' : '#0F2241', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.875rem', cursor: saving ? 'not-allowed' : 'pointer' }}>
              {saving ? '저장 중…' : '저장'}
            </button>
            <button onClick={cancelEdit}
              style={{ padding: '9px 16px', background: 'transparent', color: '#6B7280', border: '1px solid #D1D5DB', borderRadius: 8, fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
              취소
            </button>
          </div>
        </div>
      )}

      {/* 공지 목록 */}
      {loading ? (
        <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>불러오는 중…</p>
      ) : notices.length === 0 ? (
        <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>등록된 공지가 없습니다.</p>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {notices.map(n => {
            const tone = NOTICE_TONE_STYLE[n.tone];
            return (
              <div key={n.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
                {/* 배지 */}
                <span style={{ padding: '3px 9px', background: tone.bg, color: tone.color, borderRadius: 999, fontSize: 11, fontWeight: 900, flexShrink: 0 }}>
                  {n.category}
                </span>

                {/* 제목 */}
                <span style={{ flex: 1, fontWeight: 700, color: n.published ? '#1F2937' : '#9CA3AF', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {n.pinned && <span style={{ color: 'var(--red)', marginRight: 6 }}>📌</span>}
                  {n.title}
                </span>

                {/* 날짜 */}
                <span style={{ fontSize: 12, color: '#9CA3AF', flexShrink: 0 }}>
                  {n.created_at.slice(0, 10)}
                </span>

                {/* 비공개 배지 */}
                {!n.published && (
                  <span style={{ padding: '2px 8px', background: '#F3F4F6', color: '#6B7280', borderRadius: 4, fontSize: 11, fontWeight: 700, flexShrink: 0 }}>
                    비공개
                  </span>
                )}

                {/* 액션 버튼 */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  <button onClick={() => togglePin(n)} title={n.pinned ? '고정 해제' : '고정'}
                    style={{ padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: 6, background: n.pinned ? '#FEE2E2' : '#fff', fontSize: 13, cursor: 'pointer' }}>
                    📌
                  </button>
                  <button onClick={() => togglePublish(n)} title={n.published ? '비공개로' : '공개로'}
                    style={{ padding: '4px 8px', border: '1px solid #E5E7EB', borderRadius: 6, background: '#fff', fontSize: 11, fontWeight: 700, color: n.published ? '#047857' : '#9CA3AF', cursor: 'pointer' }}>
                    {n.published ? '공개' : '비공개'}
                  </button>
                  <button onClick={() => startEdit(n)}
                    style={{ padding: '4px 12px', border: '1px solid #D1D5DB', borderRadius: 6, background: '#fff', fontSize: 12, fontWeight: 700, color: '#374151', cursor: 'pointer' }}>
                    수정
                  </button>
                  <button onClick={() => setDeleteTarget(n)}
                    style={{ padding: '4px 10px', border: '1px solid #FCA5A5', borderRadius: 6, background: '#FEF2F2', fontSize: 12, fontWeight: 700, color: '#DC2626', cursor: 'pointer' }}>
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 삭제 확인 모달 */}
      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: '2rem', maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontWeight: 900, color: '#111827', marginBottom: 10 }}>공지 삭제</h3>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>
              <strong>"{deleteTarget.title}"</strong>을 삭제할까요?<br />
              삭제 후 복구가 불가능합니다.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteTarget(null)}
                style={{ padding: '9px 18px', border: '1px solid #D1D5DB', borderRadius: 8, background: '#fff', color: '#374151', fontWeight: 700, cursor: 'pointer' }}>
                취소
              </button>
              <button onClick={confirmDelete}
                style={{ padding: '9px 18px', border: 'none', borderRadius: 8, background: '#DC2626', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>
                삭제
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
