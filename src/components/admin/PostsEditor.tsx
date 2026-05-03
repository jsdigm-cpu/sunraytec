import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

const CATEGORIES = ['보도자료', '기술 정보', '시공기', '제품 소식'] as const;
type PostCategory = typeof CATEGORIES[number];

const CAT_COLOR: Record<PostCategory, string> = {
  '보도자료':  '#3B82F6',
  '기술 정보': '#10B981',
  '시공기':    '#F59E0B',
  '제품 소식': '#EF4444',
};

interface Post {
  id: string;
  title: string;
  category: PostCategory;
  summary: string;
  content: string | null;
  thumbnail_url: string | null;
  published_at: string;
  is_published: boolean;
  author: string | null;
  tags: string[];
}

type PostDraft = Omit<Post, 'id'> & { id?: string };

const EMPTY: PostDraft = {
  title: '', category: '보도자료', summary: '', content: '',
  thumbnail_url: '', published_at: new Date().toISOString().slice(0, 10),
  is_published: true, author: '', tags: [],
};

export default function PostsEditor() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<PostDraft | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Post | null>(null);
  const [filterCat, setFilterCat] = useState<PostCategory | '전체'>('전체');

  const load = () => {
    if (!supabase) { setLoading(false); return; }
    supabase.from('posts').select('*').order('published_at', { ascending: false })
      .then(({ data }) => { setPosts((data as Post[]) ?? []); setLoading(false); });
  };
  useEffect(load, []);

  const startNew = () => { setEditing({ ...EMPTY }); setIsNew(true); setMsg(''); };
  const startEdit = (p: Post) => { setEditing({ ...p, content: p.content ?? '', thumbnail_url: p.thumbnail_url ?? '', author: p.author ?? '', tags: p.tags ?? [] }); setIsNew(false); setMsg(''); };
  const cancelEdit = () => { setEditing(null); setIsNew(false); };

  const save = async () => {
    if (!editing?.title?.trim() || !editing?.summary?.trim()) {
      setMsg('제목과 요약을 입력해주세요.'); return;
    }
    setSaving(true); setMsg('');
    if (!supabase) { setMsg('Supabase 미연결'); setSaving(false); return; }

    const payload = {
      title: editing.title.trim(),
      category: editing.category,
      summary: editing.summary.trim(),
      content: editing.content?.trim() || null,
      thumbnail_url: editing.thumbnail_url?.trim() || null,
      published_at: editing.published_at,
      is_published: editing.is_published,
      author: editing.author?.trim() || null,
      tags: editing.tags,
    };

    if (isNew) {
      const { error } = await supabase.from('posts').insert(payload);
      if (error) { setMsg(`저장 실패: ${error.message}`); setSaving(false); return; }
    } else {
      const { error } = await supabase.from('posts').update(payload).eq('id', editing.id!);
      if (error) { setMsg(`수정 실패: ${error.message}`); setSaving(false); return; }
    }

    setSaving(false); setEditing(null); setIsNew(false);
    load(); setMsg(isNew ? '게시물이 등록되었습니다.' : '게시물이 수정되었습니다.');
  };

  const confirmDelete = async () => {
    if (!deleteTarget || !supabase) return;
    const { error } = await supabase.from('posts').delete().eq('id', deleteTarget.id);
    setMsg(error ? `삭제 실패: ${error.message}` : '게시물이 삭제되었습니다.');
    setDeleteTarget(null); load();
  };

  const togglePublish = async (p: Post) => {
    if (!supabase) return;
    await supabase.from('posts').update({ is_published: !p.is_published }).eq('id', p.id);
    load();
  };

  const displayed = filterCat === '전체' ? posts : posts.filter(p => p.category === filterCat);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>뉴스·블로그 관리</h2>
        <button onClick={startNew}
          style={{ padding: '8px 18px', background: '#0F2241', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 700, fontSize: '0.875rem', cursor: 'pointer' }}>
          + 새 게시물 작성
        </button>
      </div>

      {msg && (
        <div style={{ marginBottom: '1rem', padding: '10px 14px', borderRadius: 8, background: msg.includes('실패') ? '#FEF2F2' : '#ECFDF5', color: msg.includes('실패') ? '#B91C1C' : '#047857', border: `1px solid ${msg.includes('실패') ? '#FCA5A5' : '#A7F3D0'}`, fontWeight: 700, fontSize: '0.875rem' }}>
          {msg}
        </div>
      )}

      {editing && (
        <div style={{ background: '#F8FAFC', border: '1px solid #E5E7EB', borderRadius: 12, padding: '1.5rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '1rem', color: '#111827' }}>
            {isNew ? '새 게시물 작성' : '게시물 수정'}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'end' }}>
            <label style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>카테고리</span>
              <select value={editing.category}
                onChange={e => setEditing(p => ({ ...p!, category: e.target.value as PostCategory }))}
                style={{ padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem' }}>
                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>발행일</span>
              <input type="date" value={editing.published_at}
                onChange={e => setEditing(p => ({ ...p!, published_at: e.target.value }))}
                style={{ padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem' }} />
            </label>
            <label style={{ display: 'grid', gap: 4 }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>작성자</span>
              <input type="text" value={editing.author ?? ''}
                onChange={e => setEditing(p => ({ ...p!, author: e.target.value }))}
                placeholder="예: 홍보팀"
                style={{ padding: '8px 10px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem' }} />
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.875rem', cursor: 'pointer', paddingBottom: 4 }}>
              <input type="checkbox" checked={editing.is_published}
                onChange={e => setEditing(p => ({ ...p!, is_published: e.target.checked }))} />
              공개
            </label>
          </div>

          <label style={{ display: 'grid', gap: 4, marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>제목 *</span>
            <input type="text" value={editing.title}
              onChange={e => setEditing(p => ({ ...p!, title: e.target.value }))}
              placeholder="게시물 제목을 입력하세요"
              style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.9rem', width: '100%' }} />
          </label>

          <label style={{ display: 'grid', gap: 4, marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>요약 * (목록에 표시)</span>
            <textarea value={editing.summary}
              onChange={e => setEditing(p => ({ ...p!, summary: e.target.value }))}
              placeholder="1~3문장으로 요약하세요"
              rows={3}
              style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem', resize: 'vertical', width: '100%', lineHeight: 1.7 }} />
          </label>

          <label style={{ display: 'grid', gap: 4, marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>본문 (마크다운 간이 지원: **굵게**, 표 | col |)</span>
            <textarea value={editing.content ?? ''}
              onChange={e => setEditing(p => ({ ...p!, content: e.target.value }))}
              placeholder="본문을 입력하세요. 빈 줄로 단락을 구분합니다."
              rows={12}
              style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem', resize: 'vertical', width: '100%', lineHeight: 1.7, fontFamily: 'monospace' }} />
          </label>

          <label style={{ display: 'grid', gap: 4, marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>대표 이미지 URL (선택)</span>
            <input type="text" value={editing.thumbnail_url ?? ''}
              onChange={e => setEditing(p => ({ ...p!, thumbnail_url: e.target.value }))}
              placeholder="https://..."
              style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem', width: '100%' }} />
          </label>

          <label style={{ display: 'grid', gap: 4, marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>태그 (쉼표로 구분)</span>
            <input type="text" value={editing.tags.join(', ')}
              onChange={e => setEditing(p => ({ ...p!, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))}
              placeholder="복사난방, 에너지절감, ..."
              style={{ padding: '10px 12px', border: '1px solid #D1D5DB', borderRadius: 6, fontSize: '0.875rem', width: '100%' }} />
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
        {(['전체', ...CATEGORIES] as const).map(c => {
          const isActive = filterCat === c;
          const color = c === '전체' ? '#374151' : CAT_COLOR[c];
          return (
            <button key={c} onClick={() => setFilterCat(c as PostCategory | '전체')}
              style={{ padding: '5px 12px', borderRadius: 999, border: `1.5px solid ${isActive ? color : '#E5E7EB'}`, background: isActive ? color : '#fff', color: isActive ? '#fff' : '#6B7280', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>
              {c}
              <span style={{ marginLeft: 4, opacity: 0.75 }}>
                {c === '전체' ? posts.length : posts.filter(p => p.category === c).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* 목록 */}
      {loading ? (
        <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>불러오는 중…</p>
      ) : displayed.length === 0 ? (
        <p style={{ color: '#94A3B8', fontSize: '0.875rem' }}>등록된 게시물이 없습니다.</p>
      ) : (
        <div style={{ display: 'grid', gap: 8 }}>
          {displayed.map(post => {
            const color = CAT_COLOR[post.category];
            return (
              <div key={post.id} style={{ background: '#fff', border: '1px solid #E5E7EB', borderLeft: `4px solid ${color}`, borderRadius: 10, padding: '12px 16px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                <span style={{ display: 'inline-block', padding: '2px 8px', background: color + '18', color, borderRadius: 999, fontSize: 10, fontWeight: 900, flexShrink: 0, marginTop: 2 }}>
                  {post.category}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontWeight: 700, color: post.is_published ? '#1F2937' : '#9CA3AF', fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.title}
                  </p>
                  <p style={{ color: '#6B7280', fontSize: '0.8rem', marginTop: 3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {post.published_at} · {post.author ?? '작성자 미지정'}
                  </p>
                </div>
                {!post.is_published && (
                  <span style={{ padding: '2px 8px', background: '#F3F4F6', color: '#6B7280', borderRadius: 4, fontSize: 11, fontWeight: 700, flexShrink: 0, alignSelf: 'center' }}>
                    비공개
                  </span>
                )}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0, alignSelf: 'center' }}>
                  <button onClick={() => togglePublish(post)}
                    style={{ padding: '4px 10px', border: '1px solid #E5E7EB', borderRadius: 6, background: '#fff', fontSize: 11, fontWeight: 700, color: post.is_published ? '#047857' : '#9CA3AF', cursor: 'pointer' }}>
                    {post.is_published ? '공개' : '비공개'}
                  </button>
                  <button onClick={() => startEdit(post)}
                    style={{ padding: '4px 12px', border: '1px solid #D1D5DB', borderRadius: 6, background: '#fff', fontSize: 12, fontWeight: 700, color: '#374151', cursor: 'pointer' }}>
                    수정
                  </button>
                  <button onClick={() => setDeleteTarget(post)}
                    style={{ padding: '4px 10px', border: '1px solid #FCA5A5', borderRadius: 6, background: '#FEF2F2', fontSize: 12, fontWeight: 700, color: '#DC2626', cursor: 'pointer' }}>
                    삭제
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {deleteTarget && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: '2rem', maxWidth: 420, width: '90%', boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }}>
            <h3 style={{ fontWeight: 900, color: '#111827', marginBottom: 10 }}>게시물 삭제</h3>
            <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: 20 }}>
              <strong>"{deleteTarget.title}"</strong>을 삭제할까요?<br />삭제 후 복구가 불가능합니다.
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
