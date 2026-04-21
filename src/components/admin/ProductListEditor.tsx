import type { Product } from '../../types/product';

interface Props {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductListEditor({ products, onDelete }: Props) {
  return (
    <div className="card" style={{ padding: '1rem' }}>
      <h3>제품 목록</h3>
      <ul style={{ padding: 0, listStyle: 'none' }}>
        {products.map((item) => (
          <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
            <span>
              {item.name} ({item.specs.powerW}W / {item.category})
            </span>
            <button onClick={() => onDelete(item.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
