import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Award, ExternalLink, MapPin, PackageSearch, Phone, ShieldCheck } from 'lucide-react';
import type { HeroContent, HeroOverlayStrength } from '../../types/cms';

const BADGES = [
  { label: '우수제품', sub: '조달청' },
  { label: '혁신제품', sub: '2020년' },
  { label: 'K마크', sub: '성능인증' },
  { label: '방폭인증', sub: 'Ex e mb Ⅱ T1' },
  { label: 'ISO 9001', sub: '/14001' },
  { label: 'CE·RoHS', sub: '유럽인증' },
];

const RINGS = [
  { size: 320, delay: 0, duration: 4 },
  { size: 520, delay: 0.8, duration: 4 },
  { size: 720, delay: 1.6, duration: 4 },
];

const HERO_IMAGES = [
  '/images/hero/hero_1.jpg',
  '/images/hero/hero_2.jpg',
  '/images/hero/hero_3.jpg',
  '/images/hero/hero_4.jpg',
  '/images/hero/hero_5.jpg',
  '/images/hero/hero_6.jpg',
  '/images/hero/hero_7.jpg',
  '/images/hero/hero_8.jpg',
  '/images/hero/hero_9.jpg',
  '/images/hero/hero_10.jpg',
];

const SLIDE_INFO = [
  { location: '수원 연무초등학교', desc: '학생식당 복사난방' },
  { location: '영월 동강시스타 리조트', desc: '사무실 복사난방' },
  { location: '서울 양재 하나로마트', desc: '계산대 국소 복사난방' },
  { location: '광주시 퇴촌읍 토마토카페', desc: '카페 실내 복사난방' },
  { location: '천안시청 실내 배드민턴장', desc: '관중석 복사난방' },
  { location: '함안군청 자동차 거점소독시설', desc: '동파방지 복사난방' },
  { location: '2018 평창 동계올림픽', desc: 'VIP 라운지 복사난방' },
  { location: '부천 샹그릴라 옥상 화원', desc: '온실 복사난방' },
  { location: '영종도 인천공항 FedEx 물류센터', desc: '작업자 복사난방' },
  { location: '포항 해병대 정비대 정비창', desc: '작업자 복사난방' },
];

const PHONE_NUMBER = '1688-2520';

const OVERLAY_GRADIENTS: Record<HeroOverlayStrength, string> = {
  light:  'linear-gradient(160deg, rgba(7, 12, 32, 0.30) 0%, rgba(15, 23, 42, 0.20) 50%, rgba(30, 41, 59, 0.25) 100%)',
  medium: 'linear-gradient(160deg, rgba(7, 12, 32, 0.55) 0%, rgba(15, 23, 42, 0.45) 50%, rgba(30, 41, 59, 0.50) 100%)',
  dark:   'linear-gradient(160deg, rgba(7, 12, 32, 0.78) 0%, rgba(15, 23, 42, 0.68) 50%, rgba(30, 41, 59, 0.74) 100%)',
};

const FONT_FAMILY_MAP = {
  display: "'Pretendard', system-ui, sans-serif",
  sans: "'Pretendard', system-ui, sans-serif",
} satisfies Record<HeroContent['headlineFontFamily'], string>;

const FONT_SIZE_MAP = {
  md: 'clamp(2.1rem, 5vw, 3.4rem)',
  lg: 'clamp(2.4rem, 5.5vw, 4rem)',
  xl: 'clamp(2.8rem, 6.2vw, 4.8rem)',
} satisfies Record<HeroContent['headlineFontSize'], string>;

const FONT_WEIGHT_MAP = {
  bold: 700,
  black: 900,
} satisfies Record<HeroContent['headlineFontWeight'], number>;

interface HeroSectionProps {
  heroContent: HeroContent;
}

export default function HeroSection({ heroContent }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);

  const isLegacyHero = heroContent.headline.includes('대한민국 복사난방의 기준');
  const resolvedHeroContent: HeroContent = isLegacyHero
    ? {
        ...heroContent,
        headline: '공공·산업 현장의\n열 손실을 줄이는\n원적외선 복사난방',
        subcopy:
          '학교 급식실, 물류센터, 군 특수시설처럼 바람과 분진, 높은 천장 때문에 난방 효율이 떨어지는 공간에 검증된 패널형 복사난방 솔루션을 제안합니다.',
        primaryCta: '견적 상담하기',
        secondaryCta: '조달 제품 보기',
        highlightText: '열 손실',
        copyEffect: 'none',
      }
    : heroContent;

  const slideDurationMs = (resolvedHeroContent.slideDurationSec ?? 6) * 1000;
  const autoSlide = resolvedHeroContent.autoSlide ?? true;

  useEffect(() => {
    if (!autoSlide) return;
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, slideDurationMs);
    return () => clearInterval(timer);
  }, [currentIndex, autoSlide, slideDurationMs]);

  const headlineParts = highlightHeadline(resolvedHeroContent.headline, resolvedHeroContent.highlightText);
  const copyEffect = resolvedHeroContent.copyEffect ?? 'none';
  const overlay = OVERLAY_GRADIENTS[resolvedHeroContent.overlayStrength ?? 'medium'];
  const showSiteBadge = resolvedHeroContent.showSiteBadge ?? true;
  const showCertBadges = resolvedHeroContent.showCertBadges ?? true;
  const highlightClass =
    copyEffect === 'glow-pulse'     ? 'hero-fx-glow-pulse'
    : copyEffect === 'gradient-flow' ? 'hero-fx-gradient'
    : copyEffect === 'shimmer'       ? 'hero-fx-shimmer'
    : copyEffect === 'underline-draw'? 'hero-fx-underline'
    : '';
  const headlineLines = resolvedHeroContent.headline.split('\n');

  return (
    <section
      className="home-hero"
      style={{
        color: '#fff',
        padding: 'clamp(72px, 11vh, 112px) 0 72px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: 'clamp(620px, 82dvh, 760px)',
      }}
    >
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        {prevIndex !== null && (
          <motion.div
            key={`prev-${prevIndex}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url(${HERO_IMAGES[prevIndex]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}

        <motion.div
          key={`current-${currentIndex}`}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.06 }}
          transition={{
            opacity: { duration: 1.2, ease: 'easeInOut' },
            scale: { duration: slideDurationMs / 1000 + 1.2, ease: 'linear' },
          }}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${HERO_IMAGES[currentIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: overlay,
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(circle at center, black, transparent 80%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div
        style={{
          position: 'absolute',
          right: '-80px',
          top: '50%',
          transform: 'translateY(-50%)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        {RINGS.map((ring) => (
          <motion.div
            key={ring.size}
            style={{
              position: 'absolute',
              width: ring.size,
              height: ring.size,
              borderRadius: '50%',
              border: '1.5px solid rgba(200,57,43,0.25)',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            animate={{
              scale: [1, 1.12, 1],
              opacity: [0.4, 0.15, 0.4],
            }}
            transition={{
              duration: ring.duration,
              delay: ring.delay,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}

        <motion.div
          style={{
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,57,43,0.35) 0%, transparent 70%)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 0.3, 0.6] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container hero-layout" style={{ position: 'relative', zIndex: 2 }}>
        <div>
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255,255,255,.18)',
              background: 'rgba(255,255,255,.08)',
              borderRadius: '999px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.9)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.12)',
              backdropFilter: 'blur(14px)',
              marginBottom: '28px',
            }}
          >
            <Award size={16} color="var(--amber2)" />
            정부조달 우수제품 3회 지정 · MAS 등록 제품 보유
          </motion.div>

          <motion.h1
            initial={copyEffect === 'word-reveal' ? false : { opacity: 0, y: 24 }}
            animate={copyEffect === 'word-reveal' ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="hero-main-copy"
            style={{
              fontFamily: FONT_FAMILY_MAP[resolvedHeroContent.headlineFontFamily],
              fontSize: FONT_SIZE_MAP[resolvedHeroContent.headlineFontSize],
              lineHeight: 1.12,
              letterSpacing: '-0.045em',
              marginBottom: '20px',
              whiteSpace: 'pre-line',
              fontWeight: FONT_WEIGHT_MAP[resolvedHeroContent.headlineFontWeight],
              textShadow: '0 10px 28px rgba(0,0,0,0.28)',
              maxWidth: '820px',
            }}
          >
            {copyEffect === 'word-reveal' ? (
              headlineLines.map((line, lineIdx) => (
                <motion.span
                  key={`line-${lineIdx}`}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + lineIdx * 0.18, ease: [0.16, 1, 0.3, 1] }}
                  style={{ display: 'block' }}
                >
                  {highlightHeadline(line, resolvedHeroContent.highlightText).map((part, i) => (
                    <span
                      key={`l${lineIdx}-${i}`}
                      style={part.highlight ? { color: resolvedHeroContent.highlightColor } : undefined}
                    >
                      {part.text}
                    </span>
                  ))}
                </motion.span>
              ))
            ) : (
              headlineParts.map((part, index) => (
                <span
                  key={`${part.text}-${index}`}
                  className={part.highlight ? highlightClass : undefined}
                  style={
                    part.highlight
                      ? copyEffect === 'gradient-flow'
                        ? { ['--hl-color' as string]: resolvedHeroContent.highlightColor }
                        : { color: resolvedHeroContent.highlightColor }
                      : undefined
                  }
                >
                  {part.text}
                </span>
              ))
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.18rem)',
              opacity: 0.9,
              maxWidth: '640px',
              margin: '0 0 36px',
              lineHeight: 1.82,
              whiteSpace: 'pre-line',
              fontWeight: 500,
              textShadow: '0 4px 16px rgba(0,0,0,0.18)',
            }}
          >
            {resolvedHeroContent.subcopy}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="hero-cta-row"
          >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a
              href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
              style={{
                background: 'var(--red)',
                color: '#fff',
                padding: '15px 24px',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 18px 40px rgba(220,38,38,0.34)',
              }}
            >
              <Phone size={18} />
              {resolvedHeroContent.primaryCta}
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/products/excellence"
              style={{
                background: 'rgba(255,255,255,.12)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,.38)',
                padding: '14px 22px',
                borderRadius: '999px',
                fontWeight: 800,
                fontSize: '1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <PackageSearch size={18} />
              {resolvedHeroContent.secondaryCta}
            </Link>
          </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="hero-proof-row"
          >
            {[
              ['57.1%', '산업현장 난방비 절감 실증'],
              ['91.2%', '원적외선 방사율'],
              ['99.9%', '항균 성능 시험'],
            ].map(([value, label]) => (
              <div key={label} className="hero-proof-item">
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {showSiteBadge && (
          <motion.aside
            key={`caption-${currentIndex}`}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="hero-case-card"
          >
            <div className="hero-case-image">
              <img src={HERO_IMAGES[currentIndex]} alt={`${SLIDE_INFO[currentIndex]?.location} 시공 현장`} />
            </div>
            <div className="hero-case-body">
              <span className="hero-case-eyebrow">
                <MapPin size={14} />
                실제 납품·시공 현장
              </span>
              <h2>{SLIDE_INFO[currentIndex]?.location}</h2>
              <p>{SLIDE_INFO[currentIndex]?.desc}</p>
              <div className="hero-case-meta">
                <span><ShieldCheck size={14} /> 검증 사례</span>
                <a href="https://shop.g2b.go.kr" target="_blank" rel="noopener noreferrer">
                  나라장터 확인 <ExternalLink size={13} />
                </a>
              </div>
            </div>
          </motion.aside>
        )}

        {showCertBadges && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="hero-cert-strip"
          style={{
            gridColumn: '1 / -1',
          }}
        >
          {BADGES.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.65 + index * 0.07 }}
              whileHover={{ y: -3, background: 'rgba(10,22,40,0.88)' }}
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '14px',
                padding: '12px 16px',
                minWidth: '120px',
                cursor: 'default',
                transition: 'background 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  color: '#fff',
                  fontSize: '13px',
                  fontWeight: 900,
                }}
              >
                {badge.label}
              </strong>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.58)' }}>{badge.sub}</span>
            </motion.div>
          ))}
        </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hero-slide-dots"
          style={{
            display: 'none',
            justifyContent: 'flex-start',
            gap: '8px',
            marginTop: '24px',
          }}
        >
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setPrevIndex(currentIndex);
                setCurrentIndex(index);
              }}
              style={{
                width: index === currentIndex ? '24px' : '8px',
                height: '8px',
                borderRadius: '999px',
                background: index === currentIndex ? 'var(--red-light)' : 'rgba(255,255,255,0.35)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        /* ── 메인 카피 효과 ───────────────────────────────────────── */
        .hero-fx-glow-pulse {
          animation: heroGlowPulse 2.4s ease-in-out infinite;
        }
        @keyframes heroGlowPulse {
          0%, 100% {
            text-shadow: 0 0 0 rgba(243,156,18,0), 0 8px 24px rgba(0,0,0,0.22);
          }
          50% {
            text-shadow:
              0 0 12px rgba(243,156,18,0.55),
              0 0 28px rgba(243,156,18,0.35),
              0 8px 24px rgba(0,0,0,0.22);
          }
        }
        .hero-fx-gradient {
          color: transparent;
          background: linear-gradient(
            90deg,
            var(--hl-color, #F39C12) 0%,
            #FFD166 25%,
            var(--hl-color, #F39C12) 50%,
            #FFD166 75%,
            var(--hl-color, #F39C12) 100%
          );
          background-size: 200% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          animation: heroGradientFlow 3.6s linear infinite;
        }
        @keyframes heroGradientFlow {
          0%   { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .hero-fx-shimmer {
          position: relative;
          display: inline-block;
        }
        .hero-fx-shimmer::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(
            120deg,
            transparent 35%,
            rgba(255,255,255,0.55) 50%,
            transparent 65%
          );
          background-size: 220% 100%;
          animation: heroShimmer 3.2s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        @keyframes heroShimmer {
          0%   { background-position: 220% 0; }
          60%  { background-position: -120% 0; }
          100% { background-position: -120% 0; }
        }
        .hero-fx-underline {
          position: relative;
          display: inline-block;
        }
        .hero-fx-underline::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 3px;
          background: currentColor;
          transform-origin: left center;
          animation: heroUnderlineDraw 1.4s cubic-bezier(0.65,0,0.35,1) 0.5s both;
        }
        @keyframes heroUnderlineDraw {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }

        @media (max-width: 600px) {
          .home-hero {
            min-height: auto !important;
            padding-top: 56px !important;
          }
          .hero-main-copy {
            line-height: 1.25 !important;
            letter-spacing: -0.5px !important;
            word-break: keep-all !important;
            overflow-wrap: break-word !important;
            margin-bottom: 20px !important;
          }
          .hero-site-badge {
            display: none !important; /* Hide site badge on very small screens to save space */
          }
          .hero-slide-dots {
            margin-top: 40px !important;
          }
        }

        .hero-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.72fr);
          gap: clamp(28px, 5vw, 64px);
          align-items: center;
        }

        .hero-cta-row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 34px;
        }

        .hero-proof-row {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          max-width: 620px;
        }

        .hero-proof-item {
          border-left: 1px solid rgba(255,255,255,0.18);
          padding-left: 16px;
        }

        .hero-proof-item strong {
          display: block;
          font-size: clamp(1.35rem, 2.5vw, 1.9rem);
          line-height: 1;
          color: var(--amber2);
          font-weight: 900;
          font-variant-numeric: tabular-nums;
        }

        .hero-proof-item span {
          display: block;
          margin-top: 7px;
          font-size: 12px;
          color: rgba(255,255,255,0.68);
          line-height: 1.45;
        }

        .hero-case-card {
          overflow: hidden;
          border-radius: 28px;
          background: rgba(7,13,28,0.62);
          border: 1px solid rgba(255,255,255,0.14);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,0.14),
            0 28px 80px rgba(0,0,0,0.34);
          backdrop-filter: blur(18px);
        }

        .hero-case-image {
          height: 260px;
          overflow: hidden;
        }

        .hero-case-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          filter: saturate(0.92) contrast(1.04);
        }

        .hero-case-body {
          padding: 24px;
        }

        .hero-case-eyebrow,
        .hero-case-meta,
        .hero-case-meta span,
        .hero-case-meta a {
          display: flex;
          align-items: center;
        }

        .hero-case-eyebrow {
          gap: 7px;
          color: var(--amber2);
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 14px;
        }

        .hero-case-body h2 {
          font-size: 1.35rem;
          font-weight: 900;
          line-height: 1.25;
          margin-bottom: 8px;
        }

        .hero-case-body p {
          color: rgba(255,255,255,0.68);
          font-size: 14px;
          line-height: 1.65;
        }

        .hero-case-meta {
          justify-content: space-between;
          gap: 12px;
          margin-top: 22px;
          padding-top: 16px;
          border-top: 1px solid rgba(255,255,255,0.1);
          font-size: 12px;
          color: rgba(255,255,255,0.66);
        }

        .hero-case-meta span,
        .hero-case-meta a {
          gap: 6px;
        }

        .hero-case-meta a {
          color: #fff;
          font-weight: 800;
        }

        .hero-cert-strip {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 44px;
        }

        @media (max-width: 980px) {
          .hero-layout {
            grid-template-columns: 1fr;
          }

          .hero-case-card {
            max-width: 620px;
          }
        }

        @media (max-width: 640px) {
          .hero-proof-row {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .hero-cta-row a {
            width: 100%;
            justify-content: center;
          }

          .hero-case-image {
            height: 190px;
          }

          .hero-cert-strip {
            margin-top: 30px;
          }
        }

        @media (max-width: 390px) {
          .hero-main-copy {
            font-size: 1.92rem !important;
          }
        }
      `}</style>
    </section>
  );
}

function highlightHeadline(headline: string, highlightText: string) {
  if (!highlightText.trim()) {
    return [{ text: headline, highlight: false }];
  }

  const safe = escapeRegExp(highlightText.trim());
  const parts = headline.split(new RegExp(`(${safe})`, 'gi'));

  return parts
    .filter(Boolean)
    .map((part) => ({
      text: part,
      highlight: part.toLowerCase() === highlightText.trim().toLowerCase(),
    }));
}

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
