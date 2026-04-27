import type { Product } from '../../types/product';

interface Props {
  products: Product[];
  onDelete: (id: string) => Promise<string | null> | string | null | void;
}

export default function ProductListEditor({ products, onDelete }: Props) {
  const remove = async (id: string, name: string) => {
    if (!window.confirm(`${name} 제품을 삭제할까요?`)) return;
    const error = await onDelete(id);
    if (error) window.alert(error);
  };

  return (
    <div className="card" style={{ padding: '1rem' }}>
      <h3>제품 목록</h3>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {products.map((item) => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span>
              {item.name} ({item.specs.powerW}W / {item.category})
            </span>
            <button onClick={() => remove(item.id, item.name)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
