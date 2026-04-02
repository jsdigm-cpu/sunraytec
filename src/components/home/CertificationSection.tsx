import type { CertificationItem } from '../../types/cms';

interface Props {
  items: CertificationItem[];
}

export default function CertificationSection({ items }: Props) {
  return (
    <section style={{ padding: '0 0 2rem' }}>
      <div className="container card" style={{ padding: '1.2rem' }}>
        <h2 style={{ marginTop: 0 }}>인증서 · 지적재산권 · 시험성적 핵심 요약</h2>
        <ul style={{ marginBottom: 0 }}>
          {items.map((item) => (
            <li key={`${item.title}-${item.year ?? ''}`} style={{ marginBottom: '0.4rem' }}>
              {item.title} {item.year ? `(${item.year})` : ''}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
