import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

type AboutPageId = 'ceo' | 'media' | 'clients' | 'location';

interface AboutInfoPageProps {
  pageId: AboutPageId;
}

const PAGES: Record<AboutPageId, {
  eyebrow: string;
  title: string;
  description: string;
  highlights: Array<{ label: string; value: string }>;
  sections: Array<{ title: string; body: string }>;
}> = {
  ceo: {
    eyebrow: 'CEO Message',
    title: '따뜻함의 기준을 바꾸는 기술 기업',
    description: '썬레이텍은 원적외선 복사난방 기술로 공공시설, 산업현장, 특수 환경의 열 문제를 해결해 온 전문 기업입니다.',
    highlights: [
      { label: '핵심 기술', value: '원적외선 복사난방' },
      { label: '운영 방향', value: '안전·효율·쾌적성' },
      { label: '주요 시장', value: '공공·산업·특수시설' },
    ],
    sections: [
      { title: '현장에서 검증된 난방 솔루션', body: '난방은 단순히 온도를 높이는 장치가 아니라 공간의 안전과 운영 효율을 좌우하는 설비입니다. 썬레이텍은 바람 없이 열을 전달하는 복사난방의 장점을 바탕으로 다양한 현장의 요구에 맞는 제품과 시공 방식을 발전시켜 왔습니다.' },
      { title: '앞으로의 약속', body: '제품 성능, 시공 품질, 사후관리까지 한 흐름으로 관리하며 공공기관과 산업 고객이 신뢰할 수 있는 복사난방 표준을 만들어가겠습니다.' },
    ],
  },
  media: {
    eyebrow: 'Awards & Media',
    title: '수상·언론보도',
    description: '정부조달 우수제품 지정, 성능 인증, 현장 적용 사례를 중심으로 썬레이텍의 기술 신뢰도를 정리합니다.',
    highlights: [
      { label: '조달 우수제품', value: '2013 · 2019 · 2025' },
      { label: '기술 인증', value: 'K마크 · 방폭 · CE-RoHS' },
      { label: '보도 자료', value: '자료 수집 후 순차 공개' },
    ],
    sections: [
      { title: '주요 인증 기반 신뢰', body: '공공 조달과 산업 현장에 필요한 인증과 시험 자료를 바탕으로 제품의 성능과 적용성을 설명합니다. 실제 인증서 파일과 언론 자료는 자료 확보 후 이 페이지에 순차 반영할 수 있도록 구성했습니다.' },
      { title: '언론·행사 자료 운영 방식', body: '보도자료, 전시회 참가, 공공기관 납품 사례 등 외부 공개가 가능한 콘텐츠를 연도별로 정리하는 구조로 확장할 예정입니다.' },
    ],
  },
  clients: {
    eyebrow: 'Reference Clients',
    title: '주요 납품처',
    description: '학교, 공공기관, 물류센터, 군 시설, 상업시설 등 다양한 공간에서 축적한 적용 경험을 소개합니다.',
    highlights: [
      { label: '공공·교육', value: '학교 · 체육시설 · 복지시설' },
      { label: '산업·물류', value: '공장 · 물류센터 · 작업장' },
      { label: '특수 환경', value: '군 시설 · 방폭 현장' },
    ],
    sections: [
      { title: '공간 유형별 적용', body: '사용자가 머무는 위치, 천장고, 개방 여부, 습기와 분진 등 환경 조건에 맞춰 복사난방 패널의 배치와 용량을 검토합니다.' },
      { title: '대표 실적 연동 예정', body: '현재 시공사례 DB에 등록된 자료를 기반으로 대표 납품처를 자동 노출하는 방식으로 확장할 수 있습니다.' },
    ],
  },
  location: {
    eyebrow: 'Location',
    title: '찾아오시는 길',
    description: '썬레이텍 본사 방문과 상담을 위한 기본 안내입니다. 방문 전 전화 예약을 권장합니다.',
    highlights: [
      { label: '대표전화', value: '1688-2520' },
      { label: '이메일', value: 'master@sunraytec.net' },
      { label: '주소', value: '서울 서초구 능안말길 40 2층' },
    ],
    sections: [
      { title: '방문 상담', body: '제품 적용 현장, 예상 면적, 천장고, 전원 조건, 설치 목적을 미리 알려주시면 더 빠르게 상담할 수 있습니다.' },
      { title: '자료 요청', body: '카탈로그, 인증서, 제안서, 도면 자료가 필요한 경우 고객센터 또는 패스트트랙 라운지를 통해 요청해 주세요.' },
    ],
  },
};

export default function AboutInfoPage({ pageId }: AboutInfoPageProps) {
  const page = PAGES[pageId];

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <section style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #152035 100%)', padding: '58px 0 66px', color: '#fff' }}>
        <div className="container">
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.48)', marginBottom: 18 }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.48)', textDecoration: 'none' }}>홈</Link> › 회사소개
          </p>
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
            <p style={{ color: 'var(--amber2)', fontSize: 12, fontWeight: 900, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>{page.eyebrow}</p>
            <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 1.16, marginBottom: 14 }}>{page.title}</h1>
            <p style={{ maxWidth: 760, color: 'rgba(255,255,255,0.68)', lineHeight: 1.8 }}>{page.description}</p>
          </motion.div>
        </div>
      </section>

      <section style={{ padding: '52px 0 76px' }}>
        <div className="container">
          <div className="about-info-grid">
            {page.highlights.map((item) => (
              <article key={item.label} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 22 }}>
                <p style={{ color: 'var(--red)', fontSize: 12, fontWeight: 900, marginBottom: 8 }}>{item.label}</p>
                <strong style={{ color: 'var(--navy)', fontSize: '1.1rem', lineHeight: 1.5 }}>{item.value}</strong>
              </article>
            ))}
          </div>

          <div style={{ marginTop: 22, display: 'grid', gap: 16 }}>
            {page.sections.map((section) => (
              <article key={section.title} style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 12, padding: 28 }}>
                <h2 style={{ color: 'var(--navy)', fontSize: '1.25rem', fontWeight: 900, marginBottom: 10 }}>{section.title}</h2>
                <p style={{ color: '#64748B', lineHeight: 1.85 }}>{section.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .about-info-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 16px;
        }
        @media (max-width: 760px) {
          .about-info-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
