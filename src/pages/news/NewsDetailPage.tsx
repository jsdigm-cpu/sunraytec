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
