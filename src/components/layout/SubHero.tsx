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
        padding: '24px 0 0',
        minHeight: 'clamp(320px, 45vh, 400px)',
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
        {/* 브레드크럼 — 상단 고정 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '14px',
            color: 'rgba(255,255,255,0.45)',
            flexWrap: 'wrap',
            paddingTop: '4px',
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

        {/* 메인 컨텐츠 — 남은 공간에서 중앙 배치 */}
        <motion.div initial="hidden" animate="visible" variants={fadeInUp} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {/* 영문 서브태그 */}
          <p
            style={{
              fontSize: '14px',
              fontWeight: 800,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: theme.accentColor,
              marginBottom: '16px',
            }}
          >
            {badge}
          </p>

          {/* 제목 */}
          <h1
            style={{
              fontSize: 'clamp(1.65rem, 5.5vw, 2.6rem)',
              fontWeight: 800,
              color: '#fff',
              marginBottom: '14px',
              lineHeight: 1.25,
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
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

        {/* 핵심 키워드 태그 — 불필요한 선 제거 및 폰트/스타일 자연스럽게 개선 */}
        {keywords && keywords.length > 0 && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px',
              marginTop: 'auto',
              padding: '16px 0',
              margin: '0',
            }}
          >
            {keywords.map((kw) => (
              <span
                key={kw}
                style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  borderRadius: '24px',
                  background: 'rgba(255,255,255,0.14)', // 유리 질감을 조금 더 명확하게
                  backdropFilter: 'blur(10px)', // 블러 강도 약간 강화
                  border: '1px solid rgba(255,255,255,0.1)', // 아주 연한 테두리
                  color: 'rgba(255,255,255,0.85)', // 너무 쨍하지 않은 부드러운 화이트
                  fontSize: '13px',
                  fontWeight: 500, // 볼드 대신 미디엄으로 자연스럽게
                  letterSpacing: '0.2px',
                  whiteSpace: 'nowrap',
                }}
              >
                {kw}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
