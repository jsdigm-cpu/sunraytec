import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { staggerContainer, staggerItem } from '../../utils/animations';
import ScrollReveal from '../ui/ScrollReveal';
import { fadeInUp } from '../../utils/animations';

const CERTS = [
  { icon: '🏆', title: '정부조달 우수제품', detail: '2013 · 2019 · 2025 (3회 지정)' },
  { icon: '💡', title: '혁신제품 지정',       detail: '2020년 조달청 지정' },
  { icon: '🔵', title: 'K마크 성능인증',       detail: 'SUR-D300P ~ SUR-3600' },
  { icon: '📋', title: 'ISO 9001:2015',        detail: '품질경영시스템 인증' },
  { icon: '🌿', title: 'ISO 14001:2015',       detail: '환경경영시스템 인증' },
  { icon: '🔥', title: '방폭인증 EX emb II T1', detail: '위험 환경 특수 제품' },
  { icon: '💧', title: '방진·방수 IP-65',      detail: '산업용 특수 제품' },
  { icon: '🇪🇺', title: 'CE · RoHS',           detail: '유럽 안전·환경 인증' },
];

export default function CertSection() {
  return (
    <section style={{ background: '#fff', padding: '72px 0' }}>
      <div className="container">
        <ScrollReveal variants={fadeInUp} style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--red)', marginBottom: '12px' }}>
            Certifications & Patents
          </p>
          <h2 style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 900, color: 'var(--navy)', lineHeight: 1.2 }}>
            인증 · 특허로 증명된 기술력
          </h2>
          <p style={{ color: 'var(--gray)', marginTop: '8px', fontSize: '0.9rem' }}>
            국내외 공인기관이 인정한 원적외선 복사난방 전문 기업
          </p>
        </ScrollReveal>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}
          className="cert-grid"
        >
          {CERTS.map((c) => (
            <motion.div
              key={c.title}
              variants={staggerItem}
              whileHover={{ y: -4, boxShadow: '0 12px 32px rgba(0,0,0,0.1)', transition: { duration: 0.2 } }}
              style={{
                background: 'var(--off)',
                borderRadius: '12px',
                padding: '22px 18px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px',
                border: '1px solid var(--border)',
                cursor: 'default',
              }}
            >
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ duration: 0.2 }}
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: '#fff',
                  boxShadow: 'var(--sh)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.3rem',
                  flexShrink: 0,
                }}
              >
                {c.icon}
              </motion.div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--navy)', marginBottom: '4px', lineHeight: 1.3 }}>
                  {c.title}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--gray)' }}>{c.detail}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal variants={fadeInUp} delay={0.1}>
          <div
            style={{
              marginTop: '32px',
              padding: '20px 24px',
              background: 'var(--off)',
              borderRadius: '12px',
              border: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ fontSize: '1.5rem' }}>📄</span>
            <p style={{ fontSize: '13.5px', color: 'var(--gray)', lineHeight: 1.7 }}>
              인증서 원본·시험성적서는{' '}
              <Link to="/resources/catalog" style={{ color: 'var(--navy)', fontWeight: 700 }}>자료실 페이지</Link>에서 다운로드하실 수 있습니다.
              공공기관 담당자는{' '}
              <Link to="/about/certifications" style={{ color: 'var(--red)', fontWeight: 700 }}>인증·특허 상세 페이지</Link>에서 전체 인증 현황을 확인하실 수 있습니다.
            </p>
          </div>
        </ScrollReveal>
      </div>

      <style>{`
        @media (max-width: 900px) { .cert-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 480px) { .cert-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
}
