import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SubHero from '../../components/layout/SubHero';
import PageSEO from '../../components/seo/PageSEO';
import { supabase } from '../../lib/supabase';

interface Post {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  thumbnail_url?: string;
  published_at: string;
  author?: string;
  tags?: string[];
}

const CATEGORY_COLOR: Record<string, string> = {
  '보도자료':  '#3B82F6',
  '기술 정보': '#10B981',
  '시공기':    '#F59E0B',
  '제품 소식': '#EF4444',
};

const STATIC_POSTS: Record<string, Post> = {
  'post-001': {
    id: 'post-001',
    title: '썬레이텍, 2025년 조달청 우수제품 3회 지정 달성',
    category: '보도자료',
    summary: '2013년, 2019년에 이어 2025년 세 번째 조달청 우수제품으로 지정되었습니다.',
    content: `썬레이텍(대표이사 박○○)이 2025년 조달청 우수제품으로 재지정되며 총 3회 지정이라는 기록을 달성했습니다.

조달청 우수제품은 성능·품질·기술 우수성을 공인 받은 제품에게 부여되는 인증으로, 공공기관 수의계약 납품이 가능해집니다.

**주요 사항**
- 제품명: 원적외선 복사난방 패널히터 SUR 시리즈
- 지정 번호: 조달청 우수제품 번호 (최신 지정분 참조)
- 유효 기간: 2025년 ~ 2028년 (3년)

이로써 썬레이텍은 복사난방 분야에서 국내 유일의 3회 우수제품 지정 기업이 되었으며, 전국 지자체·교육청·군부대 등 공공기관 납품 시 수의계약 활용이 가능합니다.

박이사(대표)는 "우수제품 3회 지정은 제품 기술력과 납품 신뢰성에 대한 국가 공인"이라며 "지속적인 R&D 투자로 더 나은 복사난방 솔루션을 공급하겠다"고 밝혔습니다.`,
    published_at: '2025-03-15',
    author: '썬레이텍 홍보팀',
    tags: ['우수제품', '조달청', '공공조달', 'SUR시리즈'],
  },
  'post-002': {
    id: 'post-002',
    title: '복사난방 vs 대류난방 — 에너지 효율 비교 분석',
    category: '기술 정보',
    summary: 'KTR 공인 시험 결과를 바탕으로 원적외선 복사난방과 기존 대류난방의 차이를 분석합니다.',
    content: `**복사난방과 대류난방의 근본적 차이**

대류난방(온풍기·FCU·에어컨)은 공기를 먼저 가열해 온도를 높입니다. 반면 원적외선 복사난방은 표면과 사람에게 직접 열을 전달합니다.

**KTR 공인 시험 결과**

| 항목 | 복사난방(SUR) | 대류난방(일반) |
|------|-------------|--------------|
| 소비전력 절감 | 약 39.4% | 기준 |
| 원적외선 방사율 | 0.91 | 해당 없음 |
| 항균 성능 | 99.9% | 없음 |

**고천장 공간에서의 차이**

천장 높이 5m 이상 공간에서 대류난방은 열이 천장 쪽으로 모여 작업자 위치의 온도가 낮아집니다. 복사난방은 패널에서 바닥·사람·장비 표면에 직접 열을 전달하므로 높이와 무관하게 동일한 쾌적성을 제공합니다.

**실증 사례**

㈜가나에너지 공장 사례에서는 온풍기(45kW×3대) 교체 후 난방비가 연간 1,130만 원에서 576만 원으로 57% 절감되었습니다.`,
    published_at: '2025-02-20',
    author: '기술연구소',
    tags: ['기술 비교', 'KTR 시험', '에너지 절감', '원적외선'],
  },
  'post-003': {
    id: 'post-003',
    title: '경기도 초등학교 급식실 복사난방 시공기',
    category: '시공기',
    summary: '600㎡ 규모의 초등학교 급식실에 원적외선 복사난방 패널 28대를 설치한 과정을 기록했습니다.',
    content: `**프로젝트 개요**

경기도 소재 초등학교 급식실(600㎡, 천장고 4.2m)의 기존 에어컨 냉난방 시스템을 원적외선 복사난방으로 교체한 시공 사례입니다.

**현장 조건 및 선정 이유**

급식실은 하루 3회 500명 이상이 사용하는 고부하 환경입니다. 기존 에어컨 방식은 위에서 내려오는 바람으로 음식이 빨리 식고, 소음이 심해 학생 식사 환경을 저해했습니다.

| 검토 항목 | 기존(에어컨) | 교체 후(복사난방) |
|---------|-----------|----------------|
| 연간 난방비 | 약 890만 원 | 약 430만 원 |
| 소음 | 40~45dB | 35~37dB |
| 바람 소음 | 있음 | 없음 |
| 항균 성능 | 없음 | 99.9% |

**설치 내용**

- SUR-1800P 14대 + SUR-2400P 14대 (합계 28대, 총 67.2kW)
- 스마트 존 제어: 배식구역·식사구역 2개 구역 분리 운전
- 공사 기간: 방학 중 10일 완료

**사용 후 반응**

학교 측은 "바람이 없어 음식이 식지 않고, 조용해서 좋다"는 반응을 전했습니다. 에너지 절감율은 1년 사용 후 측정 결과 51.7%로 확인되었습니다.`,
    published_at: '2025-01-10',
    author: '시공팀',
    tags: ['학교 시공', '급식실', '에너지 절감', '초등학교'],
  },
  'post-004': {
    id: 'post-004',
    title: '신제품 출시: SUR-4K 방폭 패널히터 국방 특화 모델',
    category: '제품 소식',
    summary: '군사 시설·위험물 취급 장소에 특화된 방폭 인증 패널히터 SUR-4K를 출시했습니다.',
    content: `**SUR-4K 방폭 패널히터 출시**

(주)썬레이텍이 국방·위험물 취급 시설에 최적화된 신제품 SUR-4K 방폭 패널히터를 정식 출시했습니다.

**핵심 스펙**

| 항목 | 사양 |
|------|------|
| 정격 출력 | 4,000W (4kW) |
| 방폭 인증 | EX emb II T1 (한국가스안전공사 KGS) |
| 방진·방수 | IP65 (KTR 시험성적서) |
| 크기 | 1,800×600×60mm |
| 전원 | 220V 단상 |

**방폭 인증의 의미**

EX emb II T1 인증은 가연성 가스 또는 증기가 존재할 수 있는 Zone 1·Zone 2 방폭 지역에 설치 가능한 최고 등급 인증입니다. 화학공장·도장공장·주유소·군용 연료 보관소 등에 적용 가능합니다.

**기존 모델 대비 개선점**

- 발열 효율 15% 향상 (동일 소비전력 대비)
- 인클로저 두께 강화로 내충격성 30% 개선
- 스마트 온도 센서 기본 내장

2024년 12월부터 납품 가능하며, 방폭 지역 적용 시 현장 안전관리자와 협의 후 도입을 권장합니다.`,
    published_at: '2024-12-05',
    author: '제품개발팀',
    tags: ['방폭 패널히터', 'SUR-4K', '국방', '신제품'],
  },
  'post-005': {
    id: 'post-005',
    title: '대형 물류센터 고천장 난방 솔루션 가이드',
    category: '기술 정보',
    summary: '천장 높이 8~12m 물류창고에서 복사난방이 효과적인 이유와 최적 설치 방법을 정리했습니다.',
    content: `**물류센터 난방의 핵심 과제**

대형 물류센터는 천장고 8~12m, 수시 개방되는 하역 도어, 야간 무인 구역 등 일반 건물과 다른 조건을 갖습니다. 기존 온풍기 방식은 고천장에서 열이 상부에 집중되어 작업자 높이(지상 2m 이하)까지 도달하는 효율이 크게 떨어집니다.

**복사난방의 고천장 장점**

| 비교 항목 | 온풍기(대류) | 복사난방(썬레이텍) |
|---------|-----------|----------------|
| 작업자 체감 온도 | 낮음 (열 상부 집중) | 높음 (직접 복사) |
| 난방 효율(고천장) | 40~60% | 85~92% |
| 하역 도어 개방 시 손실 | 매우 큼 | 작음 |
| 구역별 제어 | 어려움 | 쉬움 |

**추천 설치 구성**

- 천장고 8m 이하: SUR-3600P 권장, 8×8m 격자 배치
- 천장고 8~12m: SUR-3600P 또는 고출력 특주 모델 검토
- 구역별 존 컨트롤러로 야간 무인 구역 자동 절전 운전

**ROI 사례 — 경기 화성 물류센터 (5,000㎡)**

온풍기 대비 연간 난방비 38% 절감. 초기 투자비 회수 기간 3.2년 (에너지 절감 + 유지관리비 절감 포함).`,
    published_at: '2024-11-18',
    author: '기술연구소',
    tags: ['물류센터', '고천장 난방', '에너지 절감', '복사난방'],
  },
  'post-006': {
    id: 'post-006',
    title: '육군 GOP 경계초소 12개 사단 납품 완료',
    category: '보도자료',
    summary: '지상작전사령부 수요자 제안형 혁신제품으로 선정된 경계초소용 복사난방 시스템이 전방 12개 사단에 납품 완료되었습니다.',
    content: `**납품 완료 발표**

(주)썬레이텍의 경계초소용 원적외선 복사난방 시스템이 육군 전방 12개 사단 GOP 경계초소에 모두 납품·설치 완료되었습니다.

**사업 개요**

- 사업명: 수요자 제안형 혁신제품 시범 도입 사업
- 수요기관: 육군 지상작전사령부
- 납품 규모: 12개 사단 × 다수 초소 (세부 수량 미공개)
- 혁신제품 지정: 조달청 혁신시제품 (2020년 지정)

**도입 배경**

GOP 경계초소는 영하 20도 이하의 혹한 환경에서 소수의 장병이 장시간 근무합니다. 기존 전기 온풍기 방식은 국지 난방 효율이 낮고, 소음으로 경계 집중도가 저하되는 문제가 있었습니다.

**사용 결과**

사업 완료 후 수요자 만족도 조사에서 96점을 기록했습니다. 장병들은 "바람 소음이 없어 경계에 집중할 수 있고, 발이 따뜻하다"는 반응을 보였습니다.

추가 사단 확대 납품이 검토 중이며, 해군·공군 시설로의 적용도 협의 중입니다.`,
    published_at: '2024-10-30',
    author: '영업팀',
    tags: ['국방', '군납', '혁신제품', '경계초소'],
  },
};

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

function renderContent(content: string) {
  return content.split('\n\n').map((block, i) => {
    if (block.startsWith('**') && block.endsWith('**') && !block.includes('\n')) {
      return <h3 key={i} style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--navy)', margin: '24px 0 10px' }}>{block.slice(2, -2)}</h3>;
    }
    if (block.startsWith('| ')) {
      const rows = block.split('\n').filter(r => !r.match(/^[|-]+$/));
      return (
        <div key={i} style={{ overflowX: 'auto', margin: '16px 0' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} style={{ background: ri === 0 ? '#F1F5F9' : 'transparent' }}>
                  {row.split('|').filter(Boolean).map((cell, ci) => (
                    <td key={ci} style={{ padding: '8px 12px', border: '1px solid #E2E8F0', fontWeight: ri === 0 ? 700 : 400 }}>
                      {cell.trim()}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    const parts = block.split(/\*\*(.+?)\*\*/g);
    return (
      <p key={i} style={{ fontSize: '0.95rem', lineHeight: 1.9, color: '#374151', marginBottom: '8px' }}>
        {parts.map((part, pi) => pi % 2 === 0 ? part : <strong key={pi}>{part}</strong>)}
      </p>
    );
  });
}

export default function NewsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchPost() {
      if (!supabase) {
        setPost(STATIC_POSTS[id!] ?? null);
        setLoading(false);
        return;
      }
      const { data } = await supabase.from('posts').select('*').eq('id', id).eq('is_published', true).single();
      if (data) setPost(data as Post);
      else setPost(STATIC_POSTS[id!] ?? null);
      setLoading(false);
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return <main style={{ minHeight: '100vh', background: '#F8FAFC' }}><div style={{ textAlign: 'center', padding: '120px 0', color: '#9CA3AF' }}>불러오는 중...</div></main>;
  }

  if (!post) {
    return (
      <main style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📝</div>
          <h2 style={{ color: 'var(--navy)', marginBottom: '8px' }}>게시물을 찾을 수 없습니다</h2>
          <Link to="/news" style={{ color: 'var(--red)', fontWeight: 700 }}>← 뉴스 목록으로</Link>
        </div>
      </main>
    );
  }

  const color = CATEGORY_COLOR[post.category] || '#6B7280';

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <PageSEO
        title={post.title}
        description={post.summary}
        keywords={post.tags ?? [post.category, '썬레이텍', '복사난방']}
        canonical={`/news/${post.id}`}
        ogType="article"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        headline: post.title,
        description: post.summary,
        datePublished: post.published_at,
        author: { '@type': 'Organization', name: post.author ?? '썬레이텍' },
        publisher: { '@type': 'Organization', name: '(주)썬레이텍', url: 'https://sunraytec.co.kr' },
        keywords: (post.tags ?? []).join(', '),
      }) }} />
      <SubHero
        breadcrumb={[{ label: '뉴스·블로그', to: '/news' }, { label: post.category }]}
        badge={post.category}
        title={post.title}
        lead={post.summary}
        keywords={post.tags ?? []}
      />

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <div style={{ maxWidth: '760px', margin: '0 auto' }}>

            {/* 메타 정보 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', flexWrap: 'wrap' }}>
              <span style={{
                padding: '4px 12px', borderRadius: '6px',
                background: `${color}18`, color, fontSize: '12px', fontWeight: 700,
              }}>
                {post.category}
              </span>
              <span style={{ fontSize: '13px', color: '#9CA3AF' }}>{formatDate(post.published_at)}</span>
              {post.author && <span style={{ fontSize: '13px', color: '#9CA3AF' }}>· {post.author}</span>}
            </div>

            {/* 대표 이미지 */}
            {post.thumbnail_url && (
              <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '32px' }}>
                <img src={post.thumbnail_url} alt={post.title} style={{ width: '100%', objectFit: 'cover', maxHeight: '400px' }} />
              </div>
            )}

            {/* 본문 */}
            <div style={{ background: '#fff', borderRadius: '16px', padding: '36px', border: '1px solid #E5E7EB', marginBottom: '32px' }}>
              {renderContent(post.content || post.summary)}
            </div>

            {/* 태그 */}
            {post.tags && post.tags.length > 0 && (
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '32px' }}>
                {post.tags.map(tag => (
                  <span key={tag} style={{
                    padding: '4px 10px', borderRadius: '999px',
                    background: '#F1F5F9', color: '#64748B', fontSize: '12px', fontWeight: 600,
                  }}>
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* 네비게이션 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '24px', borderTop: '1px solid #E5E7EB' }}>
              <Link to="/news" style={{ color: '#6B7280', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
                ← 목록으로 돌아가기
              </Link>
              <Link to="/contact" style={{
                padding: '8px 20px', borderRadius: '8px',
                background: 'var(--red)', color: '#fff', fontWeight: 700, fontSize: '14px', textDecoration: 'none',
              }}>
                견적 문의 →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
