const capabilities = [
  {
    title: '교육 및 공공복지',
    body: '학교·어린이집·공공청사에 적합한 조용하고 쾌적한 복사난방으로 학습 환경을 개선합니다.',
  },
  {
    title: '국방 및 특수시설',
    body: '격납고·정비창·특수시설 환경에서 결로 및 화재위험을 줄이는 안전 난방을 제공합니다.',
  },
  {
    title: '산업 및 물류거점',
    body: '높은 층고의 물류센터·공장에서 바람 영향이 적은 직접 복사열 난방으로 효율을 높입니다.',
  },
];

export default function CapabilityCards() {
  return (
    <section style={{ padding: '2rem 0 4rem' }}>
      <div className="container">
        <h2 style={{ fontSize: '1.8rem' }}>핵심 역량</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1rem', marginTop: '1rem' }}>
          {capabilities.map((cap) => (
            <article key={cap.title} className="card" style={{ padding: '1.2rem' }}>
              <h3 style={{ marginTop: 0 }}>{cap.title}</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: 0 }}>{cap.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
