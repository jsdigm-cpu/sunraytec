import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SubHero from '../../components/layout/SubHero';
import PageSEO from '../../components/seo/PageSEO';
import { supabase } from '../../lib/supabase';

interface Post {
  id: string;
  title: string;
  category: string;
  summary: string;
  content?: string;
  thumbnail_url?: string;
  published_at: string;
  is_published: boolean;
  author?: string;
  tags?: string[];
}

const CATEGORIES = ['전체', '보도자료', '기술 정보', '시공기', '제품 소식'];

const CATEGORY_COLOR: Record<string, string> = {
  '보도자료':  '#3B82F6',
  '기술 정보': '#10B981',
  '시공기':    '#F59E0B',
  '제품 소식': '#EF4444',
};

const STATIC_POSTS: Post[] = [
  {
    id: 'post-001',
    title: '썬레이텍, 2025년 조달청 우수제품 3회 지정 달성',
    category: '보도자료',
    summary: '2013년, 2019년에 이어 2025년 세 번째 조달청 우수제품으로 지정되었습니다. 복사난방 분야에서 유일하게 3회 지정된 제품으로, 공공기관 납품 경쟁력을 한층 강화했습니다.',
    published_at: '2025-03-15',
    is_published: true,
    author: '썬레이텍 홍보팀',
  },
  {
    id: 'post-002',
    title: '복사난방 vs 대류난방 — 에너지 효율 비교 분석',
    category: '기술 정보',
    summary: 'KTR 공인 시험 결과를 바탕으로 원적외선 복사난방과 기존 대류난방(온풍기·FCU)의 에너지 소비량, 쾌적성, 설치 비용을 실증 데이터로 비교합니다.',
    published_at: '2025-02-20',
    is_published: true,
    author: '기술연구소',
  },
  {
    id: 'post-003',
    title: '경기도 초등학교 급식실 복사난방 시공기',
    category: '시공기',
    summary: '600㎡ 규모의 초등학교 급식실에 원적외선 복사난방 패널 28대를 설치한 과정을 상세히 기록했습니다. 기존 에어컨 냉난방 대비 50% 이상 에너지 절감 효과를 확인했습니다.',
    published_at: '2025-01-10',
    is_published: true,
    author: '시공팀',
  },
  {
    id: 'post-004',
    title: '신제품 출시: SUR-4K 방폭 패널히터 국방 특화 모델',
    category: '제품 소식',
    summary: '군사 시설·위험물 취급 장소에 특화된 방폭 인증 패널히터 SUR-4K를 출시했습니다. EX emb II T1 국제 방폭 인증을 획득, 기존 모델 대비 발열 효율 15% 향상.',
    published_at: '2024-12-05',
    is_published: true,
    author: '제품개발팀',
  },
  {
    id: 'post-005',
    title: '대형 물류센터 고천장 난방 솔루션 가이드',
    category: '기술 정보',
    summary: '천장 높이 8~12m 물류창고에서 복사난방이 효과적인 이유와 최적 설치 방법을 정리했습니다. 구역별 제어 시스템으로 야간 빈 구역 운용 비용을 최소화하는 방법도 소개합니다.',
    published_at: '2024-11-18',
    is_published: true,
    author: '기술연구소',
  },
  {
    id: 'post-006',
    title: '육군 GOP 경계초소 12개 사단 납품 완료',
    category: '보도자료',
    summary: '지상작전사령부 수요자 제안형 혁신제품으로 선정된 경계초소용 복사난방 시스템이 전방 12개 사단에 납품 완료되었습니다. 사용자 만족도 96점으로 추가 확대 납품이 논의 중입니다.',
    published_at: '2024-10-30',
    is_published: true,
    author: '영업팀',
  },
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

export default function NewsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || '전체';

  useEffect(() => {
    async function fetchPosts() {
      if (!supabase) { setPosts(STATIC_POSTS); setLoading(false); return; }
      const { data } = await supabase
        .from('posts')
        .select('id,title,category,summary,thumbnail_url,published_at,author,tags')
        .eq('is_published', true)
        .order('published_at', { ascending: false });
      if (data && data.length > 0) setPosts(data as Post[]);
      else setPosts(STATIC_POSTS);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const filtered = activeCategory === '전체'
    ? posts
    : posts.filter(p => p.category === activeCategory);

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <PageSEO
        title="뉴스·블로그 - 복사난방 기술 정보 & 시공 사례"
        description="썬레이텍의 최신 소식, 복사난방 기술 정보, 시공기, 제품 업데이트를 한 곳에서 확인하세요. 공공기관·산업·국방 현장의 실증 사례도 함께 제공됩니다."
        keywords={['복사난방 뉴스', '기술 정보', '시공 사례', '제품 소식', '보도자료', '원적외선 난방']}
        canonical="/news"
      />
      <SubHero
        breadcrumb={[{ label: '뉴스·블로그' }]}
        badge="News & Blog"
        title="뉴스·블로그"
        lead="복사난방 기술 정보, 시공 사례, 제품 소식을 전합니다."
        keywords={['보도자료', '기술 정보', '시공기', '제품 소식']}
      />

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">

          {/* 카테고리 탭 */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '32px', flexWrap: 'wrap' }}>
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat;
              const color = CATEGORY_COLOR[cat] || 'var(--navy)';
              return (
                <button
                  key={cat}
                  onClick={() => cat === '전체' ? setSearchParams({}) : setSearchParams({ category: cat })}
                  style={{
                    padding: '6px 16px', borderRadius: '999px',
                    border: `2px solid ${isActive ? color : '#E5E7EB'}`,
                    background: isActive ? color : '#fff',
                    color: isActive ? '#fff' : '#6B7280',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.825rem', cursor: 'pointer', transition: 'all 0.2s',
                  }}
                >
                  {cat}
                  {cat !== '전체' && (
                    <span style={{ marginLeft: '4px', fontSize: '0.75rem', opacity: 0.7 }}>
                      {posts.filter(p => p.category === cat).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>불러오는 중...</div>
          )}

          {/* 첫 번째 포스트 강조 */}
          {!loading && filtered.length > 0 && (
            <>
              <Link to={`/news/${filtered[0].id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: '24px' }}>
                <div style={{
                  background: '#fff', borderRadius: '16px', overflow: 'hidden',
                  border: '1px solid #E5E7EB', boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
                  display: 'grid', gridTemplateColumns: '1fr 1fr',
                  transition: 'box-shadow 0.2s',
                }} className="news-featured">
                  <div style={{
                    height: '300px', overflow: 'hidden',
                    background: `linear-gradient(135deg, ${CATEGORY_COLOR[filtered[0].category] || '#3B82F6'}22 0%, ${CATEGORY_COLOR[filtered[0].category] || '#3B82F6'}44 100%)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '5rem',
                  }}>
                    {filtered[0].thumbnail_url ? (
                      <img src={filtered[0].thumbnail_url} alt={filtered[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                    ) : (
                      <span style={{ opacity: 0.5 }}>
                        {filtered[0].category === '보도자료' ? '📰' : filtered[0].category === '기술 정보' ? '🔬' : filtered[0].category === '시공기' ? '🔧' : '📦'}
                      </span>
                    )}
                  </div>
                  <div style={{ padding: '36px 32px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{
                      display: 'inline-block', padding: '3px 12px', borderRadius: '999px',
                      background: `${CATEGORY_COLOR[filtered[0].category] || '#3B82F6'}20`,
                      color: CATEGORY_COLOR[filtered[0].category] || '#3B82F6',
                      fontSize: '11px', fontWeight: 700, marginBottom: '14px',
                    }}>
                      {filtered[0].category}
                    </span>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.4, marginBottom: '12px' }}>
                      {filtered[0].title}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: '#6B7280', lineHeight: 1.7, marginBottom: '16px' }}>
                      {filtered[0].summary}
                    </p>
                    <div style={{ fontSize: '12px', color: '#9CA3AF' }}>
                      {formatDate(filtered[0].published_at)} {filtered[0].author && `· ${filtered[0].author}`}
                    </div>
                  </div>
                </div>
              </Link>

              {/* 나머지 포스트 그리드 */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }} className="news-grid">
                {filtered.slice(1).map(post => {
                  const color = CATEGORY_COLOR[post.category] || '#6B7280';
                  return (
                    <Link key={post.id} to={`/news/${post.id}`} style={{ textDecoration: 'none' }}>
                      <article style={{
                        background: '#fff', borderRadius: '12px', overflow: 'hidden',
                        border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                        height: '100%', display: 'flex', flexDirection: 'column',
                        transition: 'box-shadow 0.2s, transform 0.2s',
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
                        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                        (e.currentTarget as HTMLElement).style.transform = '';
                      }}>
                        <div style={{
                          height: '160px',
                          background: `linear-gradient(135deg, ${color}22 0%, ${color}44 100%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem',
                        }}>
                          {post.thumbnail_url ? (
                            <img src={post.thumbnail_url} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
                          ) : (
                            <span style={{ opacity: 0.5 }}>
                              {post.category === '보도자료' ? '📰' : post.category === '기술 정보' ? '🔬' : post.category === '시공기' ? '🔧' : '📦'}
                            </span>
                          )}
                        </div>
                        <div style={{ padding: '16px 18px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                          <span style={{
                            display: 'inline-block', padding: '2px 8px', borderRadius: '4px',
                            background: `${color}18`, color, fontSize: '10px', fontWeight: 700, marginBottom: '8px',
                          }}>
                            {post.category}
                          </span>
                          <h3 style={{ fontSize: '0.88rem', fontWeight: 800, color: '#1F2937', lineHeight: 1.45, marginBottom: '8px', flex: 1 }}>
                            {post.title}
                          </h3>
                          <div style={{ fontSize: '11px', color: '#9CA3AF' }}>
                            {formatDate(post.published_at)}
                          </div>
                        </div>
                      </article>
                    </Link>
                  );
                })}
              </div>
            </>
          )}

          {filtered.length === 0 && !loading && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: '#9CA3AF' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📝</div>
              <p>해당 카테고리의 게시물을 준비 중입니다.</p>
            </div>
          )}
        </div>
      </section>

      <style>{`
        .news-grid { grid-template-columns: repeat(3, 1fr); }
        .news-featured { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) {
          .news-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .news-featured { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .news-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </main>
  );
}
