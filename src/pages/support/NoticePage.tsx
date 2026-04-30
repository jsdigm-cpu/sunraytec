import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SubHero from '../../components/layout/SubHero';
import { supabase } from '../../lib/supabase';
import type { Notice } from '../../types/notice';
import { NOTICE_TONE_STYLE } from '../../types/notice';

const FALLBACK: Notice[] = [
  { id: 'f1', category: '제품', tone: 'red', pinned: true, published: true,
    title: '복사난방 원리 페이지 신설',
    body: '제품 도입 전 검토에 도움이 되도록 복사난방 작동 원리·복사 vs 대류 비교·적용 분야를 정리한 페이지를 새로 열었습니다.',
    created_at: '2026-04-28', updated_at: '2026-04-28' },
  { id: 'f2', category: '자료실', tone: 'navy', pinned: false, published: true,
    title: '카탈로그·자료실 다운로드 운영 시작',
    body: '관리자 자료실에서 등록된 자료가 즉시 다운로드되도록 연동을 마쳤습니다.',
    created_at: '2026-04-27', updated_at: '2026-04-27' },
  { id: 'f3', category: '조달', tone: 'red', pinned: false, published: true,
    title: '2025 조달청 우수제품 3차 지정 안내',
    body: '복사난방 분야 단독으로 세 번째 우수제품 지정. 공공기관 수의계약 자격이 갱신되었습니다.',
    created_at: '2026-04-20', updated_at: '2026-04-20' },
  { id: 'f4', category: '공지', tone: 'gray', pinned: false, published: true,
    title: '리뉴얼 사이트 공식 오픈',
    body: '통합 리뉴얼 사이트를 공개했습니다. 미반영 자료는 순차 업데이트됩니다.',
    created_at: '2026-04-12', updated_at: '2026-04-12' },
];

const PAGE_SIZE = 10;

export default function NoticePage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!supabase) {
      setNotices(FALLBACK);
      setTotal(FALLBACK.length);
      setLoading(false);
      return;
    }
    setLoading(true);
    const from = (page - 1) * PAGE_SIZE;
    supabase
      .from('notices')
      .select('*', { count: 'exact' })
      .eq('published', true)
      .order('pinned', { ascending: false })
      .order('created_at', { ascending: false })
      .range(from, from + PAGE_SIZE - 1)
      .then(({ data, count, error }) => {
        if (error || !data) { setNotices(FALLBACK); setTotal(FALLBACK.length); }
        else { setNotices(data as Notice[]); setTotal(count ?? 0); }
        setLoading(false);
      });
  }, [page]);

  const totalPages = Math.ceil(total / PAGE_SIZE);

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
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>불러오는 중…</div>
          ) : (
            <div style={{ display: 'grid', gap: 10 }}>
              {notices.map((n, idx) => {
                const tone = NOTICE_TONE_STYLE[n.tone];
                const num = total - ((page - 1) * PAGE_SIZE) - idx;
                return (
                  <Link
                    key={n.id}
                    to={`/support/notice/${n.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <article
                      style={{
                        background: '#fff',
                        border: n.pinned ? '1.5px solid var(--red)' : '1px solid #E5E7EB',
                        borderRadius: 12,
                        padding: '18px 22px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 16,
                        cursor: 'pointer',
                        transition: 'box-shadow 0.15s',
                        boxShadow: n.pinned ? '0 4px 16px rgba(200,57,43,0.08)' : 'none',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 4px 16px rgba(15,34,65,0.10)')}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = n.pinned ? '0 4px 16px rgba(200,57,43,0.08)' : 'none')}
                    >
                      {/* 번호 */}
                      <span style={{ width: 36, textAlign: 'center', fontSize: 13, fontWeight: 700, color: n.pinned ? 'var(--red)' : '#94A3B8', flexShrink: 0 }}>
                        {n.pinned ? '📌' : num}
                      </span>

                      {/* 카테고리 배지 */}
                      <span style={{ display: 'inline-block', padding: '3px 10px', background: tone.bg, color: tone.color, borderRadius: 999, fontSize: 11, fontWeight: 900, letterSpacing: 0.5, flexShrink: 0 }}>
                        {n.category}
                      </span>

                      {/* 제목 */}
                      <span style={{ flex: 1, color: 'var(--navy)', fontSize: '0.95rem', fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {n.title}
                      </span>

                      {/* 날짜 */}
                      <span style={{ color: '#94A3B8', fontSize: 12, flexShrink: 0 }}>
                        {n.created_at.slice(0, 10)}
                      </span>

                      {/* 화살표 */}
                      <span style={{ color: '#CBD5E1', fontSize: 14, flexShrink: 0 }}>›</span>
                    </article>
                  </Link>
                );
              })}
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 32 }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    border: p === page ? 'none' : '1px solid #E5E7EB',
                    background: p === page ? 'var(--navy)' : '#fff',
                    color: p === page ? '#fff' : '#374151',
                    fontWeight: 700, fontSize: 14, cursor: 'pointer',
                  }}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
