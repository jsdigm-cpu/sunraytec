import { useState, useEffect } from 'react';
import type React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';

interface CaseDetail {
  id: string;
  title: string;
  category: string;
  location: string;
  image_url: string;
  images: string[];
  summary?: string;
  description?: string;
  installed_at?: string;
  created_at: string;
}

const CATEGORY_COLOR: Record<string, string> = {
  '교육 및 공공 복지':    '#60A5FA',
  '국방 및 특수 시설':    '#EF4444',
  '산업 및 물류 거점':    '#F59E0B',
  '스마트 시티 솔루션':   '#34D399',
  '주거 및 라이프 스타일':'#F472B6',
  '상업 및 서비스 공간':  '#A78BFA',
};

const fadeIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45 } } };

export default function CaseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<CaseDetail | null>(null);
  const [siblings, setSiblings] = useState<{ prev: CaseDetail | null; next: CaseDetail | null }>({ prev: null, next: null });
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!supabase || !id) return;
    async function load() {
      setLoading(true);
      const { data } = await supabase!
        .from('case_studies')
        .select('*')
        .eq('id', id)
        .single();
      if (!data) { navigate('/cases'); return; }
      setItem(data as CaseDetail);
      setActiveImg(0);

      // 이전글/다음글: created_at 기준
      const [{ data: prevData }, { data: nextData }] = await Promise.all([
        supabase!.from('case_studies').select('id,title,category').lt('created_at', data.created_at).order('created_at', { ascending: false }).limit(1).single(),
        supabase!.from('case_studies').select('id,title,category').gt('created_at', data.created_at).order('created_at', { ascending: true }).limit(1).single(),
      ]);
      setSiblings({ prev: prevData as CaseDetail | null, next: nextData as CaseDetail | null });
      setLoading(false);
    }
    load();
  }, [id, navigate]);

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: 32, height: 32, border: '3px solid #E5E7EB', borderTopColor: '#0F2241', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (!item) return null;

  const allImages = [item.image_url, ...(item.images ?? [])].filter(Boolean);
  const catColor = CATEGORY_COLOR[item.category] || '#6B7280';

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* 서브 헤더 */}
      <section style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #152035 60%, #0E1E3A 100%)', padding: '40px 0 48px' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'rgba(255,255,255,0.45)', marginBottom: '16px' }}>
            <Link to="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>홈</Link>
            <span>›</span>
            <Link to="/cases" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>시공사례</Link>
            <span>›</span>
            <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{item.title}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, background: catColor, color: ['스마트 시티 솔루션','주거 및 라이프 스타일'].includes(item.category) ? '#1F2937' : '#fff', padding: '3px 10px', borderRadius: '999px' }}>
              {item.category}
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{item.title}</h1>
          <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.5)' }}>
            📍 {item.location}
            {item.installed_at && <span style={{ marginLeft: '16px' }}>🗓️ {item.installed_at.slice(0, 7).replace('-', '년 ') + '월'}</span>}
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '40px 20px 80px' }}>
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>

          {/* 메인 이미지 + 썸네일 */}
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 16px rgba(0,0,0,0.08)', marginBottom: '24px' }}>
            {/* 메인 이미지 */}
            <div
              style={{ position: 'relative', height: 'clamp(260px, 50vw, 520px)', background: '#0F2241', cursor: allImages.length > 1 ? 'zoom-in' : 'default', overflow: 'hidden' }}
              onClick={() => allImages.length > 0 && setLightbox(activeImg)}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImg}
                  src={allImages[activeImg]}
                  alt={item.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </AnimatePresence>
              {allImages.length > 1 && (
                <>
                  <button onClick={(e) => { e.stopPropagation(); setActiveImg((p) => (p - 1 + allImages.length) % allImages.length); }}
                    style={arrowBtn('left')}>‹</button>
                  <button onClick={(e) => { e.stopPropagation(); setActiveImg((p) => (p + 1) % allImages.length); }}
                    style={arrowBtn('right')}>›</button>
                  <div style={{ position: 'absolute', bottom: '12px', right: '14px', background: 'rgba(0,0,0,0.55)', color: '#fff', fontSize: '12px', padding: '3px 10px', borderRadius: '999px' }}>
                    {activeImg + 1} / {allImages.length}
                  </div>
                </>
              )}
            </div>

            {/* 썸네일 스트립 */}
            {allImages.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', overflowX: 'auto', background: '#F9FAFB' }}>
                {allImages.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    style={{
                      flexShrink: 0, width: '72px', height: '52px', borderRadius: '8px', overflow: 'hidden', padding: 0, border: `2px solid ${i === activeImg ? 'var(--navy)' : 'transparent'}`, cursor: 'pointer', background: 'none',
                    }}
                  >
                    <img src={src} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 본문 설명 */}
          <div style={{ background: '#fff', borderRadius: '16px', padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, color: '#374151', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E5E7EB' }}>
              시공 내용
            </h2>
            {item.summary && (
              <p style={{ fontSize: '0.95rem', color: '#4B5563', marginBottom: '14px', fontWeight: 600 }}>{item.summary}</p>
            )}
            {item.description ? (
              <div style={{ fontSize: '0.9rem', color: '#6B7280', lineHeight: 1.9, whiteSpace: 'pre-line' }}>
                {item.description}
              </div>
            ) : (
              <p style={{ fontSize: '0.88rem', color: '#9CA3AF', fontStyle: 'italic' }}>상세 내용이 준비 중입니다.</p>
            )}
          </div>

          {/* 이전글/다음글 + 목록 */}
          <div style={{ background: '#fff', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
            {siblings.prev && (
              <Link to={`/cases/${siblings.prev.id}`} style={siblingRow}>
                <span style={{ fontSize: '11px', color: '#9CA3AF', minWidth: '36px' }}>◀ 이전</span>
                <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500, flex: 1 }}>{siblings.prev.title}</span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{siblings.prev.category}</span>
              </Link>
            )}
            {siblings.prev && siblings.next && <div style={{ borderTop: '1px solid #F3F4F6' }} />}
            {siblings.next && (
              <Link to={`/cases/${siblings.next.id}`} style={siblingRow}>
                <span style={{ fontSize: '11px', color: '#9CA3AF', minWidth: '36px' }}>다음 ▶</span>
                <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: 500, flex: 1 }}>{siblings.next.title}</span>
                <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{siblings.next.category}</span>
              </Link>
            )}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/cases" style={{ display: 'inline-block', padding: '11px 32px', borderRadius: '8px', border: '2px solid var(--navy)', color: 'var(--navy)', fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none' }}>
              ← 목록으로
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 라이트박스 */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img
              src={allImages[lightbox]}
              alt=""
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: '92vw', maxHeight: '88vh', objectFit: 'contain', borderRadius: '8px' }}
            />
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', color: '#fff', fontSize: '2rem', cursor: 'pointer' }}>✕</button>
            {allImages.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! - 1 + allImages.length) % allImages.length); }} style={{ ...arrowBtn('left'), position: 'fixed' }}>‹</button>
                <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! + 1) % allImages.length); }} style={{ ...arrowBtn('right'), position: 'fixed' }}>›</button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function arrowBtn(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute', top: '50%', [side]: '12px', transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.45)', color: '#fff', border: 'none', borderRadius: '50%',
    width: '40px', height: '40px', fontSize: '1.4rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
  };
}

const siblingRow: React.CSSProperties = {
  display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', textDecoration: 'none', transition: 'background 0.15s',
};
