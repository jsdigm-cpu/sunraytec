import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

interface Props {
  products: Product[];
}

export default function SpecTable({ products }: Props) {
  const groupedProducts = [
    {
      key: 'excellent',
      title: '조달청 우수제품',
      description: '우수제품 지정 모델을 매립형과 노출형으로 구분해 정리했습니다.',
      accent: 'var(--red)',
      headerBg: '#FFF3EE',
      items: products.filter((product) => product.productLine === 'excellent'),
    },
    {
      key: 'mas',
      title: 'MAS 다수공급자계약 제품',
      description: '나라장터 종합쇼핑몰 MAS 계약 기준 모델입니다.',
      accent: 'var(--blue)',
      headerBg: '#EEF6FF',
      items: products.filter((product) => product.productLine === 'mas'),
    },
  ].filter((group) => group.items.length > 0);

  const personalProducts = products.filter((product) => product.productLine === 'personal');

  return (
    <section style={{ marginTop: '1.4rem', display: 'grid', gap: '1.5rem' }}>
      {groupedProducts.map((group) => (
        <article
          key={group.key}
          style={{
            background: '#fff',
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 8px 28px rgba(15, 23, 42, 0.06)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: '1.1rem 1.25rem',
              background: group.headerBg,
              borderBottom: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: 'var(--navy)' }}>{group.title}</h3>
              <p style={{ margin: '0.35rem 0 0', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{group.description}</p>
            </div>
            <span
              style={{
                fontSize: '0.86rem',
                fontWeight: 800,
                color: group.accent,
                background: '#fff',
                border: `1px solid ${group.accent}22`,
                borderRadius: '999px',
                padding: '0.35rem 0.75rem',
              }}
            >
              {group.items.length}개 모델
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 980, background: '#fff' }}>
              <thead>
                <tr style={{ background: '#F8FAFC' }}>
                  <th style={headCell}>모델명</th>
                  <th style={headCell}>설치 방식</th>
                  <th style={headCell}>소비전력</th>
                  <th style={headCell}>크기</th>
                  <th style={headCell}>전압</th>
                  <th style={headCell}>난방면적</th>
                  <th style={headCell}>식별번호</th>
                  <th style={{ ...headCell, textAlign: 'center' }}>상세보기</th>
                </tr>
              </thead>
              <tbody>
                {group.items.map((product, index) => (
                  <tr key={product.id} style={{ background: index % 2 === 0 ? '#fff' : '#FCFDFE' }}>
                    <td style={cell}>
                      <div style={{ fontWeight: 800, color: 'var(--navy)' }}>{product.name}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>{product.summary}</div>
                    </td>
                    <td style={cell}>{formatInstallationType(product.installationType)}</td>
                    <td style={cell}>{product.specs.powerW.toLocaleString()}W</td>
                    <td style={cell}>{product.specs.sizeMm} mm</td>
                    <td style={cell}>{product.specs.voltage}</td>
                    <td style={cell}>{product.specs.heatingArea}</td>
                    <td style={cell}>{product.procurementId ?? '-'}</td>
                    <td style={{ ...cell, textAlign: 'center' }}>
                      <Link
                        to={`/products/${product.id}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '0.55rem 0.85rem',
                          borderRadius: '999px',
                          background: group.accent,
                          color: '#fff',
                          fontWeight: 800,
                          fontSize: '0.86rem',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        상세보기
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      ))}

      {personalProducts.length > 0 ? (
        <article
          style={{
            background: '#fff',
            borderRadius: '20px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 8px 28px rgba(15, 23, 42, 0.05)',
            padding: '1.1rem 1.25rem',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 900, color: 'var(--navy)' }}>개인용 · 특수형</h3>
          <p style={{ margin: '0.4rem 0 0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
            개인 난방용 또는 특수 설치형 모델입니다.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
            {personalProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 0.95rem',
                  borderRadius: '14px',
                  border: '1px solid var(--color-border)',
                  background: '#F8FAFC',
                  color: 'var(--navy)',
                  fontWeight: 700,
                }}
              >
                {product.name}
                <span style={{ color: 'var(--red)', fontWeight: 800 }}>→</span>
              </Link>
            ))}
          </div>
        </article>
      ) : null}
    </section>
  );
}

const cell: CSSProperties = {
  borderBottom: '1px solid var(--color-border)',
  padding: '0.9rem 1rem',
  textAlign: 'left',
  verticalAlign: 'middle',
};

const headCell: CSSProperties = {
  borderBottom: '1px solid var(--color-border)',
  padding: '0.85rem 1rem',
  textAlign: 'left',
  whiteSpace: 'nowrap',
  color: 'var(--navy)',
  fontSize: '0.88rem',
  fontWeight: 800,
};

function formatInstallationType(type?: Product['installationType']) {
  switch (type) {
    case 'embedded':
      return '매립형';
    case 'exposed':
      return '노출형';
    case 'wall-mounted':
      return '벽걸이형';
    case 'desk':
      return '책상형';
    default:
      return '-';
  }
}
