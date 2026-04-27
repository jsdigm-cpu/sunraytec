import { useState, useEffect, useRef } from 'react';
import type React from 'react';
import { supabase } from '../../lib/supabase';
import { isImageFile, uploadPublicFile } from '../../lib/storageUploads';

interface CaseItem {
  id: string;
  title: string;
  category: string;
  location: string;
  image_url: string;
  images: string[];
  summary: string;
  description: string;
  installed_at: string;
  sort_order?: number;
  created_at?: string;
}

const CATEGORIES = [
  '교육 및 공공 복지',
  '국방 및 특수 시설',
  '산업 및 물류 거점',
  '스마트 시티 솔루션',
  '주거 및 라이프 스타일',
  '상업 및 서비스 공간',
];

const inputStyle = {
  width: '100%',
  border: '1px solid #D1D5DB',
  borderRadius: '6px',
  padding: '8px 10px',
  fontSize: '0.875rem',
  color: '#1F2937',
  background: '#fff',
  boxSizing: 'border-box' as const,
};

const labelStyle = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 700,
  color: '#6B7280',
  marginBottom: '4px',
  marginTop: '14px',
};

export default function CaseEditor() {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [selected, setSelected] = useState<CaseItem | null>(null);
  const [form, setForm] = useState<Partial<CaseItem>>({});
  const [activeCategory, setActiveCategory] = useState('전체');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState('');
  const draggedIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('case_studies')
      .select('id,title,category,location,image_url,images,summary,description,installed_at,sort_order,created_at')
      .order('sort_order', { ascending: true })
      .then(({ data }) => { if (data) setCases(data as CaseItem[]); });
  }, []);

  useEffect(() => {
    const moveDrag = (event: PointerEvent) => {
      const sourceId = draggedIdRef.current;
      if (!sourceId) return;
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-admin-order-id]');
      const targetId = target?.getAttribute('data-admin-order-id');
      if (!targetId || targetId === sourceId) return;
      setCases((prev) => reorderById(prev, sourceId, targetId));
    };
    const stopDrag = () => {
      draggedIdRef.current = null;
      setDraggedId(null);
    };
    window.addEventListener('pointermove', moveDrag);
    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);
    return () => {
      window.removeEventListener('pointermove', moveDrag);
      window.removeEventListener('pointerup', stopDrag);
      window.removeEventListener('pointercancel', stopDrag);
    };
  }, []);

  function selectCase(item: CaseItem) {
    setSelected(item);
    setForm({
      title: item.title,
      category: item.category,
      location: item.location,
      summary: item.summary ?? '',
      description: item.description ?? '',
      installed_at: item.installed_at ?? '',
      images: compactCaseImages(item),
    });
    setSavedMsg('');
  }

  async function uploadImages(files: FileList | null) {
    if (!files || files.length === 0 || !selected) return;
    const imageFiles = Array.from(files).filter(isImageFile);
    if (imageFiles.length !== files.length) {
      setSavedMsg('이미지 파일만 업로드할 수 있습니다.');
      return;
    }

    setSaving(true);
    setSavedMsg('이미지를 업로드하는 중입니다...');
    try {
      const urls = await Promise.all(imageFiles.map((file) => uploadPublicFile('case-images', selected.id, file)));
      setForm((f) => ({ ...f, images: [...(f.images ?? []), ...urls] }));
      setSavedMsg('이미지가 업로드됐습니다. 저장 버튼을 눌러 사례에 반영하세요.');
    } catch (error) {
      setSavedMsg('이미지 업로드 실패: ' + (error instanceof Error ? error.message : '알 수 없는 오류'));
    } finally {
      setSaving(false);
    }
  }

  function removeImage(idx: number) {
    setForm((f) => ({ ...f, images: (f.images ?? []).filter((_, i) => i !== idx) }));
  }

  async function save() {
    if (!supabase || !selected) return;
    setSaving(true);
    const payload = {
      title: form.title,
      category: form.category,
      location: form.location,
      summary: form.summary,
      description: form.description,
      installed_at: form.installed_at || null,
      images: form.images ?? [],
      image_url: (form.images ?? [])[0] ?? selected.image_url ?? null,
    };
    const { error } = await supabase.from('case_studies').update(payload).eq('id', selected.id);
    setSaving(false);
    if (error) {
      setSavedMsg('❌ 저장 실패: ' + error.message);
    } else {
      setSavedMsg('✅ 저장됐습니다!');
      setCases((prev) => prev.map((c) => c.id === selected.id ? { ...c, ...payload } as CaseItem : c));
      setSelected((s) => s ? { ...s, ...payload } as CaseItem : s);
      setTimeout(() => setSavedMsg(''), 3000);
    }
  }

  function moveCase(id: string, direction: -1 | 1) {
    setCases((prev) => {
      const visibleItems = activeCategory === '전체' ? prev : prev.filter((item) => item.category === activeCategory);
      const visibleIndex = visibleItems.findIndex((item) => item.id === id);
      const targetVisible = visibleItems[visibleIndex + direction];
      if (!targetVisible) return prev;
      return reorderById(prev, id, targetVisible.id);
    });
  }

  function handlePointerStart(event: React.PointerEvent, id: string) {
    event.preventDefault();
    draggedIdRef.current = id;
    setDraggedId(id);
  }

  async function saveOrder() {
    if (!supabase) return;
    setSaving(true);
    const ordered = cases.map((item, sort_order) => ({ ...item, sort_order }));
    const { error } = await supabase.from('case_studies').upsert(ordered, { onConflict: 'id' });
    setSaving(false);
    if (error) {
      setSavedMsg('순서 저장 실패: ' + error.message);
      return;
    }
    setCases(ordered);
    setSavedMsg('시공사례 노출 순서가 저장됐습니다.');
  }

  const filters = ['전체', ...CATEGORIES];
  const visibleCases = activeCategory === '전체' ? cases : cases.filter((item) => item.category === activeCategory);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', height: '100%' }}>
      {/* 좌측: 편집 폼 */}
      <div style={{ border: '1px solid #E5E7EB', borderRadius: '10px', background: '#fff', overflow: 'hidden' }}>
        {!selected ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#9CA3AF', fontSize: '0.875rem' }}>
            우측 목록에서 사례를 선택하세요
          </div>
        ) : (
          <div style={{ overflowY: 'auto', maxHeight: '75vh' }}>
            <div style={{ padding: '14px 20px', borderBottom: '1px solid #E5E7EB', fontWeight: 700, fontSize: '0.9rem', color: '#374151', background: '#F9FAFB' }}>
              ✏️ {selected.title} 편집
            </div>
            <div style={{ padding: '16px 20px' }}>

              <label style={labelStyle}>제목</label>
              <input style={inputStyle} value={form.title ?? ''} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} />

              <label style={labelStyle}>카테고리</label>
              <select style={inputStyle} value={form.category ?? ''} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>

              <label style={labelStyle}>위치</label>
              <input style={inputStyle} value={form.location ?? ''} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} />

              <label style={labelStyle}>시공 시기 (YYYY-MM-DD)</label>
              <input style={inputStyle} type="date" value={form.installed_at ?? ''} onChange={(e) => setForm((f) => ({ ...f, installed_at: e.target.value }))} />

              <label style={labelStyle}>한줄 요약 (목록 카드에 표시)</label>
              <input style={inputStyle} value={form.summary ?? ''} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} />

              <label style={labelStyle}>상세 설명 (상세 페이지 본문)</label>
              <textarea
                style={{ ...inputStyle, minHeight: '260px', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7 }}
                value={form.description ?? ''}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="시공 내용, 사용 제품, 설치 환경, 효과 등을 자유롭게 입력하세요."
              />

              {/* 추가 사진 업로드 */}
              <label style={labelStyle}>사례 사진</label>
              <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '8px', padding: '12px', marginBottom: '8px' }}>
                {(form.images ?? []).length === 0 && (
                  <p style={{ fontSize: '0.78rem', color: '#9CA3AF', margin: 0 }}>추가된 사진이 없습니다.</p>
                )}
                {(form.images ?? []).map((url, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <img src={url} alt="" style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #E5E7EB', flexShrink: 0 }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0.3'; }} />
                    <span style={{ flex: 1, fontSize: '0.75rem', color: '#6B7280', wordBreak: 'break-all' }}>{url}</span>
                    <button onClick={() => removeImage(i)} style={{ flexShrink: 0, background: '#FEE2E2', border: 'none', color: '#EF4444', borderRadius: '4px', padding: '3px 8px', cursor: 'pointer', fontSize: '12px' }}>삭제</button>
                  </div>
                ))}
                <input type="file" accept="image/*" multiple onChange={(e) => uploadImages(e.target.files)} style={{ marginTop: '8px' }} />
              </div>

              {/* 저장 버튼 */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #E5E7EB' }}>
                <button
                  onClick={save}
                  disabled={saving}
                  style={{ background: saving ? '#9CA3AF' : 'var(--red)', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 28px', fontWeight: 700, fontSize: '0.9rem', cursor: saving ? 'not-allowed' : 'pointer' }}
                >
                  {saving ? '저장 중...' : '💾 저장'}
                </button>
                {savedMsg && <span style={{ fontSize: '0.875rem', color: savedMsg.startsWith('✅') ? '#059669' : '#EF4444', fontWeight: 600 }}>{savedMsg}</span>}
              </div>

            </div>
          </div>
        )}
      </div>

      {/* 우측: 사례 목록 */}
      <div className="card" style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>시공사례 목록 ({visibleCases.length}건)</h3>
          <button type="button" onClick={saveOrder} disabled={saving}>{saving ? '저장 중...' : '순서 저장'}</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', margin: '0.75rem 0' }}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveCategory(filter)}
              style={filterButtonStyle(activeCategory === filter)}
            >
              {filter} {filter === '전체' ? cases.length : cases.filter((item) => item.category === filter).length}
            </button>
          ))}
        </div>
        <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: '0.35rem', maxHeight: '72vh', overflowY: 'auto' }}>
          {visibleCases.map((item, visibleIndex) => (
              <li
                key={item.id}
                data-admin-order-id={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  border: selected?.id === item.id ? '1px solid var(--red)' : '1px solid var(--border)',
                  borderRadius: '8px',
                  background: selected?.id === item.id ? '#FDECEA' : '#fff',
                  padding: '0.42rem 0.55rem',
                  opacity: draggedId === item.id ? 0.45 : 1,
                }}
              >
                <span
                  onPointerDown={(event) => handlePointerStart(event, item.id)}
                  style={{ color: '#9CA3AF', fontWeight: 800, cursor: draggedId === item.id ? 'grabbing' : 'grab', userSelect: 'none', touchAction: 'none', padding: '0 0.15rem' }}
                  title="끌어서 순서 변경"
                >
                  ☰
                </span>
                <button
                  type="button"
                  onClick={() => selectCase(item)}
                  style={{ flex: 1, border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer' }}
                >
                  <strong style={{ display: 'block', fontSize: '0.84rem', color: '#1F2937' }}>{item.title}</strong>
                  <span style={{ display: 'block', fontSize: '0.72rem', color: '#6B7280' }}>
                    {item.category} · 작성일 {formatDate(item.created_at)}
                  </span>
                </button>
                <button type="button" onClick={() => moveCase(item.id, -1)} disabled={visibleIndex === 0}>↑</button>
                <button type="button" onClick={() => moveCase(item.id, 1)} disabled={visibleIndex === visibleCases.length - 1}>↓</button>
              </li>
          ))}
        </ul>
        {savedMsg && <p style={{ color: savedMsg.includes('실패') ? '#DC2626' : '#047857', fontWeight: 700, fontSize: '0.82rem' }}>{savedMsg}</p>}
      </div>
    </div>
  );
}

function compactCaseImages(item: Partial<CaseItem>) {
  return Array.from(new Set([item.image_url, ...(item.images ?? [])].filter(Boolean) as string[]));
}

function reorder<T>(items: T[], from: number, to: number) {
  if (from < 0 || to < 0 || from >= items.length || to >= items.length || from === to) return items;
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function reorderById(items: CaseItem[], sourceId: string, targetId: string) {
  const from = items.findIndex((item) => item.id === sourceId);
  const to = items.findIndex((item) => item.id === targetId);
  return reorder(items, from, to);
}

function filterButtonStyle(active: boolean): React.CSSProperties {
  return {
    border: active ? '1px solid var(--navy)' : '1px solid var(--border)',
    background: active ? 'var(--navy)' : '#fff',
    color: active ? '#fff' : '#374151',
    borderRadius: '999px',
    padding: '0.28rem 0.62rem',
    fontSize: '0.76rem',
    fontWeight: 800,
    cursor: 'pointer',
  };
}

function formatDate(value?: string) {
  if (!value) return '-';
  return value.slice(0, 10);
}
