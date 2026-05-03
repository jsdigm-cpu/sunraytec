import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

interface PostSummary {
  id: string;
  title: string;
  category: string;
  summary: string;
  published_at: string;
  author?: string;
}

const CATEGORY_COLOR: Record<string, string> = {
  '보도자료':  '#3B82F6',
  '기술 정보': '#10B981',
  '시공기':    '#F59E0B',
  '제품 소식': '#EF4444',
};

const STATIC: PostSummary[] = [
  { id: 'post-001', title: '썬레이텍, 2025년 조달청 우수제품 3회 지정 달성', category: '보도자료', summary: '2013·2019년에 이어 2025년 세 번째 조달청 우수제품으로 지정되었습니다.', published_at: '2025-03-15', author: '썬레이텍 홍보팀' },
  { id: 'post-002', title: '복사난방 vs 대류난방 — 에너지 효율 비교 분석', category: '기술 정보', summary: 'KTR 공인 시험 결과를 바탕으로 원적외선 복사난방과 기존 대류난방의 차이를 분석합니다.', published_at: '2025-02-20', author: '기술연구소' },
  { id: 'post-003', title: '경기도 초등학교 급식실 복사난방 시공기', category: '시공기', summary: '600㎡ 규모 급식실에 패널 28대 설치. 에너지 절감 51.7% 확인.', published_at: '2025-01-10', author: '시공팀' },
];

function formatDate(d: string) {
  const dt = new Date(d);
  return `${dt.getFullYear()}.${String(dt.getMonth() + 1).padStart(2, '0')}.${String(dt.getDate()).padStart(2, '0')}`;
}

export default function NewsSection() {
  const [posts, setPosts] = useState<PostSummary[]>(STATIC);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('posts')
      .select('id,title,category,summary,published_at,author')
      .eq('is_published', true)
      .order('published_at', { ascending: false })
      .limit(3)
      .then(({ data }) => { if (data && data.length > 0) setPosts(data as PostSummary[]); });
  }, []);

  return (
    <section style={{ background: '#F8FAFC', padding: '72px 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '36px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '10px' }}>
              News & Blog
            </p>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2 }}>
              최신 소식 · 기술 정보
            </h2>
          </div>
          <Link to="/news" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--navy)', fontWeight: 700, fontSize: '0.875rem', border: '1px solid var(--border)', borderRadius: '8px', padding: '9px 16px', background: '#fff' }}>
            전체 보기 <ArrowRight size={14} />
          </Link>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}
          className="news-home-grid"
        >
          {posts.map((post) => {
            const color = CATEGORY_COLOR[post.category] || '#6B7280';
            return (
              <motion.div key={post.id} variants={staggerItem}>
                <Link to={`/news/${post.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                  <article
                    style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '12px', padding: '22px', height: '100%', display: 'flex', flexDirection: 'column', transition: 'box-shadow 0.2s, transform 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(15,34,65,0.12)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = ''; (e.currentTarget as HTMLElement).style.transform = ''; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <span style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '999px', background: `${color}18`, color, fontSize: '11px', fontWeight: 700 }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: '12px', color: 'var(--gray)' }}>{formatDate(post.published_at)}</span>
                    </div>
                    <h3 style={{ fontSize: '0.925rem', fontWeight: 800, color: 'var(--navy)', lineHeight: 1.45, marginBottom: '10px', flex: 1 }}>
                      {post.title}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--gray)', lineHeight: 1.65, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                      {post.summary}
                    </p>
                  </article>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) { .news-home-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 520px) { .news-home-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
