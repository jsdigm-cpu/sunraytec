import { Link } from 'react-router-dom';

type SupportPageId = 'faq' | 'notice' | 'dealers' | 'chatbot' | 'privacy' | 'terms';

interface SupportPageProps {
  pageId: SupportPageId;
}

const DATA: Record<SupportPageId, {
  eyebrow: string;
  title: string;
  desc: string;
  items: Array<{ q: string; a: string }>;
}> = {
  faq: {
    eyebrow: 'FAQ',
    title: '자주 묻는 질문',
    desc: '복사난방 적용, 견적, 시공, 유지관리와 관련해 자주 묻는 내용을 정리했습니다.',
    items: [
      { q: '복사난방은 일반 온풍 난방과 무엇이 다른가요?', a: '공기를 먼저 데우는 방식이 아니라 사람, 바닥, 벽면 등 피사체에 열을 전달하는 방식이라 바람과 분진 이동이 적습니다.' },
      { q: '견적을 받으려면 어떤 정보가 필요한가요?', a: '공간 면적, 천장고, 용도, 전원 조건, 사진 또는 도면이 있으면 더 정확한 검토가 가능합니다.' },
      { q: '공공기관 조달 구매가 가능한가요?', a: '조달 우수제품, MAS 제품 등 구매 경로에 맞춘 상담을 지원합니다.' },
    ],
  },
  notice: {
    eyebrow: 'Notice',
    title: '공지사항',
    desc: '제품, 조달, 자료 업데이트, 전시·행사 소식을 안내합니다. 실제 공지 DB 연동 전 기본 게시판 형태입니다.',
    items: [
      { q: '2025 조달 우수제품 지정 안내', a: '썬레이텍 복사난방 제품의 조달 우수제품 지정 관련 안내 자료를 준비 중입니다.' },
      { q: '공공기관 자료 라운지 오픈 준비', a: '일위대가표, 도면, 제안서 양식을 한 곳에서 제공하는 라운지 기능을 준비하고 있습니다.' },
      { q: '시공사례 이미지 자료 보강', a: '관리자 등록 자료를 기반으로 시공사례와 메인 실적 섹션이 순차 업데이트됩니다.' },
    ],
  },
  dealers: {
    eyebrow: 'Dealer Program',
    title: '대리점 모집',
    desc: '지역 영업, 설계 협력, 시공 파트너를 위한 협력 안내 페이지입니다.',
    items: [
      { q: '모집 대상', a: '설비, 전기, 건축, 공조, 에너지 분야에서 공공·산업 고객을 보유한 협력사를 우선 검토합니다.' },
      { q: '협력 방식', a: '제품 교육, 제안 자료, 현장 검토, 견적 협업, 시공 지원 체계를 단계적으로 제공합니다.' },
      { q: '신청 방법', a: '파트너·협력회사 회원가입 안내 페이지에서 기본 정보를 제출해 주세요.' },
    ],
  },
  chatbot: {
    eyebrow: 'AI Assistant',
    title: 'AI 상담 챗봇',
    desc: '간단한 제품 선택, 예상 용량, 자료 위치를 안내하는 상담 기능 준비 페이지입니다.',
    items: [
      { q: '현재 이용 가능 범위', a: '정식 챗봇 오픈 전까지는 견적 문의와 전화 상담으로 연결합니다.' },
      { q: '예정 기능', a: '공간 조건 입력, 제품군 추천, 자료실 링크 안내, 파트너 포털 안내를 제공할 예정입니다.' },
      { q: '상담 연결', a: '긴급한 검토는 1688-2520 또는 견적 문의 페이지를 이용해 주세요.' },
    ],
  },
  privacy: {
    eyebrow: 'Privacy Policy',
    title: '개인정보처리방침',
    desc: '홈페이지 문의, 회원가입, 파트너 신청 과정에서 수집되는 개인정보 처리 기준 초안입니다.',
    items: [
      { q: '수집 항목', a: '이름, 연락처, 이메일, 회사명, 문의 내용, 파트너 신청 정보 등 서비스 제공에 필요한 최소 정보를 수집합니다.' },
      { q: '이용 목적', a: '상담 응대, 견적 검토, 파트너 권한 승인, 자료 제공, 서비스 품질 개선에 활용합니다.' },
      { q: '보관 및 파기', a: '관련 법령과 내부 운영 기준에 따라 보관하며 목적 달성 후 지체 없이 파기합니다. 최종 법무 검토 전 초안입니다.' },
    ],
  },
  terms: {
    eyebrow: 'Terms',
    title: '이용약관',
    desc: '썬레이텍 웹사이트, 자료실, 파트너 포털 이용에 관한 기본 약관 초안입니다.',
    items: [
      { q: '서비스 범위', a: '제품 안내, 시공사례, 자료 열람, 견적 문의, 파트너 전용 자료 제공 서비스를 포함합니다.' },
      { q: '자료 이용', a: '도면, 제안서, 인증서 등 제공 자료는 검토 목적에 한해 사용할 수 있으며 무단 재배포를 제한합니다.' },
      { q: '책임 제한', a: '웹사이트 정보는 실제 현장 조건에 따라 달라질 수 있으며 최종 설계와 견적은 담당자 검토 후 확정됩니다.' },
    ],
  },
};

export default function SupportPage({ pageId }: SupportPageProps) {
  const page = DATA[pageId];

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh' }}>
      <section style={{ background: 'linear-gradient(160deg, #0F2241 0%, #152035 100%)', color: '#fff', padding: '56px 0 64px' }}>
        <div className="container">
          <p style={{ color: 'rgba(255,255,255,.5)', fontSize: 12, marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,.5)', textDecoration: 'none' }}>홈</Link> › 고객센터
          </p>
          <p style={{ color: 'var(--amber2)', fontSize: 12, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>{page.eyebrow}</p>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 900, marginBottom: 12 }}>{page.title}</h1>
          <p style={{ maxWidth: 720, color: 'rgba(255,255,255,.68)', lineHeight: 1.8 }}>{page.desc}</p>
        </div>
      </section>

      <section style={{ padding: '52px 0 76px' }}>
        <div className="container" style={{ display: 'grid', gap: 14 }}>
          {page.items.map((item) => (
            <article key={item.q} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 24 }}>
              <h2 style={{ color: 'var(--navy)', fontSize: '1.12rem', fontWeight: 900, marginBottom: 8 }}>{item.q}</h2>
              <p style={{ color: '#64748B', lineHeight: 1.75 }}>{item.a}</p>
            </article>
          ))}
          <div style={{ marginTop: 16 }}>
            <Link to="/contact" style={{ display: 'inline-flex', background: 'var(--red)', color: '#fff', borderRadius: 8, padding: '12px 22px', fontWeight: 800, textDecoration: 'none' }}>
              문의하기
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
