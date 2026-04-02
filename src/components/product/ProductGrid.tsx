import type { Product } from '../../types/product';

interface Props {
  products: Product[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export default function ProductGrid({ products, selectedId, onSelect }: Props) {
  return (
    <section>
      <h2>제품 요약</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '1rem' }}>
        {products.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item.id)}
            className="card"
            style={{
              textAlign: 'left',
              padding: '1rem',
              borderColor: selectedId === item.id ? 'var(--color-accent)' : 'var(--color-border)',
              background: '#fff',
            }}
          >
            <strong>{item.name}</strong>
            <p style={{ margin: '0.4rem 0', color: 'var(--color-text-muted)' }}>{item.category}</p>
            <small>{item.summary}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
