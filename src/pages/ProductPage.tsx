import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import ProductGrid from '../components/product/ProductGrid';
import SpecTable from '../components/product/SpecTable';
import type { CmsState } from '../types/cms';

export default function ProductPage() {
  const { products } = useOutletContext<CmsState>();
  const [selectedId, setSelectedId] = useState(products[0]?.id ?? '');
  const selected = products.find((p) => p.id === selectedId) ?? products[0];

  if (!selected) return null;

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1>제품소개</h1>
      <p style={{ color: 'var(--color-text-muted)' }}>미니멀/퓨처리즘 그리드와 HTML 텍스트 스펙 표로 제품을 비교하세요.</p>
      <ProductGrid products={products} selectedId={selected.id} onSelect={setSelectedId} />

      <article className="card" style={{ marginTop: '1rem', padding: '1rem' }}>
        <h2 style={{ marginTop: 0 }}>{selected.name}</h2>
        <p style={{ color: 'var(--color-text-muted)' }}>{selected.summary}</p>
        <strong>적용 분야</strong>
        <ul>
          {selected.applications.map((useCase) => (
            <li key={useCase}>{useCase}</li>
          ))}
        </ul>
      </article>

      <SpecTable products={products} />
    </div>
  );
}
