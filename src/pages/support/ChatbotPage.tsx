import { Link } from 'react-router-dom';
import SubHero from '../../components/layout/SubHero';

const CAPABILITIES = [
  { tag: '준비중', title: '공간 조건 입력', body: '면적·천장고·전원 조건을 입력하면 1차 적정 모델군을 추천합니다.' },
  { tag: '준비중', title: '제품 추천', body: '용도(공공·산업·욕실 등)와 환경 조건에 따라 SUR 시리즈에서 적합 모델을 안내합니다.' },
  { tag: '준비중', title: '자료실 안내', body: '카탈로그·시방서·일위대가표·도면이 어디에 있는지 바로 링크로 안내합니다.' },
  { tag: '준비중', title: '상담 연결', body: '복잡한 안건은 견적 문의 양식 또는 본사 전화 상담으로 매끄럽게 연결합니다.' },
];

const ALTERNATIVES = [
  {
    title: '자료실의 계산기 먼저 사용해보기',
    body: '면적·천장고·단열 조건만 입력해도 1차 용량과 ROI를 추산할 수 있습니다.',
    href: '/resources/heating-load-calculator',
    label: '난방 용량 계산기 →',
  },
  {
    title: '에너지 ROI 계산기',
    body: '기존 난방비·예상 절감률·설치비를 넣어 회수 기간을 직접 확인합니다.',
    href: '/resources/energy-roi-calculator',
    label: '에너지 ROI 계산기 →',
  },
  {
    title: '견적 문의 양식 사용하기',
    body: '담당자가 24시간 내 연락드리며, 도면·사진을 첨부하면 검토가 더 빠릅니다.',
    href: '/contact',
    label: '견적 문의 →',
  },
  {
    title: '대표 전화 상담',
    body: '평일 09:00–18:00 (점심 12:00–13:00) 1688-2520 으로 직접 연결됩니다.',
    href: 'tel:16882520',
    label: '1688-2520 전화',
  },
];

export default function ChatbotPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
            <SubHero
        breadcrumb={[{ label: '고객센터' }, { label: 'AI 상담 챗봇' }]}
        badge="AI Assistant · Coming Soon"
        title="상담 챗봇은 곧 만나보실 수 있습니다"
        lead="제품 추천·예상 용량·자료 위치까지 한 화면에서 안내하는 AI 상담 챗봇을 준비하고 있습니다. 정식 오픈 전까지는 아래 대안 채널을 활용해 주세요."
      />

      <section style={{ padding: '52px 0 28px' }}>
        <div className="container">
          <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 18 }}>예정 기능</h2>
          <div className="chat-cap-grid">
            {CAPABILITIES.map((c) => (
              <article key={c.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 22 }}>
                <span style={{ display: 'inline-block', padding: '3px 10px', background: '#FEF3C7', color: '#92400E', borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5, marginBottom: 10 }}>
                  {c.tag}
                </span>
                <h3 style={{ color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 900, marginBottom: 8 }}>{c.title}</h3>
                <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem' }}>{c.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: '28px 0 80px' }}>
        <div className="container">
          <h2 style={{ color: 'var(--navy)', fontSize: '1.4rem', fontWeight: 900, marginBottom: 18 }}>지금 바로 답을 받는 방법</h2>
          <div className="chat-alt-grid">
            {ALTERNATIVES.map((a) => {
              const isExternal = a.href.startsWith('tel:');
              return (
                <article key={a.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 22, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ color: 'var(--navy)', fontSize: '1.05rem', fontWeight: 900, marginBottom: 8 }}>{a.title}</h3>
                  <p style={{ color: '#475569', lineHeight: 1.75, fontSize: '0.95rem', marginBottom: 14, flex: 1 }}>{a.body}</p>
                  {isExternal ? (
                    <a href={a.href} style={{ color: 'var(--red)', fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>{a.label}</a>
                  ) : (
                    <Link to={a.href} style={{ color: 'var(--red)', fontWeight: 800, textDecoration: 'none', fontSize: 14 }}>{a.label}</Link>
                  )}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .chat-cap-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 14px; }
        .chat-alt-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        @media (max-width: 900px) {
          .chat-cap-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 600px) {
          .chat-cap-grid { grid-template-columns: 1fr; }
          .chat-alt-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </main>
  );
}
