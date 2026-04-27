import type { Product } from '../../types/product';

interface Props {
  products: Product[];
  selectedId?: string | null;
  onSelect: (product: Product) => void;
  onDelete: (id: string) => Promise<string | null> | string | null | void;
}

export default function ProductListEditor({ products, selectedId, onSelect, onDelete }: Props) {
  const remove = async (id: string, name: string) => {
    if (!window.confirm(`${name} 제품을 삭제할까요?`)) return;
    const error = await onDelete(id);
    if (error) window.alert(error);
  };

  return (
    <div className="card" style={{ padding: '1rem' }}>
      <h3>제품 목록</h3>
      <p style={{ marginTop: '-0.25rem', color: 'var(--gray)', fontSize: '0.82rem' }}>
        항목을 클릭하면 좌측 폼에서 수정할 수 있습니다.
      </p>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {products.map((item) => (
          <li
            key={item.id}
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
            }}
          >
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
            <button type="button" onClick={() => remove(item.id, item.name)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
