import { useEffect, useRef, useState } from 'react';
import type React from 'react';
import type { Product } from '../../types/product';

interface Props {
  products: Product[];
  selectedId?: string | null;
  onSelect: (product: Product) => void;
  onDelete: (id: string) => Promise<string | null> | string | null | void;
  onSaveOrder: (products: Product[]) => Promise<string | null> | string | null | void;
}

export default function ProductListEditor({ products, selectedId, onSelect, onDelete, onSaveOrder }: Props) {
  const [draft, setDraft] = useState<Product[]>(products);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [activeLine, setActiveLine] = useState<'all' | 'excellent' | 'mas' | 'personal'>('all');
  const [saving, setSaving] = useState(false);
  const draggedIdRef = useRef<string | null>(null);

  useEffect(() => {
    setDraft(products);
  }, [products]);

  useEffect(() => {
    const moveDrag = (event: PointerEvent) => {
      const sourceId = draggedIdRef.current;
      if (!sourceId) return;
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest('[data-admin-order-id]');
      const targetId = target?.getAttribute('data-admin-order-id');
      if (!targetId || targetId === sourceId) return;
      setDraft((prev) => reorderById(prev, sourceId, targetId));
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

  const remove = async (id: string, name: string) => {
    if (!window.confirm(`${name} 제품을 삭제할까요?`)) return;
    const error = await onDelete(id);
    if (error) window.alert(error);
  };

  const move = (id: string, direction: -1 | 1) => {
    setDraft((prev) => {
      const visibleItems = activeLine === 'all' ? prev : prev.filter((item) => item.productLine === activeLine);
      const visibleIndex = visibleItems.findIndex((item) => item.id === id);
      const targetVisible = visibleItems[visibleIndex + direction];
      if (!targetVisible) return prev;
      return reorderById(prev, id, targetVisible.id);
    });
  };

  const handlePointerStart = (event: React.PointerEvent, id: string) => {
    event.preventDefault();
    draggedIdRef.current = id;
    setDraggedId(id);
  };

  const saveOrder = async () => {
    setSaving(true);
    const error = await onSaveOrder(draft);
    setSaving(false);
    if (error) window.alert(error);
  };

  const isDirty = draft.map((item) => item.id).join('|') !== products.map((item) => item.id).join('|');
  const visible = activeLine === 'all' ? draft : draft.filter((item) => item.productLine === activeLine);
  const filters = [
    { key: 'all', label: '전체', count: draft.length },
    { key: 'excellent', label: '우수제품', count: draft.filter((item) => item.productLine === 'excellent').length },
    { key: 'mas', label: 'MAS', count: draft.filter((item) => item.productLine === 'mas').length },
    { key: 'personal', label: '개인용/특수형', count: draft.filter((item) => item.productLine === 'personal').length },
  ] as const;

  return (
    <div className="card" style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.75rem', alignItems: 'center' }}>
        <h3 style={{ margin: 0 }}>제품 목록</h3>
        <button type="button" onClick={saveOrder} disabled={!isDirty || saving}>
          {saving ? '저장 중...' : '순서 저장'}
        </button>
      </div>
      <p style={{ marginTop: '-0.25rem', color: 'var(--gray)', fontSize: '0.82rem' }}>
        항목을 클릭하면 수정할 수 있고, 끌어서 놓거나 위/아래 버튼으로 노출 순서를 바꿀 수 있습니다.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
        {filters.map((filter) => (
          <button
            key={filter.key}
            type="button"
            onClick={() => setActiveLine(filter.key)}
            style={filterButtonStyle(activeLine === filter.key)}
          >
            {filter.label} {filter.count}
          </button>
        ))}
      </div>
      <ul style={{ padding: 0, listStyle: 'none', display: 'grid', gap: '0.35rem' }}>
        {visible.map((item, visibleIndex) => (
          <li
            key={item.id}
            data-admin-order-id={item.id}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.5rem',
              border: selectedId === item.id ? '1px solid var(--red)' : '1px solid var(--border)',
              borderRadius: '8px',
              background: selectedId === item.id ? '#FDECEA' : '#fff',
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
              onClick={() => onSelect(item)}
              style={{
                flex: 1,
                textAlign: 'left',
                border: 'none',
                background: 'transparent',
                color: 'var(--text)',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <strong style={{ display: 'block', fontSize: '0.84rem' }}>{item.name} ({item.specs.powerW}W)</strong>
              <span style={{ display: 'block', color: '#6B7280', fontSize: '0.72rem' }}>
                {item.category} · 작성일 {formatDate(item.createdAt)}
              </span>
            </button>
            <button type="button" onClick={() => move(item.id, -1)} disabled={visibleIndex === 0}>↑</button>
            <button type="button" onClick={() => move(item.id, 1)} disabled={visibleIndex === visible.length - 1}>↓</button>
            <button type="button" onClick={() => remove(item.id, item.name)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function reorder(items: Product[], from: number, to: number) {
  if (from < 0 || to < 0 || from >= items.length || to >= items.length || from === to) return items;
  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

function reorderById(items: Product[], sourceId: string, targetId: string) {
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
