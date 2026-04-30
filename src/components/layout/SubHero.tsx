import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface SubHeroProps {
  /** 브레드크럼 경로 (마지막 항목이 현재 페이지) */
  breadcrumb: BreadcrumbItem[];
  /** 영문 서브태그 (예: 'CEO Message') */
  badge: string;
  /** h1 제목 */
  title: string;
  /** 부연 설명 텍스트 */
  lead?: string;
  /** 하단 핵심 키워드 태그 (빈 공간 채우기) */
  keywords?: string[];
}

const fadeInUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/**
 * 모든 서브 페이지에서 사용하는 통일된 히어로 섹션.
 * 고정 높이로 모든 페이지가 동일한 "군청색 가로 바"를 유지합니다.
 */
export default function SubHero({ breadcrumb, badge, title, lead, keywords }: SubHeroProps) {
  return (
    <section
      style={{
        background: 'linear-gradient(160deg, var(--navy) 0%, #152035 60%, #0E1E3A 100%)',
        color: '#fff',
        padding: '56px 0 0',
        minHeight: 360,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {/* 브레드크럼 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '20px',
            flexWrap: 'wrap',
          }}
        >
          <Link to="/" style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
            홈
          </Link>
          {breadcrumb.map((item, i) => {
            const isLast = i === breadcrumb.length - 1;
            return (
              <span key={`${item.label}-${i}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>›</span>
                {isLast ? (
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>
                    {item.label}
                  </span>
                ) : item.to ? (
                  <Link to={item.to} style={{ color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}>
                    {item.label}
                  </Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </span>
            );
          })}
        </div>

        {/* 메인 컨텐츠 */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
          {/* 영문 서브태그 */}
          <p
            style={{
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: 'var(--red)',
              marginBottom: '12px',
            }}
          >
            {badge}
          </p>

          {/* 제목 */}
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.8rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '12px',
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>

          {/* 부연 설명 */}
          {lead && (
            <p
              style={{
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '640px',
                lineHeight: 1.75,
              }}
            >
              {lead}
            </p>
          )}

          {/* 핵심 키워드 태그 */}
          {keywords && keywords.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
                marginTop: '24px',
              }}
            >
              {keywords.map((kw) => (
                <span
                  key={kw}
                  style={{
                    display: 'inline-block',
                    padding: '5px 14px',
                    borderRadius: '20px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.7)',
                    fontSize: '12px',
                    fontWeight: 600,
                    letterSpacing: '0.3px',
                  }}
                >
                  {kw}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* 하단 디바이더 라인 */}
      <div style={{ marginTop: 'auto', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
    </section>
  );
}
