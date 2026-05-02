import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useHeroTheme } from '../../context/HeroThemeContext';
import { buildGradient } from '../../types/heroTheme';

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface SubHeroProps {
  breadcrumb: BreadcrumbItem[];
  badge: string;
  title: string;
  lead?: string;
  keywords?: string[];
}

const fadeInUp = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

export default function SubHero({ breadcrumb, badge, title, lead, keywords }: SubHeroProps) {
  const { theme } = useHeroTheme();
  const background = buildGradient(theme);

  return (
    <section
      style={{
        background,
        color: '#fff',
        padding: '32px 0 0',
        minHeight: 360,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 오버레이 효과 */}
      {theme.overlayEffect === 'glow' && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 15% 50%, rgba(255,120,60,0.13) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      )}
      {theme.overlayEffect === 'grid' && (
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
          }}
        />
      )}

      <div className="container" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        {/* 브레드크럼 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '56px',
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
              color: theme.accentColor,
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

        {/* 핵심 키워드 태그 (하단으로 밀어냄) */}
        {keywords && keywords.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              marginTop: 'auto',
              paddingTop: '40px',
              paddingBottom: '24px',
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
                  border: `1px solid ${theme.accentColor}55`,
                  color: 'rgba(255,255,255,0.7)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.3px',
                }}
              >
                {kw}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* 하단 디바이더 라인 */}
      <div style={{ marginTop: 'auto', borderBottom: '1px solid rgba(255,255,255,0.06)' }} />
    </section>
  );
}
