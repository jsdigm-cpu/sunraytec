import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import SubHero from '../../components/layout/SubHero';
import PageSEO from '../../components/seo/PageSEO';
import { supabase } from '../../lib/supabase';
import type { Notice } from '../../types/notice';
import { NOTICE_TONE_STYLE } from '../../types/notice';

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [prev, setPrev] = useState<Pick<Notice, 'id' | 'title'> | null>(null);
  const [next, setNext] = useState<Pick<Notice, 'id' | 'title'> | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    if (!supabase) { setLoading(false); return; }

    supabase
      .from('notices')
      .select('*')
      .eq('id', id)
      .eq('published', true)
      .single()
      .then(async ({ data, error }) => {
        if (error || !data) { navigate('/support/notice', { replace: true }); return; }
        setNotice(data as Notice);

        // 이전·다음 공지 조회
        const [{ data: prevData }, { data: nextData }] = await Promise.all([
          supabase!
            .from('notices')
            .select('id, title')
            .eq('published', true)
            .lt('created_at', data.created_at)
            .order('created_at', { ascending: false })
            .limit(1),
          supabase!
            .from('notices')
            .select('id, title')
            .eq('published', true)
            .gt('created_at', data.created_at)
            .order('created_at', { ascending: true })
            .limit(1),
        ]);
        setPrev(prevData?.[0] ?? null);
        setNext(nextData?.[0] ?? null);
        setLoading(false);
      });
  }, [id, navigate]);

  if (loading) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, border: '3px solid #E5E7EB', borderTopColor: '#0F2241', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </main>
    );
  }

  if (!notice) return null;

  const tone = NOTICE_TONE_STYLE[notice.tone];

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <PageSEO
        title={`${notice.title} - 썬레이텍 공지사항`}
        description={notice.body.slice(0, 120)}
        keywords={['썬레이텍 공지', notice.category]}
        canonical={`/support/notice/${notice.id}`}
      />
      <SubHero
        breadcrumb={[{ label: '고객센터' }, { label: '공지사항', to: '/support/notice' }, { label: notice.title }]}
        badge="Notice"
        title={notice.title}
        keywords={[notice.category, notice.created_at.slice(0, 10), notice.pinned ? '📌 고정 공지' : ''].filter(Boolean)}
      />

      <section style={{ padding: '52px 0 80px' }}>
        <div className="container" style={{ maxWidth: 780 }}>
          <motion.article
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '36px 40px' }}
          >
            {/* 헤더 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
              {notice.pinned && (
                <span style={{ padding: '4px 12px', background: 'var(--red)', color: '#fff', borderRadius: 999, fontSize: 11, fontWeight: 900 }}>
                  📌 고정
                </span>
              )}
              <span style={{ padding: '4px 12px', background: tone.bg, color: tone.color, borderRadius: 999, fontSize: 11, fontWeight: 900 }}>
                {notice.category}
              </span>
              <span style={{ marginLeft: 'auto', color: '#94A3B8', fontSize: 13 }}>
                {notice.created_at.slice(0, 10)}
              </span>
            </div>

            <h1 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--navy)', marginBottom: 24, lineHeight: 1.4 }}>
              {notice.title}
            </h1>

            <div
              style={{
                color: '#374151',
                lineHeight: 1.9,
                fontSize: '0.97rem',
                whiteSpace: 'pre-wrap',
                borderTop: '1px solid #F1F5F9',
                paddingTop: 24,
              }}
            >
              {notice.body}
            </div>
          </motion.article>

          {/* 이전 / 다음 네비게이션 */}
          <div style={{ marginTop: 16, display: 'grid', gap: 8 }}>
            {next && (
              <Link to={`/support/notice/${next.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ChevronLeft size={16} color="#94A3B8" />
                  <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, minWidth: 28 }}>다음</span>
                  <span style={{ color: '#374151', fontSize: '0.9rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{next.title}</span>
                </div>
              </Link>
            )}
            {prev && (
              <Link to={`/support/notice/${prev.id}`} style={{ textDecoration: 'none' }}>
                <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 10, padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <ChevronRight size={16} color="#94A3B8" />
                  <span style={{ fontSize: 12, color: '#94A3B8', fontWeight: 700, minWidth: 28 }}>이전</span>
                  <span style={{ color: '#374151', fontSize: '0.9rem', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{prev.title}</span>
                </div>
              </Link>
            )}
          </div>

          {/* 목록으로 */}
          <div style={{ marginTop: 24, textAlign: 'center' }}>
            <Link
              to="/support/notice"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '10px 24px', border: '1px solid #D1D5DB', borderRadius: 8, color: '#374151', fontWeight: 700, fontSize: '0.875rem', textDecoration: 'none' }}
            >
              목록으로
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
