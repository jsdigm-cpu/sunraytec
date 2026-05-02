import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import type { HeroContent } from '../../types/cms';

const BADGES = [
  { label: '우수제품', sub: '조달청', color: 'var(--tint-lavender)', text: 'var(--notion-purple-deep)' },
  { label: '혁신제품', sub: '2020년', color: 'var(--tint-sky)', text: '#1D4ED8' },
  { label: 'K마크', sub: '성능인증', color: 'var(--tint-mint)', text: '#065F46' },
  { label: '방폭인증', sub: 'EX emb II T1', color: 'var(--tint-peach)', text: '#9A3412' },
  { label: 'ISO 9001', sub: '/14001', color: 'var(--tint-yellow)', text: '#854D0E' },
  { label: 'CE·RoHS', sub: '유럽인증', color: 'var(--tint-rose)', text: '#9D174D' },
];

const STATS = [
  { value: '16년+', label: '복사난방 전문' },
  { value: '39.4%', label: '소비전력 절감' },
  { value: '0.91', label: '원적외선 방사율' },
  { value: '99.9%', label: '항균 성능' },
];

interface HeroSectionProps {
  heroContent: HeroContent;
}

export default function HeroSection({ heroContent }: HeroSectionProps) {
  return (
    <section
      style={{
        background: 'var(--notion-navy)',
        padding: '80px 0 72px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative dots — Notion-style sticky note dots */}
      <NotionDots />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>

        {/* Top badge — "Most trusted" pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(124, 58, 237, 0.18)',
            border: '1px solid rgba(124, 58, 237, 0.45)',
            borderRadius: 'var(--nr-full)',
            padding: '6px 16px',
            fontSize: '13px',
            fontWeight: 600,
            color: '#C4B5FD',
            marginBottom: '32px',
            letterSpacing: '0.01em',
          }}
        >
          <span style={{
            width: '6px', height: '6px',
            borderRadius: '50%',
            background: 'var(--notion-purple)',
            display: 'inline-block',
          }} />
          정부조달 우수제품 지정 2013 · 2019 · 2025
        </motion.div>

        {/* Hero headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-notion)',
            fontSize: 'clamp(2.6rem, 5.5vw, 4.5rem)',
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: '-1.5px',
            color: 'var(--on-dark)',
            marginBottom: '20px',
            whiteSpace: 'pre-line',
          }}
        >
          {heroContent.headline}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.22, ease: 'easeOut' }}
          style={{
            fontFamily: 'var(--font-notion)',
            fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            fontWeight: 400,
            lineHeight: 1.65,
            color: 'var(--on-dark-muted)',
            maxWidth: '540px',
            margin: '0 auto 40px',
            whiteSpace: 'pre-line',
          }}
        >
          {heroContent.subcopy}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.34, ease: 'easeOut' }}
          style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '56px',
          }}
        >
          {/* Primary — Notion purple */}
          <Link
            to="/products/excellence"
            style={{
              background: 'var(--notion-purple)',
              color: '#fff',
              padding: '10px 22px',
              borderRadius: 'var(--nr-md)',
              fontFamily: 'var(--font-notion)',
              fontWeight: 500,
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(124, 58, 237, 0.35)',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--notion-purple-pressed)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'var(--notion-purple)')}
          >
            제품 카탈로그 보기
          </Link>

          {/* Secondary — outlined on dark */}
          <a
            href="tel:16882520"
            style={{
              background: 'transparent',
              color: 'var(--on-dark)',
              border: '1px solid rgba(255,255,255,0.38)',
              padding: '10px 22px',
              borderRadius: 'var(--nr-md)',
              fontFamily: 'var(--font-notion)',
              fontWeight: 500,
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
              transition: 'border-color 0.15s',
            }}
          >
            견적 문의 1688-2520
          </a>

          {/* Ghost — 나라장터 */}
          <a
            href="https://shop.g2b.go.kr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: 'transparent',
              color: 'rgba(255,255,255,0.55)',
              border: '1px solid rgba(255,255,255,0.18)',
              padding: '10px 22px',
              borderRadius: 'var(--nr-md)',
              fontFamily: 'var(--font-notion)',
              fontWeight: 500,
              fontSize: '14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              textDecoration: 'none',
            }}
          >
            나라장터 바로가기 ↗
          </a>
        </motion.div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.48 }}
          style={{
            display: 'inline-flex',
            gap: '0',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 'var(--nr-lg)',
            overflow: 'hidden',
            marginBottom: '48px',
          }}
          className="hero-stats-strip"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '16px 28px',
                textAlign: 'center',
                borderRight: i < STATS.length - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-notion)',
                fontSize: '1.4rem',
                fontWeight: 600,
                color: '#C4B5FD',
                lineHeight: 1.1,
                marginBottom: '4px',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontSize: '12px',
                color: 'var(--on-dark-muted)',
                fontWeight: 400,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Certification badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {BADGES.map((badge) => (
            <div
              key={badge.label}
              style={{
                background: badge.color,
                borderRadius: 'var(--nr-sm)',
                padding: '5px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{
                fontSize: '12px',
                fontWeight: 600,
                color: badge.text,
                fontFamily: 'var(--font-notion)',
              }}>
                {badge.label}
              </span>
              <span style={{ fontSize: '11px', color: badge.text, opacity: 0.7 }}>
                {badge.sub}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 640px) {
          .hero-stats-strip {
            flex-direction: column !important;
            width: 100% !important;
            max-width: 280px !important;
          }
          .hero-stats-strip > div {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.1) !important;
          }
          .hero-stats-strip > div:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}

/* Decorative sticky-note dots scattered around the hero — Notion signature */
function NotionDots() {
  const dots = [
    { top: '12%', left: '6%',  size: 10, color: '#7C3AED', blur: 0 },
    { top: '28%', left: '3%',  size: 7,  color: '#EC4899', blur: 0 },
    { top: '58%', left: '8%',  size: 9,  color: '#F97316', blur: 0 },
    { top: '78%', left: '4%',  size: 6,  color: '#22C55E', blur: 0 },
    { top: '15%', right: '5%', size: 8,  color: '#14B8A6', blur: 0 },
    { top: '35%', right: '3%', size: 11, color: '#EAB308', blur: 0 },
    { top: '62%', right: '7%', size: 7,  color: '#7C3AED', blur: 0 },
    { top: '82%', right: '4%', size: 9,  color: '#EC4899', blur: 0 },
    { top: '5%',  left: '22%', size: 5,  color: '#F97316', blur: 0 },
    { top: '90%', left: '30%', size: 6,  color: '#22C55E', blur: 0 },
    { top: '8%',  right: '20%', size: 5, color: '#14B8A6', blur: 0 },
    { top: '92%', right: '25%', size: 7, color: '#EAB308', blur: 0 },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {dots.map((d, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: d.top,
            left: (d as any).left,
            right: (d as any).right,
            width: d.size,
            height: d.size,
            borderRadius: '3px',
            background: d.color,
            opacity: 0.65,
          }}
          animate={{
            y: [0, -6, 0],
            opacity: [0.5, 0.75, 0.5],
          }}
          transition={{
            duration: 3 + (i % 3),
            delay: i * 0.25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
