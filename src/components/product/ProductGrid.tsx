import { Link } from 'react-router-dom';
import type { Product } from '../../types/product';

interface Props {
  products: Product[];
}

const GROUP_TITLES = {
  excellent: '조달청 우수제품',
  mas: 'MAS 제품',
  personal: '개인용 · 특수형',
} as const;

export default function ProductGrid({ products }: Props) {
  const groups = Object.entries(GROUP_TITLES)
    .map(([line, title]) => ({
      line,
      title,
      items: products.filter((product) => product.productLine === line),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <section>
      <h2>제품 요약</h2>
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {groups.map((group) => (
          <div key={group.line}>
            <h3 style={{ margin: '0 0 0.75rem' }}>{group.title}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: '1rem' }}>
              {group.items.map((item) => (
                <article
                  key={item.id}
                  className="card"
                  style={{
                    textAlign: 'left',
                    padding: '1rem',
                    background: '#fff',
                  }}
                >
                  <div
                    style={{
                      borderRadius: '14px',
                      background: 'linear-gradient(135deg, var(--navy), #193764)',
                      color: '#fff',
                      padding: '1rem',
                      marginBottom: '0.9rem',
                      minHeight: '124px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      overflow: 'hidden',
                    }}
                  >
                    {item.thumbnailImage || item.detailImage ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '84px 1fr', gap: '0.9rem', alignItems: 'center' }}>
                        <div
                          style={{
                            width: '84px',
                            height: '84px',
                            borderRadius: '12px',
                            background: '#fff',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            padding: '6px',
                          }}
                        >
                          <img
                            src={item.thumbnailImage ?? item.detailImage}
                            alt={item.name}
                            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', opacity: 0.78, marginBottom: '0.35rem' }}>{item.category}</div>
                          <strong style={{ display: 'block', fontSize: '1.15rem', lineHeight: 1.15 }}>{item.name}</strong>
                          <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>{item.specs.heatingArea}</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: '12px', opacity: 0.78 }}>{item.category}</div>
                        <strong style={{ display: 'block', fontSize: '1.25rem', lineHeight: 1.15 }}>{item.name}</strong>
                        <span style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>{item.specs.heatingArea}</span>
                      </>
                    )}
                  </div>
                  <p style={{ margin: '0 0 0.8rem', color: 'var(--color-text-muted)', minHeight: '3.6em' }}>{item.summary}</p>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.65rem 0.9rem',
                      padding: '0.9rem',
                      borderRadius: '12px',
                      background: 'var(--off)',
                      marginBottom: '0.9rem',
                    }}
                  >
                    <SpecMini label="소비전력" value={`${item.specs.powerW.toLocaleString()}W`} />
                    <SpecMini label="전압" value={item.specs.voltage.split(' ')[0]} />
                    <SpecMini label="크기" value={item.specs.sizeMm} />
                    <SpecMini label="설치 방법" value={formatInstallationType(item.installationType)} />
                  </div>
                  <Link
                    to={`/products/${item.id}`}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: '0.8rem 1rem',
                      borderRadius: '10px',
                      background: 'var(--navy)',
                      color: '#fff',
                      fontWeight: 700,
                    }}
                  >
                    제품 보기 →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SpecMini({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div style={{ fontSize: '10px', color: 'var(--color-text-muted)', fontWeight: 700, marginBottom: '0.2rem' }}>{label}</div>
      <div style={{ fontSize: '0.92rem', fontWeight: 700 }}>{value}</div>
    </div>
  );
}

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
