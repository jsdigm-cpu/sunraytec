import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import type { Faq, FaqCategory } from '../../types/faq';
import { FAQ_CATEGORIES, FAQ_CAT_COLOR, FAQ_CAT_ICON } from '../../types/faq';

const EMPTY: Omit<Faq, 'id' | 'created_at' | 'updated_at'> = {
  category: '제품·기술', question: '', answer: '', sort_order: 0, published: true,
};

export default function FaqEditor() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Faq> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Faq | null>(null);
  const [filterCat, setFilterCat] = useState<FaqCategory | '전체'>('전체');

  const load = () => {
    if (!supabase) { setLoading(false); return; }
    supabase
      .from('faqs')
      .select('*')
      .order('sort_order', { ascending: true })
      .then(({ data }) => { setFaqs((data as Faq[]) ?? []); setLoading(false); });
  };
  useEffect(load, []);

  const startNew = () => {
    const maxOrder = faqs.reduce((m, f) => Math.max(m, f.sort_order), 0);
    setEditing({ ...EMPTY, sort_order: maxOrder + 1 });
    setIsNew(true); setMsg('');
  };
  const startEdit = (f: Faq) => { setEditing({ ...f }); setIsNew(false); setMsg(''); };
  const cancelEdit = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!editing?.question?.trim() || !editing?.answer?.trim()) {
      setMsg('질문과 답변을 입력해주세요.'); return;
    }
    setSaving(true); setMsg('');
    if (!supabase) { setMsg('Supabase 미연결'); setSaving(false); return; }

    if (isNew) {
      const { error } = await supabase.from('faqs').insert({
        category: editing.category, question: editing.question,
        answer: editing.answer, sort_order: editing.sort_order ?? 0, published: editing.published ?? true,
      });
      if (error) { setMsg(`저장 실패: ${error.message}`); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('faqs').update({
        category: editing.category, question: editing.question,
        answer: editing.answer, sort_order: editing.sort_order,
        published: editing.published, updated_at: new Date().toISOString(),
      }).eq('id', editing.id!);
      if (error) { setMsg(`수정 실패: ${error.message}`); setSaving(false); return; }
    }

    setSaving(false); setEditing(null); setIsNew(false);
    load(); setMsg(isNew ? 'FAQ가 등록되었습니다.' : 'FAQ가 수정되었습니다.');
  };

  const confirmDelete = async () => {
    if (!deleteTarget || !supabase) return;
    const { error } = await supabase.from('faqs').delete().eq('id', deleteTarget.id);
    setMsg(error ? `삭제 실패: ${error.message}` : 'FAQ가 삭제되었습니다.');
    setDeleteTarget(null); load();
  };

  const togglePublish = async (f: Faq) => {
    if (!supabase) return;
    await supabase.from('faqs').update({ published: !f.published }).eq('id', f.id);
    load();
  };

  const displayed = filterCat === '전체' ? faqs : faqs.filter(f => f.category === filterCat);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>FAQ 관리</h2>
        <button onClick={startNew}
          style={{ padding: '8px 18px', background: '#0F2241', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
          + 새 FAQ 추가
        </button>
      </div>

      {msg && (
        <div style={{ marginBottom: '1rem', padding: '10px 14px', borderRadius: 8, background: msg.includes('실패') ? '#FEF2F2' : '#ECFDF5', color: msg.includes('실패') ? '#B91C1C' : '#047857', border: `1px solid ${msg.includes('실패') ? '#FCA5A5' : '#A7F3D0'}`, fontWeight: 700, fontSize: '0.875rem' }}>
          {msg}
        </div>
      )}

      {/* 편집 폼 */}
      {editing && (
        <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '1rem', color: '#111827' }}>
            {isNew ? '새 FAQ 작성' : 'FAQ 수정'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'end' }}>
            <label style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>카테고리</span>
              <select value={editing.category ?? '제품·기술'}
                onChange={e => setEditing(p => ({ ...p, category: e.target.value as FaqCategory }))}
                style={{ padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem' }}>
                {FAQ_CATEGORIES.map(c => <option key={c} value={c}>{FAQ_CAT_ICON[c]} {c}</option>)}
              </select>
            </label>
            <label style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>순서 번호</span>
              <input type="number" min={1} value={editing.sort_order ?? 0}
                onChange={e => setEditing(p => ({ ...p, sort_order: Number(e.target.value) }))}
                style={{ padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem' }} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', cursor: 'pointer', paddingBottom: 2 }}>
              <input type="checkbox" checked={editing.published ?? true}
                onChange={e => setEditing(p => ({ ...p, published: e.target.checked }))} />
              공개
            </label>
          </div>

          <label style={{ display: 'grid', gap: 4, marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>질문 (Q)</span>
            <input type="text" value={editing.question ?? ''}
              onChange={e => setEditing(p => ({ ...p, question: e.target.value }))}
              placeholder="자주 묻는 질문을 입력하세요"
              style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.9rem', width: '100%' }} />
          </label>

          <label style={{ display: 'grid', gap: 4, marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>답변 (A)</span>
            <textarea value={editing.answer ?? ''}
              onChange={e => setEditing(p => ({ ...p, answer: e.target.value }))}
              placeholder="답변을 입력하세요"
              rows={5}
              style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem', resize: 'vertical', width: '100%', lineHeight: 1.7 }} />
          </label>

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

      {/* 카테고리 필터 */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1rem' }}>
        {(['전체', ...FAQ_CATEGORIES] as const).map(c => {
          const isActive = filterCat === c;
          const color = c === '전체' ? '#374151' : FAQ_CAT_COLOR[c];
          return (
            <button key={c} onClick={() => setFilterCat(c)}
              style={{ padding: '5px 12px', borderRadius: 999, border: `1.5px solid ${isActive ? color : '#E5E7EB'}`, background: isActive ? color : '#fff', color: isActive ? '#fff' : '#6B7280', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
              {c !== '전체' && FAQ_CAT_ICON[c]} {c}
              <span style={{ marginLeft: 4, opacity: 0.75 }}>
                {c === '전체' ? faqs.length : faqs.filter(f => f.category === c).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* FAQ 목록 */}
      {loading ? (
        <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>불러오는 중…</p>
      ) : displayed.length === 0 ? (
        <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>등록된 FAQ가 없습니다.</p>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {displayed.map(f => {
            const color = FAQ_CAT_COLOR[f.category];
            return (
              <div key={f.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderLeft: `4px solid ${color}`, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: '#9CA3AF', minWidth: 24, paddingTop: 2 }}>
                  #{f.sort_order}
                </span>
                <span style={{ display: 'inline-block', padding: '2px 8px', background: color + '18', color, borderRadius: 999, fontSize: 10, fontWeight: 900, flexShrink: 0, marginTop: 2 }}>
                  {FAQ_CAT_ICON[f.category]} {f.category}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: f.published ? '#1F2937' : '#9CA3AF', fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    Q. {f.question}
                  </p>
                  <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    A. {f.answer}
                  </p>
                </div>
                {!f.published && (
                  <span style={{ padding: '2px 8px', background: '#F3F4F6', color: '#6B7280', borderRadius: 4, fontSize: 11, fontWeight: 700, flexShrink: 0, alignSelf: 'center' }}>
                    비공개
                  </span>
                )}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignSelf: 'center' }}>
                  <button onClick={() => togglePublish(f)}
                    style={{ padding: '4px 10px', border: '1px solid #E5E7EB', borderRadius: 6, background: '#fff', fontSize: 11, fontWeight: 700, color: f.published ? '#047857' : '#9CA3AF', cursor: 'pointer' }}>
                    {f.published ? '공개' : '비공개'}
                  </button>
                  <button onClick={() => startEdit(f)}
                    style={{ padding: '4px 12px', border: '1px solid #D1D5DB', borderRadius: 6, background: '#fff', fontSize: 12, fontWeight: 700, color: '#374151', cursor: 'pointer' }}>
                    수정
                  </button>
                  <button onClick={() => setDeleteTarget(f)}
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
            <h3 style={{ fontWeight: 900, color: '#111827', marginBottom: 10 }}>FAQ 삭제</h3>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>
              <strong>"{deleteTarget.question}"</strong>을 삭제할까요?<br />삭제 후 복구가 불가능합니다.
            </p>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <button onClick={() => setDeleteTarget(null)}
                style={{ padding: '9px 18px', border: '1px solid #D1D5DB', borderRadius: 8, background: '#fff', color: '#374151', fontWeight: 700, cursor: 'pointer' }}>취소</button>
              <button onClick={confirmDelete}
                style={{ padding: '9px 18px', border: 'none', borderRadius: 8, background: '#DC2626', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>삭제</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
