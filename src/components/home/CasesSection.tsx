import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';
import { supabase } from '../../lib/supabase';

interface CaseCard {
  id: string;
  title: string;
  category: string;
  location?: string;
  image_url?: string;
  images?: string[];
  summary?: string;
  featured?: boolean;
  sort_order?: number;
}

const FALLBACK_CASES: CaseCard[] = [
  { id: 'fallback-fedex', title: '인천공항 FedEx 물류센터', category: '산업 및 물류 거점', location: '인천', image_url: '/images/hero/hero_1.jpg' },
  { id: 'fallback-post', title: '대전 우편물류센터', category: '산업 및 물류 거점', location: '대전', image_url: '/images/hero/hero_2.jpg' },
  { id: 'fallback-military', title: '포항 00부대 정비창', category: '국방 및 특수 시설', location: '포항', image_url: '/images/hero/hero_3.jpg' },
  { id: 'fallback-school', title: '연무초등학교 급식실', category: '교육 및 공공 복지', location: '논산', image_url: '/images/hero/hero_4.jpg' },
  { id: 'fallback-bus', title: '한국도로공사 버스정류장', category: '스마트 시티 솔루션', location: '전국', image_url: '/images/hero/hero_5.jpg' },
  { id: 'fallback-carwash', title: '자동차 출고센터 세차장', category: '상업 및 서비스 공간', location: '자동차 출고센터', image_url: '/images/hero/hero_6.jpg' },
];

const CATEGORY_COLOR: Record<string, string> = {
  '산업·물류': 'var(--amber)',
  '국방·특수': 'var(--red)',
  '공공·교육': '#60A5FA',
  '상업': '#4ADE80',
  '산업 및 물류 거점': 'var(--amber)',
  '국방 및 특수 시설': 'var(--red)',
  '교육 및 공공 복지': '#60A5FA',
  '스마트 시티 솔루션': '#34D399',
  '주거 및 라이프 스타일': '#F472B6',
  '상업 및 서비스 공간': '#A78BFA',
};

function getCaseImage(item: CaseCard) {
  return item.image_url || item.images?.find(Boolean) || '';
}

export default function CasesSection() {
  const [cases, setCases] = useState<CaseCard[]>(FALLBACK_CASES);
  const [loading, setLoading] = useState(Boolean(supabase));

  useEffect(() => {
    let isMounted = true;

    async function fetchCases() {
      if (!supabase) return;

      const { data, error } = await supabase
        .from('case_studies')
        .select('id,title,category,location,image_url,images,summary,featured,sort_order')
        .order('sort_order', { ascending: true })
        .limit(6);

      if (!isMounted) return;
      if (!error && data && data.length > 0) {
        setCases(data as CaseCard[]);
      }
      setLoading(false);
    }

    fetchCases();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section style={{ background: 'var(--navy2)', padding: '72px 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '40px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--amber2)', marginBottom: '10px' }}>
                Installation Cases
              </p>
              <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: '#fff', lineHeight: 1.2 }}>
                검증된 시공 실적
              </h2>
              <p style={{ color: 'rgba(255,255,255,.5)', marginTop: '6px', fontSize: '0.9rem' }}>
                공공기관·산업현장에서 신뢰로 쌓아온 납품 실적
              </p>
            </div>
            <motion.div whileHover={{ scale: 1.04 }}>
              <Link
                to="/cases"
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: '1.5px solid rgba(255,255,255,.3)',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.875rem',
                  whiteSpace: 'nowrap',
                  display: 'inline-block',
                  textDecoration: 'none',
                }}
              >
                시공사례 전체보기 →
              </Link>
            </motion.div>
          </div>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px' }}
          className="cases-grid"
        >
          {cases.map((c, index) => {
            const imageUrl = getCaseImage(c);
            const detailTo = c.id.startsWith('fallback-') ? '/cases' : `/cases/${c.id}`;

            return (
            <motion.div
              key={c.id}
              variants={staggerItem}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              style={{
                borderRadius: '12px',
                overflow: 'hidden',
                background: 'rgba(255,255,255,.06)',
                border: '1px solid rgba(255,255,255,.1)',
                cursor: 'pointer',
              }}
            >
              <Link to={detailTo} style={{ textDecoration: 'none', color: 'inherit' }}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    height: '140px',
                    background: 'linear-gradient(135deg, var(--navy) 0%, #1A3A6B 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {imageUrl ? (
                    <motion.img
                      className="case-thumb-img"
                      src={imageUrl}
                      alt={c.title}
                      animate={{
                        x: ['0%', '-12%', '0%'],
                        scale: [1.04, 1.04, 1.04],
                        objectPosition: ['76% center', '24% center', '76% center'],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.55,
                      }}
                      style={{
                        width: '120%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: '76% center',
                      }}
                      onError={(event) => {
                        event.currentTarget.style.display = 'none';
                      }}
                    />
                  ) : null}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: imageUrl
                        ? 'linear-gradient(180deg, rgba(10,25,47,0.1) 0%, rgba(10,25,47,0.42) 100%)'
                        : 'transparent',
                    }}
                  />
                  {!imageUrl && (
                    <span style={{ fontSize: '3rem' }}>
                      {index % 3 === 0 ? '🏭' : index % 3 === 1 ? '🏛️' : '🚗'}
                    </span>
                  )}
                  {loading && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: 10,
                        right: 12,
                        color: 'rgba(255,255,255,.65)',
                        fontSize: 11,
                        fontWeight: 700,
                      }}
                    >
                      DB 연결 중
                    </span>
                  )}
                </motion.div>

                <div style={{ padding: '16px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: CATEGORY_COLOR[c.category] || 'var(--gray)', marginBottom: '6px', display: 'block' }}>
                    {c.category}
                  </span>
                  <p style={{ fontWeight: 700, color: '#fff', fontSize: '0.9rem', marginBottom: '6px' }}>
                    {c.title}
                  </p>
                  <span style={{ fontSize: '11px', background: 'rgba(255,255,255,.1)', color: 'rgba(255,255,255,.6)', padding: '2px 8px', borderRadius: '4px' }}>
                    {c.location || '시공사례'}
                  </span>
                </div>
              </Link>
            </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style>{`
        .case-thumb-img {
          display: block;
          max-width: none;
          will-change: transform, object-position;
        }

        @media (prefers-reduced-motion: reduce) {
          .case-thumb-img {
            transform: translateX(0) scale(1.02) !important;
          }
        }

        @media (max-width: 768px) { .cases-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .cases-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
