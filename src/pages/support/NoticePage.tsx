import { Link } from 'react-router-dom';
import SubHero from '../../components/layout/SubHero';

type Tone = 'red' | 'amber' | 'navy' | 'green' | 'gray';

const NOTICES: Array<{
  date: string;
  category: string;
  tone: Tone;
  title: string;
  body: string;
  pinned?: boolean;
}> = [
  {
    date: '2026-04-28',
    category: '제품',
    tone: 'red',
    pinned: true,
    title: '복사난방 원리 페이지 신설',
    body: '제품 도입 전 검토에 도움이 되도록 복사난방 작동 원리·복사 vs 대류 비교·적용 분야를 정리한 페이지를 새로 열었습니다. 메뉴: 기술·솔루션 → 복사난방 원리.',
  },
  {
    date: '2026-04-27',
    category: '자료실',
    tone: 'navy',
    title: '카탈로그·자료실 다운로드 운영 시작',
    body: '관리자 자료실에서 등록된 PDF·이미지 자료가 자료실 카탈로그 페이지에서 즉시 다운로드되도록 연동을 마쳤습니다. 신규 자료가 등록되는 즉시 노출됩니다.',
  },
  {
    date: '2026-04-25',
    category: '파트너',
    tone: 'amber',
    title: '파트너·협력회사 회원가입 안내 페이지 오픈',
    body: '대리점·시공사·공공기관 담당자를 위한 회원가입 절차와 권한 부여 흐름을 안내합니다. 파트너 포털 접속 전 확인해 주세요.',
  },
  {
    date: '2026-04-20',
    category: '조달',
    tone: 'red',
    title: '2025 조달청 우수제품 3차 지정 안내',
    body: '복사난방 분야 단독으로 세 번째 우수제품 지정. 공공기관 수의계약 자격이 갱신되었으며 일위대가표·시방서·도면 자료는 패스트트랙 라운지에서 확인하실 수 있습니다.',
  },
  {
    date: '2026-04-18',
    category: '시공사례',
    tone: 'green',
    title: '시공사례 이미지·상세 자료 보강 시작',
    body: '관리자 등록 자료를 기반으로 메인 페이지·시공사례 페이지의 현장 사진과 설명을 순차적으로 업데이트하고 있습니다.',
  },
  {
    date: '2026-04-12',
    category: '공지',
    tone: 'gray',
    title: '리뉴얼 사이트 공식 오픈',
    body: '회사소개·제품·기술·시공사례·자료실·파트너 포털·관리자 CMS를 포함한 통합 리뉴얼 사이트를 공개했습니다. 미반영 자료는 순차 업데이트됩니다.',
  },
];

const TONE_BG: Record<Tone, { bg: string; color: string }> = {
  red:   { bg: '#FEE2E2', color: '#B91C1C' },
  amber: { bg: '#FEF3C7', color: '#92400E' },
  navy:  { bg: '#E0E7FF', color: '#1E3A8A' },
  green: { bg: '#DCFCE7', color: '#166534' },
  gray:  { bg: '#F1F5F9', color: '#334155' },
};

export default function NoticePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
            <SubHero
        breadcrumb={[{ label: '고객센터' }, { label: '공지사항' }]}
        badge="Notice"
        title="공지사항"
        lead="제품·자료·조달·전시회·홈페이지 운영과 관련된 주요 안내를 모았습니다."
        keywords={['제품 업데이트', '조달 공고 안내', '전시회 일정', '홈페이지 변경사항']}
      />

      <section style={{ padding: '52px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gap: 12 }}>
            {NOTICES.map((n) => {
              const tone = TONE_BG[n.tone];
              return (
                <article key={n.title} style={{ background: '#fff', border: n.pinned ? '1.5px solid var(--red)' : '1px solid #E5E7EB', borderRadius: 12, padding: 22, boxShadow: n.pinned ? '0 8px 22px rgba(200,57,43,0.08)' : 'none' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                    {n.pinned && (
                      <span style={{ display: 'inline-block', padding: '3px 10px', background: 'var(--red)', color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5 }}>
                        📌 고정
                      </span>
                    )}
                    <span style={{ display: 'inline-block', padding: '3px 10px', background: tone.bg, color: tone.color, borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5 }}>
                      {n.category}
                    </span>
                    <span style={{ color: '#94A3B8', fontSize: 12, marginLeft: 'auto' }}>{n.date}</span>
                  </div>
                  <h2 style={{ color: 'var(--navy)', fontSize: '1.1rem', fontWeight: 900, marginBottom: 8 }}>{n.title}</h2>
                  <p style={{ color: '#475569', lineHeight: 1.8 }}>{n.body}</p>
                </article>
              );
            })}
          </div>

          <p style={{ marginTop: 22, color: '#94A3B8', fontSize: 13 }}>
            ※ 공지 DB 연동 후에는 이 화면이 관리자 등록 게시물로 자동 교체됩니다.
          </p>
        </div>
      </section>
    </main>
  );
}
