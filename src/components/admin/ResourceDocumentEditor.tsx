import { useEffect, useState } from 'react';
import type React from 'react';
import { supabase } from '../../lib/supabase';
import { uploadPublicFile } from '../../lib/storageUploads';

type ResourceCategory = '제품 카탈로그' | '기술 자료' | '인증서' | '파트너 자료';

interface ResourceDocument {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  file_url: string;
  file_size: string;
  is_public: boolean;
  sort_order: number;
  created_at?: string;
}

const EMPTY: Partial<ResourceDocument> = {
  title: '',
  description: '',
  category: '제품 카탈로그',
  file_url: '',
  file_size: '',
  is_public: true,
};

const CATEGORIES: ResourceCategory[] = ['제품 카탈로그', '기술 자료', '인증서', '파트너 자료'];

export default function ResourceDocumentEditor() {
  const [documents, setDocuments] = useState<ResourceDocument[]>([]);
  const [form, setForm] = useState<Partial<ResourceDocument>>(EMPTY);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'전체' | ResourceCategory>('전체');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadDocuments();
  }, []);

  useEffect(() => {
    const stopDrag = () => {
      if (draggedId) {
        setDraggedId(null);
        saveOrderedDocuments(documents);
      }
    };
    window.addEventListener('pointerup', stopDrag);
    window.addEventListener('pointercancel', stopDrag);
    return () => {
      window.removeEventListener('pointerup', stopDrag);
      window.removeEventListener('pointercancel', stopDrag);
    };
  }, [draggedId, documents]);

  async function loadDocuments() {
    if (!supabase) return;
    const { data, error } = await supabase
      .from('resource_documents')
      .select('id,title,description,category,file_url,file_size,is_public,sort_order,created_at')
      .order('sort_order', { ascending: true });

    if (error) {
      setMessage(`자료실 목록 로드 실패: ${error.message}`);
      return;
    }
    setDocuments((data ?? []) as ResourceDocument[]);
  }

  function selectDocument(item: ResourceDocument) {
    setSelectedId(item.id);
    setForm(item);
    setMessage(`${item.title} 정보를 불러왔습니다.`);
  }

  async function uploadFile(file: File | null) {
    if (!file) return;
    setSaving(true);
    setMessage('파일을 업로드하는 중입니다...');
    try {
      const folder = form.category ?? '자료실';
      const url = await uploadPublicFile('resource-files', folder, file);
      setForm((prev) => ({ ...prev, file_url: url, file_size: formatFileSize(file.size) }));
      setMessage('파일이 업로드됐습니다. 저장 버튼을 눌러 자료실에 반영하세요.');
    } catch (error) {
      setMessage(`파일 업로드 실패: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    } finally {
      setSaving(false);
    }
  }

  async function save() {
    if (!supabase) return;
    if (!form.title || !form.category) {
      setMessage('제목과 카테고리를 입력해주세요.');
      return;
    }

    setSaving(true);
    const payload = {
      title: form.title,
      description: form.description ?? '',
      category: form.category,
      file_url: form.file_url ?? '',
      file_size: form.file_size ?? '',
      is_public: form.is_public ?? true,
      sort_order: form.sort_order ?? documents.length,
      updated_at: new Date().toISOString(),
    };
    const query = selectedId
      ? supabase.from('resource_documents').update(payload).eq('id', selectedId)
      : supabase.from('resource_documents').insert(payload);
    const { error } = await query;
    setSaving(false);

    if (error) {
      setMessage(`저장 실패: ${error.message}`);
      return;
    }
    setForm(EMPTY);
    setSelectedId(null);
    setMessage('자료가 저장됐습니다.');
    loadDocuments();
  }

  async function remove(item: ResourceDocument) {
    if (!supabase || !window.confirm(`${item.title} 자료를 삭제할까요?`)) return;
    const { error } = await supabase.from('resource_documents').delete().eq('id', item.id);
    if (error) {
      setMessage(`삭제 실패: ${error.message}`);
      return;
    }
    setMessage('자료가 삭제됐습니다.');
    loadDocuments();
  }

  async function move(id: string, direction: -1 | 1) {
    const visibleItems = activeCategory === '전체' ? documents : documents.filter((item) => item.category === activeCategory);
    const visibleIndex = visibleItems.findIndex((item) => item.id === id);
    const targetVisible = visibleItems[visibleIndex + direction];
    if (!targetVisible || !supabase) return;
    await saveOrderedDocuments(reorderById(documents, id, targetVisible.id));
  }

  function handlePointerStart(event: React.PointerEvent, id: string) {
    event.preventDefault();
    setDraggedId(id);
  }

  function handlePointerEnter(targetId: string) {
    if (!draggedId || draggedId === targetId) return;
    setDocuments((prev) => reorderById(prev, draggedId, targetId));
  }

  async function saveOrderedDocuments(next: ResourceDocument[]) {
    if (!supabase) return;
    const ordered = next.map((item, sort_order) => ({ ...item, sort_order }));
    setDocuments(ordered);
    const { error } = await supabase.from('resource_documents').upsert(ordered, { onConflict: 'id' });
    setMessage(error ? `순서 저장 실패: ${error.message}` : '자료 노출 순서가 저장됐습니다.');
  }

  const filters = ['전체', ...CATEGORIES] as const;
  const visibleDocuments = activeCategory === '전체' ? documents : documents.filter((item) => item.category === activeCategory);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
      <section className="card" style={{ padding: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>{selectedId ? '자료 수정' : '자료 추가'}</h3>
        <FormLabel label="제목">
          <input value={form.title ?? ''} onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))} />
        </FormLabel>
        <FormLabel label="카테고리">
          <select value={form.category ?? '제품 카탈로그'} onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value as ResourceCategory }))}>
            {CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
          </select>
        </FormLabel>
        <FormLabel label="설명">
          <textarea rows={4} value={form.description ?? ''} onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))} />
        </FormLabel>
        <FormLabel label="자료 파일">
          <input type="file" accept=".pdf,.hwp,.hwpx,.doc,.docx,.xls,.xlsx,.zip,image/*" onChange={(e) => uploadFile(e.target.files?.[0] ?? null)} />
          {form.file_url ? <p style={{ color: '#6B7280', fontSize: '0.75rem', wordBreak: 'break-all' }}>{form.file_url}</p> : null}
        </FormLabel>
        <label style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', margin: '0.75rem 0' }}>
          <input type="checkbox" checked={form.is_public ?? true} onChange={(e) => setForm((prev) => ({ ...prev, is_public: e.target.checked }))} />
          공개 자료로 표시
        </label>
        {message && <p style={{ color: message.includes('실패') || message.includes('입력') ? '#DC2626' : '#047857', fontWeight: 700 }}>{message}</p>}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn btn-primary" type="button" onClick={save} disabled={saving}>{saving ? '처리 중...' : '저장'}</button>
          <button type="button" onClick={() => { setForm(EMPTY); setSelectedId(null); }}>새 자료</button>
        </div>
      </section>

      <section className="card" style={{ padding: '1rem' }}>
        <h3 style={{ marginTop: 0 }}>자료 목록 ({visibleDocuments.length}건)</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveCategory(filter)}
              style={filterButtonStyle(activeCategory === filter)}
            >
              {filter} {filter === '전체' ? documents.length : documents.filter((item) => item.category === filter).length}
            </button>
          ))}
        </div>
        <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: '0.35rem' }}>
          {visibleDocuments.map((item, visibleIndex) => (
            <li
              key={item.id}
              onPointerEnter={() => handlePointerEnter(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '0.42rem 0.55rem',
                background: selectedId === item.id ? '#FDECEA' : '#fff',
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
              <button type="button" onClick={() => selectDocument(item)} style={{ flex: 1, border: 'none', background: 'transparent', padding: 0, textAlign: 'left', cursor: 'pointer' }}>
                <strong style={{ display: 'block', fontSize: '0.84rem' }}>{item.title}</strong>
                <div style={{ color: '#6B7280', fontSize: '0.72rem' }}>
                  {item.category} · 작성일 {formatDate(item.created_at)} · {item.file_size || '파일 크기 미입력'} · {item.is_public ? '공개' : '비공개'}
                </div>
              </button>
              <div style={{ display: 'flex', gap: '0.3rem' }}>
                <button type="button" onClick={() => move(item.id, -1)} disabled={visibleIndex === 0}>↑</button>
                <button type="button" onClick={() => move(item.id, 1)} disabled={visibleIndex === visibleDocuments.length - 1}>↓</button>
                <button type="button" onClick={() => remove(item)}>삭제</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function FormLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'grid', gap: '0.35rem', marginBottom: '0.75rem', color: '#374151', fontSize: '0.8rem', fontWeight: 800 }}>
      {label}
      {children}
    </label>
  );
}

function formatFileSize(bytes: number) {
  if (bytes < 1024 * 1024) return `PDF · ${(bytes / 1024).toFixed(0)}KB`;
  return `PDF · ${(bytes / 1024 / 1024).toFixed(1)}MB`;
}

function reorder<T>(items: T[], from: number, to: number) {
  if (from < 0 || to < 0 || from >= items.length || to >= items.length || from === to) return items;
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function reorderById(items: ResourceDocument[], sourceId: string, targetId: string) {
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
