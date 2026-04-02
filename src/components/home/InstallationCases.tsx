interface Props {
  cases: string[];
}

export default function InstallationCases({ cases }: Props) {
  return (
    <section style={{ padding: '0 0 3rem' }}>
      <div className="container">
        <h2>주요 설치 사례</h2>
        <div style={{ display: 'grid', gap: '0.8rem', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))' }}>
          {cases.map((name) => (
            <article key={name} className="card" style={{ padding: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1rem' }}>{name}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
