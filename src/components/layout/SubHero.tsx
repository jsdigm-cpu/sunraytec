import { ReactNode } from 'react';
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
  /** KPI 바 등 추가 요소 — 있으면 하단 패딩이 0으로 변경됨 */
  children?: ReactNode;
}

const fadeInUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/**
 * 모든 서브 페이지에서 사용하는 통일된 히어로 섹션.
 * 배경색, 패딩, 브레드크럼, 제목, 본문 스타일이 완전히 동일하게 유지됩니다.
 */
export default function SubHero({ breadcrumb, badge, title, lead, children }: SubHeroProps) {
  const hasChildren = !!children;

  return (
    <section
      style={{
        background: 'linear-gradient(160deg, var(--navy) 0%, #152035 60%, #0E1E3A 100%)',
        color: '#fff',
        padding: hasChildren ? '56px 0 0' : '56px 0 64px',
      }}
    >
      <div className="container">
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
        </motion.div>

        {/* KPI 바 등 추가 요소 */}
        {children}
      </div>
    </section>
  );
}
