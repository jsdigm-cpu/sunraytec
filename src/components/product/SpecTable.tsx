import type { CSSProperties } from 'react';
import type { Product } from '../../types/product';

interface Props {
  products: Product[];
}

export default function SpecTable({ products }: Props) {
  return (
    <section style={{ marginTop: '1.4rem' }}>
      <h2 style={{ marginBottom: '0.5rem' }}>기술 사양 표 (HTML Table)</h2>
      <p style={{ marginTop: 0, color: 'var(--color-text-muted)' }}>소비전력, 크기, 전압, 난방면적을 모델별로 비교할 수 있습니다.</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 760, background: '#fff' }}>
          <thead>
            <tr style={{ background: '#fff7ed' }}>
              <th style={cell}>모델명</th>
              <th style={cell}>소비전력</th>
              <th style={cell}>크기</th>
              <th style={cell}>전압</th>
              <th style={cell}>난방면적</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={cell}>{product.name}</td>
                <td style={cell}>{product.specs.powerW}W</td>
                <td style={cell}>{product.specs.sizeMm} mm</td>
                <td style={cell}>{product.specs.voltage}</td>
                <td style={cell}>{product.specs.heatingArea}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const cell: CSSProperties = {
  border: '1px solid var(--color-border)',
  padding: '0.7rem',
  textAlign: 'left',
  whiteSpace: 'nowrap',
};
