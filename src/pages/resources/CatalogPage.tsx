import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { FileText, Download, Lock } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import SubHero from '../../components/layout/SubHero';
import PageSEO from '../../components/seo/PageSEO';

type DocCategory = '전체' | '제품 카탈로그' | '기술 자료' | '인증서' | '파트너 자료';

interface DocItem {
  id: number | string;
  title: string;
  description: string;
  category: '제품 카탈로그' | '기술 자료' | '인증서' | '파트너 자료';
  fileSize: string;
  ready: boolean;
  fileUrl?: string;
  thumbnailUrl?: string;
}

const DOCS: DocItem[] = [
  {
    id: 1,
    title: '썬레이텍 종합 카탈로그',
    description: '전 제품 라인업, 기술 사양, 시공 사례 수록',
    category: '제품 카탈로그',
    fileSize: 'PDF · 약 8MB',
    ready: false,
  },
  {
    id: 2,
    title: '우수제품 카탈로그',
    description: '조달청 우수제품 지정 모델 상세 규격 및 조달 정보',
    category: '제품 카탈로그',
    fileSize: 'PDF · 약 4MB',
    ready: false,
  },
  {
    id: 3,
    title: 'MAS 다수공급자 카탈로그',
    description: 'MAS 계약 품목 및 단가 정보',
    category: '제품 카탈로그',
    fileSize: 'PDF · 약 3MB',
    ready: false,
  },
  {
    id: 4,
    title: '복사난방 원리 기술 설명서',
    description: '원적외선 복사난방과 대류난방 비교 분석 자료',
    category: '기술 자료',
    fileSize: 'PDF · 약 5MB',
    ready: false,
  },
  {
    id: 5,
    title: '제품 시방서 (SUR-2400 시리즈)',
    description: '설치 시방, 전기 사양, 안전 기준 포함',
    category: '기술 자료',
    fileSize: 'PDF · 약 2MB',
    ready: false,
  },
  {
    id: 6,
    title: '설치 도면 (매립형)',
    description: '매립형 설치 상세 도면 및 시공 가이드',
    category: '기술 자료',
    fileSize: 'PDF · 약 3MB',
    ready: false,
  },
  {
    id: 7,
    title: '설치 도면 (노출형)',
    description: '노출형 설치 상세 도면 및 시공 가이드',
    category: '기술 자료',
    fileSize: 'PDF · 약 3MB',
    ready: false,
  },
  {
    id: 8,
    title: '우수제품 지정서',
    description: '조달청 우수제품 지정 인증서 (2013·2019·2025)',
    category: '인증서',
    fileSize: 'PDF · 약 1MB',
    ready: false,
  },
  {
    id: 9,
    title: 'K마크 인증서',
    description: '산업통상자원부 성능 인증 (KS 기준)',
    category: '인증서',
    fileSize: 'PDF · 약 1MB',
    ready: false,
  },
  {
    id: 10,
    title: 'ISO 9001 / 14001 인증서',
    description: '품질경영·환경경영 국제 인증',
    category: '인증서',
    fileSize: 'PDF · 약 1MB',
    ready: false,
  },
];

const CATEGORIES: DocCategory[] = ['전체', '제품 카탈로그', '기술 자료', '인증서', '파트너 자료'];

const CATEGORY_COLOR: Record<string, { bg: string; text: string }> = {
  '제품 카탈로그': { bg: '#DBEAFE', text: '#1E40AF' },
  '기술 자료':     { bg: '#D1FAE5', text: '#065F46' },
  '인증서':        { bg: '#FEF3C7', text: '#92400E' },
  '파트너 자료':   { bg: '#E0E7FF', text: '#3730A3' },
};

const CATEGORY_ICON: Record<string, string> = {
  '제품 카탈로그': '📘',
  '기술 자료':     '🔧',
  '인증서':        '🏅',
  '파트너 자료':   '🔒',
};

const fadeInUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const cardVariant = {
  hidden:  { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export default function CatalogPage() {
  const [activeCategory, setActiveCategory] = useState<DocCategory>('전체');
  const [toastVisible, setToastVisible] = useState(false);
  const [docs, setDocs] = useState<DocItem[]>(DOCS);

  useEffect(() => {
    if (!supabase) return;
    supabase
      .from('resource_documents')
      .select('id,title,description,category,file_url,file_size,is_public,sort_order')
      .eq('is_public', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (!data || data.length === 0) return;
        setDocs(data.map((item) => ({
          id: item.id,
          title: item.title,
          description: item.description ?? '',
          category: item.category,
          fileSize: item.file_size || 'PDF',
          ready: Boolean(item.file_url),
          fileUrl: item.file_url ?? undefined,
          thumbnailUrl: isPreviewableImage(item.file_url) ? item.file_url : undefined,
        })));
      });
  }, []);

  const filtered = activeCategory === '전체'
    ? docs
    : docs.filter(d => d.category === activeCategory);

  const handleDownload = (doc: DocItem) => {
    if (!doc.ready || !doc.fileUrl) {
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 3000);
      return;
    }
    window.open(doc.fileUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <main style={{ minHeight: '100vh', background: '#fff' }}>
      <PageSEO
        title="카탈로그·자료 다운로드 - 썬레이텍 복사난방"
        description="썬레이텍 제품 카탈로그, 기술 자료, 인증서, 파트너 자료를 다운로드하세요. 원적외선 복사난방 패널히터 SUR 시리즈 상세 스펙 포함."
        keywords={['복사난방 카탈로그', '패널히터 시방서', '제품 인증서', '기술자료 다운로드', 'SUR 스펙']}
        canonical="/resources/catalog"
      />
      <SubHero
        breadcrumb={[{ label: '자료실' }, { label: '카탈로그·자료 다운로드' }]}
        badge="Documents & Downloads"
        title="카탈로그 · 자료 다운로드"
        lead="제품 카탈로그, 기술 자료, 인증서를 다운로드하실 수 있습니다."
        keywords={['제품 카탈로그', '기술 자료', '인증서·특허', '무료 다운로드']}
      />

      {/* ② 자료 목록 */}
      <section style={{ padding: '56px 0 80px', background: '#F8FAFC' }}>
        <div className="container">

          {/* 필터 탭 */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}
          >
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '8px 20px',
                  borderRadius: '999px',
                  border: `2px solid ${activeCategory === cat ? 'var(--navy)' : '#E5E7EB'}`,
                  background: activeCategory === cat ? 'var(--navy)' : '#fff',
                  color: activeCategory === cat ? '#fff' : '#6B7280',
                  fontWeight: activeCategory === cat ? 700 : 500,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                {cat !== '전체' && <span style={{ marginRight: '4px' }}>{CATEGORY_ICON[cat]}</span>}
                {cat}
                {cat !== '전체' && (
                  <span style={{ marginLeft: '6px', fontSize: '0.75rem', opacity: 0.7 }}>
                    {docs.filter(d => d.category === cat).length}
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          {/* 자료 카드 그리드 */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}
            className="catalog-grid"
          >
            {filtered.map(doc => (
              <motion.div
                key={doc.id}
                variants={cardVariant}
                style={{
                  background: '#fff',
                  borderRadius: '16px',
                  border: '1px solid #E5E7EB',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                {/* 상단: 아이콘 + 카테고리 배지 */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  {doc.thumbnailUrl ? (
                    <div
                      style={{
                        width: '86px',
                        height: '112px',
                        borderRadius: '10px',
                        background: '#F8FAFC',
                        border: '1px solid #E5E7EB',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 8px 18px rgba(15,34,65,0.08)',
                      }}
                    >
                      <img
                        src={doc.thumbnailUrl}
                        alt={`${doc.title} 미리보기`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        loading="lazy"
                      />
                    </div>
                  ) : (
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '12px',
                      background: '#F1F5F9',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FileText style={{ width: 24, height: 24, color: '#475569' }} />
                    </div>
                  )}
                  <span style={{
                    fontSize: '11px', fontWeight: 700,
                    background: CATEGORY_COLOR[doc.category].bg,
                    color: CATEGORY_COLOR[doc.category].text,
                    padding: '3px 10px', borderRadius: '999px',
                  }}>
                    {doc.category}
                  </span>
                </div>

                {/* 제목 + 설명 */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 700, color: '#1F2937', fontSize: '0.95rem', marginBottom: '6px' }}>
                    {doc.title}
                  </p>
                  <p style={{ fontSize: '0.82rem', color: '#6B7280', lineHeight: 1.5 }}>
                    {doc.description}
                  </p>
                </div>

                {/* 하단: 파일 크기 + 버튼 */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: '#9CA3AF' }}>{doc.fileSize}</span>
                  <button
                    onClick={() => handleDownload(doc)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      padding: '8px 16px', borderRadius: '8px',
                      background: doc.ready ? 'var(--navy)' : '#F1F5F9',
                      color: doc.ready ? '#fff' : '#9CA3AF',
                      border: 'none',
                      fontWeight: 600, fontSize: '0.8rem',
                      cursor: doc.ready ? 'pointer' : 'default',
                      transition: 'all 0.2s',
                    }}
                  >
                    {doc.ready
                      ? <><Download style={{ width: 14, height: 14 }} /> 다운로드</>
                      : <><Lock style={{ width: 14, height: 14 }} /> 준비중</>
                    }
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 안내 배너 */}
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp}
            style={{
              marginTop: '40px',
              background: '#EFF6FF',
              border: '1px solid #BFDBFE',
              borderRadius: '12px',
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>💡</span>
            <p style={{ fontSize: '0.875rem', color: '#1E40AF', flex: 1 }}>
              자료 파일은 순차적으로 업로드될 예정입니다. 즉시 자료가 필요하시면 견적 문의를 통해 요청해 주세요.
            </p>
            <Link
              to="/contact"
              style={{
                padding: '8px 20px', borderRadius: '8px',
                background: 'var(--navy)', color: '#fff',
                fontWeight: 700, fontSize: '0.85rem',
                textDecoration: 'none', whiteSpace: 'nowrap',
              }}
            >
              자료 요청하기
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 토스트 알림 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: toastVisible ? 1 : 0, y: toastVisible ? 0 : 20 }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed', bottom: '32px', left: '50%', transform: 'translateX(-50%)',
          background: '#1F2937', color: '#fff',
          padding: '12px 24px', borderRadius: '10px',
          fontSize: '0.875rem', fontWeight: 600,
          pointerEvents: 'none', zIndex: 1000,
          whiteSpace: 'nowrap',
        }}
      >
        📁 해당 파일은 현재 준비 중입니다
      </motion.div>

      <style>{`
        @media (max-width: 900px) { .catalog-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .catalog-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </main>
  );
}

function isPreviewableImage(url?: string | null) {
  if (!url) return false;
  return /\.(avif|gif|jpe?g|png|webp)(\?|#|$)/i.test(url);
}
