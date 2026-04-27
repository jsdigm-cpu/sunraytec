import { useEffect, useState } from 'react';
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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setDraft(products);
  }, [products]);

  const remove = async (id: string, name: string) => {
    if (!window.confirm(`${name} 제품을 삭제할까요?`)) return;
    const error = await onDelete(id);
    if (error) window.alert(error);
  };

  const move = (index: number, direction: -1 | 1) => {
    setDraft((prev) => reorder(prev, index, index + direction));
  };

  const dropOn = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;
    setDraft((prev) => {
      const from = prev.findIndex((item) => item.id === draggedId);
      const to = prev.findIndex((item) => item.id === targetId);
      return reorder(prev, from, to);
    });
    setDraggedId(null);
  };

  const saveOrder = async () => {
    setSaving(true);
    const error = await onSaveOrder(draft);
    setSaving(false);
    if (error) window.alert(error);
  };

  const isDirty = draft.map((item) => item.id).join('|') !== products.map((item) => item.id).join('|');

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
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {draft.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={() => setDraggedId(item.id)}
            onDragOver={(event) => event.preventDefault()}
            onDrop={() => dropOn(item.id)}
            onDragEnd={() => setDraggedId(null)}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.4rem',
              border: selectedId === item.id ? '1px solid var(--red)' : '1px solid var(--border)',
              borderRadius: '8px',
              background: selectedId === item.id ? '#FDECEA' : '#fff',
              padding: '0.55rem 0.65rem',
              opacity: draggedId === item.id ? 0.45 : 1,
            }}
          >
            <span style={{ color: '#9CA3AF', fontWeight: 800, cursor: 'grab' }}>☰</span>
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
              {item.name} ({item.specs.powerW}W / {item.category})
            </button>
            <button type="button" onClick={() => move(index, -1)} disabled={index === 0}>↑</button>
            <button type="button" onClick={() => move(index, 1)} disabled={index === draft.length - 1}>↓</button>
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
