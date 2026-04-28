import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { HeroContent } from '../../types/cms';

const BADGES = [
  { label: '우수제품', sub: '조달청' },
  { label: '혁신제품', sub: '2020년' },
  { label: 'K마크', sub: '성능인증' },
  { label: '방폭인증', sub: 'EX emb II T1' },
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
  { location: '수원 연무초등학교', desc: '학생식당 복사난방', icon: '🎓' },
  { location: '영월 동강시스타 리조트', desc: '사무실 복사난방', icon: '🏨' },
  { location: '서울 양재 하나로마트', desc: '계산대 국소 복사난방', icon: '🛒' },
  { location: '광주시 퇴촌읍 토마토카페', desc: '카페 실내 복사난방', icon: '☕' },
  { location: '천안시청 실내 배드민턴장', desc: '관중석 복사난방', icon: '🏸' },
  { location: '함안군청 자동차 거점소독시설', desc: '동파방지 복사난방', icon: '🚗' },
  { location: '2018 평창 동계올림픽', desc: 'VIP 라운지 복사난방', icon: '🏅' },
  { location: '부천 샹그릴라 옥상 화원', desc: '온실 복사난방', icon: '🌿' },
  { location: '영종도 인천공항 FedEx 물류센터', desc: '작업자 복사난방', icon: '🏭' },
  { location: '포항 해병대 정비대 정비창', desc: '작업자 복사난방', icon: '🔧' },
];

const SLIDE_DURATION = 6000;
const PHONE_NUMBER = '1688-2520';

const FONT_FAMILY_MAP = {
  display: "'Bebas Neue', 'Noto Sans KR', sans-serif",
  sans: "'Noto Sans KR', sans-serif",
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

  useEffect(() => {
    const timer = setInterval(() => {
      setPrevIndex(currentIndex);
      setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const headlineParts = highlightHeadline(heroContent.headline, heroContent.highlightText);

  return (
    <section
      style={{
        color: '#fff',
        padding: '80px 0 60px',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '560px',
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
            scale: { duration: SLIDE_DURATION / 1000 + 1.2, ease: 'linear' },
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
            background: 'linear-gradient(160deg, rgba(10,22,40,0.60) 0%, rgba(10,22,40,0.40) 60%, rgba(10,22,40,0.52) 100%)',
          }}
        />

        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 고정 시공 현장 배지 + 슬라이드 캡션 */}
      <motion.div
        key={`caption-${currentIndex}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '16px',
          left: '16px',
          zIndex: 3,
          display: 'flex',
          pointerEvents: 'none',
        }}
      >
        <div
          className="hero-site-badge"
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto minmax(0, 1fr)',
            gap: '8px',
            alignItems: 'start',
            background: 'rgba(10,22,40,0.78)',
            border: '1px solid rgba(255,255,255,0.28)',
            borderRadius: '8px',
            padding: '8px 14px 9px',
            backdropFilter: 'blur(8px)',
            maxWidth: '440px',
          }}
        >
          <span style={{ fontSize: '14px', gridRow: '1 / span 2' }}>📍</span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.96)',
              letterSpacing: '0.01em',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
            }}
          >
            실제 납품 · 시공 현장
          </span>
          <span
            style={{
              fontSize: '11px',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.8)',
              lineHeight: 1.2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {SLIDE_INFO[currentIndex]?.icon} {SLIDE_INFO[currentIndex]?.location} · {SLIDE_INFO[currentIndex]?.desc}
          </span>
        </div>
      </motion.div>

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

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            border: '1px solid rgba(200,57,43,.8)',
            background: 'rgba(200,57,43,.45)',
            borderRadius: '999px',
            padding: '6px 18px',
            fontSize: '13px',
            fontWeight: 800,
            color: '#FFD166',
            textShadow: '0 1px 8px rgba(0,0,0,0.35)',
            marginBottom: '28px',
          }}
        >
          🏆 정부조달 우수제품 지정 (2013 · 2019 · 2025)
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.15, ease: 'easeOut' }}
          className="hero-main-copy"
          style={{
            fontFamily: FONT_FAMILY_MAP[heroContent.headlineFontFamily],
            fontSize: FONT_SIZE_MAP[heroContent.headlineFontSize],
            lineHeight: 1.1,
            letterSpacing: heroContent.headlineFontFamily === 'display' ? '1.5px' : '-0.02em',
            marginBottom: '16px',
            whiteSpace: 'pre-line',
            fontWeight: FONT_WEIGHT_MAP[heroContent.headlineFontWeight],
            textShadow: '0 8px 24px rgba(0,0,0,0.22)',
          }}
        >
          {headlineParts.map((part, index) => (
            <span
              key={`${part.text}-${index}`}
              style={part.highlight ? { color: heroContent.highlightColor } : undefined}
            >
              {part.text}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.08rem)',
            opacity: 0.88,
            maxWidth: '560px',
            margin: '0 auto 36px',
            lineHeight: 1.8,
            whiteSpace: 'pre-line',
            fontWeight: 500,
            textShadow: '0 4px 16px rgba(0,0,0,0.18)',
          }}
        >
          {heroContent.subcopy}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '48px',
          }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <a
              href={`tel:${PHONE_NUMBER.replace(/-/g, '')}`}
              style={{
                background: 'var(--red)',
                color: '#fff',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 4px 20px rgba(200,57,43,0.4)',
              }}
            >
              📋 {heroContent.primaryCta}
            </a>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Link
              to="/products/excellence"
              style={{
                background: 'rgba(255,255,255,.15)',
                color: '#fff',
                border: '2px solid rgba(255,255,255,.85)',
                padding: '11px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              📦 {heroContent.secondaryCta}
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <a
              href="https://shop.g2b.go.kr"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: 'rgba(255,255,255,.15)',
                color: '#fff',
                border: '2px solid rgba(255,255,255,.85)',
                padding: '11px 24px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                textShadow: '0 1px 4px rgba(0,0,0,0.4)',
              }}
            >
              🏛️ 나라장터 바로가기
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '10px',
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
                background: 'rgba(10,22,40,0.72)',
                border: '1px solid rgba(230,126,34,0.55)',
                borderRadius: '8px',
                padding: '8px 16px',
                textAlign: 'center',
                minWidth: '90px',
                cursor: 'default',
                transition: 'background 0.2s',
                backdropFilter: 'blur(4px)',
              }}
            >
              <strong
                style={{
                  display: 'block',
                  color: '#FFB23F',
                  fontSize: '13px',
                  fontWeight: 900,
                  textShadow: '0 1px 7px rgba(0,0,0,0.32)',
                }}
              >
                {badge.label}
              </strong>
              <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.75)' }}>{badge.sub}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="hero-slide-dots"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '46px',
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
                transition: 'all 0.3s ease',
              }}
            />
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-main-copy {
            font-size: clamp(1.95rem, 7.8vw, 2.12rem) !important;
            line-height: 1.18 !important;
            letter-spacing: 0 !important;
            word-break: keep-all !important;
            overflow-wrap: normal !important;
          }
          .hero-site-badge {
            min-width: 0 !important;
            width: calc(100vw - 32px) !important;
            max-width: calc(100vw - 32px) !important;
            grid-template-columns: auto minmax(0, 1fr) !important;
          }
          .hero-slide-dots {
            margin-top: 56px !important;
            transform: translateY(12px);
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
