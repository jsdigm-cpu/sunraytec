import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface PartnerFile {
  id: string;
  title: string;
  description: string;
  category: string;
  file_url: string;
  file_size: string;
  version: string;
  updated_at: string;
}

const CATEGORY_COLOR: Record<string, string> = {
  '가격표': '#EF4444',
  '기술자료': '#3B82F6',
  '인증서': '#10B981',
  '기타': '#6B7280',
};

export default function PartnerPortalPage() {
  const { profile, signOut } = useAuth();
  const [files, setFiles] = useState<PartnerFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('전체');

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('partner_files')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data) setFiles(data as PartnerFile[]);
        setLoading(false);
      });
  }, []);

  const categories = ['전체', ...Array.from(new Set(files.map((f) => f.category)))];
  const filtered = activeCategory === '전체' ? files : files.filter((f) => f.category === activeCategory);

  return (
    <main style={{ minHeight: '100vh', background: '#F8FAFC' }}>

      {/* 헤더 */}
      <header style={{ background: 'linear-gradient(160deg, var(--navy) 0%, #152035 100%)', padding: '0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo.png" alt="썬레이텍" style={{ height: '32px', objectFit: 'contain' }}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }} />
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px' }}>|</span>
            <span style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 700 }}>🔒 협력업체 전용 자료실</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
              {profile?.company_name} · {profile?.full_name}
            </span>
            <button
              onClick={signOut}
              style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)', color: '#fff', borderRadius: '6px', padding: '5px 12px', fontSize: '0.8rem', cursor: 'pointer' }}
            >
              로그아웃
            </button>
          </div>
        </div>
      </header>

      {/* 서브 히어로 */}
      <section style={{ background: 'linear-gradient(160deg, #0F2241 0%, #1A3A6B 100%)', padding: '40px 0 48px' }}>
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(200,57,43,0.35)', border: '1px solid rgba(200,57,43,0.6)', borderRadius: '999px', padding: '4px 14px', marginBottom: '16px' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, color: '#FCA5A5' }}>🔐 협력업체 전용</span>
            </div>
            <h1 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>파트너 전용 자료실</h1>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem' }}>
              승인된 협력업체에게만 제공되는 자료입니다. 외부 유출을 금합니다.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 파일 목록 */}
      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">

          {/* 카테고리 필터 */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '6px 16px', borderRadius: '999px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', border: 'none',
                  background: activeCategory === cat ? 'var(--navy)' : '#E5E7EB',
                  color: activeCategory === cat ? '#fff' : '#374151',
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF' }}>불러오는 중...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filtered.map((file) => (
                <motion.div
                  key={file.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px 24px', display: 'flex', alignItems: 'center', gap: '20px', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}
                >
                  {/* 아이콘 */}
                  <div style={{ flexShrink: 0, width: '48px', height: '48px', background: '#FEE2E2', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>
                    📄
                  </div>

                  {/* 내용 */}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px', fontWeight: 700, background: CATEGORY_COLOR[file.category] || '#6B7280', color: '#fff', padding: '2px 8px', borderRadius: '999px' }}>
                        {file.category}
                      </span>
                      {file.version && <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{file.version}</span>}
                    </div>
                    <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.95rem', marginBottom: '3px' }}>{file.title}</p>
                    {file.description && <p style={{ fontSize: '0.8rem', color: '#6B7280' }}>{file.description}</p>}
                  </div>

                  {/* 파일 크기 + 다운로드 */}
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    {file.file_size && <p style={{ fontSize: '0.75rem', color: '#9CA3AF', marginBottom: '8px' }}>{file.file_size}</p>}
                    <a
                      href={file.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      download
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', background: 'var(--navy)', color: '#fff', padding: '8px 18px', borderRadius: '7px', fontSize: '0.82rem', fontWeight: 700, textDecoration: 'none' }}
                    >
                      ⬇ 다운로드
                    </a>
                  </div>
                </motion.div>
              ))}

              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#9CA3AF', fontSize: '0.9rem' }}>
                  해당 카테고리의 자료가 없습니다.
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
